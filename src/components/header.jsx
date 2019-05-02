import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);

    const messages = [
      'Fun with APIs',
      'Building the better mouse trap',
      'Josh\'s anglophilia is out of control',
      'Don\'t tell Limeade we made this',
      'Dengue II: Dengue Harder',
      'Take a penny, leave a penny'
    ];

    this.state = {
      message: messages[Math.floor(Math.random() * messages.length)]
    };
  }

  render() {
    return (
      <header id="header">
        <img src="images/logo.svg" />
        <h1 className="title">Sting</h1>
        <h3>{this.state.message}</h3>
      </header>
    );
  }
}

export default Header;
