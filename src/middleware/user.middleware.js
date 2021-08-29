const errorType = require('../constants/error-types')
const service = require('../service/user.service')
const md5password = require('../utils/password-handle')

const verifyUser = async (ctx,next) => {
    //获取用户名和密码
    const {name,password} = ctx.request.body;
    console.log(name,password);
    //判断用户名和密码不为空
    if(name.length == 0 ||password.length==0){
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error',error,ctx)
    }   
    //判断用户是否注册过
    const  result = await service.getUserByName(name)
    console.log(result);
    if(result.length){
        const error = new Error(errorType.USER_ALREADY_EXISTS)
        return ctx.app.emit('error',error,ctx)
    }
    await next()
}
const handlePassword = async (ctx,next) => {
    let {password} = ctx.request.body;
    ctx.request.body.password = md5password(password)
    // return password
    await next()
}

module.exports = {
    verifyUser,
    handlePassword
}