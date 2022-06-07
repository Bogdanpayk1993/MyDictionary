import React, { useRef } from 'react';
import Send_Request_For_Database from '../../../send_request_for_database';

function UserChoice(props) {

    const id = useRef()
    const setUserId = props.setUserId
    const setUserName = props.setUserName

    async function GetUser(setUserId, setUserName) {
        let reply = await Send_Request_For_Database({ link: 'users/getId', id: id.current.value })
        let json = JSON.parse(reply)

        setUserId(json[0].id)
        setUserName(json[0].name)
    }    

    return (
        <>
            <input ref={id} />
            <button onClick={() => GetUser(setUserId, setUserName)}> ok </button>        
        </>
    )
}

export default UserChoice;