import React from 'react';
import './delete.css';

function Delete(props) {

    let deleteCommentId = props.deleteCommentId
    let userId = props.userId
    let globalUserId = props.globalUserId
    let postId = props.postId 
    let userName = props.userName
    let globalUserName = props.globalUserName
    let commentsList = props.commentsList
    let deleteComment = props.deleteComment
    let setCommentsList = props.setCommentsList
    let setDelete = props.setDelete

    return (
        <div className='Delete'>
            <div>
                <p> Do you want delete next comment? </p>
                <div>
                    <p> {commentsList[deleteCommentId]['comment']} </p>
                </div>
                <button onClick={() => deleteComment(deleteCommentId, userId, globalUserId, userName, globalUserName, postId, commentsList[deleteCommentId]['comment'], commentsList, setCommentsList, setDelete)}> Yes </button>
                <button onClick={() => setDelete(NaN)}> No </button>
            </div>
        </div>
    )

}

export default Delete;