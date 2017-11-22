// Module used to interact with Weather API
var Fetch = require('whatwg-fetch');
var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
var apiUrl = '&appid=2de143494c0b295cca9337e1e96b00e0';

module.exports = {
    get: function(place){
        return fetch(rootUrl + place + apiUrl, {
            headers: {
                // tbd
            }
        })
        .then(function(response){
            return response.json();
        })
    }
}
