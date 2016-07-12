import * as React from 'react';
import { Jumbotron } from 'react-bootstrap';

import Layout from '../../base/components/Layout';
import Counter from '../../widgets/components/Counter';

import '../styles/homePage.scss';

const HomePage = () => {
  return (
    <Layout>
      <Jumbotron>
        <h1>NSK Boilerplate</h1>
        <p>React | Webpack | HMR | React Bootstrap</p>
      </Jumbotron>
      <Counter />
    </Layout>
  );
};

export default HomePage;
