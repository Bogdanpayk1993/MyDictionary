import React, { useState } from 'react';
import Delete from './Delete/delete';
import Send_Request_For_Database from '../../../../send_request_for_database';
import './commentslist.css';

function deleteComment(id, commentsList, setCommentsList, setDelete) {
    let leply = Send_Request_For_Database({ link: 'comments/delete', id: `${id}` })
    delete commentsList[id]
    setCommentsList({ ...commentsList })
    setDelete(NaN)
}

function CommentsList(props) {

    const userId = props.userId
    const wordUserId = props.wordUserId
    const globalUserName = props.globalUserName
    const commentsList = props.commentsList
    const setCommentsList = props.setCommentsList
    const globalSetPage = props.globalSetPage
    const [deleteCommentId, setDelete] = useState(NaN)
    const [counterComments, setCounterComments] = useState(3)

    return (
        JSON.stringify(commentsList) !== '{}' ?
            (
                <div>
                    <div className='CommentsList'>
                        {
                            !isNaN(deleteCommentId) ?
                                (
                                    <Delete deleteCommentId={deleteCommentId} deleteComment={deleteComment} commentsList={commentsList} setCommentsList={setCommentsList} setDelete={setDelete} />
                                ) :
                                (null)
                        }
                        <hr />
                        {
                            Object.keys(commentsList).map((el, index) =>
                                index < counterComments ?
                                    <div className='Comment' key={el}>
                                        <div>
                                            <div>
                                                <p onClick={() => { commentsList[el]['name'] != globalUserName ? globalSetPage(commentsList[el]['userId']) : globalSetPage('Feed') }}> {commentsList[el]['name']} </p>
                                            </div>
                                            <div>
                                                {
                                                    commentsList[el]['userId'] == userId || wordUserId == userId ?
                                                        <button onClick={() => setDelete(commentsList[el]['id'])} > Delete </button>
                                                        :
                                                        null
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            <p> {commentsList[el]['comment']} </p>
                                        </div>
                                    </div> : (null))
                        }
                        {
                            Object.keys(commentsList).length > counterComments ?
                                <div className='MoreComments'>
                                    <button onClick={() => setCounterComments(Object.keys(commentsList).length)}> More comments </button>
                                </div> : (null)
                        }
                    </div>
                </div>
            ) : null
    )
}

export default CommentsList;