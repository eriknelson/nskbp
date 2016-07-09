import * as React from 'react';

import '../styles/hello.scss';

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {message} = this.props;

    return (
      <div className='hello'>{message}</div>
    );
  }
}

export default Layout;
