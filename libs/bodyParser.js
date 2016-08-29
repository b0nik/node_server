module.exports=function(req, cb) {
    let body=[];
    let result={};
    req.on('data',(chunk)=>{
        body.push(chunk)
    }).on('end',()=>{
        const data=body.toString().split('&');

        data.forEach((item)=>{
            let sp=item.split("=");
            result[sp[0]]=sp[1] ;
        });
        cb(null, result)
    })
};
