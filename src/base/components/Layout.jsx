import * as React from 'react';

import NskNav from './NskNav';
import '../styles/layout.scss';

const Layout = ({children}) => {
  return (
    <div className="layout">
      <NskNav />
      <div className="container">
        {children}
      </div>
    </div>
  );
};

export default Layout;
