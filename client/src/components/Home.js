import React, { Component } from "react";
import PicOfDay from "./PicOfDay";
import Intro from './Intro'
import SpaceXFeed from "./SpaceXFeed";

export class Home extends Component {
  render() {
    return (
      <div className="container">
        <Intro></Intro>
        <PicOfDay />
        <SpaceXFeed></SpaceXFeed>
      </div>
    );
  }
}

export default Home;
