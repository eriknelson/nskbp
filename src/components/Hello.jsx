import * as React from 'react';

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {message} = this.props;

    return (
      <div>{message}</div>
    );
  }
}

export default Layout;
