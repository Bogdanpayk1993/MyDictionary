import React, { useState } from 'react';
import Comments from './Сomments/comments';
import Likes from './Likes/likes';
import Delete from './Delete/delete';
import Send_Request_For_Database from '../../send_request_for_database';
import './word.css';

function deleteWord(id, wordList, setWordList, setDelete) {
    let reply = Send_Request_For_Database({ link: 'userswords/delete', id: `${id}` })
    delete wordList[id]
    setWordList({ ...wordList })
    setDelete(NaN)
}

function Word(props) {

    const userId = props.userId
    const globalUserId = props.globalUserId
    const userName = props.userName
    const globalUserName = props.globalUserName
    const word = props.word
    const wordList = props.wordList
    const setWordList = props.setWordList
    const globalSetPage = props.globalSetPage
    const [deleteWordId, setDelete] = useState(NaN)

    return (
        <div className='Post' key={word['id']}>
            <div>
                <div>
                    <p onClick={() => { userId != globalUserId ? globalSetPage(word['userId']) : globalSetPage('Feed') }}> {userName} </p>
                </div>
                <div>
                    {
                        setDelete != undefined && globalUserId == word['userId'] ?
                            <button onClick={() => setDelete(word['id'])}> Delete </button>
                            :
                            null
                    }
                </div>
            </div>
            <div>
                <p> {word['english']} </p> - <p> {word['ukrainian']} </p>
            </div>
            {
                !isNaN(deleteWordId) ?
                    (
                        <Delete deleteWordId={deleteWordId} word={word} deleteWord={deleteWord} wordList={wordList} setWordList={setWordList} setDelete={setDelete} />
                    ) :
                    (null)
            }
            <Likes userId={userId} globalUserId={globalUserId} globalUserName={globalUserName} word={word} globalSetPage={globalSetPage} />
            <hr />
            <Comments userId={userId} globalUserId={globalUserId} globalUserName={globalUserName} wordId={word['id']} wordUserId={word['userId']} globalSetPage={globalSetPage} />
        </div>
    )
}

export default Word;