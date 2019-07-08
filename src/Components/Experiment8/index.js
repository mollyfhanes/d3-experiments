import React, { Component } from 'react'
import * as d3 from 'd3'
import Chance from 'chance'

const chance = new Chance()

class Experiment8 extends Component {
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
    const dataset = []
    while (dataset.length < 26) {
      dataset.push([chance.integer({ min: 0, max: 500 }), chance.floating({ min: 0, max: 1 })])
    }
    const margin = {
      top: 20,
      bottom: 20,
      left: 30,
      right: 50
    }
    const totalW = 700
    const totalH = 300
    const w = totalW - margin.left - margin.right
    const h = totalH - margin.top - margin.bottom

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => d[0])])
      .range([0, w])
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => d[1])])
      .range([h, 0])
    const aScale = d3
      .scaleSqrt()
      .domain([0, d3.max(dataset, d => d[1])])
      .range([0, 8])

    const xAxis = d3.axisBottom(xScale).ticks(5)
    const yAxis = d3.axisLeft(yScale).ticks(5).tickFormat(d3.format('.0%'))

    // You can format any number (n) by calling d3.format(string template)(n)!

    const svg = d3
      .select(this.svgContainer)
      .append('svg')
      .attr('width', totalW)
      .attr('height', totalH)
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('id', 'scatter-plot-g')

    // Data plots
    g.selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'scatter-plots')
      .attr('cx', d => xScale(d[0]))
      .attr('cy', d => yScale(d[1]))
      .attr('r', d => aScale(d[1]))

    // Axes
    g.append('g')
      .attr('id', 'scatter-x-axis')
      .attr('transform', `translate(0, ${h})`)
      .call(xAxis)

    g.append('g')
      .attr('id', 'scatter-y-axis')
      .call(yAxis)
  }

  render() {
    return (
      <div>
        <h3>Scaled Scatter Plot With Axes and Percentages</h3>
        <div ref={this.setSvgContainer} />
      </div>
    )
  }
}

export default Experiment8
