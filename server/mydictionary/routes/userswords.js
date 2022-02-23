var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('dictionary.db');

router.post('/getUserWords', function (req, res) {
    const result = db.prepare(`SELECT userswords.id, userswords.userId, words.english, words.ukrainian FROM userswords JOIN words ON userswords.userId='${req['body']['userId']}' and words.id=userswords.wordId`).all()
    res.send(result)
})

router.post('/getUserIdWordId', function (req, res) {
    const result = db.prepare(`SELECT * FROM userswords WHERE userId='${req['body']['userId']}' and wordId='${req['body']['wordId']}'`).all()
    res.send(result)
})

router.post('/set', function (req, res) {
    db.serialize(function () {
        db.run(`INSERT INTO userswords (userId, wordId) VALUES ('${req['body']['userId']}','${req['body']['wordId']}')`)
        res.send('ok')
    })
})

router.post('/delete', function (req, res) {
    db.prepare(`DELETE FROM userswords WHERE id='${req['body']['id']}'`)
})

module.exports = router;