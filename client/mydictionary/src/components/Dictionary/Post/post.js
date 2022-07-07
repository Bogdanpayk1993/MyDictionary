import React, { useState } from 'react';
import Comments from './Сomments/comments';
import Likes from './Likes/likes';
import Delete from './Delete/delete';
import GetTimeLife from '../GetTimeLife/gettimelife';
import Send_Request_For_Database from '../../send_request_for_database';
import './post.css';

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

    let timeLifePost = GetTimeLife(post['date'])

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