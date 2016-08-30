class Model{
    constructor(url){
        this.cache=[];
        this.url=url ;

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
    add(obj,cb){
        this.cache.push(obj);
        return new Promise((resolve,reject)=>{
            app.fs.writeFile(this.url, JSON.stringify(this.cache), (err)=> {
                if (err) {
                    reject(err)
                }else{
                    resolve(null)
                }
            });
        });
    }
}

module.exports=Model;