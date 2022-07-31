import React, { useState } from 'react';
import Send_Request_For_Database from '../../../send_request_for_database';
import './peoplelist.css';

async function subscribe(el, globalUserId, userId, peopleList, setPeopleList, subscriptions, setSubscriptions) {
    let reply = await Send_Request_For_Database({ link: 'subscribers/set', subscriber: `${globalUserId}`, subscription: `${userId}` })
    let json = JSON.parse(reply)

    setPeopleList({ ...peopleList, [el]: { ...peopleList[el], ['subscriber']: globalUserId } })
    setSubscriptions({ ...subscriptions, [json[0]['id']]: { ['id']: json[0]['id'], ['name']: json[0]['name'], ['email']: json[0]['email'] } })
}

function PeopleList(props) {
    const [peopleList, setPeopleList] = useState(NaN)
    const subscriptions = props.subscriptions
    const setSubscriptions = props.setSubscriptions
    const setRecipientOfCorrespondence = props.setRecipientOfCorrespondence

    if (Object.keys(props['peopleList']).length != Object.keys(peopleList).length) {
        setPeopleList(props['peopleList'])
    }

    return (
        <div className='PeopleList'>
            {
                Object.keys(peopleList).length != 0 ?
                    (
                        Object.keys(peopleList).map(el => (
                            <div key={el}>
                                <div onClick={() => props.setPage(peopleList[el]['id'])}> {peopleList[el]['name']} </div>
                                <div>
                                    <button onClick={() => setRecipientOfCorrespondence({ 'id': peopleList[el]['id'], 'name': peopleList[el]["name"] })}> Correspondence </button>
                                    {
                                        peopleList[el]['subscriber'] == null ?
                                            <button onClick={() => subscribe(el, props['userId'], peopleList[el]['id'], peopleList, setPeopleList, subscriptions, setSubscriptions)} > Subscribe </button>
                                            : null
                                    }
                                </div>
                            </div>
                        ))
                    ) :
                    (
                        <p> The man was not found </p>
                    )
            }
        </div>
    )
}

export default PeopleList;