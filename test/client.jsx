/*const React = require('react');
const ReactDOM = require('react-dom');

const NumberBaseball = require('./NumberBaseball'); // 여기수정


ReactDOM.render(<NumberBaseball />, document.querySelector('#root')); //여기수정
*/


import React from 'react';
import ReactDOM from 'react-dom';

//import ResponseCheck_class from './ResponseCheck_class';
import RSP from './class/RSP_class';

ReactDOM.render(<RSP />, document.querySelector('#root'));