import React from 'react';
import { Link } from 'react-router';

import '../styles/introPage.scss';

const IntroPage = () => {
  return (
    <div className="intro-page">
      <div className="intro-header"><h1>NSKBP</h1></div>
      <div className="login-form">
        <input type="textbox" placeholder="username"/>
        <input type="textbox" placeholder="password"/>
        <Link to='/home'>
          <button className="btn btn-primary">LOGIN</button>
        </Link>
      </div>
    </div>
  )
}

export default IntroPage;
