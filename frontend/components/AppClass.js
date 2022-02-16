import React from 'react';
import axios from 'axios';

export default class AppClass extends React.Component {
  state = {
    x: 2,
    y: 2,
    steps: 0,
    email: '', 
    message: ''
  }

onChange = event => {
  this.setState({ 
    ...this.state, 
    email: event.target.value
  })
}

onSubmit = event => {
  event.preventDefault(); 

  axios.post('http://localhost:9000/api/result', this.state)
  .then(resp => {
    this.setState({
      message: resp.data.message
    })
  })
  .catch(err => {
    console.log({err})
  })
}


  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          <div className="square" id="1"></div>
          <div className="square" id="2"></div>
          <div className="square" id="3"></div>
          <div className="square" id="4"></div>
          <div className="square active" id="5">B</div>
          <div className="square" id="6"></div>
          <div className="square" id="7"></div>
          <div className="square" id="8"></div>
          <div className="square" id="9"></div>
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.onClick}>LEFT</button>
          <button id="up" onClick={this.onClick}>UP</button>
          <button id="right" onClick={this.onClick}>RIGHT</button>
          <button id="down" onClick={this.onClick}>DOWN</button>
          <button id="reset" onClick={this.onClick}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange}></input>
          <input id="submit" type="submit" onSubmit={this.onSubmit}></input>
        </form>
      </div>
    )
  }
}
