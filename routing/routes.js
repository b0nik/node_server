const Router=require('./../libs/router');
let router = new Router();
const userCtr=require('./../controllers/user');

router.addGetMethod('/',require('./../controllers/index'));
router.addGetMethod('/adduser', userCtr.userForm);
router.addGetMethod('/user', userCtr.showUser);
router.addPostMethod('/add',userCtr.addUser);
router.addGetMethod('/user/*', (client, par) => 'parameter=' + par[0]);

module.exports=router;