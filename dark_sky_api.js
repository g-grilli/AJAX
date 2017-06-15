var express = require('express');
var app = express();
var pgp = require('pg-promise')({
  promiseLib: Promise
});
var db = pgp(process.env.DATABASE_URL
|| {database: 'zipcode'
});

var apicache = require('apicache');
var cache = apicache.middleware;

var axios = require('axios');

app.set('view engine', 'hbs');
app.use('/static', express.static('public'));

app.use('/axios', express.static('node_modules/axios/dist'));

app.get('/', function (request, response) {
  response.render('weather.hbs', {});
});


app.get('/api', cache('60 minutes'), function (request, response, next) {
  var DARK = process.env.DARKSKY_KEY;
  var zip_code = request.query.zip_code;
  console.log('Generating new response', zip_code);
  var dbdata;
  db.any(`
    SELECT lat, long, location_text FROM data
    WHERE zipcode = $1 AND location_type = 'PRIMARY'
    `, zip_code)
    .then(function(resultsArray) {
      console.log('results', resultsArray);
      dbdata = resultsArray[0];
      return axios.get(`https://api.darksky.net/forecast/DARK/${dbdata.lat},${dbdata.long}`);
    })
    .then(function (darksky) {
    	response.json({db: dbdata, ds: darksky.data});
    })
    .catch(next);
});

var PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});