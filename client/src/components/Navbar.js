import React, { Component } from "react";
import logo from "../spacex2.png";
import logo2 from "../NASA.png";
import Emoji from "./Emoji";
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { Link } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.navBarDrop = this.navBarDrop.bind(this);

    // Modals Toggle
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);

    this.state = {
      modal: false,
      modal2: false,
      isOpen: false
    };
  }
  navBarDrop() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  toggle2() {
    this.setState({
      modal2: !this.state.modal2
    });
  }
  render() {
    return (
      <div>
        <Navbar className="mb-5" color="primary" light expand="md">
          <NavbarBrand className="mx-5" href="/">
            Space React App <Emoji symbol="🚀" />
          </NavbarBrand>
          <NavbarToggler onClick={this.navBarDrop} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto mr-5" navbar>
              <NavItem>
                <Link className="nav-link" to="/spaceX">
                  SpaceX Missions
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/Nasa">
                  Nasa
                </Link>
              </NavItem>
              <NavItem>
                <NavLink href="https://www.raffallijoseluis.com.ve">
                  My Page
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/jotaraffalli">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Application Info
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={this.toggle2}
                  >What is this?
                  </DropdownItem>
                  <DropdownItem onClick={this.toggle}>
                    Technologies used
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Technologies used</ModalHeader>
          <ModalBody>
            <div className="conatiner text-center">
              <div className="row">
                <div className="col-6">
                  <h5>Frontend</h5>
                  <ul className="list-group">
                    <li className="list-group-item">React 16.5</li>
                    <li className="list-group-item">Apollo Client</li>
                    <li className="list-group-item">Moment</li>
                    <li className="list-group-item">ReactStrap</li>
                  </ul>
                </div>
                <div className="col-6">
                  <h5>Backend</h5>
                  <ul className="list-group">
                    <li className="list-group-item">Express</li>
                    <li className="list-group-item">GraphQl</li>
                    <li className="list-group-item">Babel</li>
                    <li className="list-group-item">Axios</li>
                  </ul>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        {/* Modal 2 */}
        <Modal isOpen={this.state.modal2} toggle={this.toggle2} className={this.props.className}>
          <ModalHeader toggle={this.toggle2}>General Info</ModalHeader>
          <ModalBody>
            <p>
              This is a personal Fullstack app that retrives info from some popular Space APIs.
              It is under beta and will add other functionalities when I have time.  <br/>
              As for now you can check some interesting info about SpaceX missions and NASA's pictures. 
            </p> 
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle2}>Got it!</Button>
            <a href="https://github.com/jotaraffalli" className="btn btn-primary"  onClick={this.toggle2}>My GitHub</a>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default NavBar;
