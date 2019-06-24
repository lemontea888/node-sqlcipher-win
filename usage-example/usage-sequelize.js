
const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(null,null,'node6.x_EOL_2019-04-30',{
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
        max: 10,
        min: 0,
        acquire: 16888,
        idle: 8888
    },
    storage: path.join(__dirname,'./SQLite3.DB')
});

sequelize.query("SELECT info FROM lorem").then(function(results){
    console.log(results);
}).catch(function(error){
    console.log(error);
}).then(function(){
    sequelize.close();
});

