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

        let reply = Send_Request_For_Database({ link: 'words/getEnglishUkrainian', english: `${englishRef.current.value}`, ukrainian: `${ukraineRef.current.value}` })
        await reply.then((value) => {
            json = JSON.parse(value)
            if (Object.keys(json).length != 0) {
                word_Id = json[0].id
            }
        })

        if (Object.keys(json).length == 0) {
            reply = Send_Request_For_Database({ link: 'words/set', english: `${englishRef.current.value}`, ukrainian: `${ukraineRef.current.value}` })
            await reply.then((value) => {})

            reply = Send_Request_For_Database({ link: 'words/getEnglishUkrainian', english: `${englishRef.current.value}`, ukrainian: `${ukraineRef.current.value}` })
            await reply.then((value) => {
                json = JSON.parse(value)
                word_Id = json[0].id
            })
        }

        reply = Send_Request_For_Database({ link: 'userswords/getUserIdWordId', userId: `${user_Id}`, wordId: `${word_Id}` })
        await reply.then((value) => {
            json = JSON.parse(value)
        })


        if (Object.keys(json).length == 0) {
            reply = Send_Request_For_Database({ link: 'userswords/set', userId: `${user_Id}`, wordId: `${word_Id}` })
            await reply.then((value) => {})

            reply = Send_Request_For_Database({ link: 'userswords/getUserIdWordId', userId: `${user_Id}`, wordId: `${word_Id}` })
            await reply.then((value) => {
                json = JSON.parse(value)
            })

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