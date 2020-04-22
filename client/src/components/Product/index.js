import React, { Component } from 'react';
import PageTop from '../utils/page_top'

import { connect } from 'react-redux'

import { getProductDetail, clearProductDetail } from '../../actions/product_actions'

class index extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(getProductDetail(id)).then(response => {
            console.log(this.props.products.prodDetail);
            
        })
        
    }

    componentWillUnmount() {
        this.props.dispatch(clearProductDetail())
    }

    render() {
        return (
            <div>
                Product
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(index);