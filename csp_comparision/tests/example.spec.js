const { firefox, devices, chromium, webkit, expect } = require('playwright-extra');
const playwright = require('playwright-extra');
const parser = require('./csp_parsing')
const uaParser = require('ua-parser-js');
const fs = require('fs')
const path = require('path');
var json_arr = new Array();
const readline = require("readline");
const { Console } = require('console');
//const path = require('path');
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


/*var array = [
  ["50.1108539", "8.63226654", "w", "en-US", "1"],
  ["39.9950204", "127.61141", "w", "en-US", "1"],
  ["44.4862873", "-88.029133", "w", "en-US", "1"],
  ["-15.844159", "-47.914547", "w", "en-US", "1"],
  ["40.4081906", "78.5004047", "w", "en-US", "1"],
  ["30.0309385", "31.2364469", "w", "en-US", "1"],
  ["40.4081906", "-3.6894398", "w", "en-US", "1"],
  ["40.4081906", "-3.6894398", "w", "de-DE", "1"],
  ["40.4081906", "-3.6894398", "w", "ar-SA", "1"],
  ["40.4081906", "-3.6894398", "w", "ar-IQ", "1"],
  ["40.4081906", "-3.6894398", "w", "hi-IN", "1"],
  ["40.4081906", "-3.6894398", "w", "AR;q=10", "1"],
  ["40.4081906", "-3.6894398", "w", "ab-YZ", "1"],

  ["50.1108539", "8.63226654", "f", "en-US", "1"],
  ["39.9950204", "127.61141", "f", "en-US", "1"],
  ["44.4862873", "-88.029133", "f", "en-US", "1"],
  ["-15.844159", "-47.914547", "f", "en-US", "1"],
  ["40.4081906", "78.5004047", "f", "en-US", "1"],
  ["30.0309385", "31.2364469", "f", "en-US", "1"],
  ["40.4081906", "-3.6894398", "f", "en-US", "1"],
  ["40.4081906", "-3.6894398", "f", "de-DE", "1"],
  ["40.4081906", "-3.6894398", "f", "ar-SA", "1"],
  ["40.4081906", "-3.6894398", "f", "ar-IQ", "1"],
  ["40.4081906", "-3.6894398", "f", "hi-IN", "1"],
  ["40.4081906", "-3.6894398", "f", "AR;q=10", "1"],
  ["40.4081906", "-3.6894398", "f", "ab-YZ", "1"],

  ["50.1108539", "8.63226654", "c", "en-US", "1"],
  ["39.9950204", "127.61141", "c", "en-US", "1"],
  ["44.4862873", "-88.029133", "c", "en-US", "1"],
  ["-15.844159", "-47.914547", "c", "en-US", "1"],
  ["40.4081906", "78.5004047", "c", "en-US", "1"],
  ["30.0309385", "31.2364469", "c", "en-US", "1"],
  ["40.4081906", "-3.6894398", "c", "en-US", "1"],
  ["40.4081906", "-3.6894398", "c", "de-DE", "1"],
  ["40.4081906", "-3.6894398", "c", "ar-SA", "1"],
  ["40.4081906", "-3.6894398", "c", "ar-IQ", "1"],
  ["40.4081906", "-3.6894398", "c", "hi-IN", "1"],
  ["40.4081906", "-3.6894398", "c", "AR;q=10", "1"],
  ["40.4081906", "-3.6894398", "c", "ab-YZ", "1"],

  ["50.1108539", "8.63226654", "c", "en-US", "3"],
  ["39.9950204", "127.61141", "c", "en-US", "3"],
  ["44.4862873", "-88.029133", "c", "en-US", "3"],
  ["-15.844159", "-47.914547", "c", "en-US", "3"],
  ["40.4081906", "78.5004047", "c", "en-US", "3"],
  ["30.0309385", "31.2364469", "c", "en-US", "3"],
  ["40.4081906", "-3.6894398", "c", "en-US", "3"],
  ["40.4081906", "-3.6894398", "c", "de-DE", "3"],
  ["40.4081906", "-3.6894398", "c", "ar-SA", "3"],
  ["40.4081906", "-3.6894398", "c", "ar-IQ", "3"],
  ["40.4081906", "-3.6894398", "c", "hi-IN", "3"],
  ["40.4081906", "-3.6894398", "c", "AR;q=10", "3"],
  ["40.4081906", "-3.6894398", "c", "ab-YZ", "3"],

  ["50.1108539", "8.63226654", "c", "en-US", "2"],
  ["39.9950204", "127.61141", "c", "en-US", "2"],
  ["44.4862873", "-88.029133", "c", "en-US", "2"],
  ["-15.844159", "-47.914547", "c", "en-US", "2"],
  ["40.4081906", "78.5004047", "c", "en-US", "2"],
  ["30.0309385", "31.2364469", "c", "en-US", "2"],
  ["40.4081906", "-3.6894398", "c", "en-US", "2"],
  ["40.4081906", "-3.6894398", "c", "de-DE", "2"],
  ["40.4081906", "-3.6894398", "c", "ar-SA", "2"],
  ["40.4081906", "-3.6894398", "c", "ar-IQ", "2"],
  ["40.4081906", "-3.6894398", "c", "hi-IN", "2"],
  ["40.4081906", "-3.6894398", "c", "AR;q=10", "2"],
  ["40.4081906", "-3.6894398", "c", "ab-YZ", "2"],
 
]*/

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

