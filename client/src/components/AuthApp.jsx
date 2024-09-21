import { withAuthInfo, useRedirectFunctions, useLogoutFunction } from '@propelauth/react';
import './AuthApp.css'; 

const AuthApp = withAuthInfo((props) => {
    const logoutFunction = useLogoutFunction();
    const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } = useRedirectFunctions();

    return (
        <div className="auth-container">
            {props.isLoggedIn ? (
                <>
                    <p>You are logged in as {props.user.email}</p>
                    <button onClick={() => redirectToAccountPage()}>Account</button>
                    <button onClick={() => logoutFunction(true)}>Logout</button>
                </>
            ) : (
                <>
                    <p>You are not logged in</p>
                    <button onClick={() => redirectToLoginPage()}>Login</button>
                    <button onClick={() => redirectToSignupPage()}>Signup</button>
                </>
            )}
        </div>
    );
});

export default AuthApp;

