import React, { Component } from 'react'
import Select from 'react-select'
import { BsCheckCircle,BsEyeSlash,BsEye } from 'react-icons/bs'

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
      content = 'Must match with confirmation.'
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
      showPassword: true,
      requirements: [],
      user: {}
    };
  }
  updateEmail = (e) => {
    this.setState({
      email: e.target.value
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
  togglePassword = (value) => {
    this.setState({
      showPassword : value,
      showError : false
    })  
  }
  validateData = async () => {
    //TODO: validate the password conditions are met, and copy the email validation
    // better Feedback to the user, in this case the dev admin
    // add a default/secret dev role
    // switch an error case in a function to display Email Error and color the checks
    // Search how to get all li elements on the template? verify they contain the completed class,
    // overwrite the gray with red, maybe will need to use important on green validations
     return false   // any condition is not fullfiled
  }
  postUser = async ()  => {
    // Save user on the DB
  }
  handleSubmit = (e)  => {
    e.preventDefault()
    // this.setState({ showError : false })  
    this.validateData().then(res => {
      if (res) {
        // Send Query
        console.log('Ready for query')
        this.postUser(e)
      } else {
        console.log('Display wrong data format')
        console.log('--',this.state)
      }
    })
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
              <input onClick={selectAll} type="email" id="email-input"  placeholder="email@domain.com"
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
              <label htmlFor="confirm" id="email-label">Confirm password:</label>
              <input onClick={selectAll} type="password" id="confirm-input" placeholder="Confirm your password..."
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
            <div>
              <button className="submit" onClick={this.handleSubmit}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Register