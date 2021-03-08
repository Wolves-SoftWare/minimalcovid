const covid = require('novelcovid')
const fs = require('fs/promises')
const CronJob = require('cron').CronJob;
//FIXME remove nodejs-cron and use crontab because nodejs-cron is stupid
    fs.readFile('./data/todayCases.json').then(async function (todayCases) {
        fs.readFile('./data/todayRecovered.json').then(async function (todayRecovered) {
            fs.readFile('./data/recovered.json').then(async function (recovered) {
                fs.readFile('./data/cases.json').then(async function (cases) {
                    const covidStats = await covid.all();

                    let parsetodayCases = JSON.parse(todayCases)
                    let parsetodayRecovered = JSON.parse(todayRecovered)
                    let parserecovered = JSON.parse(recovered)
                    let parsecases = JSON.parse(cases)
                    let date = new Date()
                    let mois = date.getMonth()
                    console.log(date.getHours())
                    mois++
                    let form = (date.getDate()) + '/' + mois +' | '+ date.getHours() +'h'

                    Object.assign(parsetodayCases, {[form]: covidStats.todayCases})
                    Object.assign(parsetodayRecovered, {[form]: covidStats.todayRecovered})
                    Object.assign(parserecovered, {[form]: covidStats.recovered})
                    Object.assign(parsecases, {[form]: covidStats.active})

                    console.log(parsetodayCases)

                    let StringifytodayCases = JSON.stringify(parsetodayCases)
                    let StringifytodayRecovered = JSON.stringify(parsetodayRecovered)
                    let Stringifyrecovered = JSON.stringify(parserecovered)
                    let Stringifycases = JSON.stringify(parsecases)


                    fs.writeFile('./data/todayCases.json', StringifytodayCases).then(() => {
                        console.log('Nouvel donné entré todayCases: ' + covidStats.todayCases)
                    })
                    fs.writeFile('./data/todayRecovered.json', StringifytodayRecovered).then(() => {
                        console.log('Nouvel donné entré todayRecovered: ' + covidStats.todayRecovered)
                    })
                    fs.writeFile('./data/recovered.json', Stringifyrecovered).then(() => {
                        console.log('Nouvel donné entré recovered: ' + covidStats.recovered)
                    })
                    fs.writeFile('./data/cases.json', Stringifycases).then(() => {
                        console.log('Nouvel donné entré active: ' + covidStats.active)
                    })
                })
            })
        })
    })
console.log('Lancement du job...')
console.log('Job en attente...')
