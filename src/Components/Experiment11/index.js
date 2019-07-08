/* eslint-disable no-unused-vars */

import React, { Component } from 'react'
import * as d3 from 'd3'
import Chance from 'chance'

const chance = new Chance()
const dateConverter = str => d3.timeParse('%m/%d/%Y')(str)
const getDataset = (length = 20, year = 2018, limit = 600) => {
  const dataset = []
  while (dataset.length < length) {
    dataset.push([chance.date({ string: true, year }), chance.integer({ min: 0, max: limit })])
  }
  return dataset
}

class Experiment11 extends Component {
  constructor() {
    super()
    const dataset = getDataset().map(arr => [dateConverter(arr[0]), arr[1]])

    this.state = { dataset }
    this.svgContainer = null
    this.setSvgContainer = e => {
      this.svgContainer = e
    }

    this.buttonOnClick = this.buttonOnClick.bind(this)
    this.drawChart = this.drawChart.bind(this)
  }

  componentDidMount() {
    this.drawChart()
  }

  componentDidUpdate() {
    this.drawChart(true)
  }

  buttonOnClick() {
    const dataset = getDataset().map(arr => [dateConverter(arr[0]), arr[1]])

    this.setState({ dataset })
  }

  drawChart(update = false) {
    // Data
    const { dataset } = this.state

    // Dimensions
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

    // Scales
    const xScale = d3
      .scaleTime()
      .domain([d3.min(dataset, d => d[0]), d3.max(dataset, d => d[0])])
      .range([0, w])
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => d[1])])
      .range([h, 0])

    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(10)
    const yAxis = d3.axisLeft(yScale).ticks(5)

    if (!update) {
      // DOM
      const svg = d3
        .select(this.svgContainer)
        .append('svg')
        .attr('width', totalW)
        .attr('height', totalH)
      const mask = svg.append('clipPath')
        .attr('id', 'exp11-mask')
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', w)
        .attr('height', h)
      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('id', 'ex11-g')

      // Data plots
      g.append('g')
        .attr('clip-path', 'url(#exp11-mask)')
        .selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d[0]))
        .attr('cy', d => yScale(d[1]))
        .attr('r', 3)

      // Axes
      g.append('g')
        .attr('transform', `translate(0, ${h})`)
        .attr('id', 'ex11-x-axis')
        .call(xAxis)

      g.append('g')
        .attr('id', 'ex11-y-axis')
        .call(yAxis)
    } else {
      const g = d3.select('#ex11-g')

      // Data plots
      g.selectAll('circle')
        .data(dataset)
        // Transition 1
        .transition()
        .duration(500)
        // NOTE: See comment at end of file regarding 'on'
        .on('start', (d, i, nodes) => {
          d3.select(nodes[i])
            .attr('fill', 'magenta')
            .attr('r', 5)
        })
        .attr('cx', d => xScale(d[0]))
        .attr('cy', d => yScale(d[1]))
        // Transition 2
        .transition()
        .duration(250)
        .attr('fill', 'black')
        .attr('r', 3)

      // Use 'on' only for immediate changes, otherwise chain transitions together.
      // Only ONE transition can go at a time.

      // Axes
      const x = d3.select('#ex11-x-axis')
      const y = d3.select('#ex11-y-axis')

      y.transition()
        .duration(500)
        .call(yAxis)
      x.transition()
        .duration(500)
        .call(xAxis)
    }
  }

  render() {
    return (
      <div>
        <h3>Time Scatter Plot With Transitions and Clip Path</h3>
        <div ref={this.setSvgContainer} />
        <button type="button" id="scatter-plot-button" onClick={this.buttonOnClick}>
          New Values
        </button>
      </div>
    )
  }
}

export default Experiment11

/*
   This arrow function with a 'nodes' argument is kind of a hack.

   The pre-ES6 version looks like this:

   .on('start', function() {
      d3.select(this)
      .attr('fill', 'magenta')
      ...
    })

    How nice!

    However, the following WILL NOT WORK:

    .on('start', () => {
       d3.select(this)
       .attr('fill', 'magenta')
       ...
     })

    ... because it uses lexical 'this', and who knows what 'this' even refers to in this context.
*/
