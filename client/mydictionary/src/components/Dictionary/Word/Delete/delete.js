import React from 'react';
import './delete.css';

function Delete(props) {

    let deleteWordId = props.deleteWordId
    let word = props.word
    let wordList = props.wordList
    let deleteWord = props.deleteWord
    let setWordList = props.setWordList
    let setDelete = props.setDelete

    return (
        <div className='Delete'>
            <div>
                <p> Do you want delete next word? </p>
                <div>
                    <p> {word[`english`]} </p> - <p> {word['ukrainian']} </p>
                </div>
                <button onClick={() => deleteWord(deleteWordId, wordList, setWordList, setDelete)}> Yes </button>
                <button onClick={() => setDelete(NaN)} > No </button>
            </div>
        </div>
    )
}

export default Delete;