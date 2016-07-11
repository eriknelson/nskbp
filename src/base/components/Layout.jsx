import * as React from 'react';

import NskNav from './NskNav';
import Home from '../../content/components/Home';
import '../styles/layout.scss';

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="layout">
        <NskNav />
        <div className="container">
          <Home />
        </div>
      </div>
    );
  }
}

export default Layout;
