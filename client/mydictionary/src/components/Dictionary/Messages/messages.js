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

    let status = []
    Object.keys(json1).map(el => {
        let status1 = true
        Object.keys(json1[el]).map(ell => (
            ell.match(/^\d+$/) != null ?
                json1[el][ell]['status'] == 'false' && json1[el][ell]['receiver'] == userId ?
                    status1 = false
                    :
                    null
                : null
        ))
        status.push(status1)
    })

    let json2 = {}
    Object.keys(json1).map((el, index) => {
        json2 = { ...json2, [el]: { ...json1[el], ['status']: status[index] } }
    })

    if (JSON.stringify(json2) !== JSON.stringify(correspondence)) {
        setCorrespondence({ ...json2 })
    }
}

async function changeStatusMessages(userId, correspondence, setCorrespondence, recipientOfCorrespondence) {
    Object.keys(correspondence[recipientOfCorrespondence['name']]).forEach(el => (
        el.match(/^\d+$/) != null ?
            correspondence[recipientOfCorrespondence['name']][el]['receiver'] == userId ?
                correspondence = { ...correspondence, [recipientOfCorrespondence['name']]: { ...correspondence[recipientOfCorrespondence['name']], ['status']: true, [el]: { ...correspondence[recipientOfCorrespondence['name']][el], ['status']: 'true' } } }
                : null
            : null
    ))

    setCorrespondence({ ...correspondence })

    let reply = await Send_Request_For_Database({ link: 'messages/update', sender: `${recipientOfCorrespondence['id']}`, receiver: `${userId}` })
}

async function deleteMessage(messageId, correspondence, setCorrespondence, recipientOfCorrespondence, setDeleteMessageId) {
    delete correspondence[recipientOfCorrespondence['name']][messageId]

    setCorrespondence({ ...correspondence })
    setDeleteMessageId(NaN)

    let reply = await Send_Request_For_Database({ link: 'messages/delete', id: `${messageId}` })
}

function Messages(props) {

    var userId = props.userId
    var userName = props.userName
    var setPage = props.setPage
    var recipientOfCorrespondence = props.recipientOfCorrespondence
    var setRecipientOfCorrespondence = props.setRecipientOfCorrespondence
    var [correspondence, setCorrespondence] = useState({})
    var [deleteMessageId, setDeleteMessageId] = useState(NaN)

    if (JSON.stringify(correspondence) === '{}') {
        getCorrespondence(userId, correspondence, setCorrespondence)
    }

    var messageRef = createRef()

    useEffect(() => {
        var messageList = document.getElementById("MessageContainer")
        if (messageList != null) {
            messageList.scrollTop = messageList.scrollHeight
        }
    }, [recipientOfCorrespondence, correspondence])


    async function send(userId, recipientOfCorrespondence, correspondence, setCorrespondence) {
        let today = new Date()

        let reply = await Send_Request_For_Database({ link: 'messages/set', sender: `${userId}`, receiver: `${recipientOfCorrespondence['id']}`, message: `${messageRef.current.value}`, date: today })
        let json = JSON.parse(reply)

        messageRef.current.value = ''

        setCorrespondence({ ...correspondence, [recipientOfCorrespondence['name']]: { ...correspondence[recipientOfCorrespondence['name']], [json[0]['id']]: { sender: userId, senderName: userName, receiver: `${recipientOfCorrespondence['id']}`, message: `${json[0]['message']}`, date: today } } })
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
                                    <div key={el}>
                                        <div>
                                            <div>
                                                <div onClick={() => setPage(correspondence[el]['senderId'])}> {el}
                                                    {
                                                        correspondence[el]['status'] == false ?
                                                            <svg height="1vh" width="1vh">
                                                                <circle cx="0.5vh" cy="0.5vh" r="0.4vh" stroke="darkgray" strokeWidth="0.2vh" fill="lightgreen" />
                                                            </svg>
                                                            :
                                                            null
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <button onClick={() => setRecipientOfCorrespondence({ 'id': correspondence[el]['senderId'], 'name': correspondence[el]['senderName'] })}> Correspondence </button>
                                            </div>
                                        </div>
                                    </div>
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
                                                            <div className={correspondence[recipientOfCorrespondence['name']][el]['status'] == 'true' ? 'Readed' : 'NoReaded'}>
                                                                <p> {correspondence[recipientOfCorrespondence['name']][el]['senderName']} </p>
                                                                <p> <button onClick={() => setDeleteMessageId(correspondence[recipientOfCorrespondence['name']][el]['id'])}> Delete </button> </p>
                                                                <samp> {GetTimeLife(correspondence[recipientOfCorrespondence['name']][el]['date'])} </samp>
                                                                <p> {correspondence[recipientOfCorrespondence['name']][el]['message']} </p>
                                                            </div>
                                                        </div>
                                                        : null
                                                )) : null
                                        }
                                    </div>
                                </div>
                                <div className='SendMessage'>
                                    <textarea ref={messageRef} placeholder='Your message:' onClick={() => changeStatusMessages(userId, correspondence, setCorrespondence, recipientOfCorrespondence)} />
                                    <button onClick={() => send(userId, recipientOfCorrespondence, correspondence, setCorrespondence)} > Send </button>
                                </div>
                            </div>
                        </div>
                    ) : null
            }
            {
                !isNaN(deleteMessageId) ?
                    <div className='DeleteMessage'>
                        <div>
                            <p> Do you want delete this message? </p>
                            <div>
                                <p> {correspondence[recipientOfCorrespondence['name']][deleteMessageId]['message']} </p>
                            </div>
                            <button onClick={() => deleteMessage(deleteMessageId, correspondence, setCorrespondence, recipientOfCorrespondence, setDeleteMessageId)}> Yes </button>
                            <button onClick={() => setDeleteMessageId(NaN)} > No </button>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    )
}

export default Messages;