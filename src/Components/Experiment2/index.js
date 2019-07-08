import React, { Component } from 'react'
import * as d3 from 'd3'
import Chance from 'chance'

const chance = new Chance()

class Experiment2 extends Component {
  constructor() {
    super()

    this.divRef = null

    this.setDivRef = e => {
      this.divRef = e
    }
  }

  componentDidMount() {
    this.drawChart()
  }

  drawChart() {
    const dataset = []

    while (dataset.length < 21) {
      dataset.push(chance.integer({ min: 0, max: 50 }))
    }

    d3.select(this.divRef)
      .selectAll('div')
      .data(dataset)
      .enter()
      .append('div')
      .attr('class', 'bar')
      .style('height', d => `${d * 5}px`)
      .style('margin-right', '5px')
  }

  render() {
    return (
      <div>
        <h3>Simple Bar Chart With Divs</h3>
        <div ref={this.setDivRef} />
      </div>
    )
  }
}

export default Experiment2
