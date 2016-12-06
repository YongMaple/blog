var IndexPager = require('../views/IndexPager')
var database = require('../database');

module.exports = function(req,res){
    res.end(new IndexPager(database.list,req.session.isLogined).render());
};
