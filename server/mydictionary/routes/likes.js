var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('dictionary.db');

router.post('/getPostId', function (req, res) {
    const result = db.prepare(`SELECT likes.id, likes.userId, users.name FROM likes JOIN users ON likes.postId='${req['body']['postId']}' AND likes.userId==users.id `).all()
    res.send(result)
})

router.post('/set', function (req, res) {
    let result = db.prepare(`INSERT INTO likes (postId, userId) VALUES ('${req['body']['postId']}','${req['body']['userId']}') RETURNING *`).all()
    res.send(result)
})

module.exports = router;