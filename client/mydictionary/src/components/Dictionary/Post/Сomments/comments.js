import React, { useState } from 'react';
import Send_Request_For_Database from '../../../send_request_for_database';
import AddComment from './AddComent/addcomment';
import CommentsList from './CommentsList/commentslist';

async function getComments(postId, setCommentsList) {
    let json

    let reply = Send_Request_For_Database({ link: 'comments/getPostId', postId: postId })
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
    const globalUserId = props.globalUserId
    const userName = props.userName 
    const globalUserName = props.globalUserName
    const postId = props.postId
    const postUserId = props.postUserId
    const globalSetPage = props.globalSetPage
    const [commentsList, setCommentsList] = useState({})

    if (JSON.stringify(commentsList) === '{}') {
        getComments(postId, setCommentsList)
    }

    return (
        <>
            <AddComment userId={userId}  globalUserId={globalUserId} postUserId={postUserId} userName={userName} globalUserName={globalUserName} postId={postId} commentsList={commentsList} setCommentsList={setCommentsList} globalSetPage={globalSetPage} />
            <CommentsList userId={userId} globalUserId={globalUserId} postUserId={postUserId} userName={userName} globalUserName={globalUserName} postId={postId} commentsList={commentsList} setCommentsList={setCommentsList} globalSetPage={globalSetPage} />
        </>
    )
}

export default Comments;