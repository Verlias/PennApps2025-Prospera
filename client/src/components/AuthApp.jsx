import { withAuthInfo, useRedirectFunctions, useLogoutFunction } from '@propelauth/react';
import './AuthApp.css'; 
import animation from '../assets/animation.mp4';
import React, { useEffect, useState } from 'react';

const AuthApp = withAuthInfo((props) => {
    const logoutFunction = useLogoutFunction();
    const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } = useRedirectFunctions();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100); 

        return () => clearTimeout(timer); 
    }, []);

    return (
        <div className='main'>
            <video autoPlay loop muted className='video'>
                <source src={animation} type='video/mp4' />
                Your browser does not support HTML5 video.
            </video>
            <div className={`auth-container fade-in ${isVisible ? 'show' : ''}`}>
                {props.isLoggedIn ? (
                    <>
                        <p>You are logged in as {props.user.email}</p>
                        <button onClick={redirectToAccountPage}>Account</button>
                        <button onClick={() => logoutFunction(true)}>Logout</button>
                    </>
                ) : (
                    <>
                        <p>You are not logged in</p>
                        <button onClick={redirectToLoginPage}>Login</button>
                        <button onClick={redirectToSignupPage}>Signup</button>
                    </>
                )}
            </div>
        </div>
    );
});

export default AuthApp;
