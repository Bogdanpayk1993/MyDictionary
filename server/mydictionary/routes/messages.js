var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('dictionary.db');

router.post('/get', function (req, res) {
    const result = db.prepare(`SELECT message.id, message.sender, message.receiver, message.message, message.status, message.date, sender.name AS senderName, receiver.name AS receiverName FROM message JOIN users sender ON (message.sender==${req['body']['sender']} or message.receiver==${req['body']['sender']}) and message.sender==sender.id JOIN users receiver ON message.receiver == receiver.id`).all()
    res.send(result)
})

router.post('/set', function (req, res) {
    const result = db.prepare(`INSERT INTO message (sender, receiver, message, status, date) VALUES ('${req['body']['sender']}','${req['body']['receiver']}','${req['body']['message']}','false','${req['body']['date']}') RETURNING *`).all()
    res.send(result)
})

module.exports = router;