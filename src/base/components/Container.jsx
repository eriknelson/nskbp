import * as React from 'react';

import NskNav from './NskNav';
import { Grid } from 'react-bootstrap';

import '../styles/container.scss';

const Container = ({children}) => {
  return (
    <div className="wrapper">
      <NskNav />
      <Grid className="content">{children}</Grid>
    </div>
  );
};

export default Container;
