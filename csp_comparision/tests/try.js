const { firefox, devices, chromium, webkit, expect } = require('@playwright/test');
const playwright = require('@playwright/test');
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

getUA(devNames);
//console.log(devNames)
//devNames = devNames.slice(32,36);
var subPagesAll = fs.readFileSync("./tests/subpages.txt", 'utf-8').split(/\r?\n/);
let pagesUN = new Array();
//subPagesAll.pop();
for(let i = 0; i < subPagesAll.length; i++) {
  if(/\s/. test(subPagesAll[i])){
    pagesUN.push(subPagesAll[i].split(/\s/)[0].split(".")[1].split(".")[0])
  }
}
var subPages = new Array();
for(let pun of pagesUN){
  let partPages = new Array();
  for(let i = 0; i < subPagesAll.length; i++){
    let pages = subPagesAll[i].split(/\s/)
    for(let sp of pages){
      if(sp.includes(pun)){
        partPages.push(sp)
      }
    }
  }
  subPages.push(partPages)
}
/*for(let sp of subPagesAll) {
  subPages.push(sp.split(/\s/))
}*/
//console.log("hhhhhhhhhhhhhhhhhhhhhh")
//console.log(subPages)

const input = fs.readFileSync("./tests/urls", 'utf-8')
const urls = input.split(/\r?\n/);
const op = fs.readFileSync("./tests/option", 'utf-8').split(/\r?\n/);
const usedBrowserToTest = fs.readFileSync("./tests/browserToTest", 'utf-8').split(/\r?\n/);
var page_name_var = 1;
var page_names = new Array()
var subPagesToTest = new Array()
var subPagesDB = new Array();
var homePageDB = new Array();
let line ="";
let choosedBrowsers = new Array();
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
devNames = devNames.slice(36, 37)
//console.log(devNames)


console.log(urls)
for(var u of urls) {
  let flage_homePage = true;
  let flage_subpages = true;
  let lk = u
  let page_name;

  if(!(u.includes("https://") || u.includes("http://"))) {
    u = `https://www.${u}`
  }
  page_name = u.split(".")[1]
  page_name = page_name.split(".")[0]

  if(page_names.includes(page_name)) {
    page_name = `${page_name}_${page_name_var}`
    page_name_var++
    page_names.push(page_name)
  } else {
    page_names.push(page_name)
    page_name_var = 1;
  }
  let url;
  if(!u.includes("https://")){
    url = `https://${u}`;
  } else {
    url = u;
  }
  for(let i = 0; i < choosedBrowsers.length; i++){
    let chBro = choosedBrowsers[i]
    if(i == 0){
      getResHeaders(url, devNames, page_name, true, flage_homePage, flage_subpages, chBro)
    }else {
      getResHeaders(url, devNames, page_name, false, flage_homePage, flage_subpages, chBro)
    }
  }
 


}



