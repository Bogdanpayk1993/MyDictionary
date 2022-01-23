import React from 'react';
import './commentslist.css';

function CommentsList(props) {

    const commentsList = props.commentsList

    return (
        JSON.stringify(commentsList) !== '{}' ?
            (
                <div>
                    <div  className='CommentsList'>
                        <hr /> 
                        {
                            Object.keys(commentsList).map((el) =>
                                <div className='Comment' key={el}>
                                    <p> {commentsList[el]['name']} </p>
                                    <p> {commentsList[el]['comment']} </p>
                                </div>)
                        }
                    </div>
                </div>
            ) : null
    )
}

export default CommentsList;