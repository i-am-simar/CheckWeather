const request = require('request')
const http = require('http')
const dotenv = require('dotenv').config()
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Send GET request to /api/{city name}');
});

app.get('/api/:city', (req, res) => {
    const location = req.params.city
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}`
    request(url,(error, response, body) => {
        const data = JSON.parse(body)
        if(data.cod === '404')
        {
            res.send(data.message)
        }
        else{
            res.send(data.weather[0].main)
        }
    });
})


const port = process.env.PORT || 3000
app.listen(port,() => console.log(`Listening on port ${port}...`))


