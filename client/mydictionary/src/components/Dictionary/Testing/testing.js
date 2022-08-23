import React, { useState } from "react";
import Send_Request_For_Database from "../../send_request_for_database";
import './testing.css';

function answering(wordList1, wordList2, setCounterWord, wordId, wordId2, answer, trueAnswersCounter, setTrueAnswersCounter, setWordId1, setWordId2, setAnswer, counterAnswers, setCounterAnswers) {
    if (wordId == answer["wordId"]) {
        setTrueAnswersCounter(trueAnswersCounter + 1)
    }

    setCounterAnswers(counterAnswers + 1)
    delete wordList2[wordId2]
    setCounterWord(Object.keys(wordList2).length)

    let wordId_2 = Object.keys(wordList2)[Math.floor(Math.random() * Object.keys(wordList2).length)]
    let wordId_1
    do {
        wordId_1 = Object.keys(wordList1)[Math.floor(Math.random() * Object.keys(wordList1).length)]
    } while (wordId_1 == wordId_2)

    setWordId1(wordId_1)
    setWordId2(wordId_2)
    setAnswer({ wordId: wordId_2, position: Math.floor(Math.random() * 2) })
}

function startTesting(wordList1, wordList2, setCounterWord, setWordId1, setWordId2, setAnswer) {
    setCounterWord(Object.keys(wordList1).length)

    let wordId2 = wordList2[Object.keys(wordList2)[Math.floor(Math.random() * Object.keys(wordList2).length)]]['id']
    let wordId1
    do {
        wordId1 = wordList1[Object.keys(wordList1)[Math.floor(Math.random() * Object.keys(wordList1).length)]]['id']
    } while (wordId1 == wordId2)

    setWordId1(wordId1)
    setWordId2(wordId2)
    setAnswer({ wordId: wordId2, position: Math.floor(Math.random() * 2) })
}

function changeCounterQuestion(setWordList2, setWordId1, setWordId2, setAnswer, counterQuestion, setCounterQuestion, setCounterAnswers, setTrueAnswersCounter, setCounterWord) {
    setWordList2({})
    setWordId1(NaN)
    setWordId2(NaN)
    setAnswer(NaN)
    setCounterQuestion(counterQuestion)
    setCounterAnswers(0)
    setTrueAnswersCounter(0)
    setCounterWord(NaN)
}

async function finishMyTest(userId, userName, counterQuestion, trueAnswersCounter, saving, postList, setPostList, setRegime) {
    if (saving == true) {
        let reply = await Send_Request_For_Database({ link: 'resultstests/set', wordCounter: `${counterQuestion}`, trueAnswersCounter: `${trueAnswersCounter}` })
        let json = JSON.parse(reply)
        let resultTestId = json[0]['id']

        let today = new Date()
        reply = await Send_Request_For_Database({ link: 'usersposts/set', type: 'Test', userId: `${userId}`, postId: `${resultTestId}`, date: `${today}` })
        json = JSON.parse(reply)
        let postId = json[0]['id']

        setPostList({ ...postList, [postId]: { ['id']: postId, ['userId']: userId, ['type']: "Test", ['wordCounter']: counterQuestion, ['trueAnswersCounter']: trueAnswersCounter, ['date']: today } })

        reply = await Send_Request_For_Database({ link: 'notifications/set', sender: `${userId}`, receiver: undefined, postId: `${postId}`, action: `${userName} executed test`, date: `${today}` })
    }

    setRegime("TestList")
}

async function finishTestFromFriend(trueAnswerCounter, saving, postList, setPostList, setWordList2, setWordId1, setWordId2, setAnswer, counterQuestion, setCounterQuestion, setCounterAnswers, setTrueAnswersCounter, setCounterWord) {
    if (saving == true) {
        let reply = Send_Request_For_Database({ link: 'tasksforfriends/update', taskforfriendId: `${postList['tasksforfriendsId']}`, trueAnswerCounter: `${trueAnswerCounter}` })
        
        setPostList({ ...postList, ['trueAnswerCounter']: trueAnswerCounter })

        let today = new Date()
        reply = await Send_Request_For_Database({ link: 'notifications/set', sender: `${postList['receiverId']}`, receiver: `${postList['senderId']}`,  postId: `${postList['id']}`, action: `${postList['receiverName']} executed test from ${postList['senderName']}`, date: `${today}` })
    } else {
        changeCounterQuestion(setWordList2, setWordId1, setWordId2, setAnswer, counterQuestion, setCounterQuestion, setCounterAnswers, setTrueAnswersCounter, setCounterWord)
    }
}

