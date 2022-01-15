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
                                <p onClick={() => setPage(subscriptions[el]['id'])} key={el}> {subscriptions[el]['name']} </p>
                            ))
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Subscriptions;