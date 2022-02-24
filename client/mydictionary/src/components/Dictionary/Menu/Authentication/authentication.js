import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../../../Auth0/LoginButton';
import LogoutBotton from '../../../Auth0/LogoutButton';
import Send_Request_For_Database from '../../../send_request_for_database';
import './authentication.css';

async function getUserData(user, setUserId, setUserName) {
    let reply = await Send_Request_For_Database({ link: 'users/set', userName: `${user.name}`, userEmail: `${user.email}` })
    let json = JSON.parse(reply)

    setUserId(json[0].id)
    setUserName(user.name)
}

function Authentication(props) {
    const { user, isAuthenticated } = useAuth0();

    if (isAuthenticated && isNaN(props.userId)) {
        getUserData(user, props.setUserId, props.setUserName)
    }

    return (
        <>
            {
                !isAuthenticated ?
                    (
                        <LoginButton />
                    ) :
                    (
                        <>
                            <span> {user.name} </span>
                            <LogoutBotton />
                        </>
                    )
            }
        </>
    )
}

export default Authentication;
