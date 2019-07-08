import React, { Component } from 'react'
import * as d3 from 'd3'

class Experiment9 extends Component {
  constructor() {
    super()
    this.svgContainer = null
    this.setSvgContainer = e => {
      this.svgContainer = e
    }
  }

  componentDidMount() {
    this.drawChart()
  }

  drawChart() {
    const parseTime = d3.timeParse('%m/%d/%Y')
    const formatTime = d3.timeFormat('%b %e')
    const dateConverter = str => parseTime(str)
    const rawDataset = [
      ['01/01/2018', 100],
      ['01/03/2018', 200],
      ['01/05/2018', 300],
      ['01/10/2018', 400],
      ['01/13/2018', 500],
      ['01/16/2018', 600],
      ['01/18/2018', 500],
      ['01/20/2018', 300],
      ['01/23/2018', 400],
      ['01/25/2018', 500],
      ['01/30/2018', 600]
    ]
    const dataset = rawDataset.map(arr => [dateConverter(arr[0]), arr[1]])

    const margin = {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50
    }
    const totalW = 800
    const totalH = 300
    const w = totalW - margin.left - margin.right
    const h = totalH - margin.top - margin.bottom

    const xScale = d3
      .scaleTime()
      .domain([d3.min(dataset, d => d[0]), d3.max(dataset, d => d[0])])
      .range([0, w])
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => d[1])])
      .range([h, 0])
    const aScale = d3
      .scaleSqrt()
      .domain([0, d3.max(dataset, d => d[1])])
      .range([0, 5])

    const xAxis = d3.axisBottom(xScale).ticks(5)
    const yAxis = d3.axisLeft(yScale).ticks(5)

    const svg = d3
      .select(this.svgContainer)
      .append('svg')
      .attr('width', totalW)
      .attr('height', totalH)
    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)

    // Data plots
    g.selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d[0]))
      .attr('cy', d => yScale(d[1]))
      .attr('r', d => aScale(d[1]))

    // Labels
    g.selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      .text(d => `${formatTime(d[0])}`)
      .attr('x', d => xScale(d[0]))
      .attr('y', d => yScale(d[1] + 25))
      .attr('font-size', '10px')

    // Axes
    g.append('g')
      .attr('transform', `translate(0, ${h})`)
      .call(xAxis)

    g.append('g')
      .call(yAxis)
  }

  render() {
    return (
      <div>
        <h3>Time Scatter Plot With Axes</h3>
        <div ref={this.setSvgContainer} />
      </div>
    )
  }
}

export default Experiment9
