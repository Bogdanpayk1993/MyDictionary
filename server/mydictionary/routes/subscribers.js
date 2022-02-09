var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('dictionary.db');

router.post('/getSubscribers', function (req, res) {
    db.serialize(function () {
        db.all(`SELECT users.id, users.name, users.email FROM subscribers JOIN users ON subscribers.subscriber='${req['body']['subscriber']}' AND subscribers.subscription==users.id`, function (err, result) {
            res.send(result)
        })
    })
});

router.post('/getSubscription', function (req, res) {
    db.serialize(function () {
        db.all(`SELECT users.id, users.name, users.email FROM subscribers JOIN users ON subscribers.subscription='${req['body']['subscription']}' AND subscribers.subscriber==users.id`, function (err, result) {
            res.send(result)
        })
    })
});

router.post('/getSubscriberSubscription', function (req, res) {
    db.serialize(function () {
        db.all(`SELECT * FROM subscribers WHERE subscriber='${req['body']['subscriber']}' and subscription='${req['body']['subscription']}'`, function (err, result) {
            res.send(result)
        })
    })
})

router.post('/set', function (req, res) {
    db.serialize(function () {
        db.run(`INSERT INTO subscribers (subscriber, subscription) VALUES ('${req['body']['subscriber']}','${req['body']['subscription']}')`)
    })
})

router.post('/delete', function (req, res) {
    db.serialize(function () {
        db.run(`DELETE FROM subscribers WHERE subscriber='${req['body']['subscriber']}' and subscription='${req['body']['subscription']}'`)
    })
})

module.exports = router;