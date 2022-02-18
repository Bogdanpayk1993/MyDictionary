import React, { useState } from 'react';
import Send_Request_For_Database from '../../send_request_for_database';
import SearchPeople from './SearchPeople/searchpeople';
import PeopleList from './PeopleList/peoplelist';

async function getPeopleList(userId, wantedPerson, peopleList, setPeopleList) {

    let reply = await Send_Request_For_Database({ link: 'subscribers/getUserSubscriberSubscription', subscriber: `${userId}`, wantedPerson: `${wantedPerson}` })
    let json = JSON.parse(reply)
 
    let user = Object.keys(json).find(el => json[el]['id'] == userId)
    delete json[user]
    
    if (Object.keys(peopleList).length != Object.keys(json).length) {
        setPeopleList(json)
    } else {
        if (Object.keys(json).length != 0) {
            if (peopleList[Object.keys(peopleList)[0]]['id'] != json[Object.keys(json)[0]]['id']) {
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
    const subscriptions = props.subscriptions
    const setSubscriptions = props.setSubscriptions

    getPeopleList(userId, wantedPerson, peopleList, setPeopleList)

    return (
        <>
            <SearchPeople setWantedPerson={setWantedPerson} />
            <PeopleList userId={userId} setPage={setPage} peopleList={peopleList} subscriptions={subscriptions} setSubscriptions={setSubscriptions} />
        </>
    )
}

export default People;