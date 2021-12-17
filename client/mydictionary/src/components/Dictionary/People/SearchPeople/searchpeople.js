import React, { useRef } from 'react';
import './searchpeople.css';

function WantedPerson(setWantedPerson, nameRef) {
    if (nameRef.current.value != "") {
        setWantedPerson(`WHERE name='${nameRef.current.value}'`)
    } else {
        setWantedPerson('')
    }
}

function SearchPeople(props) {

    const setWantedPerson = props.setWantedPerson
    const nameRef = useRef()

    return (
        <div className="SearchPeople">
            <label>
                <input placeholder="Name" ref={nameRef} />
                <label>
                    <button onClick={() => WantedPerson(setWantedPerson, nameRef)}> Search </button>
                </label>
            </label>
        </div>
    )
}

export default SearchPeople;