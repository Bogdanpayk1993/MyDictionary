var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('dictionary.db');

router.post('/getWordId', function (req, res) {
  const result = db.prepare(`SELECT comments.id, comments.userId, comments.comment, users.name FROM comments JOIN users ON comments.wordId='${req['body']['wordId']}' AND comments.userId==users.id`).all()
  res.send(result)
})

router.post('/set', function (req, res) {
  db.serialize(function () {
    db.run(`INSERT INTO comments (wordId, userId, comment) VALUES ('${req['body']['wordId']}','${req['body']['userId']}','${req['body']['comment']}')`)
    res.send('ok')
  })
})

router.post('/delete', function (req, res) {
  db.prepare(`DELETE FROM comments WHERE id='${req['body']['id']}'`)
})

module.exports = router;