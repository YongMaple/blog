'use strict';

class AbstractPager{
    constructor(isLogined){
        this.isLogined = isLogined;
    }
    _render(){
        throw new Error('子类必须实现');
    }
    render(){
        return `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta  charset="utf-8" />
                    <link rel='stylesheet' href='//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css' />
                </head>
                <body class="container">

                    <div class="jumbotron">
                        <h1> Node.js Blog Demo </h1>
                    </div>
                    
                    <div>
                        <a href="/login" class="${this.isLogined ? 'hidden' :''} btn btn-success">登录</a>
                        <a href="/logout" class="${this.isLogined ? '' :'hidden'} btn btn-default">退出</a>
                        <a href="/add" class="${this.isLogined ? '' :'hidden'} btn btn-success">添加</a>
                    </div>
                    ${this._render()}
                </body>
            </html>
        `
    }
}
module.exports = AbstractPager;
