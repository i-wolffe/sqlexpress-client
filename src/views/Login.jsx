import React, { Component } from 'react'
import Select from 'react-select'
import { BsEyeSlash,BsEye } from 'react-icons/bs'

let selectAll = (e) => {
  e.target.select()
  e.target.focus()
} 

// Function to access the DB
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      role: '',
      password: '',
      showPassword: false,
      user: {}
    };
  }
  updateEmail = (e) => {
    this.setState({
      email:e.target.value
    })
  }
  updateRole = (e) => { // Different because it comes from a react-Select input
    this.setState({
      role:e.value
    })
  }
  updatePassword = (e) => {
    this.setState({
      password:e.target.value
    })
  }
  togglePassword = (value) => {
    this.setState({
      showPassword : value
    })  
  }
  fetchUser = async (params)  => {
    // user from the DB with post for security
  }
  render() {
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
              <div className="flex">
              <input onClick={selectAll} type={this.state.showPassword ? "text" : "password"} id="password-input" 
                autoComplete="off" required={true} onChange={this.updatePassword}/>
                <span className="toggle" onClick={() => this.togglePassword(!this.state.showPassword)}>
                   {this.state.showPassword ? <BsEyeSlash/> : <BsEye /> }
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login