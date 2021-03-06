const express = require('express');
const router = express.Router();
const covid = require('novelcovid')
const fs = require('fs/promises')

router.get('/', async function(req, res) {
  const covidStats = await covid.all();

  fs.readFile('./data/cases.json').then(function (caseData) {
    fs.readFile('./data/recovered.json').then(function (recoveredData) {
      fs.readFile('./data/todayRecovered.json').then(function (todayCaseData) {
        fs.readFile('./data/todayCases.json').then(function (todayRecoveredData) {

          let parseCaseData = JSON.parse(caseData)
          let parseRecoveredData = JSON.parse(recoveredData)
          let parseTodayCaseData = JSON.parse(todayCaseData)
          let parseTodayRecoveredData = JSON.parse(todayRecoveredData)

          let CurrentCase = []
          let CurrentRecovered = []
          let todayCurrentCase = []
          let todayCurrentRecovered = []
          let DateCase = []

          let Day = []
          let Mois = []

          let keyCase = Object.keys(parseCaseData)
          let keyRecovered = Object.keys(parseRecoveredData)
          let keyTodayCase = Object.keys(parseTodayCaseData)
          let keyTodayRecovered = Object.keys(parseTodayRecoveredData)
          for (const date of keyCase) {
            CurrentCase.push(parseCaseData[date])
            DateCase.push(date)
          }

          for (const date of keyRecovered) {
            CurrentRecovered.push(parseRecoveredData[date])
          }

          for (const date of keyTodayCase) {
            todayCurrentCase.push(parseTodayCaseData[date])
          }

          for (const date of keyTodayRecovered) {
            todayCurrentRecovered.push(parseTodayRecoveredData[date])
          }

          for(const date of DateCase){
            let [day,mois] = date.split('/')
            Day.push(day)
            Mois.push(mois)
          }

          let stringifyCase = JSON.stringify(CurrentCase)
          let stringifyRecovered = JSON.stringify(CurrentRecovered)
          let stringifyTodayCase = JSON.stringify(todayCurrentCase)
          let stringifyTodayRecovered = JSON.stringify(todayCurrentRecovered)
          let stringifyDay = JSON.stringify(Day)
          let stringifyMonth = JSON.stringify(Mois)

          res.render('index', {
            title: 'Minimal COVID',
            version: require('../package.json').version,
            covidStats,
            cases: stringifyCase,
            day: stringifyDay,
            mois: stringifyMonth,
            recovered: stringifyRecovered,
            todayRecovered: stringifyTodayRecovered,
            todayCases: stringifyTodayCase
          });
        })
      })
    })
  })
});
module.exports = router;
