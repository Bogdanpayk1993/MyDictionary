import React, { useState } from 'react';
import Send_Request_For_Database from '../../send_request_for_database';
import './words.css';
import '../MyWords/WordList/wordlist.css';

async function getData(globalUserId, userId, setWordList, setUserName, setUserStatys) {
    let json
    let wordList = {}

    let reply = Send_Request_For_Database({ link: 'users/getId', id: `${userId}` })
    await reply.then((value) => {
        json = JSON.parse(value)
        setUserName(json[0]['name'])
    })

    reply = Send_Request_For_Database({ link: 'userswords/getUserId', userId: `${userId}` })
    await reply.then((value) => {
        json = JSON.parse(value)
    })

    if (Object.keys(json).length != 0) {
        for (let i = 0; i < Object.keys(json).length; i++) {
            let json1
            let word_Id = json[i]['wordId']
            let reply = Send_Request_For_Database({ link: 'words/getId', id: `${word_Id}` })
            await reply.then((value) => {
                json1 = JSON.parse(value)
                wordList = { ...wordList, [json[i]['id']]: { english: json1[0]['english'], ukrainian: json1[0]['ukrainian'] } }
            })
        }
        setWordList(wordList)
    }

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

        if (JSON.stringify(subscriptions) == undefined) {
            setSubscriptions({ ...subscriptions, ['0']: { ['id']: json[0]['id'], ['name']: json[0]['name'], ['email']: json[0]['email'] } })
        } else {
            setSubscriptions({ ...subscriptions, [subscriptions.length]: { ['id']: json[0]['id'], ['name']: json[0]['name'], ['email']: json[0]['email'] } })
        }
    }
}

async function unsubscribe(globalUserId, userId, setUserStatys, subscriptions, setSubscriptions) {
    let reply = Send_Request_For_Database({ link: 'subscribers/delete', subscriber: `${globalUserId}`, subscription: `${userId}` }) 
    setUserStatys(false)

    let user = Object.keys(subscriptions).find(el => subscriptions[el]['id'] == userId)
    delete subscriptions[user]

    setSubscriptions({...subscriptions})
}

function Words(props) {
    const globalUserId = props.userId
    const userId = props.page
    const subscriptions = props.subscriptions
    const setSubscriptions = props.setSubscriptions
    const [userName, setUserName] = useState("")
    const [wordList, setWordList] = useState(NaN)
    const [userStatys, setUserStatys] = useState(false)

    if (userName == "") {
        getData(globalUserId, userId, setWordList, setUserName, setUserStatys)
    }

    return (
        <div>
            <div className='UserInformation'>
                <span> {userName}  </span>
                <span>
                    {
                        userStatys == false ?
                            <button onClick={() => subscribe(globalUserId, userId, setUserStatys, subscriptions, setSubscriptions)} > Subscribe </button>
                            :
                            <button onClick={() => unsubscribe(globalUserId, userId, setUserStatys, subscriptions, setSubscriptions)}> Unsubscribe </button>
                    }
                </span>
            </div>
            <div className='WordList'>
                {
                    Object.keys(wordList).length != 0 ?
                        (
                            Object.keys(wordList).map(el => (
                                <div key={el}>
                                    <div> {wordList[el]['english']} </div> - <div> {wordList[el]['ukrainian']} </div>
                                </div>
                            ))
                        ) :
                        (
                            <p> Person don't have words </p>
                        )
                }
            </div>
        </div>
    )
}

export default Words;