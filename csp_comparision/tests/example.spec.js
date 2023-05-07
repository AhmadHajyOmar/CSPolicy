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

let choosedBrowsers = new Array();
let allcspolicy;
let fn;
// determine the required set of devicese according to the used browser and which broser should be used

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
//console.log(devNames)
//devNames = devNames.slice(2, 4)
//console.log(devNames);

const run_option = process.argv.splice(2);
//console.log(run_option.length);
//console.log(run_option);
//console.log(subPages);

if (fs.existsSync(`./tests/subpages-${acceptLanguage}-${dir}.txt`)){
  var subPagesAll = fs.readFileSync(`./tests/subpages-${acceptLanguage}-${dir}.txt`, 'utf-8').split(/\r?\n/);
  let pagesUN = new Array();
  //subPagesAll.pop();
  for(let i = 0; i < subPagesAll.length; i++) {
    if(/\s/. test(subPagesAll[i])){
      pagesUN.push(subPagesAll[i].split(/\s/)[0].split(".")[1].split(".")[0])
    }
  }
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
        const indexs = new Array();
        const index_2 = new Array();
        let subpages_Shuffel = new Array();
        let allSubPages = new Array();
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
        while(true) {
          var j = Math.floor(Math.random() * allSubPages.length);
          if (!index_2.includes(j)) {
            index_2.push(j)
            subpages_Shuffel[i] =allSubPages[j]
            i++
          }
          sameUrls = sameElements(allSubPages, subpages_Shuffel)
          sameIndex = sameElements(indexs, index_2)
          if(sameUrls && sameIndex) {
            break;
          }
        }
        //console.log("FFFFFFFFFFFFFF")
        //console.log(subpages_Shuffel)
        /*for(let p = 0; p < homePageDB.length; p++){
          
          homePageDB[p] = [homePageDB[p].split(".")[1].split(".")[0],1]
        }*/
        //console.log(homePageDB)
        //console.log(subpages_Shuffel)
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
      let page_name;
    
      if(!(u.includes("https://") || u.includes("http://"))) {
        u = `https://www.${u}`
      }
      page_name = u.split(".")[1]
      page_name = page_name.split(".")[0]
      
      if(!searchSubPages){
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
      for(let dev of devNames) {
        let reachable = true;
        for(let i = 0; i < choosedBrowsers.length; i++){
          let chBro = choosedBrowsers[i]
  
          homePageDB.push(url);
          //console.log(url)
          
            let model_name = dev;
            dev = devices[dev];
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
              let devStr = JSON.stringify(dev);
              devStr = devStr.replace("\"isMobile\":true,", "")
              devStr = devStr.replace("\"isMobile\":false,", "")
              dev = JSON.parse(devStr);
            }
      
            let context = await browser.newContext({
              ...dev,
              premissions: ['geolocation'],
              geolocation: {latitude: 19.432608, longitude: -99.133209},
              locale: `${acceptLanguage}`,
              ignoreHTTPSErrors: true
            });
      
            let page = await context.newPage();
            //console.log(uaParser(dev.userAgent))
            let csp = new Array();
            let headers = new Array();
            let allCSP = new Array();
            let finalheaders = new Array();
            //let collectResHeaders = false;
            //const getUA = await page.evaluate(() => navigator.userAgent);
            const userAgentInfo= uaParser(dev.userAgent);
            
            let browserversion = browser.version();
            /*if(chBro === 2) {
              browserversion = version.product.split("/")[1]
            }*/
            //console.log(page_name)
            let requestHeadersArray = new Array();
            let failed = "false";
          
            if(requestedFailed){
              await page.on("requestfailed", async (response) => {
                //console.log(model_name)
                //console.log(page_name)
                //console.log("requestfailed");
                //console.log(page_name)
                notReachableWebsites += `${model_name}_${broserName}_${browserversion}_${userAgentInfo.os.name}_${dev.viewport.height}_${dev.viewport.width}_${userAgentInfo.os.version}_${page_name}`+"\n"
                });
                try{
                  await page.goto(url);
                }catch (e) {
                  //console.log(e);
                }
     
            }else{
              if(!fs.existsSync(`./cspHeaders-${acceptLanguage}-${dir}/${page_name}`)){
                fs.mkdirSync(path.join(`./cspHeaders-${acceptLanguage}-${dir}/`, `${page_name}`));
              }
              if(!fs.existsSync(`./UserAgents-${acceptLanguage}-${dir}/${page_name}`)){
                fs.mkdirSync(path.join(`./UserAgents-${acceptLanguage}-${dir}/`, `${page_name}`));
              }
              await page.on("response", async (response) => {
                try {
                  const os = userAgentInfo.os.name
                  const os_version = userAgentInfo.os.version;
                
                  if(op.includes(os) && (usedBrowserToTest.includes(userAgentInfo.browser.name) || (userAgentInfo.browser.name === "Android Browser" && usedBrowserToTest.includes(userAgentInfo.engine.name)))) {
                    if(response.request().resourceType() == 'document'){
                      //console.log(`${model_name} ${dev.viewport.height} ${dev.viewport.width} ${url}`)
                      let requestAllHeaders = response.request().headers();
                      //console.log(requestAllHeaders)
                      requestHeadersArray = parser.requestHeaders(JSON.stringify(requestAllHeaders), requestHeadersArray);
  
                      /*let allHeaders = await response.headers();
                      console.log(`${model_name} ${dev.viewport.height} ${dev.viewport.width} ${url}`)
                      //console.log(dev.viewport.height)
                      //console.log(dev.viewport.width)
                      //console.log(url)
                      //console.log(allHeaders)
                      let headers_arr = parser.cspParser(allHeaders);
                      headers = parser.cspParser_GetAllHeaders(headers_arr, headers)
                      allCSP.push(headers_arr)
                      //let finalheadersCompare = finalheaders;
                      finalheaders = parser.cspParserGetFinalHeaders(headers, finalheaders)
                      //console.log(allCSP)
                      //console.log(headers)
                      //console.log(finalheaders)
                      //csp = parser.getCSP_Policy(csp, headers, headers_arr);
                      csp = parser.cspParserGetAllResponseHeaders(finalheaders, allCSP, csp)*/
                      let allHeaders = await response.headers();
           
                      let headers_arr = parser.cspParser(allHeaders);
                      let headers = parser.cspParser_GetAllHeaders(headers_arr)
                      allCSP.push(headers_arr)
                      allcspolicy += headers_arr + ","
                      csp = parser.getCSP_Policy(csp, headers, headers_arr);
        
                      if(model_name.endsWith("landscape")) {
                        model_name = model_name.substring(0,model_name.indexOf(" landscape"))
                      }
    
                      /*if(os === "Mac OS" || os === "Windows") {
                        model_name = `Desktop${os[0]}`
                      }*/
    
                      let fileName = `csp_${model_name}_${broserName}_${browserversion}_${os}_${dev.viewport.height}_${dev.viewport.width}_${os_version}_${page_name}.json`
                      fn = fileName;
                      let json = {};
                      for(let i = 0; i < csp.length; i++) {
                        let key = csp[i][0]
                        let value = csp[i][1][0];
                        json[key] = value;
                      } 
                      json['url'] = url
                      //console.log(json)
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
                  console.error(error);
                }
               
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
        
                  //console.log(subPagesToTest)
                } else {
                  if(flage_subpages){
                    flage_subpages = false;
                    //console.log("Is Not there !!!")
                    /*const browser = await playwright.chromium.launch()
                    const page = await browser.newPage()
                    */
          
                    //await page.goto(url, { timeout: 80000 })
                    if(flage_homePage){
                      flage_homePage = false;
                      line += `${url}Ahmad${page_name}` + " "
                    }
                    const links = await page.evaluate(() => {
                      return Array.from(document.links).map(item => item.href);
                    });
                    //console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGG")
                    //console.log(links)
                    //urls.push(lk)
                    for(var u of links) {
                      if(u.includes("://")){
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
                      //console.log(url)
                      //console.log(paths)
                      let used_paths = new Array()
                      for(let i = 0; i < 5 ; i++) {
                        for(let j = 0; j < links.length; j++) {
                          /*
                          if(links[j].includes(paths[i])){
                            if(links[j].includes(url.substring(12,links[j].length-1).split(".")[0])){
                              if(!subPagesToTest.includes(links[j])){
        
                              }
                            }
                          }*/
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
                          /*console.log(links[j])
                          console.log(paths[i])
                          const resultStrComp = paths[i].localeCompare(new URL(links[j]).pathname, undefined, { sensitivity: 'base' });
                          if(resultStrComp == 0 && !subPagesToTest.includes(links[j])){
                            if(links[j].includes(url.substring(12,links[j].length-1).split(".")[0])){
                              subPagesToTest.push(links[j])
                              if (i == 3){
                                line += links[j] 
                              }else{
                                line += links[j] + " "
                              }
                            }
                            break;
                          } */
                          
                        }
                      }
                      line += "\n"
                    }
        
                    fs.writeFileSync(`./tests/subpages-${acceptLanguage}-${dir}.txt`, line)
                  }
                  
                }	
        
              }
              /*if(failed){
                fs.unlinkSync(`./tests/${page_name}_${model_name}`);
                
                fs.writeFileSync("./tests/notReachableLinks.txt", notReachableLinks)
              }*/
              /*const metaDescription = page.locator('meta[name="description"]');
              console.log(metaDescription)
              const gh = locator.getAttribute("http-equiv");
              console.log(gh)
              //await expect(metaDescription).toHaveAttribute('content', 'something')
              
              /*
              const descriptionTag = await page.$('meta[name="description"]');
              const description = await descriptionTag?.getAttribute('content');
        
              console.log(description)*/
              await context.close();
              await browser.close();
            }

            
           
          }
        
      }
    
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
      devNamesChrome = ['Galaxy S5',
      'Galaxy S5 landscape',
      'Galaxy S8',
      'Galaxy S8 landscape',
      'Galaxy S9+',
      'Galaxy S9+ landscape',
      'Galaxy Tab S4',
      'Galaxy Tab S4 landscape','Desktop Chrome HiDPI',
      'Desktop Edge HiDPI',
      'Desktop Chrome',
      'Desktop Edge'];
      //console.log(devNamesChrome)
    } else if(dev_ua_option[dev_ua_option.length-1].includes("webkit")) {
      json_webkit[dev_name]=dev_ua_json
      dev_name = dev_name.substring(1, dev_name.length-1)
      devNamesWebkit = ['Galaxy Note 3',
      'Galaxy Note 3 landscape',
      'Galaxy Note II',
      'Galaxy Note II landscape',
      'Galaxy S III',
      'Galaxy S III landscape',
      'iPad Pro 11',
      'iPad Pro 11 landscape',
      'iPhone 11',
      'iPhone 11 landscape',
      'iPhone 11 Pro',
      'iPhone 11 Pro landscape',
      'iPhone 11 Pro Max',
      'iPhone 11 Pro Max landscape',
      'iPhone 12',
      'iPhone 12 landscape',
      'iPhone 12 Pro',
      'iPhone 12 Pro landscape',
      'iPhone 12 Pro Max',
      'iPhone 12 Pro Max landscape',
      'iPhone 12 Mini',
      'iPhone 12 Mini landscape',
      'iPhone 13',
      'iPhone 13 landscape',
      'iPhone 13 Pro',
      'iPhone 13 Pro landscape',
      'iPhone 13 Pro Max',
      'iPhone 13 Pro Max landscape',
      'iPhone 13 Mini',
      'iPhone 13 Mini landscape','Desktop Safari'];

    } else {
      json_firefox[dev_name]=dev_ua_json
      dev_name = dev_name.substring(1, dev_name.length-1)
      devNamesFirfox.push(dev_name)
      //console.log(devNamesFirfox)
    }
  
  }

  fs.writeFileSync(`./tests/chromium_dev.json`, JSON.stringify(json_chromium))
  fs.writeFileSync(`./tests/webkit_dev.json`, JSON.stringify(json_webkit))
  fs.writeFileSync(`./tests/firefox_dev.json`, JSON.stringify(json_firefox))
    
}

