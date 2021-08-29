const Router = require('koa-router')

const labelRouter = new Router({prefix:'/label'})


const {
    create,
    detail,
    list,
    update,
    remove
} = require('../controller/label.controller')

const { 
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware')

const { 
    verifyLabelExists
} = require('../middleware/label.middleware')

labelRouter.post('/',verifyAuth,verifyLabelExists,create)
labelRouter.get('/',list)
// labelRouter.get('/:momentId',detail)

// labelRouter.patch('/:momentId',verifyAuth,verifyPermission, update)
// labelRouter.delete('/:momentId',verifyAuth,verifyPermission, remove)



module.exports = labelRouter