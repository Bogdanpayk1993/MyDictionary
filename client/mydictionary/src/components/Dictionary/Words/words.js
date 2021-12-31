import React, { useState } from 'react';
import Work_With_Database from '../../work_with_database';
import './words.css';
import '../MyWords/WordList/wordlist.css';

async function getData(globalUserId, userId, setWordList, setUserName, setUserStatys) {

    let json
    let user_Id = userId
    let wordList = {}

    let reply = Work_With_Database({ require: `SELECT * FROM users WHERE id='${user_Id}'` })
    await reply.then((value) => {
        json = JSON.parse(value)
        setUserName(json[0]['name'])
    })

    reply = Work_With_Database({ require: `SELECT * FROM userswords WHERE userId='${user_Id}'` })
    await reply.then((value) => {
        json = JSON.parse(value)
    })

    if (Object.keys(json).length != 0) {
        for (let i = 0; i < Object.keys(json).length; i++) {
            let json1
            let word_Id = json[i]['wordId']
            let reply = Work_With_Database({ require: `SELECT * FROM words WHERE id='${word_Id}'` })
            await reply.then((value) => {
                json1 = JSON.parse(value)
                wordList = { ...wordList, [json[i]['id']]: { english: json1[0]['english'], ukrainian: json1[0]['ukrainian'] } }
            })
        }
        setWordList(wordList)
    }

    reply = Work_With_Database({ require: `SELECT * FROM subscribers WHERE subscriber='${globalUserId}' and subscription='${userId}'` })
    await reply.then((value) => {
        json = JSON.parse(value)
    })

    if (Object.keys(json).length != 0) {
        setUserStatys(true)
    }
}

async function signUp(globalUserId, userId, setUserStatys) {
    let json

    let reply = Work_With_Database({ require: `SELECT * FROM subscribers WHERE subscriber='${globalUserId}' and subscription='${userId}'` })
    await reply.then((value) => {
        json = JSON.parse(value)
    })

    if (Object.keys(json).length == 0) {
        let reply = Work_With_Database({ require: `INSERT INTO subscribers (subscriber, subscription) VALUES ('${globalUserId}','${userId}')` })
    }

    setUserStatys(true)
}

function Words(props) {
    const globalUserId = props.userId
    const userId = props.page
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
                            <button onClick={() => signUp(globalUserId, userId, setUserStatys)} > Sign up </button>
                            : null
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