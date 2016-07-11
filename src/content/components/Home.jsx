import * as React from 'react';
import { Jumbotron } from 'react-bootstrap';

import Counter from '../../widgets/components/Counter'

import '../styles/home.scss';

class Home extends React.Component {
  render() {
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

export default Home;
