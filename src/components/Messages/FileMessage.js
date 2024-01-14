import React from 'react';
import genericFileIcon from '../../assets/file.svg';
import closeIcon from '../../assets/close.svg'

const FileMessage = (props) => {

  const meta = props.message.data.meta || null
  const text = props.message.data.text || ''
  const file = props.message.data.file
  const author = props.message.author
  const size = props.message.size
  const name = props.message.name
  const fileType = props.message.type
  const time = props.message.time
  const image = URL.createObjectURL(file)
  return (
    <div className='sc-message--file' style={{ minWidth: "50%", background: "transparent", border: "2px solid #f7f7f7" }}>
      {
        props.message &&
        author === "me" &&
        props.onDelete &&
        <button className='delete-message' onClick={() => props.onDelete(props.message)}>
          x
          </button>
      }

      <div style={{ padding: 10, margin: 2 }}>
        <a href={file.url || '#'} target='_blank'>
          <img src={image} alt={name} width="200px" height="150px" />
        </a>
      </div>
      <p className='sc-message--meta' style={{ textAlign: "right", color: "black", fontSize: 9, marginTop: "-10px", marginRight: 15 }}>{time}</p>
    </div>
  )
}

export default FileMessage