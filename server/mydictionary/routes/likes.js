var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('dictionary.db');

router.post('/getWordId', function (req, res) {
    const result = db.prepare(`SELECT likes.id, likes.userId, users.name FROM likes JOIN users ON likes.wordId='${req['body']['wordId']}' AND likes.userId==users.id `).all()
    res.send(result)
})

router.post('/set', function (req, res) {
    db.serialize(function () {
        db.run(`INSERT INTO likes (wordId, userId) VALUES ('${req['body']['wordId']}','${req['body']['userId']}')`)
        res.send("ok")
    })
})

module.exports = router;