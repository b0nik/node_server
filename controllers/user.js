const bodyParser = require('./../libs/bodyParser');
const Models = require('./../models/basic');
const userModels = new Models(`${__dirname}/../user.json`);

function showUser(client, param) {
    const [req,res]=client;

    return userModels.getAll().then((data)=> {

        let users = data.map((item, i, arr)=> {
            let dif = new Date() - new Date(item.date);
            return Object.assign({}, item, {age: Math.floor(dif / 31536000000)})
        });

        res.writeHead(200);
        return JSON.stringify(users)
    });


}

function userForm(client, param) {
    const [req,res]=client;

    return new Promise((resolve, reject)=> {
        app.fs.readFile(`${__dirname}/../views/userForm.html`, (err, data)=> {
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

    return new Promise((resolve, reject)=> {
        bodyParser(req, (err, obj)=> {
            userList.push(obj);
            app.fs.writeFile('./user.json', JSON.stringify(userList), (err)=> {
                if (err) {
                    return console.log(err)
                }
                app.cache.delete('/user');
                res.writeHead(301,
                    {Location: '/user'}
                );
                resolve(null)
            });
        });
    })

}


module.exports = {
    showUser,
    userForm,
    addUser
};