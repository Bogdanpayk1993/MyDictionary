import React, { useState } from 'react';
import GetTimeLife from '../../GetTimeLife/gettimelife';
import Send_Request_For_Database from '../../../send_request_for_database';
import './notifications.css';

async function getNotifications(userId, setNotifications) {
    let reply = await Send_Request_For_Database({ link: 'notifications/get', userId: `${userId}` })
    let json = JSON.parse(reply)

    let json1 = {}
    Object.entries(json).forEach(([key, value]) => {
        json1[value['id']] = value
    })

    setNotifications({ ...json1 })
}

function Notifications(props) {

    const userId = props.userId
    const setPage = props.setPage
    const [notifications, setNotifications] = useState({})

    if (!isNaN(userId) && JSON.stringify(notifications) === '{}') {
        getNotifications(userId, setNotifications)
    }

    return (
        <div className='ContainerNotifications'>
            <p> Notifications </p>
            <div className='Notifications'>
                {
                    Object.keys(notifications).reverse().map(el => (
                        <div onClick={() => setPage(notifications[el])} > 
                            <p> { GetTimeLife(notifications[el]['date']) } </p>
                            <p> { notifications[el]['action'] } </p>
                        </div>
                    ))
                }     
            </div>
        </div>
    )
}

export default Notifications;