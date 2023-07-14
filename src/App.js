// import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'







export default function App(){

  const [progress, setProgress] = useState(0);
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_API_KEY);
  
  
  // const setProgress=(progress)=>{
  //   this.setState({progress:progress})
  // }
  
  
    return (
      <Router>
      <div>
      <LoadingBar
                color='#f11946'
                progress={progress}
                height={3}
                // onLoaderFinished={() => this.setState({progress:0})}
            />
       <Navbar/>
       <Routes>
        {/* <Route exact path="/" element={<Forms showAlert={showAlert} title="Enter text" mode={mode}/>}/> */}
        <Route exact path="/" element={<News setProgress={setProgress} key="general" pageSize={6} country="in" apiKey={apiKey} category='general' />}/>
        <Route exact path="/business" element={<News setProgress={setProgress} key="business" pageSize={6} country="in" apiKey={apiKey} category='business' />}/>
        <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={6} country="in" apiKey={apiKey} category='entertainment' />}/>
        <Route exact path="/general" element={<News setProgress={setProgress} key="general" pageSize={6} country="in" apiKey={apiKey} category='general' />}/>
        <Route exact path="/health" element={<News setProgress={setProgress} key="health" pageSize={6} country="in" apiKey={apiKey} category='health' />}/>
        <Route exact path="/science" element={<News setProgress={setProgress} key="science" pageSize={6} country="in" apiKey={apiKey} category='science' />}/>
        <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={6} country="in" apiKey={apiKey} category='sports' />}/>
        <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={6} country="in" apiKey={apiKey} category='technology' />}/>
      </Routes>
        
      </div>
      </Router>
    )
  
};



