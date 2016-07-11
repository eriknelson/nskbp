import * as React from 'react';
import { Jumbotron } from 'react-bootstrap';

import Counter from '../../widgets/components/Counter'
import Hello from './Hello'

import '../styles/content.scss';

class Content extends React.Component {
  constructor(props) {
    super(props)
  }
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

export default Content;
