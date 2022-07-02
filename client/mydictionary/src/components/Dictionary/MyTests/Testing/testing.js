import React, { useState } from "react";
import Send_Request_For_Database from "../../../send_request_for_database";
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

async function restartTesting(userId, setWordList2, setCounterWord, setWordId1, setWordId2, setAnswer, setCounterAnswers, trueAnswersCounter, setTrueAnswersCounter, setCounterQuestion, counterQuestion, saving) {
    if (saving == true) {
        let reply = await Send_Request_For_Database({ link: 'resultstests/set', wordCounter: `${counterQuestion}`, trueAnswersCounter: `${trueAnswersCounter}` })
        let json = JSON.parse(reply)
        let postId = json[0]['id']

        let today = new Date()
        reply = await Send_Request_For_Database({ link: 'usersposts/set', type: 'Test', userId: `${userId}`, postId: `${postId}`, date: `${today}` })
        json = JSON.parse(reply)
    }
    
    setWordList2({})
    setWordId1(NaN)
    setWordId2(NaN)
    setAnswer(NaN)
    setCounterQuestion(counterQuestion)
    setCounterAnswers(0)
    setTrueAnswersCounter(0)
    setCounterWord(NaN)
}

function Testing(props) {

    let userId = props.userId
    let wordList1 = props.wordList
    const [wordList2, setWordList2] = useState({})
    const [counterWord, setCounterWord] = useState(NaN)
    const [wordId1, setWordId1] = useState(NaN)
    const [wordId2, setWordId2] = useState(NaN)
    const [answer, setAnswer] = useState(NaN)
    const [counterQuestion, setCounterQuestion] = useState(NaN)
    const [counterAnswers, setCounterAnswers] = useState(0)
    const [trueAnswersCounter, setTrueAnswersCounter] = useState(0)

    if (JSON.stringify(wordList1) !== '{}' && isNaN(counterQuestion)) {
        setCounterQuestion(Object.keys(wordList1).length)
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
                !isNaN(wordId1) && !isNaN(wordId2) && counterAnswers < counterQuestion ?
                    <div className="Test">
                        <div className="RadioGroup">
                            {
                                Object.keys(wordList1).length > 10 ?
                                    <>
                                        <input type="radio" name="counterWords" value={10} onClick={(even) => restartTesting(userId, setWordList2, setCounterWord, setWordId1, setWordId2, setAnswer, setCounterAnswers, trueAnswersCounter, setTrueAnswersCounter, setCounterQuestion, even.target.value, false)} onChange={() => null} checked={counterQuestion == 10 ? true : false} />
                                        <label> 10 </label>
                                    </> : null
                            }
                            {
                                Object.keys(wordList1).length > 20 ?
                                    <>
                                        <input type="radio" name="counterWords" value={20} onClick={(even) => restartTesting(userId, setWordList2, setCounterWord, setWordId1, setWordId2, setAnswer, setCounterAnswers, trueAnswersCounter, setTrueAnswersCounter, setCounterQuestion, even.target.value, false)} onChange={() => null} checked={counterQuestion == 20 ? true : false} />
                                        <label> 20 </label>
                                    </> : null
                            }
                            {
                                Object.keys(wordList1).length > 50 ?
                                    <>
                                        <input type="radio" name="counterWords" value={50} onClick={(even) => restartTesting(userId, setWordList2, setCounterWord, setWordId1, setWordId2, setAnswer, setCounterAnswers, trueAnswersCounter, setTrueAnswersCounter, setCounterQuestion, even.target.value, false)} onChange={() => null} checked={counterQuestion == 50 ? true : false} />
                                        <label> 50 </label>
                                    </> : null
                            }
                            {
                                Object.keys(wordList1).length > 100 ?
                                    <>
                                        <input type="radio" name="counterWords" value={100} onClick={(even) => restartTesting(userId, setWordList2, setCounterWord, setWordId1, setWordId2, setAnswer, setCounterAnswers, trueAnswersCounter, setTrueAnswersCounter, setCounterQuestion, even.target.value, false)} onChange={() => null} checked={counterQuestion == 100 ? true : false} />
                                        <label> 100 </label>
                                    </> : null
                            }
                            <input type="radio" name="counterWords" value={Object.keys(wordList1).length} onClick={(even) => restartTesting(userId, setWordList2, setCounterWord, setWordId1, setWordId2, setAnswer, setCounterAnswers, trueAnswersCounter, setTrueAnswersCounter, setCounterQuestion, even.target.value, false)} onChange={() => null} checked={counterQuestion == Object.keys(wordList1).length ? true : false} />
                            <label> {`All(${Object.keys(wordList1).length})`} </label>
                        </div>
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
                            <button onClick={() => restartTesting(userId, setWordList2, setCounterWord, setWordId1, setWordId2, setAnswer, setCounterAnswers, trueAnswersCounter, setTrueAnswersCounter, setCounterQuestion, counterQuestion, true)}> Yes </button>
                            <button onClick={() => restartTesting(userId, setWordList2, setCounterWord, setWordId1, setWordId2, setAnswer, setCounterAnswers, trueAnswersCounter, setTrueAnswersCounter, setCounterQuestion, counterQuestion, false)}> No </button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Testing;