import React, { useRef } from 'react';
import Send_Request_For_Database from '../../../../send_request_for_database';
import './addcomment.css'

function AddComment(props) {

    const newComment = useRef()
    let userId = props.userId
    let postId = props.postId
    let globalUserName = props.globalUserName
    let commentsList = props.commentsList
    let setCommentsList = props.setCommentsList
    let globalSetPage = props.globalSetPage

    async function sendComment() {
        let date = new Date()

        let reply = await Send_Request_For_Database({ link: 'comments/set', postId: postId, userId: userId, comment: newComment.current.value, date: date })
        let json = JSON.parse(reply)

        setCommentsList({...commentsList, [json[0]['id']]: { ['id']: json[0]['id'], ['userId']: userId, ['comment']: newComment.current.value, ['name']: globalUserName, ['date']: `${date}` }})
        
        newComment.current.value = ""
    }
    
    return (
        <div className='AddComment'>
            <div>
                <p onClick={() => globalSetPage("Feed")}> {globalUserName} </p>
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