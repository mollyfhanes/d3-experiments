import React, { Component } from 'react'
import * as d3 from 'd3'

class Experiment14 extends Component {
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
    const dataset = [5, 10, 20, 45, 6, 25]

    // Dimensions
    const w = 300
    const h = 300
    const outerR = w / 2
    const innerR = w / 3

    // Math
    const pie = d3.pie()
    const arc = d3
      .arc()
      .innerRadius(innerR)
      .outerRadius(outerR)
    const color = d3.scaleOrdinal(d3.schemeCategory10)

    // Chart
    const svg = d3
      .select(this.svgContainer)
      .append('svg')
      .attr('width', w)
      .attr('height', h)

    const arcs = svg
      .selectAll('g.arc')
      .data(pie(dataset))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('transform', `translate(${outerR}, ${outerR})`)
      .on('mouseover', (d, i, nodes) => {
        d3.select(nodes[i]).select('text').attr('fill', 'white')
      })
      .on('mouseout', (d, i, nodes) => {
        d3.select(nodes[i]).select('text').attr('fill', () => color(i))
      })

    arcs
      .append('path')
      .attr('fill', (d, i) => color(i))
      .attr('d', arc)

    arcs
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('fill', (d, i) => color(i))
      .attr('font-family', 'verdana')
      .attr('font-size', '11px')
      .text(d => d.value)
  }

  render() {
    return (
      <div>
        <h3>Doughnut Chart</h3>
        <div ref={this.setSvgContainer} />
      </div>
    )
  }
}

export default Experiment14
