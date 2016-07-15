import React, { PropTypes } from 'react';
import { Jumbotron } from 'react-bootstrap';

import Counter from '../../widgets/components/Counter';

import '../styles/homePage.scss';

class HomePage extends React.Component {
  render () {
    return (
      <div>
        <Jumbotron>
          <h1>NSK Boilerplate</h1>
          <p>React | Webpack | HMR | React Bootstrap</p>
        </Jumbotron>
        <Counter />
      </div>
    );
  }
}

export default HomePage;
