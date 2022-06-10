import React, { useState } from 'react';
import Send_Request_For_Database from '../../../send_request_for_database';
import Post from '../../Post/post';
async function getpostLis(userId, postList, setPostList) {
    let postList1 = {}

    let reply = await Send_Request_For_Database({ link: 'usersposts/getUserPosts', userId: `${userId}` })
    let json = JSON.parse(reply)
    
    let json1 = {}
    Object.entries(json).forEach(([key, value]) => {
        json1[value['id']] = value
    })

    postList1 = {...json1}

    if (JSON.stringify(postList) == '{}') {
        if (JSON.stringify(postList1) !== '{}') {
            setPostList(postList1)
        }
    } else {
        if (JSON.stringify(postList) != JSON.stringify(postList1)) {
            setPostList(postList1)
        }
    }
}

function PostList(props) {

    const globalUserId = props.globalUserId
    const userId = props.userId
    const globalUserName = props.globalUserName
    const userName = props.userName
    const globalSetPage = props.globalSetPage
    const [postList, setPostList] = useState({})

    getpostLis(userId, postList, setPostList)

    return (
        <>
            <div className='postList'>
                {
                    Object.keys(postList).length != 0 ?
                        (
                            Object.keys(postList).reverse().map(el => (
                                <Post userId={userId} globalUserId={globalUserId} userName={userName} globalUserName={globalUserName} post={{ ...postList[el], id: el }} globalSetPage={globalSetPage} key={postList[el]['id']} />
                            ))
                        ) :
                        (
                            <p> Person don't have posts </p>
                        )
                }
            </div>
        </>
    )
}

export default PostList;