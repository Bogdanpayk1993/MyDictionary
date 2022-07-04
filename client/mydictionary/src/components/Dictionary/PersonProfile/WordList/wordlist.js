import React, { useState } from 'react';
import Send_Request_For_Database from '../../../send_request_for_database';
import Post from '../../Post/post';

async function getWordList(userId, wordList, setWordList) {
    let wordList1 = {}

    let reply = await Send_Request_For_Database({ link: 'usersposts/getUserWords', userId: `${userId}` })
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
    const userId = props.userId
    const globalUserName = props.globalUserName
    const userName = props.userName
    const globalSetPage = props.globalSetPage
    const [wordList, setWordList] = useState({})

    getWordList(userId, wordList, setWordList)

    return (
        <>
            <div className='postList'>
                {
                    Object.keys(wordList).length != 0 ?
                        (
                            Object.keys(wordList).reverse().map(el => (
                                <Post userId={userId} globalUserId={globalUserId} userName={userName} globalUserName={globalUserName} post={wordList[el]} postList={wordList} globalSetPage={globalSetPage} key={wordList[el]['id']} />
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