import React from 'react';
import './word.css';

function Word(props) {

    let word = props.word
    let setDelete = props.setDelete

    return (
        <div> 
            <div> {word['english']} </div> - <div> {word['ukrainian']} </div>
            {
                setDelete != undefined ?
                    <button onClick={() => setDelete(word['id'])}> Delete </button>
                    :
                    null
            }
        </div>
    )
}

export default Word;