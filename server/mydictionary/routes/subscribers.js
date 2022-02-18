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

router.post('/getSubscribersOther', function (req, res) {
    db.serialize(function () {
        db.all(`SELECT users.id, users.name, subscribers2.subscriber FROM users JOIN subscribers subscribers1 ON subscribers1.subscriber='${req['body']['userId']}' and subscribers1.subscription==users.id LEFT OUTER JOIN subscribers subscribers2 ON subscribers2.subscriber=='${req['body']['globalUserId']}' and subscribers2.subscription=users.id`, function (err, result) {
            res.send(result)
        })
    })
})

router.post('/getSubscription', function (req, res) {
    db.serialize(function () {
        db.all(`SELECT users.id, users.name, users.email FROM subscribers JOIN users ON subscribers.subscription='${req['body']['subscription']}' AND subscribers.subscriber==users.id`, function (err, result) {
            res.send(result)
        })
    })
});

router.post('/getSubscriptionOther', function (req, res) {
    db.serialize(function () {
        db.all(`SELECT users.id, users.name, subscribers2.subscriber FROM users JOIN subscribers subscribers1 ON subscribers1.subscription='${req['body']['userId']}' and subscribers1.subscriber==users.id LEFT OUTER JOIN subscribers subscribers2 ON subscribers2.subscriber=='${req['body']['globalUserId']}' and subscribers2.subscription=users.id`, function (err, result) {
            res.send(result)
        })
    })
})

router.post('/getSubscriberSubscription', function (req, res) {
    db.serialize(function () {
        db.all(`SELECT * FROM subscribers WHERE subscriber='${req['body']['subscriber']}' and subscription='${req['body']['subscription']}'`, function (err, result) {
            res.send(result)
        })
    })
})

router.post('/getUserSubscriberSubscription', function (req, res) {    
    let request
    if (req['body']['wantedPerson'] == '') {
        request = `SELECT users.id, users.name, subscribers.subscriber FROM users LEFT OUTER JOIN subscribers ON subscribers.subscriber=='${req['body']['subscriber']}' and subscribers.subscription==users.id`
    } else {
        request = `SELECT users.id, users.name, subscribers.subscriber FROM users JOIN subscribers ON subscribers.subscriber=='${req['body']['subscriber']}' and subscribers.subscription==users.id and users.name=='${req['body']['wantedPerson']}'`
    }

    db.serialize(function () {
        db.all(request, function (err, result) {
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