async function Work_With_Database(request) {
    let reply
    await fetch("http://localhost:9000/database", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    })
        .then(res => res.text())
        .then(res => reply = res)
    return reply
}

export default Work_With_Database