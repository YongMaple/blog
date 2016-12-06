'use strict'
var EditPager = require('../views/EditPager')
var database = require('../database')
var query = require('../utils/query')
var post = require('../utils/post')
var indexAction = require('./index')
var loginAction = require('./login');

module.exports = function(req,res){
    if(!req.session.isLogined){
        loginAction(req,res);
        return;
    }
    if(req.method === 'GET'){
        var id = query(req).id;
        var article =  database.list[id];
        var errors = {};
        res.end(new EditPager(id,article,errors,req.session.isLogined).render());
    }else{
        post(req).then(data =>{
            //两种写法
            // let {id,title,body} = data;
            // database.update(id,{title,body});
            let id = data.id;
            delete data.id;
            database.update(id,data);
            indexAction(req,res);
        })
    }
}
