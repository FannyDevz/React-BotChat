function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import Header from './Header';
import messageHistory from '../../demo/src/messageHistory';
import axios from 'axios';

var ChatWindow = function (_Component) {
  _inherits(ChatWindow, _Component);

  function ChatWindow(props) {
    _classCallCheck(this, ChatWindow);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.onUserInputSubmit = function (message) {
      console.log(message);

      //   setTimeout(
      //     function() {

      //       axios.get('http://localhost:8000/botman', {
      //         params: {
      //           driver: "web",
      //           userId: "1234",
      //           message: message.data.text
      //         }
      //       }).then(res => this.setState(
      //         { 
      //           botman: res.data.messages[res.data.messages.length-1], 
      //           messageList: [
      //             ...this.state.messageList, 
      //             {
      //               id: this.lastId + 1,
      //               author: message.author,
      //               type: message.type,
      //               data: { text: message.data.text}
      //             }
      //           ]
      //         }
      //       ))
      //       .then(() => {
      //         const newMessagesCount = this.state.isOpen ? this.state.newMessagesCount : this.state.newMessagesCount + 1
      //         this.setState({
      //           newMessagesCount: newMessagesCount,
      //           messageList: 
      //           [...this.state.messageList, {
      //             id: this.lastId + 1,
      //             author: 'them',
      //             type: 'text',
      //             data: { text: this.state.botman.text, actions: this.state.botman.actions }
      //           }
      //         ]
      //         })})

      //     }
      //     .bind(this),
      //     1000
      // );
      _this.lastId += 1;
    };

    _this.state = {
      botman: '',
      messageList: messageHistory,
      newMessagesCount: 0,
      isOpen: false
    };
    _this.lastId = messageHistory[messageHistory.length - 1].id;
    return _this;
  }

  ChatWindow.prototype.render = function render() {
    var messageList = this.props.messageList || [];
    var classList = ["sc-chat-window", this.props.isOpen ? "opened" : "closed"];
    return React.createElement(
      'div',
      { className: classList.join(' ') },
      React.createElement(Header, {
        teamName: this.props.agentProfile.teamName,
        imageUrl: this.props.agentProfile.imageUrl,
        onClose: this.props.onClose
      }),
      React.createElement(MessageList, {
        messages: !this.state.messageList ? messageList : this.state.messageList,
        onMessageReceived: this.onMessageReceived,
        imageUrl: this.props.agentProfile.imageUrl,
        onDelete: this.props.onDelete
      }),
      React.createElement(UserInput, {
        showEmoji: this.props.showEmoji,
        onSubmit: this.onUserInputSubmit,
        showFile: this.props.showFile,
        onKeyPress: this.props.onKeyPress })
    );
  };

  return ChatWindow;
}(Component);

ChatWindow.propTypes = process.env.NODE_ENV !== "production" ? {
  showEmoji: PropTypes.bool,
  showFile: PropTypes.bool,
  onKeyPress: PropTypes.func
} : {};

export default ChatWindow;