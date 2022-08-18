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

async function subscribe(globalUserId, globalUserName, userId, userName, setUserStatys, subscriptions, setSubscriptions) {
    let reply = await Send_Request_For_Database({ link: 'subscribers/set', subscriber: `${globalUserId}`, subscription: `${userId}` })
    let json = JSON.parse(reply)

    setUserStatys(true)
    setSubscriptions({ ...subscriptions, [json[0]['id']]: { ['id']: json[0]['id'], ['name']: json[0]['name'], ['email']: json[0]['email'] } })

    let today = new Date()
    reply = await Send_Request_For_Database({ link: 'notifications/set', userId: `${globalUserId}`, postId: undefined,  action: `${globalUserName} subscribed to ${userName}`, date: `${today}` })
    json = JSON.parse(reply)
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
    const setRecipientOfCorrespondence = props.setRecipientOfCorrespondence
    const [userName, setUserName] = useState("")
    const [userStatys, setUserStatys] = useState(false)
    const [page, setPage] = useState("Feed")

    getUserInformation(globalUserId, userId, setUserName, setUserStatys)

    return (
        <div>
            <div className='UserInformation'>
                <span> {userName}  </span>
                <span>
                    <button onClick={() => setRecipientOfCorrespondence({ 'id': userId, 'name': userName })} > Correspondence </button>
                    {
                        userStatys == false ?
                            <button onClick={() => subscribe(globalUserId, globalUserName, userId, userName, setUserStatys, subscriptions, setSubscriptions)} > Subscribe </button>
                            :
                            <button onClick={() => unsubscribe(globalUserId, userId, setUserStatys, subscriptions, setSubscriptions)}> Unsubscribe </button>
                    }
                </span>
                <span>
                    <p onClick={() => setPage("Feed")}> Feed </p>
                    <p onClick={() => setPage("Words")}> Words </p>
                    <p onClick={() => setPage("Tests")}> Tests </p>
                    <p onClick={() => setPage("TestsForFriends")}> Tests from friends </p>
                    <p onClick={() => setPage("Subscriptions")}> Subscriptions </p>
                    <p onClick={() => setPage("Subscribers")}> Subscribers </p>
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
                                        <TestsFromFriends userId={userId} globalUserId={globalUserId} userName={userName} globalUserName={globalUserName} globalSetPage={globalSetPage} />
                                    ) : (null)
                            }
                            {
                                page == "Subscriptions" ?
                                    (
                                        <Subscriptions globalUserId={globalUserId} globalUserName={globalUserName} userId={userId} setPage={globalSetPage} subscriptions={subscriptions} setSubscriptions={setSubscriptions} setRecipientOfCorrespondence={setRecipientOfCorrespondence} />
                                    ) : (null)
                            }
                            {
                                page == "Subscribers" ?
                                    (
                                        <Subscribers globalUserId={globalUserId} globalUserName={globalUserName} userId={userId} setPage={globalSetPage} subscriptions={subscriptions} setSubscriptions={setSubscriptions} setRecipientOfCorrespondence={setRecipientOfCorrespondence} />
                                    ) : (null)
                            }
                        </>
                    ) : (null)
            }
        </div>
    )
}

export default PersonProfile;