import * as React from 'react';

import Hello from '../../content/components/Hello'
import Counter from '../../hmr/components/Counter'

import '../styles/layout.scss';

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="layout">
        <div className="wrapper">
          <Hello message="derp" />
          <Counter />
        </div>
      </div>
    );
  }
}

export default Layout;
