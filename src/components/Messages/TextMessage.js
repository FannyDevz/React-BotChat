import React, { Component } from 'react';
import '../../styles/index'
import './loading.css'

import SimpleImageSlider from "react-simple-image-slider";
import axios from 'axios'
class TextMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      showloader: false,
      text: !this.props.message.data ? this.props.message.text : this.props.message.data.text,
      author: this.props.message.author,
      time: this.props.message.time,
      image: this.props.message.image,
      //this is for api that has an actions
      actions: !this.props.message.data ? "" : [...this.props.message.data.actions],
      callback_id: !this.props.message.data ? "" : this.props.message.data.callback_id,
      type: !this.props.message.data ? "" : this.props.message.data.type,
      //end
      zoom: '0',
      datas: []
    }
    console.log('prop from txt message: ', this.props)
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.state.loading) {
        this.setState({ showloader: true })
      }
    }, 3500)
  }

  buttonLoad() {
    const { actions, callback_id, text } = this.state
    return <div>
      <h5>{text}</h5>
      {actions.map((data, i) =>
        <div key={i}>
          <button className="buttonActions" value={data.value} name={data.name} onClick={() => this.handleChoiceMenu(data.value)}>{data.text}</button>
        </div>
      )}
    </div>
  }

  render() {
    const { text, author, time, showloader, image, zoom, type, datas } = this.state
    const stylish = { cursor: "pointer", transition: "0.2s", delay: '0.2s' }

    const images_ = [
      { url: 'https://www.steinmart.com/images/gateway/2019/06/19-06-24-Dresses-Hero-xs.png' },
      { url: 'https://cdn.shopify.com/s/files/1/0053/2899/4419/files/flashsale.jpg?1505' }
    ]

    return (
      !showloader && author == "them" ? <span className="loading" /> :
        <div className="sc-message--text">

          {/* this is for buttonActions content from the payloads */}
          {type == "actions" ? this.buttonLoad() : text}

          {/* this is for afterActions content from the payloads */}
          {datas !== "" ? (
            <div>
              {
                datas.map((data, i) => {
                  // const images = [
                  // 	{url:data.attachment.url}
                  // ]
                  return <div key={i}>
                    <div style={zoom == "0" && data.attachment ? { border: "2px solid #f7f7f7", marginTop: 10 } : null}>
                      {data.attachment ?
                        <center>
                          <p style={{ padding: 5, margin: 1 }}>{data.text}</p>
                        </center> : <p style={{ marginTop: "20px", textAlign: "left" }}>{data.text}</p>
                      }

                      {/*carousel*/}
                      {data.attachment ?
                        (<div><SimpleImageSlider
                          width={255}
                          height={225}
                          showNavs={false}
                          useGPURender={true}
                          slideDuration={0.8}
                          images={images_}
                        />
                          <center><button className="buttonCarousel" onClick={() => this.goTo(data.text)}>pilih</button></center></div>)
                        : ""}

                      {/* {data.attachment.type=="image" ?
                    <img src={data.attachment.url} width={zoom == "0" ? "60%" : zoom} height={zoom == "0" ? "60%" : zoom} onClick={this.handleClick} style={stylish}/>
                  : ""} */}
                    </div>
                  </div>
                })
              }
            </div>) : ""}

          {/* this is for images content from the payloads */}
          <div style={zoom == "0" && image ? { border: "2px solid #f7f7f7" } : null}>
            <center style={{ padding: 5, margin: 1 }}>
              {image ?
                <img src={image} width={zoom == "0" ? "60%" : zoom} height={zoom == "0" ? "60%" : zoom} onClick={this.handleZoomImage} style={stylish} />
                : ""}
            </center>
          </div>
          <div className={author == "them" ? "sc-message--meta-them" : "sc-message--meta-mine"}>{time}</div>
        </div>
    )
  }

  handleChoiceMenu = (value) => {
    axios.get('http://localhost:8000/botman', {
      params: {
        driver: "web",
        userId: "1234",
        message: value
      }
    })
      .then(res => this.setState({ datas: res.data.messages }))
  }

  handleZoomImage = () => {
    const { zoom } = this.state
    zoom == "0" ?
      this.setState({ zoom: "140%" })
      :
      this.setState({ zoom: "0" })
  }

  goTo = (where) => {
    console.log('i will direct to: ', where)
  }

  time() {
    var today = new Date()
    var minutes = today.getMinutes().toString()
    var hours = today.getHours().toString()
    if (minutes.length == 1) {
      minutes = '0' + minutes
    }
    if (hours.length == 1) {
      hours = '0' + hours
    }
    var date = hours + ":" + minutes
    return date
  }
}

export default TextMessage