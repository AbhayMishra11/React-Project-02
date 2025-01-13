import './App.css'
import { Context } from './components/Context.jsx'
import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

export default class App extends Component {

  render() {
    return (
      < Context.Provider value={''} >
        <div>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/' element={<News search={'world'} />} />
              <Route path='/health' element={<News search={'health'} />} />
              <Route path='/sports' element={<News search={'sports'} />} />
              <Route path='/technology' element={<News search={'technology'} />} />
              <Route path='/science' element={<News search={'science'} />} />
              <Route path='/movies' element={<News search={'movies'} />} />
            </Routes>
          </Router>
        </div>
      </Context.Provider>
    )
  }
}
