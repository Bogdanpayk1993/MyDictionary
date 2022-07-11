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

function Delete(value, label, wordRef, wordsOptionS, setWordOptionS, selectedWord, setSelectedWord) {
    wordsOptionS.push({ value: value, label: label })
    wordsOptionS.sort((a, b) => a["value"] - b["value"])
    setWordOptionS(wordsOptionS)
    if (wordRef.current != null) {
        wordRef.current.setValue(wordsOptionS[0])
    }
    delete selectedWord[value]
    setSelectedWord({ ...selectedWord })
}

function AddTestFromFriend(props) {

    const userId = props.userId
    const wordList = props.wordList
    const subscriptions = props.subscriptions
    const setRegime = props.setRegime
    const [selectedWord, setSelectedWord] = useState({})

    const recipientRef = useRef()
    const wordRef = useRef()

    let recipientsOption = []
    Object.keys(subscriptions).map(el => {
        recipientsOption.push({ value: subscriptions[el]["id"], label: subscriptions[el]["name"] })
    })

    let wordsOption = []
    Object.keys(wordList).map(el => {
        wordsOption.push({ value: wordList[el]["id"], label: `${wordList[el]["english"]} - ${wordList[el]["ukrainian"]}` })
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
                                        <button onClick={() => Delete(selectedWord[el]['value'], selectedWord[el]['label'], wordRef, wordsOptionS, setWordOptionS, selectedWord, setSelectedWord)}> Delete </button>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
                <button> Send test </button>
            </div>
        </div>
    )
}

export default AddTestFromFriend;
