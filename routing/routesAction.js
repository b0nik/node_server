const router=require('./routes');

let types = {
    object: o => JSON.stringify(o),
    string: s => s,
    number: n => n + '',
    undefined: (route, par, client) => {
        const [req,res]=client;
        res.writeHead(404);
        return 'not found'
    },
    function: (fn, par, client) => fn(client, par)
};

function findAction(...client) {
    const [req,res]=client;
    let routing = router[req.method];
    let par;
    let route = routing[req.url];

    if (route === undefined) {
        for (let key in routing) {
            if (key.indexOf('*') !== -1) {
                if (routing.hasOwnProperty(key)) {
                    par = req.url.match(new RegExp(key));

                    if (par) {
                        par.shift();
                        route = routing[key];
                    }
                }
            }

        }
    }

    let rendered = types[typeof (route)];
    return rendered(route, par, client)
}


module.exports = function (req,res) {
    return findAction(req,res)
};
