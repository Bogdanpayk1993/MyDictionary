import React, { useState } from 'react';
import Send_Request_For_Database from '../../../send_request_for_database';
import './likes.css';

async function getLike(setLikes, setLikeStatus, globaluserId, postId) {
    let json

    let reply = Send_Request_For_Database({ link: 'likes/getPostId', postId: `${postId}` })
    await reply.then((value) => {
        json = JSON.parse(value)
    })

    if (Object.keys(json).length != 0) {
        let index = Object.keys(json).find(el => json[el]['userId'] == globaluserId)
        if (index != undefined) {
            setLikeStatus(true)
        }
    }

    setLikes(json)
}

async function addLike(likes, setLikes, setLikeStatus, globalUserName, userId, postId) {
    let reply = await Send_Request_For_Database({ link: 'likes/set', userId: `${userId}`, postId: `${postId}` })

    setLikeStatus(true)

    setLikes({ ...likes, [Object.keys(likes).length]: globalUserName })
}

function Likes(props) {

    let userId = props.userId
    let globalUserId = props.globalUserId
    let globalUserName = props.globalUserName
    let postId = props.post['id']
    let postUserId = props.post['userId']
    let globalSetPage = props.globalSetPage
    const [likes, setLikes] = useState({})
    const [likeStatus, setLikeStatus] = useState(false)
    const [watchingLikes, setWatchingLikes] = useState(false)

    if (JSON.stringify(likes) === '{}') {
        getLike(setLikes, setLikeStatus, globalUserId, postId)
    }

    return (
        <div className='Likes'>
            <div>
                <p onMouseEnter={() => setWatchingLikes(true)}> Likes: {Object.keys(likes).length} </p>
                {
                    watchingLikes == true && Object.keys(likes).length != 0 ?
                        <div className='LikesList' onMouseLeave={() => setWatchingLikes(false)} >
                            <div>
                                {
                                    Object.keys(likes).map(el => (
                                        <p onClick={() => { likes[el]['name'] != globalUserName ? globalSetPage(likes[el]['userId']) : globalSetPage('Feed') }} key={el}> {likes[el]['name']} </p>
                                    ))
                                }
                            </div>
                        </div> : null
                }
            </div>
            <div>
                {
                    likeStatus == false && globalUserId != postUserId ?
                        <button onClick={() => addLike(likes, setLikes, setLikeStatus, globalUserName, userId, postId)}> Likes </button>
                        :
                        null
                }
            </div>
        </div>
    )
}

export default Likes;