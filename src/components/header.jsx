import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header id="header">
        <img src="images/logo.svg" />
        <h1 className="title">Zantetsuken</h1>
        <h3>Cut Through Anything</h3>
      </header>
    );
  }
}

export default Header;
