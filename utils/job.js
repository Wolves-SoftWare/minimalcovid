const covid = require('novelcovid')
const fs = require('fs/promises')
//

    fs.readFile('./data/cases.json').then(async function (data) {
        const covidStats = await covid.all();

        let parseData = JSON.parse(data)
        let date =new Date()
        let form = (date.getDate())+'/'+ date.getMonth()
            let newdate = {}
            Object.assign(newdate, {[form]:covidStats.active})
            Object.assign(parseData,newdate)
        let stringifyData = JSON.stringify(parseData)

        fs.writeFile('./data/cases.json', stringifyData).then(() => {
            console.log('Nouvel donné entré')
        })
    })
    fs.readFile('./data/recovered.json').then(async function (data) {
        const covidStats = await covid.all();

        let parseData = JSON.parse(data)
        let date =new Date()
        let form = (date.getDate())+'/'+ date.getMonth()
        let newdate = {}
        Object.assign(newdate, {[form]:covidStats.recovered})
        Object.assign(parseData,newdate)
        let stringifyData = JSON.stringify(parseData)

        fs.writeFile('./data/recovered.json', stringifyData).then(() => {
            console.log('Nouvel donné entré')
        })
    })
