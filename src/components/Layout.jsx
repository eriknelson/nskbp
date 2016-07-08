import * as React from 'react';

import Hello from './Hello'

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Hello message="derp" />
    );
  }
}

export default Layout;
