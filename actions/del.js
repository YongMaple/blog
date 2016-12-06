'use strict'

var database = require('../database.js')
var getId = require('../utils/getId')
var indexAction = require('./index')
var loginAction = require('./login');

module.exports = function del(req,res){
    if(!req.session.isLogined){
        loginAction(req,res);
        return;
    }

    getId(req,id => {
        database.del(id);
        indexAction(req,res);
    })
}
