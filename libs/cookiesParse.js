module.exports=function (cookie) {
    let cookies={};
    if (cookie) cookie.split(';').forEach((item) => {
        let parts = item.split('=');
            cookies[(parts[0]).trim()] = (parts[1] || '').trim();
    });
    return cookies;
};

