import * as React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">NSKBP</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">Herp</NavItem>
          <NavItem eventKey={2} href="#">Derp</NavItem>
          <NavDropdown eventKey={3} title="DerpyFooBar" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Foo</MenuItem>
            <MenuItem eventKey={3.2}>Bar</MenuItem>
            <MenuItem eventKey={3.3}>Baz</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Lorem</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default Layout;
