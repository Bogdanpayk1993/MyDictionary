import React from 'react';
import Post from '../../Post/post';

function PostList(props) {

    const userId = props.userId
    const userName = props.userName
    const globalSetPage = props.globalSetPage
    const postList = props.postList
    const setPostList = props.setPostList

    return (
        <div className='postList'>
            {
                Object.keys(postList).length != 0 ?
                    (
                        Object.keys(postList).reverse().map(el => (
                            <Post userId={userId} globalUserId={userId} userName={userName} globalUserName={userName} post={postList[el]} postList={postList} setPostList={setPostList} globalSetPage={globalSetPage} key={postList[el]['id']} /> 
                        ))
                    ) :
                    (
                        <p> You don't have posts </p>
                    )
            }
        </div>
    )
}

export default PostList;