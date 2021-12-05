import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Login from '../Auth0/LoginButton';
import Logout from '../Auth0/LogoutButton';
import './dictionary.css';

function Dictionary() {
    const { user, isAuthenticated } = useAuth0()

    return (
        <>
            <div className="First_div">
                <p> </p>
            </div>
            <div className="Second_div">
                <p> </p>
            </div>
            <div className="Third_div">
                {
                    !isAuthenticated ?
                        (
                            <Login />
                        ) : (
                            <>
                                <p> {user.name} </p>
                                <Logout />
                            </>
                        )
                }
            </div>
        </>
    )
}

export default Dictionary;