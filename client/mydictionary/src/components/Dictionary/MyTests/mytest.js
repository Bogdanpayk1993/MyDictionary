import React, { useState } from "react";
import Testing from "../Testing/testing";
import TestList from "./TestsList/testlist";
import Send_Request_For_Database from "../../send_request_for_database";
import './mytest.css';

async function getPostList(userId, setPostList) {
    let reply = await Send_Request_For_Database({ link: 'usersposts/getUserWords', userId: `${userId}` })
    let json = JSON.parse(reply)

    let json1 = {}
    Object.entries(json).forEach(([key, value]) => {
        json1[value['id']] = value
    })

    if (JSON.stringify(json1) !== '{}') {
        setPostList({ ...json1 })
    }
}

async function getTestList(userId, setTestList) {
    let reply = await Send_Request_For_Database({ link: 'usersposts/getUserTests', userId: `${userId}` })
    let json = JSON.parse(reply)

    let json1 = {}
    Object.entries(json).forEach(([key, value]) => {
        json1[value['id']] = value
    })

    if (JSON.stringify(json1) !== '{}') {
        setTestList({ ...json1 })
    }
}

function MyTests(props) {

    const userId = props.userId
    const userName = props.userName
    const globalSetPage = props.globalSetPage
    const [postList, setPostList] = useState({})
    const [testList, setTestList] = useState({})
    const [regime, setRegime] = useState("TestList")

    if (Object.keys(postList).length == 0) {
        getPostList(userId, setPostList)
        getTestList(userId, setTestList)
    }

    return (
        <div className="MyTesting">
            {
                regime == "Testing" ?
                    <div>
                        <Testing typeTest="MyTest" userId={userId} wordList={{ ...postList }} setRegime={setRegime} postList={testList} setPostList={setTestList} />
                    </div>
                    :
                    <>
                        <div className="TestMenu">
                            <button onClick={() => setRegime("Testing")}> Start test </button>
                        </div>
                        <TestList userId={userId} userName={userName} postList={testList} setPostList={setTestList} globalSetPage={globalSetPage} />
                    </>
            }
        </div>
    )
}

export default MyTests;