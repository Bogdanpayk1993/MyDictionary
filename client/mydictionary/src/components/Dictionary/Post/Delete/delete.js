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
                    {
                        post['type'] == "Word" ?
                            <div className='Word'>
                                <p> {post[`english`]} </p> <p> - </p> <p> {post['ukrainian']} </p>
                            </div>
                            : null
                    }
                    {
                        post['type'] == "Test" ?
                            < div className='Test'>
                                <p> Number of words - {post['wordCounter']} </p>
                                <p> Number of correct answers - {post['trueAnswersCounter']} </p>
                            </div>
                            : null
                    }
                    {
                        post['type'] == "TaskForFriend" ?
                            < div className='Test'>
                                <p> Number of words - {post['wordCounter']} </p>
                                <p> Number of correct answers - {post['trueAnswerCounter']} </p>
                            </div>
                            : null
                    }
                </div>
                <button onClick={() => deletepost(deletepostId, postList, setPostList, setDelete)}> Yes </button>
                <button onClick={() => setDelete(NaN)} > No </button>
            </div>
        </div >
    )
}

export default Delete;