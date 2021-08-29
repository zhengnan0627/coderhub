const commentService = require('../service/comment.service');

class CommentController{
    async create(ctx,next){
        // 获取数据(user_id,content)
        const userId = ctx.user.id     
        const {momentId,content} = ctx.request.body
        // //将数据插入到数据库
        const result = await commentService.create(momentId,content,userId)
        ctx.body = result
    }
    async reply(ctx,next){
        const userId = ctx.user.id   
        const {momentId,content} = ctx.request.body
        const {commentId} = ctx.params
        //根据id查询数据库
        console.log(userId+momentId+content+commentId);
        const result = await commentService.reply(momentId,content,userId,commentId) 
        ctx.body = result;
    }
    //查询列表
    async list(ctx,next){
        // 获取查询参数
        const {momentId} = ctx.query;
       console.log(momentId);
        //根据id查询数据库
        const result = await commentService.getCommentsByMomentId(momentId) 
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
        const result = await commentService.update(content,commentId) 
        ctx.body = result;
    }
    //删除评论
    async remove(ctx,next){
        // 获取查询参数
        const {commentId} = ctx.params;
        //修改数据库
        const result = await commentService.remove(commentId) 
        ctx.body = result;
    }
    
}
module.exports = new CommentController()