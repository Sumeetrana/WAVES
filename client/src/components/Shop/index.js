import React, { Component } from 'react';
import PageTop from '../utils/page_top'

import { frets } from '../utils/Forms/fixed_categories'

import { connect } from 'react-redux'
import { getBrands, getWoods } from '../../actions/product_actions'

import CollapseCheckbox from '../utils/collapseCheckbox'
class Shop extends Component {

    state = {
        grid: '',
        limit: 6,
        skip: 0,
        filters: {
            brand: [],
            frets: [],
            wood: [],
            price: []
        }
    }

    componentDidMount() {
        this.props.dispatch(getBrands()).then(response => console.log(this.props.products.brands))
        this.props.dispatch(getWoods()).then(response => console.log(this.props.products.woods))
    }

    handleFilters = (filters, category) => {
        const newFilters = {...this.state.filters}    
        newFilters[category] = filters

        this.setState({
            filters: newFilters
        })
    }

    render() {
        console.log(this.state.filters);
        
        const products = this.props.products
        return (
            <div>
                <PageTop
                    title="Browse Products"
                />
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                            <CollapseCheckbox
                                initState={true}
                                title="Brands"
                                list={products.brands}
                                handleFilters={(filter)=>this.handleFilters(filter, 'brand')}
                            />
                            <CollapseCheckbox
                                initState={false}
                                title="Frets"
                                list={frets}
                                handleFilters={(filter)=>this.handleFilters(filter, 'frets')}
                            />
                            <CollapseCheckbox
                                initState={true}
                                title="Wood"
                                list={products.woods}
                                handleFilters={(filter)=>this.handleFilters(filter, 'wood')}
                            />
                        </div>
                        <div className="right">
                            right
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Shop);