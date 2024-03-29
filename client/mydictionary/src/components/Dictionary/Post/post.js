import React, { useState } from 'react';
import Comments from './Сomments/comments';
import Likes from './Likes/likes';
import Delete from './Delete/delete';
import TaskFromFriend from './TaskFromFriend/taskformfriend';
import GetTimeLife from '../GetTimeLife/gettimelife';
import Send_Request_For_Database from '../../send_request_for_database';
import './post.css';

function Post(props) {

    const userId = props.userId
    const globalUserId = props.globalUserId
    const senderPostId = props.senderPostId
    const userName = props.userName
    const globalUserName = props.globalUserName
    const senderPostName = props.senderPostName
    const post = props.post
    const postList = props.postList
    const setPostList = props.setPostList
    const globalSetPage = props.globalSetPage
    const [deletepostId, setDelete] = useState(NaN)

    let timeLifePost = GetTimeLife(post['date'])

    async function deletepost(id, postList, setPostList, setDelete) {
        let post = {...postList[id]}
    
        delete postList[id]
        setPostList({ ...postList })
        setDelete(NaN)
    
        let reply = Send_Request_For_Database({ link: 'usersposts/delete', id: `${id}` })
    
        let text
    
        if (post['type'] == "Word") {
            text = `"${post['english']} - ${post['ukrainian']}"`
        }
    
        if (post['type'] == "Test") {
            text = `"Number of words - ${post['wordCounter']}; Number of correct answers - ${post['trueAnswersCounter']}"`
        }    
    
        if (post['type'] == "TaskForFriend") {
            text = `"Number of words - ${post['wordCounter']}; Number of correct answers - ${post['trueAnswerCounter']}"`
        }
    
        let today = new Date()
        reply = await Send_Request_For_Database({ link: 'notifications/set', sender: `${globalUserId}`, receiver: undefined, postId: undefined, action: `${globalUserName} delete post: ${text}`, date: `${today}` })
    }
    
    return (
        <div className='Post' key={post['id']}>
            <div>
                <div>
                    <p onClick={() => { userId != globalUserId ? globalSetPage(post['userId']) : globalSetPage('Feed') }}> {userName} </p>
                    {
                        senderPostId != undefined ?
                        <p onClick={() => { senderPostId != globalUserId ? globalSetPage(senderPostId) : globalSetPage('Feed') }}> from {senderPostName} </p> : null
                    }
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
                {
                    post['type'] == "Word" ?
                        <div className='Word' >
                            <p> {post['english']} </p> - <p> {post['ukrainian']} </p>
                        </div>
                        :
                        null
                }
                {
                    post['type'] == "Test" ?
                        <div className='Test'>
                            <p> Number of words - {post['wordCounter']} </p>
                            <p> Number of correct answers - {post['trueAnswersCounter']} </p>
                        </div>
                        :
                        null
                }
                {
                    post['type'] == "TaskForFriend" ?
                            <TaskFromFriend globalUserId={globalUserId} post={post} />
                        :
                        null
                }
            </div>
            {
                !isNaN(deletepostId) ?
                    (
                        <Delete deletepostId={deletepostId} post={post} deletepost={deletepost} postList={postList} setPostList={setPostList} setDelete={setDelete} />
                    ) :
                    (null)
            }
            <Likes userId={userId} globalUserId={globalUserId} userName={userName} globalUserName={globalUserName} post={post} globalSetPage={globalSetPage} />
            <hr />
            <Comments userId={userId} globalUserId={globalUserId} userName={userName} globalUserName={globalUserName} postId={post['id']} postUserId={post['userId']} globalSetPage={globalSetPage} />
        </div>
    )
}

export default Post;