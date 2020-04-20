import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Formfield from '../utils/Forms/formfield'
import { update, generateData, isFormValid } from '../utils/Forms/formActions'

import { connect } from 'react-redux'
import { loginUser } from '../../actions/user_actions'

class login extends Component {
    state = {
        formError: false,
        formSuccess: '',
        formdata: {
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
            }
        }
    }

    updateForm = (element) => {
        const newFormData = update(element, this.state.formdata, 'login')
        this.setState({
            formError: false,
            formdata: newFormData
        })
    }

    

    submitForm = (e) => {
        e.preventDefault()

        let dataToSubmit = generateData(this.state.formdata, 'login')
        let formIsValid = isFormValid(this.state.formdata, 'login')

        if (formIsValid) {
            this.props.dispatch(loginUser(dataToSubmit)).then(response => {
                if(response.payload.loginSucces) {
                    console.log(response.payload)
                    this.props.history.push('/user/dashboard')
                } else {
                    this.setState({
                        formError: true
                    })
                }
            })
            
        } else {
            this.setState({
                formError: true
            })
        }
        
        
    }

    render() {
        return (
            <div className="signin_wrapper">
                <form onSubmit={this.submitForm}>
                    <Formfield 
                        id={"email"}
                        formdata={this.state.formdata.email}
                        change={(element) => this.updateForm(element)}
                    />

                    <Formfield 
                        id={"password"}
                        formdata={this.state.formdata.password}
                        change={(element) => this.updateForm(element)}
                    />

                    {
                        this.state.formError ?
                            <div className="error_label">
                                Please check you data
                            </div>
                    : null 
                    }

                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}



export default connect()(withRouter(login));