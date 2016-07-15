import React from 'react';

class AboutPage extends React.Component {
  render() {
    const inlineStyle = {
      'margin-top': '20px'
    }

    return (
      <div style={inlineStyle}>
        <h3>This is an unauthenticated about page. Hello world!</h3>
      </div>
    );
  }
}

export default AboutPage;
