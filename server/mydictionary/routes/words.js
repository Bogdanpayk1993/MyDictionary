var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('dictionary.db');

router.post('/getId', function (req, res) {
    db.serialize(function () {
        db.all(`SELECT * FROM words WHERE id='${req['body']['id']}'`, function (err, result) {
            res.send(result)
        }) 
    })
})

router.post('/getEnglishUkrainian', function (req, res) {
    db.serialize(function () {
        db.all(`SELECT * FROM words WHERE english='${req['body']['english']}' and ukrainian='${req['body']['ukrainian']}'`, function (err, result) {{
            res.send(result)
        }})
    })
})

router.post('/set', function (req, res) {
    db.serialize(function () {
        db.run(`INSERT INTO words (english, ukrainian) VALUES ('${req['body']['english']}','${req['body']['ukrainian']}')`)
        res.send('ok')
    })
})

module.exports = router;