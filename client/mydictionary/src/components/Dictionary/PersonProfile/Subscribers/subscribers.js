import React, { useState } from "react";
import Send_Request_For_Database from "../../../send_request_for_database";
import '../../People/PeopleList/peoplelist.css';

async function getSubscribers(globalUserId, userId, subscribersList, setSubscribersList) {

    let reply = await Send_Request_For_Database({ link: 'subscribers/getSubscriptionOther', globalUserId: `${globalUserId}`, userId: `${userId}` })
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

    if (JSON.stringify(subscribersList) == '{}') {
        if (JSON.stringify(json1) !== '{}') {
            setSubscribersList(json1)
        }
    } else {
        if (JSON.stringify(subscribersList) != JSON.stringify(json1)) {
            setSubscribersList(json1)
        }
    }
}

async function subscribe(el, globalUserId, userId, subscribersList, setSubscribersList, subscriptions, setSubscriptions) {
    let reply = await Send_Request_For_Database({ link: 'subscribers/set', subscriber: `${globalUserId}`, subscription: `${userId}` })
    let json = JSON.parse(reply)

    setSubscribersList({ ...subscribersList, [el]: { ...subscribersList[el], ['subscribers']: globalUserId } })
    setSubscriptions({ ...subscriptions, [json[0]['id']]: { ['id']: json[0]['id'], ['name']: json[0]['name'], ['email']: json[0]['email'] } })
}

function Subscribers(props) {
    const globalUserId = props.globalUserId
    const userId = props.userId
    const subscriptions = props.subscriptions
    const setSubscriptions = props.setSubscriptions
    const setPage = props.setPage
    const setRecipientOfCorrespondence = props.setRecipientOfCorrespondence
    const [subscribersList, setSubscribersList] = useState({})

    getSubscribers(globalUserId, userId, subscribersList, setSubscribersList)

    return (
        <div className='PeopleList'>
            {
                JSON.stringify(subscribersList) !== '{}' ?
                    (
                        Object.keys(subscribersList).map(el => (
                            <div key={el}>
                                <div onClick={() => { subscribersList[el]['id'] != globalUserId ? setPage(subscribersList[el]['id']) : setPage("MyWords") }}> {subscribersList[el]['name']} </div>
                                <div>
                                    {
                                        subscribersList[el]['id'] != globalUserId ?
                                            <button onClick={() => setRecipientOfCorrespondence({ 'id': subscribersList[el]['id'], 'name': subscribersList[el]['name'] })}> Correspondence </button>
                                            : null
                                    }
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