import React, { useState } from 'react';
import Send_Request_For_Database from '../../../send_request_for_database';
import '../../People/PeopleList/peoplelist.css';

async function getSubscriptions(globalUserId, userId, subscriptionsList, setSubscriptionsList) {

    let reply = await Send_Request_For_Database({ link: 'subscribers/getSubscribersOther', globalUserId: `${globalUserId}`, userId: `${userId}` })
    let json = JSON.parse(reply)

    let json1 = {}
    Object.entries(json).forEach(([key, value]) => {
        json1[value['id']] = value
    })

    for (let i = 0; i < Object.keys(json1).length; i++) {
        let id = Object.keys(json1)[i]
        if (json1[id]['subscriber'] > 0) {
            json1 = { ...json1, [id]: { ...json1[id], ['statys']: true } }
        } else {
            if (json1[id]['id'] == globalUserId) {
                json1 = { ...json1, [id]: { ...json1[id], ['statys']: true } }
            } else {
                json1 = { ...json1, [id]: { ...json1[id], ['statys']: false } }
            }
        }
    }

    if (JSON.stringify(subscriptionsList) == '{}') {
        if (JSON.stringify(json1) !== '{}') {
            setSubscriptionsList(json1)
        }
    } else {
        if (JSON.stringify(subscriptionsList) != JSON.stringify(json1)) {
            setSubscriptionsList(json1)
        }
    }
}

async function subscribe(el, globalUserId, userId, subscriptionsList, setSubscriptionsList, subscriptions, setSubscriptions) {
    let reply = await Send_Request_For_Database({ link: 'subscribers/set', subscriber: `${globalUserId}`, subscription: `${userId}` })
    let json = JSON.parse(reply)

    setSubscriptionsList({ ...subscriptionsList, [el]: { ...subscriptionsList[el], ['subscribers']: globalUserId } })
    setSubscriptions({ ...subscriptions, [json[0]['id']]: { ['id']: json[0]['id'], ['name']: json[0]['name'], ['email']: json[0]['email'] } })
}

function Subscriptions(props) {
    const globalUserId = props.globalUserId
    const userId = props.userId
    const subscriptions = props.subscriptions
    const setSubscriptions = props.setSubscriptions
    const setPage = props.setPage
    const [subscriptionsList, setSubscriptionsList] = useState({})

    getSubscriptions(globalUserId, userId, subscriptionsList, setSubscriptionsList)

    return (
        <div className='PeopleList'>
            {
                JSON.stringify(subscriptionsList) !== '{}' ?
                    (
                        Object.keys(subscriptionsList).map(el => (
                            <div key={el}>
                                <div onClick={() => { subscriptionsList[el]['id'] != globalUserId ? setPage(subscriptionsList[el]['id']) : setPage("MyWords") }}> {subscriptionsList[el]['name']} </div>
                                <div>
                                    {
                                        subscriptionsList[el]['statys'] != true ?
                                            <button onClick={() => subscribe(el, globalUserId, subscriptionsList[el]['id'], subscriptionsList, setSubscriptionsList, subscriptions, setSubscriptions)} > Subscribe </button>
                                            : null
                                    }
                                </div>
                            </div>
                        ))
                    ) :
                    (
                        <p> Person don't have subscriptions. </p>
                    )
            }
        </div>
    )
}

export default Subscriptions;