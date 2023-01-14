import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from './components/login'
import Home from './components/home'
import Admin from './components/admin'
import Video from './components/video'
import Music from './components/music'
import Food from './components/food'
import './App.css';
import reportWebVitals from './reportWebVitals';

class App extends React.Component {

  enter = () =>{
    let navigate= useNavigate();
    navigate("main");
  }
  init = ()=>{reportWebVitals();}
  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login login={this.enter}/>}/>
            <Route path="main" element={<Home />} />
            <Route path="admin" element={<Admin />} />
            <Route path="video" element={<Video />} />
            <Route path="music" element={<Music />} />
            <Route path="food" element={<Food />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

}

export default App;
