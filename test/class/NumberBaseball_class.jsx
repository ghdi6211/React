import React, { Component, createRef } from 'react';
//import Try_class from './Try_class';
//class에서 ref를 creatRef로 하면 Hook이랑 똑같이 사용가능


function getNumbers() { //숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball_class extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join('')) {
      this.setState({
        result: `${this.state.answer.join(',')} 홈런`,
        tries: [...this.state.tries, {try: this.state.value, result:'홈런!'}],
      })
      alert(`${this.state.answer.join(',')} \n 홈런 입니다.게임을 다시 시작합니다!`);
        this.setState( {
          value: '',
          answer: getNumbers(),
          tries: [],
        });
        this.inputRef.current.focus();
    } else {
      const answerArray = this.state.value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if(this.state.tries.length >= 9) {
        this.setState( {
          result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')}였습니다!`
        });
        alert('게임을 다시 시작합니다!');
        this.setState( {
          value: '',
          answer: getNumbers(),
          tries: [],
        });
        this.inputRef.current.focus();
      }else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === this.state.answer[i]) {
            strike += 1;
          }else if (this.state.answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState( {
          tries: [...this.state.tries, {try: this.state.value, result: `${strike}: 스트라이크 - ${ball} :볼`}],
          value:'',
        });
        this.inputRef.current.focus();
      }
    }
  };

  onChangeInput = (e) => {
    
    this.setState( {
      value: e.target.value,
    });
  };

  inputRef = createRef();


  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
          <button>입력!</button>
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul style={{ listStyle: 'none' }}>
          {this.state.tries.map((v, i) => {
              return (
                //NumberBaseball이 Try의 부모가 된다
                //부모 props를 자식 props에 물려준다 > 유산 부모를 찾아보기
                //부모의 부모에게서(복잡한 관계에서) props를 물려받거나 할때 유용한것 redux
                <Try_class key={`${i + 1}차 시도`} tryInfo={v} index={i} />
              );
            })}
            {/*react 주석 처리방법*/}
        </ul>
      </>
    );
  }
}

export default NumberBaseball_class; //여기수정