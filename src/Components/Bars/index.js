import React, { Component } from 'react'
import * as d3 from 'd3'
import '../../App.css'

class Bars extends Component {
  constructor() {
    super()
    this.svgContainer = null
    this.setSvgContainer = this.setSvgContainer.bind(this)
    this.drawChart = this.drawChart.bind(this)
  }

  componentDidMount() {
    this.drawChart()
  }

  setSvgContainer(e) {
    this.svgContainer = e
  }

  drawChart() {
    // Data
    const {
      data, svgWidth, svgHeight, margin, keys, labels
    } = this.props
    const dataset = data

    // Dimensions
    const totalWidth = svgWidth
    const totalHeight = svgHeight
    const width = totalWidth - margin.left - margin.right
    const height = totalHeight - margin.top - margin.bottom

    // Layout
    const svg = d3
      .select(this.svgContainer)
      .append('svg')
      .attr('width', totalWidth)
      .attr('height', totalHeight)

    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)

    // Scales
    const x = d3
      .scaleBand()
      .domain(labels)
      .range([0, width])
      .paddingInner(0.5)
    const y = d3
      .scaleLinear()
      .range([height, 0])
    const z = d3
      .scaleOrdinal()
      .domain(keys)
      .range(['#DF6B65', '#F2A856', '#F9DA7A', '#90DEB2', '#63C799'])

    // Stacks
    const stack = d3.stack().keys(keys).offset(d3.stackOffsetExpand)
    const series = stack(dataset)

    // Chart
    g.selectAll('clipPath')
      .data(d3.range(labels.length))
      .enter()
      .append('clipPath')
      .attr('id', (d, i) => `rcp${i}`)
      .append('rect')
      .attr('x', (d, i) => x.step() * i)
      .attr('y', margin.top)
      .attr('width', x.bandwidth())
      .attr('height', height - margin.bottom)
      .attr('rx', 3)
      .attr('ry', 3)

    const groups = g
      .selectAll('g')
      .data(series)
      .enter()
      .append('g')
      .attr('fill', d => z(d.key))

    const rects = groups
      .selectAll('rect')
      .data(d => d)
      .enter()
      .append('rect')
      .attr('x', (d, i) => x(labels[i]))
      .attr('y', d => y(d[1]))
      .attr('height', d => y(d[0]) - y(d[1]))
      .attr('width', x.bandwidth())
      .attr('clip-path', (d, i) => `url(#rcp${i})`)

    g.append('g')
      .attr('id', 'bar-x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))

    g.append('g')
      .attr('id', 'bar-y-axis')
      .call(d3.axisLeft(y))
  }

  render() {
    return (
      <div>
        <h3>Dashboard Chart WITH ROUNDED CORNERS</h3>
        <div ref={this.setSvgContainer} />
      </div>
    )
  }
}

Bars.defaultProps = {
  svgWidth: 400,
  svgHeight: 200,
  margin: {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  },
  keys: ['critical', 'high', 'average', 'low', 'minimal'],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  data: [
    {
      Jan: {
        critical: 0,
        high: 0,
        average: 0,
        low: 0,
        minimal: 0
      }
    }
  ]
}

export default Bars
