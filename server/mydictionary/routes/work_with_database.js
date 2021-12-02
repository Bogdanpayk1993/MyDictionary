var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.post('/', function(req, res) {
    let conn = mysql.createConnection({
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
    });
});



module.exports = router;