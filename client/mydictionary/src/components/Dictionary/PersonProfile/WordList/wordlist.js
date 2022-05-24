import React, { useState } from 'react';
import Send_Request_For_Database from '../../../send_request_for_database';
import Word from '../../Word/word';

async function getWordLis(userId, wordList, setWordList) {
    let wordList1 = {}

    let reply = await Send_Request_For_Database({ link: 'userswords/getUserWords', userId: `${userId}` })
    let json = JSON.parse(reply)
    
    let json1 = {}
    Object.entries(json).forEach(([key, value]) => {
        json1[value['id']] = value
    })

    wordList1 = {...json1}

    if (JSON.stringify(wordList) == '{}') {
        if (JSON.stringify(wordList1) !== '{}') {
            setWordList(wordList1)
        }
    } else {
        if (JSON.stringify(wordList) != JSON.stringify(wordList1)) {
            setWordList(wordList1)
        }
    }
}

function WordList(props) {

    const globalUserId = props.globalUserId
    const globalUserName = props.globalUserName
    const userId = props.userId
    const userName = props.userName
    const globalSetPage = props.globalSetPage
    const [wordList, setWordList] = useState({})

    getWordLis(userId, wordList, setWordList)

    return (
        <>
            <div className='WordList'>
                {
                    Object.keys(wordList).length != 0 ?
                        (
                            Object.keys(wordList).map(el => (
                                <Word userId={globalUserId} userName={userName} globalUserName={globalUserName} word={{ ...wordList[el], id: el }} globalSetPage={globalSetPage} key={wordList[el]['id']} />
                            ))
                        ) :
                        (
                            <p> Person don't have words </p>
                        )
                }
            </div>
        </>
    )
}

export default WordList;