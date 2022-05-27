import React, { useState } from 'react';
import Word from '../Word/word';
import Send_Request_For_Database from '../../send_request_for_database';
import './feed.css';

async function getWordList(userId, userName, setWordList) {
    let reply = await Send_Request_For_Database({ link: 'userswords/getUsersWords', userId: `${userId}` })
    let json = JSON.parse(reply)

    let json1 = {}

    Object.entries(json).forEach(([key, value]) => {
        if (value['name'] == undefined) {
            value['name'] = userName
        }
        json1[value['id']] = value
    })

    if (JSON.stringify(json1) !== '{}') {
        setWordList({ ...json1 })
    }
}

function Feed(props) {

    const userId = props.userId
    const userName = props.userName
    const setPage = props.setPage
    const [wordList, setWordList] = useState(NaN)

    if (Object.keys(wordList).length == 0) {
        getWordList(userId, userName, setWordList)
    }

    return (
        <div className='feed'>
            <div className='WordList'>
                {
                    Object.keys(wordList).length != 0 ?
                        (
                            Object.keys(wordList).map(el => (
                                <Word userId={wordList[el]['userId']} userName={wordList[el]['name']} globalUserName={userName} word={{ id: wordList[el]['id'], english: wordList[el]['english'], ukrainian: wordList[el]['ukrainian'] }} globalSetPage={setPage} key={wordList[el]['id']} />
                            ))
                        ) :
                        (
                            <p> You don't have word </p>
                        )
                }
            </div>
        </div>
    )
}

export default Feed;
