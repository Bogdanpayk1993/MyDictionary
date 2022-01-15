var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('dictionary.db');

router.post('/getUserId', function (req, res) {
    db.serialize(function () {
        db.all(`SELECT * FROM userswords WHERE userId='${req['body']['userId']}'`, function (err, result) {
            res.send(result)
        })
    })
})

router.post('/getUserIdWordId', function (req, res) {
    db.serialize(function () {
        db.all(`SELECT * FROM userswords WHERE userId='${req['body']['userId']}' and wordId='${req['body']['wordId']}'`, function (err, result) {
            res.send(result)
        })
    })
})

router.post('/set', function (req, res) {
    db.serialize(function () {
        db.run(`INSERT INTO userswords (userId, wordId) VALUES ('${req['body']['userId']}','${req['body']['wordId']}')`)
        res.send('ok')
    })
})

router.post('/delete', function (req, res) {
    db.serialize(function () {
        db.run(`DELETE FROM userswords WHERE id='${req['body']['id']}'`)
    })
})

module.exports = router;