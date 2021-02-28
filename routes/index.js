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
            DateCase.push(date)
          }

          for (const date of keyTodayCase) {
            todayCurrentCase.push(parseTodayCaseData[date])
            DateCase.push(date)
          }

          for (const date of keyTodayRecovered) {
            todayCurrentRecovered.push(parseTodayRecoveredData[date])
            DateCase.push(date)
          }

          let stringifyCase = JSON.stringify(CurrentCase)
          let stringifyRecovered = JSON.stringify(CurrentRecovered)
          let stringifyTodayCase = JSON.stringify(todayCurrentCase)
          let stringifyTodayRecovered = JSON.stringify(todayCurrentRecovered)
          let stringifyDate = JSON.stringify(DateCase)

          res.render('index', {
            title: 'Minimal COVID',
            version: '1.1',
            covidStats,
            cases: stringifyCase,
            dates: stringifyDate,
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
