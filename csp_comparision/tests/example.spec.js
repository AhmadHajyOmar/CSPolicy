const { firefox, devices, chromium, webkit, expect } = require('playwright-extra');
const playwright = require('playwright-extra');
const parser = require('./csp_parsing')
const uaParser = require('ua-parser-js');
const fs = require('fs')
var json_arr = new Array();
const readline = require("readline");
const { Console } = require('console');
const path = require('path');
const { version } = require('os');
const { setUncaughtExceptionCaptureCallback } = require('process');


// user-agents for chrom, firfox and webkit-safari
let dev = JSON.stringify(playwright.devices)
dev = dev.substring(1, dev.length-1)
dev = dev.split(/"},/)
let json_chromium = {}
let json_webkit = {}
let json_firefox = {}
let allDeveices = new Array();
let devNamesChrome = new Array();
let devNamesFirfox = new Array();
let devNamesWebkit = new Array();
let devNames = new Array();
let subpagesWithMark = new Array();
//console.log("CCCCCCCCCCCCCCCCCCCCCCCCCC")
//console.log(JSON.stringify(playwright.chromium))

getUA(devNames);
//console.log(devNames)
//devNames = devNames.slice(32,36);
var subPages = new Array();



/*for(let sp of subPagesAll) {
  subPages.push(sp.split(/\s/))
}*/
//console.log("hhhhhhhhhhhhhhhhhhhhhh")
//console.log(subPages)

const input = fs.readFileSync("./tests/urls", 'utf-8')

const urls = input.split(/\r?\n/);
urls.pop()
urls.pop()
//console.log(urls)
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
var page_names = new Array()
var subPagesToTest = new Array()
var subPagesDB = new Array();
var homePageDB = new Array();
var homePageDB_PIndex = new Array();
let line ="";
let  notReachableLinksArray = new Array();
let notReachableLinks = "";
if (fs.existsSync("./tests/notReachableLinks")){
  notReachableLinksArray = fs.readFileSync(`./tests/notReachableLinks`, 'utf-8').split(/\r?\n/);
  for(let i = 0; i < notReachableLinksArray.length; i++){
    //console.log(notReachableLinksArray[i])
    if(i == notReachableLinksArray.length -1 ){
      notReachableLinks += notReachableLinksArray[i]
    }else{
      notReachableLinks += notReachableLinksArray[i] + "\n"
    }
  }
}
const run_option = process.argv.splice(2);
let choosedBrowsers = new Array();
let allcspolicy;
let fn;
var lat = 51.2822469
var lon = 9.5334177
var choice = 0;
let uaM = new Array();
let uaD = new Array();
let uaNon = new Array()

if (fs.existsSync("./tests/geo")){
  var geo = fs.readFileSync("./tests/geo", 'utf-8').split(/\r?\n/);
  //console.log(geo)
  lat = parseFloat(geo[0])
  lon = parseFloat(geo[1])
  choice = parseInt(geo[2])

}
//console.log(lat)
//console.log(lon)
console.log(choice)
// determine the required set of devicese according to the used browser and which broser should be used
if(choice === 1){
  if(usedBrowserToTest.includes("WebKit")){
    for(let devW of devNamesWebkit){
      devNames.push(devW)
    }
    choosedBrowsers.push(1)
  }
  
  if(usedBrowserToTest.includes("Chrome")){
    for(let devC of devNamesChrome){
      devNames.push(devC)
    }
    choosedBrowsers.push(2)
  }
  
  if(usedBrowserToTest.includes("Firefox")){
    for(let devF of devNamesFirfox){
      devNames.push(devF)
    }
    choosedBrowsers.push(3)
  }
}
if(choice === 2){
  if(run_option[0] === 'h'){
    if(op.includes("Android")){
      for(let i = 0; i < 1;){
        let ua = getNoneExistedMobileDesktopUserAgent(["Android"])
        if(!uaNon.includes(ua)){
          uaNon.push(ua)
          devNames.push(`${ua.split(/\s/g)[0].split("/")[0]}MBA`)
          i++;
        }
      }
      if(!choosedBrowsers.includes(2)){
        choosedBrowsers.push(2)
      }
      if(!choosedBrowsers.includes(3)){
        choosedBrowsers.push(3)
      }
  
    }
    if(op.includes("iOS")){
      for(let i = 0; i < 1;){
        let ua = getNoneExistedMobileDesktopUserAgent(["iOS"])
        if(!uaNon.includes(ua)){
          uaNon.push(ua)
          devNames.push(`${ua.split(/\s/g)[0].split("/")[0]}MBI`)
          i++;
        }
      }
      if(!choosedBrowsers.includes(1)){
        choosedBrowsers.push(1)
      }
  
    }
    if(op.includes("Windows")){
      for(let i = 0; i < 1;){
        let ua = getNoneExistedMobileDesktopUserAgent(["Windows"])
        if(!uaNon.includes(ua)){
          uaNon.push(ua)
          devNames.push(`${ua.split(/\s/g)[0].split("/")[0]}DBW`)
          i++;
        }
      }
      if(!choosedBrowsers.includes(2)){
        choosedBrowsers.push(2)
      }
      if(!choosedBrowsers.includes(3)){
        choosedBrowsers.push(3)
      }
  
    }
    if(op.includes("Mac OS")){
      for(let i = 0; i < 1;){
        let ua = getNoneExistedMobileDesktopUserAgent(["macOS"])
        if(!uaNon.includes(ua)){
          uaNon.push(ua)
          devNames.push(`${ua.split(/\s/g)[0].split("/")[0]}DBM`)
          i++;
        }
      }
      if(!choosedBrowsers.includes(1)){
        choosedBrowsers.push(1)
      }
  
    }
    let uagents = new String()
    let devNamesFile = new String()
    for(let i = 0; i < uaNon.length; i++){
      if(i != uaNon.length-1){
        uagents+= uaNon[i]+"\n"
      }else{
        uagents+= uaNon[i]
  
      }
    }
  
    for(let i = 0; i < devNames.length; i++){
      if(i != devNames.length-1){
        devNamesFile+= devNames[i]+"\n"
      }else{
        devNamesFile+= devNames[i]
  
      }
    }
    fs.writeFileSync(`./tests/uagentsNoneExis.txt`, uagents)
    fs.writeFileSync(`./tests/uagentsNoneExisDevNames.txt`, devNamesFile)


  }
  if(run_option[0] === 's'){
    if(fs.existsSync(`./tests/uagentsNoneExis.txt`)){
      uaNon = fs.readFileSync(`./tests/uagentsNoneExis.txt`, 'utf-8').split(/\r?\n/);

    }
    if(fs.existsSync(`./tests/uagentsNoneExisDevNames.txt`)){
      devNames = fs.readFileSync(`./tests/uagentsNoneExisDevNames.txt`, 'utf-8').split(/\r?\n/);

    }
    choosedBrowsers.push(1)
    choosedBrowsers.push(2)
    choosedBrowsers.push(3)
  }
  
}
let uamalFormed = new Array()
if(choice === 3){
  choosedBrowsers.push(1)
  choosedBrowsers.push(2)
  choosedBrowsers.push(3)
  uamalFormed.push("Mobile/1.0 (Android; 12.8)")
  uamalFormed.push("Chrome/91.0 (Windows; 14.1)")
  devNames.push(`MobileMalFormedMBA`)
  devNames.push(`DesktopMAlFormedDBW`)

  let uagents = new String()
  let devNamesFile = new String()
  uagents = "Mobile/1.0 (Android; 12.8)" + "\n" + "Chrome/91.0 (Windows; 14.1)"
  devNamesFile = "Mobile-mal-formed" + "\n" + "Desktop-mal-formed"
  fs.writeFileSync(`./tests/uagents-mal-formed.txt`, uagents)
  fs.writeFileSync(`./tests/uagents-mal-formed-DevNames.txt`, devNamesFile)
 
}
//console.log(uaNon)
console.log(devNames)
//dev_arr.pushe(2)
//console.log(devNames)
//devNames = devNames.slice(2, 4)
//console.log(devNames);

//console.log(run_option.length);
//console.log(run_option);
//console.log(subPages);
let pages = new Array()
for(var t of urls){
  let page = "";
  let hp = t.split(".")
  for(let i = 0; i < hp.length; i++){
    if(i != hp.length-1){
      page += hp[i]+"-"
    }else{
      page += hp[i]

    }
  }
  pages.push(page)
}
if (fs.existsSync(`./tests/subpages.txt`)){
  var subPagesAll = fs.readFileSync(`./tests/subpages.txt`, 'utf-8').split(/\r?\n/);
  //console.log(subPagesAll)
  //console.log(subPagesAll.length)
  let pagesUN = new Array();
  //subPagesAll.pop();
  for(let i = 0; i < subPagesAll.length; i++) {
    if(/\s/. test(subPagesAll[i])){
      let p = subPagesAll[i].split(/\s/)[0].split(".")
      let page = p[p.length-1].split("Ahmad")[1]
      if(pages.includes(page)){
        pagesUN.push(page)
      }
    }
  }
  //console.log(pagesUN)
  //console.log(pagesUN.length)
  //console.log(pages)
  //console.log(pages.length)
  //console.log(urls)
  //console.log(urls.length)
  //console.log("UUUUUUUUUUUUUUUUUUUUUUUUUU")
  //console.log(pagesUN)
  for(let pun of pagesUN){
    let partPages = new Array();
    for(let i = 0; i < subPagesAll.length; i++){
      let pages = subPagesAll[i].split(/\s/)
      for(let sp of pages){
        if(sp.endsWith(pun)){
          subpagesWithMark.push(sp)
          partPages.push(sp.split("Ahmad")[0])
        }
      }
    }
    subPages.push(partPages)
  }
}

switch(run_option.length) {
  case 1:

    if(run_option[0] === 'h'){
      //console.log("visit homepages")
      run(urls, true, false);
    }

    if(run_option[0] === 's'){
      //console.log("visit subpages")
      if(subPages.length === 0) {
        console.log("There is no subpages stored in the data base")
        console.log("Please use the following command :  node ./tests/example.spec.js h")
        console.log("To visit the homepages to extract subpages.")
      }else {
        //console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
        const indexs = new Array();
        const index_2 = new Array();
        let subpages_Shuffel = new Array();
        let allSubPages = new Array();
        //console.log(subPages)
        for(let n = 0; n < subPages.length; n++){
          homePageDB.push([subPages[n], 1])
          for(let m = 0; m < subPages[n].length; m++){
            //console.log(subPages[n][m])
            //console.log(subPages[n][m].split("."))
            let subPageToCheck = subPages[n][m].split(".")
            if(subPageToCheck.length === 2){
              if(subPageToCheck[1].includes("/")){
                allSubPages.push(subPages[n][m])
              }
            }else {
              if(subPageToCheck[2].includes("/")){
                allSubPages.push(subPages[n][m])
              }
            }
          }
        }
        //console.log("GGGGGGGGGGGGGGG")
        //console.log(allSubPages)

        for(let i = 0; i < allSubPages.length; i++) {
          indexs[i] = i;
        }

        const includeAllElements = (arr1, arr2) => arr2.every(arr2Item => arr1.includes(arr2Item))
        const sameElements = (arr1, arr2) => includeAllElements(arr1, arr2) && includeAllElements(arr2, arr1);
        var sameUrls = false;
        var sameIndex = false;
        var i = 0;
        //console.log(allSubPages)

        //console.log(index_2)
        //console.log(allSubPages.length)
        while(true) {
          var j = Math.floor(Math.random() * allSubPages.length);
          if (!index_2.includes(j)) {
            index_2.push(j)
            subpages_Shuffel[i] =allSubPages[j]
            i++
            sameUrls = sameElements(allSubPages, subpages_Shuffel)
            sameIndex = sameElements(indexs, index_2)
            if(sameUrls && sameIndex) {
              //console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
              break;
            }
            //console.log(subpages_Shuffel.length)
          }
          //console.log(subpages_Shuffel)
          //dev_arr.pushe(2)

         
        }

        //console.log("FFFFFFFFFFFFFF")
        //console.log(subpages_Shuffel)
        /*for(let p = 0; p < homePageDB.length; p++){
          
          homePageDB[p] = [homePageDB[p].split(".")[1].split(".")[0],1]
        }*/
        //console.log(homePageDB)
        //console.log(subpages_Shuffel)
        //console.log(subpages_Shuffel.length)

        run(subpages_Shuffel, false, false);
      }
    }
  break;
  default:
    console.log("please read the follosing instructions :")
    console.log("Step 1 : use the following command to visit all targeted homepages and extract subpages. ")
    console.log(" node ./tests/example.spec.js h")
    console.log("Step 2 : use the following command to visit all subpages.")
    console.log(" node ./tests/example.spec.js s")
}




function run(urls, searchSubPages, requestedFailed) {

  (async() => {
    let i = 0;
    let notReachableWebsites = "";
    if(!fs.existsSync(`./cspHeaders-${acceptLanguage}-${dir}`)){
      fs.mkdirSync(path.join("./", `cspHeaders-${acceptLanguage}-${dir}`));
    }
    
    if(!fs.existsSync(`./notReachableLinks-${acceptLanguage}-${dir}`)){
      fs.mkdirSync(path.join("./", `notReachableLinks-${acceptLanguage}-${dir}`));
    }

    if(!fs.existsSync(`./UserAgents-${acceptLanguage}-${dir}`)){
      fs.mkdirSync(path.join("./", `UserAgents-${acceptLanguage}-${dir}`));
    }
    //console.log(urls)
    for(var u of urls) {
      i++;
      console.log(u)
      console.log(i)
      var page_name_var = 1;
      let flage_homePage = true;
      let flage_subpages = true;
      let lk = u
      let page_name = new String();
      let start = true;
      let arrDu = new Array()

     
      if(!(u.includes("https://") || u.includes("http://"))) {
        u = `https://www.${u}`
      }

      //page_name = u.split(".")[1]
      //page_name = page_name.split(".")[0]
      let parr = u.split(".")
      for(let z = 1; z < parr.length;z++){
        if(z!= parr.length-1){
          page_name += parr[z]+"-"
        }else{
          page_name += parr[z]

        }
      }
      if(!searchSubPages){
        let arrSub = new Array()
        //console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
        //console.log(subpagesWithMark)
        for(let x = 0; x < subpagesWithMark.length; x++){
          let x_y = subpagesWithMark[x].split("Ahmad")
          //console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU")
          //console.log(x_y)
          //console.log(u)
          if(x_y[0] === u) {
            page_name = x_y[1]
            break;  
          }
          //console.log(page_name)
        }
        let found = false;
        for(let o = 0; o < homePageDB.length; o++){
          for(let k = 0; k < homePageDB[o][0].length; k++){
            if(homePageDB[o][0][k] === u){
              //console.log("LOOK HERE :")
              //console.log(homePageDB[o][0])
              //console.log(u)
              //console.log(homePageDB[o][1])
              page_name = `${page_name}§${homePageDB[o][1]}`
              if(homePageDB[o][1] > 5){
                console.log(page_name)
                console.log(u)
                console.log(homePageDB[o][0][k])
              }
              homePageDB[o][1] = homePageDB[o][1] + 1
              //console.log(page_name)
              //console.log(homePageDB[o][1])
              found = true;
              break;
            }
          }
          if(found){
            break;
          }
        }



      }
      /*if(page_names.includes(page_name)) {
        page_name = `${page_name}_${page_name_var}`
        page_name_var++
        page_names.push(page_name)
      } else {
        page_names.push(page_name)
        page_name_var = 1;
      }*/
      let url;
      if(!u.includes("https://")){
        url = `https://${u}`;
      } else {
        url = u;
      }
      //console.log(devNames)
      for(let q = 0; q < devNames.length; q++) {
        //console.log("LOOK")
        console.log(devNames[q])
        let dev = devNames[q]
        let found1 = false;
       
        let reachable = true;
      
      
        for(let i = 0; i < choosedBrowsers.length; i++){
          dev = devNames[q]
          //console.log(dev)
          //console.log(uaNon[q])
          //console.log(choosedBrowsers[i])
          let found2 = false;
          let chBro = choosedBrowsers[i]
         

          if((choice === 2 && ((uaNon[q].includes("Android") && (chBro === 2 || chBro === 3)) || (uaNon[q].includes("Windows;") && (chBro === 2|| chBro === 3) ) || (uaNon[q].includes("Mobile; iOS") && (chBro === 1)) || (uaNon[q].includes("macOS;") && (chBro === 1) ) )) || choice === 1 || choice === 3){
            homePageDB.push(url);
            //console.log(url)
           
  
            //let devStr = JSON.stringify(dev);
            //console.log(dev)
            //console.log(devStr)
            //devStr = devStr.replace("}"," }")
        
            //console.log("KKKKKKKKK")
            //console.log(devStr)
            //dev = JSON.parse(devStr);
            //console.log(dev)
            
            //let dev = devNames[i];
            let browser;
            let broserName;
            let version;
            if(chBro === 1){
              browser = await playwright.webkit.launch({headless: true,
                //slowMo:  0,
                timeout: 30 * 100000});  
              broserName = "WebKit"
            }
            if(chBro === 2){
              browser = await playwright.chromium.launch({ headless: true,
                //slowMo:  0,
                timeout: 30 * 100000});
              broserName = "Chrome"  
            }
           
            if(chBro === 3){

              browser = await playwright.firefox.launch({ headless: true,
                //slowMo:  0,
                timeout: 30 * 100000});  
              broserName = "Firefox"  
              
            }
      
            let model_name = dev;
            if(choice === 1){
              dev = devices[dev];
            }
            if(choice === 2){
              if(dev.includes("MBA")){
    
                dev = {
                  name: model_name,
                  userAgent: uaNon[q],
                  viewport: {
                    width: 1280,
                    height: 720,
                    deviceScaleFactor: 1,
                    isMobile: true,
                    hasTouch: true,
                    isLandscape: false,
                  },
                  browserName: 'chromium', 
                  browserVersion: browser.version(),
                };
                devices[model_name] = dev
               
              
              }else if(dev.includes("MBI")){
    
                dev = {
                  name: model_name,
                  userAgent: uaNon[q],
                  viewport: {
                    width: 1280,
                    height: 720,
                    deviceScaleFactor: 1,
                    isMobile: true,
                    hasTouch: true,
                    isLandscape: false,
                  },
                  browserName: 'Mobile Safari', 
                  browserVersion: browser.version(),
                };
                devices[model_name] = dev
               
              
              }else if(dev.includes("DBW")){
    
                dev = {
                  name: model_name,
                  userAgent: uaNon[q],
                  viewport: {
                    width: 1280,
                    height: 720,
                    deviceScaleFactor: 1,
                    isMobile: false,
                    hasTouch: false,
                    isLandscape: false,
                  },
                  browserName: 'chromium', 
                  browserVersion: browser.version(),
                };
                devices[model_name] = dev
            
              
              }else if(dev.includes("DBM")){
    
                dev = {
                  name: model_name,
                  userAgent: uaNon[q],
                  viewport: {
                    width: 1280,
                    height: 720,
                    deviceScaleFactor: 1,
                    isMobile: false,
                    hasTouch: false,
                    isLandscape: false,
                  },
                  browserName: 'Safari', 
                  browserVersion: browser.version(),
                };
                devices[model_name] = dev
             
              
              }
            }
            if(choice === 3){
              dev = {
                name: model_name,
                userAgent: uamalFormed[q],
                viewport: {
                  width: 1280,
                  height: 720,
                  deviceScaleFactor: 1,
                  isMobile: false,
                  hasTouch: false,
                  isLandscape: false,
                },
                browserName: 'chromium', 
                browserVersion: browser.version(),
              };
              devices[model_name] = dev
            }
            let context;
            if(choice === 1){
              if(chBro === 3){
                let devStr = JSON.stringify(dev);
                devStr = devStr.replace("\"isMobile\":true,", "")
                devStr = devStr.replace("\"isMobile\":false,", "")
                dev = JSON.parse(devStr);
              }

              context = await browser.newContext({
                ...dev,
                premissions: ['geolocation'],
                geolocation: {latitude: lat, longitude: lon},
                locale: `${acceptLanguage}`,
                ignoreHTTPSErrors: true
              });
            }else{
              context = await browser.newContext({
                ...devices[model_name],
                premissions: ['geolocation'],
                geolocation: {latitude: lat, longitude: lon},
                locale: `${acceptLanguage}`,
                ignoreHTTPSErrors: true
              });
            }
        
  
            let page = await context.newPage();
            
            //console.log(uaParser(dev.userAgent))
            let csp = new Array();
            let headers = new Array();
            let allCSP = new Array();
            let finalheaders = new Array();
            //let collectResHeaders = false;
            //const getUA = await page.evaluate(() => navigator.userAgent);
            const userAgentInfo= uaParser(dev.userAgent);
            //console.log(userAgentInfo)
           
            //console.log("IIIIIIIIIIIIIII")
            //console.log(userAgentInfo)
            let browserversion = browser.version();
            /*if(chBro === 2) {
              browserversion = version.product.split("/")[1]
            }*/
            //console.log(page_name)
            let requestHeadersArray = new Array();
            let failed = "false";
          
           
            try{
              if(!fs.existsSync(`./cspHeaders-${acceptLanguage}-${dir}/${page_name}`)){
                fs.mkdirSync(path.join(`./cspHeaders-${acceptLanguage}-${dir}/`, `${page_name}`));
              }
              if(!fs.existsSync(`./UserAgents-${acceptLanguage}-${dir}/${page_name}`)){
                fs.mkdirSync(path.join(`./UserAgents-${acceptLanguage}-${dir}/`, `${page_name}`));
              }
            }catch(err){
              console.log(err)
            }
            await page.on("response", async (response) => {
  
              try {
                let os = userAgentInfo.os.name
               
                //console.log(os)
  
                //console.log(os)
                op.push(os)
                let os_version = userAgentInfo.os.version;
                if(choice === 2){
                  if((uaNon[q].includes("Mobile; iOS") && (chBro === 1))){
                    os = "iOS"
                    os_version = "14.1"
                  }
                }
                if(choice === 3){
                  if(os === "Android"){
                    os_version = "12.8"
                  }else{
                    os = "Windows"
                    os_version = "14.1"
                  }
                }
                let pass = false;
                if (choice === 1 && usedBrowserToTest.includes("Firefox")){
                    pass = true;
                }
                if(op.includes(os) && (usedBrowserToTest.includes(userAgentInfo.browser.name) || pass === true || (userAgentInfo.browser.name === "Android Browser" && usedBrowserToTest.includes(userAgentInfo.engine.name))) || choice === 2 || choice === 3) {
  
                  if(response.request().resourceType() == 'document'){
                    let requestAllHeaders = response.request().headers();
                    requestHeadersArray = parser.requestHeaders(JSON.stringify(requestAllHeaders), requestHeadersArray);
  
                    let allHeaders = await response.headers();
                    let href = await response.url();
                    //console.log(href)
                    if(href === url || href === `${url}/`){
                      //console.log(allHeaders)
                      let headers_arr = parser.cspParser(allHeaders);
                      //console.log(headers_arr)
                      let headers = parser.cspParser_GetAllHeaders(headers_arr)
                      //console.log(headers)
                      allCSP.push(headers_arr)
                      allcspolicy += headers_arr + ","
                      csp = parser.getCSP_Policy(csp, headers, headers_arr);
                    }
                   
                    //console.log(csp)
      
                    if(model_name.endsWith("landscape")) {
                      model_name = model_name.substring(0,model_name.indexOf(" landscape"))
                    }
  
                    let fileName = `csp_${model_name}_${broserName}_${browserversion}_${os}_${dev.viewport.height}_${dev.viewport.width}_${os_version}_${page_name}.json`
                    fn = fileName;
                    let json = {};
                    let counterCSP = 1;
                    for(let i = 0; i < csp.length; i++) {
                      let key = csp[i][0]
                      let value = csp[i][1][0];
                      if(key === "content-security-policy"){
                        key = key + `-${counterCSP}`;
                        counterCSP++;
                      }
                      json[key] = value;
                    } 
                    //console.log(json)
                    json['url'] = url
                    fs.writeFileSync(`./cspHeaders-${acceptLanguage}-${dir}/${page_name}/${fileName}`, JSON.stringify(json))
  
                    let json_2 = {};
                    for(let i = 0; i < requestHeadersArray.length; i++){
                      json_2[requestHeadersArray[i][0]] = requestHeadersArray[i][1]
                    }
                    let fileName_UA = `UserAgent ${fileName}`;
                    fs.writeFileSync(`./UserAgents-${acceptLanguage}-${dir}/${page_name}/${fileName_UA}`, JSON.stringify(json_2))
  
                  }               
                }
              } catch (error) {
                console.log("JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ")
                console.error(error);
              }
              // if only one csp is safe then the page deploy a safe csp //page level
              // limited analyze if the home pages and all subpages depoly a safe csp the the domain deploy a safe csp // domain level
              // domain level with my dataset :D 
            }); 
            
            try{
              await page.goto(url, { waitUntil: "load"});
            }catch (e) {
              //console.log(e);
              ``
              if(!fs.existsSync(`./notReachableLinks-${acceptLanguage}-${dir}/${page_name}`)){
                fs.mkdirSync(path.join(`./notReachableLinks-${acceptLanguage}-${dir}/`, `${page_name}`));
              }
              const os = userAgentInfo.os.name
              const os_version = userAgentInfo.os.version;
              
              let fileName = `csp_${model_name}_${broserName}_${browserversion}_${os}_${dev.viewport.height}_${dev.viewport.width}_${os_version}_${page_name}.json`
              let json = {}
              json["Not Reachable webpage"] = page_name
              json["visited links"] = url
              fs.writeFileSync(`./notReachableLinks-${acceptLanguage}-${dir}/${page_name}/${fileName}`, JSON.stringify(json))
              reachable = false
            }
            //await waitingTime(2000)
            var index = 0
            var index_ = 0
            var urlIsThere = false
            var index_url = 0
            var paths = new Array();
            //console.log(subPages)
            /*
            if(searchSubPages && reachable) {
  
              for(let i = 0; i < subPages.length; i++) {
                if(subPages[i][0] === url) {
                  urlIsThere = true
                  index_url = i
                }
              }
              //console.log(urlIsThere)
              if(urlIsThere){
                //console.log("Is there !!!")
                //console.log(url)
              }
  
              if(urlIsThere){
                
                if(flage_homePage){
                  flage_homePage = false;
                  line += url + " "
                }
  
                for(let spe of subPages) {
                  for(let i = 1; i < spe.length; i++){
                    if(!subPagesToTest.includes(spe[i])){
                      subPagesToTest.push(spe[i])
                      if(i != spe.length - 1){
                        line += `${spe[i]}Ahmad${page_name}` + " "
                      }else {
                        line += `${spe[i]}Ahmad${page_name}`
                      }
                    }
                  }
                }
                
                line += "\n"
      
              } else {
                if(flage_subpages){
                  flage_subpages = false;
                  if(flage_homePage){
                    flage_homePage = false;
                    line += `${url}Ahmad${page_name}` + " "
                  }
                  let links;
                  try{
                    links = await page.evaluate(() => {
                      return Array.from(document.links).map(item => item.href);
                    });
                    console.log(model_name)
                    //console.log(links)
                    if(links.length > 0){
                      for(var u of links) {
                        if(u.includes("://") && u.split("://").length > 1){
                          const url = new URL(u);
                          if( !paths.includes(url.pathname) ) {
                            paths.push(url.pathname);
                          }
                        }
                        
                        //console.log(u)
                        //console.log(url.pathname)
                      }
                      
                      if(paths.length <= 4) {
                        console.log("OR HIERRRRRRRRRRRRRRRRRRRRRRRRR")
                        let counter = 0;
      
                        for(let i = 0; i < paths.length ; i++) {
                          for(let j = 0; j < links.length; j++) {
                            if(links[j].includes(paths[i])){
                              if(!subPagesToTest.includes(links[j])){
                                subPagesToTest.push(links[j])
                                if (i == paths.length - 1){
                                  line += `${links[j]}Ahmad${page_name}`
                                }else{
                                  line += `${links[j]}Ahmad${page_name}` + " "
                                }
                                break;
                              }
                            } 
                          }
                        }
                        line += "\n"
                      }else {
                        console.log("HIER HIIIIIIIIIEEEEEEEEEEEEEER!!!!")
                        let used_paths = new Array()
                        for(let i = 0; i < 5 ; i++) {
                          for(let j = 0; j < links.length; j++) {
                            if(links[j].includes(paths[i])){
                              if(!subPagesToTest.includes(links[j])){
                                console.log(url)
                                subPagesToTest.push(links[j])
                                if (i == 4){
                                  line += `${links[j]}Ahmad${page_name}` 
                                }else{
                                  line += `${links[j]}Ahmad${page_name}` + " "
                                }
                                break;
                              }
                            }
                          }
                        }
                        line += "\n"
                      }
                      fs.writeFileSync(`./tests/subpages.txt`, line)
                    }
  
                  }catch(err){
                    console.log(err)
                  }
                  
                 
                } 
              }	
            }
            */
            await context.close();
            await browser.close();
          }
         
         

        } 

        if(found1){
          break;
        }     
      }
      //dev_arr.pushe(2)


    }
  })(); 
}



function waitingTime(ms) {
  return new Promise((resolve, reject) => {
      setTimeout(resolve, ms)
  })
}



function getUA(devNames) {

  for(let i = 0; i <dev.length; i++) {
    let d = dev[i];
    let dev_name= d.substring(0, d.indexOf(':'))
    let dev_ua = d.substring(d.indexOf('{'),d.length-1)
    let dev_ua_json = dev_ua+"}";
    if(d != dev[dev.length-1]) {
      if(dev_ua.endsWith("u")) {
        dev_ua += "m"
      } else if(dev_ua.endsWith("i")) {
        dev_ua += "t"
      } else {
        dev_ua += "x"
      }
      dev_ua = dev_ua.substring(1,dev_ua.length)
      dev_ua = dev_ua + "\""
    } else {
      dev_ua = dev_ua.substring(1, dev_ua.length-1)
    }
    let dev_ua_option = dev_ua.split(",\"viewport\":")
    if(d.includes("screen")) {
      dev_ua_option = [dev_ua_option[0], `"viewport":${dev_ua_option[1].split(",\"screen\":")[0]}`,  `${dev_ua_option[1].split(",\"screen\":")[1]}`, `${dev_ua_option[1].split(",\"screen\":")[1].split(/},/)[1]}`]
      dev_ua_option[2] = `"screen":${dev_ua_option[2].split(",\"screen\":")[0].split(/},/)[0]+"}"}`
  
    } else {
      dev_ua_option = [dev_ua_option[0], `"viewport":${dev_ua_option[1].split(/},/)[0]}`+"}", `${dev_ua_option[1].split(/},/)[1]}`]
  
    }
    let dev_arr = dev_ua_option[dev_ua_option.length-1].split(",")
    dev_ua_option.pop()
    for(let j = 0; j<dev_arr.length; j++) {
      dev_ua_option.push(dev_arr[j])
    }
    allDeveices.push([dev_name, dev_ua_option])
    
    if(dev_ua_option[dev_ua_option.length-1].includes("chromium")) {
      json_chromium[dev_name]=dev_ua_json
      dev_name = dev_name.substring(1, dev_name.length-1)
      devNamesChrome = [
      'Galaxy S9+',
      'Galaxy S9+ landscape',
      'Galaxy Tab S4',
      'Galaxy Tab S4 landscape',
      'Desktop Chrome'];
      //console.log(devNamesChrome)
    } else if(dev_ua_option[dev_ua_option.length-1].includes("webkit")) {
      json_webkit[dev_name]=dev_ua_json
      dev_name = dev_name.substring(1, dev_name.length-1)
      devNamesWebkit = [
        'iPhone 13',
        'iPhone 13 landscape',
        'Desktop Safari',
        'Galaxy Note 3',
        'Galaxy Note 3 landscape'];

    } else {
      json_firefox[dev_name]=dev_ua_json
      dev_name = dev_name.substring(1, dev_name.length-1)
      devNamesFirfox.push(dev_name)
      devNamesFirfox = ['Desktop Firefox',
      'Galaxy S9+',
      'Galaxy S9+ landscape',
      'iPhone 13',
      'iPhone 13 landscape' ]
      //console.log(devNamesFirfox)
    }
  
  }

  fs.writeFileSync(`./tests/chromium_dev.json`, JSON.stringify(json_chromium))
  fs.writeFileSync(`./tests/webkit_dev.json`, JSON.stringify(json_webkit))
  fs.writeFileSync(`./tests/firefox_dev.json`, JSON.stringify(json_firefox))
    
}



function getNoneExistedMobileDesktopUserAgent(operatingSystem) {
  const useragents = [
    "Mobile/6.0 (Mobile; Android 27.6; FakeUA/6)",
    "Mobile/6.0 (Mobile; iOS 14.1; FakeUA/2)",
    "Desktop/114.0 (Windows NT 13.9; Windows; x32; FakeUA/6)",
    "Desktop/114.0 (Windows NT 13.9; macOS; x32; FakeUA/2)",
  ]
  
  let ua = new String();
  while(1){
    ua = useragents[Math.floor(Math.random() * useragents.length)]
    if(operatingSystem.includes("Windows") || operatingSystem.includes("macOS")){
      if(ua.includes(`${operatingSystem[0]};`)){
        break;
      }
    }else{
      if(ua.includes(`${operatingSystem[0]}`)){
        break;
      }
    }
   
  }
  return ua;
}

