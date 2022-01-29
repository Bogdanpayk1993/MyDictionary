import React, { useState } from 'react';
import Send_Request_For_Database from '../../../send_request_for_database';
import Word from '../../Word/word';
import Delete from './Delete/delete';

function deleteWord(id, wordList, setWordList, setDelete) {
    let reply = Send_Request_For_Database({ link: 'userswords/delete', id: `${id}` })
    delete wordList[id]
    setWordList({ ...wordList })
    setDelete(NaN)
}

function WordList(props) {

    const userId = props.userId
    const userName = props.userName
    const globalSetPage = props.globalSetPage
    const [deleteWordId, setDelete] = useState(NaN)

    return (
        <div className='WordList'>
            {
                !isNaN(deleteWordId) ?
                    (
                       <Delete deleteWordId={deleteWordId}  wordList={props['wordList']} deleteWord={deleteWord} setWordList={props['setWordList']} setDelete={setDelete} />
                    ) :
                    (null)
            }
            {
                Object.keys(props['wordList']).length != 0 ?
                    (
                        Object.keys(props['wordList']).map(el => (
                            <Word userId={userId} userName={userName} globalUserName={userName} word={props['wordList'][el]} globalSetPage={globalSetPage} setDelete={setDelete} key={props['wordList'][el]['id']} /> 
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