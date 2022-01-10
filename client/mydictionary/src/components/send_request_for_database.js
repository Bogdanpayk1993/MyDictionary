async function Send_Request_For_Database(request) {
    let reply
    await fetch(`http://localhost:9000/${request['link']}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    })
        .then(res => res.text())
        .then(res => reply = res)
    return reply
}

export default Send_Request_For_Database