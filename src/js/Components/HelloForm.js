'use strict';

import React, {Component} from 'react';

import HelloSayer from './HelloSayer';

class HelloForm extends Component {
  constructor (props) {
    super (props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: 'world'
    }
  }

  handleChange (e) {
    this.setState({
      name: e.target.value
    });
  }

  render () {
    return (
      <div className="hello-form">
        <input type="text" onChange={this.handleChange} />
        <HelloSayer name={this.state.name} />
      </div>
    );
  }
}

export default HelloForm;
