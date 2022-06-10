import React from 'react';
import './delete.css';

function Delete(props) {

    let deletepostId = props.deletepostId
    let post = props.post
    let postList = props.postList
    let deletepost = props.deletepost
    let setPostList = props.setPostList
    let setDelete = props.setDelete

    return (
        <div className='Delete'>
            <div>
                <p> Do you want delete next post? </p>
                <div>
                    <p> {post[`english`]} </p> - <p> {post['ukrainian']} </p>
                </div>
                <button onClick={() => deletepost(deletepostId, postList, setPostList, setDelete)}> Yes </button>
                <button onClick={() => setDelete(NaN)} > No </button>
            </div>
        </div>
    )
}

export default Delete;