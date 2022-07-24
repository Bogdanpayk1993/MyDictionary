var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('dictionary.db');

router.post('/getId', function (req, res) {
    const result = db.prepare(`SELECT tasksforfriendswords.id, words.english, words.ukrainian FROM tasksforfriendswords JOIN words ON tasksforfriendswords.taskForFriendId=${req['body']['postId']} and tasksforfriendswords.wordId=words.id`).all()
    res.send(result)
})

router.post('/set', function (req, res) {
    const result = db.prepare(`INSERT INTO tasksforfriendswords (taskForFriendId, wordId) VALUES ('${req['body']['taskForFriendId']}', '${req['body']['wordId']}') RETURNING *`).all()
    res.send(result)
})

module.exports = router;