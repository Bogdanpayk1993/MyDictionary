var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('dictionary.db');

router.post('/getSubscribers', function (req, res) {
    const result = db.prepare(`SELECT users.id, users.name, users.email FROM subscribers JOIN users ON subscribers.subscriber='${req['body']['subscriber']}' AND subscribers.subscription==users.id`).all()
    res.send(result)
});

router.post('/getSubscribersOther', function (req, res) {
    const result = db.prepare(`SELECT users.id, users.name, subscribers2.subscriber FROM users JOIN subscribers subscribers1 ON subscribers1.subscriber='${req['body']['userId']}' and subscribers1.subscription==users.id LEFT OUTER JOIN subscribers subscribers2 ON subscribers2.subscriber=='${req['body']['globalUserId']}' and subscribers2.subscription=users.id`).all()
    res.send(result)
})

router.post('/getSubscription', function (req, res) {
    const result = db.prepare(`SELECT users.id, users.name, users.email FROM subscribers JOIN users ON subscribers.subscription='${req['body']['subscription']}' AND subscribers.subscriber==users.id`).all()
    res.send(result)
});

router.post('/getSubscriptionOther', function (req, res) {
    const result = db.prepare(`SELECT users.id, users.name, subscribers2.subscriber FROM users JOIN subscribers subscribers1 ON subscribers1.subscription='${req['body']['userId']}' and subscribers1.subscriber==users.id LEFT OUTER JOIN subscribers subscribers2 ON subscribers2.subscriber=='${req['body']['globalUserId']}' and subscribers2.subscription=users.id`).all()
    res.send(result)
})

router.post('/getSubscriberSubscription', function (req, res) {
    const result = db.prepare(`SELECT * FROM subscribers WHERE subscriber='${req['body']['subscriber']}' and subscription='${req['body']['subscription']}'`).all()
    res.send(result)
})

router.post('/getUserSubscriberSubscription', function (req, res) {
    let request
    if (req['body']['wantedPerson'] == '') {
        request = `SELECT users.id, users.name, subscribers.subscriber FROM users LEFT OUTER JOIN subscribers ON subscribers.subscriber=='${req['body']['subscriber']}' and subscribers.subscription==users.id`
    } else {
        request = `SELECT users.id, users.name, subscribers.subscriber FROM users JOIN subscribers ON subscribers.subscriber=='${req['body']['subscriber']}' and subscribers.subscription==users.id and users.name=='${req['body']['wantedPerson']}'`
    }

    const result = db.prepare(request).all()
    res.send(result)
})

router.post('/getUserIdSubscriberSubscription', function (req, res) {
    let reply = db.prepare(`SELECT name FROM users WHERE id=${req['body']['userId']}`).all()
    let reply1 = db.prepare(`SELECT id FROM subscribers WHERE subscriber='${req['body']['subscriber']}' and subscription='${req['body']['userId']}'`).all()
    if (reply1.length != 0) {
        reply = {name: reply[0]['name'], subscriber: reply1[0]['id']}
    } else {
        reply = {name: reply[0]['name'], subscriber: 0}
    }
    res.send(reply)
})

router.post('/set', function (req, res) {
    let result = db.prepare(`INSERT INTO subscribers (subscriber, subscription) SELECT '${req['body']['subscriber']}','${req['body']['subscription']}'`).run()
    result = db.prepare(`SELECT * FROM users WHERE id='${req['body']['subscription']}'`).all()
    res.send(result)
})

router.post('/delete', function (req, res) {
    db.prepare(`DELETE FROM subscribers WHERE subscriber='${req['body']['subscriber']}' and subscription='${req['body']['subscription']}'`).run()
})

module.exports = router;