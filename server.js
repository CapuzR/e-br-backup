var express = require('express'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    service        = require('./routes/service.js'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());      // simulate DELETE and PUT
// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.disable('x-powered-by');
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.post('/startMatch', service.startMatch);
app.post('/endMatch', service.endMatch);
app.post('/matchForcedClose', service.matchForcedClose);
// app.get('/test', service.getTMPrincipal);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
