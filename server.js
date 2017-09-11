const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const channelNames = require('./channelNames.js')

const app = express();
const port = process.env.PORT || 3000;

var scrapeInfo = {};  // json object to be returned to user

// Params
//  s - the string ('abc123')
// Return
//  the first number found (123) OR nothing if s if no number
function getNumberFromString(s) {
  var number = s.match(/\d+/)[0];
  return number;
}

// Params
//  s - the css style string (ie. 'width:150px')
// Return
//  length of time OR nothing if s is undefined
function styleStringToLength(s) {
  if (!s) {
    return
  }
  var width = s.match(/\d+/)[0];
  var minutes = width * (180/900);  // (minutes / pixels)
  return minutes;
}

function parse(url) {
    request(url, function (error, response, body) {
        var $ = cheerio.load(body);

        var startTime = getNumberFromString($('script').get()[0].children[0].data)
        scrapeInfo["startTime"] = startTime;
        scrapeInfo["channels"] = [];
        // jsonData[""]

        // traverse through channels
        $('table.zc-row').each(function () {

          var row = $(this).children('tbody').children('tr')
          var stationInfo = row.children('td.zc-st')
          var channelNumber = stationInfo.children('.zc-st-n').text()
          var channelName = stationInfo.children('.zc-st-c').text()

          var rowJSON = {}

          // take into account channels 20.1 and 20.2
          if(channelName == 'INFO020') {
            rowJSON['channelNumber'] = channelNumber + ".2";
          } else {
            rowJSON['channelNumber'] = channelNumber + ".1";
          }

          rowJSON['channelName'] = channelNames.getChannelName(rowJSON['channelNumber'], channelName);
          rowJSON['showings'] = [];

          // traverse through showings
          row.children('.zc-pg').each(function () {

            var showingInfo = {};
            showingInfo["length"] = styleStringToLength($(this).attr('style'));
            showingInfo["title"] = $(this).children('.zc-pg-t').text();
            showingInfo["year"] = $(this).children('.zc-pg-y').text();
            showingInfo["subtitle"] = $(this).children('.zc-pg-e').text();
            showingInfo["description"] = $(this).children('.zc-pg-d').text();

            rowJSON['showings'].push(showingInfo);

            // console.info("Minutes: " + styleStringToLength($(this).attr('style')));
            // console.info("Title: " + $(this).children('.zc-pg-t').text());
            // console.info("Year: " + $(this).children('.zc-pg-y').text());
            // console.info("Subtitle: " + $(this).children('.zc-pg-e').text());
            // console.info("Description: " + $(this).children('.zc-pg-d').text());
            // console.info("\n");
          });

          scrapeInfo["channels"].push(rowJSON)

        });
        console.log(scrapeInfo);
    })
}

console.log("SCRAPING!");
parse('http://tvlistings.zap2it.com/tvlistings/ZCGrid.do?zipcode=01003&lineupId=MA69873:-&isDescriptionOn=true');

// Scrape the website every 15 minutes
var minutes = 15, the_interval = minutes * 60 * 1000;
setInterval(function() {
  console.log("SCRAPING!");
  parse('http://tvlistings.zap2it.com/tvlistings/ZCGrid.do?zipcode=01003&lineupId=MA69873:-&isDescriptionOn=true');
  // do your stuff here
}, the_interval);

app.get('/schedule', (req, res) => {
  // $.ajax({ url: 'http://tvlistings.zap2it.com/tvlistings/ZCGrid.do?zipcode=01003&lineupId=MA69873:-&isDescriptionOn=true',
  // success: function(data) { alert(data); } });
  res.send(scrapeInfo);
})

app.listen(port, () => {
  console.log(`Started app on port ${port}`)
})
