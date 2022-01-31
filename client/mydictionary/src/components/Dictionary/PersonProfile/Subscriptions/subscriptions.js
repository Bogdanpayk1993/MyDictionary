import React, { useState } from 'react';
import Send_Request_For_Database from '../../../send_request_for_database';
import '../../People/PeopleList/peoplelist.css';

async function getSubscriptions(globalUserId, userId, subscriptionsList, setSubscriptionsList) {
    let json

    let reply = Send_Request_For_Database({ link: 'subscribers/getSubscriber', subscriber: `${userId}` })
    await reply.then((value) => {
        json = JSON.parse(value)
    })

    let json1 = {}

    if (Object.keys(json).length != 0) {
        for (let i = 0; i < Object.keys(json).length; i++) {
            let id
            reply = Send_Request_For_Database({ link: 'users/getId', id: `${json[i]['subscription']}` })
            await reply.then((value) => {
                let json2 = JSON.parse(value)
                id = json2[0]['id']
                json1 = { ...json1, [id]: { ['id']: json2[0]['id'], ['name']: json2[0]['name'], ['email']: json2[0]['email'] } }
            })

            let json3

            reply = Send_Request_For_Database({ link: 'subscribers/getSubscriberSubscription', subscriber: `${globalUserId}`, subscription: `${json1[id]['id']}` })
            await reply.then((value) => {
                json3 = JSON.parse(value)
            })

            if (Object.keys(json3).length != 0) {
                json1 = { ...json1, [id]: { ...json1[id], ['statys']: true } }
            } else {
                if (globalUserId == json1[id]['id']) {
                    json1 = { ...json1, [id]: { ...json1[id], ['statys']: true } }
                } else {
                    json1 = { ...json1, [id]: { ...json1[id], ['statys']: false } }
                }
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
    let json

    let reply = Send_Request_For_Database({ link: 'subscribers/getSubscriberSubscription', subscriber: `${globalUserId}`, subscription: `${userId}` })
    await reply.then((value) => {
        json = JSON.parse(value)
    })

    if (Object.keys(json).length == 0) {
        let reply = Send_Request_For_Database({ link: 'subscribers/set', subscriber: `${globalUserId}`, subscription: `${userId}` })
        await reply.then((value) => { })

        reply = Send_Request_For_Database({ link: 'users/getId', id: `${userId}` })
        await reply.then((value) => {
            json = JSON.parse(value)
        })

        setSubscriptionsList({ ...subscriptionsList, [el]: { ...subscriptionsList[el], ['statys']: true } })

        setSubscriptions({ ...subscriptions, [json[0]['id']]: { ['id']: json[0]['id'], ['name']: json[0]['name'], ['email']: json[0]['email'] } })
    }
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
                                <div onClick={() => {subscriptionsList[el]['id'] != globalUserId ? setPage(subscriptionsList[el]['id']) : setPage("MyWords")}}> {subscriptionsList[el]['name']} </div>
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