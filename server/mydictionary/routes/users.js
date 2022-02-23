var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('dictionary.db');

router.post('/getId', function (req, res) {
  const result = db.prepare(`SELECT * FROM users WHERE id='${req['body']['id']}'`).all()
  res.send(result)
})

router.post('/getName', function (req, res) {   
  
  let request   
  if (req['body']['wantedName'] == '') {
    request = `SELECT * FROM users`
  } else {
    request = `SELECT * FROM users WHERE name='${req['body']['wantedName']}'`
  }

  const result = db.prepare(request).all()
  res.send(result)
});

router.post('/getEmail', function (req, res) {
    const result = db.prepare(`SELECT id, name, email FROM users WHERE email='${req['body']['wantedEmail']}'`).all()
    res.send(result)
})

router.post('/set', function (req, res) {
  db.serialize(function() {
    db.run(`INSERT INTO users (name, email) VALUES ('${req['body']['userName']}','${req['body']['userEmail']}')`)
    res.send("ok")
  })
})

module.exports = router;
