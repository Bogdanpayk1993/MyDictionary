var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('dictionary.db');

router.post('/getWordId', function (req, res) {
  db.serialize(function () {
    db.all(`SELECT comments.id, comments.userId, comments.comment, users.name FROM comments JOIN users ON comments.wordId='${req['body']['wordId']}' AND comments.userId==users.id`, function (err, result) {
      res.send(result)
    })
  })
})

router.post('/set', function (req, res) {
    db.serialize(function() {
      db.run(`INSERT INTO comments (wordId, userId, comment) VALUES ('${req['body']['wordId']}','${req['body']['userId']}','${req['body']['comment']}')`)
      res.send('ok')
    })
})

router.post('/delete', function (req, res) {
  db.serialize(function () {
    db.run(`DELETE FROM comments WHERE id='${req['body']['id']}'`)
  })
})

module.exports = router;