import React, { Component } from 'react';
import chatIconUrl from './../../assets/chat-icon.svg';

var TextMessage = function TextMessage(props) {

  var text = props.message.data.text || '';
  var time = props.message.time;

  return React.createElement(
    'div',
    { className: 'sc-message--text' },
    text,
    React.createElement('br', null),
    React.createElement(
      'p',
      { className: 'sc-message--meta' },
      time
    )
  );
};

export default TextMessage;