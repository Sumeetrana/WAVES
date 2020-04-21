import React, { Component } from 'react';
import PageTop from '../utils/page_top'

import { frets, price } from '../utils/Forms/fixed_categories'

import { connect } from 'react-redux'
import { getBrands, getWoods, getProductsToShop } from '../../actions/product_actions'

import CollapseCheckbox from '../utils/collapseCheckbox'
import CollapseRadio from '../utils/collapseRadio'

import LoadmoreCards from './loadmoreCards'
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
        this.props.dispatch(getProductsToShop(
            this.state.skip,
            this.state.limit,
            this.state.filters
        )).then(response => console.log(this.props.products))
    }

    handlePrice = (value) => {
        const data = price
        let array = []

        for(let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array
            }
        }
        return array
    }

    handleFilters = (filters, category) => {
        const newFilters = {...this.state.filters}    
        newFilters[category] = filters

        if (category === "price") {
            let priceValues = this.handlePrice(filters)
            newFilters[category] = priceValues
        }
        this.showFilteredResults(newFilters)
        this.setState({
            filters: newFilters
        })
    }

    showFilteredResults = (filters) => {
        this.props.dispatch(getProductsToShop(
            0,
            this.state.limit,
            filters
        )).then(() => {
            this.setState({
                skip: 0
            })
        })
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
                            <CollapseCheckbox
                                initState={false}
                                title="Frets"
                                list={frets}
                                handleFilters={(filter)=>this.handleFilters(filter, 'frets')}
                            />
                            <CollapseCheckbox
                                initState={false}
                                title="Wood"
                                list={products.woods}
                                handleFilters={(filter)=>this.handleFilters(filter, 'wood')}
                            />
                            <CollapseRadio
                                initState={true}
                                title="Price"
                                list={price}
                                handleFilters={(filter)=>this.handleFilters(filter, 'price')}
                            />
                        </div>
                        <div className="right">
                            <div className="shop_options">
                                <div className="shop_grids clear">
                                    grids
                                </div>
                            </div>
                            <div>
                                <LoadmoreCards 
                                    grid={this.state.grid}
                                    limit={this.state.limit}
                                    size={products.toShopSize}
                                    products={products.toShop}
                                    loadMore={() => console.log('load more')}
                                />
                            </div>
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