import React, { useState } from 'react';
import Comments from './Сomments/comments';
import Likes from './Likes/likes';
import Delete from './Delete/delete';
import Send_Request_For_Database from '../../send_request_for_database';
import './post.css';

function getTimeLifePost(date) {
    let postDate = new Date(date)
    let todayDate = new Date

    let timeLifeWord = todayDate - postDate

    let years = Math.floor(timeLifeWord / (12 * 30 * 24 * 60 * 60 * 1000))
    if (years != 0) {
        if (years == 1) {
            return `${years} year ago`
        } else {
            return `${years} years ago`
        }
    }

    let months = Math.floor(timeLifeWord / (30 * 24 * 60 * 60 * 1000))
    if (months != 0) {
        if (months == 1) {
            return `${months} month ago`
        } else {
            return `${months} months ago`
        }
    }

    let days = Math.floor(timeLifeWord / (24 * 60 * 60 * 1000))
    if (days != 0) {
        if (days == 1) {
            return `${days} day ago`
        } else {
            return `${days} days ago`
        }
    }

    let hours = Math.floor(timeLifeWord / (60 * 60 * 1000))
    if (hours != 0) {
        if (hours == 1) {
            return `${hours} hour ago`
        } else {
            return `${hours} hours ago`
        }
    }

    let minutes = Math.floor(timeLifeWord / (60 * 1000))
    if (minutes != 0) {
        if (minutes == 1) {
            return `${minutes} minute ago`
        } else {
            return `${minutes} minutes ago`
        }
    }

    let seconds = Math.floor(timeLifeWord / 1000)
    if (seconds == 1) {
        return `${seconds} second ago` 
    } else {
        return `${seconds} seconds ago`
    }
}

function deletepost(id, postList, setPostList, setDelete) {
    let reply = Send_Request_For_Database({ link: 'usersposts/delete', id: `${id}` })
    delete postList[id]
    setPostList({ ...postList })
    setDelete(NaN)
}

function Post(props) {

    const userId = props.userId
    const globalUserId = props.globalUserId
    const userName = props.userName
    const globalUserName = props.globalUserName
    const post = props.post
    const postList = props.postList
    const setPostList = props.setPostList
    const globalSetPage = props.globalSetPage
    const [deletepostId, setDelete] = useState(NaN)

    let timeLifePost = getTimeLifePost(post['date'])

    return (
        <div className='Post' key={post['id']}>
            <div>
                <div>
                    <p onClick={() => { userId != globalUserId ? globalSetPage(post['userId']) : globalSetPage('Feed') }}> {userName} </p>
                    <samp> {timeLifePost} </samp>
                </div>
                <div>
                    {
                        setDelete != undefined && globalUserId == post['userId'] ?
                            <button onClick={() => setDelete(post['id'])}> Delete </button>
                            :
                            null
                    }
                </div>
            </div>
            <div>
                <p> {post['english']} </p> - <p> {post['ukrainian']} </p>
            </div>
            {
                !isNaN(deletepostId) ?
                    (
                        <Delete deletepostId={deletepostId} post={post} deletepost={deletepost} postList={postList} setPostList={setPostList} setDelete={setDelete} />
                    ) :
                    (null)
            }
            <Likes userId={userId} globalUserId={globalUserId} globalUserName={globalUserName} post={post} globalSetPage={globalSetPage} />
            <hr />
            <Comments userId={userId} globalUserId={globalUserId} globalUserName={globalUserName} postId={post['id']} postUserId={post['userId']} globalSetPage={globalSetPage} />
        </div>
    )
}

export default Post;