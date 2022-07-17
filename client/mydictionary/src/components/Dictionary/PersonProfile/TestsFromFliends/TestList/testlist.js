import React from 'react';
import Post from '../../../Post/post';

function TestList(props) {

    const userId = props.userId
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
                            <Post userId={testList[el]['senderId']} globalUserId={userId} senderPostId={userId} userName={testList[el]['name']} globalUserName={globalUserName} senderPostName={testList[el]['senderName']} post={testList[el]} postList={testList} setTestList={setTestList} globalSetPage={globalSetPage} key={testList[el]['id']} />
                        ))
                    ) :
                    (
                        <p> You don't have tests </p>
                    )
            }
        </div>
    )
}

export default TestList;