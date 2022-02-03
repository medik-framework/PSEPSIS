import React from 'react';
import './WelcomePage.css'

import {useDispatch} from "react-redux";

const WelcomePage = ({setIsDisplayScreen}) => {

    const dispatch = useDispatch()

    const newSession = () => {
        dispatch({type: "CLEAR_PREVIOUS_SESSION"})
        setIsDisplayScreen(true)
    }
        return (
            <div className='bgimg-1'>
                <div className="caption">
                    <span className="border">Pediatric Sepsis Guidance System</span><br/>
                    <button className="welcom-btn">
                        <a href="#display_screen" onClick={() => newSession()}> Create New Session</a>
                    </button><br/>
                    <button  className="welcom-btn">
                        <a href="#display_screen" onClick={() => setIsDisplayScreen(true)}> Restore Previous Session </a>
                    </button>
                </div>
            </div>
        );
}

export default WelcomePage;