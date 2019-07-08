import React from 'react'
import './App.css'
import Experiment10 from './Components/Experiment10'
import Experiment11 from './Components/Experiment11'
import Experiment12 from './Components/Experiment12'
import Experiment13 from './Components/Experiment13'
import Experiment14 from './Components/Experiment14'
import Experiment15 from './Components/Experiment15'
import Bars from './Components/Bars'
import barsData from './Components/Bars/barsData'


const App = () => (
  <div id="app">
    <Experiment10 />
    <Experiment11 />
    <Experiment12 />
    <Experiment13 />
    <Experiment14 />
    <Experiment15 />
    <Bars data={barsData} />
  </div>
)

export default App
