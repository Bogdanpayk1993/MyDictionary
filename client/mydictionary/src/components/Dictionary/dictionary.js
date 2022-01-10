import React, { useState } from 'react';
import Menu from './Menu/menu';
import MyWords from './MyWords/mywords';
import People from './People/people';
import Words from './Words';
import Subscriptions from './Subscriptions/subscriptions';
import Subscribers from './Subscribers/subscribers';
import Send_Request_For_Database from '../send_request_for_database';
import './dictionary.css';

async function getSubscriptions(userId, setSubscriptions) {
    let json

    let reply = Send_Request_For_Database({ link: 'subscribers/getSubscriber', subscriber: `${userId}`})
    await reply.then((value) => {
        json = JSON.parse(value)
    })

    let json1

    if (Object.keys(json).length != 0) {
        for (let i = 0; i < Object.keys(json).length; i++) {
            reply = Send_Request_For_Database({ link: 'users/getId', id: `${json[i]['subscription']}` })
            await reply.then((value) => {
                json1 = JSON.parse(value)
            })
        }
    }

    setSubscriptions(json1)
}

async function getSubscribers(userId, setSubscribers) {
    let json

    let reply = Send_Request_For_Database({ link: `subscribers/getSubscription`, subscription: `${userId}` })
    await reply.then((value) => {
        json = JSON.parse(value)
    })

    let json1

    if (Object.keys(json).length != 0) {
        for (let i = 0; i < Object.keys(json).length; i++) {
            reply = Send_Request_For_Database({ link: 'users/getId', id: `${json[i]['subscriber']}` })
            await reply.then((value) => {
                json1 = JSON.parse(value)
            })
        }
    }

    setSubscribers(json1)
}

function Dictionary() {
    const [userId, setUserId] = useState(NaN)
    const [page, setPage] = useState("Words")
    const [subscriptions, setSubscriptions] = useState({})
    const [subscribers, setSubscribers] = useState({})
     
    if (!isNaN(userId) && JSON.stringify(subscriptions) === '{}') {
        getSubscriptions(userId, setSubscriptions)
    }

    if (!isNaN(userId) && JSON.stringify(subscribers) === '{}') {
        getSubscribers(userId, setSubscribers) 
    } 

    return (
        <>
            <Menu userId={userId} setUserId={setUserId} setPage={setPage} />
            {
                !isNaN(userId) ?
                    (
                        <div className='Dictionary'>
                            <div>
                                <Subscriptions subscriptions={subscriptions} setPage={setPage} />
                                <Subscribers subscribers={subscribers} setPage={setPage} />
                            </div>
                            <div>
                                {
                                    page == "Words" ?
                                        (
                                            <MyWords userId={userId} />
                                        ) : (null)
                                }
                                {
                                    page == "People" ?
                                        (
                                            <People userId={userId} setPage={setPage} subscriptions={subscriptions} setSubscriptions={setSubscriptions} />
                                        ) : (null)
                                }
                                {
                                    !isNaN(page) ?
                                        (
                                            <Words userId={userId} page={page} subscriptions={subscriptions} setSubscriptions={setSubscriptions} />
                                        ) : (null)
                                }
                            </div>
                            <div>

                            </div>
                        </div>
                    ) : (null)
            }
        </>
    )
}

export default Dictionary;