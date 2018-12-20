import React, { Component } from "react";
import logo from "../spacex2.png";
//import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
        <div className="container d-flex">
          <a className="navbar-brand" href="#">
            <img style={{ width: 300 }} src={logo} alt="SpaceX Logo" />
          </a>
          <button className="btn btn-secondary mx-5">App Info!</button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
