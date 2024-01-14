import React, { Component } from 'react'

class TestArea extends Component {
  render () {
    return (
      <div>
          <h1 style={{textAlign: "center"}}>Halosis Realtime Service</h1>        
      </div>
      // <div className="demo-test-area--wrapper">
        
      //   <form className="demo-test-area" onSubmit={(e)=> {
      //       e.preventDefault();
      //       this.props.onMessage(this.textArea.value);
      //       this.textArea.value = '';
      //     }}>
      //     <textarea
      //       ref={(e) => { this.textArea = e; }}
      //       className="demo-test-area--text"
      //       placeholder="Write a test message...."
      //     />
      //     <button className="demo-test-area--button"> kirim </button>
      //   </form>
      
      // </div>
    )
  }
}

export default TestArea