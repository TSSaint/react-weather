// ReactWeatherApp Core
var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Api = require('./utils/api');

var query = ";// ?city=SOME CITY HERE (ex. New York, London, Paris, Tokyo"
var cities = []; // strings become are an array
var citiesWeather = []; // API cache
var currentCity = 0; // Index of current city displayed

var Weather = React.createClass({
	render: function(){

	}
});

// assign React component Weather to a DOM element
var element = React.createElement(Weather, {});
ReactDOM.render(element, document.querySelector('.container'));
