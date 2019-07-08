import React, { Component } from 'react'
import * as d3 from 'd3'

class Experiment4 extends Component {
  constructor() {
    super()
    this.svgContainer = null
    this.setSvgContainer = this.setSvgContainer.bind(this)
  }

  componentDidMount() {
    this.drawChart()
  }

  setSvgContainer(e) {
    this.svgContainer = e
  }

  drawChart() {
    const dataset = [5, 6, 8, 10, 12, 14, 16, 18, 20, 17, 15, 13, 11, 9, 7, 10, 12, 14, 16]
    const w = 500
    const h = 100
    const padding = 5

    const svg = d3
      .select(this.svgContainer)
      .append('svg')
      .attr('width', w)
      .attr('height', h)

    // Data Bars
    svg
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * (w / dataset.length))
      .attr('y', d => h - d * 4)
      .attr('width', w / dataset.length - padding)
      .attr('height', d => d * 4)
      .attr('fill', d => `rgb(0, 0, ${Math.round(d * 10)})`)

    // Labels
    svg
      .selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      .text(d => d)
      .attr('x', (d, i) => i * (w / dataset.length) + (w / dataset.length - padding) / 2)
      .attr('y', d => h - d * 4 + 15)
      .attr('font-size', '11px')
      .attr('fill', 'white')
      .attr('text-anchor', 'middle')
  }

  render() {
    return (
      <div>
        <h3>Simple Bar Chart With SVGs and Hacky Color Scale</h3>
        <div ref={this.setSvgContainer} />
      </div>
    )
  }
}

export default Experiment4
