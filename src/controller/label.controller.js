const labelService = require('../service/label.service');

class LabelController{
    async create(ctx,next){
        // 获取数据(user_id,content)
        const userId = ctx.user.id     
        const {name} = ctx.request.body
        // //将数据插入到数据库
        const result = await labelService.create(name)
        ctx.body = result
    }
    async reply(ctx,next){
        const userId = ctx.user.id   
        const {momentId,content} = ctx.request.body
        const {commentId} = ctx.params
        //根据id查询数据库
        console.log(userId+momentId+content+commentId);
        const result = await labelService.reply(momentId,content,userId,commentId) 
        ctx.body = result;
    }
    //查询标签列表
    async list(ctx,next){
        // 获取查询参数 
        const {limit,offset} = ctx.query;
        //根据id查询数据库
        const result = await labelService.getLabels(limit,offset) 
        ctx.body = result; 
    }
    //修改评论
    async update(ctx,next){
        // 获取查询参数
        const {commentId} = ctx.params;
        const {content} = ctx.request.body;
        const {id} = ctx.user;
        // console.log(`修改内容+${commentId}+${content}+${id}`);
        // ctx.body = `修改内容+${commentId}+${content}+${id}`;

        //修改数据库
        const result = await labelService.update(content,commentId) 
        ctx.body = result;
    }
    //删除评论
    async remove(ctx,next){
        // 获取查询参数
        const {commentId} = ctx.params;
        //修改数据库
        const result = await labelService.remove(commentId) 
        ctx.body = result;
    }
    
}
module.exports = new LabelController()