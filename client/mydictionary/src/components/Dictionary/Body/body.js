import React, { useState } from 'react';
import AddWord from './AddWord/addword';
import WordList from './WordList/wordlist';
import Work_With_Database from '../../work_with_database';
import './body.css';

async function getWordList(userId, setWordList) {
    
    let json
    let user_Id = userId
    let wordList = {}
    
    let reply = Work_With_Database({require: `SELECT * FROM userswords WHERE userId='${user_Id}'`})
    await reply.then((value) => {
        json = JSON.parse(value)
    })

    if (Object.keys(json).length != 0)
    {
        await Object.keys(json).map(async (el) => {
            let json1
            let word_Id = json[el]['wordId'] 
            let reply = Work_With_Database({require: `SELECT * FROM words WHERE id='${word_Id}'`})
            await reply.then((value) => {
                json1 = JSON.parse(value)
                wordList = {...wordList, [el]: {english : json1[0]['english'], ukrainian : json1[0]['ukrainian']}}
            })
            setWordList(wordList)
        })
    }
}

function Body(props) {
    const [wordList, setWordList] = useState(NaN) 

    if (Object.keys(wordList).length == 0)
    {
        getWordList(props.userId, setWordList)
    }

    return (
        <div className="Body">
            <div>

            </div>
            <div>
                <AddWord userId={props.userId} wordList={wordList} setWordList={setWordList} />
                <WordList wordList={wordList} />
            </div>
            <div>

            </div>
        </div>
    )
}

export default Body;