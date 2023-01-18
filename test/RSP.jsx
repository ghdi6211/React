import React, { useState, useRef, useEffect} from 'react';

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-288px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
}

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};
const RSP = () => {
  const [result, setResult] = useState(''); 
  const [imgCoord, setImgCoord] = useState(rspCoords.바위); 
  const [score, setScore] = useState(0);
  const interval = useRef('');

  useEffect(() => {//componentDidMount,componentDidupdate 의 역할
    //여기서 실행
    interval.current = setInterval(changeHand, 1000);
    return () => { //componentWillUnmount의 역할
      //여기서 종료
      clearInterval(interval.current);
    } //코드해석 : imgCoord가 바뀔때마다 interval을 실행하고 리턴값 clearinterval을 받는다
  }, [imgCoord]);//뒤에 배열은클로저문제를 해결해줌

  const changeHand = () => {
    if(imgCoord === rspCoords.바위) {
      //console.log('hello');
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScores = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScores - cpuScore;
    if(diff === 0) {
      setResult('비겼습니다');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다');
      setScore((pervScore) => pervScore + 1);
    } else {
      setResult('졌습니다')
      setScore((pervScore) => {
        if(pervScore !== 0) {
          return pervScore - 1;
        }else {
          return score;
        }
      });
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 1000)
    }, 2000);
  };

  return (
    <>
      <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} ></div>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('바위')} >바위</button>
        <button id="scissor" className="btn" onClick={onClickBtn('가위')} >가위</button>
        <button id="paper" className="btn" onClick={onClickBtn('보')} >보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}</div>
      </>
  );
};


export default RSP;