const website = process.argv.splice(2);
let choosedBrowsers = new Array();
let usedBrowserToTest = new Array();
var subPages = new Array();
var lat = 0;
var lon = 0;
var choice = 0;
let browserChoice = "";
var op = ["Android", "iOS", "Windows", "Mac OS"]
var acceptLanguage = "";

var searchSubPages = false;
let reachable = false;


(async() => {

for(var e of array){
  choosedBrowsers = new Array()
  devNames = new Array();
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
    usedBrowserToTest = ["WebKit", "Mobile Safari", "Safari"]
  }else if (browserChoice === "f" && choice === 1){
    usedBrowserToTest = ["Firefox"]
  }else{
    if(choice != 1){
      usedBrowserToTest = ["Chrome", "Firefox", "WebKit"]
    }
  }

  let pageName = website[1];
  const url = website[2];
  let headmode = true;
  if(website[3] === "hf"){
    headmode = false;
  }

  const waitingTimeOp = website[4]
  
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

  console.log(dir)
  
  var homePageDB = new Array();
  let uaNon = new Array()
  

  if(choice === 1){
    searchSubPages = true;
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
    choosedBrowsers.push(1)
    choosedBrowsers.push(2)
    choosedBrowsers.push(3)

    if(website[0] == 'h'){
      console.log("ZZZZZZZZZZZZZZZZZZZZZ")
      searchSubPages = true;
      if(op.includes("Android")){
        for(let i = 0; i < 1;){
          let ua = getNoneExistedMobileDesktopUserAgent(["Android"])
        
          if(!uaNon.includes(ua)){
            uaNon.push(ua)
            devNames.push(`${ua.split(/\s/g)[0].split("/")[0]}MBA`)
            i++;
          }
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
    if(website[0] == 's'){
      if(fs.existsSync(`./tests/uagentsNoneExis.txt`)){
        uaNon = fs.readFileSync(`./tests/uagentsNoneExis.txt`, 'utf-8').split(/\r?\n/);
  
      }
      if(fs.existsSync(`./tests/uagentsNoneExisDevNames.txt`)){
        devNames = fs.readFileSync(`./tests/uagentsNoneExisDevNames.txt`, 'utf-8').split(/\r?\n/);
  
      }
    }
    
  }
  let uamalFormed = new Array()
  if(choice === 3){
    searchSubPages = true;
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
  //usedBrowserToTest.pushe(2)


    if(!fs.existsSync(`./cspHeaders-${acceptLanguage}-${dir}`)){
      fs.mkdirSync(path.join("./", `cspHeaders-${acceptLanguage}-${dir}`));
    }

    if(!fs.existsSync(`./UserAgents-${acceptLanguage}-${dir}`)){
      fs.mkdirSync(path.join("./", `UserAgents-${acceptLanguage}-${dir}`));
    }
  

    //console.log(devNames)
    for(let q = 0; q < devNames.length; q++) {
      //console.log("LOOK")
      console.log(devNames[q])
      let dev = devNames[q]
      let found1 = false;
     
      for(let i = 0; i < choosedBrowsers.length; i++){
        dev = devNames[q]
        //console.log(dev)
        //console.log(uaNon[q])
        //console.log(choosedBrowsers[i])
        let found2 = false;
        let chBro = choosedBrowsers[i]
       
        //console.log(uaNon[q])
        //console.log(chBro)

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
            browser = await playwright.webkit.launch({headless: headmode,
              timeout: 30 * 1000});  
            broserName = "WebKit"
          }
          if(chBro === 2){
            browser = await playwright.chromium.launch({ headless: headmode,
              timeout: 30 * 1000});
            broserName = "Chrome"  
          }
         
          if(chBro === 3){

            browser = await playwright.firefox.launch({ headless: headmode,
              timeout: 30 * 1000});  
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
                  width: 360,
                  height: 640,
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
                  width: 360,
                  height: 640,
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
            if(!fs.existsSync(`./cspHeaders-${acceptLanguage}-${dir}/${pageName}`)){
              fs.mkdirSync(path.join(`./cspHeaders-${acceptLanguage}-${dir}/`, `${pageName}`));
            }
            if(!fs.existsSync(`./UserAgents-${acceptLanguage}-${dir}/${pageName}`)){
              fs.mkdirSync(path.join(`./UserAgents-${acceptLanguage}-${dir}/`, `${pageName}`));
            }
          }catch(err){
            console.log(err)
          }
          console.log(url)
          await page.on("response", async (response) => {

            try {
              let os = userAgentInfo.os.name
             
              //console.log(os)

              //console.log(os)
              op.push(os)
              let os_version = userAgentInfo.os.version;
              //console.log(choice)
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
                    //console.log(allHeaders)
                    //console.log(headers_arr)
                    let headers = parser.cspParser_GetAllHeaders(headers_arr)
                    //console.log(headers)
                    allCSP.push(headers_arr)
                    csp = parser.getCSP_Policy(csp, headers, headers_arr);
                  }
                 
                  //console.log(csp)
    
                  if(model_name.endsWith("landscape")) {
                    model_name = model_name.substring(0,model_name.indexOf(" landscape"))
                  }

                  let fileName = `csp_${model_name}_${broserName}_${browserversion}_${os}_${dev.viewport.height}_${dev.viewport.width}_${os_version}_${pageName}.json`
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
                  fs.writeFileSync(`./cspHeaders-${acceptLanguage}-${dir}/${pageName}/${fileName}`, JSON.stringify(json))

                  let json_2 = {};
                  for(let i = 0; i < requestHeadersArray.length; i++){
                    json_2[requestHeadersArray[i][0]] = requestHeadersArray[i][1]
                  }
                  let fileName_UA = `UserAgent ${fileName}`;
                  fs.writeFileSync(`./UserAgents-${acceptLanguage}-${dir}/${pageName}/${fileName_UA}`, JSON.stringify(json_2))

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
            let time = parseInt(waitingTimeOp)
            if(time > 0){
              await waitingTime(time)
            }
            reachable = true;
          }catch (e) {
            //console.log(e);
            ``
            /*if(!fs.existsSync(`./notReachableLinks-${acceptLanguage}-${dir}/${pageName}`)){
              fs.mkdirSync(path.join(`./notReachableLinks-${acceptLanguage}-${dir}/`, `${pageName}`));
            }*/
            const os = userAgentInfo.os.name
            const os_version = userAgentInfo.os.version;
            
            let fileName = `csp_${model_name}_${broserName}_${browserversion}_${os}_${dev.viewport.height}_${dev.viewport.width}_${os_version}_${pageName}.json`
            let json = {}
            json["Not Reachable webpage"] = pageName
            json["visited links"] = url
            reachable = false
          }
          //await waitingTime(2000)
          var index = 0
          var index_ = 0
          var urlIsThere = false
          var index_url = 0
          var paths = new Array();
          //console.log(subPages)
          console.log(searchSubPages)
          console.log(reachable)
          /*if(searchSubPages && reachable) {
            searchSubPages = false;
            let flage_homePage = true;
            let flage_subpages = true;
            let line = new String()
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
              flage_subpages = false;
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
                  line += `${url}Ahmad${pageName}` + " "
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
                    console.log(links)
                    console.log(links.length)
                    console.log(paths)
                    console.log(paths.length)

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
          }*/
        
          await context.close();
          await browser.close();
        }
       
       

      } 

      if(found1){
        break;
      }     
    }
  /*
  switch(website.length) {
    
    case 3:
  
      if(website[0] == 'h'){
        
        console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
        console.log(uaNon)
        run(url, true, choosedBrowsers, pageName, url, uamalFormed, uaNon);
      }
  
      if(website[0] == 's'){
        run(url, false, choosedBrowsers, pageName, url, uamalFormed, uaNon);
      }
    break;
    default:
      console.log("please read the follosing instructions :")
      console.log("Step 1 : use the following command to visit all targeted homepages and extract subpages. ")
      console.log(" node ./tests/example.spec.js h")
      console.log("Step 2 : use the following command to visit all subpages.")
      console.log(" node ./tests/example.spec.js s")
  }
  */


}
})(); 

function run(urls, searchSubPages, choosedBrowsers, pageName, url, uamalFormed, uaNon) {


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

