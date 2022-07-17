import React, { useState, useRef } from 'react';
import Select from 'react-select';
import Send_Request_For_Database from '../../../send_request_for_database';
import './addtestfromfriend.css';

function AddWord(wordRef, wordsOptionS, setWordOptionS, selectedWord, setSelectedWord) {
    let word = wordRef.current.getValue()
    let pos = wordsOptionS.indexOf(word[0])
    wordsOptionS.splice(pos, 1)
    setWordOptionS(wordsOptionS)
    wordRef.current.setValue(wordsOptionS[0])
    setSelectedWord({ ...selectedWord, [word[0]["value"]]: word[0] })
}

function DeleteWord(value, label, wordRef, wordsOptionS, setWordOptionS, selectedWord, setSelectedWord) {
    wordsOptionS.push({ value: value, label: label })
    wordsOptionS.sort((a, b) => a["value"] - b["value"])
    setWordOptionS(wordsOptionS)
    if (wordRef.current != null) {
        wordRef.current.setValue(wordsOptionS[0])
    }
    delete selectedWord[value]
    setSelectedWord({ ...selectedWord })
}

async function SendTest(userId, recipientRef, languageRef, selectedWord, setRegime, setMessage) {
    if (Object.keys(selectedWord).length != 0) {
        let reaply = await Send_Request_For_Database({ link: 'tasksforfriends/set', senderId: `${userId}`, receiverId: `${recipientRef.current.getValue()[0]["value"]}`, taskLanguage: `${languageRef.current.getValue()[0]["value"]}`, wordCounter: `${Object.keys(selectedWord).length}`, trueAnswerCounter: `-1` })
        let json = JSON.parse(reaply) 
        let post_Id = json[0]['id']

        let today = new Date()

        reaply = await Send_Request_For_Database({ link: 'usersposts/set', type: 'Taskforfriend', userId: `${recipientRef.current.getValue()[0]["value"]}`, postId: post_Id, date: `${today}` })
        json = JSON.parse(reaply)

        for (let i = 0; i < Object.keys(selectedWord).length; i++) { 
            reaply = await Send_Request_For_Database({ link: 'tasksforfriendswords/set', taskForFriendId: `${post_Id}`, wordId: `${selectedWord[Object.keys(selectedWord)[i]]["wordId"]}` })
            json = JSON.parse(reaply)
        }

        setRegime("TestList")
    }
    else {
        setMessage(true)
    }
}

function CloseMessage(setMessage) {
    setMessage(false)
}

function AddTestFromFriend(props) {

    const userId = props.userId
    const wordList = props.wordList
    const subscriptions = props.subscriptions
    const setRegime = props.setRegime
    const [selectedWord, setSelectedWord] = useState({})
    const [message, setMessage] = useState(false)

    const recipientRef = useRef()
    const languageRef = useRef()
    const wordRef = useRef()

    let recipientsOption = []
    Object.keys(subscriptions).map(el => {
        recipientsOption.push({ value: subscriptions[el]["id"], label: subscriptions[el]["name"] })
    })

    let languageOption = [
        { value: "English", label: "English"},
        { value: "Ukrainian", label: "Ukrainian" }
    ]

    let wordsOption = []
    Object.keys(wordList).map(el => {
        wordsOption.push({ value: wordList[el]["id"], label: `${wordList[el]["english"]} - ${wordList[el]["ukrainian"]}`, wordId: `${wordList[el]["wordId"]}` })
    })
    const [wordsOptionS, setWordOptionS] = useState(wordsOption)

    return (
        <div className="Testing">
            <div className="Test">
                <h3> Send test for friend </h3>
                <div className="Select">
                    <p className="SelectP"> Select a recipient - </p>
                    <Select ref={recipientRef} defaultValue={recipientsOption[0]} options={recipientsOption} />
                </div>
                <div className="Select"> 
                    <p className="SelectP"> Select a language - </p>
                    <Select ref={languageRef} defaultValue={languageOption[0]} options={languageOption} />
                </div>
                <div className="SelectWord">
                    <div className="SelectWordSelect">
                        {
                            Object.keys(wordsOptionS).length > 0 ?
                                <>
                                    <div className="Select">
                                        <p> Select a word - </p>
                                        <Select ref={wordRef} defaultValue={wordsOptionS[0]} options={wordsOptionS} />
                                        <button onClick={() => AddWord(wordRef, wordsOptionS, setWordOptionS, selectedWord, setSelectedWord)}> Add </button>
                                    </div>
                                    <hr />
                                </> : (null)
                        }
                    </div>
                    <div className="WordContainer">
                        {
                            Object.keys(selectedWord).map(el => (
                                <>
                                    <div>
                                        <p> {`${selectedWord[el]['label']}`} </p>
                                    </div>
                                    <div>
                                        <button onClick={() => DeleteWord(selectedWord[el]['value'], selectedWord[el]['label'], wordRef, wordsOptionS, setWordOptionS, selectedWord, setSelectedWord)}> Delete </button>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
                <button onClick={() => SendTest(userId, recipientRef, languageRef, selectedWord, setRegime, setMessage)}> Send test </button>
            </div>
            {
                message == true ?
                    <div className="Message">
                        <div> 
                            <p> You need select one or more words. </p>
                            <button onClick={() => CloseMessage(setMessage)}> Ok </button>
                        </div>
                    </div> : null
            }
        </div>
    )
}

export default AddTestFromFriend;
