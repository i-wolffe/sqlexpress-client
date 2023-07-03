import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
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
      showError: false,
      navigate: false,
      user: {}
    };
  }
  updateEmail = (e) => {
    this.setState({
      email:e.target.value,
      showError : false
    })
  }
  updateRole = (e) => { // Different because it comes from a react-Select input
    this.setState({
      role:e.value,
      showError : false
    })
  }
  updatePassword = (e) => {
    this.setState({
      password:e.target.value,
      showError : false
    })
  }
  togglePassword = (value) => {
    this.setState({
      showPassword : value,
      showError : false
    })  
  }
  validateData = async () => {
    // First verify if email
    let str = this.state.email
    if (str.includes('@')) {
      let at = str.indexOf('@')
      str = str.slice(0,at)
      if (str.indexOf('.')) {
        let str = this.state.password
        if (Boolean(str.match(/[^A-Za-z0-9]/g))) {
          return true // Valid formats
        }
      }
    }; return false   // any condition is not fullfiled
  }
  fetchUser = async (e) => {
    await axios.post('http://127.0.0.1:4001/login',[this.state])
    .then(response => {
      if (response.data.error === 404) {
        console.log()
        this.setState({ user: {}, showError: true })
      } else {
        // console.log(response.data)
        // console.log(response.data[0])
        this.setState({
          user: response.data[0],
          navigate: true
        })
        this.props.setUser(response.data[0])
      }
    })
    .catch(ex => {
      console.warn("Display credential Missmatch")
      this.setState({
        user: {},
        showError: true
      })
    })
  }
  handleSubmit = (e)  => {
    e.preventDefault()
    // this.setState({ showError : false })  
    this.validateData().then(res => {
      if (res) {
        // Send Query
        console.log('Ready for query')
        this.fetchUser(e)
      } else {
        console.log('Display wrong data format')
        this.setState({ showError : true }) 
      }
    })
  }
  render() {
    return (
      <div>
        <h2>Who are you?</h2>
        <div >
          <form className="login-card">
            {this.state.navigate ?  <Navigate to="/" replace={true} />  : null }
            <h3 className="login-card-title">Please enter your credentials</h3>
            <div>
              <label htmlFor="role-sleector" id="role-label">Area:</label>
              <Select
                id='users'
                onChange={this.updateRole}
                options={
                  [
                    { label: 'Administrador', value: 'admin'},
                    { label: 'Ingeniería de Procesos', value: 'proc'},
                    { label: 'Ingeniería de Automatización', value: 'auto'},
                    { label: 'Development', value: 'developerez'}
                ]
                }>
              </Select>
            </div>
            <div>
              <label htmlFor="email-input" id="email-label">E-mail:</label>
              <input onClick={selectAll} type="text" id="email-input" placeholder="email@domain.com"
                required={true} onChange={this.updateEmail}/>
            </div>
            <div>
              <label htmlFor="password-input" id="email-label">Password:</label>
              <div className="flex">
                <input type={this.state.showPassword ? "text" : "password"} id="password-input"  placeholder="Enter your password..."
                  autoComplete="off" required={true} onChange={this.updatePassword}/>
                <span className="toggle" onClick={() => this.togglePassword(!this.state.showPassword)}>
                   {this.state.showPassword ? <BsEyeSlash/> : <BsEye /> }
                </span>
              </div>
            </div>
            <div>
              <button className="submit" onClick={this.handleSubmit}>Log in</button>
            </div>
            {this.state.showError
            ?
              <div className="errorMessage">
                <p >** Whoops! there seems to be something wrong with your credentials.</p>
                <p >Please verify them and try again</p>
              </div>
            : null }
          </form>
        </div>
      </div>
    )
  }
}

export default Login