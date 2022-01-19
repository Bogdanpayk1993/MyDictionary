import React from 'react';
import './delete.css';

function Delete(props) {

    let deleteWordId = props.deleteWordId
    let wordList = props.wordList
    let deleteWord = props.deleteWord
    let setWordList = props.setWordList
    let setDelete = props.setDelete

    return (
        <div className='Delete'>
            <div>
                <p> Do you want delete </p>
                <div>
                    <p> {wordList[deleteWordId][`english`]} </p> - <p> {wordList[deleteWordId]['ukrainian']} </p>
                </div>
                <button onClick={() => deleteWord(deleteWordId, wordList, setWordList, setDelete)}> Yes </button>
                <button onClick={() => setDelete(NaN)} > No </button>
            </div>
        </div>
    )
}

export default Delete;