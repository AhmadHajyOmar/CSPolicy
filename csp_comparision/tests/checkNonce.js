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
const op = fs.readFileSync("./tests/option", 'utf-8').split(/\r?\n/);
const geo = fs.readFileSync("./tests/geo", 'utf-8').split(/\r?\n/);

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
var folder = `./nonceValue-${acceptLanguage}-${dir}`
var resultFolder = `./HomeSubNonce-${acceptLanguage}-${dir}`
var resultFolder2 = `./nonceDuplicate-${acceptLanguage}-${dir}`
const  jsonsFiles =  fs.readdirSync(folder).filter((filename) => path.extname(filename) === '.json');
let homePages = new Array()
let subpages = new Array()
let nonceInfo = new Array()
//console.log(jsonsFiles)
let csp_policies = new Array();
jsonsFiles.forEach(filename => {
    if(!filename.includes("§") && !homePages.includes(filename.split("_")[0])){
        homePages.push(filename.split("_")[0])
    }else{
        if(!subpages.includes(filename.split("_")[0])){
            subpages.push(filename.split("_")[0])
        }
    }

    let opNonce = new Array()
    //console.log(filename)
    const fileData = fs.readFileSync(path.join(folder, filename));                    
    const json_arr = JSON.parse(fileData.toString());
    let json_str = JSON.stringify(json_arr);
    json_after_split = json_str.substring(1, json_str.length - 1);
    json_after_split = json_after_split.split(/,"/)
    opNonce.push(filename.split("_")[0])
    filename_debuger = filename
    let arr_2 = new Array();
    //console.log(json_after_split)
    for (var elem of json_after_split) {
        let header;
        let arr_;
        let header_value;
        if((elem.includes(":") && !elem.includes("http")) || elem.includes("visited link")){
            arr_ = elem.split(/":/);
            //console.log(arr_)
            //console.log("UUUUUUUUUUUUUUUUUUUUU")
            //console.log(arr_)
            //console.log(arr_[1])
            header = delete_StrSy(arr_[0], "\"");
            header_value = delete_StrSy(arr_[1], "\"")
            header_value = delete_StrSy(header_value, "\\")
            arr_2.push([header, header_value])
        }else {
            elem = elem.replaceAll("\"", "")
            if(elem.endsWith(" ")){
                arr_2[arr_2.length-1][1] = arr_2[arr_2.length-1][1] + elem
            }else{
                arr_2[arr_2.length-1][1] = arr_2[arr_2.length-1][1] + " " + elem
            }
        }
                        
    }
    opNonce.push(arr_2)
    
    nonceInfo.push(opNonce)
    //console.log(csp)
    
});



run();
checkNonceHomeSubPages();
//console.log(nonceInfo)
function checkNonceHomeSubPages(){
    if(!fs.existsSync(resultFolder)){
        fs.mkdirSync(path.join("./", resultFolder));
    }
    for(var e of homePages){
        for(var t of nonceInfo){
            if(e === t[0]){
                let nonceHome = t[1][0][1];
                let json = {};
                let page_name = t[0]
                let uriPageName = t[1][8][1];
                json["home page"] = page_name
                json["home page link"] = uriPageName
                json["home page nonce value"] = nonceHome
                let devName = t[1][1][1];
                let browserName = t[1][2][1];
                let browserVersion = t[1][3][1];
                let operSys = t[1][4][1];
                let operSysVersion = t[1][5][1];
                let vHeight = t[1][6][1];
                let vWidth = t[1][7][1];
                let info = `${devName}_${browserName}_${browserVersion}_${operSys}_${vHeight}_${vWidth}_${operSysVersion}_${page_name}`
                json["home page info"] = info
                let similarnoncevaluesinSubpages = new Array();
                for(var s of subpages){
                    if(s.includes(e) && s != e){
                        console.log("KKKKKKKK")
                        console.log(s)
                        console.log(e)
                        for(var ni of nonceInfo){
                            let page_name = ni[0]
                            if(ni[0] === s){
                                
                                let nonceSub = ni[1][0][1];
                                if(nonceHome === nonceSub){
                                    let devName = ni[1][1][1];
                                    let browserName = ni[1][2][1];
                                    let browserVersion = ni[1][3][1];
                                    let operSys = ni[1][4][1];
                                    let operSysVersion = ni[1][5][1];
                                    let vHeight = ni[1][6][1];
                                    let vWidth = ni[1][7][1];
                                    let uriPageName = ni[1][8][1];
                                    let info = `${devName}_${browserName}_${browserVersion}_${operSys}_${vHeight}_${vWidth}_${operSysVersion}_${page_name}_${uriPageName}`
                                    similarnoncevaluesinSubpages.push(info)
                                }
                            }
                        }
                    }
                }
              
                json["similar with"] = similarnoncevaluesinSubpages;

                fs.writeFileSync(`${resultFolder}/${info}_nonceDuplicated.json`, JSON.stringify(json))
            }
        }
        
    }
}

function run() {
    if(!fs.existsSync(resultFolder2)){
        fs.mkdirSync(path.join("./", resultFolder2));
    }
    (async () => {
        for(var e of nonceInfo){
            //console.log(e)
            let nonceValue = e[1][0][1];
            let devName = e[1][1][1];
            let browserName = e[1][2][1];
            let browserVersion = e[1][3][1];
            let operSys = e[1][4][1];
            let operSysVersion = e[1][5][1];
            let vHeight = e[1][6][1];
            let vWidth = e[1][7][1];
            let uriPageName = e[1][8][1];
            let page_name = e[0]
            console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
            console.log(page_name)
            console.log(devName)
            

            let dev = devices[devName];
            //console.log(dev)
            //console.log(vHeight)
            //console.log(dev.viewport.height)
            if(parseInt(dev.viewport.height)  != vHeight){
                dev = devices[`${devName} landscape`]
                //let devtry = devices["Galaxy S5 landscape"]
                //console.log(devtry)
            }
            //console.log(vHeight)
            //console.log(dev.viewport.height)
        
            let bro;
            if(browserName === "Chrome"){
                //console.log("LLLLLLLLLLLLLLLLLLL")
                bro = await playwright.chromium.launch({ headless: true, timeout: 30 * 100000});
            }
            if(browserName === "WebKit"){
                bro = await playwright.webkit.launch({headless: true, timeout: 30 * 100000}); 
            }
            if(browserName === "Firefox"){
                bro = await playwright.firefox.launch({ headless: true, timeout: 30 * 100000}); 
                let devStr = JSON.stringify(dev);
                devStr = devStr.replace("\"isMobile\":true,", "")
                devStr = devStr.replace("\"isMobile\":false,", "")
                dev = JSON.parse(devStr);
            }
    
            let context = await bro.newContext({
                ...dev,
                premissions: ['geolocation'],
                geolocation: {latitude: parseFloat(geo[0]), longitude: parseFloat(geo[1])},
                locale: 'de-DE',
                ignoreHTTPSErrors: true
            });
            let page = await context.newPage();
            await page.on("response", async (response) => {
                if(response.request().resourceType() == 'document'){
                    let allHeaders = await response.headers();
                    let allHeadersStr = JSON.stringify(allHeaders)
                    if(allHeadersStr.includes("\"content-security-policy\":")){
                        let index = allHeadersStr.indexOf("'nonce")
                        let nonceStr = allHeadersStr.substring(index+1, allHeadersStr.length-1)
                        nonceStr = nonceStr.substring(0, nonceStr.indexOf("'"))
                        nonceStr = nonceStr.replace("nonce-", "")
                        let fileName = `NonceDupp_${devName}_${browserName}_${browserVersion}_${operSys}_${vHeight}_${vWidth}_${operSysVersion}_${page_name}`
                        let json = {};
    
                        if(nonceStr === nonceValue){
                            json['device name'] = devName
                            json['device viewport-height'] = vHeight
                            json['device viewport-width'] = vWidth
                            json['browser name'] = browserName
                            json['browser version'] = browserVersion
                            json['operating system'] = operSys
                            json['operating system version'] = operSysVersion
                            json['page name'] = uriPageName
                            json['duplicate nonce value'] = nonceStr
                            //console.log("KKKKKKKKKKKKKKKKK")
                           
                            fs.writeFileSync(`${resultFolder2}/${fileName}_nonceDuplicated.json`, JSON.stringify(json))
                        
                        }
                        
                    }
                        
                }    
            
            });          
            try{
                await page.goto(uriPageName, { waitUntil: "load"});
            }catch(err){
                console.log(err)
            }        
            await context.close();
            await bro.close();
            //waitingTime(2000)
            
            //console.log(nonceInfo.length)
            /*for(let i = 0; i < 2; i++){
                check_DuplicateNonce(nonceValue, devName, browserName, browserVersion, operSys, vHeight, vWidth, operSysVersion, uriPageName, page_name);
            } */   
        }
        console.log("JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ")
    })();

}







    
function check_DuplicateNonce(nonceValue, devName, browserName, browserVersion, operSys, vHeight, vWidth, operSysVersion, uriPageName, page_name){
    (async () => {
        let dev = devices[devName];
        let bro;
        if(browserName === "Chrome"){
            console.log("LLLLLLLLLLLLLLLLLLL")
            bro = await playwright.chromium.launch({ headless: false, timeout: 30 * 100000});
        }
        if(browserName === "WebKit"){
            bro = await playwright.webkit.launch({headless: true, timeout: 30 * 100000}); 
        }
        if(browserName === "Firefox"){
            bro = await playwright.firefox.launch({ headless: true, timeout: 30 * 100000}); 
            let devStr = JSON.stringify(dev);
            devStr = devStr.replace("\"isMobile\":true,", "")
            devStr = devStr.replace("\"isMobile\":false,", "")
            dev = JSON.parse(devStr);
        }
   
        let context = await bro.newContext({
            ...dev,
            premissions: ['geolocation'],
            geolocation: {latitude: 19.432608, longitude: -99.133209},
            locale: 'de-DE',
            ignoreHTTPSErrors: true
        });
        let page = await context.newPage();
        await page.on("response", async (response) => {
            if(response.request().resourceType() == 'document'){
                let allHeaders = await response.headers();
                let allHeadersStr = JSON.stringify(allHeaders)
                if(allHeadersStr.includes("\"content-security-policy\":")){
                    let index = allHeadersStr.indexOf("'nonce")
                    let nonceStr = allHeadersStr.substring(index+1, allHeadersStr.length-1)
                    nonceStr = nonceStr.substring(0, nonceStr.indexOf("'"))
                    nonceStr = nonceStr.replace("nonce-", "")
                    let fileName = `csp_${devName}_${browserName}_${browserVersion}_${operSys}_${vHeight}_${vWidth}_${operSysVersion}_${page_name}`
                    let json = {};

                    if(nonceStr === nonceValue){
                        json['device name'] = devName
                        json['device viewport-height'] = vHeight
                        json['device viewport-width'] = vWidth
                        json['browser name'] = browserName
                        json['browser version'] = browserVersion
                        json['operating system'] = operSys
                        json['operating system version'] = operSysVersion
                        json['page name'] = uriPageName
                        json['duplicate nonce value'] = nonceStr

                        fs.writeFileSync(`./nonceDuplicate/${fileName}_nonceDuplicated.json`, JSON.stringify(json))
                    
                    }
                       
                }
                    
            }    
           
        });          
        try{
            await page.goto(uriPageName, { waitUntil: "load"});
        }catch(err){
            console.log(err)
        }      
        await context.close();
        await bro.close();
    })();
}

function delete_StrSy(str, character) {
	while(str.includes(`${character}`)) {
		str = str.replace(`${character}`, '')
	}
	return str;
}

function waitingTime(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}