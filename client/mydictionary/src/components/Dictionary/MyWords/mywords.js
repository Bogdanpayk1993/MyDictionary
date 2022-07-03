import React, { useState } from 'react';
import AddWord from './AddWord/addword';
import WordList from './WordList/wordlist';
import Send_Request_For_Database from '../../send_request_for_database';

async function getPostList(userId, setPostList) {

    let reply = await Send_Request_For_Database({ link: 'usersposts/getUserWords', userId: `${userId}` })
    let json = JSON.parse(reply)

    let json1 = {}
    Object.entries(json).forEach(([key, value]) => {
        json1[value['id']] = value
    })

    if (JSON.stringify(json1) !== '{}') {
        setPostList({...json1})
    }
}

function MyWords(props) {

    const userId = props.userId
    const userName = props.userName
    const globalSetPage = props.globalSetPage
    const [postList, setPostList] = useState(NaN)

    if (Object.keys(postList).length == 0) {
        getPostList(userId, setPostList)
    }

    return (
        <>
            <AddWord userId={userId} postList={postList} setPostList={setPostList} />
            <WordList userId={userId} userName={userName} postList={postList} setPostList={setPostList} globalSetPage={globalSetPage} />
        </>
    )
}

export default MyWords;