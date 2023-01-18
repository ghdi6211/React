import React, { memo, useState } from 'react';


//PureComponent는 클래스에컴포넌트에만 쓸수있음
//함수컴포넌트는 memo
//자식컴포넌트는 Props,State,부모컴포넌트가 바뀔때 리렌더링

const Try = memo(({ tryInfo }) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  )
});

/*자식Props를 바꿔줘야 할 경우 State를 활용 
  자식Props가 바뀔경우 부모Props가 뜻하지않게 바뀌는것을 막기위해
  const Try = memo(({ tryInfo }) => {
  const [result, setResult] = useState(tryInfo.result);
  const onClick = () => {
    setResult('1');
  };

  return (
    <li>
      <div>{tryInfo.try}</div>
      <div onClick={onClick}>{result}</div>
    </li>
  )
  });
*/



/*memo같은 기능을 쓰면 개발자도구의 이름이 바뀜 
그럴때는 ??.displayName = '??'; 로 해준다
*/

Try.displayName = 'Try';

export default Try;