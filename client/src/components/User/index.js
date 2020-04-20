import React from 'react'
import UserLayout from '../../hoc/userLayout'
import MyButton from '../utils/button'

function UserDashBoard(props) {
    console.log(props);
    
    return (
        <UserLayout>
            <div>
                <div className="user_nfo_panel">
                    <h1>User Information</h1>
                    <div>
                        <span>{props.user.userData.name}</span>
                        <span>{props.user.userData.lastname}</span>
                        <span>{props.user.userData.email}</span>
                    </div>
                    <MyButton 
                        type="default"
                        title="Edit account info"
                        linkTo="/user/user_profile"
                    />
                </div>
                <div className="user_nfo_panel">
                    <h1>History Purchases</h1>
                    <div className="user_product_block_wrapper">
                        history
                    </div>
                </div>
            </div>
        </UserLayout>
    )
}

export default UserDashBoard
