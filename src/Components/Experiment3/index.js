import React, { Component } from 'react'
import * as d3 from 'd3'

class Experiment3 extends Component {
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
    const dataset = [5, 10, 15, 20, 25]
    const h = 100
    const w = 500
    const svg = d3
      .select(this.svgContainer)
      .append('svg')
      .attr('width', w)
      .attr('height', h)

    svg
      .selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => i * 60 + 25)
      .attr('cy', h / 2)
      .attr('r', d => d)
      .attr('fill', 'yellow')
      .attr('stroke', 'orange')
      .attr('stroke-width', d => d / 2)
  }

  render() {
    return (
      <div>
        <h3>Generating SVGs</h3>
        <div ref={this.setSvgContainer} />
      </div>
    )
  }
}

export default Experiment3
