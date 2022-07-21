import React from 'react';
import Post from '../../../Post/post';

function TestList(props) {

    const userId = props.userId
    const globalUserId = props.globalUserId
    const userName = props.userName
    const globalUserName = props.globalUserName
    const globalSetPage = props.globalSetPage
    const testList = props.testList
    const setTestList = props.setTestList

    return (
        <div className='postList'>
            {
                Object.keys(testList).length != 0 ?
                    (
                        Object.keys(testList).reverse().map(el => (
                            <Post userId={userId} globalUserId={globalUserId} senderPostId={testList[el]['senderId']} userName={testList[el]['name']} globalUserName={globalUserName} senderPostName={testList[el]['senderName']} post={testList[el]} postList={testList} setTestList={setTestList} globalSetPage={globalSetPage} key={testList[el]['id']} />
                        ))
                    ) :
                    (
                        <p> Person don't have tests </p>
                    )
            }
        </div>
    )
}

export default TestList;