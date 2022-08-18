var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('dictionary.db');

router.post('/set', function (req, res) {
    let result = db.prepare(`INSERT INTO notifications (userId, postId, action, date) SELECT '${req['body']['userId']}','${req['body']['postId']}','${req['body']['action']}','${req['body']['date']}'`).run()
    res.send(result)
})

module.exports = router;