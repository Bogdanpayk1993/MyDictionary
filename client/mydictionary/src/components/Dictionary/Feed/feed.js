import React, { useState } from 'react';
import Post from '../Post/post';
import Send_Request_For_Database from '../../send_request_for_database';

async function getpostList(userId, userName, setPostList) {
    let reply = await Send_Request_For_Database({ link: 'usersposts/getUsersPosts', userId: `${userId}` })
    let json = JSON.parse(reply)

    let json1 = {}

    Object.entries(json).forEach(([key, value]) => {
        if (value['name'] == undefined) {
            value['name'] = userName
        }
        json1[value['id']] = value
    })

    if (JSON.stringify(json1) !== '{}') {
        setPostList({ ...json1 })
    }
}

function Feed(props) {

    const globalUserId = props.globalUserId
    const userId = props.userId
    const globalUserName = props.globalUserName
    const userName = props.userName
    const setPage = props.setPage
    const [postList, setPostList] = useState(NaN)

    if (Object.keys(postList).length == 0) {
        getpostList(userId, userName, setPostList)
    }

    return (
        <div className='feed'>
            <div className='postList'>
                {
                    Object.keys(postList).length != 0 ?
                        (
                            Object.keys(postList).reverse().map(el => (
                                <Post userId={userId} globalUserId={globalUserId} userName={postList[el]['name']} globalUserName={globalUserName} post={postList[el]} postList={postList} setPostList={setPostList} globalSetPage={setPage} key={postList[el]['id']} />
                            ))
                        ) :
                        (
                            <p> You don't have post </p>
                        )
                }
            </div>
        </div>
    )
}

export default Feed;
