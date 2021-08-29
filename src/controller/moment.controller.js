const momentService = require('../service/moment.service');
const fileService = require('../service/file.service');
const fs = require('fs');
const { PICTURE_PATH} = require('../constants/file-path')

class MomentController{
    async create(ctx,next){
        //获取数据(user_id,content)
        const userId = ctx.user.id    
        const content = ctx.request.body.content 
        
        //将数据插入到数据库
        const result = await momentService.create(userId,content)
        ctx.body = result
    }
    async detail(ctx,next){
        const momentId = ctx.params.momentId;
       
        //根据id查询数据库
        const result = await momentService.getMomentById(momentId) 
        ctx.body = result;
    }
    //查询列表
    async list(ctx,next){
        // 获取查询参数
        const {offset, size} = ctx.query;
       
        //根据id查询数据库
        const result = await momentService.getMomentByList(offset,size) 
        ctx.body = result;
    }
    //修改评论
    async update(ctx,next){
        // 获取查询参数
        const {momentId} = ctx.params;
        const {content} = ctx.request.body
        const {id} = ctx.user
        ctx.body = `修改内容+${momentId}+${content}+${id}`;

        //修改数据库
        const result = await momentService.update(content,momentId) 
        ctx.body = result;
    }
    //删除评论
    async remove(ctx,next){
        // 获取查询参数
        const {momentId} = ctx.params;
        const {content} = ctx.request.body
        const {id} = ctx.user
        ctx.body = `修改内容+${momentId}+${content}+${id}`;

        //修改数据库
        const result = await momentService.remove(momentId) 
        ctx.body = result;
    }
    //动态添加标签  
    async addLabels(ctx,next){
        // 获取标签及动态ID
        
        const {labels} = ctx
        const {momentId} = ctx.params
        console.log(labels);
        // ctx.body = `修改内容+${labels}`; 
        for (const label of labels) {
            //判断标签是否已经和动态有关系
            console.log(label);
            const isExist = await momentService.hasLabel(momentId,label.id);
            console.log(isExist);
            if(!isExist){
                const result = await momentService.addLabel(momentId,label.id)
            }
        }
        //修改数据库
        ctx.body = '给动态添加标签';
    }
     //获取图片信息
     async fileInfo(ctx,next){
        // 获取图片
        let {filename} = ctx.params
        let fileInfo = await fileService.getFileByFilename(filename)
        //获取图片尺寸类型
        const {type} = ctx.query
        const types = ['small','middle','large']
        if (types.includes(type)) {
            filename = filename+'-'+type
        }
        ctx.response.set('content-type',fileInfo.mimetype)
    
        // ctx.body = '给动态添加图片';
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
    }
}
module.exports = new MomentController()