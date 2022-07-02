var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('dictionary.db');

router.post('/getUserPosts', function (req, res) {
    const result = db.prepare(`SELECT usersposts.id, usersposts.type, usersposts.userId, usersposts.date, words.english, words.ukrainian FROM usersposts JOIN words ON usersposts.userId='${req['body']['userId']}' and words.id=usersposts.postId`).all()
    res.send(result)
})

router.post('/getUsersPosts', function (req, res) {
    const result1 = db.prepare(`SELECT usersposts.id, usersposts.type, usersposts.date, users.id AS userId, users.name, words.english, words.ukrainian FROM subscribers JOIN users ON subscribers.subscription=users.id JOIN usersposts ON subscribers.subscriber='${req['body']['userId']}' and usersposts.userId=subscribers.subscription JOIN words ON usersposts.postId=words.id`).all()
    const result2 = db.prepare(`SELECT usersposts.id, usersposts.type, usersposts.date, usersposts.userId, words.english, words.ukrainian FROM usersposts JOIN words ON usersposts.userId='${req['body']['userId']}' and usersposts.postId=words.id`).all()
    const result = result1.concat(result2) 
    res.send(result)
})

router.post('/set', function (req, res) {
    let result = db.prepare(`INSERT INTO usersposts (type, userId, postId, date) SELECT '${req['body']['type']}','${req['body']['userId']}','${req['body']['postId']}', '${req['body']['date']}' WHERE not exists(SELECT * FROM usersposts WHERE type='${req['body']['type']}' and userId='${req['body']['userId']}' and postId='${req['body']['postId']}') RETURNING *`).all()
    res.send(result)
})

router.post('/delete', function (req, res) {
    db.prepare(`DELETE FROM usersposts WHERE id='${req['body']['id']}'`).run()
})

module.exports = router;