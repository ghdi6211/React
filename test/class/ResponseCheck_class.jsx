import React, { Component } from 'react';
import Try2_class from './Try2_class';

//값이 변하면 리렌더링이 되어짐으로 
//값이 변해도 리렌더링을 하고 싶지않을때
//useRef를 쓰면 값이 변해도 리렌더링으 되지않음.
//useRef는 값이 변해도 화면에 영향이 없음;
class ResponseCheck_class extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요',
    result: [],
    sum: 0,
  };

  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state, message, result , sum} = this.state;

    if (state === 'waiting') { //준비상태로 진입
      this.setState({
        state: 'ready',
        message: '색이 바뀌면 클릭하세요',
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          message: '지금 클릭!',
        });
        this.startTime = new Date();
      },
        Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') { //빨리 클릭
      clearTimeout(this.timeout);
      this.setState((pervState) => {
        return {
          state: 'waiting',
          message: '클릭해서 시작하세요',
          result: [...pervState.result],
          sum: pervState.sum,
        }
      });
      alert('너무빨리 눌렀습니다.\n 다시 시작합니다')
    } else if (state === 'now') { //정상 클릭
      this.endTime = new Date();
      this.setState((pervState) => {
        return {
          state: 'waiting',
          message: '클릭해서 시작하세요',
          result: [...pervState.result, this.endTime - this.startTime],
          sum: pervState.sum + parseInt(this.endTime - this.startTime),
        }
      });
    }
  };

  renderAverage = () => {
    const { result, sum } = this.state;
    return result.length === 0
      ? null //false, undefineds, null은 jsx에서 태그없음을 의미
      : <><div>평균 반응 속도 : {Math.floor(sum / result.length)}ms </div>
        <button onClick={this.onClickReset}>초기화</button>
        </>
      
  };

  onClickReset = () => {
    this.setState({
      state: 'waiting',
      message: '클릭해서 시작하세요',
      result: [],
      sum: 0,
    });
    clearTimeout(this.timeout);
  };

  
  
  render() {
    const { state, message, result, sum } = this.state;

    return (
      <>
        <div
          id="screen"
          className={state}
          onClick={this.onClickScreen}
        >
          {message}
        </div>
        <ul style={{ listStyle: 'none' }}>
        {result.map((v, i) => {
              return (
                //NumberBaseball이 Try의 부모가 된다
                //부모 props를 자식 props에 물려준다 > 유산 부모를 찾아보기
                //부모의 부모에게서(복잡한 관계에서) props를 물려받거나 할때 유용한것 redux
                <Try2_class key={`${i + 1}차 시도`} tryInfo={v} index={i} />
                );
            })}
        </ul>
        <div>{this.renderAverage()}</div>
      </>
    );
  }
}

export default ResponseCheck_class;