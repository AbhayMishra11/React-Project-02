import './App.css'
import { Context } from './components/Context.jsx'
import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'

export default class App extends Component {
 
  render() {
    return (
      < Context.Provider value={this.state.Value} >
      <div>
       <Navbar/>
       <News />
      </div>
      </Context.Provider>
    )
  }
}
