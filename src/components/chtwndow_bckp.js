import PropTypes from 'prop-types'
import React, { Component } from 'react'
import MessageList from './MessageList'
import UserInput from './UserInput'
import Header from './Header'
import messageHistory from '../../demo/src/messageHistory';
import axios from 'axios'

class ChatWindow extends Component {
  constructor(props) {
    super(props)
    this.state= {
      botman: '',
      messageList: messageHistory,
      newMessagesCount: 0,
      isOpen: false,
    }
    this.lastId = messageHistory[messageHistory.length - 1].id
  }

  onUserInputSubmit = (message) => {
    (console.log(message))
   
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
    this.lastId += 1
  }

  render() {
    let messageList = this.props.messageList || []
    let classList = [
      "sc-chat-window",
      (this.props.isOpen ? "opened" : "closed")
    ]
    return (
      <div className={classList.join(' ')}>
        <Header
          teamName={this.props.agentProfile.teamName}
          imageUrl={this.props.agentProfile.imageUrl}
          onClose={this.props.onClose}
        />
        <MessageList
          messages={!this.state.messageList ? messageList : this.state.messageList}
          onMessageReceived={this.onMessageReceived}
          imageUrl={this.props.agentProfile.imageUrl}
          onDelete={this.props.onDelete}
        />
        <UserInput
          showEmoji={this.props.showEmoji}
          onSubmit={this.onUserInputSubmit}
          showFile={this.props.showFile}
          onKeyPress={this.props.onKeyPress} />

      </div>
    )
  }
}

ChatWindow.propTypes = {
  showEmoji: PropTypes.bool,
  showFile: PropTypes.bool,
  onKeyPress: PropTypes.func
}

export default ChatWindow
