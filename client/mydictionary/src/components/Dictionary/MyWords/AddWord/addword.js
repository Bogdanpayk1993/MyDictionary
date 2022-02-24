import React, { useRef } from 'react';
import Send_Request_For_Database from '../../../send_request_for_database';
import './addword.css';

function AddWord(props) {

    const englishRef = useRef()
    const ukraineRef = useRef()

    async function Add() {
        let json
        let word_Id
        let user_Id = props.userId
        let wordList = props.wordList
        let setWordList = props.setWordList

        let reply = await Send_Request_For_Database({ link: 'words/set', english: `${englishRef.current.value}`, ukrainian: `${ukraineRef.current.value}` })
        json = JSON.parse(reply)
        word_Id = json[0]['id']

        reply = await Send_Request_For_Database({ link: 'userswords/set', userId: `${user_Id}`, wordId: `${word_Id}` })
        json = JSON.parse(reply)

        if (json.length != 0) {
            setWordList({ ...wordList, [json[0]['id']]: { id: json[0]['id'], english: englishRef.current.value, ukrainian: ukraineRef.current.value } })
        }

        englishRef.current.value = ""
        ukraineRef.current.value = ""
    }

    return (
        <div className="AddWord">
            <div>
                <input placeholder="English" ref={englishRef} ></input>
                -
                <input placeholder="Ukrainian" ref={ukraineRef} ></input>
                <div>
                    <button onClick={Add}> Add word </button>
                </div>
            </div>
        </div>
    )
}

export default AddWord;