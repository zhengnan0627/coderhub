const connections = require('../app/database')

class CommentService {
    async create(momentId,content,userId) {
        const statement = `INSERT INTO comment (content,moment_id,user_id) VALUES (?,?,?);`
        const result = await connections.execute(statement, [content,momentId,userId])
        //将user存储到数据库中
        return result[0]
    }
    async reply(momentId,content,userId,commentId) {
        const statement = `INSERT INTO comment (content,moment_id,user_id,comment_id) VALUES (?,?,?,?);`
        const result = await connections.execute(statement, [content,momentId,userId,commentId])
        //将user存储到数据库中
        return result[0]
    }
    
    async update(content,commentId) {
        const statement = `
        UPDATE  comment SET content = ? WHERE id = ?;
        `
        const result = await connections.execute(statement, [content,commentId])
        //将user存储到数据库中
        return result[0]
    }
    async remove(commentId) {
        const statement = `
        DELETE FROM  comment WHERE id = ?;
        `
        const result = await connections.execute(statement, [commentId])
        //将user存储到数据库中
        return result[0]
    }
    async getCommentsByMomentId(momentId) {
        const statement = `SELECT 
            m.id, m.content, m.comment_id commendId, m.createAt createTime,
            JSON_OBJECT('id', u.id, 'name', u.name) user
        FROM comment m
        LEFT JOIN user u ON u.id = m.user_id
        WHERE moment_id = 49; 
        `
        const result = await connections.execute(statement, [momentId])
        //将user存储到数据库中
        return result[0]
    }
}
module.exports = new CommentService()