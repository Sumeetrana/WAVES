import React, { Component } from 'react';
import PageTop from '../utils/page_top'

import { connect } from 'react-redux'

import { getProductDetail, clearProductDetail } from '../../actions/product_actions'
import ProdInfo from './prodNfo'
import ProdImg from './prodImg'

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
                <PageTop 
                    title="Product detail"
                />
                <div className="container">
                    {
                        this.props.products.prodDetail ?
                            <div className="product_detail_wrapper">
                                <div className="left">
                                    <div style={{width:'500px'}}>
                                        <ProdImg 
                                            detail={this.props.products.prodDetail}
                                        />
                                    </div>
                                </div>
                                <div className="right">
                                    <ProdInfo
                                        addToCart={(id)=>this.addToCartHandler(id)} 
                                        detail={this.props.products.prodDetail}
                                    />
                                </div>
                            </div>
                        : 'Loading..'
                    }
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

export default connect(mapStateToProps)(index);