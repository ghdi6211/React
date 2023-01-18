import React, { PureComponent } from 'react';

class Test extends PureComponent {
  state = {
    counter: 0,
  };
  /*난잡한 렌더링을 막기위해선 
    shouldComponentUpdate 를 사용해야함
    하지만 Component를 PureComponent로 바꾸면
    이 처리를 자동으로 해줌
    !!부모컴포넌트가 리렌더링되면 자식도 리렌더링됨
  
    shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state.counter !== nextState.counter) {
      return true;
    }else {
      return false;
    }
  }
  */

  onClick = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };

  /*prevCounter로 변하기전 값으로 
  onClick = () => {
    this.setState((prevCounter) => {
      return {
        counter: prevCounter.counter + 1
      }
    });
  };*/
  
  /* onClick = () => {
    this.setState({});
  };*/

  //React에서 setState를 호출하면 렌더링이 일어남
  render() {
    console.log('Render', this.state);
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    );
  };
}


export default Test;