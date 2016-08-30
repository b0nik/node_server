module.exports=(client, par)=>{
    const [req,res]=client;
    res.writeHead(200, {
        'Set-Cookie': 'mycookie=test',
        'Content-Type': 'text/html'
    });
    let ip = req.connection.remoteAddress;
    return `<h1>Welcome</h1>Your IP: ${ip}
            <pre>${JSON.stringify(app.cookies)}</pre>
            <a href="/user">show all users</a><br/>
            <a href="adduser">add user</a>
`
};
