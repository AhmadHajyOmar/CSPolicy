const fs = require('fs')

var topWebsites = fs.readFileSync("./top-1m.csv", 'utf-8').split(/\r?\n/);
var websites = new String()
for(let webS of topWebsites){
    websites += webS.split(",")[1]+"\n"
}
fs.writeFileSync(`./topWebSites`, websites)

console.log(websites)
