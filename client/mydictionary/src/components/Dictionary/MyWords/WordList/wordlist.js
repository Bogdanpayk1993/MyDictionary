import React, { useState } from 'react';
import Send_Request_For_Database from '../../../send_request_for_database';
import Word from '../../Word/word';
import './wordlist.css';

function delete_word(id, wordList, setWordList, setDelete) {
    let reply = Send_Request_For_Database({ link: 'userswords/delete', id: `${id}` })
    delete wordList[id]
    setWordList({ ...wordList })
    setDelete(NaN)
}

function WordList(props) {

    const [deleteWordId, setDelete] = useState(NaN)

    return (
        <div className='WordList'>
            {
                !isNaN(deleteWordId) ?
                    (
                        <div className='delete'>
                            <div> 
                                <p> Do you want delete </p>
                                <div> {props['wordList'][deleteWordId][`english`]} </div> - <div> {props['wordList'][deleteWordId]['ukrainian']} </div>
                                <button onClick={() => delete_word(deleteWordId, props['wordList'], props['setWordList'], setDelete)}> Yes </button>
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
                            <Word word={props['wordList'][el]} setDelete={setDelete} key={props['wordList'][el]['id']} /> 
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