import React, { Component } from 'react'
import * as d3 from 'd3'
import Chance from 'chance'

const chance = new Chance()

class Experiment13 extends Component {
  constructor() {
    super()
    this.state = {
      dataset: [5, 6, 8, 10, 12, 14, 16, 18, 20, 17, 15, 13, 11, 9, 7, 10, 12, 14, 16, 10]
    }
    this.svgContainer = null
    this.setSvgContainer = this.setSvgContainer.bind(this)
    this.buttonOnClick = this.buttonOnClick.bind(this)
    this.sort = this.sort.bind(this)
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

  sort() {
    // Data
    const { dataset } = this.state

    // Dimensions
    const totalW = 600
    const margin = {
      top: 5,
      bottom: 5,
      left: 5,
      right: 5
    }
    const w = totalW - margin.left - margin.right

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(d3.range(dataset.length))
      .rangeRound([0, w])
      .paddingInner(0.05)

    d3.select('#exp13-g')
      .selectAll('rect')
      .sort((a, b) => d3.ascending(a, b))
      .transition('sortBars')
      .delay((d, i) => (i / dataset.length) * 1000)
      .duration(1000)
      .attr('x', (d, i) => xScale(i))
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
        .attr('id', 'exp13-svg')
        .attr('width', totalW)
        .attr('height', totalH)

      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('id', 'exp13-g')

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
        .on('mouseover', (d, i, nodes) => {
          d3.select(nodes[i]).classed('orange', true)
          d3.select('#exp13-tooltip')
            .transition()
            .style('background-color', 'rgba(255, 255, 255, 0.9)')
            .style('box-shadow', '4px 4px 10px rgba(0, 0, 0, 0.4)')
            .style('left', `${d3.event.pageX}px`)
            .style('top', `${d3.event.pageY}px`)
          d3.select('#exp13-value')
            .transition()
            .text(d)
        })
        .on('mouseout', (d, i, nodes) => {
          d3.select(nodes[i]).classed('orange', false)
          d3.select('#exp13-tooltip')
            .transition()
            .style('background-color', 'rgba(255, 255, 255, 0)')
            .style('box-shadow', '4px 4px 10px rgba(0, 0, 0, 0)')
            .select('#exp13-value')
            .transition()
            .text()
        })

      /*
      NOTE: When using 'on', if CSS can handle it, use CSS.
      Also, naming transitions is NOT necessary, however,
      naming them WILL prevent them from interrupting each other.
      */
    } else {
      const g = d3.select('#exp13-g')

      // Data Bars
      g.selectAll('rect')
        .data(dataset)
        .transition()
        .delay((d, i) => (i / dataset.length) * 1000)
        .duration(500)
        .attr('y', d => yScale(d))
        .attr('height', d => h - yScale(d))
        .attr('fill', d => `rgb(0, 0, ${Math.round(d * 10)})`)
    }
  }

  render() {
    return (
      <div>
        <h3>Scaled Bar Chart With Hover and Sort</h3>
        <div ref={this.setSvgContainer} />
        <div id="exp13-tooltip">
          <p id="exp13-value" />
        </div>
        <button type="button" id="exp13-new-button" onClick={this.buttonOnClick}>
          New Values
        </button>
        <button type="button" id="exp13-sort-button" onClick={this.sort}>
          Sort
        </button>
      </div>
    )
  }
}

export default Experiment13
