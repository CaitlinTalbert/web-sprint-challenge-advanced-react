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
 * (1, 1) (2, 1) (3, 1)
   (1, 2) (2, 2) (3, 2)
   (1, 3) (2, 3) (3, 3)
 * up & down = y
   left & right = x 
   so moving left = - x
   moving right = + x 
   moving up = - y
   moving down = + y
 * */

  leftClick = () => {
    this.state.x <= 3 && this.state.x >= 2
      ? this.setState({
          ...this.state,
          x: this.state.x - 1,
          steps: this.state.steps + 1,
        })
      : this.setState({
          ...this.state,
          x: this.state.x === 3 ? 2 : this.state.x,
          message: "You can't go left",
        });
  };

  upClick = () => {
    this.state.y <= 3 && this.state.y >= 2
      ? this.setState({
          ...this.state,
          y: this.state.y - 1,
          steps: this.state.steps + 1,
        })
      : this.setState({
          ...this.state,
          y: this.state.y === 3 ? 2 : this.state.y,
          message: "You can't go up",
        });
  };

  rightClick = () => {
    this.state.x <= 2 && this.state.x >= 1
      ? this.setState({
          ...this.state,
          x: this.state.x + 1,
          steps: this.state.steps + 1,
        })
      : this.setState({
          ...this.state,
          x: this.state.x === 3 ? 3 : this.state.x,
          message: "You can't go right",
        });
  };

  downClick = () => {
    this.state.y <= 2 && this.state.y >= 1
      ? this.setState({
          ...this.state,
          y: this.state.y + 1,
          steps: this.state.steps + 1,
        })
      : this.setState({
          ...this.state,
          y: this.state.y === 3 ? 3 : this.state.y,
          message: "You can't move down",
        });
  };

  resetClick = () => {
    this.setState({
      x: 2,
      y: 2,
      steps: 0,
    });
  };

  onChange = (event) => {
    this.setState({
      ...this.state,
      email: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    // const payload = {
    //   x: this.state.grid.x,
    //   y: this.state.grid.y,
    //   steps: this.state.counter,
    //   email: this.state.email,
    // };
    axios
      .post("http://localhost:9000/api/result", this.state)
      .then((resp) => {
        console.log(resp);
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
          <h3 id="coordinates">
            Coordinates {this.state.x}, {this.state.y}
          </h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          <div
            className={
              this.state.x === 1 && this.state.y === 1
                ? "square active"
                : "square"
            }
          >
            {this.state.x === 1 && this.state.y === 1 ? "B" : ""}
          </div>
          <div
            className={
              this.state.x === 2 && this.state.y === 1
                ? "square active"
                : "square"
            }
          >
            {this.state.x === 2 && this.state.y === 1 ? "B" : ""}
          </div>
          <div
            className={
              this.state.x === 3 && this.state.y === 1
                ? "square active"
                : "square"
            }
          >
            {this.state.x === 3 && this.state.y === 1 ? "B" : ""}
          </div>
          <div
            className={
              this.state.x === 1 && this.state.y === 2
                ? "square active"
                : "square"
            }
          >
            {this.state.x === 1 && this.state.y === 2 ? "B" : ""}
          </div>
          <div
            className={
              this.state.x === 2 && this.state.y === 2
                ? "square active"
                : "square"
            }
          >
            {this.state.x === 2 && this.state.y === 2 ? "B" : ""}
          </div>
          <div
            className={
              this.state.x === 3 && this.state.y === 2
                ? "square active"
                : "square"
            }
          >
            {this.state.x === 3 && this.state.y === 2 ? "B" : ""}
          </div>
          <div
            className={
              this.state.x === 1 && this.state.y === 3
                ? "square active"
                : "square"
            }
          >
            {this.state.x === 1 && this.state.y === 3 ? "B" : ""}
          </div>
          <div
            className={
              this.state.x === 2 && this.state.y === 3
                ? "square active"
                : "square"
            }
          >
            {this.state.x === 2 && this.state.y === 3 ? "B" : ""}
          </div>
          <div
            className={
              this.state.x === 3 && this.state.y === 3
                ? "square active"
                : "square"
            }
          >
            {this.state.x === 3 && this.state.y === 3 ? "B" : ""}
          </div>
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
