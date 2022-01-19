import React from 'react';
import Comments from './Сomments/comments';
import './word.css';

function Word(props) {

    const userId = props.userId
    const userName = props.userName
    const globalUserName = props.globalUserName
    const word = props.word
    const setDelete = props.setDelete

    return (
        <div className='Post'>
            <div>
                <div>
                    {userName}
                </div>
                <div>
                    {
                        setDelete != undefined ?
                            <button onClick={() => setDelete(word['id'])}> Delete </button>
                            :
                            null
                    }
                </div>
            </div>
            <div>
                <div> {word['english']} </div> - <div> {word['ukrainian']} </div>
            </div>
            <Comments userId={userId} userName={globalUserName} />
        </div>
    )
}

export default Word;