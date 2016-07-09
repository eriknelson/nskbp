import * as React from 'react';

import NskNav from './NskNav';
import Content from '../../content/components/Content';
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
          <Content />
        </div>
      </div>
    );
  }
}

export default Layout;
