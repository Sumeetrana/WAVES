import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCompass } from '@fortawesome/fontawesome-free-solid'
import {faPhone} from '@fortawesome/fontawesome-free-solid'
import {faClock} from '@fortawesome/fontawesome-free-solid'
import {faEnvelope} from '@fortawesome/fontawesome-free-solid'

const index = () => {
    return (
        <footer className="bck_b_dark">
            <div className="container">
                <div className="logo">
                    Waves
                </div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Contact Information</h2>
                        <div className="business_nfo">
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faCompass}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Address</div>
                                    <div>Kramer 1234</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Phone</div>
                                    <div>98765-4310</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faClock}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Working Hours</div>
                                    <div>24 * 7 * 7 * 365</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Email</div>
                                    <div>waves@gmail.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="left">
                        <h2>Be the first to know</h2>
                         <div>
                             Get all the information on events, sales and offers you can miss out.
                         </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default index