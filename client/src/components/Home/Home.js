import React, { Component } from 'react'
import HomeSlider from './home_slider'
import HomePromotion from './home_promotion'
import CardBlock from '../utils/card_block'

import { connect } from 'react-redux'
import { getProductsByArrival, getProductsBySell } from '../../actions/product_actions'
class Home extends Component {

    componentDidMount() {
        this.props.dispatch(getProductsBySell()).then(response => console.log(this.props.products))
        this.props.dispatch(getProductsByArrival()).then(response => console.log(this.props.products))
    }

    render() {
        return (
            <div>
                <HomeSlider />
                <CardBlock
                    list={this.props.products.bySell}
                    title="Best Selling Guitars"
                />
                <HomePromotion />
                <CardBlock
                    list={this.props.products.byArrival}
                    title="New Arrival"
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Home)