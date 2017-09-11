var names = {"2.1": "HBO", "3.1": "HBO2", "4.1": "HBO Signature", "5.1": "HBO Family", "6.1": "FOX/WGGM-DT3 (Fox6 HD)", "7.1": "WGBY-DT-PBS", "8.1": "WTIC FOX", "9.1": "WSBK 38", "10.1": "WWLP-CW", "11.1": "Weather Channel", "12.1": "NECN", "13.1": "FOX News", "14.1": "HLN-CNN Headline News", "15.1": "TLC", "16.1": "CNN", "17.1": "BBC America", "18.1": "CCTV4", "18.2": "Deutsche Welle​", "19.1": "UVC 19", "20.1": "Student Life Info Channel", "20.2": "Electronic Channel Guide", "22.1": "CNBC", "23.1": "MSNBC", "24.1": "C-SPAN", "25.1": "C-SPAN2", "26.1": "Discovery Life (Fit TV)", "27.1": "Discovery Channel", "28.1": "Science Channel", "29.1": "National Geographic", "30.1": "History", "31.1": "Travel Channel", "32.1": "A & E", "33.1": "ABC Family", "34.1": "Cartoon Network", "35.1": "Disney Channel", "36.1": "Nickelodeon", "37.1": "Comedy Central", "38.1": "TV Land", "39.1": "Game Show Network", "40.1": "Animal Planet", "41.1": "!Entertainment TV", "42.1": "USA", "43.1": "FX", "44.1": "Spike TV", "45.1": "TNT", "46.1": "SyFy", "47.1": "Food Network", "48.1": "Bravo", "49.1": "TBS", "50.1": "OWN", "51.1": "WE Women’s Entertainment", "52.1": "Lifetime", "53.1": "HGTV Home and Garden TV", "54.1": "AMC", "55.1": "Tru TV", "56.1": "BET", "57.1": "cloo", "58.1": "MTV", "59.1": "MTV2", "60.1": "MTV-U", "61.1": "VH-1", "62.1": "BET VH-1 Soul", "63.1": "CMT", "64.1": "Independent Film Channel", "65.1": "TV Japan", "66.1": "Univision", "67.1": "Telemundo", "68.1": "Golf Channel", "69.1": "ESPN", "70.1": "ESPN 2", "71.1": "NFL Network", "72.1": "Comcast Sports Net", "73.1": "CBS Sports", "74.1": "NESN HD", "75.1": "ESPN Classic", "76.1": "ESPN News", "77.1": "ESPN U", "78.1": "Fox College Sports", "79.1": "NBC Sports Versus", "80.1": "FOX Sports 1", "81.1": "NBC HD", "82.1": "ABC HD", "83.1": "CBS HD", "84.1": "Cozi tv", "85.1": "PBS Kids", }

// get a channel's name based on a channel number
// Params
//    channel is the channel number as float
//    fallback is the fallback name
function getChannelName(channel, fallback) {
  if (channel in names) {
    return names[channel]
  }
  return fallback
}

exports.names = names;
exports.getChannelName = getChannelName;
