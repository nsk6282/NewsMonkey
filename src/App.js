// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'



const API_KEY = process.env.REACT_APP_API_KEY;



export default class App extends Component {
  state = {
    progress:0,
    apiKey:process.env.REACT_APP_API_KEY
  };
  
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  
  render() {
    return (
      <Router>
      <div>
      <LoadingBar
                color='#f11946'
                progress={this.state.progress}
                height={3}
                // onLoaderFinished={() => this.setState({progress:0})}
            />
       <Navbar/>
       <Routes>
        {/* <Route exact path="/" element={<Forms showAlert={showAlert} title="Enter text" mode={mode}/>}/> */}
        <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={6} country="in" apiKey={this.state.apiKey} category='general' />}/>
        <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={6} country="in" apiKey={this.state.apiKey} category='business' />}/>
        <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={6} country="in" apiKey={this.state.apiKey} category='entertainment' />}/>
        <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={6} country="in" apiKey={this.state.apiKey} category='general' />}/>
        <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={6} country="in" apiKey={this.state.apiKey} category='health' />}/>
        <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={6} country="in" apiKey={this.state.apiKey} category='science' />}/>
        <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={6} country="in" apiKey={this.state.apiKey} category='sports' />}/>
        <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={6} country="in" apiKey={this.state.apiKey} category='technology' />}/>
      </Routes>
        
      </div>
      </Router>
    )
  }
};