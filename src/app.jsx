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
	// Initialize data for UI
	// prepare props to hold values for weather indicators
	getInitialState: function(){
	return {
		weather: '',
		temp: 0,
		humidity,
		wind: 0
		}
	},

	fetchData: function() {
    	// get data from the cache
    	if (citiesWeather[currentCity]) {
    	    this.updateData();   
    	}
    	else {
    	    // Request new data to the API
     	   Api.get(cities[currentCity])
     	       .then(function(data) {
    	            citiesWeather[currentCity] = data;
    	            this.updateData();
    	    }.bind(this));
    	}
	},
	
	render: function(){
		// class names
		var weatherClass = classNames('wi wi-owm-' + this.state.weather);
		var bgColorClass = 'weather-widget';

		// changes bg based on temp
		if(this.state.temp >= 30){
			bgColorClass += 'very-warm';
		}
		else if (this.state.temp > 20 && this.state.temp < 30){
			bgColorClass += 'warm';
		}
		else if (this.state.temp > 10 && this.state.temp < 20){
			bgColorClass += 'normal';
		}
		else if (this.state.temp > 0 && this.state.temp < 10){
			bgColorClass += 'cold';
		}
		else if (this.state.temp <= 0){
			bgColorClass += 'very-cold';
		}
	
		// render DOM elements
		return 
		<div className={bgColorClass}>
			<h1 className="city">{cities[currentCity]}</h1>
			<div className="weather">
				<i className={weatherClass}></i>
			</div>
		<section className="weather-details">
			<div className="temp"><span className="temp-number">{this.state.temp}</span><span className="wi wi-degrees"></span></div>
			<div className="humidity"><i className="wi wi-raindrop"></i>{this.state.humidity} %</div>
			<div className="wind"><i className="wi wi-small-craft-advisory"></i>{this.state.wind} <span className="vel">Km/h</span></div>
		</section>
		</div>

	}
});

// assign React component Weather to a DOM element
var element = React.createElement(Weather, {});
ReactDOM.render(element, document.querySelector('.container'));