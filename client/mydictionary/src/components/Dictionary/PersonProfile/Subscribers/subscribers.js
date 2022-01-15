import React, { useState } from "react";
import Send_Request_For_Database from "../../../send_request_for_database";
import '../../People/PeopleList/peoplelist.css';

async function getSubscribers(globalUserId, userId, subscriptionsList, setSubscriptionsList) {
    let json

    let reply = Send_Request_For_Database({ link: 'subscribers/getSubscription', subscription: `${userId}` })
    await reply.then((value) => {
        json = JSON.parse(value)
    })

    let json1 = {}

    if (Object.keys(json).length != 0) {
        for (let i = 0; i < Object.keys(json).length; i++) {
            reply = Send_Request_For_Database({ link: 'users/getId', id: `${json[i]['subscriber']}` })
            await reply.then((value) => {
                let json2 = JSON.parse(value)
                json1 = { ...json1, [i]: { ['id']: json2[0]['id'], ['name']: json2[0]['name'], ['email']: json2[0]['email'] } }
            })

            let json3

            reply = Send_Request_For_Database({ link: 'subscribers/getSubscriberSubscription', subscriber: `${globalUserId}`, subscription: `${json1[i]['id']}` })
            await reply.then((value) => {
                json3 = JSON.parse(value)
            })

            if (Object.keys(json3).length != 0) {
                json1 = { ...json1, [i]: { ...json1[i], ['statys']: true } }
            } else {
                if (globalUserId == json1[i]['id']) {
                    json1 = { ...json1, [i]: { ...json1[i], ['statys']: true } }
                } else {
                    json1 = { ...json1, [i]: { ...json1[i], ['statys']: false } }
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
        await reply.then((value) => {})

        reply = Send_Request_For_Database({ link: 'users/getId', id: `${userId}` })
        await reply.then((value) => {
            json = JSON.parse(value)
        })

        setSubscriptionsList({...subscriptionsList, [el]: {...subscriptionsList[el], ['statys']: true}})

        if (JSON.stringify(subscriptions) == undefined) {
            setSubscriptions({ ...subscriptions, ['0']: { ['id']: json[0]['id'], ['name']: json[0]['name'], ['email']: json[0]['email'] } })
        } else {
            setSubscriptions({ ...subscriptions, [subscriptions.length]: { ['id']: json[0]['id'], ['name']: json[0]['name'], ['email']: json[0]['email'] } })
        }
    }
}

function setPage(setPage, userId, globalUserId) {
    if (globalUserId != userId) {
        setPage(userId)
    } else {
        setPage("Words")
    }
}

function Subscribers(props) {
    const globalUserId = props.globalUserId
    const userId = props.userId
    const subscriptions = props.subscriptions
    const setSubscriptions = props.setSubscriptions
    const [subscriptionsList, setSubscriptionsList] = useState({})

    getSubscribers(globalUserId, userId, subscriptionsList, setSubscriptionsList)
    
    return (
        <div className='PeopleList'>
            {
                JSON.stringify(subscriptionsList) !== '{}' ?
                    (
                        Object.keys(subscriptionsList).map(el => (
                            <div key={el}>
                                <div onClick={() => setPage(props.setPage, subscriptionsList[el]['id'], globalUserId)} > {subscriptionsList[el]['name']} </div>
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

export default Subscribers;