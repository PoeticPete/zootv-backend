
// Add start times based on a the lengths
// Params
//    data: the json data scraped from zaptv
// return
//    json with start times
function addStartTimes(data) {

  const startTime = parseFloat(data["startTime"])
  for(var channel of data["channels"]) {
    var currLength = 0;
    for(var showing of channel["showings"]) {
        showing["startTime"] = startTime + currLength * 60 * 1000 // mins to millis
        currLength += showing["length"]

    }
  }

  return data;
}

exports.addStartTimes = addStartTimes
