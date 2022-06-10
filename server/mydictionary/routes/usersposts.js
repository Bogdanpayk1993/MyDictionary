var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('dictionary.db');

router.post('/getUserWords', function (req, res) {
    const result = db.prepare(`SELECT usersposts.id, usersposts.userId, words.english, words.ukrainian FROM usersposts JOIN words ON usersposts.userId='${req['body']['userId']}' and words.id=usersposts.postsId`).all()
    res.send(result)
})

router.post('/getUsersWords', function (req, res) {
    const result1 = db.prepare(`SELECT usersposts.id, users.id AS userId, users.name, words.english, words.ukrainian FROM subscribers JOIN users ON subscribers.subscription=users.id JOIN usersposts ON subscribers.subscriber='${req['body']['userId']}' and usersposts.userId=subscribers.subscription JOIN words ON usersposts.postsId=words.id`).all()
    const result2 = db.prepare(`SELECT usersposts.id, usersposts.userId, words.english, words.ukrainian FROM usersposts JOIN words ON usersposts.userId='${req['body']['userId']}' and usersposts.postsId=words.id`).all()
    const result = result1.concat(result2) 
    res.send(result)
})

router.post('/set', function (req, res) {
    let result = db.prepare(`INSERT INTO usersposts (type, userId, postsId, date) SELECT 'Word','${req['body']['userId']}','${req['body']['wordId']}', '${req['body']['date']}' WHERE not exists(SELECT * FROM usersposts WHERE userId='${req['body']['userId']}' and postsId='${req['body']['wordId']}') RETURNING *`).all()
    res.send(result)
})

router.post('/delete', function (req, res) {
    db.prepare(`DELETE FROM usersposts WHERE id='${req['body']['id']}'`).run()
})

module.exports = router;