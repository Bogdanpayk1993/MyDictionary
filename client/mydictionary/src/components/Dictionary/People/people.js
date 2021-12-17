import React, { useState } from 'react';
import Work_With_Database from '../../work_with_database';
import SearchPeople from './SearchPeople/searchpeople';
import PeopleList from './PeopleList/peoplelist';

async function getPeopleList(wantedPerson, peopleList, setPeopleList, userId) {
    let json
    let reply = Work_With_Database({ require: `SELECT * FROM users ${wantedPerson}` })
    await reply.then((value) => {
        json = JSON.parse(value)
    })
    let user = Object.keys(json).find(el => json[el]['id'] == userId)
    delete json[user]
    if (Object.keys(peopleList).length != Object.keys(json).length) {
        console.log(json)
        setPeopleList(json)
    } else {
        if (Object.keys(json).length != 0) {
            if (peopleList[Object.keys(json)[0]]['id'] != json[Object.keys(json)[0]]['id']) {
                setPeopleList(json)
            }
        }
    }
}

function People(props) {
    const [wantedPerson, setWantedPerson] = useState("")
    const [peopleList, setPeopleList] = useState(Array())
    const userId = props.userId

    getPeopleList(wantedPerson, peopleList, setPeopleList, userId)

    return (
        <>
            <SearchPeople setWantedPerson={setWantedPerson} />
            <PeopleList peopleList={peopleList} />
        </>
    )
}

export default People;