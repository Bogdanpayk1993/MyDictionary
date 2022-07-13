var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('dictionary.db');

router.post('/set', function (req, res) {
    const result = db.prepare(`INSERT INTO tasksforfriendswords (taskForFriendId, wordId) VALUES ('${req['body']['taskForFriendId']}', '${req['body']['wordId']}') RETURNING *`).all()
    res.send(result)
})

module.exports = router;