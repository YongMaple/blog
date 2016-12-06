var fs = require('fs');
const filepath = __dirname + '/data.json';
var list;
try {
    list = JSON.parse(fs.readFileSync(filepath));
} catch (e) {
    list = [];
}

module.exports = {
    add(article) {
        list.push(article);
        this.store();
    },
    del(index) {
        list.splice(index, 1);
        this.store();
    },
    update(index, newArticle) {
        list.splice(index, 1, newArticle);
        this.store();
    },
    get list() {
        return list;
    },
    store(callback) {
        callback = callback || function(){};
        fs.writeFile(filepath, JSON.stringify(list), callback);
    }
}
