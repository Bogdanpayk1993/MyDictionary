import React from 'react';
import './subscriptions.css';

function Subscriptions(props) {

    const subscriptions = props.subscriptions
    const setPage = props.setPage
    const setRecipientOfCorrespondence = props.setRecipientOfCorrespondence

    return (
        <div className='Subscriptions'>
            <div>
                <p> Subscriptions </p>
                <div>
                    {
                        subscriptions != undefined ? (
                            Object.keys(subscriptions).map((el) => (
                                <p key={el}>
                                    <label>
                                        <span onClick={() => setPage(subscriptions[el]['id'])}> {subscriptions[el]['name']} </span>
                                    </label>
                                    <button onClick={() => setRecipientOfCorrespondence({ 'id': subscriptions[el]['id'], 'name': subscriptions[el]['name'] })}> Correspondence </button>
                                </p>
                            ))
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Subscriptions;