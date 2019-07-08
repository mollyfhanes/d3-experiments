import React, { Component } from 'react'
import * as d3 from 'd3'

class Experiment5 extends Component {
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
      [220, 88]
    ]
    const totalWidth = 700
    const totalHeight = 200
    const margin = {
      left: 25,
      right: 25,
      top: 25,
      bottom: 25
    }
    const w = totalWidth - margin.left - margin.right
    const h = totalHeight - margin.top - margin.bottom

    const svg = d3
      .select(this.svgContainer)
      .append('svg')
      .attr('width', w)
      .attr('height', h)

    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)

    // Data points
    g
      .selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('cx', d => d[0])
      .attr('cy', d => d[1] + 10)
      .attr('r', d => Math.sqrt(d[1]))

    // Labels
    g
      .selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      .text(d => `(${d[0]}, ${d[1]})`)
      .attr('x', d => d[0])
      .attr('y', d => d[1])
      .attr('fill', 'orange')
      .attr('font-size', '12px')
  }

  render() {
    return (
      <div>
        <h3>Simple Scatter Plot With Relative Circle Areas</h3>
        <div ref={this.setSvgContainer} />
      </div>
    )
  }
}

export default Experiment5
