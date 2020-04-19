import React, { Component } from 'react';
import Formfield from '../utils/Forms/formfield'

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
                valid: true,
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
                valid: true,
                touched: true,
                validationMessage: ''
            }
        }
    }

    handleChange = () => {

    }

    submitForm = () => {

    }

    render() {
        return (
            <div className="signin_wrapper">
                <form onSubmit={this.submitForm}>
                    <Formfield 
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={this.handleChange}
                    />
                </form>
            </div>
        );
    }
}

export default login;