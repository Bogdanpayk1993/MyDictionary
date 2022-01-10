import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../../../Auth0/LoginButton';
import LogoutBotton from '../../../Auth0/LogoutButton';
import Send_Request_For_Database from '../../../send_request_for_database';
import './authentication.css';

async function getUserData(user, setUserId) {
    let json
    
    let reply = Send_Request_For_Database({ link:'users/getEmail', wantedEmail: `${user.email}` })
    await reply.then((value) => {
        json = JSON.parse(value)
        if (Object.keys(json).length != 0) {
            setUserId(json[0].id)
        }
    })

    if (Object.keys(json).length == 0) {
        let reply = Send_Request_For_Database({ link: 'users/set', userName: `${user.name}`, userEmail: `${user.email}` })
        await reply.then((value) => {})

        let reply1 = Send_Request_For_Database({ link:'users/getEmail', wantedEmail: `${user.email}` })
        await reply1.then((value) => {
            json = JSON.parse(value)
            setUserId(json[0].id)
        })
    }
}

function Authentication(props) {
    const { user, isAuthenticated } = useAuth0();

    if (isAuthenticated && isNaN(props.userId)) {
        getUserData(user, props.setUserId)
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
