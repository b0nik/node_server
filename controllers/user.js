const bodyParser = require('./../libs/bodyParser');
const Models = require('./../models/basic');
const userModels = new Models(`${__dirname}/../user.json`);
const promisify = require('./../libs/promisify');
function showUser(client, param) {
    const [req,res]=client;

    return userModels.getAll()
        .then((data)=> {

            let users = data.map((item, i, arr)=> {
                let dif = new Date() - new Date(item.date);
                return Object.assign({}, item, {age: Math.floor(dif / 31536000000)})
            });

            return promisify(app.ejs.renderFile)(app.config.views + 'users.ejs', {users: users});
        })
        .then(
            str=> {
                res.writeHead(200);
                return str;
            },
            err=> {
                console.log(err)
            }
        )
}

function userForm(client, param) {
    const [req,res]=client;

    return new Promise((resolve, reject)=> {
        app.fs.readFile(app.config.views + 'userForm.html', (err, data)=> {
            if (err) {
                console.log(err);
                res.writeHead(404);
                resolve('not found')
            }
            else {
                res.writeHead(200);
                resolve(data.toString());
            }
        });
    });
}

function addUser(client, param) {
    const [req,res]=client;

    return bodyParser(req)
        .then(
            (obj)=> {
                return userModels.add(obj)
            }
        )
        .then(
            ()=> {
                app.cache.delete('/user');
                res.writeHead(301,
                    {Location: '/user'}
                );
                return null;
            },

            err=> {
                console.log(err)
            }
        );
}


module.exports = {
    showUser,
    userForm,
    addUser
};