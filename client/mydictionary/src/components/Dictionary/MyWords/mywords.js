import React, { useState } from 'react';
import AddWord from './AddWord/addword';
import WordList from './WordList/wordlist';
import Send_Request_For_Database from '../../send_request_for_database';

async function getWordList(userId, setWordList) {

    let json
    let wordList = {}

    let reply = Send_Request_For_Database({ link: 'userswords/getUserId', userId: `${userId}` })
    await reply.then((value) => {
        json = JSON.parse(value)
    })

    if (Object.keys(json).length != 0) {
        for (let i = 0; i < Object.keys(json).length; i++) {
            let json1
            let reply = Send_Request_For_Database({ link: 'words/getId', id: `${json[i]['wordId']}` })
            await reply.then((value) => {
                json1 = JSON.parse(value)
                wordList = {...wordList, [json[i]['id']]: {id: json[i]['id'], english: json1[0]['english'], ukrainian: json1[0]['ukrainian']}}
            })
        }
        setWordList(wordList)
    }
}

function MyWords(props) {

    const userName = props.userName
    const [wordList, setWordList] = useState(NaN)

    if (Object.keys(wordList).length == 0) {
        getWordList(props.userId, setWordList)
    }

    return (
        <>
            <AddWord userId={props.userId} wordList={wordList} setWordList={setWordList} />
            <WordList userName={userName} wordList={wordList} setWordList={setWordList} />
        </>
    )
}

export default MyWords;