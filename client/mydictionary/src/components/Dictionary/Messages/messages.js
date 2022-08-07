import React, { useState, createRef, useEffect } from 'react';
import Send_Request_For_Database from '../../send_request_for_database';
import GetTimeLife from '../GetTimeLife/gettimelife';
import './messages.css';

async function getCorrespondence(userId, correspondence, setCorrespondence) {
    let reply = await Send_Request_For_Database({ link: 'messages/get', sender: `${userId}` })
    let json = JSON.parse(reply)

    json = json.reverse()

    let json1 = {}
    Object.keys(json).map(el => {
        if (json[el]['sender'] != userId) {
            json1 = { ...json1, [json[el]['senderName']]: { ['senderName']: json[el]['senderName'], ['senderId']: json[el]['sender'], ...json1[json[el]['senderName']], [json[el]['id']]: { ...json[el] } } }
        }
        if (json[el]['receiver'] != userId) {
            json1 = { ...json1, [json[el]['receiverName']]: { ['senderName']: json[el]['receiverName'], ['senderId']: json[el]['receiver'], ...json1[json[el]['receiverName']], [json[el]['id']]: { ...json[el] } } }
        }
    })

    if (JSON.stringify(json1) !== JSON.stringify(correspondence)) {
        setCorrespondence({ ...json1 })
    }
}

function Messages(props) {

    var userId = props.userId
    var userName = props.userName
    var setPage = props.setPage
    var recipientOfCorrespondence = props.recipientOfCorrespondence
    var setRecipientOfCorrespondence = props.setRecipientOfCorrespondence
    var [correspondence, setCorrespondence] = useState({})

    getCorrespondence(userId, correspondence, setCorrespondence)

    var messageRef = createRef()

    useEffect(() => {
        var messageList = document.getElementById("MessageContainer")
        if (messageList != null) {
            messageList.scrollTop = messageList.scrollHeight
        }            
    },[recipientOfCorrespondence, correspondence])


    async function send(userId, recipientOfCorrespondence, correspondence, setCorrespondence) {
        let today = new Date()

        let reply = await Send_Request_For_Database({ link: 'messages/set', sender: `${userId}`, receiver: `${recipientOfCorrespondence['id']}`, message: `${messageRef.current.value}`, date: today })
        let json = JSON.parse(reply)

        messageRef.current.value = ''

        setCorrespondence({...correspondence, [json[0]['id']]: {sender: userId, senderName: userName, receiver: `${recipientOfCorrespondence['id']}`, message: `${json[0]['message']}`, date: today }})
    }

    return (
        <>
            <div className='MyCorrespondences'>
                <div>
                    <p> My correspondences </p>
                    <div>
                        {
                            correspondence != undefined ? (
                                Object.keys(correspondence).map((el) => (
                                    <p key={el}>
                                        <label>
                                            <span onClick={() => setPage(correspondence[el]['senderId'])}> {el} </span>
                                        </label>
                                        <button onClick={() => setRecipientOfCorrespondence({ 'id': correspondence[el]['senderId'], 'name': correspondence[el]['senderName'] })}> Correspondence </button>
                                    </p>
                                ))
                            ) : null
                        }
                    </div>
                </div>
            </div>
            {
                JSON.stringify(recipientOfCorrespondence) !== '{}' ?
                    (
                        <div className='MyCorrespondence'>
                            <div>
                                <div className='MessageList'>
                                    <div className='MessageContainer' id='MessageContainer'>
                                        <p> {`Correspondence with ${recipientOfCorrespondence['name']}`} </p>
                                        {
                                            correspondence[recipientOfCorrespondence['name']] != undefined ?
                                                Object.keys(correspondence[recipientOfCorrespondence['name']]).map(el => (
                                                    el.match(/^\d+$/) != null ?
                                                        <div className={correspondence[recipientOfCorrespondence['name']][el]['sender'] == userId ? 'Sender' : 'Receiver'} key={el}>
                                                            <p> {correspondence[recipientOfCorrespondence['name']][el]['senderName']} </p>
                                                            <samp> {GetTimeLife(correspondence[recipientOfCorrespondence['name']][el]['date'])} </samp>
                                                            <p> {correspondence[recipientOfCorrespondence['name']][el]['message']} </p>
                                                        </div>
                                                        : null
                                                )) : null
                                        }
                                    </div>
                                </div>
                                <div className='SendMessage'>
                                    <textarea ref={messageRef} placeholder='Your message:' />
                                    <button onClick={() => send(userId, recipientOfCorrespondence, correspondence, setCorrespondence)} > Send </button>
                                </div>
                            </div>
                        </div>
                    ) : null
            }
        </>
    )
}

export default Messages;

