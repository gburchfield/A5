var app = require('./app');

app.set('port', 8080);
app.set('hostIP', '141.240.24.172');
var server = app.listen(app.get('port'), app.get('hostIP'), () => {
    var port = server.address().port;
    var IP = server.address().address;
    console.log("Listening on IP " + IP + " and port " + port);
    console.log(process.env.IP);
});