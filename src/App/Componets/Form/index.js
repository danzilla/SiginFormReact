import React, { useState } from 'react';
import './Form.css';
const axios = require('axios');

function Form() {
  // States for Form Input
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [checkBox, setCheckBox] = useState(false)
  // Display message on actions
  const [msg, setMsg] = useState("")
  // API call to retrive user submission 
  const LoginApi = (email, password, checkBox) => {
    if (!email || !password) {
      setMsg("Invalid user creditals")
    } else if (email && password) {
      axios.post('http://localhost:8000/api/login', {
        email: email,
        password: password
      })
        .then(function (response) {
          if (response.data) {
            if (checkBox === true) {
              // set Session
            }
            setMsg(response.data)
          } else {
            setMsg("There were issue retriving the user info")
          }
        })
        .catch(function (error) {
          if (error.name) {
            setMsg("Error: " + error.message)
          } else {
            setMsg("There were issue submiting your request")
          }
        });
    }
  }
  // Validate email for proper email format
  // https://stackoverflow.com/questions/52188192/what-is-the-simplest-and-shortest-way-for-validating-an-email-in-react
  const validateEmail = (email) => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }
  // Submit Form on Click
  const submitForm = (event) => {
    event.preventDefault();
    let message;
    let checkEmail = validateEmail(email)
    // Error Check for Email and Password staus
    if (email.trim() === "" && password.trim() === "") {
      message = "Email and Password are required"
    } else if (email.trim() === "") {
      message = "Email required"
    } else if (checkEmail === false) {
      message = "Incorrect email format"
    } else if (password.trim() === "") {
      message = "Password required"
    } else if (checkEmail === true && password) {
      message = "Email and Password are good - Signing in (3sec)"
      LoginApi(email, password, checkBox)
    } setMsg(message)
  }
  // Render
  return (
    <div class="card">
      <div class="container">
        {/* Form */}
        <form onSubmit={submitForm}>
          <h2 className="textAlign">Sign in</h2>
          {/* Error Message */}
          <p className="marginY1 textAlign">{msg}</p>
          {/* Form Input fields */}
          <p className="marginYno boldLabels">Email:</p>
          <input onChange={e => setEmail(e.target.value)}
            className="inputForm" type="text" name="email" />
          <p className="marginYno boldLabels">Password:</p>
          <input onChange={e => setPassword(e.target.value)}
            className="inputForm" type="password" name="password" />
          <div>
            <input name="checkBox" type="checkbox"
              checked={checkBox}
              onChange={(e) => setCheckBox(e.target.checked)} />
            <label for="checkBox"> Rember me?</label>
          </div>
          {/* Form Submit Button */}
          <button className="inputForm submitButton">Sign in</button>
          {/* Additonal section for register and forgot links */}
          <div className="paddingY1">
            <p className="marginYno textAlign"><a className="boldLabels" href="#">Forgot your password?</a></p>
            <p className="marginYno textAlign paddingY1">Dont have an account? <a className="boldLabels" href="#">Sign up</a></p>
            <p className="marginYno textAlign"><a className="boldLabels" href="#">Resend email confirmation</a></p>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Form;
