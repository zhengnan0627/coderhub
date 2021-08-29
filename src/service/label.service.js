const connections = require('../app/database')

class LabelService {
    async create(name) {
        const statement = `INSERT INTO label (name) VALUES (?);`
        const result = await connections.execute(statement, [name])
        //将user存储到数据库中
        return result[0]
    }
    async getLabelByName(name) {
        const statement = `SELECT * FROM label WHERE name = ?;`
        const result = await connections.execute(statement, [name])
        //将user存储到数据库中
        return result[0][0]
    }
    async getLabels(limit,offset) {
        const statement = `SELECT * FROM label LIMIT ?,?;`
        const result = await connections.execute(statement, [offset,limit])
        //将user存储到数据库中
        return result[0]
    }
}
module.exports = new LabelService()