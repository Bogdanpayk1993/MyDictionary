import React, { useState, createRef } from 'react';
import Send_Request_For_Database from '../../send_request_for_database';
import './messages.css';

function Messages(props) {

    var recipientOfCorrespondence = props.recipientOfCorrespondence

    var messageList = document.getElementById("MessageContainer")
    if (messageList != null) {
        messageList.scrollTop = messageList.scrollHeight
    }

    console.log(recipientOfCorrespondence)

    return (
        <>
            <div className='MyContacts'>
                <div>
                    <p> My correspondences </p>
                    <div>

                    </div>
                </div>
            </div>
            {
                JSON.stringify(recipientOfCorrespondence) !== '{}' ?
                    (
                        <div className='MyMessages'>
                            <div>
                                <div className='MessageList'>
                                    <div id='MessageContainer'>
                                        <p> Hello </p>
                                        <p> Hello </p>
                                    </div>
                                </div>
                                <div className='SendMessage'>
                                    <textarea placeholder='Your message:' />
                                    <button> Send </button>
                                </div>
                            </div>
                        </div>
                    ) : null
            }
        </>
    )
}

export default Messages;
