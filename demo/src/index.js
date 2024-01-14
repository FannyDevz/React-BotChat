import messageHistory from './messageHistory';
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Launcher } from '../../src'
import './../assets/styles'

import axios from 'axios'

class Demo extends Component {
  constructor() {
    super()
    this.state = {
      messageList: messageHistory,
      newActions: [],
      isOpen: false,
      times: '',
      isLoading: 0
    }
    this.lastId = messageHistory[messageHistory.length - 1].id
  }

  _onMessageWasSent(message, time) {
    console.log('msg was sent: ', message)
    this.setState({
      messageList: [...this.state.messageList, { id: this.lastId + 1, ...message, time }]
    },
      () => {
        axios.get('http://localhost:8000/botman', {
          params: {
            driver: "web",
            userId: "1234",
            message: message.data.text || message.data.file.name
          }
        })
          .then(res => {
            const data = {
              id: this.lastId + 1,
              author: 'them',
              type: res.data.messages[res.data.messages.length - 1].type ? res.data.messages[res.data.messages.length - 1].type : "file",
              data: res.data.messages[res.data.messages.length - 1],
              time: time,
              image: res.data.messages[res.data.messages.length - 1].attachment ? res.data.messages[res.data.messages.length - 1].attachment.url : "",
            }
            this.setState({
              messageList: [...this.state.messageList, data],
              newActions: data
            })
          })
      }
    )
  }

  onKeyPress = (userInput) => {
    return null;
  }


  _handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0
    })
  }

  render() {
    return <div>
      <Launcher
        agentProfile={{
          teamName: 'Hana ChatBot',
          imageUrl: 'http://icons.iconarchive.com/icons/fasticon/creature-cutes/48/Creature-Blue-Pants-icon.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        onMessageReceived={this.props.onMessageReceived}
        messageList={this.state.messageList}
        newMessagesCount={this.state.newMessagesCount}
        handleClick={this._handleClick.bind(this)}
        isOpen={this.state.isOpen}
        onDelete={this.onDelete}
        showEmoji
        showFile
        onKeyPress={this.onKeyPress}
      />
      <div style={{ height: 200 }} />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))