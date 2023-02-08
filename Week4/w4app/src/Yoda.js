import React from 'react';

class BabyYoda extends React.Component {
  render() {
    return <h2>I am {this.props.name}!</h2>;
  }
}
export default class Yoda extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: 'Toy oda' };
  }
  render() {
    return <BabyYoda name={this.state.name} />;
  }
}
