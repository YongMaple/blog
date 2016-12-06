'use strict'
var database = require('../database');
var AddPager = require('../views/AddPager');
var IndexPager = require('../views/IndexPager');
var loginAction = require('./login');
var post = require('../utils/post');

module.exports = function(req,res){
    if(!req.session.isLogined){
        loginAction(req,res);
        return;
    }

    if(req.method ==="GET"){
        res.end(new AddPager({},req.session.isLogined).render());
    }else{
        post(req).then(function(data){
            var errors = {};
            if(!(data.title && data.title.length >= 5)){
                errors.title = 'title char length >=5';
            }
            if(!(data.body && data.body.length >= 10)){
                errors.body = 'body char length >=10';
            }
            if(!(data.vnum === req.session.vnum)){
                errors.vnum = '验证码错误';
            }

            if(Object.keys(errors).length){
                res.writeHead(200,'Content-Type','text/html');
                res.end(new AddPager(errors,req.session.isLogined).render());
            }else{
                database.add(data);
                res.end(new IndexPager(database.list,req.session.isLogined).render());
            }
        })
    }
}
