import React, { Component } from "react";
import logo from "../spacex2.png";
import logo2 from '../NASA.png'
import Emoji from './Emoji'
import {
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
  DropdownItem } from 'reactstrap';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar className="mb-5" color="primary" light expand="md">
          <NavbarBrand style={{marginLeft:100}} className="" href="/">
          <Emoji symbol="🚀"></Emoji> SpaceX React App <Emoji symbol="🚀"></Emoji>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://www.raffallijoseluis.com.ve">My Page</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/jotaraffalli">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Application Info
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    What is this?
                  </DropdownItem>
                  <DropdownItem>
                    How is it made with?
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      
    );
  }
}

export default NavBar;
