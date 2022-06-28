import React, { useState } from "react";
import './testing.css';

function answering(wordList1, wordList2, setCounterWord, wordId, wordId2, answer, counterTrueAnswers, setCounterTrueAnswers, setWordId1, setWordId2, setAnswer) {
    if (wordId == answer) {
        setCounterTrueAnswers(counterTrueAnswers + 1)
    }

    delete wordList2[wordId2]
    setCounterWord(Object.keys(wordList2).length)

    let wordId_2 = Object.keys(wordList2)[Math.floor(Math.random() * Object.keys(wordList2).length)]
    let wordId_1
    do {
        wordId_1 = Object.keys(wordList1)[Math.floor(Math.random() * Object.keys(wordList1).length)]
    } while (wordId_1 == wordId_2)

    setWordId1(wordId_1)
    setWordId2(wordId_2)
    setAnswer(wordId_1)
}

function startTesting(wordList1, wordList2, setCounterWord, setWordId1, setWordId2, setAnswer) {
    setCounterWord(Object.keys(wordList2).length)

    let wordId2 = wordList2[Object.keys(wordList2)[Math.floor(Math.random() * Object.keys(wordList2).length)]]['id']
    let wordId1
    do {
        wordId1 = wordList1[Object.keys(wordList1)[Math.floor(Math.random() * Object.keys(wordList1).length)]]['id']
    } while (wordId1 == wordId2)

    setWordId1(wordId1)
    setWordId2(wordId2)
    setAnswer(wordId1)
}

function restartTesting(setWordList2, setCounterWord, setWordId1, setWordId2, setAnswer, setCounterTrueAnswers) {
    setWordList2({})
    setCounterWord(NaN)
    setWordId1(NaN)
    setWordId2(NaN)
    setAnswer(NaN)
    setCounterTrueAnswers(0)
}

function Testing(props) {

    let wordList1 = props.wordList
    const [wordList2, setWordList2] = useState({})
    const [counterWord, setCounterWord] = useState(NaN)
    const [wordId1, setWordId1] = useState(NaN)
    const [wordId2, setWordId2] = useState(NaN)
    const [answer, setAnswer] = useState(NaN)
    const [counterTrueAnswers, setCounterTrueAnswers] = useState(0)

    if (JSON.stringify(wordList1) !== '{}' && JSON.stringify(wordList2) === '{}') {
        setWordList2({ ...wordList1 })
    }

    if (JSON.stringify(wordList1) !== `{}` && JSON.stringify(wordList2) !== `{}` && isNaN(counterWord)) {
        startTesting(wordList1, wordList2, setCounterWord, setWordId1, setWordId2, setAnswer)
    }

    return (
        <div className="Testing">
            {
                !isNaN(wordId1) && !isNaN(wordId2) ?
                    <div className="Test">
                        <div>
                            <button> 10 </button>
                            <button> 20 </button>
                            <button> 50 </button>
                            <button> 100 </button>
                            <button> All </button>
                        </div>
                        <div>
                            <button onClick={() => answering(wordList1, wordList2, setCounterWord, wordId1, wordId2, answer, counterTrueAnswers, setCounterTrueAnswers, setWordId1, setWordId2, setAnswer)}> {wordList2[wordId2]["english"]} </button>
                            <span> {wordList2[wordId2]["ukrainian"]} </span>
                            <button onClick={() => answering(wordList1, wordList2, setCounterWord, wordId2, wordId2, answer, counterTrueAnswers, setCounterTrueAnswers, setWordId1, setWordId2, setAnswer)}> {wordList1[wordId1]["english"]} </button>
                        </div>
                    </div>
                    :
                    <div className="Result">
                        <div>
                            <p> Number of words - {Object.keys(wordList2).length} </p>
                            <p> Number of correct answer - {counterTrueAnswers} </p>
                            <button onClick={() => restartTesting(setWordList2, setCounterWord, setWordId1, setWordId2, setAnswer, setCounterTrueAnswers)}> Ok </button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Testing;