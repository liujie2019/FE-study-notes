const Model = require('./Model.js');

// 插入数据
Model.create([
    {
        username: 'wangwu',
        age: 33,
        address: 'tianjin',
        time: new Date()
    }, {
        username: 'zhaoliu',
        age: 20,
        address: 'henan',
        time: new Date()
    }
], (err, res) => {
    if(err) {
        console.error(err);
    }
    else {
        console.log('插入数据成功');
        console.log(res);
    }
});