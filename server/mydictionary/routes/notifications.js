var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('dictionary.db');

router.post('/get', function (req, res) {
    let result = db.prepare(`SELECT notifications.id, notifications.sender, notifications.receiver, notifications.postId, notifications.action, notifications.date FROM notifications JOIN subscribers ON (notifications.sender=subscribers.subscriber or notifications.receiver=subscribers.subscriber) and subscribers.subscription=${req['body']['userId']}`).all()
    res.send(result)
})

router.post('/set', function (req, res) {
    let result = db.prepare(`INSERT INTO notifications (sender, receiver, postId, action, date) SELECT '${req['body']['sender']}','${req['body']['receiver']}','${req['body']['postId']}','${req['body']['action']}','${req['body']['date']}'`).run()
    res.send(result)
})

module.exports = router;