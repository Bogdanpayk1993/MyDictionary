import React from 'react';
import './comments';

function Comments(props) {

    const userId = props.userId
    const userName = props.userName

    return (
        <div className='Comment'>
            <div>
                <p> {userName} </p>
            </div>
        </div>
    )
}

export default Comments;