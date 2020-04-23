import React, { Component } from 'react';
import UserLayout from '../../hoc/userLayout'

import { connect } from 'react-redux'
import { getCartItems } from '../../actions/user_actions'
import UserProductBlock from '../utils/User/user_product_block'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'

class UserCart extends Component {

    state = {
        loading: true,
        total: 0,
        showTotal: false,
        showSucces: false
    }

    componentDidMount() {
        let cartItem = [];
        let user = this.props.user 

        if (user.userData.cart) {
            if (user.userData.cart.length>0) {
                user.userData.cart.forEach(item=>{
                    cartItem.push(item.id)
                })

                this.props.dispatch(getCartItems(cartItem, user.userData.cart))
            }
        }
    }

    removeFromCart = (id) => {}

    render() {
        return (
            <UserLayout>
            <div>
                <h1>My Cart</h1>
                <div className="user_cart">
                    <UserProductBlock
                        products={this.props.user}
                        type="cart"
                        removeItem={(id)=>this.removeFromCart(id)}
                    />
                </div>
            </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserCart);