import React, { useState } from 'react';
import Delete from './Delete/delete';
import Send_Request_For_Database from '../../../../send_request_for_database';
import './commentslist.css';

function deleteComment(id, commentsList, setCommentsList, setDelete) {
    let leply = Send_Request_For_Database({ link: 'comments/delete', id: `${id}` })
    delete commentsList[id]
    setCommentsList({...commentsList})
    setDelete(NaN)
}

function CommentsList(props) {

    const userId = props.userId
    const wordUserId = props.wordUserId
    const commentsList = props.commentsList
    const setCommentsList = props.setCommentsList
    const [deleteCommentId, setDelete] = useState(NaN)

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
                            Object.keys(commentsList).map((el) =>
                                <div className='Comment' key={el}>
                                    <div>
                                        <div>
                                            <p> {commentsList[el]['name']} </p>
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
                                </div>)
                        }
                    </div>
                </div>
            ) : null
    )
}

export default CommentsList;