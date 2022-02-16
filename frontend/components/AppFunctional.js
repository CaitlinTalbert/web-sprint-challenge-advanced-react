import React, {useState} from 'react'; 
import axios from 'axios';

const initialState = {
  x: 2, 
  y: 2, 
  steps: 0, 
  email: '', 
  message: ''
}


export default function AppFunctional(props) {
  const [value, setValue] = useState(initialState)

  const onChange = e => {
    setValue({ 
      ...value, 
      email: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault(); 
    
    axios.post('http://localhost:9000/api/result', value)
    .then(resp => {
      setValue({ 
        ...value, 
        message: resp.data.message
      })
    })
    .catch(error => {
      console.log(error)
    })
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
        <input id="email" type="email" placeholder="type email" onChange={onChange}></input>
        <input id="submit" type="submit" onSubmit={onSubmit}></input>
      </form>
    </div>
  )
}
