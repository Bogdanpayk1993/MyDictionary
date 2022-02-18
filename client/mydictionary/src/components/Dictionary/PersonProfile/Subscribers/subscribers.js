import React, { useState } from "react";
import Send_Request_For_Database from "../../../send_request_for_database";
import '../../People/PeopleList/peoplelist.css';

async function getSubscribers(globalUserId, userId, subscribersList, setSubscribersList) {

    let reply = await Send_Request_For_Database({ link: 'subscribers/getSubscriptionOther', globalUserId: `${globalUserId}`, userId: `${userId}` })
    let json = JSON.parse(reply)

    for (let i = 0; i < Object.keys(json).length; i++) {
        if (json[i]['subscriber'] > 0) {
            json = { ...json, [i]: { ...json[i], ['statys']: true } }
        } else {
            if (json[i]['id'] == globalUserId ) {
                json = { ...json, [i]: { ...json[i], ['statys']: true } }
            } else {
                json = { ...json, [i]: { ...json[i], ['statys']: false } }
            }
        }
    }
    
    if (JSON.stringify(subscribersList) == '{}') {
        if (JSON.stringify(json) !== '{}') {
            setSubscribersList(json)
        }
    } else {
        if (JSON.stringify(subscribersList) != JSON.stringify(json)) {
            setSubscribersList(json)
        }
    }
}

async function subscribe(el, globalUserId, userId, subscribersList, setSubscribersList, subscriptions, setSubscriptions) {

    let reply = await Send_Request_For_Database({ link: 'subscribers/getSubscriberSubscription', subscriber: `${globalUserId}`, subscription: `${userId}` })
    let json = JSON.parse(reply)

    if (Object.keys(json).length == 0) {
        let reply = Send_Request_For_Database({ link: 'subscribers/set', subscriber: `${globalUserId}`, subscription: `${userId}` })

        reply = await Send_Request_For_Database({ link: 'users/getId', id: `${userId}` })
        json = JSON.parse(reply)

        setSubscribersList({ ...subscribersList, [el]: { ...subscribersList[el], ['statys']: true } })

        setSubscriptions({ ...subscriptions, [json[0]['id']]: { ['id']: json[0]['id'], ['name']: json[0]['name'], ['email']: json[0]['email'] } })
    }
}

function Subscribers(props) {
    const globalUserId = props.globalUserId
    const userId = props.userId
    const subscriptions = props.subscriptions
    const setSubscriptions = props.setSubscriptions
    const setPage = props.setPage
    const [subscribersList, setSubscribersList] = useState({})

    getSubscribers(globalUserId, userId, subscribersList, setSubscribersList)

    return (
        <div className='PeopleList'>
            {
                JSON.stringify(subscribersList) !== '{}' ?
                    (
                        Object.keys(subscribersList).map(el => (
                            <div key={el}>
                                <div onClick={() => {subscribersList[el]['id'] != globalUserId ? setPage(subscribersList[el]['id']) : setPage("MyWords")}}> {subscribersList[el]['name']} </div>
                                <div>
                                    {
                                        subscribersList[el]['statys'] != true ?
                                            <button onClick={() => subscribe(el, globalUserId, subscribersList[el]['id'], subscribersList, setSubscribersList, subscriptions, setSubscriptions)} > Subscribe </button>
                                            : null
                                    }
                                </div>
                            </div>
                        ))
                    ) :
                    (
                        <p> Person don't have subscribers. </p>
                    )
            }
        </div>
    )
}

export default Subscribers;