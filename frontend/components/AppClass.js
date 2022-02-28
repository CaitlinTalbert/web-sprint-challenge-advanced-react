import React from "react";
import axios from "axios";

export default class AppClass extends React.Component {
  state = {
    x: 2,
    y: 2,
    steps: 0,
    email: "",
    message: "",
  };

  /**
   *(1, 1) (2, 1) (3, 1)
    (1, 2) (2, 2) (3, 2)
    (1, 3) (2, 3) (3, 3)
   */

  leftClick = () => {
    console.log("click");
  };

  upClick = () => {
    console.log("click");
  };

  rightClick = () => {
    console.log("click");
  };

  downClick = () => {
    console.log("click");
  };

  resetClick = () => {
    console.log("click");
  };

  onChange = (event) => {
    this.setState({
      ...this.state,
      email: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      x: this.state.grid.x,
      y: this.state.grid.y,
      steps: this.state.counter,
      email: this.state.email,
    };
    axios
      .post("http://localhost:9000/api/result", payload)
      .then((resp) => {
        this.setState({
          ...this.state,
          message: resp.data.message,
        });
        console.log(this.state);
      })
      .catch((err) => {
        console.log({ err });
        if (this.state.email === "foo@bar.baz") {
          this.setState({
            message: "foo@bar.baz forbidden error",
          });
        } else if (this.state.email === "") {
          this.setState({
            ...this.state,
            message: "Must be a valid email",
          });
        }
      });
  };

  render() {
    const { className } = this.props;
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
          <div className="square active" id="5">
            B
          </div>
          <div className="square" id="6"></div>
          <div className="square" id="7"></div>
          <div className="square" id="8"></div>
          <div className="square" id="9"></div>
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.leftClick}>
            LEFT
          </button>
          <button id="up" onClick={this.upClick}>
            UP
          </button>
          <button id="right" onClick={this.rightClick}>
            RIGHT
          </button>
          <button id="down" onClick={this.downClick}>
            DOWN
          </button>
          <button id="reset" onClick={this.resetClick}>
            reset
          </button>
        </div>
        <form>
          <input
            id="email"
            type="email"
            placeholder="type email"
            onChange={this.onChange}
          ></input>
          <input id="submit" type="submit" onSubmit={this.onSubmit}></input>
        </form>
      </div>
    );
  }
}
