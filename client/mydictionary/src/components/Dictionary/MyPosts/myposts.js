import React, { useState } from 'react';
import AddWord from './AddWord/addword';
import PostList from './PostList/postlist';
import Send_Request_For_Database from '../../send_request_for_database';

async function getpostList(userId, setPostList) {

    let reply = await Send_Request_For_Database({ link: 'usersposts/getUserPosts', userId: `${userId}` })
    let json = JSON.parse(reply)

    let json1 = {}
    Object.entries(json).forEach(([key, value]) => {
        json1[value['id']] = value
    })

    if (JSON.stringify(json1) !== '{}') {
        setPostList({...json1})
    }
}

function MyPosts(props) {

    const userId = props.userId
    const userName = props.userName
    const globalSetPage = props.globalSetPage
    const [postList, setPostList] = useState(NaN)

    if (Object.keys(postList).length == 0) {
        getpostList(props.userId, setPostList)
    }

    return (
        <>
            <AddWord userId={userId} postList={postList} setPostList={setPostList} />
            <PostList userId={userId} userName={userName} postList={postList} setPostList={setPostList} globalSetPage={globalSetPage} />
        </>
    )
}

export default MyPosts;