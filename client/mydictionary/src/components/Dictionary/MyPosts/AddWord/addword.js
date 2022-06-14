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
        let postList = props.postList
        let setPostList = props.setPostList

        let reply = await Send_Request_For_Database({ link: 'words/set', english: `${englishRef.current.value}`, ukrainian: `${ukraineRef.current.value}` })
        json = JSON.parse(reply)
        post_Id = json[0]['id']

        let today = new Date()

        reply = await Send_Request_For_Database({ link: 'usersposts/set', userId: `${user_Id}`, postId: `${post_Id}`, date: `${today}` })
        json = JSON.parse(reply)

        if (json.length != 0) {
            setPostList({ ...postList, [json[0]['id']]: { id: json[0]['id'], english: englishRef.current.value, ukrainian: ukraineRef.current.value } })
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