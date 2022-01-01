import React from 'react';
import './subscribers.css';

function Subscribers(props) {

    const subscribers = props.subscribers
    const setPage = props.setPage

    return (
        <div className='Subscribers'>
            <div>
                <p> Subscribers </p>
                <div>
                    {
                        subscribers != undefined ? (
                            Object.keys(subscribers).map((el) => (
                                <div onClick={() => setPage(subscribers[el]['id'])} key={el}>
                                    <p> {subscribers[el]['name']} </p>
                                </div>
                            ))
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Subscribers;