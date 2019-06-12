var express = require('express');
var router = express.Router();
var db = require('./db.js');

router.post('/setItem', function(req, res, next) {
    db.insertOne("content", {
        "name": req.body.username,
        "type": req.body.type,
        "brand": req.body.brand,
        "agency": req.body.agency,
        "number": req.body.number,
        "img": req.body.img
    },function(err,result){
        if(err){
          consolr.log(err)
          res.end('{"code":-1,"data":"err"}')
          return
        }
        res.end('{"code":1,"data":"success"}')
    });
});



module.exports = router;