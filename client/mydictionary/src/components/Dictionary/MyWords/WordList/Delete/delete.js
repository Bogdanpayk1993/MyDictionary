import React from 'react';
import './delete.css';

function Delete(props) {
    
    let deleteWordId = props.deleteWordId
    let wordList = props.wordList
    let deleteWord = props.deleteWord
    let setWordList = props.setWordList
    let setDelete = props.setDelete

    return (
        <div className='delete'>
            <div>
                <p> Do you want delete </p>
                <div> {wordList[deleteWordId][`english`]} </div> - <div> {wordList[deleteWordId]['ukrainian']} </div>
                <button onClick={() => deleteWord(deleteWordId, wordList, setWordList, setDelete)}> Yes </button>
                <button onClick={() => setDelete(NaN)} > No </button>
            </div>
        </div>
    )
} 

export default Delete;