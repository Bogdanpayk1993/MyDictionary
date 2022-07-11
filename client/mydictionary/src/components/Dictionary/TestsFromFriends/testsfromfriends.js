import React, { useState } from 'react';
import AddTestFromFriend from './AddTestFromFriend/addtestfromfriend';
import Send_Request_For_Database from '../../send_request_for_database';
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

function TestsFromFriends(props) {

    const userId = props.userId
    const userName = props.userName
    const globalSetPage = props.globalSetPage
    const subscriptions = props.subscriptions
    const [wordList, setWordList] = useState(NaN)
    const [testList, setTestList] = useState(NaN)
    const [regime, setRegime] = useState("TestList")


    if (Object.keys(wordList).length == 0) {
        getWordList(userId, setWordList) 
    }

    return (
        <div className="TestsFromFriends">
            {
                regime == "SendingTest" ?
                    <AddTestFromFriend userId={userId} wordList={wordList} subscriptions={subscriptions} setRegime={setRegime} />
                    :
                    <>
                        <div className="TestMenu">
                            <button onClick={() => setRegime("SendingTest")}> Send test </button>
                        </div>
                        <p> Test list </p>
                    </>
            }            
        </div>
    )
}

export default TestsFromFriends;