import React, { Component } from 'react';
import Formfield from '../utils/Forms/formfield'
import { update, generateData, isFormValid, populateFields } from '../utils/Forms/formActions'

import { connect } from 'react-redux'

class UpdatePersonal extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formdata:{
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
            }
        }
    }

    updateForm = (element) => {
        const newFormData = update(element, this.state.formdata, 'update_user')
        this.setState({
            formError: false,
            formdata: newFormData
        })
    }

    submitForm = (e) => {
        e.preventDefault()

        let dataToSubmit = generateData(this.state.formdata, 'update_user')
        let formIsValid = isFormValid(this.state.formdata, 'update_user')

        if (formIsValid) {
            console.log(dataToSubmit);
            
        } else {
            this.setState({
                formError: true
            })
        }
    }

    componentDidMount() {
        const newFormData = populateFields(this.state.formdata, this.props.user.userData)

        this.setState({
            formdata: newFormData
        })
    }

    render() {
        return (
            <div>
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
                        <div>
                        {
                            this.state.formSuccess ?
                                <div className="form_success">
                                    Success
                                </div>

                            : null
                        }
                        {
                            this.state.formError ?
                                <div className="error_label">
                                    Please check your data
                                </div>
                            : null 
                        }

                        <button type="submit">Update personal Info</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UpdatePersonal);