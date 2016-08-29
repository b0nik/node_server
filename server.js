global.app={};
app.http=require('http');
app.fs=require('fs');
app.config=require('./config');
app.log=require('./libs/log');
app.cookie=require('./libs/cookiesParse');
app.routes=require('./routing/routesAction');
const Cache=require('./libs/cache');
app.cache=new Cache();

const server=app.http.createServer();

server.on('request',(req,res)=>{
    app.cookies=app.cookie(req.headers.cookie);
    app.log(req.method, req.url);
    const result = app.routes(req,res);

    if(app.cache.find(req.url)){
        res.end(app.cache.find(req.url));
    }
    else if(result instanceof Promise){
        result.then((result)=>{
            if(req.method==="GET") app.cache.add(req.url, result);
            res.end(result);
        })
    }
    else {
        if(req.method==="GET") app.cache.add(req.url, result);
        res.end(result);
    }

});

server.listen(app.config.port, console.log(`server start on port ${app.config.port}`));