import React, { useState } from 'react';
import Send_Request_For_Database from '../../../send_request_for_database';
import './likes.css';

async function getLike(setLikes, setLikeStatus, userId, wordId) {
    let json

    let reply = Send_Request_For_Database({ link: 'likes/getWordId', wordId: `${wordId}` })
    await reply.then((value) => {
        json = JSON.parse(value)
    })

    if (Object.keys(json).length != 0) {
        let index = Object.keys(json).find(el => json[el]['userId'] == userId)
        if (index != undefined) {
            setLikeStatus(true)
        }
    }

    setLikes(json)
}

async function addLike(likes, setLikes, setLikeStatus, globalUserName, userId, wordId) {
    let reply = await Send_Request_For_Database({ link: 'likes/set', userId: `${userId}`, wordId: `${wordId}` })

    setLikeStatus(true)

    setLikes({ ...likes, [Object.keys(likes).length]: globalUserName })
}

function Likes(props) {

    let userId = props.userId
    let globalUserName = props.globalUserName
    let wordId = props.wordId
    let globalSetPage = props.globalSetPage
    const [likes, setLikes] = useState({})
    const [likeStatus, setLikeStatus] = useState(false)
    const [watchingLikes, setWatchingLikes] = useState(false)

    if (JSON.stringify(likes) === '{}') {
        getLike(setLikes, setLikeStatus, userId, wordId)
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
                                        <p onClick={() => {likes[el]['userId'] != userId ? globalSetPage(likes[el]['userId']) : globalSetPage('MyWords')}} key={el}> {likes[el]['name']} </p>
                                    ))
                                }
                            </div>
                        </div> : null
                }
            </div>
            <div>
                {
                    likeStatus == false ?
                        <button onClick={() => addLike(likes, setLikes, setLikeStatus, globalUserName, userId, wordId)}> Likes </button>
                        :
                        null
                }
            </div>
        </div>
    )
}

export default Likes;