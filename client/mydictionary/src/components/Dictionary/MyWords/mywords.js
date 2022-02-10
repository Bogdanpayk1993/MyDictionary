import React, { useState } from 'react';
import AddWord from './AddWord/addword';
import WordList from './WordList/wordlist';
import Send_Request_For_Database from '../../send_request_for_database';

async function getWordList(userId, setWordList) {

    let reply = await Send_Request_For_Database({ link: 'userswords/getUserWords', userId: `${userId}` })
    let json = JSON.parse(reply)

    let json1 = {}
    Object.entries(json).forEach(([key, value]) => {
        json1[value['id']] = value
    })

    setWordList({...json1})
}

function MyWords(props) {

    const userId = props.userId
    const userName = props.userName
    const globalSetPage = props.globalSetPage
    const [wordList, setWordList] = useState(NaN)

    if (Object.keys(wordList).length == 0) {
        getWordList(props.userId, setWordList)
    }

    return (
        <>
            <AddWord userId={userId} wordList={wordList} setWordList={setWordList} />
            <WordList userId={userId} userName={userName} wordList={wordList} setWordList={setWordList} globalSetPage={globalSetPage} />
        </>
    )
}

export default MyWords;