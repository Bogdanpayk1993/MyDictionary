import React, { useState } from 'react';
import Testing from '../../Testing/testing';
import Send_Request_For_Database from '../../../send_request_for_database';

async function getWordList(postId, setWordList) {
    let reply = await Send_Request_For_Database({ link: 'tasksforfriendswords/getId', postId: `${postId}` })
    let json = JSON.parse(reply)

    let json1 = {}
    Object.entries(json).forEach(([key, value]) => {
        json1[value['id']] = value
    })

    if (JSON.stringify(json1) !== '{}') {
        setWordList({ ...json1 })
    }
}

function TaskFromFriend(props) {

    const globalUserId = props.globalUserId
    const [post, setPost] = useState({ ...props.post })
    const [wordList, setWordList] = useState({})

    if (JSON.stringify(wordList) === '{}' && post['trueAnswerCounter'] == -1 && post['receiverId'] == globalUserId) {
        getWordList(post['tasksforfriendsId'], setWordList)
    }
    
    return (
        post['trueAnswerCounter'] == -1 && post['receiverId'] == globalUserId ?
            <Testing typeTest="TestForFriend" userId={globalUserId} wordList={{ ...wordList }} postList={post} setPostList={setPost} />
            :
            post['trueAnswerCounter'] == -1 ?
                <p> Test without answer </p>
                :
                <div className='Test'>
                    <p> Number of words - {post['wordCounter']} </p>
                    <p> Number of correct answers - {post['trueAnswerCounter']} </p>
                </div>
    )
}

export default TaskFromFriend;
