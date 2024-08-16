import React, { useState } from 'react';
import Menu from './Menu/menu';
import Feed from './Feed';
import MyWords from './MyWords/mywords';
import MyTests from './MyTests/mytest';
import TestsFromFriends from './TestsFromFriends/testsfromfriends';
import People from './People/people';
import PersonProfile from './PersonProfile';
import Subscriptions from './Subscriptions/subscriptions';
import Subscribers from './Subscribers/subscribers';
import Messages from './Messages/messages';
import Send_Request_For_Database from '../send_request_for_database';
import './dictionary.css';

async function getSubscriptions(userId, setSubscriptions) {
    let reply = await Send_Request_For_Database({ link: 'subscribers/getSubscribers', subscriber: `${userId}` })
    let json = JSON.parse(reply)

    let json1 = {}
    Object.entries(json).forEach(([key, value]) => {
        json1[value['id']] = value
    })

    if (JSON.stringify(json1) !== '{}') {
        setSubscriptions({ ...json1 })
    }
}

async function getSubscribers(userId, setSubscribers) {
    let reply = await Send_Request_For_Database({ link: `subscribers/getSubscription`, subscription: `${userId}` })
    let json = JSON.parse(reply)

    let json1 = {}
    Object.entries(json).forEach(([key, value]) => {
        json1[value['id']] = value
    })

    if (JSON.stringify(json1) !== '{}') {
        setSubscribers({ ...json1 })
    }
}

function Dictionary() {
    const [userId, setUserId] = useState(NaN)
    const [userName, setUserName] = useState("")
    const [page, setPage] = useState("Feed")
    const [subscriptions, setSubscriptions] = useState({})
    const [subscribers, setSubscribers] = useState({})
    const [recipientOfCorrespondence, setRecipientOfCorrespondence] = useState({})

    if (!isNaN(userId) && JSON.stringify(subscriptions) === '{}') {
        getSubscriptions(userId, setSubscriptions)
    }

    if (!isNaN(userId) && JSON.stringify(subscribers) === '{}') {
        getSubscribers(userId, setSubscribers)
    }

    return (
        <>
            <Menu userId={userId} setUserId={setUserId} setUserName={setUserName} setPage={setPage} />
            {
                !isNaN(userId) ?
                    (
                        <div className='Dictionary'>
                            <div>
                                <Subscriptions subscriptions={subscriptions} setPage={setPage} setRecipientOfCorrespondence={setRecipientOfCorrespondence} />
                                <Subscribers subscribers={subscribers} setPage={setPage} setRecipientOfCorrespondence={setRecipientOfCorrespondence} />
                            </div>
                            <div>
                                {
                                    page == "Feed" ?
                                        (
                                            <div className='MyFeed'>
                                                <Feed globalUserId={userId} userId={userId} globalUserName={userName} userName={userName} setPage={setPage} />
                                            </div>
                                        ) : (null)
                                }
                                {
                                    page == "MyWords" ?
                                        (
                                            <MyWords userId={userId} userName={userName} globalSetPage={setPage} />
                                        ) : (null)
                                }
                                {
                                    page == "MyTests" ?
                                        (
                                            <MyTests userId={userId} userName={userName} globalSetPage={setPage} />
                                        ) : (null)
                                }
                                {
                                    page == "TestsFromFriends" ?
                                        (
                                            <TestsFromFriends userId={userId} userName={userName} globalUserName={userName} subscriptions={subscriptions} globalSetPage={setPage} />
                                        ) : (null)
                                }
                                {
                                    page == "People" ?
                                        (
                                            <People userId={userId} userName={userName} setPage={setPage} subscriptions={subscriptions} setSubscriptions={setSubscriptions} setRecipientOfCorrespondence={setRecipientOfCorrespondence} />
                                        ) : (null)
                                }
                                {
                                    !isNaN(page) ?
                                        (
                                            <PersonProfile userId={userId} userName={userName} page={page} setPage={setPage} subscriptions={subscriptions} setSubscriptions={setSubscriptions} setRecipientOfCorrespondence={setRecipientOfCorrespondence} />
                                        ) : (null)
                                }
                                {
                                    typeof page === 'object' ?
                                        (
                                            null
                                        ) : (null)
                                }
                            </div>
                            <div>
                                <Messages userId={userId} userName={userName} setPage={setPage} recipientOfCorrespondence={recipientOfCorrespondence} setRecipientOfCorrespondence={setRecipientOfCorrespondence} />
                            </div>
                        </div>
                    ) : (null)
            }
        </>
    )
}

export default Dictionary;