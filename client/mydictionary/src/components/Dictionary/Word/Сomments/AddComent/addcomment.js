import React, { useRef } from 'react';
import Send_Request_For_Database from '../../../../send_request_for_database';
import './addcomment.css'

function AddComment(props) {

    const newComment = useRef()
    let userId = props.userId
    let wordId = props.wordId
    let userName = props.userName
    let commentsList = props.commentsList
    let setCommentsList = props.setCommentsList

    async function sendComment() {
        let reply = Send_Request_For_Database({ link: 'comments/set', wordId: wordId, userId: userId, comment: newComment.current.value })
        await reply.then((value) => { })

        setCommentsList({...commentsList, [commentsList.lenght]: { ['comment']: newComment.current.value, ['name']: userName }})
        
        newComment.current.value = ""
    }
    
    return (
        <div className='AddComment'>
            <div>
                <p> {userName} </p>
                <div>
                    <textarea placeholder='Your comment:' ref={newComment} />
                    <div>
                        <button onClick={() => sendComment()} > Send </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddComment;