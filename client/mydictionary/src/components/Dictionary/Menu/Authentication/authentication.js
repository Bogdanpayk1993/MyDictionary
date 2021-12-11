import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../../../Auth0/LoginButton';
import LogoutBotton from '../../../Auth0/LogoutButton';
import Work_With_Database from '../../../work_with_database';
import './authentication.css';

async function getUserData(user, setUserId)
{
    let json

    let reply = Work_With_Database({require: `SELECT * FROM users WHERE email='${user.email}'`})
    await reply.then((value) => {
        json = JSON.parse(value)
        if (Object.keys(json).length != 0)
        {
            setUserId(json[0].id)
        }
    })
    
    if (Object.keys(json).length == 0) {
        let reply = Work_With_Database({require: `INSERT INTO users (name,email) VALUES ('${user.name}', '${user.email}')`})
        await reply.then((value) => {
            json = JSON.parse(value)
            setUserId(json.insertId)
        })
    }
}

function Authentication(props) {
     const { user, isAuthenticated } = useAuth0();

    if (isAuthenticated) {
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
