import React, { useState } from "react";
import Testing from "./Testing/testing";
import Send_Request_For_Database from "../../send_request_for_database";

async function getPostList(userId, setPostList) {

    let reply = await Send_Request_For_Database({ link: 'usersposts/getUserPosts', userId: `${userId}` })
    let json = JSON.parse(reply)

    let json1 = {}
    Object.entries(json).forEach(([key, value]) => {
        json1[value['id']] = value
    })

    if (JSON.stringify(json1) !== '{}') {
        setPostList({ ...json1 })
    }

    console.log(json1)
}

function MyTests(props) {

    const userId = props.userId
    const userName = props.userName
    const globalSetPage = props.globalSetPage
    const [postList, setPostList] = useState({})

    if (Object.keys(postList).length == 0) {
        getPostList(userId, setPostList)
    }

    return (
        <Testing userId={userId} wordList={{...postList}} />
    )
}

export default MyTests;