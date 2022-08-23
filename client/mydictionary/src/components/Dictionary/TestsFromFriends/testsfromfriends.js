import React, { useState } from 'react';
import AddTestFromFriend from './AddTestFromFriend/addtestfromfriend';
import Send_Request_For_Database from '../../send_request_for_database';
import TestList from './TestList';
import './testsfromfriends.css';

async function getWordList(userId, setWordList) {

    let reply = await Send_Request_For_Database({ link: 'usersposts/getUserWords', userId: `${userId}`})
    let json = JSON.parse(reply)

    let json1 = {}
    Object.entries(json).forEach(([key, value]) => {
        json1[value['id']] = value
    })

    if (JSON.stringify(json1) !== '{}') {
        setWordList({...json1})
    }
}

async function getTestList(userId, userName, setTestList) {

    let reply = await Send_Request_For_Database({ link: `usersposts/getUserTestsFromFriends`, userId: `${userId}` })
    let json = JSON.parse(reply)

    let json1 = {}
    Object.entries(json).forEach(([key, value]) => {
        json1[value['id']] = value
    })

    for (let i = 0; i < Object.keys(json1).length; i++)
    {
        json1 = {...json1, [Object.keys(json1)[i]]: {...json1[Object.keys(json1)[i]], name: `${userName}`} }
    }

    if (JSON.stringify(json1) !== '{}') {
        setTestList({...json1})
    }
}

function TestsFromFriends(props) {

    const userId = props.userId
    const userName = props.userName
    const globalSetPage = props.globalSetPage
    const subscriptions = props.subscriptions
    const [wordList, setWordList] = useState({})
    const [testList, setTestList] = useState({})
    const [regime, setRegime] = useState("TestList")


    if (Object.keys(wordList).length == 0) {
        getWordList(userId, setWordList) 
        getTestList(userId, userName, setTestList)
    }

    return (
        <div className="TestsFromFriends">
            {
                regime == "SendingTest" ?
                    <AddTestFromFriend userId={userId} userName={userName} wordList={wordList} subscriptions={subscriptions} setRegime={setRegime} />
                    :
                    <>
                        <div className="TestMenu">
                            <button onClick={() => setRegime("SendingTest")}> Send test </button>
                        </div>
                        <TestList userId={userId} userName={userName} globalSetPage={globalSetPage} testList={testList} setTestList={setTestList} />
                    </>
            }            
        </div>
    )
}

export default TestsFromFriends;