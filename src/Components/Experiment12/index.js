import React, { Component } from 'react'
import * as d3 from 'd3'
import Chance from 'chance'

const chance = new Chance()

class Experiment12 extends Component {
  constructor() {
    super()
    this.state = {
      dataset: [
        { key: 0, value: 5 },
        { key: 1, value: 6 },
        { key: 2, value: 8 },
        { key: 3, value: 10 },
        { key: 4, value: 12 },
        { key: 5, value: 14 },
        { key: 6, value: 16 },
        { key: 7, value: 18 },
        { key: 8, value: 20 },
        { key: 9, value: 17 },
        { key: 10, value: 15 },
        { key: 11, value: 13 },
        { key: 12, value: 11 },
        { key: 13, value: 9 },
        { key: 14, value: 7 },
        { key: 15, value: 10 },
        { key: 16, value: 12 },
        { key: 17, value: 14 },
        { key: 18, value: 16 },
        { key: 19, value: 10 }
      ]
    }
    this.svgContainer = null
    this.setSvgContainer = this.setSvgContainer.bind(this)
    this.addValue = this.addValue.bind(this)
    this.removeValue = this.removeValue.bind(this)
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

  addValue() {
    const { dataset } = this.state
    const lastIndex = dataset[dataset.length - 1].key

    dataset.push({ key: lastIndex + 1, value: chance.integer({ min: 0, max: 50 }) })

    this.setState({ dataset })
  }

  removeValue() {
    const { dataset } = this.state
    dataset.shift()

    this.setState({ dataset })
  }

  drawChart(update = false) {
    // Data
    const { dataset } = this.state
    const key = d => d.key

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
      .domain([d3.min(dataset, d => d.value), d3.max(dataset, d => d.value)])
      .range([h, 0])

    if (!update) {
      // DOM
      const svg = d3
        .select(this.svgContainer)
        .append('svg')
        .attr('id', 'exp12-svg')
        .attr('width', totalW)
        .attr('height', totalH)

      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('id', 'exp12-g')

      // Data Bars
      g.selectAll('rect')
        .data(dataset, key)
        .enter()
        .append('rect')
        .attr('x', (d, i) => xScale(i))
        .attr('y', d => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', d => h - yScale(d.value))
        .attr('fill', d => `rgb(0, ${Math.round(d.value * 5)}, 0)`)

      // Labels
      g.selectAll('text')
        .data(dataset, key)
        .enter()
        .append('text')
        .text(d => d.value)
        .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr('y', d => yScale(d.value) + 15)
        .attr('font-size', '11px')
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
    } else {
      const g = d3.select('#exp12-g')

      // Data Bars
      const bars = g.selectAll('rect').data(dataset, key)

      bars
        .enter()
        // Enter selects only the NEW dataset additions, so that's what's being affected below
        .append('rect')
        .attr('x', totalW)
        .attr('y', d => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', d => h - yScale(d.value))
        .attr('fill', d => `rgb(0, ${Math.round(d.value * 5)}, 0)`)
        .merge(bars)
        // Merge changes, and the following affects all rectangles, as selected in line 109
        .transition()
        .delay((d, i) => (i / dataset.length) * 1000)
        .duration(500)
        .attr('x', (d, i) => xScale(i))
        .attr('y', d => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', d => h - yScale(d.value))
        .attr('fill', d => `rgb(0, ${Math.round(d.value * 5)}, 0)`)

      bars
        .exit()
        .transition()
        .duration(500)
        .attr('x', -xScale.bandwidth())
        .remove()

      // Labels
      const labels = g.selectAll('text').data(dataset, key)

      labels
        .enter()
        .append('text')
        .text(d => d.value)
        .attr('x', totalW)
        .attr('y', d => yScale(d.value) + 15)
        .attr('font-size', '11px')
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .merge(labels)
        .transition()
        .delay((d, i) => (i / dataset.length) * 1000)
        .duration(500)
        .text(d => d.value)
        .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr('y', d => yScale(d.value) + 15)

      labels
        .exit()
        .transition()
        .duration(500)
        .attr('x', -xScale.bandwidth())
        .remove()
    }
  }

  render() {
    return (
      <div>
        <h3>Scaled Bar Chart With Transitions</h3>
        <div ref={this.setSvgContainer} />
        <button type="button" id="exp12-add-button" onClick={this.addValue}>
          Add Value
        </button>
        <button type="button" id="exp12-remove-button" onClick={this.removeValue}>
          Remove Value
        </button>
      </div>
    )
  }
}

export default Experiment12
