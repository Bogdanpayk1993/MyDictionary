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
                                <p onClick={() => setPage(subscribers[el]['id'])} key={el}> {subscribers[el]['name']} </p>
                            ))
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Subscribers;