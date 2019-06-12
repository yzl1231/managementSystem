var express = require('express');
var router = express.Router();
var db = require('./db.js');
var crypto = require('crypto');
var mongoose = require('mongoose');
/* GET users listing. */
//登录
router.post('/login', function(req, res, next) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    db.find("user", {"name": req.body.username},function(err,result){
        if(err){
          console.log(err)
          return
        }
        if(result.length===0){
            res.end('{"code":0,"data":"用户不存在"}'); //code为0，用户不存在
        }else if(result[0].password !== password){
            res.end('{"code":-1,"data":"密码错误"}'); //code为-1，密码错误
        }else if(result.length!==0&&result[0].password===password){
            // req.session.username = req.body.username; //存session
            // req.session.password = password;
            res.end('{"code":1,"data":"success"}');
        }
    });
});
// 注册
router.post('/enroll', function(req, res, next) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    db.insertOne("user", {"name": req.body.username,"password": password},function(err,result){
        if(err){
          console.log(err)
          res.end('{"code":-1,"data":"err"}')
          return
        }
        res.end('{"code":1,"data":"success"}')
    });
});
// 添加信息
router.post('/setItems', function(req, res, next) {
    let messageId = new Date().getTime().toString(); //获取时间戳
    let datas
    let collection = ''
    if(req.body.tab == 1){
        collection = 'content'
        datas = {
            "goodName": req.body.goodName,
            "type": req.body.type,
            "brand": req.body.brand,
            "agency": req.body.agency,
            "number": req.body.number,
            "img": req.body.img,
            "messageId": messageId
        }
    }else if(req.body.tab == 2){
        collection = 'orders'
        datas = {
            "orderTime": req.body.orderTime,
            "orderName": req.body.orderName,
            "type": req.body.type,
            "brand": req.body.brand,
            "purchaser": req.body.purchaser,
            "number": req.body.number,
            "messageId": messageId
        }
    }else if(req.body.tab == 3){
        collection = 'persons'
        datas = {
            "personName": req.body.personName,
            "sex": req.body.sex,
            "job": req.body.job,
            "address": req.body.address,
            "workTime": req.body.workTime,
            "img": req.body.img,
            "messageId": messageId
        }
    }
    db.insertOne(collection,datas,function(err,result){
        if(err){
          console.log(err)
          res.end('{"code":-1,"data":"err"}')
          return
        }
        res.end('{"code":1,"data":"success"}')
    });
});
//获取全部信息
router.post('/getItems', function(req, res, next) {
    var collection = ''
    switch(req.body.tab){
        case 1: collection = 'content'; break;
        case 2: collection = 'orders'; break;
        case 3: collection = 'persons'; 
    }
    db.find(collection,{},function(err,result){
        if(err){
            console.log(err)
            res.end('{"code":-1,"data":"err"}')
            return
        }
        res.send(result)
    });
});
//删除信息
router.post('/deleteItems', function(req, res, next) {
    var collection = ''
    switch(req.body.tab){
        case 1: collection = 'content'; break;
        case 2: collection = 'orders'; break;
        case 3: collection = 'persons'; 
    }
    db.deleteMany(collection, {
        "messageId": req.body.messageId
    },function(err,result){
        if(err){
          console.log(err)
          res.end('{"code":-1,"data":"err"}')
          return
        }
        res.end('{"code":1,"data":"success"}')
    });
});
//修改信息
router.post('/changeItems', function(req, res, next) {
    let datas
    let collection = ''
    if(req.body.tab == 1){
        collection = 'content'
        datas = {
            "goodName": req.body.goodName,
            "type": req.body.type,
            "brand": req.body.brand,
            "agency": req.body.agency,
            "number": req.body.number,
            "img": req.body.img
        }
    }else if(req.body.tab == 2){
        collection = 'orders'
        datas = {
            "orderTime": req.body.orderTime,
            "orderName": req.body.orderName,
            "type": req.body.type,
            "brand": req.body.brand,
            "purchaser": req.body.purchaser,
            "number": req.body.number
        }
    }else if(req.body.tab == 3){
        collection = 'persons'
        datas = {
            "personName": req.body.personName,
            "sex": req.body.sex,
            "job": req.body.job,
            "address": req.body.address,
            "workTime": req.body.workTime,
            "img": req.body.img
        }
    }
    db.update(collection, {"messageId": req.body.messageId},{$set:datas},function(err,result){
        if(err){
          console.log(err)
          res.end('{"code":-1,"data":"err"}')
          return
        }
        res.end('{"code":1,"data":"success"}')
    });
});
//搜索信息
router.post('/searchItems', function(req, res, next) {
    var collection = ''
    var searchDatas
    if(req.body.tab == 1){
        collection = 'content'
        searchDatas = {
            "agency": req.body.label
        }
    }else if(req.body.tab == 2){
        collection = 'orders'
        searchDatas = {
            "purchaser": req.body.label
        }
    }else if(req.body.tab == 3){
        collection = 'persons'
        searchDatas = {
            "job": req.body.label
        }
    }
    db.find(collection,searchDatas,function(err,result){
        if(err){
            console.log(err)
            res.end('{"code":-1,"data":"err"}')
            return
        }
        res.send(result)
    });
});
module.exports = router;
