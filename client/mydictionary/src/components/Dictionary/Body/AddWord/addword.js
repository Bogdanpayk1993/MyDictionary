import React, { useRef } from 'react';
import Work_With_Database from '../../../work_with_database';
import './addword.css';

function AddWord(props) { 

    const englishRef = useRef()
    const ukraineRef = useRef()

    async function Add() 
    {
        let json
        let word_Id
        let user_Id = props.userId
        let wordList = props.wordList
        let setWordList = props.setWordList
        
        let reply = Work_With_Database({require: `SELECT * FROM words WHERE english='${englishRef.current.value}' AND ukrainian='${ukraineRef.current.value}'`})
        await reply.then((value) => {
            json = JSON.parse(value)
            if (Object.keys(json).length != 0)
            {
                word_Id = json[0].id
            }
        })

        if (Object.keys(json).length == 0) {
            reply = Work_With_Database({require: `INSERT INTO words (english,ukrainian) VALUE ('${englishRef.current.value}','${ukraineRef.current.value}')`})
            await reply.then((value) => {
                json = JSON.parse(value)
                word_Id = json.insertId
            })
        }

        reply = Work_With_Database({require: `SELECT * FROM userswords WHERE userId='${user_Id}' AND wordId='${word_Id}'`})
        await reply.then((value) => {
            json = JSON.parse(value)
        })

        if (Object.keys(json).length == 0) {
            reply = Work_With_Database({require: `INSERT INTO userswords (userId,wordId) VALUE ('${user_Id}','${word_Id}')`})
            setWordList({...wordList, [Object.keys(wordList).length]: {english : englishRef.current.value, ukrainian : ukraineRef.current.value}})
        }

        englishRef.current.value = ""
        ukraineRef.current.value = ""
    }
    
    return (
        <div className="AddWord">
            <label>
                <input placeholder="English" ref={englishRef} ></input>
                -
                <input placeholder="Ukrainian" ref={ukraineRef} ></input>
                <label>
                    <button onClick={Add}> Add word </button>
                </label>
            </label>
        </div>
    )
}

export default AddWord;