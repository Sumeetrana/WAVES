import React, { Component } from 'react';
import Formfield from '../utils/Forms/formfield'
import { update, generateData, isFormValid } from '../utils/Forms/formActions'
import Dialog from '@material-ui/core/Dialog'

import { connect } from 'react-redux'
import { registerUser } from '../../actions/user_actions'

class Register extends Component {

    state = {
        formError: false,
        formSucces: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter you name'
                },
                validation: {
                    required: true                                   
                },
                valid: false,
                touched: true,
                validationMessage: ''
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Enter you lastname'
                },
                validation: {
                    required: true
                                       
                },
                valid: false,
                touched: true,
                validationMessage: ''
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter you email'
                },
                validation: {
                    required: true,
                    email: true                    
                },
                valid: false,
                touched: true,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter you password'
                },
                validation: {
                    required: true                    
                },
                valid: false,
                touched: true,
                validationMessage: ''
            },
            confirmPassword: {
                element: 'input',
                value: '',
                config: {
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'Confirm your password'
                },
                validation: {
                    required: true,
                    confirm: 'password'                    
                },
                valid: false,
                touched: true,
                validationMessage: ''
            }
        }
    }

    updateForm = (element) => {
        const newFormData = update(element, this.state.formdata, 'register')
        this.setState({
            formError: false,
            formdata: newFormData
        })
    }

    submitForm = (e) => {
        e.preventDefault()

        let dataToSubmit = generateData(this.state.formdata, 'register')
        let formIsValid = isFormValid(this.state.formdata, 'register')

        if (formIsValid) {
            this.props.dispatch(registerUser(dataToSubmit))
                .then(response => {
                    if (response.payload.success) {
                        this.setState({
                            formError: false,
                            formSucces: true
                        })
                        setTimeout(() => {
                            this.props.history.push('/register_login')
                        }, 3000)
                    } else {
                        this.setState({
                            formError: true
                        })
                    }
                }).catch(e => {
                    this.setState({
                        formError: true
                    })
                })
        } else {
            this.setState({
                formError: true
            })
        }
    }
    render() {
        return (
            <div>
                <div className="page_wrapper">
                    <div className="container">
                         <div className="register_login_container">
                            <div className="left">
                                <form onSubmit={this.submitForm}>
                                    <h2>Personal Information</h2>
                                    <div className="form_block_two">
                                        <div className="block">
                                            <Formfield 
                                                id={"name"}
                                                formdata={this.state.formdata.name}
                                                change={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                        <div className="block">
                                            <Formfield 
                                                id={"lastname"}
                                                formdata={this.state.formdata.lastname}
                                                change={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Formfield 
                                            id={"email"}
                                            formdata={this.state.formdata.email}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                    <h2>Password</h2>
                                    <div className="form_block_two">
                                        <div className="block">
                                            <Formfield 
                                                id="password"
                                                formdata={this.state.formdata.password}
                                                change={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                        <div className="block">
                                            <Formfield 
                                                id="confirmPassword"
                                                formdata={this.state.formdata.confirmPassword}
                                                change={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                    {
                                        this.state.formError ?
                                            <div className="error_label">
                                                Please check you data
                                            </div>
                                        : null 
                                    }

                                    <button type="submit">Create an Account</button>
                                    </div>
                                </form>
                            </div>
                         </div>
                    </div>
                </div> 

                <Dialog open={this.state.formSucces}>
                    <div className="dialog_alert">
                        <div>Congratulations !!</div>
                        <div>
                            You will be redirected to the LOGIN in couple of seconds...
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default connect()(Register);