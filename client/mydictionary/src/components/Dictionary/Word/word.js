import React from 'react';
import './word.css';

function Word(props) {

    const userName = props.userName
    const word = props.word
    const setDelete = props.setDelete

    return (
        <div>
            <div className='userInformation'>
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
            <div className='Word'>
                <div> {word['english']} </div> - <div> {word['ukrainian']} </div>
            </div>
        </div>
    )
}

export default Word;