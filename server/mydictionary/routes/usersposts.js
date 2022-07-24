var express = require('express');
var router = express.Router();
var BetterSqlite3 = require('better-sqlite3');
var db = new BetterSqlite3('dictionary.db');

router.post('/getUserWords', function (req, res) {
    const result = db.prepare(`SELECT usersposts.id, usersposts.type, usersposts.userId, usersposts.date, words.Id AS wordId, words.english, words.ukrainian FROM usersposts JOIN words ON usersposts.type='Word' and usersposts.userId='${req['body']['userId']}' and words.id=usersposts.postId`).all()
    res.send(result)
})

router.post('/getUserTests', function (req, res) {
    const result = db.prepare(`SELECT usersposts.id, usersposts.type, usersposts.userId, usersposts.date, resultstests.wordCounter, resultstests.trueAnswersCounter FROM usersposts JOIN resultstests ON usersposts.type='Test' and usersposts.userId='${req['body']['userId']}' and resultstests.id=usersposts.postId`).all()
    res.send(result)
})

router.post('/getUserTestsFromFriends', function (req, res) {
    const result = db.prepare(`SELECT usersposts.id, usersposts.type, usersposts.date, tasksforfriends.id AS tasksforfriendsId, tasksforfriends.senderId, tasksforfriends.receiverId AS userId, tasksforfriends.taskLanguage, tasksforfriends.wordCounter, tasksforfriends.trueAnswerCounter, users.name AS senderName FROM usersposts JOIN tasksforfriends ON usersposts.type='TaskForFriend' and usersposts.userId='${req['body']['userId']}' and tasksforfriends.id=usersposts.postId JOIN users ON tasksforfriends.senderId=users.id`).all()
    res.send(result)
})

router.post('/getUsersPosts', function (req, res) {
    const result1 = db.prepare(`SELECT usersposts.id, usersposts.type, usersposts.date, users.id AS userId, users.name, words.english, words.ukrainian FROM subscribers JOIN users ON subscribers.subscription=users.id JOIN usersposts ON subscribers.subscriber='${req['body']['userId']}' and usersposts.userId=subscribers.subscription JOIN words ON usersposts.type='Word' and usersposts.postId=words.id`).all()
    const result2 = db.prepare(`SELECT usersposts.id, usersposts.type, usersposts.date, usersposts.userId, words.english, words.ukrainian FROM usersposts JOIN words ON usersposts.type='Word' and usersposts.userId='${req['body']['userId']}' and usersposts.postId=words.id`).all()
    const result3 = db.prepare(`SELECT usersposts.id, usersposts.type, usersposts.date, users.id AS userId, users.name, resultstests.wordCounter, resultstests.trueAnswersCounter FROM subscribers JOIN users ON subscribers.subscription=users.id JOIN usersposts ON subscribers.subscriber='${req['body']['userId']}' and usersposts.userId=subscribers.subscription JOIN resultstests ON usersposts.type='Test' and usersposts.postId=resultstests.id`).all()
    const result4 = db.prepare(`SELECT usersposts.id, usersposts.type, usersposts.date, usersposts.userId, resultstests.wordCounter, resultstests.trueAnswersCounter FROM usersposts JOIN resultstests ON usersposts.type='Test' and usersposts.userId='${req['body']['userId']}' and usersposts.postId=resultstests.id`).all()
    const result5 = db.prepare(`SELECT usersposts.id, usersposts.type, usersposts.date, usersposts.userId, tasksforfriends.id AS tasksforfriendsId, tasksforfriends.senderId, tasksforfriends.receiverId, tasksforfriends.taskLanguage, tasksforfriends.wordCounter, tasksforfriends.trueAnswerCounter, users1.name AS senderName, users2.name AS receiverName FROM usersposts JOIN tasksforfriends ON usersposts.userId='${req['body']['userId']}' and usersposts.type='TaskForFriend' and usersposts.postId=tasksforfriends.id JOIN users users1 ON tasksforfriends.senderId=users1.id JOIN users users2 ON tasksforfriends.receiverId=users2.id`).all()
    const result6 = db.prepare(`SELECT usersposts.id, usersposts.type, usersposts.date, usersposts.userId, tasksforfriends.id AS tasksforfriendsId, tasksforfriends.senderId, tasksforfriends.receiverId, tasksforfriends.taskLanguage, tasksforfriends.wordCounter, tasksforfriends.trueAnswerCounter, users1.name AS senderName, users2.name AS receiverName FROM subscribers JOIN users users3 ON subscribers.subscription=users3.id JOIN usersposts ON subscribers.subscriber='${req['body']['userId']}' and usersposts.userId=subscribers.subscription JOIN tasksforfriends ON usersposts.userId=subscribers.subscription and usersposts.type='TaskForFriend' and usersposts.postId=tasksforfriends.id JOIN users users1 ON tasksforfriends.senderId=users1.id JOIN users users2 ON tasksforfriends.receiverId=users2.id`).all()
   
    const result = result1.concat(result2.concat(result3.concat(result4.concat(result5.concat(result6))))) 
    res.send(result)
})

router.post('/set', function (req, res) {
    let result = db.prepare(`INSERT INTO usersposts (type, userId, postId, date) SELECT '${req['body']['type']}','${req['body']['userId']}','${req['body']['postId']}', '${req['body']['date']}' WHERE not exists(SELECT * FROM usersposts WHERE type='${req['body']['type']}' and userId='${req['body']['userId']}' and postId='${req['body']['postId']}') RETURNING *`).all()
    res.send(result)
})

router.post('/delete', function (req, res) {
    db.prepare(`DELETE FROM usersposts WHERE id='${req['body']['id']}'`).run()
})

module.exports = router;