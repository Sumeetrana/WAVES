import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../../actions/user_actions'
class Header extends Component {
    state = {
        bottom: [
            {
                name: 'Home',
                linkTo: '/',
                public: true
            },
            {
                name: 'Guitars',
                linkTo: '/shop',
                public: true
            }
        ],
        top: [
            {
                name: 'My cart',
                linkTo: '/user/cart',
                public: false
            },
            {
                name: 'My Account',
                linkTo: '/user/dashboard',
                public: false
            },
            {
                name: 'Log in',
                linkTo: '/register_login',
                public: true
            },
            {
                name: 'Log out',
                linkTo: '/user/logout',
                public: false
            }
        ]
    }

    logoutHandler = () => {
        this.props.dispatch(logoutUser()).then(response => {
            if (response.payload.success) {
                this.props.history.push('/')
            }
        })
    }

    cardLink = (item, i) => {
        let user = this.props.user.userData

        return (
            <div className="cart_link" key={i}>
                <span>{user.cart ? user.cart.length : 0}</span>
                <Link to={item.linkTo} key={i}>
                    {item.name}
                </Link>
            </div>
        )
    }

    defaultLink = (item, i) => (
        item.name ===  'Log out' ? 
            <div className="log_out_link"
                key={i}
                onClick={this.logoutHandler}
            >
                {item.name}
            </div>
        :
        <Link to={item.linkTo} key={i}>
            {item.name}
        </Link>
    )

    showLinks = (type) => {
        let list = []

        if (this.props.user.userData) {
            type.forEach((item) => {
                if (!this.props.user.userData.isAuth) {
                    if (item.public === true) {
                        list.push(item)
                    }
                } else {
                    if (item.name !== 'Log in') {
                        list.push(item)
                    }
                }
            })
        }
        return list.map((item, i) => {
            if (item.name !== 'My cart') {
                return this.defaultLink(item, i)    
            } else {
                return this.cardLink(item, i)
            }
            
        })
    }
    render() {
        
        return (
            <header className="bck_b_light">
                <div className="container">
                    <div className="left">
                        <div className="logo">
                            WAVES
                        </div>
                    </div>
                    <div className="right">
                        <div className="top">
                        {this.showLinks(this.state.top)}   
                        </div>
                        <div className="bottom">
                            {this.showLinks(this.state.bottom)}   
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(Header))