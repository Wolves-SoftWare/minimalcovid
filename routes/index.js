var express = require('express');
var router = express.Router();
const covid = require('novelcovid')
const fs = require('fs/promises')

router.get('/', async function(req, res, next) {
  const covidStats = await covid.all();

  fs.readFile('./data/cases.json').then(function (caseData) {
    fs.readFile('./data/recovered.json').then(function (recoveredData) {

      let parseCaseData = JSON.parse(caseData)
      let parseRecoveredData = JSON.parse(recoveredData)
      let CurrentCase = []
      let CurrentRecovered = []
      let DateCase = []
      let keyCase = Object.keys(parseCaseData)
      let keyRecovered = Object.keys(parseRecoveredData)

      for (const date of keyCase) {
        CurrentCase.push(parseCaseData[date])
        DateCase.push(date)
      }
      for (const date of keyRecovered) {

        CurrentRecovered.push(parseRecoveredData[date])
        DateCase.push(date)
      }

      let stringifyCase = JSON.stringify(CurrentCase)
      let stringifyRecovered = JSON.stringify(CurrentRecovered)

      let stringifyDate = JSON.stringify(DateCase)

      res.render('index', {title: 'Minimal COVID', covidStats, cases: stringifyCase, dates: stringifyDate, recovered: stringifyRecovered});
    })
  })


});
module.exports = router;
