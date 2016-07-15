import React, { PropTypes } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

class NskNav extends React.Component {
  render() {
    const { isSignedIn } = this.props;

    const authNav = ['home', 'dns'];
    let links = ['about'];
    if(isSignedIn) {
      links = links.concat(authNav);
    }

    const nav = (
      <Nav>
        {
          links.map((link, idx) => {
            return (
              <LinkContainer key={link} to={`/${link}`}>
                <NavItem eventKey={idx} href="#">
                  {link.toUpperCase()}
                </NavItem>
              </LinkContainer>
            )
          })
        }
      </Nav>
    );

    return (
      <Navbar>
        <LinkContainer style={{'cursor': 'pointer'}} to='/'>
          <Navbar.Header>
              <Navbar.Brand>
                NSKBP
              </Navbar.Brand>
          </Navbar.Header>
        </LinkContainer>
        {nav}
      </Navbar>
    );
  }
};

NskNav.propTypes = {
  isSignedIn: PropTypes.bool.isRequired
};

export default connect(
  (state) => {
    return {
      isSignedIn: state.auth.getIn(['user', 'isSignedIn'])
    };
  }
)(NskNav);
