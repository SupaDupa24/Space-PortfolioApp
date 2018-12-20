import React, { Component } from "react";
import Launches from "./Launches";
import PicOfDay from "./PicOfDay";
import Footer from './Footer'
import Intro from './Intro'

export class Home extends Component {
  render() {
    return (
      <div className="container">
        <Intro></Intro>
        <PicOfDay />
        <Launches />
      </div>
    );
  }
}

export default Home;
