const mysql2 = require('mysql2')
const config = require('./config')


const connections = mysql2.createPool({
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    database: config.MYSQL_DATABASE,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
})
connections.getConnection((err,conn)=>{
    conn.connect(err => {
        if(err){
            console.log("连接数据库失败",err);
        }else{
            console.log("数据库连接成功");
        }
    })
})

module.exports = connections.promise()