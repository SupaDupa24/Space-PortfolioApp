import React, { Component } from 'react'
import Launches from './Launches'
import PicOfDay from './PicOfDay';

export class Home extends Component {
  render() {
    return (
      <div className="container">
        <PicOfDay>
            
        </PicOfDay>
        <Launches>

        </Launches>
      </div>
    )
  }
}

export default Home
