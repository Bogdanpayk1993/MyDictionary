var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('dictionary.db');

router.post('/set', function (req, res) {
    let result = db.prepare(`INSERT INTO words (english, ukrainian) SELECT '${req['body']['english']}','${req['body']['ukrainian']}' WHERE not exists(SELECT * FROM words WHERE english='${req['body']['english']}' and ukrainian='${req['body']['ukrainian']}') RETURNING *`).all()
    result.length == 0 ?
        result = db.prepare(`SELECT * FROM words WHERE english='${req['body']['english']}' and ukrainian='${req['body']['ukrainian']}'`).all()
        : null
    res.send(result)
})

module.exports = router;