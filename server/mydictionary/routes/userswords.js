var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('dictionary.db');

router.post('/getUserWords', function (req, res) {
    const result = db.prepare(`SELECT userswords.id, userswords.userId, words.english, words.ukrainian FROM userswords JOIN words ON userswords.userId='${req['body']['userId']}' and words.id=userswords.wordId`).all()
    res.send(result)
})

router.post('/getUsersWords', function (req, res) {
    const result1 = db.prepare(`SELECT users.id AS userId, users.name, userswords.id, words.english, words.ukrainian FROM subscribers JOIN users ON subscribers.subscription=users.id JOIN userswords ON subscribers.subscriber='${req['body']['userId']}' and userswords.userId=subscribers.subscription JOIN words ON userswords.wordId=words.id`).all()
    const result2 = db.prepare(`SELECT userswords.userId, words.id, words.english, words.ukrainian FROM userswords JOIN words ON userswords.userId='${req['body']['userId']}' and userswords.wordId=words.id;`).all()
    const result = result1.concat(result2) 
    res.send(result)
})

router.post('/getUserIdWordId', function (req, res) {
    const result = db.prepare(`SELECT * FROM userswords WHERE userId='${req['body']['userId']}' and wordId='${req['body']['wordId']}'`).all()
    res.send(result)
})

router.post('/set', function (req, res) {
    let result = db.prepare(`INSERT INTO userswords (userId, wordId) SELECT '${req['body']['userId']}','${req['body']['wordId']}' WHERE not exists(SELECT * FROM userswords WHERE userId='${req['body']['userId']}' and wordId='${req['body']['wordId']}') RETURNING *`).all()
    res.send(result)
})

router.post('/delete', function (req, res) {
    db.prepare(`DELETE FROM userswords WHERE id='${req['body']['id']}'`).run()
})

module.exports = router;