import React, { Component } from 'react';
import Formfield from '../../utils/Forms/formfield'
import { update, generateData, isFormValid, populateFields } from '../../utils/Forms/formActions'
import { updateUserData, clearUpdateUser} from '../../../actions/user_actions'

import { connect } from 'react-redux'

class UpateSiteNfo extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formdata:{
            address: {
                element: 'input',
                value: '',
                config: {
                    label: 'Address',
                    name: 'address_input',
                    type: 'text',
                    placeholder: 'Enter the site address'
                },
                validation: {
                    required: true                                   
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            hours: {
                element: 'input',
                value: '',
                config: {
                    label: 'Working Hours',
                    name: 'hours_input',
                    type: 'text',
                    placeholder: 'Enter the site working hours'
                },
                validation: {
                    required: true                                   
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            phone: {
                element: 'input',
                value: '',
                config: {
                    label: 'Phone Number',
                    name: 'phone_input',
                    type: 'text',
                    placeholder: 'Enter the phone number'
                },
                validation: {
                    required: true                                   
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    label: 'Company Email',
                    name: 'email_input',
                    type: 'text',
                    placeholder: 'Enter email'
                },
                validation: {
                    required: true                                   
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            }
        }
    }
    
    updateForm = (element) => {
        const newFormData = update(element, this.state.formdata, 'site_info')
        this.setState({
            formError: false,
            formdata: newFormData
        })
    }

    submitForm = (e) => {
        e.preventDefault()

        let dataToSubmit = generateData(this.state.formdata, 'site_info')
        let formIsValid = isFormValid(this.state.formdata, 'site_info')

        if (formIsValid) {
            console.log(dataToSubmit);
            
        } else {
            this.setState({
                formError: true
            })
        }
    }

    render() {
        return (
          <div>
            <form onSubmit={this.submitForm}>
                <h1>Site info</h1>
              <Formfield
                id={"address"}
                formdata={this.state.formdata.address}
                change={(element) => this.updateForm(element)}
              />
              <Formfield
                id={"hours"}
                formdata={this.state.formdata.hours}
                change={(element) => this.updateForm(element)}
              />
              <Formfield
                id={"phone"}
                formdata={this.state.formdata.phone}
                change={(element) => this.updateForm(element)}
              />
              <Formfield
                id={"email"}
                formdata={this.state.formdata.email}
                change={(element) => this.updateForm(element)}
              />
              <div>
                {
                    this.state.formSuccess ?
                        <div className="form_success">
                            Success
                        </div>
                    : null
                }
                {this.state.formError ? (
                  <div className="error_label">Please check you data</div>
                ) : null}

                <button type="submit">Update</button>
              </div>
            </form>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        site: state.site
    }
}

export default connect()(UpateSiteNfo);