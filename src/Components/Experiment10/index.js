
/* eslint-disable spaced-comment */

import React, { Component } from 'react'
import * as d3 from 'd3'
import Chance from 'chance'

const chance = new Chance()

class Experiment10 extends Component {
  constructor() {
    super()
    this.state = {
      dataset: [5, 6, 8, 10, 12, 14, 16, 18, 20, 17, 15, 13, 11, 9, 7, 10, 12, 14, 16, 10]
    }
    this.svgContainer = null
    this.setSvgContainer = this.setSvgContainer.bind(this)
    this.buttonOnClick = this.buttonOnClick.bind(this)
    this.drawChart = this.drawChart.bind(this)
  }

  componentDidMount() {
    this.drawChart()
  }

  componentDidUpdate() {
    this.drawChart(true)
  }

  setSvgContainer(e) {
    this.svgContainer = e
  }

  buttonOnClick() {
    const newDataset = []

    while (newDataset.length < 20) {
      newDataset.push(chance.integer({ min: 0, max: 50 }))
    }

    this.setState({ dataset: newDataset })
  }

  drawChart(update = false) {
    // Data
    const { dataset } = this.state

    // Dimensions
    const totalW = 600
    const totalH = 300
    const margin = {
      top: 5,
      bottom: 5,
      left: 5,
      right: 5
    }
    const w = totalW - margin.left - margin.right
    const h = totalH - margin.top - margin.bottom

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(d3.range(dataset.length))
      .rangeRound([0, w])
      .paddingInner(0.05)
    const yScale = d3
      .scaleLinear()
      .domain([d3.min(dataset), d3.max(dataset)])
      .range([h, 0])

    if (!update) {
      // DOM
      const svg = d3
        .select(this.svgContainer)
        .append('svg')
        .attr('id', 'bar-svg')
        .attr('width', totalW)
        .attr('height', totalH)

      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('id', 'bar-g')

      // Data Bars
      g.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('x', (d, i) => xScale(i))
        .attr('y', d => yScale(d))
        .attr('width', xScale.bandwidth())
        .attr('height', d => h - yScale(d))
        .attr('fill', d => `rgb(0, 0, ${Math.round(d * 10)})`)

      // Labels
      g.selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .text(d => d)
        .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr('y', d => yScale(d) + 15)
        .attr('font-size', '11px')
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
    } else {
      const g = d3.select('#bar-g')

      // Data Bars
      g.selectAll('rect')
        .data(dataset)
        .transition()
        .delay((d, i) => i / dataset.length * 1000)
        .duration(500)
        .attr('y', d => yScale(d))
        .attr('height', d => h - yScale(d))
        .attr('fill', d => `rgb(0, 0, ${Math.round(d * 10)})`)

      // Labels
      g.selectAll('text')
        .data(dataset)
        .transition()
        .delay((d, i) => i / dataset.length * 1000)
        .duration(500)
        //.ease(d3.easeBounceOut)
        .text(d => d)
        .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr('y', d => yScale(d) + 15)
    }
  }

  render() {
    return (
      <div>
        <h3>Scaled Bar Chart With Transitions</h3>
        <div ref={this.setSvgContainer} />
        <button type="button" id="bar-chart-button" onClick={this.buttonOnClick}>
          New Values
        </button>
      </div>
    )
  }
}

export default Experiment10
