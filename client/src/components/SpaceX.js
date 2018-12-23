import React, { Component } from 'react'
import Launches from './Launches'

export class SpaceX extends Component {
  render() {
    return (
      <div className="container my-5">
        <Launches></Launches>
      </div>
    )
  }
}

export default SpaceX
