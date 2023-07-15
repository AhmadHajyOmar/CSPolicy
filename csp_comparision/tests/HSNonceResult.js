const { firefox, devices, chromium, webkit, expect } = require('@playwright/test');
const playwright = require('@playwright/test');
const parser = require('./csp_parsing')
const uaParser = require('ua-parser-js');
var json_arr = new Array();
const readline = require("readline");
const { Console } = require('console');
const { version } = require('os');
const fs = require('fs');
const { type } = require('os');
const path = require('path');
const { isContext, createContext } = require('vm');
const { NOTFOUND } = require('dns');
const { join } = require('path');
const { kMaxLength } = require('buffer');
var array = [
  ["-15.844159", "-47.914547", "w", "en-US", "1"],
  ["40.4081906", "78.5004047", "w", "en-US", "1"],
  ["40.4081906", "-3.6894398", "w", "en-US", "1"],
  ["40.4081906", "-3.6894398", "w", "de-DE", "1"],
  ["40.4081906", "-3.6894398", "w", "ar-SA", "1"],
  ["40.4081906", "-3.6894398", "w", "AR;q=10", "1"],
  ["40.4081906", "-3.6894398", "w", "ab-YZ", "1"],
  ["-15.844159", "-47.914547", "f", "en-US", "1"],
  ["40.4081906", "78.5004047", "f", "en-US", "1"],
  ["40.4081906", "-3.6894398", "f", "en-US", "1"],
  ["40.4081906", "-3.6894398", "f", "de-DE", "1"],
  ["40.4081906", "-3.6894398", "f", "ar-SA", "1"],
  ["40.4081906", "-3.6894398", "f", "AR;q=10", "1"],
  ["40.4081906", "-3.6894398", "f", "ab-YZ", "1"],
  ["-15.844159", "-47.914547", "c", "en-US", "1"],
  ["40.4081906", "78.5004047", "c", "en-US", "1"],
  ["40.4081906", "-3.6894398", "c", "en-US", "1"],
  ["40.4081906", "-3.6894398", "c", "de-DE", "1"],
  ["40.4081906", "-3.6894398", "c", "ar-SA", "1"],
  ["40.4081906", "-3.6894398", "c", "AR;q=10", "1"],
  ["40.4081906", "-3.6894398", "c", "ab-YZ", "1"],
  ["-15.844159", "-47.914547", "c", "en-US", "3"],
  ["40.4081906", "78.5004047", "c", "en-US", "3"],
  ["40.4081906", "-3.6894398", "c", "en-US", "3"],
  ["40.4081906", "-3.6894398", "c", "de-DE", "3"],
  ["40.4081906", "-3.6894398", "c", "ar-SA", "3"],
  ["40.4081906", "-3.6894398", "c", "AR;q=10", "3"],
  ["40.4081906", "-3.6894398", "c", "ab-YZ", "3"],
  ["-15.844159", "-47.914547", "c", "en-US", "2"],
  ["40.4081906", "78.5004047", "c", "en-US", "2"],
  ["40.4081906", "-3.6894398", "c", "en-US", "2"],
  ["40.4081906", "-3.6894398", "c", "de-DE", "2"],
  ["40.4081906", "-3.6894398", "c", "ar-SA", "2"],
  ["40.4081906", "-3.6894398", "c", "AR;q=10", "2"],
  ["40.4081906", "-3.6894398", "c", "ab-YZ", "2"]
 
]
var uri = fs.readFileSync("./website_1.txt", 'utf-8').split(/\r?\n/);
let web = new Array();
for(var u of uri){
  let i = u.split(".")
  let page = ""
  for(let j = 0; j < i.length; j++){
      if(j!=i.length-1){
          page += i[j]+"-"
      }else{
          page += i[j]
      }
  }
  web.push(page)
}

var uriSub = fs.readFileSync("./tests/SubpagseNames.txt", 'utf-8').split(/\r?\n/);
for(var e of uriSub){
  web.push(e)
}

let choosedBrowsers = new Array();
let usedBrowserToTest = new Array();
var subPages = new Array();
var lat = 0;
var lon = 0;
var choice = 0;
let browserChoice = "";
var op = ["Android", "iOS", "Windows", "Mac OS"]
var acceptLanguage = "";

