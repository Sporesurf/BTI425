import React, { Component } from 'react';

export default class Car extends Component {
  constructor() {
    super();
    this.state = { color: 'red' };
  }
  render() {
    return <h2>I am a {this.state.color} Car!</h2>;
  }
}
