var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('dictionary.db');

router.post('/', function (req, res) {
    /*let conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "mydictionary",
        password: ""
    });

    conn.connect(err => {
        if (err) {
            console.log(err);
            return err;
        } else {
            console.log('Open');
        }
    });

    conn.query(req.body.require, (err, result) => {
        console.log(err);
        res.send(result);
    });

    conn.end(err => {
        if (err) {
            console.log(err);
            return err;
        } else {
            console.log('Close');
        }
    });*/
    db.serialize(async function () {
        console.log("Open");
        if (req.body.require[0] == "S") {
            await db.all(req.body.require, function (err, result) {
                console.log(req.body.require)
                console.log(result)
                res.send(result)
            })
        }
        if (req.body.require[0] == "I") {
            await db.run(req.body.require, function (err, result) {
                console.log(req.body.require)
                console.log(result)
                res.send(result);
            })
              
        }
        console.log("Closed");
    })
});

module.exports = router;