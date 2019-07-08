import React, { Component } from 'react'
import * as d3 from 'd3'

class Experiment15 extends Component {
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
    const dataset = [
      {
        apples: 25,
        oranges: 50,
        grapes: 50
      },
      {
        apples: 50,
        oranges: 30,
        grapes: 20
      },
      {
        apples: 15,
        oranges: 35,
        grapes: 50
      },
      {
        apples: 10,
        oranges: 15,
        grapes: 75
      },
      {
        apples: 20,
        oranges: 70,
        grapes: 10
      }
    ]

    // Dimensions
    const totalW = 600
    const totalH = 400
    const margin = {
      top: 2,
      bottom: 2,
      left: 2,
      right: 2
    }
    const w = totalW - margin.left - margin.right
    const h = totalH - margin.top - margin.bottom

    // Stacks
    const stack = d3.stack().keys(['apples', 'oranges', 'grapes'])
    const series = stack(dataset)

    // Scales
    const x = d3
      .scaleBand()
      .domain(d3.range(dataset.length))
      .range([0, w])
      .paddingInner(0.5)

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([h, 0])

    const colors = d3.scaleOrdinal(d3.schemeCategory10)

    // Chart
    const svg = d3
      .select(this.svgContainer)
      .append('svg')
      .attr('width', totalW)
      .attr('height', totalH)

    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)

    g.selectAll('clipPath')
      .data(d3.range(dataset.length))
      .enter()
      .append('clipPath')
      .attr('id', (d, i) => `cp${i}`)
      .append('rect')
      .attr('x', (d, i) => x.step() * i)
      .attr('y', margin.top)
      .attr('width', x.bandwidth())
      .attr('height', h)
      .attr('rx', 10)
      .attr('ry', 10)

    const groups = g
      .selectAll('g')
      .data(series)
      .enter()
      .append('g')
      .style('fill', (d, i) => colors(i))
      .attr('class', d => d.key)

    const rects = groups
      .selectAll('rect')
      .data(d => d)
      .enter()
      .append('rect')
      .attr('x', (d, i) => x(i))
      .attr('y', d => y(d[1]))
      .attr('height', d => y(d[0]) - y(d[1]))
      .attr('width', x.bandwidth())
      .attr('clip-path', (d, i) => `url(#cp${i})`)
  }

  render() {
    return (
      <div>
        <h3>Stacked Bar Chart WITH ROUNDED CORNERS!!!</h3>
        <div ref={this.setSvgContainer} />
      </div>
    )
  }
}

export default Experiment15