var dir = "("


for(var e of array){
  console.log(e)
  choosedBrowsers = new Array()
  usedBrowserToTest = new Array();
  subPages = new Array();
  lat = parseFloat(e[0])
  lon = parseFloat(e[1])
  choice = parseInt(e[4])
  acceptLanguage = e[3]
  browserChoice = e[2];
  if (browserChoice === "c" && choice === 1){
    usedBrowserToTest = ["Chrome"]
  }else if (browserChoice === "w" && choice === 1){
    usedBrowserToTest = ["WebKit"]
  }else if (browserChoice === "f" && choice === 1){
    usedBrowserToTest = ["Firefox"]
  }else{
    if(choice != 1){
      console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
      usedBrowserToTest = ["Chrome", "Firefox", "WebKit"]
    }
  }
  console.log(usedBrowserToTest)
  
  var dir = new String();
  if(choice === 1){
    dir = "("+ lat + " " + lon + ")-("+(usedBrowserToTest[0])+")-(" + choice+")";
  }else{
    if(choice === 2){
      dir = "("+ lat + " " + lon + ")-(Non-Existing)-(" + choice+")";
    }else{
      dir = "("+ lat + " " + lon + ")-(Malformed)-(" + choice+")";

    }
  }
  for(var f of usedBrowserToTest){
    var folder = `./HomeSubNonce-${acceptLanguage}-${dir}-${f}`
    console.log(folder)
    if(fs.existsSync(folder)){
      console.log("UUUUUUUUUUUUUUUUUUUUUU")
      console.log(folder)
      let numberOfHomePagesThatProvideSimilarNonceValueLikeSub = new Array();
      let numberOfTotalHomePagesWithNoncesUsingDiffDev = 0
      let homePagesThatProvideSimilarNonceValueLikeSub = new Array();
      let homePagesArr = new Array()
      getPagesSaftyResult();
      var finalResult = `./final_Result-${acceptLanguage}-${dir}-${f}`
      if(!fs.existsSync(finalResult)){
        fs.mkdirSync(path.join("./", finalResult));
      }
      let json = {}
      json["Number of total home pages"] = numberOfTotalHomePagesWithNoncesUsingDiffDev
      json["home pages with nonce value"] = homePagesArr
      json["Number of homepages that have the same nonce value as it subpages"] = numberOfHomePagesThatProvideSimilarNonceValueLikeSub
      json["Homepages that have the same nonce value as it subpages"] = homePagesThatProvideSimilarNonceValueLikeSub
      fs.writeFileSync(`./${finalResult}/Home-SubpagesNonceValueSimilarity.json`, JSON.stringify(json))
    }
  }
}



function getPagesSaftyResult(){
    let numberOfSaftyPages = 0;
    const jsonsInDir =  fs.readdirSync(folder);
    jsonsInDir.forEach(filename => {
      const fileData = fs.readFileSync(path.join(folder, filename));                    
      const json_arr = JSON.parse(fileData.toString());
      let json_str = JSON.stringify(json_arr);
      json_after_split = json_str.substring(1, json_str.length - 1);
      json_after_split = json_after_split.split(/,"/)
      console.log(json_after_split)     
      let homePage = json_after_split[0].split("\":\"")[1].replace("\"","")  
      let homePageLink = json_after_split[1].split("\":\"")[1].replace("\"","")  
      let nonceValue = json_after_split[2].split("\":\"")[1].replace("\"","")  
      let devInfo = json_after_split[3].split("\":\"")[1].replace("\"","")  
      let similarW = json_after_split[4].split("\":")[1] 
      console.log(homePage)
      console.log(homePageLink)
      console.log(nonceValue)
      console.log(devInfo)
      console.log(similarW)
      if(similarW.length>2){
        numberOfHomePagesThatProvideSimilarNonceValueLikeSub++;
        homePagesThatProvideSimilarNonceValueLikeSub.push([`${homePage}(link ${homePageLink}) using the following op-ua ${devInfo} has the smae nonce value (${nonceValue}) as ${similarW} `])
      }
      if(!homePagesArr.includes(homePage)){
        homePagesArr.push(homePage)
        numberOfTotalHomePagesWithNoncesUsingDiffDev++;
      }
    });
}

