import React, { Component } from 'react'
import * as d3 from 'd3'
import * as foodData from './foodData'

class Experiment1 extends Component {
  constructor() {
    super()

    this.divRef = null

    this.setDivRef = e => {
      this.divRef = e
    }
  }

  componentDidMount() {
    d3.select(this.divRef)
      .append('div')
      .selectAll('p')
      .data(foodData)
      .enter()
      .append('p')
      .text(
        d => `${d.name.toUpperCase()} are ${d.color} and rate ${d.deliciousness}/10 in deliciousness`
      )

    const data = ['salamander', 2, 'choo choo train', 4, 0.6]

    d3.select(this.divRef)
      .append('div')
      .selectAll('p')
      .data(data)
      .enter()
      .append('p')
      .text(d => `This paragraph has the following data attached: ${d}`)
      .style('color', d => (d > 2 ? 'red' : 'black'))
  }

  render() {
    return (
      <div>
        <h3>Attaching Data to DOM</h3>
        <div ref={this.setDivRef} />
      </div>
    )
  }
}

export default Experiment1
