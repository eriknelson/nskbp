import * as React from 'react';

import '../styles/counter.scss';

class Layout extends React.Component {
  constructor(props) {
    super(props)

    // Initial state
    this.state= {
      count: 0
    };
  }
  componentDidMount() {
    this.interval = setInterval(
      this.increment.bind(this),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  increment() {
    this.setState({
      count: this.state.count + 1
    });
  }
  render() {
    const {count} = this.state;

    return (
      <div className='counter'>
        Counter: {count}
      </div>
    );
  }
}

export default Layout;
