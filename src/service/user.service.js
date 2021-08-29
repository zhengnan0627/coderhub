const connections = require('../app/database')

class UserService {
    async create(user){
        const {name,password} = user
        const statement = `INSERT INTO user (name,password) VALUES (?,?);`
        const result = await connections.execute(statement,[name,password])
        //将user存储到数据库中
        return result[0]
    }
    async getUserByName(name){
        const statement = `SELECT * FROM user WHERE name = ?;`
        const result = await connections.execute(statement,[name])
        //将user存储到数据库中
        return result[0]
    }
    async updateAvatarUrl(id,avatarUrl){
        const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`
        const result = await connections.execute(statement,[avatarUrl,id])
        //将user存储到数据库中
        return result[0]
    }
}
module.exports = new UserService()