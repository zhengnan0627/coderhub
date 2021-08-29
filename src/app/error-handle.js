const errorType = require('../constants/error-types')

const errorHandler = (error, ctx) => {
    console.log(error.message);
    let status, message;
    switch (error.message) {
        case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400;
            message = "用户名或密码不能为空";
            break;
        case errorType.USER_ALREADY_EXISTS:
            status = 409;
            message = "用户已经存在";
            break;
        case errorType.USER_DOES_NOT_EXISTS:
            status = 400;
            message = "用户不存在";
            break;
        case errorType.PASSWORD_IS_INCORRENT:
            status = 400;
            message = "用户密码不存在";
            break;
        case errorType.UNAUTHORIZATION:
            status = 401;
            message = "token过期";
            break;
        case errorType.UNPERMISSION:
            status = 401;
            message = "您不具备操作权限";
            break;
        default:
            status = 404;
            message = "未找到相关信息";
    }
    ctx.status = status;
    ctx.body = message
}

module.exports = errorHandler