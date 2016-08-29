module.exports = class Cache{
    constructor(){
        this.cacheStorage={}
    }

    update(url, data){
        this.cacheStorage[url]=data
    }

    find(url){
        if(this.cacheStorage[url]){
            return this.cacheStorage[url]
        }
    }

    add(url,data){
        if(!this.cacheStorage[url]){
            this.cacheStorage[url]=data
        }
    }

    delete(url){
        if(this.cacheStorage[url]){
            delete this.cacheStorage[url];
        }
    }
};