import React, { Component } from 'react'
import Select from 'react-select'
import { BsCheckCircle } from 'react-icons/bs'

let selectAll = (e) => {
  e.target.focus()
  e.target.select()
}

let CustomListElement = ({...props}) => {
  // Change color from gray to GREEN on the check item
  // All posible password validations
  let str = props.state.password
  let content = ''
  let isActive = false
  switch (props.check) {
    case 'length':
      content = 'Password must be at least 8 characters long'
      // verify if the length of the password is at least 8
      isActive = Boolean(str.length >= 8)
      break
    case 'caps':
      content = 'Password must contain at least ONE uppercase and ONE lowercase letter'
      // verify if the length of the password is at least
      isActive = Boolean(str.match(/[A-Z]+/g))
      break
    case 'number':
      content = 'Password must contain at least ONE number'
      // verify if the length of the password is at least
      isActive = Boolean(str.match(/[0-9]+/g))
      break
    case 'special':
      content = 'Password must contain at least one special character [. , $ % & ? !]'
      // verify if the length of the password is at least
      isActive = Boolean(str.match(/[^A-Za-z0-9]/g))
      break
    case 'match':
      content = 'Password must contain at least ONE number'
      // verify if the length of the password is at least
      isActive = Boolean(str === props.state.confirm)
      break
    default:
      content = ''
      isActive = false
  }
  return (
    <li className="login-requirement">
      {content !== '' 
      ?
        <div>
          <span className={isActive ? "check-active" : "check"}><BsCheckCircle /></span>
          <span >{content}</span>
        </div>
      :
        null
      }
    </li>
  )
} 

// Function to access the DB
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      role: '',
      password: '',
      confirm: '',
      requirements: [],
      user: {}
    };
  }
  updateEmail = (e) => {
    this.setState({
      email:e.target.value
    })
  }
  updateRole = (e) => { // Different because the it comes from a react-Select input
    this.setState({
      role:e.value
    })
  }
  updatePassword = (e) => {
    this.setState({
      password:e.target.value
    })
  }
  updateConfirm = (e) => {
    this.setState({
      confirm:e.target.value
    })
  }
  logChange = (e) => {
    console.error(e)
  }
  fetchUser = async (params)  => {
    // get user from the DB
  }
  render() {
    const comparisions = ['length','caps','number','special','match']
    return (
      <div>
        <h2>Login</h2>
        <div >
          <form className="login-card" action="">
            <h3 className="login-card-title">Title</h3>
            <div>
              <label htmlFor="role-sleector" id="role-label">Area:</label>
              <Select
                id='users'
                onChange={this.updateRole}
                options={
                  [
                    { label: 'Administrador', value: 'admin'},
                    { label: 'Ingeniería de Procesos', value: 'proc'},
                    { label: 'Ingeniería de Autmatización', value: 'auto'}
                ]
                }>
              </Select>
            </div>
            <div>
              <label htmlFor="email-input" id="email-label">E-mail:</label>
              <input onClick={selectAll} type="email" id="email-input" 
                autoComplete="off" required={true} onChange={this.updateEmail}/>
            </div>
            <div>
              <label htmlFor="password-input" id="email-label">Password:</label>
              <input onClick={selectAll} type="password" id="password-input" 
                autoComplete="off" required={true} onChange={this.updatePassword}/>
            </div>
            <div>
              <label htmlFor="confirm" id="email-label">Confirm password:</label>
              <input onClick={selectAll} type="password" id="confirm-input" 
                autoComplete="off" required={true} onChange={this.updateConfirm}/>
            </div>
            <div>
              <span>Password requirements</span>
              <ul>
                {comparisions.map((item) => {
                  return <CustomListElement state={this.state} onChange={this.logChange}
                    check={item} comparisions={comparisions} key={item}/>
                })}
              </ul>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login