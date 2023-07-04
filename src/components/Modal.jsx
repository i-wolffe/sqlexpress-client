import React, { Component } from 'react'
import { GrClose } from 'react-icons/gr'

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      user: {}
    };
  }
  cancelModal = () => {
    this.props.setDisplayModal(false)
  }
  endSession = () => {
    let defaultUser = { name: '', access:'', token: ''  }
    this.props.setDisplayModal(false)
    this.props.setUser(defaultUser)
  }
  render() {
    return (
      <div className={`d-grid ${this.props.displayModal ? '' : 'hidden'}`}>
      <section className="modal">
        <div className="flex-end">
          <span className="modal-close" onClick={this.cancelModal}><GrClose /></span>
        </div>
        <h2 className="modal-title">Log out</h2>
        <p className="modal-content">Are you sure you want to end your current session? Click 'Cancel' to close this message.</p>
        <div className="flex modal-button-container">
          <span className="modal-button" onClick={this.cancelModal}>Cancel</span>
          <span className="modal-button" onClick={this.endSession}>Continue</span>
        </div>
      </section>
      <div className="overlay" onClick={this.cancelModal}>
      </div>
      </div>
    )
  }
}

export default Modal