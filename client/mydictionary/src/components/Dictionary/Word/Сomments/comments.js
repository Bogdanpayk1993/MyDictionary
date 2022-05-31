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
    Object.entries(json).forEach(([key, value]) => {
        json1[value['id']]= value
    })

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
            <CommentsList userId={userId} wordUserId={wordUserId} globalUserName={globalUserName} commentsList={commentsList} setCommentsList={setCommentsList} globalSetPage={globalSetPage} />
        </>
    )
}

export default Comments;