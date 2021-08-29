const connections = require('../app/database')

class MomentService {
    async create(userId, content) {
        const statement = `INSERT INTO moment (content,user_id) VALUES (?,?);`
        const result = await connections.execute(statement, [content, userId])
        //将user存储到数据库中
        return result[0]
    }
    async getMomentById(id) {
        const statement = `
        SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
            JSON_OBJECT('id', u.id, 'name', u.name,'avatarUrl',u.avatar_url) user,
            IF(COUNT(l.id), JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)), NULL) labels,
            (SELECT COUNT( * ) FROM comment WHERE comment.moment_id = m.id) commentCount,
            IF(COUNT(c.id), JSON_ARRAYAGG(
                JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id,
                    'user', JSON_OBJECT('id', cu.id, 'name', cu.name,'avatarUrl',cu.avatar_url))), NULL) comments,
            (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', file.filename))
            FROM file WHERE m.id = file.moment_id) images
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        LEFT JOIN comment c ON c.moment_id = m.id
        LEFT JOIN user cu ON c.user_id = cu.id
        LEFT JOIN moment_label ml ON m.id = ml.moment_id
        LEFT JOIN label l ON ml.label_id = l.id
        WHERE m.id = ?
        GROUP BY m.id;
        `
        const result = await connections.execute(statement, [id])
        //将user存储到数据库中
        return result[0][0]
    }
    async getMomentByList(offset,size) {  
        const statement = `
        SELECT 
            m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
            JSON_OBJECT('id', u.id, 'name', u.name) author,
            (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
            (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
            (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', file.filename))
            FROM file WHERE m.id = file.moment_id) images
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        LIMIT ?,?;
        `
        const result = await connections.execute(statement, [offset,size])
        //将user存储到数据库中
        return result[0]
    }
    async update(content,momentId) {
        const statement = `
        UPDATE  moment SET content = ? WHERE id = ?;
        `
        const result = await connections.execute(statement, [content,momentId])
        //将user存储到数据库中
        return result[0]
    }
    async remove(momentId) {
        const statement = `
        DELETE FROM  moment WHERE id = ?;
        `
        const result = await connections.execute(statement, [momentId])
        //将user存储到数据库中
        return result[0]
    }

    async hasLabel(momentId,labelId) {
        const statement = `
        SELECT * FROM  moment_label WHERE moment_id = ? AND label_id = ?;
        `
        const result = await connections.execute(statement, [momentId,labelId])
        //将user存储到数据库中
        return result[0][0]? true : false
    }

    async addLabel(momentId,labelId) {
        const statement = `
        INSERT INTO moment_label (moment_id,label_id) VALUES (?,?);
        `
        const result = await connections.execute(statement, [momentId,labelId])
        //将user存储到数据库中
        return result[0]
    }
}
module.exports = new MomentService()