import React, { useState } from 'react';
import Send_Request_For_Database from '../../../send_request_for_database';
import AddComment from './AddComent/addcomment';
import CommentsList from './CommentsList/commentslist';

async function getComments(wordId, setCommentsList) {
    let json

    let reply = Send_Request_For_Database({ link: 'comments/getWordId', wordId: wordId })
    await reply.then((value) => {
        json = JSON.parse(value)
    })

    let json1 = {}

    for (let i = 0; i < Object.keys(json).length; i++) {
        let json2

        reply = Send_Request_For_Database({ link: 'users/getId', id: json[i]['userId'] })
        await reply.then((value) => {
            json2 = JSON.parse(value)
        })

        json1 = { ...json1, [json[i]['id']]: { ...json[i], ['name']: json2[0]['name'] } }
    }

    if (JSON.stringify(json1) !== '{}') {
        setCommentsList(json1)
    }
}

function Comments(props) {

    const userId = props.userId
    const globalUserName = props.globalUserName
    const wordId = props.wordId
    const wordUserId = props.wordUserId
    const globalSetPage = props.globalSetPage
    const [commentsList, setCommentsList] = useState({})

    if (JSON.stringify(commentsList) === '{}') {
        getComments(wordId, setCommentsList)
    }

    return (
        <>
            <AddComment userId={userId} wordId={wordId} globalUserName={globalUserName} commentsList={commentsList} setCommentsList={setCommentsList} globalSetPage={globalSetPage} />
            <CommentsList userId={userId} wordUserId={wordUserId} commentsList={commentsList} setCommentsList={setCommentsList} globalSetPage={globalSetPage} />
        </>
    )
}

export default Comments;