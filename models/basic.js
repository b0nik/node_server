class Models{
    constructor(url){
        this.cache=[];
        this.url=url ;
        var self=this;

        (()=>{
            app.fs.readFile(this.url, 'utf8',(err, data)=>{
                if(err) return console.log(err);
                this.cache=JSON.parse(data);
            });
        })();
    }

    getAll(){
        return new Promise((resolve,reject)=>{
            resolve(this.cache)
        })
    }
}

module.exports=Models;