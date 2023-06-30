import React, { Component } from 'react'
import Select from 'react-select'
import { BsCheckCircle } from 'react-icons/bs'

let selectAll = (e) => {
  e.target.select()
  e.target.focus()
}

let CustomListElement = ({...props}) => {
  // Change color from gray to GREEN on the check item
  // All posible password validations
  let str = props.state.password
  let content = ''
  let isActive = false
  switch (props.check) {
    case 'length':
      content = 'Must be at least 8 characters long.'
      // verify if the length of the password is at least 8
      isActive = Boolean(str.length >= 8)
      break
    case 'caps':
      content = 'Must contain at least ONE uppercase.'
      // verify if the length of the password is at least
      isActive = Boolean(str.match(/[A-Z]+/g))
      break
    case 'number':
      content = 'Must contain at least ONE number.'
      // verify if the length of the password is at least
      isActive = Boolean(str.match(/[0-9]+/g))
      break
    case 'special':
      content = 'Must contain at least one special character.'
      // verify if the length of the password is at least
      isActive = Boolean(str.match(/[^A-Za-z0-9]/g))
      break
    case 'match':
      content = 'Must contain match with confirmation.'
      // verify if the length of the password is at least
      isActive = Boolean(str === props.state.confirm)
      break
    default:
      content = ''
      isActive = false
  }
  return (
    <div className="login-requirement">
      {content !== '' 
      ?
        <div>
          <span className={isActive ? "check active" : "check"}><BsCheckCircle /></span>
          <span className="requirement" >{content}</span>
        </div>
      :
        null
      }
    </div>
  )
} 

// Function to access the DB
export class Register extends Component {
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
    // Save user on the DB
  }
  render() {
    const comparisions = ['length','caps','number','special','match']
    return (
      <div>
        <h2>Create User</h2>
        <div >
          <form className="login-card" action="">
            <div>
              <label htmlFor="role-sleector" id="role-label">Area:</label>
              <Select
                id='users'
                onChange={this.updateRole}
                options={
                  [
                    { label: 'Administrador', value: 'admin'},
                    { label: 'Ingeniería de Procesos', value: 'proc'},
                    { label: 'Ingeniería de Automatización', value: 'auto'}
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
              <div className="passwordRequirements">
                {comparisions.map((item) => {
                  return <CustomListElement state={this.state} onChange={this.logChange}
                    check={item} comparisions={comparisions} key={item}/>
                })}
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Register