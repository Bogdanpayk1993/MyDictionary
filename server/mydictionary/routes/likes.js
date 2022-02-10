var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('dictionary.db');

router.post('/getWordId', function (req, res) {
    db.serialize(function () {
        db.all(`SELECT likes.id, likes.userId, users.name FROM likes JOIN users ON likes.wordId='${req['body']['wordId']}' AND likes.userId==users.id `, function (err, result) {
            res.send(result)
        })
    })
})

router.post('/set', function (req, res) {
    db.serialize(function () {
        db.run(`INSERT INTO likes (wordId, userId) VALUES ('${req['body']['wordId']}','${req['body']['userId']}')`)
        res.send("ok")
    })
})

module.exports = router;