import PropTypes from 'prop-types'
import React, { Component } from 'react'
import MessageList from './MessageList'
import UserInput from './UserInput'
import Header from './Header'


class ChatWindow extends Component {
  constructor(props) {
    super(props)
  }

  time() {
    var today = new Date()
    var minutes = today.getMinutes().toString()
    var hours = today.getHours().toString()
    if(minutes.length == 1){
      minutes = '0' + minutes
    }
    if(hours.length == 1){
      hours = '0' + hours
    }
    var date = hours + ":" + minutes
    return date
  }

  onUserInputSubmit = (message, time = this.time(), actions) => {
    this.props.onUserInputSubmit(message, time, )
  }

  onMessageReceived = (message) => {
   this.props.onMessageReceived(message)
    /// this.setState({ messages: [...this.state.messages, message] })
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
          onMessageReceived={this.onMessageReceived}
          messages={messageList}
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