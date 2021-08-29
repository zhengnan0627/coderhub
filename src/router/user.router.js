const Router = require('koa-router')
const {
    creat,
    avatarInfo
} = require('../controller/user.controller')
const {verifyUser,handlePassword} = require('../middleware/user.middleware')
const userRouter = new Router({prefix:'/users'})

userRouter.post('/',verifyUser,handlePassword, creat)
userRouter.get('/:userId/avatar',avatarInfo)

module.exports = userRouter