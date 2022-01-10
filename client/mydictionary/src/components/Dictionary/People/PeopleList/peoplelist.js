import React, { useState } from 'react';
import Send_Request_For_Database from '../../../send_request_for_database';
import './peoplelist.css';

async function subscribe(el, globalUserId, userId, peopleList, setPeopleList, subscriptions, setSubscriptions) {
    let json

    let reply = Send_Request_For_Database({ link: 'subscribers/getSubscriberSubscription', subscriber: `${globalUserId}`, subscription: `${userId}` })
    await reply.then((value) => {
        json = JSON.parse(value)
    })

    if (Object.keys(json).length == 0) {
        let reply = Send_Request_For_Database({ link: 'subscribers/set', subscriber: `${globalUserId}`, subscription: `${userId}` })
        await reply.then((value) => {})

        reply = Send_Request_For_Database({ link: 'users/getId', id: `${userId}` })
        await reply.then((value) => {
            json = JSON.parse(value)
        })

        setPeopleList({...peopleList, [el]: {...peopleList[el], ['statys']: true}})

        if (JSON.stringify(subscriptions) == undefined) {
            setSubscriptions({ ...subscriptions, ['0']: { ['id']: json[0]['id'], ['name']: json[0]['name'], ['email']: json[0]['email'] } })
        } else {
            setSubscriptions({ ...subscriptions, [subscriptions.length]: { ['id']: json[0]['id'], ['name']: json[0]['name'], ['email']: json[0]['email'] } })
        }
    }

    
}

function PeopleList(props) {
    const [peopleList, setPeopleList] = useState(NaN)
    const subscriptions = props.subscriptions 
    const setSubscriptions = props.setSubscriptions

    if (Object.keys(props['peopleList']).length != 0) {
        if (Object.keys(props['peopleList']).length != Object.keys(peopleList).length) {
            setPeopleList(props['peopleList'])
        }
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
                                    {
                                        peopleList[el]['statys'] != true ?
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