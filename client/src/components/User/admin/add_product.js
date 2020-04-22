import React, { Component } from 'react';
import UserLayout from '../../../hoc/userLayout'

import Formfield from '../../utils/Forms/formfield'
import { update, generateData, isFormValid, populateOptionFields, resetFields } from '../../utils/Forms/formActions'
import FileUpload from '../../utils/Forms/file_upload'

import { connect } from 'react-redux'
import { getBrands, getWoods, addProduct, clearProduct } from '../../../actions/product_actions'

class AddProduct extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter name'
                },
                validation: {
                    required: true                                   
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            description: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Product name',
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Enter description'
                },
                validation: {
                    required: true                                   
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            price: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product price',
                    name: 'price_input',
                    type: 'number',
                    placeholder: 'Enter price'
                },
                validation: {
                    required: true                                   
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            brand: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product Brand',
                    name: 'brand_input',
                    options: []
                },
                validation: {
                    required: true                                   
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            shipping: {
                element: 'select',
                value: '',
                config: {
                    label: 'Shipping',
                    name: 'shipping_input',
                    options: [
                        {key: true, value: 'Yes'},
                        {key: false, value: 'No'},
                        
                    ]
                },
                validation: {
                    required: true                                   
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            available: {
                element: 'select',
                value: '',
                config: {
                    label: 'Available, in stock',
                    name: 'available_input',
                    options: [
                        {key: true, value: 'Yes'},
                        {key: false, value: 'No'},
                        
                    ]
                },
                validation: {
                    required: true                                   
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            wood: {
                element: 'select',
                value: '',
                config: {
                    label: 'Wood material',
                    name: 'wood_input',
                    options: []
                },
                validation: {
                    required: true                                   
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            frets: {
                element: 'select',
                value: '',
                config: {
                    label: 'Frets',
                    name: 'frets_input',
                    options: [
                        {key: 20, value: 20},
                        {key: 21, value: 21},
                        {key: 22, value: 22},
                        {key: 24, value: 24}
                    ]
                },
                validation: {
                    required: true                                   
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            publish: {
                element: 'select',
                value: '',
                config: {
                    label: 'Publish',
                    name: 'publish_input',
                    options: [
                        {key: true, value: 'Public'},
                        {key: false, value: 'Hidden'},
                        
                    ]
                },
                validation: {
                    required: true                                   
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            images: {
                value:[],
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showLabel: false
            },
        }
    }

    componentDidMount() {
        const formdata = this.state.formdata

        this.props.dispatch(getBrands()).then(response => {
            const newFormdata = populateOptionFields(formdata, this.props.products.brands, 'brand')
            
            this.updateFields(newFormdata)
            
        })

        this.props.dispatch(getWoods()).then(response => {
            const newFormdata = populateOptionFields(formdata, this.props.products.woods, 'wood')
            
            this.updateFields(newFormdata)
            
        })
    }

    updateFields = (newFormdata) => {
        this.setState({
            formdata: newFormdata
        })
    }

    updateForm = (element) => {
        const newFormData = update(element, this.state.formdata, 'products')
        this.setState({
            formError: false,
            formdata: newFormData
        })
    }

    resetFieldsHandler = () => {
        const newFormData =  resetFields(this.state.formdata, 'products');

        this.setState({
            formdata: newFormData,
            formSuccess: true
        })
        setTimeout(() => {
            this.setState({
                formSuccess: false
            }, () => this.props.dispatch(clearProduct()))
        }, 3000)
    }

    submitForm = (e) => {
        e.preventDefault()

        let dataToSubmit = generateData(this.state.formdata, 'products')
        let formIsValid = isFormValid(this.state.formdata, 'products')

        if (formIsValid) {
            this.props.dispatch(addProduct(dataToSubmit)).then(() => {
                if(this.props.products.addProduct.success) {
                    this.resetFieldsHandler()
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

    imagesHandler = (images) => {
        const newFormData = {
            ...this.state.formdata
        }

        newFormData['images'].value = images
        newFormData['images'].valid = true

        this.setState({
            formdata: newFormData
        })
    }


    render() {
        return (
          <UserLayout>
            <div>
              <h1>Add product</h1>

              <form onSubmit={this.submitForm}>

                <FileUpload 
                    imagesHandler={(images) => this.imagesHandler(images)}
                    reset={this.state.formSuccess}
                />

                <Formfield
                  id="name"
                  formdata={this.state.formdata.name}
                  change={(element) => this.updateForm(element)}
                />
                <Formfield
                  id="description"
                  formdata={this.state.formdata.description}
                  change={(element) => this.updateForm(element)}
                />
                <Formfield
                  id="price"
                  formdata={this.state.formdata.price}
                  change={(element) => this.updateForm(element)}
                />

                <div className="form_devider"></div>

                <Formfield
                  id="brand"
                  formdata={this.state.formdata.brand}
                  change={(element) => this.updateForm(element)}
                />

                <Formfield
                  id="shipping"
                  formdata={this.state.formdata.shipping}
                  change={(element) => this.updateForm(element)}
                />

                <Formfield
                  id="available"
                  formdata={this.state.formdata.available}
                  change={(element) => this.updateForm(element)}
                />

                <div className="form_devider"></div>

                <Formfield
                  id="wood"
                  formdata={this.state.formdata.wood}
                  change={(element) => this.updateForm(element)}
                />

                <Formfield
                  id="frets"
                  formdata={this.state.formdata.frets}
                  change={(element) => this.updateForm(element)}
                />

                <div className="form_devider"></div>

                <Formfield
                  id="publish"
                  formdata={this.state.formdata.publish}
                  change={(element) => this.updateForm(element)}
                />

                {this.state.formSuccess ? 
                
                     <div className="form_success">
                         Success
                     </div>
                : null}

                {this.state.formError ? (
                  <div className="error_label">Please check you data</div>
                ) : null}

                <button type="submit">Add product</button>
              </form>
            </div>
          </UserLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(AddProduct);