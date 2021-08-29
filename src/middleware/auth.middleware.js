const jwt = require('jsonwebtoken')
const {
    PUBLIC_KEY
} = require('../app/config')
const errorType = require('../constants/error-types')
const userService = require('../service/user.service')
const authService = require('../service/auth.service')
const md5password = require('../utils/password-handle')

const verifyLogin = async (ctx, next) => {
    //获取用户名和密码
    const {
        name,
        password
    } = ctx.request.body;

    //判断用户名和密码是否为空
    if (name.length == 0 || password.length == 0) {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx)
    }
    //判断用户是否存在
    const result = await userService.getUserByName(name)
    const user = result[0]
    // console.log(result); 
    if (!user) {
        const error = new Error(errorType.USER_DOES_NOT_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }


    //判断密码是否一致(加密)
    if (md5password(password) != user.password) {
        const error = new Error(errorType.PASSWORD_IS_INCORRENT)
        return ctx.app.emit('error', error, ctx)
    }

    ctx.user = user;

    await next()

}

const verifyAuth = async (ctx, next) => {
    // console.log('验证授权的middleware');
    // console.log(ctx.header);
    //获取token
    const authorization = ctx.header.authorization;
    if (!authorization) {
        const error = new Error(errorType.UNAUTHORIZATION)
        ctx.app.emit('error', error, ctx)
        // console.log(error+'+++++!authorization');
        return
    }
    const token = authorization.replace('Bearer ', '')
    // console.log(token);
    //验证token

    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithm: ['RS256']
        })
        // console.log(result);
        ctx.user = result
        await next()
    } catch (err) {
        // console.log(err+'      catch');
        const error = new Error(errorType.UNAUTHORIZATION)
        ctx.app.emit('error', error, ctx)
        // console.log('catch捕获' + err); 
        // console.log(ctx); 
    }
}

const verifyPermission = async (ctx, next) => {
    console.log('验证修改权限的middleware');
    // console.log(ctx.header);
    //获取参数
    const [resourceKey] = Object.keys(ctx.params);
    const tableName = resourceKey.replace('Id','')
    const resourceId = ctx.params[resourceKey];
    const { id } = ctx.user;
    // console.log(id+tableName+resourceId);
    //查询是否具有权限

    try {
        const isPermission = await authService.checkResource(tableName,resourceId, id);
        if (!isPermission) {
            throw new Error()
        }
    } catch (err) {
        // console.log(err+'123');
        const error = new Error(errorType.UNPERMISSION);
        return ctx.app.emit('error', error, ctx)
    }

    await next();
}
 //第二种方式  获取router.js调用此中间件时的传参即为需要验证的权限字段名)
// const verifyPermission = (tableName) => {
//     return async (ctx, next) => {
//         console.log('验证修改权限的middleware');
//         // console.log(ctx.header);
//         //获取参数 (获取router.js调用此中间件时的传参即为需要验证的权限字段名)
//         const resourceId = ctx.params[resourceKey];
//         const {momentId} = ctx.params;
//         const {
//             id
//         } = ctx.user;
//         // console.log(id+tableName+momentId);
//         //查询是否具有权限

//         try {
//             const isPermission = await authService.checkResource(tableName, momentId, id);
//             if (!isPermission) {
//                 throw new Error()
//             }
//         } catch (err) {
//             // console.log(err+'123');
//             const error = new Error(errorType.UNPERMISSION);
//             return ctx.app.emit('error', error, ctx)
//         }

//         await next();
//     }
// }

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}