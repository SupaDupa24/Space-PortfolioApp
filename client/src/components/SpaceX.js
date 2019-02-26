import React, { Component } from "react";
import Launches from "./Launches";
import SpaceXEvents from "./SpaceXEvents";
import SpaceXLogo from "../spacex2.png";
import AnchorLink from 'react-anchor-link-smooth-scroll'
export class SpaceX extends Component {
  render() {
    return (
      <div className="container my-5">
        <section className="jumbotron text-center">
          <div className="container">
            <img src={SpaceXLogo} style={{width:500, paddingLeft:50}} className="img-fluid" alt="SapceX Logo" />
            <p className="lead text-muted">
            SpaceX is a private aerospace manufacturer and space transportation services 
            company headquartered in California. Founded in 2002 by entrepreneur 
            Elon Musk with the goal of enabling the colonization of Mars.
            </p>
            <p>
              <AnchorLink href="#Launches" className="btn btn-primary btn-lg">See SpaceX Missions</AnchorLink>
            </p>
          </div>
        </section>
        <SpaceXEvents type="Recent" />
        <Launches type='Recent'/>
      </div>
    );
  }
}

export default SpaceX;
