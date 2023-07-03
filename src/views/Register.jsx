import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
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
  let reqIdx = -1
  switch (props.check) {
    case 'length':
      content = 'Must be at least 8 characters long.'
      // verify if the length of the password is at least 8
      isActive = Boolean(str.length >= 8)
      reqIdx = props.comparisions.indexOf('length')
      break
    case 'caps':
      content = 'Must contain at least ONE uppercase.'
      // verify if the length of the password is at least
      isActive = Boolean(str.match(/[A-Z]+/g))
      reqIdx = props.comparisions.indexOf('')
      break
    case 'number':
      content = 'Must contain at least ONE number.'
      // verify if the length of the password is at least
      isActive = Boolean(str.match(/[0-9]+/g))
      reqIdx = props.comparisions.indexOf('')
      break
    case 'special':
      content = 'Must contain at least one special character.'
      // verify if the length of the password is at least
      isActive = Boolean(str.match(/[^A-Za-z0-9]/g))
      reqIdx = props.comparisions.indexOf('')
      break
    case 'match':
      content = 'Must match with confirmation.'
      // verify if the length of the password is at least
      isActive = Boolean(str === props.state.confirm)
      reqIdx = props.comparisions.indexOf('')
      break
    default:
      content = ''
      isActive = false
      reqIdx = 0
  }
  return (
    <div className="login-requirement">
      {content !== '' 
      ?
        <div className={isActive ? "completed" : ""}>
          <span value={reqIdx} className={isActive ? "check active" : "check"}><BsCheckCircle /></span>
          <span className="requirement">{content}</span>
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
      name: '',
      lastname: '',
      email: '',
      role: '',
      password: '',
      confirm: '',
      showPassword: true,
      showError : false,
      navigate: false,
      user: {}
    };
  }
  updateName = (e) => {
    this.setState({
      name: e.target.value,
      showError: 0
    })
  }
  updateLastName = (e) => {
    this.setState({
      lastname: e.target.value,
      showError: 0
    })
  }
  updateEmail = (e) => {
    this.setState({
      email: e.target.value,
      showError: 0
    })
  }
  updateRole = (e) => { // Different because the it comes from a react-Select input
    this.setState({
      role:e.value,
      showError: 0
    })
  }
  updatePassword = (e) => {
    this.setState({
      password:e.target.value,
      showError: 0
    })
  }
  updateConfirm = (e) => {
    this.setState({
      confirm:e.target.value,
      showError: 0
    })
  }
  logChange = (e) => {
    console.error(e)
  }
  togglePassword = (value) => {
    this.setState({
      showPassword : value,
      showError : 0
    })  
  }
  letsGo = (success) => {
    alert(success)
    this.setState({
      navigate: true
    })
    // blank every input field
  }
  validateData = async () => {
    //TODO: validate the password conditions are met, and copy the email validation
    // better Feedback to the user, in this case the dev admin
    // add a default/secret dev role
    // switch an error case in a function to display Email Error and color the checks
    // Search how to get all li elements on the template? verify they contain the completed class,
    // overwrite the gray with red, maybe will need to use important on green validations
     // First verify if email
     let str = this.state.email
     if (str.includes('@')) {
       let at = str.indexOf('@')
       str = str.slice(0,at)
       if (str.indexOf('.')) {
        let passReqs = this.checkPasswordReqs()
         let str = this.state.password
         if (Boolean(str.match(/[^A-Za-z0-9]/g)) && passReqs) {
           return true // Valid formats
         } else {
          return 'passwordReqs'
         }
       }
     }; return false   // any condition is not fullfiled
  }
  checkPasswordReqs = () => {
    const allWithClass = Array.from(
      document.getElementsByClassName('completed')
    );
    return allWithClass.length === 5
  }
  postUser = async (e) => {
    await axios.post('http://127.0.0.1:4001/register',[this.state])
    .then(response => {
      console.log('Success!',response)
      this.letsGo('User registered sucessfully')
    })
    .catch(ex => {
      console.warn("DB ERROR Missmatch", ex)
      this.setState({
        showError: 1
      })
    })
  }
  handleSubmit = (e)  => {
    e.preventDefault()
    
    // this.setState({ showError : false })  
    this.validateData().then(res => {
      if (res) {
        if (res === true) {
          // Send Query
          console.log('Ready for query')
          console.warn(this.state)
          this.postUser(e)
        } else {
          console.log('Display reqs error')
          this.setState({
            showError : 1
          })  
        }
      } else {
        console.log('Display wrong data format')
        this.setState({
          showError : 2
        })  
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
            {this.state.navigate ?  <Navigate to="/" replace={true} />  : null }
            <div>
              <label htmlFor="name-input" id="name-label">Name:</label>
              <input onClick={selectAll} type="name" id="name-input"  placeholder="John..."
                autoComplete="off" required={true} onChange={this.updateName}/>
            </div>
            <div>
              <label htmlFor="lastName-input" id="lastName-label">Last Name:</label>
              <input onClick={selectAll} type="lastName" id="lastName-input"  placeholder="Doe..."
                autoComplete="off" required={true} onChange={this.updateLastName}/>
            </div>
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
                    { label: 'Desarrollo', value: 'developerez'}
                ]
                }>
              </Select>
            </div>
            <div>
              <label htmlFor="email-input" id="email-label">E-mail:</label>
              <input onClick={selectAll} type="email" id="email-input"  placeholder="email@domain.com"
                autoComplete="off" required={true} onChange={this.updateEmail}/>
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
            {this.state.showError !== 0
            ?
              this.state.showError === 1 // Password error
              ?
                <div className="errorMessage">
                  <p >** Invalid Password! Please make sure the desired password</p>
                  <p >meets all the required criteria and try again.</p>
                </div>
              : // General error
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

export default Register