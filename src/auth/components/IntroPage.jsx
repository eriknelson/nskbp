import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import  { EmailSignInForm } from 'redux-auth/bootstrap-theme';

import '../styles/introPage.scss';

const signInRedirect = '/home';

class IntroPage extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { router } = this.context;
    if(nextProps.isSignedIn) {
      router.replace(signInRedirect);
    }
  }

  render() {
    return (
      <div className="intro-page">
        <Row>
          <Col sm={4} />
          <Col sm={4}>
            <div className="login-form">
              <EmailSignInForm />
            </div>
          </Col>
          <Col sm={4} />
        </Row>
        <Row style={{'text-align': 'center', 'height': '100px', 'margin-top': '20px'}}>
          <p>User: foo@bar.io, Pass: changeme</p>
        </Row>
      </div>
    );
  }
}

IntroPage.contextTypes = {
  router: PropTypes.func.isRequired
};

export default connect(
  (state) => {
    return {
      isSignedIn: state.auth.getIn(['user', 'isSignedIn'])
    }
  }
)(IntroPage);
