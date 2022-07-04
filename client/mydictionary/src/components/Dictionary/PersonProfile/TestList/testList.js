import React, { useState } from 'react';
import Send_Request_For_Database from '../../../send_request_for_database';
import Post from '../../Post/post';

async function getTestList(userId, testList, setTestList) {
    let testList1 = {}

    let reply = await Send_Request_For_Database({ link: 'usersposts/getUserTests', userId: `${userId}`})
    let json = JSON.parse(reply)

    let json1 = {}
    Object.entries(json).forEach(([key, value]) => {
        json1[value['id']] = value
    })

    testList1 = {...json1}

    if (JSON.stringify(testList) == '{}') {
        if (JSON.stringify(testList1) !== '{}') {
            setTestList(testList1)
        }
    } else {
        if (JSON.stringify(testList) != JSON.stringify(testList1)) {
            setTestList(testList1)
        }
    }
}

function TestList(props) {

    const globalUserId = props.globalUserId
    const userId = props.userId
    const globalUserName = props.globalUserName
    const userName = props.userName
    const globalSetPage = props.globalSetPage
    const [testList, setTestList] = useState({})

    getTestList(userId, testList, setTestList)

    return (
        <>
            <div className='postList'>
                {
                    Object.keys(testList).length != 0 ?
                        (
                            Object.keys(testList).reverse().map(el => (
                                <Post userId={userId} globalUserId={globalUserId} userName={userName} globalUserName={globalUserName} post={testList[el]} postList={testList} globalSetPage={globalSetPage} key={testList[el]['id']} />
                            ))
                        ) :
                        (
                            <p> Person don't have test </p>
                        )
                }
            </div>
        </>
    )
}

export default TestList;

