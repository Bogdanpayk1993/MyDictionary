import React, { useState } from 'react';
import Send_Request_For_Database from '../../../send_request_for_database';
import Word from '../../Word/word';

async function getWordLis(userId, wordList, setWordList) {
    let json
    let wordList1 = {}

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
                wordList1 = { ...wordList1, [json[i]['id']]: { english: json1[0]['english'], ukrainian: json1[0]['ukrainian'] } }
            })
        }

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
}

function WordList(props) {

    const globalUserId = props.globalUserId
    const globalUserName = props.globalUserName
    const userName = props.userName
    const userId = props.userId
    const [wordList, setWordList] = useState({})

    getWordLis(userId, wordList, setWordList)

    return (
        <>
            <div className='WordList'>
                {
                    Object.keys(wordList).length != 0 ?
                        (
                            Object.keys(wordList).map(el => (
                                <Word userId={globalUserId} userName={userName} globalUserName={globalUserName} word={wordList[el]} key={wordList[el]['id']} />
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