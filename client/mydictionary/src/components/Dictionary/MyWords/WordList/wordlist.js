import React from 'react';
import Word from '../../Word/word';

function WordList(props) {

    const userId = props.userId
    const userName = props.userName
    const globalSetPage = props.globalSetPage
    const wordList = props.wordList
    const setWordList = props.setWordList

    return (
        <div className='WordList'>
            {
                Object.keys(wordList).length != 0 ?
                    (
                        Object.keys(wordList).reverse().map(el => (
                            <Word userId={userId} userName={userName} globalUserName={userName} word={wordList[el]} wordList={wordList} setWordList={setWordList} globalSetPage={globalSetPage} key={wordList[el]['id']} /> 
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