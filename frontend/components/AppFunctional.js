import React, {useState} from 'react'


export default function AppFunctional(props) {
  const [form, setForm] = useState(" ")

  const handleChange = (e) => {
  setForm(e.target.value)
  }
  console.log(form)

  const handleSubmit = (e) => {
    e.preventDefault(); 
    props.handleSubmit(form)
  }

  return (
    <div id="wrapper" className={props.className}>
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
        <button id="left">LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input value={form} name="form" id="email" type="email" placeholder="type email" onChange={handleChange}></input>
        <input id="submit" type="submit" onSubmit={handleSubmit}></input>
      </form>
    </div>
  )
}
