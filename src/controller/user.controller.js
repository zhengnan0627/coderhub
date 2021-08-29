const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const fs = require('fs');
const { AVATAR_PATH } = require('../constants/file-path')

class   UserController{
    async creat(ctx,next){
        //获取用户请求参数
        const user = ctx.request.body;
        //查询数据
        const result = await userService.create(user)
        //返回数据
        ctx.body = result
    }
    async avatarInfo(ctx,next){
        //获取用户请求参数
        const {userId} = ctx.params;
        //查询数据
        const result = await fileService.getAvatarByUserId(userId)
        //返回数据
        ctx.response.set('content-type',result.mimetype)
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}`)
    }
}
module.exports = new UserController