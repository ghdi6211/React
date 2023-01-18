import React, { useState, useRef } from 'react';
import RS_Try from './RS_Try';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요');
  const [result, setResult] = useState([]);
  const [sum, setSum] = useState(0);
  const timeOut = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === 'waiting') { //준비상태로 진입
      setState('ready');
      setMessage('색이 바뀌면 클릭하세요');
      timeOut.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭!')
        startTime.current = new Date();
      },
        Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') { //빨리 클릭
      clearTimeout(timeOut.current);
      setState('waiting');
      setMessage('클릭해서 시작하세요');
      setResult((pervResult) => { return [...pervResult]; });
      setSum((pervSum) => { return pervSum });
      alert('너무빨리 눌렀습니다.\n 다시 시작합니다')
    } else if (state === 'now') { //정상 클릭
      endTime.current = new Date();

      setState('waiting');
      setMessage('클릭해서 시작하세요');
      setResult((pervResult) => { return [...pervResult, endTime.current - startTime.current] });
      setSum((pervSum) => { return pervSum + parseInt(endTime.current - startTime.current) });
    }
  };

  const onClickReset = () => {
    setResult([]);
    setSum(0);
    clearTimeout(timeOut.current);
  };

  const renderAverage = () => {
    return result.length === 0
      ? null //false, undefineds, null은 jsx에서 태그없음을 의미
      : <><div>평균 반응 속도 : {Math.floor(sum / result.length)}ms </div>
        <button onClick={onClickReset}>초기화</button>
      </>
  };

  return (
    <>
      <div
        id="screen"
        className={state}
        onClick={onClickScreen}
      >
        {message}
      </div>
      <ul style={{ listStyle: 'none' }}>
        {result.map((v, i) => {
          return (
            //NumberBaseball이 Try의 부모가 된다
            //부모 props를 자식 props에 물려준다 > 유산 부모를 찾아보기
            //부모의 부모에게서(복잡한 관계에서) props를 물려받거나 할때 유용한것 redux
            <RS_Try key={`${i + 1}차 시도`} tryInfo={v} index={i} />
          );
        })}
      </ul>
      <div>{renderAverage()}</div>
    </>
  );
};

export default ResponseCheck;