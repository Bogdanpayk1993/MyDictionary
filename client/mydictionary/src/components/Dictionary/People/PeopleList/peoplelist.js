import React, { useState } from 'react';
import Work_With_Database from '../../../work_with_database';
import './peoplelist.css';

async function signUp(el, globalUserId, userId, peopleList, setPeopleList) {
    let json

    let reply = Work_With_Database({ require: `SELECT * FROM subscribers WHERE subscriber='${globalUserId}' and subscription='${userId}'` })
    await reply.then((value) => {
        json = JSON.parse(value)
    })

    if (Object.keys(json).length == 0) {
        let reply = Work_With_Database({ require: `INSERT INTO subscribers (subscriber, subscription) VALUES ('${globalUserId}','${userId}')` })
    }

    setPeopleList({...peopleList, [el]: {...peopleList[el], ['statys']: true}})
}

function PeopleList(props) {
    const [peopleList, setPeopleList] = useState(NaN)

    if (Object.keys(props['peopleList']).length != 0) {
        if (Object.keys(props['peopleList']).length != Object.keys(peopleList).length) {
            setPeopleList(props['peopleList'])
        }
    }

    console.log(peopleList)

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
                                            <button onClick={() => signUp(el, props['userId'], peopleList[el]['id'], peopleList, setPeopleList)} > Sign up </button>
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