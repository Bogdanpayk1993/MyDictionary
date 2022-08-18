import React, { useRef } from 'react';
import Send_Request_For_Database from '../../../send_request_for_database';
import './addword.css';

function AddWord(props) {

    const englishRef = useRef()
    const ukraineRef = useRef()

    async function Add() {
        let json
        let post_Id
        let user_Id = props.userId
        let userName = props.userName
        let postList = props.postList
        let setPostList = props.setPostList

        let reply = await Send_Request_For_Database({ link: 'words/set', english: `${englishRef.current.value}`, ukrainian: `${ukraineRef.current.value}` })
        json = JSON.parse(reply)
        post_Id = json[0]['id']

        let today = new Date()

        reply = await Send_Request_For_Database({ link: 'usersposts/set', type: 'Word', userId: `${user_Id}`, postId: `${post_Id}`, date: `${today}` })
        json = JSON.parse(reply)
        post_Id = json[0]['id']

        reply = await Send_Request_For_Database({ link: 'notifications/set', userId: `${user_Id}`, postId: `${post_Id}`, action: `${userName} added word: ${englishRef.current.value} - ${ukraineRef.current.value}`, date: `${today}` })
        let json1 = JSON.parse(reply)

        if (json.length != 0) {
            setPostList({ ...postList, [json[0]['id']]: { id: json[0]['id'], type: `Word`, userId: `${user_Id}`, english: englishRef.current.value, ukrainian: ukraineRef.current.value, date: `${today}` } })
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
                    <button onClick={Add}> Add post </button>
                </div>
            </div>
        </div>
    )
}

export default AddWord;