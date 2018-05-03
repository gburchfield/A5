var mongoose = require('mongoose');
var dburl = 'mongodb://127.0.0.1:27017/ALISEnterprise';
mongoose.Promise = global.Promise;
if(process.env.NODE_ENV !== 'test') {
    mongoose.connect(dburl);
    mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + dburl);
    });

    mongoose.connection.on('error', (err) => {
        console.log(err);        
        console.log('Mongoose failed to connect to ' + dburl);
    });
}

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', ()=>{
    mongoose.connection.close(()=>{
        console.log('Mongoose disconnected through SIGINT');
        process.exit(0);
    });
});

process.once('SIGUSR2', ()=>{
    mongoose.connection.close( ()=>{
        console.log('Mongoose disconnected through SIGUSR2');
        process.kill(process.pid, 'SIGUSR2');
    });
});