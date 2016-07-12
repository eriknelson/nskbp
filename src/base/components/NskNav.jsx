import * as React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';

import { Link } from 'react-router';

const NskNav = () => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">NSKBP</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem eventKey={1} href="#">
          <span><Link to="/home">Home</Link></span>
        </NavItem>
        <NavItem eventKey={2} href="#">
          <span><Link to="/dns">DNS</Link></span>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default NskNav;
