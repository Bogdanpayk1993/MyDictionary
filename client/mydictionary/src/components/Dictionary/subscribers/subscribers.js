import React from 'react';
import './subscribers.css';

function Subscribers(props) {

    const subscribers = props.subscribers
    const setPage = props.setPage
    const setRecipientOfCorrespondence = props.setRecipientOfCorrespondence

    return (
        <div className='Subscribers'>
            <div>
                <p> Subscribers </p>
                <div>
                    {
                        subscribers != undefined ? (
                            Object.keys(subscribers).map((el) => (
                                <p key={el}>
                                    <label>
                                        <span onClick={() => setPage(subscribers[el]['id'])} key={el}> {subscribers[el]['name']} </span>
                                    </label>
                                    <button onClick={() => setRecipientOfCorrespondence({ 'id': subscribers[el]['id'], 'name': subscribers[el]['name'] })}> Correspondence </button>
                                </p>
                            ))
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Subscribers;