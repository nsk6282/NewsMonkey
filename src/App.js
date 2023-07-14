// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const API_KEY = "4350008d512a4e4bb9d30da626c7f92d";

export default class App extends Component {
  
  render() {
    return (
      <Router>
      <div>
       <Navbar/>
       <Routes>
        {/* <Route exact path="/" element={<Forms showAlert={showAlert} title="Enter text" mode={mode}/>}/> */}
        <Route exact path="/" element={<News key="general" pageSize={6} country="in" apiKey={API_KEY} category='general' />}/>
        <Route exact path="/business" element={<News key="business" pageSize={6} country="in" apiKey={API_KEY} category='business' />}/>
        <Route exact path="/entertainment" element={<News key="entertainment" pageSize={6} country="in" apiKey={API_KEY} category='entertainment' />}/>
        <Route exact path="/general" element={<News key="general" pageSize={6} country="in" apiKey={API_KEY} category='general' />}/>
        <Route exact path="/health" element={<News key="health" pageSize={6} country="in" apiKey={API_KEY} category='health' />}/>
        <Route exact path="/science" element={<News key="science" pageSize={6} country="in" apiKey={API_KEY} category='science' />}/>
        <Route exact path="/sports" element={<News key="sports" pageSize={6} country="in" apiKey={API_KEY} category='sports' />}/>
        <Route exact path="/technology" element={<News key="technology" pageSize={6} country="in" apiKey={API_KEY} category='technology' />}/>
      </Routes>
        
      </div>
      </Router>
    )
  }
};