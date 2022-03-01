import React, { useState } from "react";
import axios from "axios";

const initialState = {
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
   reset will go back 2,2
 * */

export default function AppFunctional(props) {
  const [value, setValue] = useState(initialState);

  const onChange = (e) => {
    setValue({
      ...value,
      email: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const emailInput = document.querySelector("#email");
    emailInput.value = "";

    axios
      .post("http://localhost:9000/api/result", value)
      .then((resp) => {
        setValue({
          ...value,
          message: resp.data.message,
        });
      })
      .catch((error) => {
        console.log(error);
        if (value.email === "foo@bar.baz") {
          setValue({
            ...value,
            message: "foo@bar.baz failure #71",
          });
        } else if (value.email === "") {
          setValue({
            ...value,
            message: "Ouch: email is required",
          });
        } else {
          setValue({
            ...value,
            message: "Ouch: email must be a valid email",
          });
        }
      });
  };

  const leftClick = () => {
    value.x <= 3 && value.x >= 2
      ? setValue({
          ...value,
          x: value.x - 1,
          steps: value.steps + 1,
        })
      : setValue({
          ...value,
          x: value.x === 3 ? 3 : value.x,
          message: "You can't go left",
        });
  };

  const upClick = () => {
    value.y <= 3 && value.y >= 2
      ? setValue({
          ...value,
          y: value.y - 1,
          steps: value.steps + 1,
        })
      : setValue({
          ...value,
          y: value.y === 3 ? 3 : value.y,
          message: "You can't go up",
        });
  };

  const rightClick = () => {
    value.x <= 2 && value.x >= 1
      ? setValue({
          ...value,
          x: value.x + 1,
          steps: value.steps + 1,
        })
      : setValue({
          ...value,
          x: value.x === 3 ? 3 : value.x,
          message: "You can't go right",
        });
  };

  const downClick = () => {
    value.y <= 2 && value.y >= 1
      ? setValue({
          ...value,
          y: value.y + 1,
          steps: value.steps + 1,
        })
      : setValue({
          ...value,
          y: value.y === 3 ? 3 : value.y,
          message: "You can't go down",
        });
  };

  const resetClick = () => {
    setValue({
      ...value,
      x: 2,
      y: 2,
      steps: 0,
      email: "",
      message: "",
    });
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({value.x}, {value.y})
        </h3>
        <h3 id="steps">You moved {value.steps} times</h3>
      </div>
      <div id="grid">
        <div
          className={
            value.x === 1 && value.y === 1 ? "square active" : "square"
          }
        >
          {value.x === 1 && value.y === 1 ? "B" : ""}
        </div>
        <div
          className={
            value.x === 2 && value.y === 1 ? "square active" : "square"
          }
        >
          {value.x === 2 && value.y === 1 ? "B" : ""}
        </div>
        <div
          className={
            value.x === 3 && value.y === 1 ? "square active" : "square"
          }
        >
          {value.x === 3 && value.y === 1 ? "B" : ""}
        </div>
        <div
          className={
            value.x === 1 && value.y === 2 ? "square active" : "square"
          }
        >
          {value.x === 1 && value.y === 2 ? "B" : ""}
        </div>
        <div
          className={
            value.x === 2 && value.y === 2 ? "square active" : "square"
          }
        >
          {value.x === 2 && value.y === 2 ? "B" : ""}
        </div>
        <div
          className={
            value.x === 3 && value.y === 2 ? "square active" : "square"
          }
        >
          {value.x === 3 && value.y === 2 ? "B" : ""}
        </div>
        <div
          className={
            value.x === 1 && value.y === 3 ? "square active" : "square"
          }
        >
          {value.x === 1 && value.y === 3 ? "B" : ""}
        </div>
        <div
          className={
            value.x === 2 && value.y === 3 ? "square active" : "square"
          }
        >
          {value.x === 2 && value.y === 3 ? "B" : ""}
        </div>
        <div
          className={
            value.x === 3 && value.y === 3 ? "square active" : "square"
          }
        >
          {value.x == 3 && value.y === 3 ? "B" : ""}
        </div>
      </div>
      <div className="info">
        <h3 id="message">{value.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={leftClick}>
          LEFT
        </button>
        <button id="up" onClick={upClick}>
          UP
        </button>
        <button id="right" onClick={rightClick}>
          RIGHT
        </button>
        <button id="down" onClick={downClick}>
          DOWN
        </button>
        <button id="reset" onClick={resetClick}>
          reset
        </button>
      </div>
      <form>
        <input
          id="email"
          type="email"
          placeholder="type email"
          onChange={onChange}
        ></input>
        <input id="submit" type="submit" onSubmit={onSubmit}></input>
      </form>
    </div>
  );
}
