import React from 'react';
import Comments from './Сomments/comments';
import Likes from './Likes/likes';
import './word.css';

function Word(props) {

    const userId = props.userId
    const userName = props.userName
    const globalUserName = props.globalUserName
    const word = props.word
    const setDelete = props.setDelete
    const globalSetPage = props.globalSetPage

    return (
        <div className='Post' key={word['id']}>
            <div>
                <div>
                    <p onClick={() => {word['userId'] != userId ? globalSetPage(word['userId']) : globalSetPage('MyWords')}}> {userName} </p>
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
                <p> {word['english']} </p> - <p> {word['ukrainian']} </p>
            </div>
            <Likes userId={userId} userName={userName} globalUserName={globalUserName} wordId={word['id']} globalSetPage={globalSetPage} />
            <hr />
            <Comments userId={userId} globalUserName={globalUserName} wordId={word['id']} wordUserId={word['userId']} globalSetPage={globalSetPage} />
        </div>
    )
}

export default Word;