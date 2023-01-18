import React, { PureComponent } from 'react';

class Try_class extends PureComponent {
  render() {
    return (
      <li>
        <div>{this.props.tryInfo.try}</div>
        <div>{this.props.tryInfo.result}</div>
      </li>
    )
  }
}

export default Try_class;