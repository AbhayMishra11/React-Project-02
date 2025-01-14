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
              <Route exact path='/' element={<News key='india' search={'india'} />} />
              <Route exact path='/health' element={<News key='health' search={'health'} />} />
              <Route exact path='/sports' element={<News key='sports' search={'sports'} />} />
              <Route exact path='/technology' element={<News key='technology' search={'technology'} />} />
              <Route exact path='/science' element={<News key='science' search={'science'} />} />
              <Route exact path='/movies' element={<News key='movies' search={'movies'} />} />
            </Routes>
          </Router>
        </div>
      </Context.Provider>
    )
  }
}
