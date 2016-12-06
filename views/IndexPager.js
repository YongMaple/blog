'user strict';
var AbstractPager =require('./AbstractPager.js');

class IndexPager extends AbstractPager{
    constructor(articleList,isLogined){
        super(isLogined);
        this.list = articleList;
    }

    _render(){
        let listDomString =  this.list.map( (article,index) => `
            <li class="list-group-item">
            <h3>${article.title}</h3>
            <p>${article.body}</p>
            <div class="${this.isLogined ? '' :'hidden'}">
                <a href="/del?id=${index}"> DEL </a>
                <a href="/update?id=${index}"> UPDATE </a>
            </div>
            </li>
            `).join('');

        return `
            <ul class="list-group">
                ${listDomString}
            </ul>
        `;
    }
}
module.exports = IndexPager;
