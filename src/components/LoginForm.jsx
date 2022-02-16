import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../utils/context/userContext'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const { signIn } = useContext(UserContext)

  const navigate = useNavigate()

  const [validation, setValidation] = useState('')

  const inputs = useRef([])
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el)
    }
  }
  const formRef = useRef()

  const handleForm = async (e) => {
    e.preventDefault()
    console.log(inputs)
    try {
      await signIn(inputs.current[0].value, inputs.current[1].value)
      // à tester
      // formRef.current.reset();
      setValidation('')
      navigate('/private/dashboard')
    } catch (err) {
      console.log(err)
      setValidation('Wopsy, email and/or password incorrect')
    }
  }

  return (
    <>
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <form ref={formRef} onSubmit={handleForm} className="sign-up-form">
            <div className="login-email-wrapper">
              <label htmlFor="signInEmail">
                <b>Email adress</b>
              </label>
              <input
                ref={addInputs}
                type="email"
                placeholder="Enter email adress"
                name="email"
                required></input>
            </div>

            <div className="login-psw-wrapper">
              <label htmlFor="signInPwd">
                <b>Password</b>
              </label>
              <input
                ref={addInputs}
                type="password"
                placeholder="Enter password"
                name="psw"
                required></input>
              <p className="validation-login-form">{validation}</p>
            </div>

            <button>Sign In</button>
          </form>

          {/* <label>
      <input type="checkbox"> Remember me</input>
    </label> */}
        </div>
      </div>
    </>
  )
}
