1.
data = {name: "gene"}
Object {name: "gene"}
JSON.stringify(data)
"{"name":"gene"}"
JSON.parse("{\"name\":\"gene\"}")
Object {name: "gene"}


2. Converting to and from JSON
JSON.stringify({age: 22});
JSON.parse('{"age": 22}');




3. Fetch an API (backend)
var rp = require('request-promise');
var options = {
  uri: 'http://example.com/api.json',
  json: true
};
rp(options)
  .then(function (json_object) {
  });

4. Fetch Eample
var myHeaders = new Headers();
var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };
fetch(api_url, myInit)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function (error) {
    console.error(error);
  });


5. axios Example
var api_url = 'https://api.punkapi.com/v2/beers';
var config = {
  params: {
    brewed_before: "11-2012",
    abv_gt: 6
  }
};
axios.get(api_url, config)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

6. Basic Authenication - axios
var config = {
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  }
}

7. Key Authenication - axios
var config = {
  params: {apikey: 's00pers3cret'}
}
// or
var config = {
  headers: {apikey: 's00pers3cret'}
}

8.





































