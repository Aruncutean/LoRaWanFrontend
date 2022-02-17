const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(__dirname + '/dist/front-end'));
app.get('/*', function(req,res) {

const proxy = require('http-proxy-middleware')
var apiProxy = proxy('/api', {target: 'https://licenta-db.herokuapp.com/'});
app.use(apiProxy)

res.sendFile(path.join(__dirname+'/dist/front-end/index.html'));});
app.listen(process.env.PORT || 8080);