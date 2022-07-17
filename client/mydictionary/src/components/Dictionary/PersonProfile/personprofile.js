import React, { useState } from 'react';
import Send_Request_For_Database from '../../send_request_for_database';
import Feed from '../Feed';
import WordList from './WordList/wordlist';
import TestList from './TestList/testlist';
import TestsFromFriends from './TestsFromFliends/testsfromfriends';
import Subscriptions from './Subscriptions/subscriptions';
import Subscribers from './Subscribers/subscribers';
import './personprofile.css';

async function getUserInformation(globalUserId, userId, setUserName, setUserStatys) {
    let reply = await Send_Request_For_Database({ link: 'subscribers/getUserIdSubscriberSubscription', userId: `${userId}`, subscriber: `${globalUserId}` })
    let json = JSON.parse(reply)

    setUserName(json['name'])
    if (json['subscriber'] > 0) {
        setUserStatys(true)
    }
}

async function subscribe(globalUserId, userId, setUserStatys, subscriptions, setSubscriptions) {
    let reply = await Send_Request_For_Database({ link: 'subscribers/set', subscriber: `${globalUserId}`, subscription: `${userId}` })
    let json = JSON.parse(reply)

    setUserStatys(true)
    setSubscriptions({ ...subscriptions, [json[0]['id']]: { ['id']: json[0]['id'], ['name']: json[0]['name'], ['email']: json[0]['email'] } })
}

async function unsubscribe(globalUserId, userId, setUserStatys, subscriptions, setSubscriptions) {
    let reply = Send_Request_For_Database({ link: 'subscribers/delete', subscriber: `${globalUserId}`, subscription: `${userId}` })
    setUserStatys(false)

    let user = Object.keys(subscriptions).find(el => subscriptions[el]['id'] == userId)
    delete subscriptions[user]

    setSubscriptions({ ...subscriptions })
}

function PersonProfile(props) {
    const userId = props.page
    const globalUserId = props.userId
    const globalUserName = props.userName
    const globalSetPage = props.setPage
    const subscriptions = props.subscriptions
    const setSubscriptions = props.setSubscriptions
    const [userName, setUserName] = useState("")
    const [userStatys, setUserStatys] = useState(false)
    const [page, setPage] = useState("Feed")

    getUserInformation(globalUserId, userId, setUserName, setUserStatys)
    
    return (
        <div>
            <div className='UserInformation'>
                <span> {userName}  </span>
                <span>
                    <p onClick={() => setPage("Feed")}> Feed </p>
                    <p onClick={() => setPage("Words")}> Words </p>
                    <p onClick={() => setPage("Tests")}> Tests </p>
                    <p onClick={() => setPage("TestsForFriends")}> TestsForFriends </p>
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
                                page == "Feed" ?
                                    (
                                        <Feed globalUserId={globalUserId} userId={userId} globalUserName={globalUserName} userName={userName} setPage={globalSetPage} />
                                    ) : (null)
                            }
                            {
                                page == "Words" ?
                                    (
                                        <WordList globalUserId={globalUserId} userId={userId} globalUserName={globalUserName} userName={userName} globalSetPage={globalSetPage} />
                                    ) : (null)
                            }
                            {
                                page == "Tests" ?
                                    (
                                        <TestList globalUserId={globalUserId} userId={userId} globalUserName={globalUserName} userName={userName} globalSetPage={globalSetPage} />
                                    ) : (null)
                            }
                            {
                                page == "TestsForFriends" ?
                                    (
                                        <TestsFromFriends userId={userId} userName={userName} globalUserName={globalUserName} globalSetPage={globalSetPage} />
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