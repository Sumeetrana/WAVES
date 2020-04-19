import React from 'react'
import MyButton from '../utils/button'

function Register_Login() {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h1>New Customer?</h1>
                        <p>Be the part of this awesome guitar selling website and buy most significant and awesome guitar by registering yourself.</p>
                        <MyButton 
                            type="default"
                            title="Create an account"
                            linkTo="/register"
                            addStyles={{
                                margin: '10px 0 0 0'
                            }}
                        />
                    </div>
                    <div className="right">
                        <h2>REGISTERED CUSTOMERS</h2>
                        <p>If you have an account, please login</p>
                        LOGIN
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register_Login