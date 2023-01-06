/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  
  let post = '강남 우동 맛집';
  /*Destructuring문법 배열
  let [a, b] = [1, 2]
  a = 1, b = 2 */
  /*
  useState를 쓰는 이유
  useState안에 내용이 바뀌면
  자동으로 재렌더링(페이지갱신)이 됨
  state을 쓰던 html이 재렌더링
  1.state는 사직연산으로 변경하지않음
  */
  let [title, ch] = useState(['남자 코트 추천','강남 우동맛집', '파이썬독학']);
  let [like, c] = useState(0);
  function likeplus() {
    c(like + 1);
  }
  function titlech() {
    let copy = [...title];
    copy = copy.sort();
    ch(copy);
  }
  //onClick={()=>{}}
  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      <button onClick={()=>{titlech()}}>🎀</button>
      <div className="list">
        <h4>{ title[0] }<span onClick={()=>{likeplus()}}>👍</span> {like} </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ title[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ title[2] }</h4>
        <p>2월 17일 발행</p>
      </div>
      {/*더 간편하게 <Modal/> 로도 가능*/}
      <Modal></Modal>
      
    </div>
  );
}
function Modal() {
  /*의미없는 div 만들기 싫다 = <></>
  1.반복적인 htmll 축약할 때
  2. 큰 페이지들
  3. 자주 변경되는 것들
  */
  return(
    <div className="modal">
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
  )
}
export default App;
