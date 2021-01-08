const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 3001
const FILE_NAME = 'countries.json'
const nodeFn = require('./src/node-fs')
app.use(cors())

let jsonData = nodeFn('Read', FILE_NAME)                                                //read data from fs file



app.get('/api/getAllCountries', (request, response) =>                                  //api to get countries from JSON file
    response.json(jsonData))

app.get('/api/getAllCities/:name', (request, response) => {                             //// api to get cities name by giving country name
    try {
            response.json(nodeFn('ReadWithId', FILE_NAME, request.params.name))
    } catch (e) {
        response.status(400).json({
            msg: `Search cannot found the Country  with name : ${request.params.name}`
        })
    }
});


app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`))