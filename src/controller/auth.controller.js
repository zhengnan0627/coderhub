const service = require('../service/user.service');
const jwt = require('jsonwebtoken');
const {PRIVATE_KEY } = require('../app/config');

class AuthController{
    async login(ctx,next){
        //获取用户请求参数
        console.log(ctx.user);
        const { id, name } = ctx.user;
        const token = jwt.sign({id,name},PRIVATE_KEY,{
            expiresIn:60*60*24,
            algorithm:'RS256'
        })
        //查询数据
        //返回数据
        ctx.body = {
            id,
            name,
            token
        }
    }
    async success(ctx,next){
        ctx.body = '授权成功'
    }
}
module.exports = new AuthController()