const fileService = require('../service/file.service');
const userService = require('../service/user.service');

const { AVATAR_PATH } = require('../constants/file-path')
const { APP_HOST, APP_PORT} = require('../app/config')

class FileController{
    async saveAvatarInfo(ctx,next){
        // 获取图片数据
        console.log(ctx.req.file);
        const {mimetype,filename,size} = ctx.req.file 
        const {id} = ctx.user
        // //将图像数据插入到数据库
        const result = await fileService.createAvatar(filename,mimetype,size,id)

        //将图片信息插入到users表中
        const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
        await userService.updateAvatarUrl(id,avatarUrl)
        ctx.body = {
            statusCode:200,
            message:"用户上传成功"
        }
    }
    async savePictureInfo(ctx,next){
        // 获取图片数据
        console.log('123');
        // console.log(ctx.req.files); 
        const files = ctx.req.files
        const {id} = ctx.user
        const {momentId} = ctx.query
        // //将图像数据插入到数据库
        try {
            for (let file of files) {
                const {mimetype,filename,size} = file 
                const result = await fileService.createFile(filename,mimetype,size,id,momentId)
    
            }
        } catch (error) {
            console.log(error);
        }
       

        //将图片信息插入到file表中
        // const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
        // await userService.updateAvatarUrl(id,avatarUrl)
        ctx.body = {
            statusCode:200,
            message:"所有文件上传成功"
        }
    }
}
module.exports = new FileController()