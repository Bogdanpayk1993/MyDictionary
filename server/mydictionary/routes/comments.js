var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('dictionary.db');

router.post('/getPostId', function (req, res) {
  const result = db.prepare(`SELECT comments.id, comments.userId, comments.comment, comments.date, users.name FROM comments JOIN users ON comments.postId='${req['body']['postId']}' AND comments.userId==users.id`).all()
  res.send(result)
})

router.post('/set', function (req, res) {
  db.prepare(`INSERT INTO comments (userId, postId, comment, date) VALUES ('${req['body']['userId']}','${req['body']['postId']}','${req['body']['comment']}','${req['body']['date']}')`).run()
})

router.post('/delete', function (req, res) {
  db.prepare(`DELETE FROM comments WHERE id='${req['body']['id']}'`).run()
})

module.exports = router;