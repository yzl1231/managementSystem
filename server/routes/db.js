var MongoClient = require('mongodb').MongoClient;
//连接数据库
function __connectDB(callback){
    var url = 'mongodb://localhost:27017/msystem';
    MongoClient.connect(url, function(err,db){
        if(err){
            callback(err,null);
            db.close();
            return;
        }
        // console.log('连接成功')
        callback(err,db);
    });
}
//增加数据
exports.insertOne = function(collectionName,json,callback){
    __connectDB(function(err,db){
        db.collection(collectionName).insertOne(json,function(err,result){
            callback(err,result);
            db.close();
        })
    })
}
//删除数据
exports.deleteMany = function(collectionName,json,callback){
    __connectDB(function(err,db){
        db.collection(collectionName).deleteMany(json,function(err,result){
            callback(err,result);
            db.close();
        })
    })
}
//修改数据,json1是先找到修改==谁==，json2是==怎么改==
exports.update = function(collectionName,json1,json2,callback){
    __connectDB(function(err,db){
        db.collection(collectionName).updateMany(json1,json2,function(err,result){
            callback(err,result)
        })
    })
}
//查找数据
exports.find = function(collectionName,json,callback){
    var result = [];  //返回的数组  
    // if(arguments.length != 3){
    //     callback("find函数接受3个参数",null);
    //     return;
    // }
    __connectDB(function(err,db){
        var cursor = db.collection(collectionName).find(json);
        cursor.each(function(err, doc){
            if(err){
                callback(err,null);
                db.close();
                return;
            }
            if(doc != null){
                result.push(doc);
            }else{
                //遍历结束
                callback(null,result);
                db.close();
            }
        })
    })
}