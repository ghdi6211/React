import React, { memo } from 'react';

const RS_Try = memo(({tryInfo, index}) => {
    return (
      <li>
        <div>{index + 1}번째 시도 : {tryInfo}ms</div>
      </li>
    )
  }
);

RS_Try.displayName= 'RS_Try';

export default RS_Try;