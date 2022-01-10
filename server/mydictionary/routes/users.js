var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('dictionary.db');

router.post('/getId', function (req, res) {
  db.serialize(async function () {
    await db.all(`SELECT * FROM users WHERE id='${req['body']['id']}'`, function (err, result) {
      res.send(result)
    })
  })
})

router.post('/getName', function (req, res) {   
  
  let request   
  if (req['body']['wantedName'] == '') {
    request = `SELECT * FROM users`
  } else {
    request = `SELECT * FROM users WHERE name='${req['body']['wantedName']}'`
  }

  db.serialize(async function () {
    await db.all(request, function (err, result) {
      res.send(result)
    })
  })
});

router.post('/getEmail', function (req, res) {
  db.serialize(async function() {
    await db.all(`SELECT * FROM users WHERE email='${req['body']['wantedEmail']}'`, function(err, result) {
      res.send(result)
    })
  })
})

router.post('/set', function (req, res) {
  db.serialize(async function() {
    await db.run(`INSERT INTO users (name, email) VALUES ('${req['body']['userName']}','${req['body']['userEmail']}')`)
    res.send("ok")
  })
})

module.exports = router;
