import React, { useState } from 'react';
import Work_With_Database from '../../work_with_database';
import SearchPeople from './SearchPeople/searchpeople';
import PeopleList from './PeopleList/peoplelist';

async function getPeopleList(userId, wantedPerson, peopleList, setPeopleList) {
    let json

    let reply = Work_With_Database({ require: `SELECT * FROM users ${wantedPerson}` })
    await reply.then((value) => {
        json = JSON.parse(value)
    })

    let user = Object.keys(json).find(el => json[el]['id'] == userId)
    delete json[user]

    let users = Object.keys(json)

    for (let i = 0; i < users.length; i++) {
        let json1 

        reply = Work_With_Database({ require: `SELECT * FROM subscribers WHERE subscriber='${userId}' and subscription='${json[users[i]]['id']}'` })
        await reply.then((value) => {
            json1 = JSON.parse(value)
        })

        if (Object.keys(json1).length != 0) {
            json[users[i]]['statys'] = true
        } else {
            json[users[i]]['statys'] = false
        }

    }

    if (Object.keys(peopleList).length != Object.keys(json).length) {
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
    const setPage = props.setPage

    getPeopleList(userId, wantedPerson, peopleList, setPeopleList)

    return (
        <>
            <SearchPeople setWantedPerson={setWantedPerson} />
            <PeopleList userId={userId} setPage={setPage} peopleList={peopleList} />
        </>
    )
}

export default People;