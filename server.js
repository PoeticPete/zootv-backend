const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const channelNames = require('./channelNames.js')
const addStartTimes = require('./addStartTimes.js')

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

function parse() {
  // get channels from this time
  let currTimeInSeconds = Date.now() / 1000;
  let startTimestamp = currTimeInSeconds - (currTimeInSeconds % 1800)
  const websiteToScrape = {
    url: `https://tvlistings.zap2it.com/api/grid?lineupId=USA-MA69873-DEFAULT&timespan=3&headendId=MA69873&country=USA&device=-&postalCode=01003&isOverride=true&time=${startTimestamp}&pref=-&userId=-&aid=gapzap`,
  }
  currTimeInSeconds - (currTimeInSeconds % 1800)

    request(websiteToScrape, function (error, response, body) {

      // round down to nearest half hour
      var startTime = currTimeInSeconds * 1000
      scrapeInfo["startTime"] = startTime;
      scrapeInfo["channels"] = [];

      let jsonResult = JSON.parse(body);
      jsonResult.channels.forEach(function(channel) {

        let newChannel = {}
        newChannel.channelNumber = channel.channelNo
        newChannel.channelName = channel.callSign
        newChannel.showings = []

        channel.events.forEach(function(event) {
          let newShowing = {}
          newShowing.length = event.duration
          newShowing.title = event.program.title
          newShowing.year = event.program.releaseYear
          newShowing.subtitle = event.program.episodeTitle
          newShowing.description = event.program.shortDesc
          newShowing.startTime = Date.parse(event.startTime)
          newChannel.showings.push(newShowing)
        })

        scrapeInfo.channels.push(newChannel)
      })
      scrapeInfo["info"] = "Hey you! Welcome to ZooTV. ZooTV is a TV guide for UMass Amherst. Search for a channel or show in the search bar. \n\nMade with ❤️ by Deji, Timi, and Peter. The iOS app was developed and is maintained by Peter. The Android app was developed and is maintained by Deji. The idea was Timi's. Slide into our DMs if you have any questions, comments, or concerns. \n\nEmail\nDeji: amarquis@umass.edu\nTimi: oiwayemi@umass.edu\nPeter: ptao@umass.edu\n\n"
    })
}


parse();

// Scrape the website every 15 minutes
var minutes = 15, the_interval = minutes * 60 * 1000;
setInterval(function() {
  parse();
}, the_interval);

/* Server Response */
app.get('/schedule', (req, res) => {
  res.send(scrapeInfo);
})

app.listen(port, () => {
  console.log(`Started app on port ${port}`)
})
