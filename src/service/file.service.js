const connections = require('../app/database')

class FileService {
    //上传头像
    async createAvatar(filename,mimetype,size,userId) {
        const statement = `INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?);`
        const result = await connections.execute(statement, [filename,mimetype,size,userId])
        //将user存储到数据库中
        return result[0]
    }
    //查询单个图片
    async getAvatarByUserId(userId) {
        const statement = `SELECT * FROM avatar WHERE user_id = ?;`
        const result = await connections.execute(statement, [userId])
        //将user存储到数据库中
        return result[0][0]
    }
    //上传多张图片
    async createFile(filename,mimetype,size,userId,momentId) {
        const statement = `INSERT INTO file (filename,mimetype,size,user_id,moment_id) VALUES (?,?,?,?,?);`
        const result = await connections.execute(statement, [filename,mimetype,size,userId,momentId])
        //将user存储到数据库中
        return result[0]
    }
    //根据filename查询图片
    async getFileByFilename(filename) {
        const statement = `SELECT * FROM file WHERE filename = ?;`
        const result = await connections.execute(statement, [filename])
        //将user存储到数据库中
        return result[0][0]
    }

}
module.exports = new FileService()