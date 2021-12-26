import React, { useState } from 'react';
import Work_With_Database from '../../../work_with_database';
import './wordlist.css';

function delete_word(id, wordList, setWordList, setDelete) {
    let reply = Work_With_Database({ require: `DELETE FROM userswords WHERE id=${id.globalId}` })
    delete wordList[id.id]
    setWordList({ ...wordList })
    setDelete(NaN)
}

function WordList(props) {

    const [Delete, setDelete] = useState(NaN)

    return (
        <div className='WordList'>
            {
                !isNaN(Delete.id) ?
                    (
                        <div className='delete'>
                            <div> 
                                <p> Do you want delete </p>
                                <div> {props['wordList'][Delete.id][`english`]} </div> - <div> {props['wordList'][Delete.id]['ukrainian']} </div>
                                <button onClick={() => delete_word(Delete, props['wordList'], props['setWordList'], setDelete)}> Yes </button>
                                <button onClick={() => setDelete(NaN)} > No </button>
                            </div>
                        </div>
                    ) :
                    (null)
            }
            {
                Object.keys(props['wordList']).length != 0 ?
                    (
                        Object.keys(props['wordList']).map(el => (
                            <div key={el}>
                                <div> {props['wordList'][el]['english']} </div> - <div> {props['wordList'][el]['ukrainian']} </div> <button onClick={() => setDelete({globalId: props['wordList'][el]['id'], id: el})} > Delete </button>
                            </div>
                        ))
                    ) :
                    (
                        <p> You don't have words </p>
                    )
            }
        </div>
    )
}

export default WordList;