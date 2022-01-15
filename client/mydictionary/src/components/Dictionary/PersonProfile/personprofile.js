import React, { useState } from 'react';
import Send_Request_For_Database from '../../send_request_for_database';
import WordList from './WordList/wordlist';
import Subscriptions from './Subscriptions/subscriptions';
import Subscribers from './Subscribers/subscribers';
import './personprofile.css';

async function getUserInformation(globalUserId, userId, setUserName, setUserStatys) {
    let json

    let reply = Send_Request_For_Database({ link: 'users/getId', id: `${userId}` })
    await reply.then((value) => {
        json = JSON.parse(value)
        setUserName(json[0]['name'])
    })

    reply = Send_Request_For_Database({ link: 'subscribers/getSubscriberSubscription', subscriber: `${globalUserId}`, subscription: `${userId}` })
    await reply.then((value) => {
        json = JSON.parse(value)
    })

    if (Object.keys(json).length != 0) {
        setUserStatys(true)
    }
}

async function subscribe(globalUserId, userId, setUserStatys, subscriptions, setSubscriptions) {
    let json

    let reply = Send_Request_For_Database({ link: 'subscribers/getSubscriberSubscription', subscriber: `${globalUserId}`, subscription: `${userId}` })
    await reply.then((value) => {
        json = JSON.parse(value)
    })

    if (Object.keys(json).length == 0) {
        reply = Send_Request_For_Database({ link: 'subscribers/set', subscriber: `${globalUserId}`, subscription: `${userId}` })

        reply = Send_Request_For_Database({ link: 'users/getId', id: `${userId}` })
        await reply.then((value) => {
            json = JSON.parse(value)
        })

        setUserStatys(true)

        setSubscriptions({ ...subscriptions, [json[0]['id']]: { ['id']: json[0]['id'], ['name']: json[0]['name'], ['email']: json[0]['email'] } })
    }
}

async function unsubscribe(globalUserId, userId, setUserStatys, subscriptions, setSubscriptions) {
    let reply = Send_Request_For_Database({ link: 'subscribers/delete', subscriber: `${globalUserId}`, subscription: `${userId}` })
    setUserStatys(false)

    let user = Object.keys(subscriptions).find(el => subscriptions[el]['id'] == userId)
    delete subscriptions[user]

    setSubscriptions({ ...subscriptions })
}

function PersonProfile(props) {
    const globalUserId = props.userId
    const userId = props.page
    const subscriptions = props.subscriptions
    const setSubscriptions = props.setSubscriptions
    const globalSetPage = props.setPage
    const [userName, setUserName] = useState("")
    const [userStatys, setUserStatys] = useState(false)
    const [page, setPage] = useState("Words")

    getUserInformation(globalUserId, userId, setUserName, setUserStatys)

    return (
        <div>
            <div className='UserInformation'>
                <span> {userName}  </span>
                <span>
                    <p onClick={() => setPage("Words")} > Words </p>
                    <p onClick={() => setPage("Subscriptions")}> Subscriptions </p>
                    <p onClick={() => setPage("Subscribers")}> Subscribers </p>
                </span>
                <span>
                    {
                        userStatys == false ?
                            <button onClick={() => subscribe(globalUserId, userId, setUserStatys, subscriptions, setSubscriptions)} > Subscribe </button>
                            :
                            <button onClick={() => unsubscribe(globalUserId, userId, setUserStatys, subscriptions, setSubscriptions)}> Unsubscribe </button>
                    }
                </span>
            </div>
            {
                userName != "" ?
                    (
                        <>
                            {
                                page == "Words" ?
                                    (
                                        <WordList userId={userId} />
                                    ) : (null)
                            }
                            {
                                page == "Subscriptions" ?
                                    (
                                        <Subscriptions globalUserId={globalUserId} userId={userId} setPage={globalSetPage} subscriptions={subscriptions} setSubscriptions={setSubscriptions} />
                                    ) : (null)
                            }
                            {
                                page == "Subscribers" ?
                                    (
                                        <Subscribers globalUserId={globalUserId} userId={userId} setPage={globalSetPage} subscriptions={subscriptions} setSubscriptions={setSubscriptions} />
                                    ) : (null)
                            }
                        </>
                    ) : (null)
            }
        </div>
    )
}

export default PersonProfile;