import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { render } from 'react-dom'
import SendIcon from './icons/SendIcon'
import EmojiIcon from './icons/EmojiIcon'
import EmojiPicker from './emoji-picker/EmojiPicker'
import FileIcons from './icons/FileIcon'
import closeIcon from '../assets/close.svg'
import genericFileIcon from '../assets/file.svg'
import _ from 'lodash'
import axios from 'axios'

class UserInput extends Component {

  constructor() {
    super()
    this.state = {
      inputActive: false,
      file: null,
      preview: null,
    }
  }

  handleKey = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      this._submitText(event)
    }
  }

  handleKeyPress = _.debounce(() => {
    this.props.onKeyPress(this.userInput.textContent)
  }, 300, { trailing: true })

  _submitText(event) {
    event.preventDefault()
    const text = this.userInput.textContent
    const file = this.state.file
    if (file) {
      if (text && text.length > 0) {
        this.props.onSubmit({
          author: 'me',
          type: 'file',
          data: { text, file }
        })
        this.setState({ file: null })
        this.userInput.innerHTML = ''
      } else {
        axios.get('http://localhost:8000/botman', {
          params: {
            driver: "web",
            userId: "1234",
            message: file.name
          }
        }).then(result => {
          this.props.onSubmit({
            author: 'me',
            type: 'file',
            data: { file }
          })
        }
        ).then(this.setState({ file: null }))
      }
    } else {
      if (text && text.length > 0) {
        this.props.onSubmit({
          author: 'me',
          type: 'text',
          data: { text }
        })
        this.userInput.innerHTML = ''
      }
    }
  }

  _handleEmojiPicked(emoji) {
    this.props.onSubmit({
      author: 'me',
      type: 'emoji',
      data: { emoji }
    })
  }

  onChange = (value) => {
    return value
  }

  _handleFileSubmit(file) {
    this.setState({ file })
  }

  fileHandler = event => {
    this.setState({
      file: event,
      preview: URL.createObjectURL(event)
    });
  }

  render() {
    return (
      <div>
        {
          this.state.file &&
          <div className='file-container' >
            <span className='icon-file-message'><img src={this.state.preview} alt='preview' height={15} /></span>
            {this.state.file && this.state.file.name}
            <span className='delete-file-message' onClick={() => this.setState({ file: null })} ><img src={closeIcon} alt='close icon' height={10} title='Remove the file' /></span>
          </div>
        }
        <form className={`sc-user-input ${(this.state.inputActive ? 'active' : '')}`}>
          <div
            role="button"
            tabIndex="0"
            onFocus={() => { this.setState({ inputActive: true }) }}
            onBlur={() => { this.setState({ inputActive: false }) }}
            ref={(e) => { this.userInput = e }}
            onKeyDown={this.handleKey}
            onKeyPress={this.handleKeyPress}
            contentEditable="true"
            placeholder="Tanyakan sesuatu..."
            onChange={this.onChange}
            className="sc-user-input--text"
          >
          </div>
          <div className="sc-user-input--buttons">
            <div className="sc-user-input--button"></div>
            <div className="sc-user-input--button">
              {this.props.showEmoji && <EmojiIcon onEmojiPicked={this._handleEmojiPicked.bind(this)} />}
            </div>
            {this.props.showFile &&
              <div className="sc-user-input--button">
                <FileIcons onChange={this.fileHandler} />
              </div>
            }
            <div className="sc-user-input--button">
              <SendIcon onClick={this._submitText.bind(this)} />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

UserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool,
  showFile: PropTypes.bool,
  onKeyPress: PropTypes.func
}

UserInput.defaultProps = {
  showEmoji: true,
  showFile: true
}

export default UserInput
