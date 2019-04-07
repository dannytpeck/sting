import React, { Component } from 'react';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Header extends Component {
  generateMessage() {
    const messages = [
      'Fun with APIs',
      'Building the better mouse trap',
      'Josh\'s anglophilia is out of control',
      'Don\'t tell Limeade we made this',
      'Dengue II: Dengue Harder',
      'Take a penny, leave a penny'
    ];

    return messages[Math.floor(Math.random() * messages.length)];
  }

  render() {
    return (
      <header id="header">
        <img src="images/logo.svg" />
        <h1 className="title">Sting</h1>
        <h3>{this.generateMessage()}</h3>
      </header>
    );
  }
}

export default Header;
