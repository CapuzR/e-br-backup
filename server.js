var express = require('express'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    service        = require('./services/service.js'),
    app = express();
    
var cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());      // simulate DELETE and PUT
// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.disable('x-powered-by');
app.use(cors());
// app.all('*', function(req, res, next) {
//     // res.header("Access-Control-Allow-Origin", "http://127.0.0.1");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });

app.get('/backupTest', service.backupTest);
app.get('/readBackupText', service.readBackupText);


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;