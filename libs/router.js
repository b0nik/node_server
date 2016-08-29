class Router {
    constructor() {
        this.GET = {};
        this.POST={};
    }

    addGetMethod(url, fn) {
        if (url.indexOf('*') !== -1) {
            let rx = url.replace('*', '(.*)');
            this.GET[rx] = fn;
        } else {
            this.GET[url] = fn;
        }
    }
    addPostMethod(url,fn){
        this.POST[url] = fn;
    }
}

module.exports=Router;