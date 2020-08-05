import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);

    const messages = [
      'Building the better mouse trap',
      'What\'s in your Limeade?',
      'Limeade, from the comfort of your own home',
      'Take a penny, leave a penny',
      'Because you\'re special',
      'Scratching an itch you don\'t have',
      'Swimming against the tides',
      'Leading a lion with a steak',
      'Cracking eggs with a hammer',
      'Pure delight',
      'More than just a taste',
      'See more, do more',
      'Take it to the limit',
      'Feel the magic',
      'New and improved',
      'Evolution. Revolution. Love.'
    ];

    this.state = {
      message: messages[Math.floor(Math.random() * messages.length)]
    };
  }

  render() {
    return (
      <header id="header">
        <div>
          <h5 className="text-danger float-left">INTERNAL USE ONLY</h5>
          <p className="text-right">Do not share this link outside of Aduro.</p>
        </div>
        <img src="images/logo.svg" />
        <h1 className="title">National Treasure</h1>
        <h3>{this.state.message}</h3>
      </header>
    );
  }
}

export default Header;
