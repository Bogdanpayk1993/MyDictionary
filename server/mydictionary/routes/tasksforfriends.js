var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('dictionary.db');

router.post('/set', function (req, res) {
    const result = db.prepare(`INSERT INTO tasksforfriends (senderId, receiverId, taskLanguage, wordCounter, trueAnswerCounter) VALUES ('${req['body']['senderId']}', '${req['body']['receiverId']}', '${req['body']['taskLanguage']}', '${req['body']['wordCounter']}', '${req['body']['trueAnswerCounter']}') RETURNING *`).all()
    res.send(result)
})

router.post('/update', function (req, res) {
    const result = db.prepare(`UPDATE tasksforfriends SET trueAnswerCounter='${req['body']['trueAnswerCounter']}' WHERE id='${req['body']['taskforfriendId']}'`).run()
})

module.exports = router;