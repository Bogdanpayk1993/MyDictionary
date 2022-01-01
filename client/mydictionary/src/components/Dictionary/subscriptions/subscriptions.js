import React from 'react';
import './subscriptions.css';

function Subscriptions(props) {

    const subscriptions = props.subscriptions
    const setPage = props.setPage

    return (
        <div className='Subscriptions'>
            <div>
                <p> Subscriptions </p>
                <div>
                    {
                        subscriptions != undefined ? (
                            Object.keys(subscriptions).map((el) => (
                                <div onClick={() => setPage(subscriptions[el]['id'])} key={el}>
                                    <p> {subscriptions[el]['name']} </p>
                                </div>
                            ))
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Subscriptions;