function Testing(props) {

    let typeTest = props.typeTest
    let userId = props.userId
    let userName = props.userName
    let wordList = props.wordList
    let setRegime = props.setRegime
    let postList = props.postList
    let setPostList = props.setPostList
    const [wordList1, setWordList1] = useState({})
    const [wordList2, setWordList2] = useState({})
    const [wordId1, setWordId1] = useState(NaN)
    const [wordId2, setWordId2] = useState(NaN)
    const [answer, setAnswer] = useState(NaN)
    const [counterQuestion, setCounterQuestion] = useState(NaN)
    const [counterAnswers, setCounterAnswers] = useState(0)
    const [trueAnswersCounter, setTrueAnswersCounter] = useState(0)
    const [counterWord, setCounterWord] = useState(NaN)

    if (JSON.stringify(wordList) !== '{}' && JSON.stringify(wordList1) === '{}' && isNaN(counterQuestion)) {

        if (typeTest == 'TestForFriend') {
            if (postList['taskLanguage'] == "Ukrainian") {
                Object.keys(wordList).forEach(el => {
                    let buf = wordList[el]['ukrainian']
                    wordList[el]['ukrainian'] = wordList[el]['english']
                    wordList[el]['english'] = buf
                })
            }
        }

        setWordList1({ ...wordList })
        setCounterQuestion(Object.keys(wordList).length)
    }

    if (JSON.stringify(wordList1) !== '{}' && JSON.stringify(wordList2) === '{}') {
        setWordList2({ ...wordList1 })
    }

    if (JSON.stringify(wordList1) !== `{}` && JSON.stringify(wordList2) !== `{}` && isNaN(counterWord)) {
        startTesting(wordList1, wordList2, setCounterWord, setWordId1, setWordId2, setAnswer)
    }

    return (
        <div className="Testing">
            {
                !isNaN(wordId1) ?
                    !isNaN(wordId2) && counterAnswers < counterQuestion ?
                        <div className="Test">
                            {
                                typeTest == "MyTest" ?
                                    <div className="RadioGroup">
                                        <p> Number of words </p>
                                        {
                                            Object.keys(wordList1).length > 10 ?
                                                <>
                                                    <input type="radio" name="counterWords" value={10} onClick={(even) => changeCounterQuestion(setWordList2, setWordId1, setWordId2, setAnswer, even.target.value, setCounterQuestion, setCounterAnswers, setTrueAnswersCounter, setCounterWord)} onChange={() => null} checked={counterQuestion == 10 ? true : false} />
                                                    <label> 10 </label>
                                                </> : null
                                        }
                                        {
                                            Object.keys(wordList1).length > 20 ?
                                                <>
                                                    <input type="radio" name="counterWords" value={20} onClick={(even) => changeCounterQuestion(setWordList2, setWordId1, setWordId2, setAnswer, even.target.value, setCounterQuestion, setCounterAnswers, setTrueAnswersCounter, setCounterWord)} onChange={() => null} checked={counterQuestion == 20 ? true : false} />
                                                    <label> 20 </label>
                                                </> : null
                                        }
                                        {
                                            Object.keys(wordList1).length > 50 ?
                                                <>
                                                    <input type="radio" name="counterWords" value={50} onClick={(even) => changeCounterQuestion(setWordList2, setWordId1, setWordId2, setAnswer, even.target.value, setCounterQuestion, setCounterAnswers, setTrueAnswersCounter, setCounterWord)} onChange={() => null} checked={counterQuestion == 50 ? true : false} />
                                                    <label> 50 </label>
                                                </> : null
                                        }
                                        {
                                            Object.keys(wordList1).length > 100 ?
                                                <>
                                                    <input type="radio" name="counterWords" value={100} onClick={(even) => changeCounterQuestion(setWordList2, setWordId1, setWordId2, setAnswer, even.target.value, setCounterQuestion, setCounterAnswers, setTrueAnswersCounter, setCounterWord)} onChange={() => null} checked={counterQuestion == 100 ? true : false} />
                                                    <label> 100 </label>
                                                </> : null
                                        }
                                        <input type="radio" name="counterWords" value={Object.keys(wordList1).length} onClick={(even) => changeCounterQuestion(setWordList2, setWordId1, setWordId2, setAnswer, even.target.value, setCounterQuestion, setCounterAnswers, setTrueAnswersCounter, setCounterWord)} onChange={() => null} checked={counterQuestion == Object.keys(wordList1).length ? true : false} />
                                        <label> {`All(${Object.keys(wordList1).length})`} </label>
                                    </div>
                                    :
                                    null
                            }
                            <div>
                                <button onClick={() => answering(wordList1, wordList2, setCounterWord, answer["position"] == 0 ? wordId1 : wordId2, wordId2, answer, trueAnswersCounter, setTrueAnswersCounter, setWordId1, setWordId2, setAnswer, counterAnswers, setCounterAnswers)}> {answer["position"] == 0 ? wordList1[wordId1]["english"] : wordList2[wordId2]["english"]} </button>
                                <span> {wordList2[wordId2]["ukrainian"]} </span>
                                <button onClick={() => answering(wordList1, wordList2, setCounterWord, answer["position"] == 0 ? wordId2 : wordId1, wordId2, answer, trueAnswersCounter, setTrueAnswersCounter, setWordId1, setWordId2, setAnswer, counterAnswers, setCounterAnswers)}> {answer["position"] == 0 ? wordList2[wordId2]["english"] : wordList1[wordId1]["english"]} </button>
                            </div>
                        </div>
                        :
                        <div className="Result">
                            <div>
                                <p> Number of words - {counterQuestion} </p>
                                <p> Number of correct answer - {trueAnswersCounter} </p>
                                <p> Do you want save result of this test. </p>
                                <button onClick={() => typeTest == "MyTest" ? finishMyTest(userId, userName, counterQuestion, trueAnswersCounter, true, postList, setPostList, setRegime) : finishTestFromFriend(trueAnswersCounter, true, postList, setPostList, setWordList2, setWordId1, setWordId2, setAnswer, counterQuestion, setCounterQuestion, setCounterAnswers, setTrueAnswersCounter, setCounterWord)}> Yes </button>
                                <button onClick={() => typeTest == "MyTest" ? finishMyTest(userId, userName, counterQuestion, trueAnswersCounter, false, postList, setPostList, setRegime) : finishTestFromFriend(trueAnswersCounter, false, postList, setPostList, setWordList2, setWordId1, setWordId2, setAnswer, counterQuestion, setCounterQuestion, setCounterAnswers, setTrueAnswersCounter, setCounterWord)}> No </button>
                            </div>
                        </div>
                :
                null
            }
        </div>
    )
}

export default Testing;