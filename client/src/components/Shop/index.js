import React, { Component } from 'react';
import PageTop from '../utils/page_top'

import { connect } from 'react-redux'
import { getBrands, getWoods } from '../../actions/product_actions'

import CollapseCheckbox from '../utils/collapseCheckbox'
class Shop extends Component {

    componentDidMount() {
        this.props.dispatch(getBrands()).then(response => console.log(this.props.products.brands))
        this.props.dispatch(getWoods()).then(response => console.log(this.props.products.woods))
    }

    handleFilters = () => {
        
    }

    render() {
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