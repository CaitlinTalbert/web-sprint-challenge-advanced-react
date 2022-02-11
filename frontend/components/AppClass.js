import React from 'react';
import axios from 'axios';


const initialState = {
  x: "is an integer between 1 and 3.",
  y:  "is an integer between 1 and 3.",
  steps: "is an integer larger than 0.",
  email: "is a valid email address.", 
  message: ""
}

export default class AppClass extends React.Component {
  
  state = initialState 



onSubmit = event => {
  event.preventDefault()
  const payload = { message: this.state.message, email: this.state.email, steps: this.state.steps, x: this.state.x, y: this.state.y }
axios.post('http://localhost:9000/api/result', payload)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log({err})
  })
}

handleClick = (e) => {
  console.log("click")
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
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.handleClick}>LEFT</button>
          <button id="up" onClick={this.handleClick}>UP</button>
          <button id="right" onClick={this.handleClick}>RIGHT</button>
          <button id="down" onClick={this.handleClick}>DOWN</button>
          <button id="reset" onClick={this.handleClick}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit" onSubmit={this.onSubmit}></input>
        </form>
      </div>
    )
  }
}
