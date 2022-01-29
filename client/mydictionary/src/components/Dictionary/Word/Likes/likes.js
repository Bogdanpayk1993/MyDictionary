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
        for (let i = 0; i < Object.keys(json).length; i++) {
            let json1

            let reply = Send_Request_For_Database({ link: 'users/getId', id: `${json[i]['userId']}` })
            await reply.then((value) => {
                json1 = JSON.parse(value)
            })

            json = { ...json, [i]: { ...json[i], name: json1[0]['name'] } }
        }

        let index = Object.keys(json).find(el => json[el]['userId'] == userId)

        if (index != undefined) {
            setLikeStatus(true)
        }
    }

    setLikes(json)
}

async function addLike(likes, setLikes, setLikeStatus, globalUserName, userId, wordId) {
    let json

    let reply = Send_Request_For_Database({ link: 'likes/set', userId: `${userId}`, wordId: `${wordId}` })
    await reply.then((value) => {})

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
                                        <p onClick={() => {likes[el]['userId'] != userId ? globalSetPage(likes[el]['userId']) : globalSetPage('Words')}} key={el}> {likes[el]['name']} </p>
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