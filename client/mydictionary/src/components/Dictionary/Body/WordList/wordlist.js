import React from 'react';
import './wordlist.css';

function WordList(props) {
    return (
        <div className='WordList'>
            {
                Object.keys(props['wordList']).length != 0 ?
                    (
                        Object.keys(props['wordList']).map(el => (
                            <p key={el}>
                                <div> {props['wordList'][el]['english']} </div> - <div> {props['wordList'][el]['ukrainian']} </div>
                            </p>
                        ))
                    ):
                    (
                        <p> You don't have words </p>
                    )
            }
        </div>
    )
}

export default WordList;