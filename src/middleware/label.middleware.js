const labelService = require('../service/label.service')

const verifyLabelExists = async (ctx, next) => {
    //获取用户名和密码
    const {
        labels
    } = ctx.request.body;

    //判断每一个标签是否在label表中存在
    let newLabels = []
    for (let name of labels) {
        const labelResult = await labelService.getLabelByName(name)
        console.log(labelResult);
        const label = {
            name:name
        } 
        if (!labelResult) {
           const result = await labelService.create(name)
           label.id = result.insertId
        }else{
            label.id = labelResult.id
        }
        newLabels.push(label)
    }
    console.log(newLabels);
    ctx.labels = newLabels;

    await next()

}

module.exports = {
    verifyLabelExists
}