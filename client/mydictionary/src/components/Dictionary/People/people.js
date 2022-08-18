import React, { useState } from 'react';
import Send_Request_For_Database from '../../send_request_for_database';
import SearchPeople from './SearchPeople/searchpeople';
import PeopleList from './PeopleList/peoplelist';

async function getPeopleList(userId, wantedPerson, peopleList, setPeopleList) {

    let reply = await Send_Request_For_Database({ link: 'subscribers/getUserSubscriberSubscription', subscriber: `${userId}`, wantedPerson: `${wantedPerson}` })
    let json = JSON.parse(reply)
 
    let user = Object.keys(json).find(el => json[el]['id'] == userId)
    delete json[user]

    let json1 = {}
    Object.entries(json).forEach(([key, value]) => {
        json1[value['id']] = value 
    })

    if (Object.keys(peopleList).length != Object.keys(json1).length) {
        setPeopleList(json1)
    } else {
        if (Object.keys(json1).length != 0) {
            if (peopleList[Object.keys(peopleList)[0]]['id'] != json1[Object.keys(json1)[0]]['id']) {
                setPeopleList(json1)
            }
        }
    }
}

function People(props) {
    const [wantedPerson, setWantedPerson] = useState("")
    const [peopleList, setPeopleList] = useState(Array())
    const userId = props.userId
    const userName = props.userName
    const setPage = props.setPage
    const subscriptions = props.subscriptions
    const setSubscriptions = props.setSubscriptions
    const setRecipientOfCorrespondence = props.setRecipientOfCorrespondence

    getPeopleList(userId, wantedPerson, peopleList, setPeopleList)

    return (
        <>
            <SearchPeople setWantedPerson={setWantedPerson} />
            <PeopleList userId={userId} userName={userName} setPage={setPage} peopleList={peopleList} subscriptions={subscriptions} setSubscriptions={setSubscriptions}  setRecipientOfCorrespondence={setRecipientOfCorrespondence} />
        </>
    )
}

export default People;