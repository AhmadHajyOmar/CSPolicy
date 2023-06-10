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
const op = fs.readFileSync("./tests/option", 'utf-8').split(/\r?\n/);
var acceptLanguage = op[op.length-1]
op.pop();
const usedBrowserToTest = fs.readFileSync("./tests/browserToTest", 'utf-8').split(/\r?\n/);
var dir = "(";
for(let i = 0; i < op.length; i++){
  if(i === op.length-1){
    dir += op[i] + ")"
  }else{
    dir += op[i] + " "
  }
}

dir += "-(" + usedBrowserToTest[0]+")"
var folder = `./HomeSubNonce-${acceptLanguage}-${dir}`
let numberOfHomePagesThatProvideSimilarNonceValueLikeSub = new Array();
let numberOfTotalHomePagesWithNoncesUsingDiffDev = 0
let homePagesThatProvideSimilarNonceValueLikeSub = new Array();
let homePagesArr = new Array()
getPagesSaftyResult();
var finalResult = `./final_Result-${acceptLanguage}-${dir}`
if(!fs.existsSync(finalResult)){
  fs.mkdirSync(path.join("./", finalResult));
}
let json = {}
json["Number of total home pages"] = numberOfTotalHomePagesWithNoncesUsingDiffDev
json["home pages with nonce value"] = homePagesArr
json["Number of homepages that have the same nonce value as it subpages"] = numberOfHomePagesThatProvideSimilarNonceValueLikeSub
json["Homepages that have the same nonce value as it subpages"] = homePagesThatProvideSimilarNonceValueLikeSub
fs.writeFileSync(`./${finalResult}/Home-SubpagesNonceValueSimilarity.json`, JSON.stringify(json))


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

