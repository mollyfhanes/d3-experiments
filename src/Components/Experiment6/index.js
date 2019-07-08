import React, { Component } from 'react'
import * as d3 from 'd3'

class Experiment6 extends Component {
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
    const dataset = [
      [5, 20],
      [480, 90],
      [250, 50],
      [100, 33],
      [330, 95],
      [410, 12],
      [475, 44],
      [25, 67],
      [85, 21],
      [220, 88],
      [600, 150]
    ]
    const w = 700
    const h = 300
    const padding = 20

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => d[0])])
      .range([padding, w - padding * 2.5])
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => d[1])])
      .range([h - padding, padding])
    const aScale = d3
      .scaleSqrt()
      .domain([0, d3.max(dataset, d => d[1])])
      .range([0, 8])

    const svg = d3
      .select(this.svgContainer)
      .append('svg')
      .attr('width', w)
      .attr('height', h)

    // Data plots
    svg.selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d[0]))
      .attr('cy', d => yScale(d[1]))
      .attr('r', d => aScale(d[1]))

    // Labels
    svg.selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      .text(d => `(${d[0]}, ${d[1]})`)
      .attr('x', d => xScale(d[0]))
      .attr('y', d => yScale(d[1] + 6))
      .attr('font-size', '10px')
  }

  render() {
    return (
      <div>
        <h3>Scatter Plot Using Scales</h3>
        <div ref={this.setSvgContainer} />
      </div>
    )
  }
}

export default Experiment6
