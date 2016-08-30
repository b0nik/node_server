module.exports = function (req, cb) {
    let body = [];
    let result = {};

    return new Promise((resolve, reject)=> {
        req.on('data', (chunk)=> {
            body.push(chunk)
        }).on('end', ()=> {
            const data = body.toString().split('&');

            data.forEach((item)=> {
                let sp = item.split("=");
                result[sp[0]] = sp[1];
            });
            if (cb) {
                cb(null, result)
            }
            else {
                resolve(result)
            }
        })
    })

};
