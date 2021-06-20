const request = require('request');

const weatherData = (address, callback) => {
    
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${address}&appid=22dd34adfbb4fc517bf23eda320ef8fd`

    request({url, json:true}, (error, {body})=> {
        if(error) {
            callback("Can't fetch data from open weather map api ", undefined)
        } 
        else if(!body.main || !body.main.temp || !body.name || !body.weather) {
             callback("Unable to find required data, try another location", undefined);
        } 
        else {
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            })
        }
    })
}

module.exports = weatherData;