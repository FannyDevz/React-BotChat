'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MessageList = require('./MessageList');

var _MessageList2 = _interopRequireDefault(_MessageList);

var _UserInput = require('./UserInput');

var _UserInput2 = _interopRequireDefault(_UserInput);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _messageHistory = require('../../demo/src/messageHistory');

var _messageHistory2 = _interopRequireDefault(_messageHistory);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      messageList: _messageHistory2.default,
      newMessagesCount: 0,
      isOpen: false
    };
    _this.lastId = _messageHistory2.default[_messageHistory2.default.length - 1].id;
    return _this;
  }

  ChatWindow.prototype.render = function render() {
    var messageList = this.props.messageList || [];
    var classList = ["sc-chat-window", this.props.isOpen ? "opened" : "closed"];
    return _react2.default.createElement(
      'div',
      { className: classList.join(' ') },
      _react2.default.createElement(_Header2.default, {
        teamName: this.props.agentProfile.teamName,
        imageUrl: this.props.agentProfile.imageUrl,
        onClose: this.props.onClose
      }),
      _react2.default.createElement(_MessageList2.default, {
        messages: !this.state.messageList ? messageList : this.state.messageList,
        onMessageReceived: this.onMessageReceived,
        imageUrl: this.props.agentProfile.imageUrl,
        onDelete: this.props.onDelete
      }),
      _react2.default.createElement(_UserInput2.default, {
        showEmoji: this.props.showEmoji,
        onSubmit: this.onUserInputSubmit,
        showFile: this.props.showFile,
        onKeyPress: this.props.onKeyPress })
    );
  };

  return ChatWindow;
}(_react.Component);

ChatWindow.propTypes = process.env.NODE_ENV !== "production" ? {
  showEmoji: _propTypes2.default.bool,
  showFile: _propTypes2.default.bool,
  onKeyPress: _propTypes2.default.func
} : {};

exports.default = ChatWindow;
module.exports = exports['default'];