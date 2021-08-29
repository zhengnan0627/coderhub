const connections = require('../app/database')

class AuthService {
    async checkResource(tableName,id,userId){
        try {
            const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`
            const result = await connections.execute(statement,[id,userId])
            //将user存储到数据库中 
            // console.log(result[0]);
            return result[0].length === 0?false:true
        } catch (error) {
            console.log(error);
        }
        
    }

}
module.exports = new AuthService()