function getResHeaders(url, devNames, page_name, searchSubPages, flage_homePage, flage_subpages, chBro) {
  homePageDB.push(url);
  console.log(url)
  for(let dev of devNames) {
    dev = devices[dev];
    //let dev = devNames[i];
    (async () => {
      //console.log("DEVICE")

      //console.log(dev.userAgent)
      //console.log(typeof dev.toString())
      //console.log(JSON.stringify(dev))
      let browser;
      let broserName;
      let version;
      if(chBro === 1){
        browser = await playwright.webkit.launch({ headless: true});  
        broserName = "WebKit"
      }
      if(chBro === 2){
        browser = await playwright.chromium.launch({ headless: true});
        broserName = "Chrome"  
      }
      if(chBro === 3){
        browser = await playwright.firefox.launch({ headless: true});  
        broserName = "Firefox"  
        let devStr = JSON.stringify(dev);
        devStr = devStr.replace("\"isMobile\":true,", "")
        devStr = devStr.replace("\"isMobile\":false,", "")
        dev = JSON.parse(devStr);
      }

      //const session = await browser.newBrowserCDPSession();
      //const version = await session.send('Browser.getVersion');
      //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
      //console.log(version)
      //console.log(playwright.chromium)
      let context = await browser.newContext({
        ...dev,
        premissions:['geolocation'],
        geolocation: {latitude: 19.432608, longitude: -99.133209},
        locale: 'de-DE',
       ignoreHTTPSErrors: true
      });

      let page = await context.newPage();
      //console.log(uaParser(dev.userAgent))
      let csp = new Array();
      //const getUA = await page.evaluate(() => navigator.userAgent);
      const userAgentInfo= uaParser(dev.userAgent);
      let model_name = userAgentInfo.device.model;
      let browserversion = browser.version();
      /*if(chBro === 2) {
        browserversion = version.product.split("/")[1]
      }*/
      //console.log(page_name)
      await page.on("response", async (response) => {
        const os = userAgentInfo.os.name
        const os_version = userAgentInfo.os.version;
       
        if(op.includes(os) && (usedBrowserToTest.includes(userAgentInfo.browser.name) || (userAgentInfo.browser.name === "Android Browser" && usedBrowserToTest.includes(userAgentInfo.engine.name)))) {
          //console.log("tttttttttttt")

          for(var d of allDeveices) {
            let dmn = d[0].substring(1,d[0].length-1)
            let vp = d[1][1]
            vp = vp.substring(vp.indexOf(":"), vp.length-1)
            vp = vp.substring(2,vp.length)
            let vp_arr = vp.split(",")
            let vpwidth = vp_arr[0].split(":")[1] * 1
            let vpheight = vp_arr[1].split(":")[1] * 1
        
            if(d[1][0].includes(userAgentInfo.ua.toString())) {
              if(dev.viewport.width === vpwidth && dev.viewport.height === vpheight) {
                model_name = dmn
              }
            }
          }
          let allHeaders;
          if(response.request().resourceType() == 'document'){
          
            }
          let headers_arr = parser.cspParser(allHeaders);
          let headers = parser.cspParser_GetAllHeaders(headers_arr)
          csp = parser.getCSP_Policy(csp, headers, headers_arr);
        
  
          if(model_name.endsWith("landscape")) {
            model_name = model_name.substring(0,model_name.indexOf(" landscape"))
          }
          if(os === "Mac OS" || os === "Windows") {
            model_name = `Desktop${os[0]}`
          }
          let fileName = `csp_${model_name}_${broserName}_${browserversion}_${os}_${dev.viewport.height}_${dev.viewport.width}_${os_version}_${page_name}.json`
          let json = {};
          for(let i = 0; i < csp.length; i++) {
            let key = csp[i][0]
            let value = csp[i][1][0];
            json[key] = value;
          } 
          
          //console.log(json)
          fs.writeFileSync(`./tests/${fileName}`, JSON.stringify(json))
        }
      });
      
      

      
      await page.goto(url, { waitUntil: "load", timeout: 600000 });
      var index = 0
			var index_ = 0
			var urlIsThere = false
			var index_url = 0
			var paths = new Array();
      //console.log(subPages)
			if(searchSubPages) {
				//console.log("BBBBBBBBBBUUUUUUUUUUUGGGGGGGGGGG")
				//console.log(subPages.length)
				for(let i = 0; i < subPages.length; i++) {
					//console.log("CONDIFTION")
					//console.log(url)
					//console.log(subPages[i][0] )
					//console.log(subPages[i][0] === url)
					if(subPages[i][0] === url) {
						urlIsThere = true
						index_url = i
					}
				}
        //console.log(urlIsThere)
        if(urlIsThere){
          console.log("Is there !!!")
          console.log(url)
        }
				if(urlIsThere) {
          if(flage_homePage){
            flage_homePage = false;
            line += url + " "
          }
					for(let spe of subPages) {
            for(let i = 1; i < spe.length; i++){
              if(!subPagesToTest.includes(spe[i])){
                subPagesToTest.push(spe[i])
                if(i != spe.length - 1){
                  line += spe[i] + " "
                }else {
                  line += spe[i]
                }
              }
            }
					}
          line += "\n"

          //console.log(subPagesToTest)
				} else {
          if(flage_subpages){
            flage_subpages = false;
            console.log("Is Not there !!!")
            /*const browser = await playwright.chromium.launch()
            const page = await browser.newPage()
            */
  
            //await page.goto(url, { timeout: 80000 })
            if(flage_homePage){
              flage_homePage = false;
              line += url + " "
            }
            const links = await page.evaluate(() => {
              return Array.from(document.links).map(item => item.href);
            });
            //console.log("LINKS:")
            //console.log(links)
            //console.log(links.length)
            /*console.log(links[0])
            console.log(!(links[0].includes("://")))
            console.log(!(links[1].includes("://")))*/
  
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
  
            //console.log("PATH")
            //console.log(paths)
            //console.log(paths.length)
            
            if(paths.length === 1  || path.length === 2) {
              let counter = 0;
              while (counter < 3) {
                index = Math.floor(Math.random() * links.length);
                if(!subPagesToTest.includes(links[index])) {
                  if(links[index].includes(url.substring(12,links[index].length-1).split(".")[0])){
                    subPagesToTest.push(links[index])
                  
                    if (counter == 2){
                      line += links[index] 
                    }else{
                      line += links[index] + " "
                    }
                    counter++
                  }
                }
              }
              line += "\n"
  
            }else {
              //console.log("HIER HIER!!!!")
              for(let i = 0; i < 4 ; i++) {
                for(let j = 0; j < links.length; j++) {
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
                  } 
                }
              }
              line += "\n"
            }
            //console.log("Final SubPages")
            //console.log(subPagesToTest)
            //console.log(line)
            fs.writeFileSync(`./tests/subpages.txt`, line)

            
            /*
            
            browser.close()
            console.log(subpages)
            const csv = `${subpages[index_]}, ${subpages[index_+1]}, ${subpages[index_+2]}\n`;
            index_ = index_ + 3
            fs.appendFileSync("./uris.csv", csv);
            console.log(subpages)
            */
          }
				}	

			}

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
    })();
  }
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
      devNamesChrome.push(dev_name)
    } else if(dev_ua_option[dev_ua_option.length-1].includes("webkit")) {
      json_webkit[dev_name]=dev_ua_json
      dev_name = dev_name.substring(1, dev_name.length-1)
      devNamesWebkit.push(dev_name)
    } else {
      json_firefox[dev_name]=dev_ua_json
      dev_name = dev_name.substring(1, dev_name.length-1)
      devNamesFirfox.push(dev_name)
    }

  }

  fs.writeFileSync(`./tests/chromium_dev.json`, JSON.stringify(json_chromium))
  fs.writeFileSync(`./tests/webkit_dev.json`, JSON.stringify(json_webkit))
  fs.writeFileSync(`./tests/firefox_dev.json`, JSON.stringify(json_firefox))
    
}

