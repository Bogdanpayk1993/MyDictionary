var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('dictionary.db');

router.post('/set', function (req, res) {
    let result = db.prepare(`INSERT INTO resultstests (wordCounter, trueAnswersCounter) VALUES ('${req['body']['wordCounter']}','${req['body']['trueAnswersCounter']}') RETURNING *`).all()
    res.send(result)
})

module.exports = router;