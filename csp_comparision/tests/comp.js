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
const { url } = require('inspector');
const { connected } = require('process');

let numberOfPagesDViewPSafeCSP = 0;
let numberOfPagesDViewPNotSafeCSP = 0;
let numberOfPagesDViewPSafeAndNotSafeCSP = 0;
let pagesDViewPSafeCSP = new Array();
let pagesDViewPNotSafeCSP = new Array();
let pagesDViewPSafeAndNotSafeCSP = new Array();
let pagesDViewPSafeAndNotSafeCSPWithDevicesInfo = new Array();

let numberOfPagesWithSafeCSPWithAllUserAgent = 0;
let numberOfPagesWithNotSafeCSPWithAllUserAgent = 0;
let numberOfPagesWithSafeAndNotSafeCSPWithAllUserAgent = 0;
let pagesWithSafeCSPWithAllUserAgent = new Array();
let pagesWithNotSafeCSPWithAlluserAgent = new Array();
let pagesWithSafeAndNotCSPWithAllUserAgent = new Array();
let checkCounter = 0;


let numberOfHomeSubpagesWithSafeCSPForAllUserAgent = 0
let numberOfHomeSubpagesWithNotSafeCSPForAllUserAgent = 0
let numberOfHomeSubpagesWithSafeAndNotSafeCSPForAllUserAgent = 0
let HomeSubpagesWithSafeCSPForAllUserAgent = new Array()
let HomeSubpagesWithNotSafeCSPForAllUserAgent = new Array()
let HomeSubpagesWithSafeAndNotSafeCSPForAllUserAgent = new Array();
let HomeSubpagesWithSafeAndNotSafeCSPForAllUserAgentDetails = new Array();

let numberOfHomeSubpagesDeployCSPForAllUserAgent = 0
let numberOfHomeSubpagesNotDeployCSPForAllUserAgent = 0
let numberOfHomeSubpagesDeployAndNotDeployCSPForAllUserAgent = 0
let HomeSubpagesDeployCSPForAllUserAgent = new Array()
let HomeSubpagesNotDeployCSPForAllUserAgent = new Array()
let HomeSubpagesDeployAndNotDeployCSPForAllUserAgent = new Array();
let HomeSubpagesDeployAndNotDeployCSPForAllUserAgentDetails = new Array();
let deployedNum = 0;
let pagesdeployCSPWithAllUserAgentsArr = new Array()
let pagesDoesNotdeployCSPWithAllUserAgentsArr = new Array()
let pagesdeployAndNotDeployCSPWithAllUserAgentArr = new Array()
let numberpagesdeployCSPWithAllUserAgentsArr = 0
let numberpagesDoesNotdeployCSPWithAllUserAgentsArr = 0
let numberpagesdeployAndNotDeployCSPWithAllUserAgentArr = 0

let numberOfHomeSubpagesSafeAgainstStealingCookiesForAllUserAgent = 0
let numberOfHomeSubpagesUnSafeAgainstStealingCookiesForAllUserAgent = 0
let numberOfHomeSubpagesSafeAndUnSafeAgainstStealingCookiesForAllUserAgent = 0
let HomeSubpagesSafeAgainstStealingCookiesForAllUserAgent = new Array();
let HomeSubpagesUnSafeAgainstStealingCookiesForAllUserAgent = new Array()
let HomeSubpagesSafeAndUnSafeAgainstStealingCookiesForAllUserAgent = new Array()
let HomeSubpagesSafeAndUnSafeAgainstStealingCookiesForAllUserAgentDetails = new Array();

let numberOfPagesProtectionAgainstStealingCookies = 0;
let numberOfPagesNoProtectionAgainstStealingCookies = 0;
let numberOfPagesProtectionAndNoProtectionAgainstStealingCookies = 0;
let pagesProtectionAgainstStealingCookies = new Array();
let pagesNoProtectionAgainstStealingCookies = new Array();
let pagesProtectionAndNoProtectionAgainstStealingCookies = new Array();

let numberOfPagesProtectionAgainstCSRF = 0;
let numberOfPagesNoProtectionAgainstCSRF = 0;
let numberOfPagesProtectionAndNoProtectionAgainstCSRF = 0;
let pagesProtectionAgainstCSRF = new Array();
let pagesNoProtectionAgainstCSRF = new Array();
let pagesProtectionAndNoProtectionAgainstCSRF = new Array();


let numberOfHomeSubpagesSafeAgainstCSRFForAllUserAgent = 0;
let numberOfHomeSubpagesUnSafeAgainstCSRFForAllUserAgent = 0;
let numberOfHomeSubpagesSafeAndUnSafeAgainstCSRFForAllUserAgent = 0;
let HomeSubpagesSafeAgainstCSRFForAllUserAgent = new Array();
let HomeSubpagesUnSafeAgainstCSRFForAllUserAgent = new Array();
let HomeSubpagesSafeAndUnSafeAgainstCSRFForAllUserAgent = new Array();
let HomeSubpagesSafeAndUnSafeAgainstCSRFForAllUserAgentDetails = new Array();


let numberOfPagesProtectionAgainsthijacking = 0;
let numberOfPagesNoProtectionAgainsthijacking = 0;
let numberOfPagesProtectionAndNoProtectionAgainsthijacking = 0;
let pagesProtectionAgainsthijacking = new Array();
let pagesNoProtectionAgainsthijacking = new Array();
let pagesProtectionAndNoProtectionAgainsthijacking = new Array();


let numberOfHomeSubpagesSafeAgainsthijackingForAllUserAgent = 0;
let numberOfHomeSubpagesUnSafeAgainstForhijackingAllUserAgent = 0;
let numberOfHomeSubpagesSafeAndUnSafeAgainsthijackingForAllUserAgent = 0;
let HomeSubpagesSafeAgainsthijackingForAllUserAgent = new Array()
let HomeSubpagesUnSafeAgainsthijackingForAllUserAgent = new Array()
let HomeSubpagesSafeAndUnSafeAgainsthijackingForAllUserAgent = new Array()
let HomeSubpagesSafeAndUnSafeAgainsthijackingForAllUserAgentDetails = new Array()

let numberOfPagesProtectionAgainstclickjacking = 0;
let numberOfPagesNoProtectionAgainstclickjacking = 0;
let numberOfPagesProtectionAndNoProtectionAgainstclickjacking = 0;
let pagesProtectionAgainstclickjacking = new Array();
let pagesNoProtectionAgainstclickjacking = new Array();
let pagesProtectionAndNoProtectionAgainstclickjacking = new Array();



    
let numberOfHomeSubpagesSafeAgainstclickjackingForAllUserAgent = 0;
let numberOfHomeSubpagesUnSafeAgainstForclickjackingAllUserAgent = 0;
let numberOfHomeSubpagesSafeAndUnSafeAgainstclickjackingForAllUserAgent = 0;
let HomeSubpagesSafeAgainstclickjackingForAllUserAgent = new Array();
let HomeSubpagesUnSafeAgainstclickjackingForAllUserAgent = new Array();
let HomeSubpagesSafeAndUnSafeAgainstclickjackingForAllUserAgent = new Array();
let HomeSubpagesSafeAndUnSafeAgainstclickjackingForAllUserAgentDetails = new Array();



let numberOfPagesProtectionAgainstSLLStripping = 0;
let numberOfPagesNoProtectionAgainstSLLStripping = 0;
let numberOfPagesProtectionAndNoProtectionAgainstSLLStripping = 0;
let pagesProtectionAgainstSLLStripping = new Array();
let pagesNoProtectionAgainstSLLStripping = new Array();
let pagesProtectionAndNoProtectionAgainstSLLStripping = new Array();


let numberOfHomeSubpagesSafeAgainstsllstrippingForAllUserAgent = 0;
let numberOfHomeSubpagesUnSafeAgainstForsllstrippingAllUserAgent = 0;
let numberOfHomeSubpagesSafeAndUnSafeAgainstsllstrippingForAllUserAgent = 0;
let HomeSubpagesSafeAgainstsllstrippingForAllUserAgent = new Array();
let HomeSubpagesUnSafeAgainstsllstrippingForAllUserAgent = new Array();
let HomeSubpagesSafeAndUnSafeAgainstsllstrippingForAllUserAgent = new Array();
let HomeSubpagesSafeAndUnSafeAgainstsllstrippingForAllUserAgentDetails = new Array();


var array = [
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

console.log(web)
console.log(uri)
let choosedBrowsers = new Array();
let usedBrowserToTest = new Array();
var subPages = new Array();
var lat = 0;
var lon = 0;
var choice = 0;
let choiceRun = 0;
let browserChoice = "";
var op = ["Android", "iOS", "Windows", "Mac OS"]
var acceptLanguage = "";
let devUA = new Array()
let devArr = new Array()
let allDev = new Array();
const inputCommand = process.argv.splice(2);
let compareOption = parseInt(inputCommand[0])
let pageDomainName = inputCommand[1]
choiceRun = parseInt(inputCommand[0])
for(var e of array){
    console.log(e)
    devArr = new Array();
    allDev = new Array();
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
  
    console.log(dir)

    if(choice === 1){
        if(usedBrowserToTest[0] === "Chrome"){
            devArr = ['Galaxy S9+', 'Galaxy Tab S4']
            devUA = ['Galaxy S9+_658_320', 'Galaxy S9+_320_658', 'Galaxy Tab S4_1138_712', 'Galaxy Tab S4_712_1138']
            allDev = ['Galaxy S9+_658_320', 'Galaxy S9+_320_658', 'Galaxy Tab S4_1138_712', 'Galaxy Tab S4_712_1138', 'Desktop Chrome_720_1280']
        }else if(usedBrowserToTest[0] === "Firefox"){
            devArr = ['Galaxy S9+', 'iPhone 13']
            allDev = ['Galaxy S9+_658_320', 'Galaxy S9+_320_658', 'iPhone 13_844_390', 'iPhone 13_390_844', 'Desktop Firefox_720_1280']
            devUA = ['Galaxy S9+_658_320', 'Galaxy S9+_320_658', 'iPhone 13_844_390', 'iPhone 13_390_844']
        }else{
            devArr = ['iPhone 13', 'Galaxy Note 3']
            allDev = ['iPhone 13_844_390', 'iPhone 13_390_844', 'Galaxy Note 3_640_360', 'Galaxy Note 3_360_640', 'Desktop Safari_720_1280']
            devUA = ['iPhone 13_844_390', 'iPhone 13_390_844', 'Galaxy Note 3_640_360', 'Galaxy Note 3_360_640']
        }
    }else{
        if(choice === 2){
            allDev = ['MobileMBA_640_360', 'MobileMBI_640_360', 'DesktopDBW_720_1280', 'DesktopDBM_720_1280']
        }else{
            allDev = ['Mobile-mal-formed_720_1280', 'Desktop-mal-formed_720_1280']
        }
    }
    var folder = `./cspHeaders-${acceptLanguage}-${dir}`
    var folder2 = `./compare-${acceptLanguage}-${dir}`
    var folder3 = `./nonceValue-${acceptLanguage}-${dir}`
    var resultFolderMobile = `./comparePagesWithDevices(Mobile)-${acceptLanguage}-${dir}`
    var resultFolderDesktop = `./comparePagesWithDevice(Desktop)s-${acceptLanguage}-${dir}`
    var resultFolder2Desktop = `./compareHomeWithSubpages(Desktop)-${acceptLanguage}-${dir}`
    var resultFolder2Mobile = `./compareHomeWithSubpages(Mobile)-${acceptLanguage}-${dir}`
    var resultFolderViewPort = `./compareViewPortDevices-${acceptLanguage}-${dir}`
    var finalResult = `./final_Result-${acceptLanguage}-${dir}`

    let testURL = new Array();
    let testURL2 = new Array();
    let testURL3 = new Array();
    let notReachableWebSites = new Array();
    let notReachableWebSites2 = new Array();
    let notr = 0;
    const jsonsInDir =  fs.readdirSync(folder);
    
    var permission = true;
   

    let counterDep = 0;
    let counterDepDesktop = 0;
    let counterDepMobile = 0;
    let counterSafeCSPDesktop = 0;
    let counterSafeCSPMobile = 0;
    let counterSafeCSP = 0;
    let counterDepCHECKER = 0;
    let counterDepDesktopCHECKER = 0;
    let counterDepMobileCHECKER = 0;
    for(var bro of usedBrowserToTest ){
        console.log("QQQQQQQQQQQQ")
        console.log(inputCommand)
        console.log(usedBrowserToTest.length)
        counterDep = 0;
        counterDepDesktop = 0;
        counterDepMobile = 0;
        counterSafeCSPDesktop = 0;
        counterSafeCSPMobile = 0;
        counterSafeCSP = 0;
        var csp_policies = new Array();
        let filenamesdup = new Array();

        if(choiceRun === 1){
            console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC")
            jsonsInDir.forEach(filename => {
            
                if(filename === pageDomainName || filename.includes(`${pageDomainName}§`) ) {
                    const files =  fs.readdirSync(`${folder}/${filename}`);
                    var csp = new Array();
                    let numOfFiles = 0;
                    files.forEach(fileN => {
                        if(fileN.includes(bro)){
                            numOfFiles++;
                            
                        }
                        
                    });
                    let filesCounter = 0;
                    files.forEach(fileN => {
                        if(fileN.includes(bro)){
                            filesCounter++;
                            //console.log(fileN)
                            if(!filenamesdup.includes(fileN.split(".json")[0])){
                                filenamesdup.push(fileN.split(".json")[0])
                            }
                            const fileData = fs.readFileSync(path.join(`${folder}/${filename}/`, fileN));
                            const json_arr = JSON.parse(fileData.toString());
                            let json_str = JSON.stringify(json_arr);
                            json_after_split = json_str.substring(1, json_str.length - 1);
                            json_after_split = json_after_split.split(/,"/)

                            check = fileN.split(".json")[0].substring(4)
                            filename_debuger = filename
                            let arr_2 = new Array();
                            for (var elem of json_after_split) {
                                if(elem != ""){
                                    let arr_ = elem.split(/:"/);
                                    let header = delete_StrSy(arr_[0], "\"");
                                    let header_value = delete_StrSy(arr_[1], "\"")
                                    header_value = delete_StrSy(header_value, "\\")
                                    arr_2.push([header, header_value])
                                }     
                            }
                          
    
                            csp.push([fileN.split(".json")[0].substring(4),arr_2])

                            if(filesCounter === numOfFiles){
                                csp_policies.push(csp)

                            }
                         
                        }
                        
                    });
           
    
                }
            });
             
          
            let uriPageName;
            if(csp_policies.length > 0) {
                
                let csp_safe = new Array();

                for(let i = 0; i < csp_policies.length; i++) {
                    let arr = csp_policies[i];

                    for(let i = 0; i < arr.length; i++){
                        let targetedArr = arr[i][0];
                        let csp_deployed = false;
                        page_name = arr[i][0].split("_")
                        page_name = page_name[page_name.length-1]
                        let details = arr[i][0].split("_");
    
                        uriPageName = arr[i][1][arr[i][1].length-1][1]
                        if(page_name === "google"){
                           
                        }
                        if(!web.includes(page_name)){
                            web.push(page_name)
                        }
                        
                        let csp_dir = new Array();
                        let sts;
                        let xfo;
                        let set_cookie;
                        let source = new Array();
                        let directive = "CSP header does not exist";
                        let flage = false;
                        let script_elem_falge = false;
                        let script_flage = false;
                        let default_flage = false;
                        let nonce_flage = false;
                        let hash_flage = false;
                        let eval_flage = false;
                        let inline_flage = false;
                        let protocol_flage = false;
                        let wildcard_flage = false;
                        let strictD_flage = false;
                        let data_flage = false;
                        let safe_flage = false;
                        let sources = new Array();
                        let directivesArray = new Array()
                        let safe_counter = 0;
                        let numOfCSP = 0;
                        //console.log(arr[i][1])
                        //console.log(page_name)
                        //console.log(page_name === "youtube-com")
                        let isCSPthere = 0;
                        let cspfound = false;
                        for(let hdr of arr[i][1]){
                            if(hdr[0].includes("content-security-policy") && (!hdr[0].includes("report"))){
                                //console.log("Deppppppppppppppp")
                                isCSPthere++;
                               /* if(page_name === "youtube-com"){
                                    console.log(hdr)
                                    hdr.pushe(2)
                                }*/
                                csp_dira = new Array()
                                source = new Array();
                                flage = false;
                                script_elem_falge = false;
                                script_flage = false;
                                default_flage = false;
                                nonce_flage = false;
                                hash_flage = false;
                                eval_flage = false;
                                inline_flage = false;
                                protocol_flage = false;
                                wildcard_flage = false;
                                strictD_flage = false;
                                data_flage = false;
                                safe_flage = false;
                                numOfCSP++;
                                csp_deployed = true;
                                if(cspfound === false){
                                    counterDep++;
                                    if(targetedArr.includes("Desktop")){
                                        //console.log(targetedArr)
                                     counterDepDesktop++;
                                     //console.log("DESKTOPDEP")
                                     if(!testURL.includes(page_name)){
                                        testURL.push(page_name)
    
                                     }
                                    }else{
                                     //console.log("MOBILEDEP")
    
                                     counterDepMobile++;
                                    }
                                    cspfound = true;
                                }
                               
                                hdr[1] = hdr[1].replace("nscript-src", ";script-src")
                                hdr[1] = hdr[1].replace("ndefault-src", ";default-src")
                                hdr[1] = hdr[1].replace("nscript-src-elem", ";script-src-elem")
                                csp_dir = getDirectives_content_secuirty_policy(arr[i][1], hdr[0])
    
    
                                if (csp_dir.includes("script-src-elem")) {
                                    directive = "script-src-elem"
                                    source = getDirective_Sources(arr[i][1], "script-src-elem")
                                    flage = true;
                                    script_elem_falge = true;
            
                                    if(csp_dir.includes("script-src")) {
                                        script_flage = true;
                                    }
                                    if(csp_dir.includes("default-src")) {
                                        default_flage = true;
                                    }
                                }
                                else if (csp_dir.includes("script-src")) {
                                    directive = "script-src"
                                    source = getDirective_Sources([hdr], "script-src")
                                    flage = true;
                                    script_flage = true;
                                    if(csp_dir.includes("default-src")) {
                                        default_flage = true;
                                    }
                                } else if (csp_dir.includes("default-src")) {
                                    directive = "default-src"
                                    source = getDirective_Sources([hdr], "default-src")
                                    flage = true;
                                    default_flage = true;
                                }else{
                                    directive = "csp dose not contain script-src-elem, script-src or default-src"
                                    source = new Array()
                                    flage = false;
                                    //console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSs")
                                }
                                if(flage) {
                                    for (var v of source) { 
                            
                                        if(v.includes("nonce")) {
                                            
                                            nonce_flage = true;
                                         
                                            let options = arr[i][0].split("_")
                                            let devName = options[0]
                                            let browserName = options[1]
                                            let browserVersion = options[2]
                                            let operSys = options[3]
                                            let vHeight = options[4]
                                            let vWidth = options[5]
                                            let operSysVersion = options[6]
                                            let nonceValue = v.replace("\"","")
                                            nonceValue = nonceValue.replace("\'","")
                                            nonceValue = nonceValue.replace("nonce-", "")
                                            nonceValue = nonceValue.substring(0, nonceValue.length-1)
                                           
                                        
                                            let json_nonce = {}
                                            json_nonce["Nonce Value"] = nonceValue
                                            json_nonce["device Name"] = devName
                                            json_nonce["browser Name"] = browserName
                                            json_nonce["browser version"] = browserVersion
                                            json_nonce["operating system"] = operSys
                                            json_nonce["operatiny system version"] = operSysVersion
                                            json_nonce["viewport hight"] = vHeight
                                            json_nonce["viewport width"] = vWidth
                                            json_nonce["visited link"] = uriPageName
                                            json_nonce["page Name"] = page_name
                                            let fileName = `${page_name}_Nonce_${devName}_${browserName}_${browserVersion}_${operSys}_${vHeight}_${vWidth}_${operSysVersion}`
                                            if(!fs.existsSync(`${folder3}-${bro}`)){
                                                fs.mkdirSync(path.join("./", `${folder3}-${bro}`));
                                            }
                                            fs.writeFileSync(`${folder3}-${bro}/${fileName}.json`, JSON.stringify(json_nonce))
            
                                    
                                            //check_DuplicateNonce(nonceValue, devName, browserName, browserVersion, operSys, vHeight, vWidth, operSysVersion, uriPageName, page_name)
            
                                        }
                            
                                        if(v.includes("*")) {
                                            wildcard_flage = true;
                                        }
                            
                                        if(v.includes("http") || v.includes("https")) {
                                            protocol_flage = true;
                                        }
                            
                                        if (v === "'strict-dynamic'") {
                                            strictD_flage = true;
                                        }
                            
                                        if (v === "'unsafe-inline'") {
                                            inline_flage = true;
                                        }
                            
                                        if(v.includes("sha")) {
                                            hash_flage = true;
                                        }
                            
                                        if(v === "'unsafe-eval'") {
                                            eval_flage = true;
                                        }
                            
                                        if(v === "data:") {
                                            data_flage = true;
                                        }
                                    }
                                }
                                if(source.length > 0){
                                    sources.push(source)
                                }
                                directivesArray.push(csp_dir)
                               
                               
                                if(script_flage === true || default_flage === true || script_elem_falge === true) {
                                    if (  ((nonce_flage === true || hash_flage === true) && (wildcard_flage === false && protocol_flage === false)) || ((nonce_flage === false || hash_flage === false) && (inline_flage === false) && (protocol_flage === false) && (wildcard_flage === false) ) ||  ( strictD_flage === true && (nonce_flage === true || hash_flage === true)) ||  (nonce_flage === true || hash_flage === true))  {
                                        safe_flage = true;
                                        safe_counter++;
                                        counterSafeCSP++;
                                        if(targetedArr.includes("Desktop")){
                                            counterSafeCSPDesktop++;
                                           }else{
                                            counterSafeCSPMobile++;
                                           }
                                    }
                                }

    
                            }else{
                                if(hdr === arr[i][1][arr[i][1].length-1]){
                                    if(isCSPthere === 0 ){
                                        //console.log("NOTDEPLOYING")
                                        csp_deployed = false;
    
                                    }else{
                                        //console.log("DEPLOYING")
    
                                    }
                                }
                            }
                            if(safe_counter > 0 && safe_flage === true){
                                break;
                            }
                        }

                        if(csp_deployed){
                            counterDepCHECKER++;
                            if(targetedArr.includes("Desktop")){
                                counterDepDesktopCHECKER++;
                            }else{
                                counterDepMobileCHECKER++;
                            }
                        }          
                       
                        sts = getDirectives_content_secuirty_policy(arr[i][1], "strict-transport-security")
                        xfo = getDirectives_content_secuirty_policy(arr[i][1], "x-frame-options")
                        set_cookie = getDirectives_content_secuirty_policy(arr[i][1], "set-cookie")

                        // ************************************************************************************************************************************************************
                        // protection-level against stealing the cookies throw XXS attacks
    
                        let secure_flage = false;
                        let httponly_flage = false;
                        let samesite_flage = false; 
                        let protection_against_csrf = 0;
                        let protection_against_csrf_flage = false;
                            
                        for (var v of set_cookie) {
                            if (v === "Secure") {
                                secure_flage = true;
                            }
                            if(v.includes("HttpOnly")) {
                                httponly_flage = true;
                            }
                            if(v.includes("SameSite")) {
                                samesite_flage = true;
                                
                                if(v.includes("Strict")) {
                                    protection_against_csrf = 2;
                                    protection_against_csrf_flage = true;
                                }
                                if(v.includes("Lax")) {
                                    samesite_flage = true;
                                    protection_against_csrf = 1;
                                    protection_against_csrf_flage = true;
                                }
                            }
                        }
                                   
                        // ************************************************************************************************************************************************************
                        // protection-level against hijacking.
    
                        let protection_against_hijacking = false;
                        if(secure_flage && httponly_flage) {
                            protection_against_hijacking = true;
                        }
                         
                        // ************************************************************************************************************************************************************
                        // protection-level against Clickjacking attack
                        // CSP frame-ancestors is the most important protection mechanism against external framing, and better than X-Frame-Options in multiple ways
    
                        let protectionClickJacking_value_Class = new Array();
                        let frame_ancestors = new Array();
                        let frame_ancestors_flage = false;
                        let xfo_flage = false;
                      
                        if (csp_dir.length > 0 && csp_dir.includes("frame-ancestors")) {
                            frame_ancestors_flage = true;
                            frame_ancestors = getDirective_Sources(arr[i][1], "frame-ancestors")
                            protectionClickJacking_value_Class.push("csp frame-ancestors")
                            protectionClickJacking_value_Class.push(get_ProtectionLevel_AgainstClickjacking("frame-ancestors", frame_ancestors));
                        } else {
                            if(xfo.length === 1) {
                                xfo_flage = true;
                                protectionClickJacking_value_Class.push(`x-farme-option ${xfo}`)
                                protectionClickJacking_value_Class.push(get_ProtectionLevel_AgainstClickjacking(xfo[0], []));
                            } else {
                                if(xfo.length === 0) {
                                    protectionClickJacking_value_Class = ["no protection against xlickjacking is provided", 0];
                                }
                            }
                        }
                                           
                        // *******************************************************************************************************************************************************
                        // protection-level against ssl stripping attack
    
                        let max_age_sts = false;
                        let insub_sts = false;
                        let preload_sts = false;
                        let max_age_YearValue = 0;
                        for(var v of sts) {
                            if (v.includes("max-age")) {
                                v = v.split("=")
                                max_age_YearValue = v[1]/31536000;                
                                max_age_sts = true;
                            }
                    
                            if(v.includes("includeSubDomains")) {
                                insub_sts = true;
                            }
                    
                            if(v.includes("preload")) {
                                preload_sts = true;
                            }
                        }
                        
                        let protection_level_againstSLLStripping = get_ProtectionLevel_AgainstSLLStripping(max_age_YearValue, max_age_sts, insub_sts, preload_sts)
                        
                        let hsts_classe = protection_level_againstSLLStripping[0];
                        let level_of_protection_against_SSL_Stripping = protection_level_againstSLLStripping[1];
                          
                        // *******************************************************************************************************************************************************
                        // check if the csp is safe or unsafe
                        
                       
                     
                       
    
                        
    
                      
                        if(source === undefined){
                            source = new Array()
                        }
                        csp_safe.push([["device model", details[0]],["browser name", details[1]],["browser version", details[2]],["os", details[3]],["viewport-height", details[4]],["viewport-width", details[5]], ["origins", source], ["safe csp", safe_flage], ["directive to check", directive], ["script-src", script_flage], ["default-src", default_flage], ["'unsafe-inline'", inline_flage], ["'unsafe-eval'", eval_flage], ["nonce", nonce_flage], ["hash", hash_flage], ["strict-dynamic", strictD_flage], ["wildcard*", wildcard_flage], ["protocol", protocol_flage], ["dataURL", data_flage], ["sts_max_age", max_age_sts], ["sts_max_age_year_protection", max_age_YearValue] , ["sts_includeSD", insub_sts], ["sts_preload", preload_sts], ["hsts classe", hsts_classe], ["protection level against sll stripping", level_of_protection_against_SSL_Stripping], ["protection against clickjacking provided by", protectionClickJacking_value_Class[0]], ["protection-level against clickjacking", protectionClickJacking_value_Class[1]], ["protection against hijacking", protection_against_hijacking], ["protection against csrf", protection_against_csrf_flage], ["protection level against csrf", protection_against_csrf], ["protection against steeling cookies", httponly_flage], ["CSP deploying", csp_deployed], ["visited_Webpage", uriPageName]])
                        let fileName = `csp_${details[0]}_${details[1]}_${details[2]}_${details[3]}_${details[4]}_${details[5]}_${page_name}.json`

                        let json = {};
                        let arr_comp = [["device model", details[0]],["browser name", details[1]],["browser version", details[2]],["os", details[3]],["viewport-height", details[4]],["viewport-width", details[5]], ["origins", source], ["safe csp", safe_flage], ["directive to check", directive], ["script-src", script_flage], ["default-src", default_flage], ["'unsafe-inline'", inline_flage], ["'unsafe-eval'", eval_flage], ["nonce", nonce_flage], ["hash", hash_flage], ["strict-dynamic", strictD_flage], ["wildcard*", wildcard_flage], ["protocol", protocol_flage], ["dataURL", data_flage], ["sts_max_age", max_age_sts], ["sts_max_age_year_protection", max_age_YearValue] , ["sts_includeSD", insub_sts], ["sts_preload", preload_sts], ["hsts classe", hsts_classe], ["protection level against sll stripping", level_of_protection_against_SSL_Stripping], ["protection against clickjacking provided by", protectionClickJacking_value_Class[0]], ["protection-level against clickjacking", protectionClickJacking_value_Class[1]], ["protection against hijacking", protection_against_hijacking], ["protection against csrf", protection_against_csrf_flage], ["protection level against csrf", protection_against_csrf], ["protection against steeling cookies", httponly_flage], ["CSP deploying", csp_deployed], ["visited_Webpage", uriPageName]]
                     
                        for(let j = 0; j < arr_comp.length; j++) {
                            let key = arr_comp[j][0]
                            let value = arr_comp[j][1];
                            json[key] = value;
                        } 
                        if(!fs.existsSync(`${folder2}-${bro}`)){
                            fs.mkdirSync(path.join("./", `${folder2}-${bro}`));
                        }
                        if(!devUA.includes(`${details[0]}_${details[4]}_${details[5]}`)){
                            if(!details[0].includes("Desktop")){
                                devUA.push(`${details[0]}_${details[4]}_${details[5]}`)
                            }
                        }
                        if(!devArr.includes(details[0])){
                            if(!details[0].includes("Desktop")){
                                devArr.push(details[0])
                            }
                        }
                        
                        if(!allDev.includes(`${details[0]}_${details[4]}_${details[5]}`)){
                            allDev.push(`${details[0]}_${details[4]}_${details[5]}`)
                        }
                        fs.writeFileSync(`${folder2}-${bro}/${fileName}`, JSON.stringify(json))
                    }
                  
                   
                }
                
            }else{
                notr++;
                notReachableWebSites.push(u.replaceAll("-","."))
                notReachableWebSites2.push(u)
            }
        }else{
            console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM")
            console.log(choice)
          

            let mobile = new Array()
            let desktop = new Array()
        
            for(var dev of allDev){
                if(dev.includes("Desktop")){
                    desktop.push(dev)
                }else{
                    mobile.push(dev)
                }
            }
            if(!fs.existsSync(`${finalResult}-${bro}`)){
                fs.mkdirSync(path.join("./", `${finalResult}-${bro}`));
            }
            /*console.log(web)
            console.log(desktop)
            console.log(mobile)*/

            numberOfPagesWithSafeCSPWithAllUserAgent = 0;
            numberOfPagesWithNotSafeCSPWithAllUserAgent = 0;
            numberOfPagesWithSafeAndNotSafeCSPWithAllUserAgent = 0;
            pagesWithSafeCSPWithAllUserAgent = new Array();
            pagesWithNotSafeCSPWithAlluserAgent = new Array();
            pagesWithSafeAndNotCSPWithAllUserAgent = new Array();

            pagesdeployCSPWithAllUserAgentsArr = new Array()
            pagesDoesNotdeployCSPWithAllUserAgentsArr = new Array()
            pagesdeployAndNotDeployCSPWithAllUserAgentArr = new Array()
            numberpagesdeployCSPWithAllUserAgentsArr = 0
            numberpagesDoesNotdeployCSPWithAllUserAgentsArr = 0
            numberpagesdeployAndNotDeployCSPWithAllUserAgentArr = 0

            numberOfPagesProtectionAgainstStealingCookies = 0;
            numberOfPagesNoProtectionAgainstStealingCookies = 0;
            numberOfPagesProtectionAndNoProtectionAgainstStealingCookies = 0;
            pagesProtectionAgainstStealingCookies = new Array();
            pagesNoProtectionAgainstStealingCookies = new Array();
            pagesProtectionAndNoProtectionAgainstStealingCookies = new Array();

            numberOfPagesProtectionAgainstCSRF = 0;
            numberOfPagesNoProtectionAgainstCSRF = 0;
            numberOfPagesProtectionAndNoProtectionAgainstCSRF = 0;
            pagesProtectionAgainstCSRF = new Array();
            pagesNoProtectionAgainstCSRF = new Array();
            pagesProtectionAndNoProtectionAgainstCSRF = new Array();

            numberOfPagesProtectionAgainsthijacking = 0;
            numberOfPagesNoProtectionAgainsthijacking = 0;
            numberOfPagesProtectionAndNoProtectionAgainsthijacking = 0;
            pagesProtectionAgainsthijacking = new Array();
            pagesNoProtectionAgainsthijacking = new Array();
            pagesProtectionAndNoProtectionAgainsthijacking = new Array();

            

            numberOfPagesProtectionAgainstclickjacking = 0;
            numberOfPagesNoProtectionAgainstclickjacking = 0;
            numberOfPagesProtectionAndNoProtectionAgainstclickjacking = 0;
            pagesProtectionAgainstclickjacking = new Array();
            pagesNoProtectionAgainstclickjacking = new Array();
            pagesProtectionAndNoProtectionAgainstclickjacking = new Array();

            
            numberOfPagesProtectionAgainstSLLStripping = 0;
            numberOfPagesNoProtectionAgainstSLLStripping = 0;
            numberOfPagesProtectionAndNoProtectionAgainstSLLStripping = 0;
            pagesProtectionAgainstSLLStripping = new Array();
            pagesNoProtectionAgainstSLLStripping = new Array();
            pagesProtectionAndNoProtectionAgainstSLLStripping = new Array();

            //console.log(mobile)
            let lengthWeb = 0;
            console.log(web)
            //web.pushe(2)
            for(let u of web){
                lengthWeb++;
                if(!fs.existsSync(`${resultFolderDesktop}-${bro}`)){
                    fs.mkdirSync(path.join("./", `${resultFolderDesktop}-${bro}`));
                }
                compareWebsite(u, `${folder2}-${bro}`, `${resultFolderDesktop}-${bro}`, desktop)
           
          
            }

        
        
            console.log("Desktop")
    
            let jsonNotReachablePages= {}
            jsonNotReachablePages["number of total pages"] = web.length
            jsonNotReachablePages["number of total devices"] = `${notReachableWebSites.length}`
            jsonNotReachablePages["Not reachable pages"] = notReachableWebSites
            fs.writeFileSync(`./${finalResult}-${bro}/Not reachable websites.json`, JSON.stringify(jsonNotReachablePages))
            notReachableWebSites = new Array()
            let jsonPagesDesktopDeployingCSP = {}
            jsonPagesDesktopDeployingCSP["number of total pages"] = lengthWeb
            jsonPagesDesktopDeployingCSP["number of total devices"] = `${desktop.length}`
            jsonPagesDesktopDeployingCSP["number of pages (deploy csp with all user agent)"] = `${numberpagesdeployCSPWithAllUserAgentsArr}`
            jsonPagesDesktopDeployingCSP["pages (deploy csp with all user agent)"] = pagesdeployCSPWithAllUserAgentsArr
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(deploy csp with all user agent).json`, JSON.stringify(jsonPagesDesktopDeployingCSP))
            jsonPagesDesktopDeployingCSP = {}
            jsonPagesDesktopDeployingCSP["number of total pages"] = lengthWeb
            jsonPagesDesktopDeployingCSP["number of total devices"] = `${desktop.length}`
            jsonPagesDesktopDeployingCSP["number of pages (not deploy csp with all user agent)"] = `${numberpagesDoesNotdeployCSPWithAllUserAgentsArr}`
            jsonPagesDesktopDeployingCSP["pages (not deploy csp with all user agent)"] = pagesDoesNotdeployCSPWithAllUserAgentsArr
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(not deploy csp with all user agent).json`, JSON.stringify(jsonPagesDesktopDeployingCSP))
            jsonPagesDesktopDeployingCSP = {}
            jsonPagesDesktopDeployingCSP["number of total pages"] = lengthWeb
            jsonPagesDesktopDeployingCSP["number of total devices"] = `${desktop.length}`
            jsonPagesDesktopDeployingCSP["number of pages (deploy and not deploy csp with all user agent)"] = `${numberpagesdeployAndNotDeployCSPWithAllUserAgentArr}`
            jsonPagesDesktopDeployingCSP["pages (deploy and not deploy csp with all user agent)"] = pagesdeployAndNotDeployCSPWithAllUserAgentArr
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(deploy and not deploy csp with all user agent).json`, JSON.stringify(jsonPagesDesktopDeployingCSP))
        
            let jsonPagesDesktop = {}
            
            jsonPagesDesktop["number of total pages"] = lengthWeb
            jsonPagesDesktop["number of total devices"] = `${desktop.length}`
            jsonPagesDesktop["number of pages (safe csp with all user agent)"] = `${numberOfPagesWithSafeCSPWithAllUserAgent}`
            jsonPagesDesktop["pages (safe csp with all user agent)"] = pagesWithSafeCSPWithAllUserAgent
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(safe csp with all user agent).json`, JSON.stringify(jsonPagesDesktop))
            jsonPagesDesktop = {}
            jsonPagesDesktop["number of total pages"] = lengthWeb
            jsonPagesDesktop["number of total devices"] = `${desktop.length}`
            jsonPagesDesktop["number of pages (not safe csp with all user agent)"] = `${numberOfPagesWithNotSafeCSPWithAllUserAgent}`
            jsonPagesDesktop["pages (not safe csp with all user agent)"] = pagesWithNotSafeCSPWithAlluserAgent
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(not safe csp with all user agent).json`, JSON.stringify(jsonPagesDesktop))
            jsonPagesDesktop = {}
            jsonPagesDesktop["number of total pages"] = lengthWeb
            jsonPagesDesktop["number of total devices"] = `${desktop.length}`
            jsonPagesDesktop["number of pages (safe and not safe csp with all user agent)"] = `${numberOfPagesWithSafeAndNotSafeCSPWithAllUserAgent}`
            jsonPagesDesktop["pages (safe and not safe csp with all user agent)"] = pagesWithSafeAndNotCSPWithAllUserAgent
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(safe and not safe csp with all user agent).json`, JSON.stringify(jsonPagesDesktop))
            //console.log(web.length)



            let jsonPagesDesktopStealingCookies = {}
            
            jsonPagesDesktopStealingCookies["number of total pages"] = lengthWeb
            jsonPagesDesktopStealingCookies["number of total devices"] = `${desktop.length}`
            jsonPagesDesktopStealingCookies["number of pages (safe against stealing cookies with all user agent)"] = `${numberOfPagesProtectionAgainstStealingCookies}`
            jsonPagesDesktopStealingCookies["pages (safe against stealing cookies with all user agent)"] = pagesProtectionAgainstStealingCookies
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(safe against stealing cookies with all user agent).json`, JSON.stringify(jsonPagesDesktopStealingCookies))
            jsonPagesDesktopStealingCookies = {}
            jsonPagesDesktopStealingCookies["number of total pages"] = lengthWeb
            jsonPagesDesktopStealingCookies["number of total devices"] = `${desktop.length}`
            jsonPagesDesktopStealingCookies["number of pages (not safe against stealing cookies with all user agent)"] = `${numberOfPagesNoProtectionAgainstStealingCookies}`
            jsonPagesDesktopStealingCookies["pages (not safe against stealing cookies with all user agent)"] = pagesNoProtectionAgainstStealingCookies
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(not safe against stealing cookies with all user agent).json`, JSON.stringify(jsonPagesDesktopStealingCookies))
            jsonPagesDesktopStealingCookies = {}
            jsonPagesDesktopStealingCookies["number of total pages"] = lengthWeb
            jsonPagesDesktopStealingCookies["number of total devices"] = `${desktop.length}`
            jsonPagesDesktopStealingCookies["number of pages (safe and not safe against stealing cookies with all user agent)"] = `${numberOfPagesProtectionAndNoProtectionAgainstStealingCookies}`
            jsonPagesDesktopStealingCookies["pages (safe and not safe against stealing cookies with all user agent)"] = pagesProtectionAndNoProtectionAgainstStealingCookies
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(safe and not safe against stealing cookies with all user agent).json`, JSON.stringify(jsonPagesDesktopStealingCookies))

            
            let jsonPagesDesktopCSRF = {}
            jsonPagesDesktopCSRF["number of total pages"] = lengthWeb
            jsonPagesDesktopCSRF["number of total devices"] = `${desktop.length}`
            jsonPagesDesktopCSRF["number of pages (safe against CSRF with all user agent)"] = `${numberOfPagesProtectionAgainstCSRF}`
            jsonPagesDesktopCSRF["pages (safe against CSRF with all user agent)"] = pagesProtectionAgainstCSRF
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(safe against CSRF with all user agent).json`, JSON.stringify(jsonPagesDesktopCSRF))
            jsonPagesDesktopCSRF = {}
            jsonPagesDesktopCSRF["number of total pages"] = lengthWeb
            jsonPagesDesktopCSRF["number of total devices"] = `${desktop.length}`
            jsonPagesDesktopCSRF["number of pages (not safe against CSRF with all user agent)"] = `${numberOfPagesNoProtectionAgainstCSRF}`
            jsonPagesDesktopCSRF["pages (not safe against CSRF with all user agent)"] = pagesNoProtectionAgainstCSRF
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(not safe against CSRF with all user agent).json`, JSON.stringify(jsonPagesDesktopCSRF))
            jsonPagesDesktopCSRF = {}
            jsonPagesDesktopCSRF["number of total pages"] = lengthWeb
            jsonPagesDesktopCSRF["number of total devices"] = `${desktop.length}`
            jsonPagesDesktopCSRF["number of pages (safe and not safe against CSRF with all user agent)"] = `${numberOfPagesProtectionAndNoProtectionAgainstCSRF}`
            jsonPagesDesktopCSRF["pages (safe and not safe against CSRF with all user agent)"] = pagesProtectionAndNoProtectionAgainstCSRF
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(safe and not safe against CSRF with all user agent).json`, JSON.stringify(jsonPagesDesktopCSRF))

            let jsonPagesDesktophijacking = {}
            jsonPagesDesktophijacking["number of total pages"] = lengthWeb
            jsonPagesDesktophijacking["number of total devices"] = `${desktop.length}`
            jsonPagesDesktophijacking["number of pages (safe against hijacking with all user agent)"] = `${numberOfPagesProtectionAgainsthijacking}`
            jsonPagesDesktophijacking["pages (safe against hijacking with all user agent)"] = pagesProtectionAgainsthijacking
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(safe against hijacking with all user agent).json`, JSON.stringify(jsonPagesDesktophijacking))
            jsonPagesDesktophijacking = {}
            jsonPagesDesktophijacking["number of total pages"] = lengthWeb
            jsonPagesDesktophijacking["number of total devices"] = `${desktop.length}`
            jsonPagesDesktophijacking["number of pages (not safe against hijacking with all user agent)"] = `${numberOfPagesNoProtectionAgainsthijacking}`
            jsonPagesDesktophijacking["pages (not safe against hijacking with all user agent)"] = pagesNoProtectionAgainsthijacking
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(not safe against hijacking with all user agent).json`, JSON.stringify(jsonPagesDesktophijacking))
            jsonPagesDesktophijacking = {}
            jsonPagesDesktophijacking["number of total pages"] = lengthWeb
            jsonPagesDesktophijacking["number of total devices"] = `${desktop.length}`
            jsonPagesDesktophijacking["number of pages (safe and not safe against hijacking with all user agent)"] = `${numberOfPagesProtectionAndNoProtectionAgainsthijacking}`
            jsonPagesDesktophijacking["pages (safe and not safe against hijacking with all user agent)"] = pagesProtectionAndNoProtectionAgainsthijacking
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(safe and not safe against hijacking with all user agent).json`, JSON.stringify(jsonPagesDesktophijacking))
            

            let jsonPagesDesktopclickjacking = {}
            jsonPagesDesktopclickjacking["number of total pages"] = lengthWeb
            jsonPagesDesktopclickjacking["number of total devices"] = `${desktop.length}`
            jsonPagesDesktopclickjacking["number of pages (safe against clickjacking with all user agent)"] = `${numberOfPagesProtectionAgainstclickjacking}`
            jsonPagesDesktopclickjacking["pages (safe against clickjacking with all user agent)"] = pagesProtectionAgainstclickjacking
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(safe against clickjacking with all user agent).json`, JSON.stringify(jsonPagesDesktopclickjacking))
            jsonPagesDesktopclickjacking = {}
            jsonPagesDesktopclickjacking["number of total pages"] = lengthWeb
            jsonPagesDesktopclickjacking["number of total devices"] = `${desktop.length}`
            jsonPagesDesktopclickjacking["number of pages (not safe against clickjacking with all user agent)"] = `${numberOfPagesNoProtectionAgainstclickjacking}`
            jsonPagesDesktopclickjacking["pages (not safe against clickjacking with all user agent)"] = pagesNoProtectionAgainstclickjacking
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(not safe against clickjacking with all user agent).json`, JSON.stringify(jsonPagesDesktopclickjacking))
            jsonPagesDesktopclickjacking = {}
            jsonPagesDesktopclickjacking["number of total pages"] = lengthWeb
            jsonPagesDesktopclickjacking["number of total devices"] = `${desktop.length}`
            jsonPagesDesktopclickjacking["number of pages (safe and not safe against clickjacking with all user agent)"] = `${numberOfPagesProtectionAndNoProtectionAgainstclickjacking}`
            jsonPagesDesktopclickjacking["pages (safe and not safe against clickjacking with all user agent)"] = pagesProtectionAndNoProtectionAgainstclickjacking
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(safe and not safe against clickjacking with all user agent).json`, JSON.stringify(jsonPagesDesktopclickjacking))


            let jsonPagesDesktopSLLStripping = {}
            jsonPagesDesktopSLLStripping["number of total pages"] = lengthWeb
            jsonPagesDesktopSLLStripping["number of total devices"] = `${desktop.length}`
            jsonPagesDesktopSLLStripping["number of pages (safe against sllstrpping with all user agent)"] = `${numberOfPagesProtectionAgainstSLLStripping}`
            jsonPagesDesktopSLLStripping["pages (safe against sllstrpping with all user agent)"] = pagesProtectionAgainstSLLStripping
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(safe against sllstrpping with all user agent).json`, JSON.stringify(jsonPagesDesktopSLLStripping))
            jsonPagesDesktopSLLStripping = {}
            jsonPagesDesktopSLLStripping["number of total pages"] = lengthWeb
            jsonPagesDesktopSLLStripping["number of total devices"] = `${desktop.length}`
            jsonPagesDesktopSLLStripping["number of pages (not safe against sllstrpping with all user agent)"] = `${numberOfPagesNoProtectionAgainstSLLStripping}`
            jsonPagesDesktopSLLStripping["pages (not safe against sllstrpping with all user agent)"] = pagesNoProtectionAgainstSLLStripping
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(not safe against sllstrpping with all user agent).json`, JSON.stringify(jsonPagesDesktopSLLStripping))
            jsonPagesDesktopSLLStripping = {}
            jsonPagesDesktopSLLStripping["number of total pages"] = lengthWeb
            jsonPagesDesktopSLLStripping["number of total devices"] = `${desktop.length}`
            jsonPagesDesktopSLLStripping["number of pages (safe and not safe against sllstrpping with all user agent)"] = `${numberOfPagesProtectionAndNoProtectionAgainstSLLStripping}`
            jsonPagesDesktopSLLStripping["pages (safe and not safe against sllstrpping with all user agent)"] = pagesProtectionAndNoProtectionAgainstSLLStripping
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingDesktopBrowsers(safe and not safe against sllstrpping with all user agent).json`, JSON.stringify(jsonPagesDesktopSLLStripping))
 
            //pagesProtectionAndNoProtectionAgainstStealingCookies.pushe(2)
            numberOfPagesWithSafeCSPWithAllUserAgent = 0;
            numberOfPagesWithNotSafeCSPWithAllUserAgent = 0;
            numberOfPagesWithSafeAndNotSafeCSPWithAllUserAgent = 0;
            pagesWithSafeCSPWithAllUserAgent = new Array();
            pagesWithNotSafeCSPWithAlluserAgent = new Array();
            pagesWithSafeAndNotCSPWithAllUserAgent = new Array();

            pagesdeployCSPWithAllUserAgentsArr = new Array()
            pagesDoesNotdeployCSPWithAllUserAgentsArr = new Array()
            pagesdeployAndNotDeployCSPWithAllUserAgentArr = new Array()
            numberpagesdeployCSPWithAllUserAgentsArr = 0
            numberpagesDoesNotdeployCSPWithAllUserAgentsArr = 0
            numberpagesdeployAndNotDeployCSPWithAllUserAgentArr = 0

            numberOfPagesProtectionAgainstStealingCookies = 0;
            numberOfPagesNoProtectionAgainstStealingCookies = 0;
            numberOfPagesProtectionAndNoProtectionAgainstStealingCookies = 0;
            pagesProtectionAgainstStealingCookies = new Array();
            pagesNoProtectionAgainstStealingCookies = new Array();
            pagesProtectionAndNoProtectionAgainstStealingCookies = new Array();

            numberOfPagesProtectionAgainstCSRF = 0;
            numberOfPagesNoProtectionAgainstCSRF = 0;
            numberOfPagesProtectionAndNoProtectionAgainstCSRF = 0;
            pagesProtectionAgainstCSRF = new Array();
            pagesNoProtectionAgainstCSRF = new Array();
            pagesProtectionAndNoProtectionAgainstCSRF = new Array();

            numberOfPagesProtectionAgainsthijacking = 0;
            numberOfPagesNoProtectionAgainsthijacking = 0;
            numberOfPagesProtectionAndNoProtectionAgainsthijacking = 0;
            pagesProtectionAgainsthijacking = new Array();
            pagesNoProtectionAgainsthijacking = new Array();
            pagesProtectionAndNoProtectionAgainsthijacking = new Array();

            numberOfPagesProtectionAgainstclickjacking = 0;
            numberOfPagesNoProtectionAgainstclickjacking = 0;
            numberOfPagesProtectionAndNoProtectionAgainstclickjacking = 0;
            pagesProtectionAgainstclickjacking = new Array();
            pagesNoProtectionAgainstclickjacking = new Array();
            pagesProtectionAndNoProtectionAgainstclickjacking = new Array();

            numberOfPagesProtectionAgainstSLLStripping = 0;
            numberOfPagesNoProtectionAgainstSLLStripping = 0;
            numberOfPagesProtectionAndNoProtectionAgainstSLLStripping = 0;
            pagesProtectionAgainstSLLStripping = new Array();
            pagesNoProtectionAgainstSLLStripping = new Array();
            pagesProtectionAndNoProtectionAgainstSLLStripping = new Array();

            let lengthWeb2 = 0;
            for(let u of web){
                lengthWeb2++;
                if(!fs.existsSync(`${resultFolderMobile}-${bro}`)){
                    fs.mkdirSync(path.join("./", `${resultFolderMobile}-${bro}`));
                }
                compareWebsite(u, `${folder2}-${bro}`, `${resultFolderMobile}-${bro}`, mobile)  
            }

            console.log("Mobile")

            let jsonPagesMobileDeployingCSP = {}
            jsonPagesMobileDeployingCSP["number of total pages"] = lengthWeb2
            jsonPagesMobileDeployingCSP["number of total devices"] = `${mobile.length}`
            jsonPagesMobileDeployingCSP["number of pages (deploy csp with all user agent)"] = `${numberpagesdeployCSPWithAllUserAgentsArr}`
            jsonPagesMobileDeployingCSP["pages (deploy csp with all user agent)"] = pagesdeployCSPWithAllUserAgentsArr
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(deploy csp with all user agent).json`, JSON.stringify(jsonPagesMobileDeployingCSP))
            jsonPagesMobileDeployingCSP = {}
            jsonPagesMobileDeployingCSP["number of total pages"] =lengthWeb2
            jsonPagesMobileDeployingCSP["number of total devices"] = `${mobile.length}`
            jsonPagesMobileDeployingCSP["number of pages (not deploy csp with all user agent)"] = `${numberpagesDoesNotdeployCSPWithAllUserAgentsArr}`
            jsonPagesMobileDeployingCSP["pages (not deploy csp with all user agent)"] = pagesDoesNotdeployCSPWithAllUserAgentsArr
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(not deploy csp with all user agent).json`, JSON.stringify(jsonPagesMobileDeployingCSP))
            jsonPagesMobileDeployingCSP = {}
            jsonPagesMobileDeployingCSP["number of total pages"] = lengthWeb2
            jsonPagesMobileDeployingCSP["number of total devices"] = `${mobile.length}`
            jsonPagesMobileDeployingCSP["number of pages (deploy and not deploy csp with all user agent)"] = `${numberpagesdeployAndNotDeployCSPWithAllUserAgentArr}`
            jsonPagesMobileDeployingCSP["pages (deploy and not deploy csp with all user agent)"] = pagesdeployAndNotDeployCSPWithAllUserAgentArr
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(deploy and not deploy csp with all user agent).json`, JSON.stringify(jsonPagesMobileDeployingCSP))
            
           
        
            let jsonPagesMobile = {}
            jsonPagesMobile["number of total pages"] = lengthWeb2
            jsonPagesMobile["number of total devices"] = `${mobile.length}`
            jsonPagesMobile["number of pages (safe csp with all user agent)"] = `${numberOfPagesWithSafeCSPWithAllUserAgent}`
            jsonPagesMobile["pages (safe csp with all user agent)"] = pagesWithSafeCSPWithAllUserAgent
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(safe csp with all user agent).json`, JSON.stringify(jsonPagesMobile))
            jsonPagesMobile = {}
            jsonPagesMobile["number of total pages"] = lengthWeb2
            jsonPagesMobile["number of total devices"] = `${mobile.length}`
            jsonPagesMobile["number of pages (not safe csp with all user agent)"] = `${numberOfPagesWithNotSafeCSPWithAllUserAgent}`
            jsonPagesMobile["pages (not safe csp with all user agent)"] = pagesWithNotSafeCSPWithAlluserAgent
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(not safe csp with all user agent).json`, JSON.stringify(jsonPagesMobile))
            jsonPagesMobile = {}
            jsonPagesMobile["number of total pages"] =lengthWeb2
            jsonPagesMobile["number of total devices"] = `${mobile.length}`
            jsonPagesMobile["number of pages (safe and not safe csp with all user agent)"] = `${numberOfPagesWithSafeAndNotSafeCSPWithAllUserAgent}`
            jsonPagesMobile["pages (safe and not safe csp with all user agent)"] = pagesWithSafeAndNotCSPWithAllUserAgent
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(safe and not safe csp with all user agent).json`, JSON.stringify(jsonPagesMobile))

          
            let jsonPagesMobileStealingCookies = {}
            
            jsonPagesMobileStealingCookies["number of total pages"] = lengthWeb
            jsonPagesMobileStealingCookies["number of total devices"] = `${mobile.length}`
            jsonPagesMobileStealingCookies["number of pages (safe against stealing cookies with all user agent)"] = `${numberOfPagesProtectionAgainstStealingCookies}`
            jsonPagesMobileStealingCookies["pages (safe against stealing cookies with all user agent)"] = pagesProtectionAgainstStealingCookies
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(safe against stealing cookies with all user agent).json`, JSON.stringify(jsonPagesMobileStealingCookies))
            jsonPagesMobileStealingCookies = {}
            jsonPagesMobileStealingCookies["number of total pages"] = lengthWeb
            jsonPagesMobileStealingCookies["number of total devices"] = `${mobile.length}`
            jsonPagesMobileStealingCookies["number of pages (not safe against stealing cookies with all user agent)"] = `${numberOfPagesNoProtectionAgainstStealingCookies}`
            jsonPagesMobileStealingCookies["pages (not safe against stealing cookies with all user agent)"] = pagesNoProtectionAgainstStealingCookies
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(not safe against stealing cookies with all user agent).json`, JSON.stringify(jsonPagesMobileStealingCookies))
            jsonPagesMobileStealingCookies = {}
            jsonPagesMobileStealingCookies["number of total pages"] = lengthWeb
            jsonPagesMobileStealingCookies["number of total devices"] = `${mobile.length}`
            jsonPagesMobileStealingCookies["number of pages (safe and not safe against stealing cookies with all user agent)"] = `${numberOfPagesProtectionAndNoProtectionAgainstStealingCookies}`
            jsonPagesMobileStealingCookies["pages (safe and not safe against stealing cookies with all user agent)"] = pagesProtectionAndNoProtectionAgainstStealingCookies
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(safe and not safe against stealing cookies with all user agent).json`, JSON.stringify(jsonPagesMobileStealingCookies))


            let jsonPagesMobileCSRF = {}
            jsonPagesMobileCSRF["number of total pages"] = lengthWeb
            jsonPagesMobileCSRF["number of total devices"] = `${mobile.length}`
            jsonPagesMobileCSRF["number of pages (safe against CSRF with all user agent)"] = `${numberOfPagesProtectionAgainstCSRF}`
            jsonPagesMobileCSRF["pages (safe against CSRF with all user agent)"] = pagesProtectionAgainstCSRF
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(safe against CSRF with all user agent).json`, JSON.stringify(jsonPagesMobileCSRF))
            jsonPagesMobileCSRF = {}
            jsonPagesMobileCSRF["number of total pages"] = lengthWeb
            jsonPagesMobileCSRF["number of total devices"] = `${mobile.length}`
            jsonPagesMobileCSRF["number of pages (not safe against CSRF with all user agent)"] = `${numberOfPagesNoProtectionAgainstCSRF}`
            jsonPagesMobileCSRF["pages (not safe against CSRF with all user agent)"] = pagesNoProtectionAgainstCSRF
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(not safe against CSRF with all user agent).json`, JSON.stringify(jsonPagesMobileCSRF))
            jsonPagesMobileCSRF = {}
            jsonPagesMobileCSRF["number of total pages"] = lengthWeb
            jsonPagesMobileCSRF["number of total devices"] = `${mobile.length}`
            jsonPagesMobileCSRF["number of pages (safe and not safe against CSRF with all user agent)"] = `${numberOfPagesProtectionAndNoProtectionAgainstCSRF}`
            jsonPagesMobileCSRF["pages (safe and not safe against CSRF with all user agent)"] = pagesProtectionAndNoProtectionAgainstCSRF
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(safe and not safe against CSRF with all user agent).json`, JSON.stringify(jsonPagesMobileCSRF))

      
            let jsonPagesMobilehijacking = {}
            jsonPagesMobilehijacking["number of total pages"] = lengthWeb
            jsonPagesMobilehijacking["number of total devices"] = `${mobile.length}`
            jsonPagesMobilehijacking["number of pages (safe against hijacking with all user agent)"] = `${numberOfPagesProtectionAgainsthijacking}`
            jsonPagesMobilehijacking["pages (safe against hijacking with all user agent)"] = pagesProtectionAgainsthijacking
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(safe against hijacking with all user agent).json`, JSON.stringify(jsonPagesMobilehijacking))
            jsonPagesMobilehijacking = {}
            jsonPagesMobilehijacking["number of total pages"] = lengthWeb
            jsonPagesMobilehijacking["number of total devices"] = `${mobile.length}`
            jsonPagesMobilehijacking["number of pages (not safe against hijacking with all user agent)"] = `${numberOfPagesNoProtectionAgainsthijacking}`
            jsonPagesMobilehijacking["pages (not safe against hijacking with all user agent)"] = pagesNoProtectionAgainsthijacking
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(not safe against hijacking with all user agent).json`, JSON.stringify(jsonPagesMobilehijacking))
            jsonPagesMobilehijacking = {}
            jsonPagesMobilehijacking["number of total pages"] = lengthWeb
            jsonPagesMobilehijacking["number of total devices"] = `${mobile.length}`
            jsonPagesMobilehijacking["number of pages (safe and not safe against hijacking with all user agent)"] = `${numberOfPagesProtectionAndNoProtectionAgainsthijacking}`
            jsonPagesMobilehijacking["pages (safe and not safe against hijacking with all user agent)"] = pagesProtectionAndNoProtectionAgainsthijacking
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(safe and not safe against hijacking with all user agent).json`, JSON.stringify(jsonPagesMobilehijacking))


            let jsonPagesMobileclickjacking = {}
            jsonPagesMobileclickjacking["number of total pages"] = lengthWeb
            jsonPagesMobileclickjacking["number of total devices"] = `${mobile.length}`
            jsonPagesMobileclickjacking["number of pages (safe against clickjacking with all user agent)"] = `${numberOfPagesProtectionAgainstclickjacking}`
            jsonPagesMobileclickjacking["pages (safe against clickjacking with all user agent)"] = pagesProtectionAgainstclickjacking
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(safe against clickjacking with all user agent).json`, JSON.stringify(jsonPagesMobileclickjacking))
            jsonPagesMobileclickjacking = {}
            jsonPagesMobileclickjacking["number of total pages"] = lengthWeb
            jsonPagesMobileclickjacking["number of total devices"] = `${mobile.length}`
            jsonPagesMobileclickjacking["number of pages (not safe against clickjacking with all user agent)"] = `${numberOfPagesNoProtectionAgainstclickjacking}`
            jsonPagesMobileclickjacking["pages (not safe against clickjacking with all user agent)"] = pagesNoProtectionAgainstclickjacking
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(not safe against clickjacking with all user agent).json`, JSON.stringify(jsonPagesMobileclickjacking))
            jsonPagesMobileclickjacking = {}
            jsonPagesMobileclickjacking["number of total pages"] = lengthWeb
            jsonPagesMobileclickjacking["number of total devices"] = `${mobile.length}`
            jsonPagesMobileclickjacking["number of pages (safe and not safe against clickjacking with all user agent)"] = `${numberOfPagesProtectionAndNoProtectionAgainstclickjacking}`
            jsonPagesMobileclickjacking["pages (safe and not safe against clickjacking with all user agent)"] = pagesProtectionAndNoProtectionAgainstclickjacking
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(safe and not safe against clickjacking with all user agent).json`, JSON.stringify(jsonPagesMobileclickjacking))
 

            let jsonPagesMobileSLLStripping = {}
            jsonPagesMobileSLLStripping["number of total pages"] = lengthWeb
            jsonPagesMobileSLLStripping["number of total devices"] = `${mobile.length}`
            jsonPagesMobileSLLStripping["number of pages (safe against sllstrpping with all user agent)"] = `${numberOfPagesProtectionAgainstSLLStripping}`
            jsonPagesMobileSLLStripping["pages (safe against sllstrpping with all user agent)"] = pagesProtectionAgainstSLLStripping
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(safe against sllstrpping with all user agent).json`, JSON.stringify(jsonPagesMobileSLLStripping))
            jsonPagesMobileSLLStripping = {}
            jsonPagesMobileSLLStripping["number of total pages"] = lengthWeb
            jsonPagesMobileSLLStripping["number of total devices"] = `${mobile.length}`
            jsonPagesMobileSLLStripping["number of pages (not safe against sllstrpping with all user agent)"] = `${numberOfPagesNoProtectionAgainstSLLStripping}`
            jsonPagesMobileSLLStripping["pages (not safe against sllstrpping with all user agent)"] = pagesNoProtectionAgainstSLLStripping
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(not safe against sllstrpping with all user agent).json`, JSON.stringify(jsonPagesMobileSLLStripping))
            jsonPagesMobileSLLStripping = {}
            jsonPagesMobileSLLStripping["number of total pages"] = lengthWeb
            jsonPagesMobileSLLStripping["number of total devices"] = `${mobile.length}`
            jsonPagesMobileSLLStripping["number of pages (safe and not safe against sllstrpping with all user agent)"] = `${numberOfPagesProtectionAndNoProtectionAgainstSLLStripping}`
            jsonPagesMobileSLLStripping["pages (safe and not safe against sllstrpping with all user agent)"] = pagesProtectionAndNoProtectionAgainstSLLStripping
            fs.writeFileSync(`./${finalResult}-${bro}/compResultAllPagesUsingMobileBrowsers(safe and not safe against sllstrpping with all user agent).json`, JSON.stringify(jsonPagesMobileSLLStripping))
 
            if(choice === 1){
                let lengthVP = 0;
                for(var u of web){
                    lengthVP++;
                    if(!fs.existsSync(`${resultFolderViewPort}-${bro}`)){
                        fs.mkdirSync(path.join("./", `${resultFolderViewPort}-${bro}`));
                    }
                    compareViewport(u, `${folder2}-${bro}`, `${resultFolderViewPort}-${bro}`) 
                }
            
                let jsonFV = {}
                jsonFV["number of total pages"] = lengthVP
                jsonFV["total devices (each device with 2 different viewport)"] = devArr
                jsonFV["number of pages (all safe csp with diff view port)"] = `${numberOfPagesDViewPSafeCSP}`
                jsonFV["pages (safe csp with diff view port)"] = pagesDViewPSafeCSP
                fs.writeFileSync(`./${finalResult}-${bro}/ViewPort(all safe csp with diff view port).json`, JSON.stringify(jsonFV))
                jsonFV = {}
                jsonFV["number of total pages"] = lengthVP
                jsonFV["total devices (each device with 2 different viewport)"] = devArr
                jsonFV["number of pages (all not safe csp with diff view port)"] = `${numberOfPagesDViewPNotSafeCSP}`
                jsonFV["pages (all not safe csp with diff view port)"] = pagesDViewPNotSafeCSP
                fs.writeFileSync(`./${finalResult}-${bro}/ViewPort(all not safe csp with diff view port).json`, JSON.stringify(jsonFV))
                jsonFV = {}
                jsonFV["number of total pages"] = lengthVP
                jsonFV["total devices (each device with 2 different viewport)"] = devArr
                jsonFV["number of pages (safe csp and not safe csp with diff view port)"] = `${numberOfPagesDViewPSafeAndNotSafeCSP}`
                jsonFV["pages (safe csp and not safe csp with diff view port)"] = pagesDViewPSafeAndNotSafeCSPWithDevicesInfo
              
                fs.writeFileSync(`./${finalResult}-${bro}/ViewPort(safe csp and not safe csp with diff view port).json`, JSON.stringify(jsonFV))
            }


            
             //console.log(uri)
         
            for(var d of desktop){
                
                numberOfHomeSubpagesWithSafeCSPForAllUserAgent = 0
                numberOfHomeSubpagesWithNotSafeCSPForAllUserAgent = 0
                numberOfHomeSubpagesWithSafeAndNotSafeCSPForAllUserAgent = 0
                HomeSubpagesWithSafeCSPForAllUserAgent = new Array()
                HomeSubpagesWithNotSafeCSPForAllUserAgent = new Array()
                HomeSubpagesWithSafeAndNotSafeCSPForAllUserAgent = new Array();
                HomeSubpagesWithSafeAndNotSafeCSPForAllUserAgentDetails = new Array();
    
                numberOfHomeSubpagesDeployCSPForAllUserAgent = 0
                numberOfHomeSubpagesNotDeployCSPForAllUserAgent = 0
                numberOfHomeSubpagesDeployAndNotDeployCSPForAllUserAgent = 0
                HomeSubpagesDeployCSPForAllUserAgent = new Array()
                HomeSubpagesNotDeployCSPForAllUserAgent = new Array()
                HomeSubpagesDeployAndNotDeployCSPForAllUserAgent = new Array();
                HomeSubpagesDeployAndNotDeployCSPForAllUserAgentDetails = new Array();

                numberOfHomeSubpagesSafeAgainstStealingCookiesForAllUserAgent = 0
                numberOfHomeSubpagesUnSafeAgainstStealingCookiesForAllUserAgent = 0
                numberOfHomeSubpagesSafeAndUnSafeAgainstStealingCookiesForAllUserAgent = 0
                HomeSubpagesSafeAgainstStealingCookiesForAllUserAgent = new Array();
                HomeSubpagesUnSafeAgainstStealingCookiesForAllUserAgent = new Array()
                HomeSubpagesSafeAndUnSafeAgainstStealingCookiesForAllUserAgent = new Array()
                HomeSubpagesSafeAndUnSafeAgainstStealingCookiesForAllUserAgentDetails = new Array();

                
                numberOfHomeSubpagesSafeAgainstCSRFForAllUserAgent = 0;
                numberOfHomeSubpagesUnSafeAgainstCSRFForAllUserAgent = 0;
                numberOfHomeSubpagesSafeAndUnSafeAgainstCSRFForAllUserAgent = 0;
                HomeSubpagesSafeAgainstCSRFForAllUserAgent = new Array();
                HomeSubpagesUnSafeAgainstCSRFForAllUserAgent = new Array();
                HomeSubpagesSafeAndUnSafeAgainstCSRFForAllUserAgent = new Array();
                HomeSubpagesSafeAndUnSafeAgainstCSRFForAllUserAgentDetails = new Array();

                numberOfHomeSubpagesSafeAgainsthijackingForAllUserAgent = 0;
                numberOfHomeSubpagesUnSafeAgainstForhijackingAllUserAgent = 0;
                numberOfHomeSubpagesSafeAndUnSafeAgainsthijackingForAllUserAgent = 0;
                HomeSubpagesSafeAgainsthijackingForAllUserAgent = new Array()
                HomeSubpagesUnSafeAgainsthijackingForAllUserAgent = new Array()
                HomeSubpagesSafeAndUnSafeAgainsthijackingForAllUserAgent = new Array()
                HomeSubpagesSafeAndUnSafeAgainsthijackingForAllUserAgentDetails = new Array()

                
    
                numberOfHomeSubpagesSafeAgainstclickjackingForAllUserAgent = 0;
                numberOfHomeSubpagesUnSafeAgainstForclickjackingAllUserAgent = 0;
                numberOfHomeSubpagesSafeAndUnSafeAgainstclickjackingForAllUserAgent = 0;
                HomeSubpagesSafeAgainstclickjackingForAllUserAgent = new Array();
                HomeSubpagesUnSafeAgainstclickjackingForAllUserAgent = new Array();
                HomeSubpagesSafeAndUnSafeAgainstclickjackingForAllUserAgent = new Array();
                HomeSubpagesSafeAndUnSafeAgainstclickjackingForAllUserAgentDetails = new Array();

                
                numberOfHomeSubpagesSafeAgainstsllstrippingForAllUserAgent = 0;
                numberOfHomeSubpagesUnSafeAgainstForsllstrippingAllUserAgent = 0;
                numberOfHomeSubpagesSafeAndUnSafeAgainstsllstrippingForAllUserAgent = 0;
                HomeSubpagesSafeAgainstsllstrippingForAllUserAgent = new Array();
                HomeSubpagesUnSafeAgainstsllstrippingForAllUserAgent = new Array();
                HomeSubpagesSafeAndUnSafeAgainstsllstrippingForAllUserAgent = new Array();
                HomeSubpagesSafeAndUnSafeAgainstsllstrippingForAllUserAgentDetails = new Array();

                let lengthnum = 0;
                for(let u of uri){
                    lengthnum++;
                    let i = u.split(".")
                    let page = ""
                    for(let j = 0; j < i.length; j++){
                        if(j!=i.length-1){
                            page += i[j]+"-"
                        }else{
                            page += i[j]
                        }
                    } 
                    if(!fs.existsSync(`${resultFolder2Desktop}-${bro}`)){
                        fs.mkdirSync(path.join("./", `${resultFolder2Desktop}-${bro}`));
                    }
                    compareHomeWithSubpagesForEachDevices(page, `${folder2}-${bro}`, `${resultFolder2Desktop}-${bro}`, d)
                 
                }
    

                let jsonHomeSubpagesDesktopCSPDeployment = {}
                jsonHomeSubpagesDesktopCSPDeployment["number of total homepages"] = lengthnum
                jsonHomeSubpagesDesktopCSPDeployment["number of Home and Subpages(deploy CSP for all user agents)"] = `${numberOfHomeSubpagesDeployCSPForAllUserAgent}`
                jsonHomeSubpagesDesktopCSPDeployment["Home and Subpages(deploy CSP for all user agents)"] = HomeSubpagesDeployCSPForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(deploy CSP for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktopCSPDeployment))
                jsonHomeSubpagesDesktopCSPDeployment = {}
                jsonHomeSubpagesDesktopCSPDeployment["number of total homepages"] = lengthnum
                jsonHomeSubpagesDesktopCSPDeployment["number of Home and Subpages(not deploy CSP for all user agents)"] = `${numberOfHomeSubpagesNotDeployCSPForAllUserAgent}`
                jsonHomeSubpagesDesktopCSPDeployment["Home and Subpages(not deploy CSP for all user agents)"] = HomeSubpagesNotDeployCSPForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(not deploy CSP for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktopCSPDeployment))
                jsonHomeSubpagesDesktopCSPDeployment = {}
                jsonHomeSubpagesDesktopCSPDeployment["number of total homepages"] = lengthnum
                jsonHomeSubpagesDesktopCSPDeployment["number of Home and Subpages(deploy and not deploy CSP for all user agents)"] = `${numberOfHomeSubpagesDeployAndNotDeployCSPForAllUserAgent}`
                jsonHomeSubpagesDesktopCSPDeployment["Home and Subpages(deploy and not deploy CSP for all user agents)"] = HomeSubpagesDeployAndNotDeployCSPForAllUserAgent
                jsonHomeSubpagesDesktopCSPDeployment["Home and Subpages(deploy and not deploy CSP for all user agents) Details"] = HomeSubpagesDeployAndNotDeployCSPForAllUserAgentDetails
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(deploy and not deploy CSP for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktopCSPDeployment))
 



                let jsonHomeSubpagesDesktop = {}
                jsonHomeSubpagesDesktop["number of total homepages"] = lengthnum
                jsonHomeSubpagesDesktop["number of Home and Subpages(safe CSP for all user agents)"] = `${numberOfHomeSubpagesWithSafeCSPForAllUserAgent}`
                jsonHomeSubpagesDesktop["Home and Subpages(safe CSP for all user agents)"] = HomeSubpagesWithSafeCSPForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(safe CSP for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktop))
                jsonHomeSubpagesDesktop = {}
                jsonHomeSubpagesDesktop["number of total homepages"] =lengthnum
                jsonHomeSubpagesDesktop["number of Home and Subpages(not safe CSP for all user agents)"] = `${numberOfHomeSubpagesWithNotSafeCSPForAllUserAgent}`
                jsonHomeSubpagesDesktop["Home and Subpages(not safe CSP for all user agents)"] = HomeSubpagesWithNotSafeCSPForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(not safe CSP for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktop))
                jsonHomeSubpagesDesktop = {}
                jsonHomeSubpagesDesktop["number of total homepages"] = lengthnum
                jsonHomeSubpagesDesktop["number of Home and Subpages(safe and not safe CSP for all user agents)"] = `${numberOfHomeSubpagesWithSafeAndNotSafeCSPForAllUserAgent}`
                jsonHomeSubpagesDesktop["Home and Subpages(safe and not safe CSP for all user agents)"] = HomeSubpagesWithSafeAndNotSafeCSPForAllUserAgent
                jsonHomeSubpagesDesktop["Home and Subpages(safe and not safe CSP for all user agents) Details"] = HomeSubpagesWithSafeAndNotSafeCSPForAllUserAgentDetails
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(safe and not safe CSP for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktop))
                //csp_policies.pushe(2)

              

                let jsonHomeSubpagesDesktopStealingCookies = {}
                jsonHomeSubpagesDesktopStealingCookies["number of total homepages"] = lengthnum
                jsonHomeSubpagesDesktopStealingCookies["number of Home and Subpages(safe against stealing cookies for all user agents)"] = `${numberOfHomeSubpagesSafeAgainstStealingCookiesForAllUserAgent}`
                jsonHomeSubpagesDesktopStealingCookies["Home and Subpages(safe against stealing cookies for all user agents)"] = HomeSubpagesSafeAgainstStealingCookiesForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(safe against stealing cookies for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktopStealingCookies))
                jsonHomeSubpagesDesktopStealingCookies = {}
                jsonHomeSubpagesDesktopStealingCookies["number of total homepages"] =lengthnum
                jsonHomeSubpagesDesktopStealingCookies["number of Home and Subpages(not safe against stealing cookies for all user agents)"] = `${numberOfHomeSubpagesUnSafeAgainstStealingCookiesForAllUserAgent}`
                jsonHomeSubpagesDesktopStealingCookies["Home and Subpages(not safe against stealing cookies for all user agents)"] = HomeSubpagesUnSafeAgainstStealingCookiesForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(not safe against stealing cookies for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktopStealingCookies))
                jsonHomeSubpagesDesktopStealingCookies = {}
                jsonHomeSubpagesDesktopStealingCookies["number of total homepages"] = lengthnum
                jsonHomeSubpagesDesktopStealingCookies["number of Home and Subpages(safe and not safe against stealing cookies for all user agents)"] = `${numberOfHomeSubpagesSafeAndUnSafeAgainstStealingCookiesForAllUserAgent}`
                jsonHomeSubpagesDesktopStealingCookies["Home and Subpages(safe and not safe against stealing cookies for all user agents)"] = HomeSubpagesSafeAndUnSafeAgainstStealingCookiesForAllUserAgent
                jsonHomeSubpagesDesktopStealingCookies["Home and Subpages(safe and not safe against stealing cookies for all user agents) Details"] = HomeSubpagesSafeAndUnSafeAgainstStealingCookiesForAllUserAgentDetails
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(safe and not safe against stealing cookies for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktopStealingCookies))


                
                let jsonHomeSubpagesDesktopCSRF = {}
                jsonHomeSubpagesDesktopCSRF["number of total homepages"] = lengthnum
                jsonHomeSubpagesDesktopCSRF["number of Home and Subpages(safe against CSRF for all user agents)"] = `${numberOfHomeSubpagesSafeAgainstCSRFForAllUserAgent}`
                jsonHomeSubpagesDesktopCSRF["Home and Subpages(safe against CSRF for all user agents)"] = HomeSubpagesSafeAgainstCSRFForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(safe against CSRF for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktopCSRF))
                jsonHomeSubpagesDesktopCSRF = {}
                jsonHomeSubpagesDesktopCSRF["number of total homepages"] =lengthnum
                jsonHomeSubpagesDesktopCSRF["number of Home and Subpages(not safe against CSRF for all user agents)"] = `${numberOfHomeSubpagesUnSafeAgainstCSRFForAllUserAgent}`
                jsonHomeSubpagesDesktopCSRF["Home and Subpages(not safe against CSRF for all user agents)"] = HomeSubpagesUnSafeAgainstCSRFForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(not safe against CSRF for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktopCSRF))
                jsonHomeSubpagesDesktopCSRF = {}
                jsonHomeSubpagesDesktopCSRF["number of total homepages"] = lengthnum
                jsonHomeSubpagesDesktopCSRF["number of Home and Subpages(safe and not safe against CSRF for all user agents)"] = `${numberOfHomeSubpagesSafeAndUnSafeAgainstCSRFForAllUserAgent}`
                jsonHomeSubpagesDesktopCSRF["Home and Subpages(safe and not safe against CSRF for all user agents)"] = HomeSubpagesSafeAndUnSafeAgainstCSRFForAllUserAgent
                jsonHomeSubpagesDesktopCSRF["Home and Subpages(safe and not safe against CSRF for all user agents) Details"] = HomeSubpagesSafeAndUnSafeAgainstCSRFForAllUserAgentDetails
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(safe and not safe against CSRF for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktopCSRF))

    
                let jsonHomeSubpagesDesktophijacking = {}
                jsonHomeSubpagesDesktophijacking["number of total homepages"] = lengthnum
                jsonHomeSubpagesDesktophijacking["number of Home and Subpages(safe against hijacking for all user agents)"] = `${numberOfHomeSubpagesSafeAgainsthijackingForAllUserAgent}`
                jsonHomeSubpagesDesktophijacking["Home and Subpages(safe against hijacking for all user agents)"] = HomeSubpagesSafeAgainsthijackingForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(safe against hijacking for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktophijacking))
                jsonHomeSubpagesDesktophijacking = {}
                jsonHomeSubpagesDesktophijacking["number of total homepages"] =lengthnum
                jsonHomeSubpagesDesktophijacking["number of Home and Subpages(not safe against hijacking for all user agents)"] = `${numberOfHomeSubpagesUnSafeAgainstForhijackingAllUserAgent}`
                jsonHomeSubpagesDesktophijacking["Home and Subpages(not safe against hijacking for all user agents)"] = HomeSubpagesUnSafeAgainsthijackingForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(not safe against hijacking for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktophijacking))
                jsonHomeSubpagesDesktophijacking = {}
                jsonHomeSubpagesDesktophijacking["number of total homepages"] = lengthnum
                jsonHomeSubpagesDesktophijacking["number of Home and Subpages(safe and not safe against hijacking for all user agents)"] = `${numberOfHomeSubpagesSafeAndUnSafeAgainsthijackingForAllUserAgent}`
                jsonHomeSubpagesDesktophijacking["Home and Subpages(safe and not safe against hijacking for all user agents)"] = HomeSubpagesSafeAndUnSafeAgainsthijackingForAllUserAgent
                jsonHomeSubpagesDesktophijacking["Home and Subpages(safe and not safe against hijacking for all user agents) Details"] = HomeSubpagesSafeAndUnSafeAgainsthijackingForAllUserAgentDetails
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(safe and not safe against hijacking for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktophijacking))

                    
                let jsonHomeSubpagesDesktopclickjacking = {}
                jsonHomeSubpagesDesktopclickjacking["number of total homepages"] = lengthnum
                jsonHomeSubpagesDesktopclickjacking["number of Home and Subpages(safe against clickjacking for all user agents)"] = `${numberOfHomeSubpagesSafeAgainstclickjackingForAllUserAgent}`
                jsonHomeSubpagesDesktopclickjacking["Home and Subpages(safe against clickjacking for all user agents)"] = HomeSubpagesSafeAgainstclickjackingForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(safe against clickjacking for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktopclickjacking))
                jsonHomeSubpagesDesktopclickjacking = {}
                jsonHomeSubpagesDesktopclickjacking["number of total homepages"] =lengthnum
                jsonHomeSubpagesDesktopclickjacking["number of Home and Subpages(not safe against clickjacking for all user agents)"] = `${numberOfHomeSubpagesUnSafeAgainstForclickjackingAllUserAgent}`
                jsonHomeSubpagesDesktopclickjacking["Home and Subpages(not safe against clickjacking for all user agents)"] = HomeSubpagesUnSafeAgainstclickjackingForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(not safe against clickjacking for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktopclickjacking))
                jsonHomeSubpagesDesktopclickjacking = {}
                jsonHomeSubpagesDesktopclickjacking["number of total homepages"] = lengthnum
                jsonHomeSubpagesDesktopclickjacking["number of Home and Subpages(safe and not safe against clickjacking for all user agents)"] = `${numberOfHomeSubpagesSafeAndUnSafeAgainstclickjackingForAllUserAgent}`
                jsonHomeSubpagesDesktopclickjacking["Home and Subpages(safe and not safe against clickjacking for all user agents)"] = HomeSubpagesSafeAndUnSafeAgainstclickjackingForAllUserAgent
                jsonHomeSubpagesDesktopclickjacking["Home and Subpages(safe and not safe against clickjacking for all user agents) Details"] = HomeSubpagesSafeAndUnSafeAgainstclickjackingForAllUserAgentDetails
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(safe and not safe against clickjacking for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktopclickjacking))


                let jsonHomeSubpagesDesktopsllstripping = {}
                jsonHomeSubpagesDesktopsllstripping["number of total homepages"] = lengthnum
                jsonHomeSubpagesDesktopsllstripping["number of Home and Subpages(safe against sllstripping for all user agents)"] = `${numberOfHomeSubpagesSafeAgainstsllstrippingForAllUserAgent}`
                jsonHomeSubpagesDesktopsllstripping["Home and Subpages(safe against sllstripping for all user agents)"] = HomeSubpagesSafeAgainstsllstrippingForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(safe against sllstripping for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktopsllstripping))
                jsonHomeSubpagesDesktopsllstripping = {}
                jsonHomeSubpagesDesktopsllstripping["number of total homepages"] =lengthnum
                jsonHomeSubpagesDesktopsllstripping["number of Home and Subpages(not safe against sllstripping for all user agents)"] = `${numberOfHomeSubpagesUnSafeAgainstForsllstrippingAllUserAgent}`
                jsonHomeSubpagesDesktopsllstripping["Home and Subpages(not safe against sllstripping for all user agents)"] = HomeSubpagesUnSafeAgainstsllstrippingForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(not safe against sllstripping for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktopsllstripping))
                jsonHomeSubpagesDesktopsllstripping = {}
                jsonHomeSubpagesDesktopsllstripping["number of total homepages"] = lengthnum
                jsonHomeSubpagesDesktopsllstripping["number of Home and Subpages(safe and not safe against sllstripping for all user agents)"] = `${numberOfHomeSubpagesSafeAndUnSafeAgainstsllstrippingForAllUserAgent}`
                jsonHomeSubpagesDesktopsllstripping["Home and Subpages(safe and not safe against sllstripping for all user agents)"] = HomeSubpagesSafeAndUnSafeAgainstsllstrippingForAllUserAgent
                jsonHomeSubpagesDesktopsllstripping["Home and Subpages(safe and not safe against sllstripping for all user agents) Details"] = HomeSubpagesSafeAndUnSafeAgainstsllstrippingForAllUserAgentDetails
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingDesktopBrowsers(safe and not safe against sllstripping for all user agents).json`, JSON.stringify(jsonHomeSubpagesDesktopsllstripping))



            }
           
           // web.pushe(2)

            for(var d of mobile){
                
                numberOfHomeSubpagesWithSafeCSPForAllUserAgent = 0
                numberOfHomeSubpagesWithNotSafeCSPForAllUserAgent = 0
                numberOfHomeSubpagesWithSafeAndNotSafeCSPForAllUserAgent = 0
                HomeSubpagesWithSafeCSPForAllUserAgent = new Array()
                HomeSubpagesWithNotSafeCSPForAllUserAgent = new Array()
                HomeSubpagesWithSafeAndNotSafeCSPForAllUserAgent = new Array();
                HomeSubpagesWithSafeAndNotSafeCSPForAllUserAgentDetails = new Array();
    
                numberOfHomeSubpagesDeployCSPForAllUserAgent = 0
                numberOfHomeSubpagesNotDeployCSPForAllUserAgent = 0
                numberOfHomeSubpagesDeployAndNotDeployCSPForAllUserAgent = 0
                HomeSubpagesDeployCSPForAllUserAgent = new Array()
                HomeSubpagesNotDeployCSPForAllUserAgent = new Array()
                HomeSubpagesDeployAndNotDeployCSPForAllUserAgent = new Array();
                HomeSubpagesDeployAndNotDeployCSPForAllUserAgentDetails = new Array();

                numberOfHomeSubpagesSafeAgainstStealingCookiesForAllUserAgent = 0
                numberOfHomeSubpagesUnSafeAgainstStealingCookiesForAllUserAgent = 0
                numberOfHomeSubpagesSafeAndUnSafeAgainstStealingCookiesForAllUserAgent = 0
                HomeSubpagesSafeAgainstStealingCookiesForAllUserAgent = new Array();
                HomeSubpagesUnSafeAgainstStealingCookiesForAllUserAgent = new Array()
                HomeSubpagesSafeAndUnSafeAgainstStealingCookiesForAllUserAgent = new Array()
                HomeSubpagesSafeAndUnSafeAgainstStealingCookiesForAllUserAgentDetails = new Array();


                numberOfHomeSubpagesSafeAgainstCSRFForAllUserAgent = 0;
                numberOfHomeSubpagesUnSafeAgainstCSRFForAllUserAgent = 0;
                numberOfHomeSubpagesSafeAndUnSafeAgainstCSRFForAllUserAgent = 0;
                HomeSubpagesSafeAgainstCSRFForAllUserAgent = new Array();
                HomeSubpagesUnSafeAgainstCSRFForAllUserAgent = new Array();
                HomeSubpagesSafeAndUnSafeAgainstCSRFForAllUserAgent = new Array();
                HomeSubpagesSafeAndUnSafeAgainstCSRFForAllUserAgentDetails = new Array();


                numberOfHomeSubpagesSafeAgainsthijackingForAllUserAgent = 0;
                numberOfHomeSubpagesUnSafeAgainstForhijackingAllUserAgent = 0;
                numberOfHomeSubpagesSafeAndUnSafeAgainsthijackingForAllUserAgent = 0;
                HomeSubpagesSafeAgainsthijackingForAllUserAgent = new Array()
                HomeSubpagesUnSafeAgainsthijackingForAllUserAgent = new Array()
                HomeSubpagesSafeAndUnSafeAgainsthijackingForAllUserAgent = new Array()
                HomeSubpagesSafeAndUnSafeAgainsthijackingForAllUserAgentDetails = new Array()

                numberOfHomeSubpagesSafeAgainstclickjackingForAllUserAgent = 0;
                numberOfHomeSubpagesUnSafeAgainstForclickjackingAllUserAgent = 0;
                numberOfHomeSubpagesSafeAndUnSafeAgainstclickjackingForAllUserAgent = 0;
                HomeSubpagesSafeAgainstclickjackingForAllUserAgent = new Array();
                HomeSubpagesUnSafeAgainstclickjackingForAllUserAgent = new Array();
                HomeSubpagesSafeAndUnSafeAgainstclickjackingForAllUserAgent = new Array();
                HomeSubpagesSafeAndUnSafeAgainstclickjackingForAllUserAgentDetails = new Array();

                numberOfHomeSubpagesSafeAgainstsllstrippingForAllUserAgent = 0;
                numberOfHomeSubpagesUnSafeAgainstForsllstrippingAllUserAgent = 0;
                numberOfHomeSubpagesSafeAndUnSafeAgainstsllstrippingForAllUserAgent = 0;
                HomeSubpagesSafeAgainstsllstrippingForAllUserAgent = new Array();
                HomeSubpagesUnSafeAgainstsllstrippingForAllUserAgent = new Array();
                HomeSubpagesSafeAndUnSafeAgainstsllstrippingForAllUserAgent = new Array();
                HomeSubpagesSafeAndUnSafeAgainstsllstrippingForAllUserAgentDetails = new Array();

                /*console.log("TTTTTTTTTTTTTTTTT")
                console.log(web.length)
                console.log("TTTTTTTTTTTTTTTTT")*/
                let lengthnum2 = 0;
                for(let u of uri){
                    lengthnum2++;
                    let i = u.split(".")
                    let page = ""
                    for(let j = 0; j < i.length; j++){
                        if(j!=i.length-1){
                            page += i[j]+"-"
                        }else{
                            page += i[j]
                        }
                    } 
                    if(!fs.existsSync(`${resultFolder2Mobile}-${bro}`)){
                        fs.mkdirSync(path.join("./", `${resultFolder2Mobile}-${bro}`));
                    }
                    compareHomeWithSubpagesForEachDevices(page, `${folder2}-${bro}`, `${resultFolder2Mobile}-${bro}`, d)
                 
                }
    
                //console.log(lengthnum2)
                //uri.pushe(2)
                let jsonHomeSubpagesMobileCSPDeployment = {}
                jsonHomeSubpagesMobileCSPDeployment["number of total homepages"] = lengthnum2
                jsonHomeSubpagesMobileCSPDeployment["number of Home and Subpages(deploy CSP for all user agents)"] = `${numberOfHomeSubpagesDeployCSPForAllUserAgent}`
                jsonHomeSubpagesMobileCSPDeployment["Home and Subpages(deploy CSP for all user agents)"] = HomeSubpagesDeployCSPForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(deploy CSP for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobileCSPDeployment))
                jsonHomeSubpagesMobileCSPDeployment = {}
                jsonHomeSubpagesMobileCSPDeployment["number of total homepages"] = lengthnum2
                jsonHomeSubpagesMobileCSPDeployment["number of Home and Subpages(not deploy CSP for all user agents)"] = `${numberOfHomeSubpagesNotDeployCSPForAllUserAgent}`
                jsonHomeSubpagesMobileCSPDeployment["Home and Subpages(not deploy CSP for all user agents)"] = HomeSubpagesNotDeployCSPForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(not deploy CSP for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobileCSPDeployment))
                jsonHomeSubpagesMobileCSPDeployment = {}
                jsonHomeSubpagesMobileCSPDeployment["number of total homepages"] = lengthnum2
                jsonHomeSubpagesMobileCSPDeployment["number of Home and Subpages(deploy and not deploy CSP for all user agents)"] = `${numberOfHomeSubpagesDeployAndNotDeployCSPForAllUserAgent}`
                jsonHomeSubpagesMobileCSPDeployment["Home and Subpages(deploy and not deploy CSP for all user agents)"] = HomeSubpagesDeployAndNotDeployCSPForAllUserAgent
                jsonHomeSubpagesMobileCSPDeployment["Home and Subpages(deploy and not deploy CSP for all user agents) Details"] = HomeSubpagesDeployAndNotDeployCSPForAllUserAgentDetails
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(deploy and not deploy CSP for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobileCSPDeployment))
 



                let jsonHomeSubpagesMobile = {}
                jsonHomeSubpagesMobile["number of total homepages"] = lengthnum2
                jsonHomeSubpagesMobile["number of Home and Subpages(safe CSP for all user agents)"] = `${numberOfHomeSubpagesWithSafeCSPForAllUserAgent}`
                jsonHomeSubpagesMobile["Home and Subpages(safe CSP for all user agents)"] = HomeSubpagesWithSafeCSPForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(safe CSP for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobile))
                jsonHomeSubpagesMobile = {}
                jsonHomeSubpagesMobile["number of total homepages"] = lengthnum2
                jsonHomeSubpagesMobile["number of Home and Subpages(not safe CSP for all user agents)"] = `${numberOfHomeSubpagesWithNotSafeCSPForAllUserAgent}`
                jsonHomeSubpagesMobile["Home and Subpages(not safe CSP for all user agents)"] = HomeSubpagesWithNotSafeCSPForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(not safe CSP for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobile))
                jsonHomeSubpagesMobile = {}
                jsonHomeSubpagesMobile["number of total homepages"] = lengthnum2
                jsonHomeSubpagesMobile["number of Home and Subpages(safe and not safe CSP for all user agents)"] = `${numberOfHomeSubpagesWithSafeAndNotSafeCSPForAllUserAgent}`
                jsonHomeSubpagesMobile["Home and Subpages(safe and not safe CSP for all user agents)"] = HomeSubpagesWithSafeAndNotSafeCSPForAllUserAgent
                jsonHomeSubpagesMobile["Home and Subpages(safe and not safe CSP for all user agents) Details"] = HomeSubpagesWithSafeAndNotSafeCSPForAllUserAgentDetails
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(safe and not safe CSP for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobile))
                //csp_policies.pushe(2)


                let jsonHomeSubpagesMobileStealingCookies = {}
                jsonHomeSubpagesMobileStealingCookies["number of total homepages"] = lengthnum2
                jsonHomeSubpagesMobileStealingCookies["number of Home and Subpages(safe against stealing cookies for all user agents)"] = `${numberOfHomeSubpagesSafeAgainstStealingCookiesForAllUserAgent}`
                jsonHomeSubpagesMobileStealingCookies["Home and Subpages(safe against stealing cookies for all user agents)"] = HomeSubpagesSafeAgainstStealingCookiesForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(safe against stealing cookies for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobileStealingCookies))
                jsonHomeSubpagesMobileStealingCookies = {}
                jsonHomeSubpagesMobileStealingCookies["number of total homepages"] =lengthnum2
                jsonHomeSubpagesMobileStealingCookies["number of Home and Subpages(not safe against stealing cookies for all user agents)"] = `${numberOfHomeSubpagesUnSafeAgainstStealingCookiesForAllUserAgent}`
                jsonHomeSubpagesMobileStealingCookies["Home and Subpages(not safe against stealing cookies for all user agents)"] = HomeSubpagesUnSafeAgainstStealingCookiesForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(not safe against stealing cookies for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobileStealingCookies))
                jsonHomeSubpagesMobileStealingCookies = {}
                jsonHomeSubpagesMobileStealingCookies["number of total homepages"] = lengthnum2
                jsonHomeSubpagesMobileStealingCookies["number of Home and Subpages(safe and not safe against stealing cookies for all user agents)"] = `${numberOfHomeSubpagesSafeAndUnSafeAgainstStealingCookiesForAllUserAgent}`
                jsonHomeSubpagesMobileStealingCookies["Home and Subpages(safe and not safe against stealing cookies for all user agents)"] = HomeSubpagesSafeAndUnSafeAgainstStealingCookiesForAllUserAgent
                jsonHomeSubpagesMobileStealingCookies["Home and Subpages(safe and not safe against stealing cookies for all user agents) Details"] = HomeSubpagesSafeAndUnSafeAgainstStealingCookiesForAllUserAgentDetails
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(safe and not safe against stealing cookies for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobileStealingCookies))


                let jsonHomeSubpagesMobileCSRF = {}
                jsonHomeSubpagesMobileCSRF["number of total homepages"] = lengthnum2
                jsonHomeSubpagesMobileCSRF["number of Home and Subpages(safe against CSRF for all user agents)"] = `${numberOfHomeSubpagesSafeAgainstCSRFForAllUserAgent}`
                jsonHomeSubpagesMobileCSRF["Home and Subpages(safe againstCSRF for all user agents)"] = HomeSubpagesSafeAgainstCSRFForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(safe against CSRF for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobileCSRF))
                jsonHomeSubpagesMobileCSRF = {}
                jsonHomeSubpagesMobileCSRF["number of total homepages"] =lengthnum2
                jsonHomeSubpagesMobileCSRF["number of Home and Subpages(not safe against CSRF for all user agents)"] = `${numberOfHomeSubpagesUnSafeAgainstCSRFForAllUserAgent}`
                jsonHomeSubpagesMobileCSRF["Home and Subpages(not safe against CSRF for all user agents)"] = HomeSubpagesUnSafeAgainstCSRFForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(not safe against CSRF for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobileCSRF))
                jsonHomeSubpagesMobileCSRF = {}
                jsonHomeSubpagesMobileCSRF["number of total homepages"] = lengthnum2
                jsonHomeSubpagesMobileCSRF["number of Home and Subpages(safe and not safe against CSRF for all user agents)"] = `${numberOfHomeSubpagesSafeAndUnSafeAgainstCSRFForAllUserAgent}`
                jsonHomeSubpagesMobileCSRF["Home and Subpages(safe and not safe against CSRF for all user agents)"] = HomeSubpagesSafeAndUnSafeAgainstCSRFForAllUserAgent
                jsonHomeSubpagesMobileCSRF["Home and Subpages(safe and not safe against CSRF for all user agents) Details"] = HomeSubpagesSafeAndUnSafeAgainstCSRFForAllUserAgentDetails
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(safe and not safe against CSRF for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobileCSRF))



                let jsonHomeSubpagesMobilehijacking = {}
                jsonHomeSubpagesMobilehijacking["number of total homepages"] = lengthnum2
                jsonHomeSubpagesMobilehijacking["number of Home and Subpages(safe against hijacking for all user agents)"] = `${numberOfHomeSubpagesSafeAgainsthijackingForAllUserAgent}`
                jsonHomeSubpagesMobilehijacking["Home and Subpages(safe against hijacking for all user agents)"] = HomeSubpagesSafeAgainsthijackingForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(safe against hijacking for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobilehijacking))
                jsonHomeSubpagesMobilehijacking = {}
                jsonHomeSubpagesMobilehijacking["number of total homepages"] =lengthnum2
                jsonHomeSubpagesMobilehijacking["number of Home and Subpages(not safe against hijacking for all user agents)"] = `${numberOfHomeSubpagesUnSafeAgainstForhijackingAllUserAgent}`
                jsonHomeSubpagesMobilehijacking["Home and Subpages(not safe against hijacking for all user agents)"] = HomeSubpagesUnSafeAgainsthijackingForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(not safe against hijacking for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobilehijacking))
                jsonHomeSubpagesMobilehijacking = {}
                jsonHomeSubpagesMobilehijacking["number of total homepages"] = lengthnum2
                jsonHomeSubpagesMobilehijacking["number of Home and Subpages(safe and not safe against hijacking for all user agents)"] = `${numberOfHomeSubpagesSafeAndUnSafeAgainsthijackingForAllUserAgent}`
                jsonHomeSubpagesMobilehijacking["Home and Subpages(safe and not safe against hijacking for all user agents)"] = HomeSubpagesSafeAndUnSafeAgainsthijackingForAllUserAgent
                jsonHomeSubpagesMobilehijacking["Home and Subpages(safe and not safe against hijacking for all user agents) Details"] = HomeSubpagesSafeAndUnSafeAgainsthijackingForAllUserAgentDetails
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(safe and not safe against hijacking for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobilehijacking))


                let jsonHomeSubpagesMobileclickjacking = {}
                jsonHomeSubpagesMobileclickjacking["number of total homepages"] = lengthnum2
                jsonHomeSubpagesMobileclickjacking["number of Home and Subpages(safe against clickjacking for all user agents)"] = `${numberOfHomeSubpagesSafeAgainstclickjackingForAllUserAgent}`
                jsonHomeSubpagesMobileclickjacking["Home and Subpages(safe against clickjacking for all user agents)"] = HomeSubpagesSafeAgainstclickjackingForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(safe against clickjacking for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobileclickjacking))
                jsonHomeSubpagesMobileclickjacking = {}
                jsonHomeSubpagesMobileclickjacking["number of total homepages"] =lengthnum2
                jsonHomeSubpagesMobileclickjacking["number of Home and Subpages(not safe against clickjacking for all user agents)"] = `${numberOfHomeSubpagesUnSafeAgainstForclickjackingAllUserAgent}`
                jsonHomeSubpagesMobileclickjacking["Home and Subpages(not safe against clickjacking for all user agents)"] = HomeSubpagesUnSafeAgainstclickjackingForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(not safe against clickjacking for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobileclickjacking))
                jsonHomeSubpagesMobileclickjacking = {}
                jsonHomeSubpagesMobileclickjacking["number of total homepages"] = lengthnum2
                jsonHomeSubpagesMobileclickjacking["number of Home and Subpages(safe and not safe against clickjacking for all user agents)"] = `${numberOfHomeSubpagesSafeAndUnSafeAgainstclickjackingForAllUserAgent}`
                jsonHomeSubpagesMobileclickjacking["Home and Subpages(safe and not safe against clickjacking for all user agents)"] = HomeSubpagesSafeAndUnSafeAgainstclickjackingForAllUserAgent
                jsonHomeSubpagesMobileclickjacking["Home and Subpages(safe and not safe against clickjacking for all user agents) Details"] = HomeSubpagesSafeAndUnSafeAgainstclickjackingForAllUserAgentDetails
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(safe and not safe against clickjacking for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobileclickjacking))


                
                let jsonHomeSubpagesMobilesllstripping = {}
                jsonHomeSubpagesMobilesllstripping["number of total homepages"] = lengthnum2
                jsonHomeSubpagesMobilesllstripping["number of Home and Subpages(safe against sllstripping for all user agents)"] = `${numberOfHomeSubpagesSafeAgainstsllstrippingForAllUserAgent}`
                jsonHomeSubpagesMobilesllstripping["Home and Subpages(safe against sllstripping for all user agents)"] = HomeSubpagesSafeAgainstsllstrippingForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(safe against sllstripping for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobilesllstripping))
                jsonHomeSubpagesMobilesllstripping = {}
                jsonHomeSubpagesMobilesllstripping["number of total homepages"] =lengthnum2
                jsonHomeSubpagesMobilesllstripping["number of Home and Subpages(not safe against sllstripping for all user agents)"] = `${numberOfHomeSubpagesUnSafeAgainstForsllstrippingAllUserAgent}`
                jsonHomeSubpagesMobilesllstripping["Home and Subpages(not safe against sllstripping for all user agents)"] = HomeSubpagesUnSafeAgainstsllstrippingForAllUserAgent
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(not safe against sllstripping for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobilesllstripping))
                jsonHomeSubpagesMobilesllstripping = {}
                jsonHomeSubpagesMobilesllstripping["number of total homepages"] = lengthnum2
                jsonHomeSubpagesMobilesllstripping["number of Home and Subpages(safe and not safe against sllstripping for all user agents)"] = `${numberOfHomeSubpagesSafeAndUnSafeAgainstsllstrippingForAllUserAgent}`
                jsonHomeSubpagesMobilesllstripping["Home and Subpages(safe and not safe against sllstripping for all user agents)"] = HomeSubpagesSafeAndUnSafeAgainstsllstrippingForAllUserAgent
                jsonHomeSubpagesMobilesllstripping["Home and Subpages(safe and not safe against sllstripping for all user agents) Details"] = HomeSubpagesSafeAndUnSafeAgainstsllstrippingForAllUserAgentDetails
                fs.writeFileSync(`./${finalResult}-${bro}/compResultAllHome-SubpagesUsingMobileBrowsers(safe and not safe against sllstripping for all user agents).json`, JSON.stringify(jsonHomeSubpagesMobilesllstripping))



            }
        }

    }
  
  }





function compareHomeWithSubpagesForEachDevices(pageName, comparePath, resultPath, device){
    /*console.log("JJJJJJJJJJJJJJJJJJJJJJ")
    console.log(pageName)
    console.log(device)*/
    const  jsonsFiles =  fs.readdirSync(comparePath).filter((filename) => path.extname(filename) === '.json');

    //console.log(jsonsFiles)
    let csp_policies = new Array();
    jsonsFiles.forEach(filename => {
        let csp = new Array()
        if((filename.includes(`${pageName}.json`) || filename.includes(`${pageName}§`)) && (filename.includes(device.split("_")[0])) && (filename.includes(device.split("_")[1])) && (filename.includes(device.split("_")[2]))) {
            //console.log(filename)
            const fileData = fs.readFileSync(path.join(comparePath, filename));                    
            const json_arr = JSON.parse(fileData.toString());
            let json_str = JSON.stringify(json_arr);
            json_after_split = json_str.substring(1, json_str.length - 1);
            json_after_split = json_after_split.split(/,"/)
            //let dev = `${json_after_split[0].split(":")[1].replaceAll("\"","")}_${json_after_split[4].split(":")[1].replaceAll("\"","")}_${json_after_split[5].split(":")[1].replaceAll("\"","")}`
            //if(devices.includes(dev))
            csp.push(filename.split(".json")[0].substring(4))
            filename_debuger = filename
            let arr_2 = new Array();
            //console.log(json_after_split)
            //console.log(json_after_split)
            for (var elem of json_after_split) {
                let header;
                let arr_;
                let header_value;
                //&& !elem.includes(devUA)
                //console.log(elem)
                if(elem.includes("total devices:")){
                    devArr.pushe(2)
                }
                if((elem.includes("\":") && !elem.includes("http")) || elem.includes("visited_Webpage") || elem.includes("visited link") || (elem.includes("total devices:"))){
                    arr_ = elem.split(/":/);
                    //console.log(arr_)
                    header = arr_[0]
                    header_value = arr_[1]
                    header = delete_StrSy(arr_[0], "\"");
                    header_value = delete_StrSy(arr_[1], "\"")
                    //header_value = delete_StrSy(header_value, "\\")
                    arr_2.push([header, header_value])
                }else{
                    elem = elem.replaceAll("\"", "")
                    //console.log(elem)
                    //console.log(arr_2)
                    if(elem.endsWith(" ")){
                        arr_2[arr_2.length-1][1] = arr_2[arr_2.length-1][1] +","+ elem
                    }else{
                        arr_2[arr_2.length-1][1] = arr_2[arr_2.length-1][1] + ", " + elem
                    }
                    //console.log("Watchccccccccccccccccccccccccccccccccc")
                    //console.log( arr_2[arr_2.length-1][1])
                }
            }

            csp.push(arr_2)
           
            csp_policies.push(csp)
            //console.log(csp)
        }

    });
    //console.log(pageName)
    //console.log("PPPPPPPPPPPPPPPPPPPPPPPPPP")
    //console.log(csp_policies)
    //console.log(csp_policies.length)
    let homePage_Security = false;
    let homePage_CSPHeaderisThere = false;
    let homepage_SafeAgainstStealingCookies = false;
    let homepage_SafeAgainstCSRF = false;
    let homepage_SafeAgainsthijacking = false;
    let homepage_SafeAgainstclickjacking = false;
    let homepage_SafeAgainstsllstripping = false;

    let subPages_Security_SafeCSP = 0;
    let subPages_Security_UnSafeCSP = 0;
    let subPages_Security_arr = new Array();
    let subPages_Security_arr_NotSafe = new Array();
    let subPages_Security_arrSafeUnSafeCSP = new Array();

    let subPages_cspHeader_Exist = 0;
    let subPages_cspHeader_NotExist = 0;
    let subPages_cspHeader_arr = new Array();
    let subPages_cspHeader_arr_NoCSPHeader = new Array();
    let subPages_cspHeader_arr_CSPNoCSPHeader = new Array()

    let subPages_SafeAgainstStealingCookies = 0;
    let subPages_UnSafeAgainstStealingCookies = 0;
    let subPages_SafeAgainstStealingCookies_arr = new Array();
    let subPages_UnSafeAgainstStealingCookies_arr = new Array();
    let subPages_SafeAndUnSafeAgainstStealingCookies_arr = new Array();

    let subPages_SafeAgainstCSRF = 0;
    let subPages_UnSafeAgainstCSRF = 0;
    let subPages_SafeAgainstCSRF_arr = new Array();
    let subPages_UnSafeAgainstCSRF_arr = new Array();
    let subPages_SafeAndUnSafeAgainstCSRF_arr = new Array();

    let subPages_SafeAgainsthijacking = 0;
    let subPages_UnSafeAgainsthijacking = 0;
    let subPages_SafeAgainsthijacking_arr = new Array();
    let subPages_UnSafeAgainsthijacking_arr = new Array();
    let subPages_SafeAndUnSafeAgainsthijacking_arr = new Array();

    let subPages_SafeAgainstclickjacking = 0;
    let subPages_UnSafeAgainstclickjacking = 0;
    let subPages_SafeAgainstclickjacking_arr = new Array();
    let subPages_UnSafeAgainstclickjacking_arr = new Array();
    let subPages_SafeAndUnSafeAgainstclickjacking_arr = new Array();

    let subPages_SafeAgainstsllstripping = 0;
    let subPages_UnSafeAgainstsllstripping = 0;
    let subPages_SafeAgainstsllstripping_arr = new Array();
    let subPages_UnSafeAgainstsllstripping_arr = new Array();
    let subPages_SafeAndUnSafeAgainstsllstripping_arr = new Array();


    //console.log("JJJJJJJJJJJJJJJJJJJ")
    //console.log(pageName)
    //console.log(csp_policies[0])
    let urls = new Array()
    let numberOfSubPages = 0;
    if(csp_policies.length > 1){
        numberOfSubPages = csp_policies.length-1
    }
    //console.log(numberOfSubPages)
    let homepageURL = new String();
    let subpagesURL = new Array();
    for(let i = 0; i < csp_policies.length; i++){
        if(i === 0){
            urls.push(csp_policies[i][1][32][1])
            homepageURL = csp_policies[i][1][32][1];

            homepage_SafeAgainsthijacking = csp_policies[i][1][27][1]
            homepage_SafeAgainstCSRF = csp_policies[i][1][28][1]
            homePage_Security = csp_policies[i][1][7][1]
            homePage_CSPHeaderisThere = csp_policies[i][1][31][1]
            homepage_SafeAgainstStealingCookies = csp_policies[i][1][30][1]
            if(csp_policies[i][1][26][1] === '1' || csp_policies[i][1][26][1] === '2' || csp_policies[i][1][26][1] === '3'){
                homepage_SafeAgainstclickjacking = 'true'
            }else{
                homepage_SafeAgainstclickjacking = 'false'
            }
            if(csp_policies[i][1][24][1] === '1' || csp_policies[i][1][24][1] === '2' || csp_policies[i][1][24][1] === '3' || csp_policies[i][1][24][1] === '4'){
                homepage_SafeAgainstsllstripping = 'true'
            }else{
                homepage_SafeAgainstsllstripping = 'false'
            }
            

            subPages_Security_arrSafeUnSafeCSP.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `CSP Safe : ${csp_policies[i][1][7][1]}`])
            subPages_cspHeader_arr_CSPNoCSPHeader.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `CSP deployed : ${csp_policies[i][1][31][1]}`])
            subPages_SafeAndUnSafeAgainstStealingCookies_arr.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `Safe Against stealing cookies : ${csp_policies[i][1][30][1]}`])
            subPages_SafeAndUnSafeAgainstCSRF_arr.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `Safe Against CSRF : ${csp_policies[i][1][28][1]}`])
            subPages_SafeAndUnSafeAgainsthijacking_arr.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `Safe Against hijacking : ${csp_policies[i][1][27][1]}`])
            subPages_SafeAndUnSafeAgainstclickjacking_arr.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `Safe Against clickjacking : ${homepage_SafeAgainstclickjacking}`])
            subPages_SafeAndUnSafeAgainstsllstripping_arr.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `Safe Against clickjacking : ${homepage_SafeAgainstsllstripping}`])

            
        }else{
            subpagesURL.push(csp_policies[i][1][32][1])
            if(csp_policies[i][1][7][1] === 'true'){
                subPages_Security_SafeCSP++;
                subPages_Security_arr.push(csp_policies[i][1][32][1])
                  if(!urls.includes(csp_policies[i][1][32][1])){
                    if(csp_policies[i][1][32][1].length>0){
                        urls.push(csp_policies[i][1][32][1])

                    }
                } 
                subPages_Security_arrSafeUnSafeCSP.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `CSP Safe : ${csp_policies[i][1][7][1]}`])
            }else{
                subPages_Security_UnSafeCSP++;
                subPages_Security_arr_NotSafe.push( csp_policies[i][1][32][1])
                if(!urls.includes(csp_policies[i][1][32][1])){
                    if(csp_policies[i][1][32][1].length>0){
                        urls.push(csp_policies[i][1][32][1])

                    }
                } 
                subPages_Security_arrSafeUnSafeCSP.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `CSP Safe : ${csp_policies[i][1][7][1]}`])
            }
            if(csp_policies[i][1][31][1] === 'true'){
                subPages_cspHeader_Exist++;
                subPages_cspHeader_arr.push(csp_policies[i][1][32][1])
                if(!urls.includes(csp_policies[i][1][32][1])){
                    if(csp_policies[i][1][32][1].length>0){
                        urls.push(csp_policies[i][1][32][1])

                    }
                } 
                subPages_cspHeader_arr_CSPNoCSPHeader.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `CSP deployed : ${csp_policies[i][1][31][1]}`])
            }else{
                subPages_cspHeader_NotExist++;
                subPages_cspHeader_arr_NoCSPHeader.push(csp_policies[i][1][32][1])
                if(!urls.includes(csp_policies[i][1][32][1])){
                    if(csp_policies[i][1][32][1].length>0){
                        urls.push(csp_policies[i][1][32][1])

                    }
                }                
                subPages_cspHeader_arr_CSPNoCSPHeader.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `CSP deployed : ${csp_policies[i][1][31][1]}`])
            }

            if(csp_policies[i][1][30][1] === 'true'){
                subPages_SafeAgainstStealingCookies++;
                subPages_SafeAgainstStealingCookies_arr.push(csp_policies[i][1][32][1])
                if(!urls.includes(csp_policies[i][1][32][1])){
                    if(csp_policies[i][1][32][1].length>0){
                        urls.push(csp_policies[i][1][32][1])

                    }
                } 
                subPages_SafeAndUnSafeAgainstStealingCookies_arr.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `Safe Against stealing cookies : ${csp_policies[i][1][30][1]}`])
            }else{
                subPages_UnSafeAgainstStealingCookies++;
                subPages_UnSafeAgainstStealingCookies_arr.push(csp_policies[i][1][32][1])
                if(!urls.includes(csp_policies[i][1][32][1])){
                    if(csp_policies[i][1][32][1].length>0){
                        urls.push(csp_policies[i][1][32][1])

                    }
                }                
                subPages_SafeAndUnSafeAgainstStealingCookies_arr.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `Safe Against stealing cookies : ${csp_policies[i][1][30][1]}`])
            }


            if(csp_policies[i][1][28][1] === 'true'){
                subPages_SafeAgainstCSRF++;
                subPages_SafeAgainstCSRF_arr.push(csp_policies[i][1][32][1])
                if(!urls.includes(csp_policies[i][1][32][1])){
                    if(csp_policies[i][1][32][1].length>0){
                        urls.push(csp_policies[i][1][32][1])

                    }
                } 
                subPages_SafeAndUnSafeAgainstCSRF_arr.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `Safe Against CSRF : ${csp_policies[i][1][28][1]}`])
            }else{
                subPages_UnSafeAgainstCSRF++;
                subPages_UnSafeAgainstCSRF_arr.push(csp_policies[i][1][32][1])
                if(!urls.includes(csp_policies[i][1][32][1])){
                    if(csp_policies[i][1][32][1].length>0){
                        urls.push(csp_policies[i][1][32][1])

                    }
                }                
                subPages_SafeAndUnSafeAgainstCSRF_arr.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `Safe Against CSRF : ${csp_policies[i][1][28][1]}`])
            }

            if(csp_policies[i][1][27][1] === 'true'){
                subPages_SafeAgainsthijacking++;
                subPages_SafeAgainsthijacking_arr.push(csp_policies[i][1][32][1])
                if(!urls.includes(csp_policies[i][1][32][1])){
                    if(csp_policies[i][1][32][1].length>0){
                        urls.push(csp_policies[i][1][32][1])

                    }
                } 
                subPages_SafeAndUnSafeAgainsthijacking_arr.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `Safe Against hijacking : ${csp_policies[i][1][27][1]}`])
            }else{
                subPages_UnSafeAgainsthijacking++;
                subPages_UnSafeAgainsthijacking_arr.push(csp_policies[i][1][32][1])
                if(!urls.includes(csp_policies[i][1][32][1])){
                    if(csp_policies[i][1][32][1].length>0){
                        urls.push(csp_policies[i][1][32][1])

                    }
                }                
                subPages_SafeAndUnSafeAgainsthijacking_arr.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `Safe Against hijacking : ${csp_policies[i][1][27][1]}`])
            }


            if(csp_policies[i][1][26][1] === '1' || csp_policies[i][1][26][1] === '2' || csp_policies[i][1][26][1] === '3'){
                subPages_SafeAgainstclickjacking++;
                subPages_SafeAgainstclickjacking_arr.push(csp_policies[i][1][32][1])
                if(!urls.includes(csp_policies[i][1][32][1])){
                    if(csp_policies[i][1][32][1].length>0){
                        urls.push(csp_policies[i][1][32][1])

                    }
                } 
                subPages_SafeAndUnSafeAgainstclickjacking_arr.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `Safe Against clickjacking : true`])
            }else{
                subPages_UnSafeAgainstclickjacking++;
                subPages_UnSafeAgainstclickjacking_arr.push(csp_policies[i][1][32][1])
                if(!urls.includes(csp_policies[i][1][32][1])){
                    if(csp_policies[i][1][32][1].length>0){
                        urls.push(csp_policies[i][1][32][1])

                    }
                }                
                subPages_SafeAndUnSafeAgainstclickjacking_arr.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `Safe Against clickjacking : false`])
            }

        
            if(csp_policies[i][1][24][1] === '1' || csp_policies[i][1][24][1] === '2' || csp_policies[i][1][24][1] === '3' || csp_policies[i][1][24][1] === '4'){
                subPages_SafeAgainstsllstripping++;
                subPages_SafeAgainstsllstripping_arr.push(csp_policies[i][1][32][1])
                if(!urls.includes(csp_policies[i][1][32][1])){
                    if(csp_policies[i][1][32][1].length>0){
                        urls.push(csp_policies[i][1][32][1])

                    }
                } 
                subPages_SafeAndUnSafeAgainstsllstripping_arr.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `Safe Against sllstripping : true`])
            }else{
                subPages_UnSafeAgainstsllstripping++;
                subPages_UnSafeAgainstsllstripping_arr.push(csp_policies[i][1][32][1])
                if(!urls.includes(csp_policies[i][1][32][1])){
                    if(csp_policies[i][1][32][1].length>0){
                        urls.push(csp_policies[i][1][32][1])

                    }
                }                
                subPages_SafeAndUnSafeAgainstsllstripping_arr.push([`${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}`, csp_policies[i][1][32][1], `Safe Against sllstripping : false`])
            }

        
        }
    }

    let json_comp = {}
    json_comp['device'] = device
    json_comp['homepage deploy a CSP'] = homePage_CSPHeaderisThere
    json_comp['homepage deploy safe CSP'] = homePage_Security
    json_comp['homepage URL'] = homepageURL
    json_comp['number of total subpages'] = numberOfSubPages
    json_comp['subpages URLs'] = subpagesURL
    json_comp['number of subpages deploy a CSP'] = subPages_cspHeader_Exist
    json_comp['subpages deploy a CSP'] = subPages_cspHeader_arr
    json_comp['number of subpages dose not deploy a CSP'] = subPages_cspHeader_NotExist
    json_comp['subpages dose not deploy a CSP'] = subPages_cspHeader_arr_NoCSPHeader
    json_comp['number of subpages deploy safe CSP'] = subPages_Security_SafeCSP
    json_comp['subpages deploy safe CSP'] = subPages_Security_arr
    json_comp['number subpages dose not deploy safe CSP'] = subPages_Security_UnSafeCSP
    json_comp['subpages dose not deploy safe CSP'] = subPages_Security_arrSafeUnSafeCSP




    fs.writeFileSync(`./${resultPath}/${device}_compResult_${pageName}.json`, JSON.stringify(json_comp))

    /*console.log(subPages_Security_SafeCSP)
    console.log(subPages_Security_UnSafeCSP)
    console.log(subPages_cspHeader_Exist)
    console.log(subPages_cspHeader_NotExist)*/
    /*console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ")
    console.log(pageName)
    console.log(subPages_cspHeader_NotExist)*/
    if(homePage_Security === 'true' && (subPages_Security_SafeCSP === numberOfSubPages)){
        subPages_Security_arrSafeUnSafeCSP = new Array();
        numberOfHomeSubpagesWithSafeCSPForAllUserAgent++;
        HomeSubpagesWithSafeCSPForAllUserAgent.push(urls)
    }else if (homePage_Security === 'false' && (subPages_Security_UnSafeCSP === numberOfSubPages)){
        subPages_Security_arrSafeUnSafeCSP = new Array()
        numberOfHomeSubpagesWithNotSafeCSPForAllUserAgent++;
        HomeSubpagesWithNotSafeCSPForAllUserAgent.push(urls)
    }else{
        numberOfHomeSubpagesWithSafeAndNotSafeCSPForAllUserAgent++;
        HomeSubpagesWithSafeAndNotSafeCSPForAllUserAgent.push(urls)
        HomeSubpagesWithSafeAndNotSafeCSPForAllUserAgentDetails.push(subPages_Security_arrSafeUnSafeCSP)
    }


    if(homePage_CSPHeaderisThere === 'true' && (subPages_cspHeader_Exist === numberOfSubPages)){
        //console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
        subPages_cspHeader_arr_CSPNoCSPHeader = new Array();
        numberOfHomeSubpagesDeployCSPForAllUserAgent++;
        HomeSubpagesDeployCSPForAllUserAgent.push(urls)
    }else if (homePage_CSPHeaderisThere === 'false' && (subPages_cspHeader_NotExist === numberOfSubPages)){
        //console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
        subPages_cspHeader_arr_CSPNoCSPHeader = new Array()
        numberOfHomeSubpagesNotDeployCSPForAllUserAgent++;
        HomeSubpagesNotDeployCSPForAllUserAgent.push(urls)
    }else{
        //console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
        numberOfHomeSubpagesDeployAndNotDeployCSPForAllUserAgent++;
        HomeSubpagesDeployAndNotDeployCSPForAllUserAgent.push(urls)
        HomeSubpagesDeployAndNotDeployCSPForAllUserAgentDetails.push(subPages_cspHeader_arr_CSPNoCSPHeader)
    }

    if(homepage_SafeAgainstStealingCookies === 'true' && (subPages_SafeAgainstStealingCookies === numberOfSubPages)){
        //console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
        subPages_SafeAndUnSafeAgainstStealingCookies_arr = new Array();
        numberOfHomeSubpagesSafeAgainstStealingCookiesForAllUserAgent++;
        HomeSubpagesSafeAgainstStealingCookiesForAllUserAgent.push(urls)
    }else if (homepage_SafeAgainstStealingCookies === 'false' && (subPages_UnSafeAgainstStealingCookies === numberOfSubPages)){
        //console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
        subPages_SafeAndUnSafeAgainstStealingCookies_arr = new Array()
        numberOfHomeSubpagesUnSafeAgainstStealingCookiesForAllUserAgent++;
        HomeSubpagesUnSafeAgainstStealingCookiesForAllUserAgent.push(urls)
    }else{
        //console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
        numberOfHomeSubpagesSafeAndUnSafeAgainstStealingCookiesForAllUserAgent++;
        HomeSubpagesSafeAndUnSafeAgainstStealingCookiesForAllUserAgent.push(urls)
        HomeSubpagesSafeAndUnSafeAgainstStealingCookiesForAllUserAgentDetails.push(subPages_SafeAndUnSafeAgainstStealingCookies_arr)
    }



    if(homepage_SafeAgainstCSRF === 'true' && (subPages_SafeAgainstCSRF === numberOfSubPages)){
        //console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
        subPages_SafeAndUnSafeAgainstCSRF_arr = new Array();
        numberOfHomeSubpagesSafeAgainstCSRFForAllUserAgent++;
        HomeSubpagesSafeAgainstCSRFForAllUserAgent.push(urls)
    }else if (homepage_SafeAgainstCSRF === 'false' && (subPages_UnSafeAgainstCSRF === numberOfSubPages)){
        //console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
        subPages_SafeAndUnSafeAgainstCSRF_arr = new Array()
        numberOfHomeSubpagesUnSafeAgainstCSRFForAllUserAgent++;
        HomeSubpagesUnSafeAgainstCSRFForAllUserAgent.push(urls)
    }else{
        //console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
        numberOfHomeSubpagesSafeAndUnSafeAgainstCSRFForAllUserAgent++;
        HomeSubpagesSafeAndUnSafeAgainstCSRFForAllUserAgent.push(urls)
        HomeSubpagesSafeAndUnSafeAgainstCSRFForAllUserAgentDetails.push(subPages_SafeAndUnSafeAgainstCSRF_arr)
    }

    if(homepage_SafeAgainsthijacking === 'true' && (subPages_SafeAgainsthijacking === numberOfSubPages)){
        //console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
        subPages_SafeAndUnSafeAgainsthijacking_arr = new Array();
        numberOfHomeSubpagesSafeAgainsthijackingForAllUserAgent++;
        HomeSubpagesSafeAgainsthijackingForAllUserAgent.push(urls)
    }else if (homepage_SafeAgainsthijacking === 'false' && (subPages_UnSafeAgainsthijacking === numberOfSubPages)){
        //console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
        subPages_SafeAndUnSafeAgainsthijacking_arr = new Array()
        numberOfHomeSubpagesUnSafeAgainstForhijackingAllUserAgent++;
        HomeSubpagesUnSafeAgainsthijackingForAllUserAgent.push(urls)
    }else{
        //console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
        numberOfHomeSubpagesSafeAndUnSafeAgainsthijackingForAllUserAgent++;
        HomeSubpagesSafeAndUnSafeAgainsthijackingForAllUserAgent.push(urls)
        HomeSubpagesSafeAndUnSafeAgainsthijackingForAllUserAgentDetails.push(subPages_SafeAndUnSafeAgainsthijacking_arr)
    }

    if(homepage_SafeAgainstclickjacking === 'true' && (subPages_SafeAgainstclickjacking === numberOfSubPages)){
        //console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
        subPages_SafeAndUnSafeAgainstclickjacking_arr = new Array();
        numberOfHomeSubpagesSafeAgainstclickjackingForAllUserAgent++;
        HomeSubpagesSafeAgainstclickjackingForAllUserAgent.push(urls)
    }else if (homepage_SafeAgainstclickjacking === 'false' && (subPages_UnSafeAgainstclickjacking === numberOfSubPages)){
        //console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
        subPages_SafeAndUnSafeAgainstclickjacking_arr = new Array()
        numberOfHomeSubpagesUnSafeAgainstForclickjackingAllUserAgent++;
        HomeSubpagesUnSafeAgainstclickjackingForAllUserAgent.push(urls)
    }else{
        //console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
        numberOfHomeSubpagesSafeAndUnSafeAgainstclickjackingForAllUserAgent++;
        HomeSubpagesSafeAndUnSafeAgainstclickjackingForAllUserAgent.push(urls)
        HomeSubpagesSafeAndUnSafeAgainstclickjackingForAllUserAgentDetails.push(subPages_SafeAndUnSafeAgainstclickjacking_arr)
    }



    if(homepage_SafeAgainstsllstripping === 'true' && (subPages_SafeAgainstsllstripping === numberOfSubPages)){
        //console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
        subPages_SafeAndUnSafeAgainstsllstripping_arr = new Array();
        numberOfHomeSubpagesSafeAgainstsllstrippingForAllUserAgent++;
        HomeSubpagesSafeAgainstsllstrippingForAllUserAgent.push(urls)
    }else if (homepage_SafeAgainstsllstripping === 'false' && (subPages_UnSafeAgainstsllstripping === numberOfSubPages)){
        //console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
        subPages_SafeAndUnSafeAgainstsllstripping_arr = new Array()
        numberOfHomeSubpagesUnSafeAgainstForsllstrippingAllUserAgent++;
        HomeSubpagesUnSafeAgainstsllstrippingForAllUserAgent.push(urls)
    }else{
        //console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
        numberOfHomeSubpagesSafeAndUnSafeAgainstsllstrippingForAllUserAgent++;
        HomeSubpagesSafeAndUnSafeAgainstsllstrippingForAllUserAgent.push(urls)
        HomeSubpagesSafeAndUnSafeAgainstsllstrippingForAllUserAgentDetails.push(subPages_SafeAndUnSafeAgainstsllstripping_arr)
    }


}


function compareWebsite(pageName, comparePath, resultPath, devices){
    
    const  jsonsFiles =  fs.readdirSync(comparePath).filter((filename) => path.extname(filename) === '.json');
    let csp_policies = new Array();
    jsonsFiles.forEach(filename => {
        let csp = new Array()
        if(filename.includes(`${pageName}.json`)) {
            const fileData = fs.readFileSync(path.join(comparePath, filename));                    
            const json_arr = JSON.parse(fileData.toString());
            let json_str = JSON.stringify(json_arr);
            json_after_split = json_str.substring(1, json_str.length - 1);
            json_after_split = json_after_split.split(/,"/)
            let dev = `${json_after_split[0].split(":")[1].replaceAll("\"","")}_${json_after_split[4].split(":")[1].replaceAll("\"","")}_${json_after_split[5].split(":")[1].replaceAll("\"","")}`
            if(devices.includes(dev)){
                csp.push(filename.split(".json")[0].substring(4))
                filename_debuger = filename
                let arr_2 = new Array();
              
                //console.log(json_after_split)
                for (var elem of json_after_split) {
                    let header;
                    let arr_;
                    let header_value;
                    
                    if((elem.includes(":") && !elem.includes("http") && !(/.+:\/\//.test(elem)) && !(/.+:$/.test(elem)) && !(/.+:"$/.test(elem)) && !(/.+:"]$/.test(elem)) && !elem.includes("data")&& !elem.includes("mediastream")&& !elem.includes("blob")&& !elem.includes("filesystem")&& !elem.includes("resource")&& !elem.includes(":*")) || elem.includes("visited_Webpage") || elem.includes("dataURL") || elem.includes("origins")){
                        arr_ = elem.split(/":/);
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
                csp.push(arr_2)
               
                csp_policies.push(csp)
                //console.log(csp)
            }
            
        }

    });
    //console.log(csp_policies)
    if(csp_policies.length > 0){
        let pagesWithSafeCSPWithAllUserAgentsNr = 0;
        let pagesWithNotSafeCSPWithAllUserAgentsNr = 0;
        let pagesWithSafeAndNotSafeCSPWithAllUserAgentsNr = 0;

        let pagesdeployCSPWithAllUserAgents = 0
        let pagesDoesNotdeployCSPWithAllUserAgents = 0
        let pagesdeployAndNotDeployCSPWithAllUserAgents = 0


        let numberOfPagesProtectionAgainstStealingCookiesLocal = 0;
        let numberOfPagesNoProtectionAgainstStealingCookiesLocal = 0;
        let numberOfPagesProtectionAndNoProtectionAgainstStealingCookiesLocal = 0;
        let pagesProtectionAgainstStealingCookiesLocal = new Array();
        let pagesNoProtectionAgainstStealingCookiesLocal = new Array();
        let pagesProtectionAndNoProtectionAgainstStealingCookiesLocal = new Array();

        let numberOfPagesProtectionAgainstCSRFLocal = 0;
        let numberOfPagesNoProtectionAgainstCSRFLocal = 0;
        let numberOfPagesProtectionAndNoProtectionAgainstCSRFLocal = 0;
        let pagesProtectionAgainstCSRFLocal = new Array();
        let pagesNoProtectionAgainstCSRFLocal = new Array();
        let pagesProtectionAndNoProtectionAgainstCSRFLocal = new Array();

        let numberOfPagesProtectionAgainsthijackingLocal = 0;
        let numberOfPagesNoProtectionAgainsthijackingLocal = 0;
        let numberOfPagesProtectionAndNoProtectionAgainsthijackingLocal = 0;
        let pagesProtectionAgainsthijackingLocal = new Array();
        let pagesNoProtectionAgainsthijackingLocal = new Array();
        let pagesProtectionAndNoProtectionAgainsthijackingLocal = new Array();

        let numberOfPagesProtectionAgainstclickjackingLocal = 0;
        let numberOfPagesNoProtectionAgainstclickjackingLocal = 0;
        let numberOfPagesProtectionAndNoProtectionAgainstclickjackingLocal = 0;
        let pagesProtectionAgainstclickjackingLocal = new Array();
        let pagesNoProtectionAgainstclickjackingLocal = new Array();
        let pagesProtectionAndNoProtectionAgainstclickjackingLocal = new Array();

        
        let numberOfPagesProtectionAgainstSLLStrippingLocal = 0;
        let numberOfPagesNoProtectionAgainstSLLStrippingLocal = 0;
        let numberOfPagesProtectionAndNoProtectionAgainstSLLStrippingLocal = 0;
        let pagesProtectionAgainstSLLStrippingLocal = new Array();
        let pagesNoProtectionAgainstSLLStrippingLocal = new Array();
        let pagesProtectionAndNoProtectionAgainstSLLStrippingLocal = new Array();

        
        let json_comp = {};
        let devices = new Array();
        let devices_safe_csp = new Array()
        let devices_notSafe_csp = new Array()
        let dev_provide_no_protection_against_sslStripping_level_0 = new Array()
        let dev_provide_protection_against_sslStripping_level_1 = new Array()
        let dev_provide_protection_against_sslStripping_level_2 = new Array()
        let dev_provide_protection_against_sslStripping_level_3 = new Array()
        let dev_provide_protection_against_sslStripping_level_4 = new Array()
        let arr_dev_sts_max_age_protection_classe1 = new Array()
        let arr_dev_sts_max_age_protection_classe2 = new Array()
        let arr_dev_sts_max_age_protection_classe3 = new Array()
        let dev_provide_no_protection_against_clickjacking_level_0 = new Array()
        let dev_provide_protection_against_clickjacking_xfo_level_1 = new Array()
        let dev_provide_protection_against_clickjacking_csp_level_1 = new Array()
        let dev_provide_protection_against_clickjacking_xfo_level_2 = new Array()
        let dev_provide_protection_against_clickjacking_csp_level_2 = new Array()
        let dev_provide_protection_against_clickjacking_xfo_level_3 = new Array()
        let dev_provide_protection_against_clickjacking_csp_level_3 = new Array()
        let dev_provide_protection_against_hijacking = new Array()
        let dev_provide_no_protection_against_hijacking = new Array()
        let dev_provide_protection_against_steeling_cookies = new Array()
        let dev_provide_no_protection_against_steeling_cookies = new Array()
        let dev_provide_no_protection_against_csrf_level_0 = new Array()
        let dev_provide_protection_against_csrf_level_1 = new Array()
        let dev_provide_protection_against_csrf_level_2 = new Array()
        let dev_no_cspHeader = new Array()
        let dev_with_cspHeader = new Array()
        let isCSPsafe = 0;
        let pagesDViewPSafeAndNotSafeCSPWithDevicesInfoLocalArray = new Array()
        let dev_deploying_csp = new Array()
        let dev_not_deploying_csp = new Array()
        let pagesDeployAndNotDeploy = new Array()

        
       
        let filename;
        let device;
        let causeOfSafty= new String()
        let causeOfNotSafty = new String()
        let url;
        for(let i = 0; i < csp_policies.length; i++){
            let reasonFound = false;
            filename = `${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}_${csp_policies[i][1][3][1]}_${csp_policies[i][1][1][1]}_${csp_policies[i][1][2][1]}`
            device = `${csp_policies[i][1][0][1]} height:${csp_policies[i][1][4][1]} width:${csp_policies[i][1][5][1]} operatingSystem:${csp_policies[i][1][3][1]} browser:${csp_policies[i][1][1][1]} browser_version:${csp_policies[i][1][2][1]}`
            url = csp_policies[i][1][csp_policies[i][1].length-1][1]
            devices.push(device)
            if(csp_policies[i][1][7][1] === 'true'){
                causeOfSafty += "("
                if(csp_policies[i][1][13][1] === 'true'){
                    causeOfSafty += "nonce_"
                    reasonFound = true
                }
                if(csp_policies[i][1][14][1] === 'true'){
                    causeOfSafty += "hash_"
                    reasonFound = true
                }
                if((csp_policies[i][1][13][1] === 'true' && csp_policies[i][1][15][1] === 'true') || (csp_policies[i][1][14][1] === 'true' && csp_policies[i][1][15][1] === 'true')){
                    causeOfSafty += "strict-dynamic_"
                    reasonFound = true
                }
                //console.log(causeOfSafty.length)
                //devArr.pushe(2)
                if(reasonFound){
                    causeOfSafty += `_${csp_policies[i][1][0][1]} height:${csp_policies[i][1][4][1]} width:${csp_policies[i][1][5][1]}),`
                }

                isCSPsafe = 1;
                devices_safe_csp.push(device)
                dev_with_cspHeader.push(device)
                pagesWithSafeCSPWithAllUserAgentsNr++;
                pagesWithSafeAndNotSafeCSPWithAllUserAgentsNr++;
                pagesDViewPSafeAndNotSafeCSPWithDevicesInfoLocalArray.push([url, `${csp_policies[i][1][0][1]} hXw:${csp_policies[i][1][4][1]}x${csp_policies[i][1][5][1]}`])
            }
            /*
            if(csp_policies[i][1][7][1] === 'true'){
                console.log(pageName)
                console.log("safe  " + csp_policies[i][1][31][1])
            }else if(csp_policies[i][1][7][1] === 'false'){
                if(csp_policies[i][1][8][1] === 'csp dose not contain script-src-elem, script-src or default-src') {
                    console.log(pageName)
                    console.log("not safe CSP exist DN " +csp_policies[i][1][31][1])
                }else if(csp_policies[i][1][8][1] != 'CSP header does not exist') {
                    console.log(pageName)
                    console.log("not safe  CSP exist " +csp_policies[i][1][31][1])
                }else{
                    console.log(pageName)
                    console.log("not existed  " +csp_policies[i][1][31][1])
                }
            }*/
            if(csp_policies[i][1][7][1] === 'false'){
                isCSPsafe = 2;
                causeOfNotSafty += "("
                devices_notSafe_csp.push(device)
                if(csp_policies[i][1][8][1] === 'csp dose not contain script-src-elem, script-src or default-src') {
                    reasonFound = true
                    causeOfNotSafty += 'csp dose not contain script-src-elem, script-src or default-src'
                    dev_with_cspHeader.push(device)
                    pagesWithNotSafeCSPWithAllUserAgentsNr++;
                    pagesWithSafeAndNotSafeCSPWithAllUserAgentsNr++;
                    pagesDViewPSafeAndNotSafeCSPWithDevicesInfoLocalArray.push([url, `${csp_policies[i][1][0][1]} hXw:${csp_policies[i][1][4][1]}x${csp_policies[i][1][5][1]}`])

                } else if (csp_policies[i][1][8][1] != 'CSP header does not exist') {
                    if(csp_policies[i][1][11][1] === 'true'){
                        causeOfNotSafty += "unsafe-inline_"
                        reasonFound = true
                    }
                    if(csp_policies[i][1][12][1] === 'true'){
                        causeOfNotSafty += "unsafe-eval_"
                        reasonFound = true
                    }
                    if(csp_policies[i][1][16][1] === 'true'){
                        causeOfNotSafty += "wildcard*_"
                        reasonFound = true
                    }
                    if(csp_policies[i][1][17][1] === 'true'){
                        causeOfNotSafty += "protocol_"
                        reasonFound = true
                    }
                    if(csp_policies[i][1][18][1] === 'true'){
                        causeOfNotSafty += "data-URL_"
                        reasonFound = true
                    }
                    dev_with_cspHeader.push(device)
                    pagesWithNotSafeCSPWithAllUserAgentsNr++;
                    pagesWithSafeAndNotSafeCSPWithAllUserAgentsNr++;
                    pagesDViewPSafeAndNotSafeCSPWithDevicesInfoLocalArray.push([url, `${csp_policies[i][1][0][1]} hXw:${csp_policies[i][1][4][1]}x${csp_policies[i][1][5][1]}`])
                }else{
                    //console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
                    dev_no_cspHeader.push(device)
                }
                //console.log(causeOfNotSafty.length)
                //console.log(causeOfNotSafty.le > 1)
                //devArr.pushe(2)
                if(reasonFound){
                    causeOfNotSafty += `_${csp_policies[i][1][0][1]} height:${csp_policies[i][1][4][1]} width:${csp_policies[i][1][5][1]}),`
                }
               
            }   

        

            if(csp_policies[i][1][24][1] === '1' || csp_policies[i][1][24][1] === '2' || csp_policies[i][1][24][1] === '3' || csp_policies[i][1][24][1] === '4'){
                numberOfPagesProtectionAgainstSLLStrippingLocal++;
                numberOfPagesProtectionAndNoProtectionAgainstSLLStrippingLocal++;
                pagesProtectionAgainstSLLStrippingLocal.push(csp_policies[i][1][32][1])
                pagesProtectionAndNoProtectionAgainstSLLStrippingLocal.push([device, url, `Safety : true`])
            }else{
                numberOfPagesNoProtectionAgainstSLLStrippingLocal++;
                numberOfPagesProtectionAndNoProtectionAgainstSLLStrippingLocal++;
                pagesProtectionAgainstSLLStrippingLocal.push(csp_policies[i][1][32][1])
                pagesNoProtectionAgainstSLLStrippingLocal.push([device, url, `Safety : false`])
            }

            switch(csp_policies[i][1][24][1]) {
                case '0' : {
                    dev_provide_no_protection_against_sslStripping_level_0.push(device)
                }
                break;
    
                case '1': {
                    dev_provide_protection_against_sslStripping_level_1.push(device)
                }
                break;
    
                case '2': {
                    dev_provide_protection_against_sslStripping_level_2.push(device)
                }
                break;
    
                case '3': {
                    dev_provide_protection_against_sslStripping_level_3.push(device)
                }
                break;
    
                case '4': {
                    dev_provide_protection_against_sslStripping_level_4.push(device)
                }
                break;
    
                default : console.log('ssl stripping')
                break;
            }
    
            switch(csp_policies[i][1][23][1]) {   
                case '1': {
                    arr_dev_sts_max_age_protection_classe1.push(device)
                }
                break;
                case '2': {
                    arr_dev_sts_max_age_protection_classe2.push(device)                      
                }
                break;
                case '3': {
                    arr_dev_sts_max_age_protection_classe3.push(device)                      
                }
                break;
                /*
                default: {
                    console.log("sts_max_age")
                    console.log(csp_policies[i])
                    console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOO")
                    console.log(check)
                    console.log(check)
                    console.log(i)
                }
                break;
                */
        
            }
    
    

            if(csp_policies[i][1][26][1] === '1' || csp_policies[i][1][26][1] === '2' || csp_policies[i][1][26][1] === '3'){
                numberOfPagesProtectionAgainstclickjackingLocal++;
                numberOfPagesProtectionAndNoProtectionAgainstclickjackingLocal++;
                pagesProtectionAgainstclickjackingLocal.push(csp_policies[i][1][32][1])
                pagesProtectionAndNoProtectionAgainstclickjackingLocal.push([device, url, `Safety : true`])

            }else{
                numberOfPagesNoProtectionAgainstclickjackingLocal++;
                numberOfPagesProtectionAndNoProtectionAgainstclickjackingLocal++;
                pagesNoProtectionAgainstclickjackingLocal.push(csp_policies[i][1][32][1])
                pagesProtectionAndNoProtectionAgainstclickjackingLocal.push([device, url, `Safety : false`])
            }

            switch(csp_policies[i][1][26][1]) {
                case '0' : {
                    dev_provide_no_protection_against_clickjacking_level_0.push(device)
                }
                break;
                case 'false' :{
                    dev_provide_no_protection_against_clickjacking_level_0.push(device)
                }
                break;
             
                case '1': {
                    if (csp_policies[i][1][25][1] === 'x') {
                        dev_provide_protection_against_clickjacking_xfo_level_1.push(device)
                    }
                    if (csp_policies[i][1][25][1] === 'c') {
                        dev_provide_protection_against_clickjacking_csp_level_1.push(device)
                    }
                
                }
                break;
    
                case '2': {
                    if (csp_policies[i][1][25][1] === 'x') {
                        dev_provide_protection_against_clickjacking_xfo_level_2.push(device)
                    }
                    if (csp_policies[i][1][25][1] === 'c') {
                        dev_provide_protection_against_clickjacking_csp_level_2.push(device)
                    }
                }
                break;
    
                case '3': {
                    if (csp_policies[i][1][25][1] === 'x') {
                        dev_provide_protection_against_clickjacking_xfo_level_3.push(device)
                    }
                    if (csp_policies[i][1][25][1] === 'c') {
                        dev_provide_protection_against_clickjacking_csp_level_3.push(device)
                    }
                }
                break;
                default: console.log('-clickjacking-');
                //console.log(csp_policies[i][1][26])
    
                break;
    
            }

            switch(csp_policies[i][1][27][1]) {   
                case 'true': {
                    dev_provide_protection_against_hijacking.push(device)

                    numberOfPagesProtectionAgainsthijackingLocal++;
                    numberOfPagesProtectionAndNoProtectionAgainsthijackingLocal++;
                    pagesProtectionAgainsthijackingLocal.push(csp_policies[i][1][32][1])
                    pagesProtectionAndNoProtectionAgainsthijackingLocal.push([device, url, `Safety : ${csp_policies[i][1][27][1]}`])

                }
                break;
    
                case 'false': {
                    dev_provide_no_protection_against_hijacking.push(device)
                    numberOfPagesNoProtectionAgainsthijackingLocal++;
                    numberOfPagesProtectionAndNoProtectionAgainsthijackingLocal++;
                    pagesNoProtectionAgainsthijackingLocal.push(csp_policies[i][1][32][1])
                    pagesProtectionAndNoProtectionAgainsthijackingLocal.push([device, url, `Safety : ${csp_policies[i][1][27][1]}`])

                }
                break;
    
                default: console.log('-hijacking-')
                break;
    
            }
   
            switch(csp_policies[i][1][30][1]) {
                            
                case 'true': {
                    /*console.log("22222222222222222222222222222222222222222222222222222")
                    console.log(bro)
                    console.log(csp_policies[i][1][30])*/
                    dev_provide_protection_against_steeling_cookies.push(device)
                    numberOfPagesProtectionAgainstStealingCookiesLocal++;
                    numberOfPagesProtectionAndNoProtectionAgainstStealingCookiesLocal++;
                    pagesProtectionAgainstStealingCookiesLocal.push(csp_policies[i][1][32][1])
                    pagesProtectionAndNoProtectionAgainstStealingCookiesLocal.push([device, url, `Safety : ${csp_policies[i][1][30][1]}`])
                }
                break;
    
                case 'false': {
                    /*console.log("1111111111111111111111111111111111111111111111111111")
                    console.log(csp_policies[i][1][30])*/
                    dev_provide_no_protection_against_steeling_cookies.push(device)
                    numberOfPagesNoProtectionAgainstStealingCookiesLocal++;
                    numberOfPagesProtectionAndNoProtectionAgainstStealingCookiesLocal++;
                    pagesNoProtectionAgainstStealingCookiesLocal.push(csp_policies[i][1][32][1])
                    pagesProtectionAndNoProtectionAgainstStealingCookiesLocal.push([device, url, `Safety : ${csp_policies[i][1][30][1]}`])
                }
                break;
    
                default: console.log('stealing cookes')
                console.log(csp_policies[i][1])
                console.log(csp_policies[i][1][29])
                console.log(csp_policies[i][1][30])
                devArr.pushe(2)
                break;
    
            }
    
          
    
        
    
            

            
            switch(csp_policies[i][1][29][1]) { 
                case '0': {
                    dev_provide_no_protection_against_csrf_level_0.push(device)
                }
                break;
    
                case '1': {
                    dev_provide_protection_against_csrf_level_1.push(device)
                }
                break;
    
                case '2': {
                    dev_provide_protection_against_csrf_level_2.push(device)
                }
                break;
            }



            switch(csp_policies[i][1][28][1]) { 
                case 'true': {
                    numberOfPagesProtectionAgainstCSRFLocal++;
                    numberOfPagesProtectionAndNoProtectionAgainstCSRFLocal++;
                    pagesProtectionAgainstCSRFLocal.push(csp_policies[i][1][32][1])
                    pagesProtectionAndNoProtectionAgainstCSRFLocal.push([device, url, `Safety : ${csp_policies[i][1][30][1]}`])

                }
                break;
    
                case 'false': {
                    numberOfPagesNoProtectionAgainstCSRFLocal++;
                    numberOfPagesProtectionAndNoProtectionAgainstCSRFLocal++;
                    pagesNoProtectionAgainstCSRFLocal.push(csp_policies[i][1][32][1])
                    pagesProtectionAndNoProtectionAgainstCSRFLocal.push([device, url, `Safety : ${csp_policies[i][1][30][1]}`])
                }
                break;
    
           
            }
           
            switch(csp_policies[i][1][31][1]) { 
                case 'true': {
                 
                    checkCounter++;
                    dev_deploying_csp.push(device)
                    pagesdeployCSPWithAllUserAgents++;
                    pagesdeployAndNotDeployCSPWithAllUserAgents++;
                    pagesDeployAndNotDeploy.push([url, `${csp_policies[i][1][0][1]} hXw:${csp_policies[i][1][4][1]}x${csp_policies[i][1][5][1]}`])

                    /*console.log(csp_policies[i][1][31])
                    console.log(pageName)*/
                }
                break;
    
                case 'false': {
                    dev_not_deploying_csp.push(device)
                    pagesDoesNotdeployCSPWithAllUserAgents++;
                    pagesdeployAndNotDeployCSPWithAllUserAgents++;
                    pagesDeployAndNotDeploy.push([url, `${csp_policies[i][1][0][1]} hXw:${csp_policies[i][1][4][1]}x${csp_policies[i][1][5][1]}`])
                    /*console.log(csp_policies[i][1][31])
                    console.log(pageName)*/
                }
                break;
                default: console.log('csp deploying')
                break;

            }
        }

    
        json_comp["number of total devices"] = devices.length
        json_comp["total devices"] = devices
        json_comp["number of devices that offer safe csp"] = devices_safe_csp.length
        json_comp["devices that offer safe csp"] = devices_safe_csp
        json_comp["caus Of safe CSP"] = causeOfSafty
        json_comp["number of devices that offer unsafe csp"] = devices_notSafe_csp.length
        json_comp["devices that offer unsafe csp"] = devices_notSafe_csp
        json_comp["caus Of not safe CSP"] = causeOfNotSafty
       
        json_comp["number of devices that offer zero max age for hsts"] = arr_dev_sts_max_age_protection_classe1.length
        json_comp["devices that offer zero max age for hsts"] = arr_dev_sts_max_age_protection_classe1
        json_comp["number of devices that offer max age < 1 for hsts"] = arr_dev_sts_max_age_protection_classe2.length
        json_comp["devices that offer max age < 1 for hsts"] = arr_dev_sts_max_age_protection_classe2
        json_comp["number of devices that offer max age >= 1 for hsts"] = arr_dev_sts_max_age_protection_classe3.length
        json_comp["devices that offer max age >= 1 for hsts"] = arr_dev_sts_max_age_protection_classe3
        
        // csp header exisit ?
        json_comp["number of devices without csp header"] = dev_no_cspHeader.length
        json_comp["devices without csp header"] = dev_no_cspHeader
        json_comp["number of devices with csp header"] = dev_with_cspHeader.length
        json_comp["devices with csp header"] = dev_with_cspHeader
    
        // level of protection against ssl stripping
        json_comp["number of devices that dose not offer protection against sll stripping"] = dev_provide_no_protection_against_sslStripping_level_0.length
        json_comp["devices that dose not offer protection against sll stripping"] = dev_provide_no_protection_against_sslStripping_level_0
        json_comp["number of devices that offer protection_level_1 against sll stripping"] = dev_provide_protection_against_sslStripping_level_1.length
        json_comp["devices that offer protection_level_1 against sll stripping"] = dev_provide_protection_against_sslStripping_level_1
        json_comp["number of devices that offer protection_level_2 against sll stripping"] = dev_provide_protection_against_sslStripping_level_2.length
        json_comp["devices that offer protection_level_2 against sll stripping"] = dev_provide_protection_against_sslStripping_level_2
        json_comp["number of devices that offer protection_level_3 against sll stripping"] = dev_provide_protection_against_sslStripping_level_3.length
        json_comp["devices that offer protection_level_3 against sll stripping"] = dev_provide_protection_against_sslStripping_level_3
        json_comp["number of devices that offer protection_level_4 against sll stripping"] = dev_provide_protection_against_sslStripping_level_4.length
        json_comp["devices that offer protection_level_4 against sll stripping"] = dev_provide_protection_against_sslStripping_level_4
        
        // level of protection against clickjacking(x-fram-option)
        json_comp["number of devices that dose not offer protection against clickjacking"] = dev_provide_no_protection_against_clickjacking_level_0.length
        json_comp["devices that dose not offer protection against clickjacking"] = dev_provide_no_protection_against_clickjacking_level_0
    
        json_comp["number of devices that offer protection_level_1 against clickjacking (csp frame-ancestors)"] = dev_provide_protection_against_clickjacking_csp_level_1.length
        json_comp["devices that offer protection_level_1 against clickjacking (csp frame-ancestors)"] = dev_provide_protection_against_clickjacking_csp_level_1
        json_comp["number of devices that offer protection_level_2 against clickjacking (csp frame-ancestors)"] = dev_provide_protection_against_clickjacking_csp_level_2.length
        json_comp["devices that offer protection_level_2 against clickjacking (csp frame-ancestors)"] = dev_provide_protection_against_clickjacking_csp_level_2
        json_comp["number of devices that offer protection_level_3 against clickjacking (csp frame-ancestors)"] = dev_provide_protection_against_clickjacking_csp_level_3.length
        json_comp["devices that offer protection_level_3 against clickjacking (csp frame-ancestors)"] = dev_provide_protection_against_clickjacking_csp_level_3
    
        json_comp["number of devices that offer protection_level_1 against clickjacking (xfo)"] = dev_provide_protection_against_clickjacking_xfo_level_1.length
        json_comp["devices that offer protection_level_1 against clickjacking (xfo)"] = dev_provide_protection_against_clickjacking_xfo_level_1
        json_comp["number of devices that offer protection_level_2 against clickjacking (xfo)"] = dev_provide_protection_against_clickjacking_xfo_level_2.length
        json_comp["devices that offer protection_level_2 against clickjacking (xfo)"] = dev_provide_protection_against_clickjacking_xfo_level_2
        json_comp["number of devices that offer protection_level_3 against clickjacking (xfo)"] = dev_provide_protection_against_clickjacking_xfo_level_3.length
        json_comp["devices that offer protection_level_3 against clickjacking (xfo)"] = dev_provide_protection_against_clickjacking_xfo_level_3
       
        // protection against hijacking
        json_comp["number of devices that dose not offer protection against hijacking"] = dev_provide_no_protection_against_hijacking.length
        json_comp["devices that dose not offer protection against hijacking"] = dev_provide_no_protection_against_hijacking
        json_comp["number of devices that offer protection against hijacking"] = dev_provide_protection_against_hijacking.length
        json_comp["devices that offer protection against hijacking"] = dev_provide_protection_against_hijacking
        
        // level of protection against csrf
        json_comp["number of devices that dose not offer protection against csrf"] = dev_provide_no_protection_against_csrf_level_0.length
        json_comp["devices that dose not offer protection against csrf"] = dev_provide_no_protection_against_csrf_level_0
        json_comp["number of devices that offer protection_level_1 against csrf"] = dev_provide_protection_against_csrf_level_1.length
        json_comp["devices that offer protection_level_1 against csrf"] = dev_provide_protection_against_csrf_level_1
        json_comp["number of devices that offer protection_level_2 against csrf"] = dev_provide_protection_against_csrf_level_2.length
        json_comp["devices that offer protection_level_2 against csrf"] = dev_provide_protection_against_csrf_level_2
        
        // protection against steeling the cookies (XXS)
        json_comp["number of devices that dose not offer protection against steeling the cookies"] = dev_provide_no_protection_against_steeling_cookies.length
        json_comp["devices that dose not offer protection against steeling the cookies"] = dev_provide_no_protection_against_steeling_cookies
        json_comp["number of devices that offer protection against steeling the cookies"] = dev_provide_protection_against_steeling_cookies.length
        json_comp["devices that offer protection against steeling the cookies"] = dev_provide_protection_against_steeling_cookies
        json_comp["devices that deploy csp"] = dev_deploying_csp
        json_comp["devices that does not deploy csp"] = dev_not_deploying_csp


        //console.log(isCSPsafe)

        json_comp["visited link"] = csp_policies[0][1][csp_policies[0][1].length-1][1]
  
      
        fs.writeFileSync(`./${resultPath}/compResult_${pageName}.json`, JSON.stringify(json_comp))
        //console.log(devices)
        //console.log(devices.length)


  
        if(numberOfPagesProtectionAgainstStealingCookiesLocal === devices.length){
            //console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
            if(!pagesProtectionAgainstStealingCookies.includes(url)){
                pagesProtectionAgainstStealingCookies.push(url)
                numberOfPagesProtectionAgainstStealingCookies++;
            }

        }else if(numberOfPagesNoProtectionAgainstStealingCookiesLocal === devices.length){
            if(!pagesNoProtectionAgainstStealingCookies.includes(url)){
                pagesNoProtectionAgainstStealingCookies.push(url)
                numberOfPagesNoProtectionAgainstStealingCookies++;
            }
        }else{
            if(numberOfPagesProtectionAndNoProtectionAgainstStealingCookies > 0){
                numberOfPagesProtectionAndNoProtectionAgainstStealingCookies++;
                pagesProtectionAndNoProtectionAgainstStealingCookies
                for(var v of pagesProtectionAndNoProtectionAgainstStealingCookiesLocal){
                    pagesProtectionAndNoProtectionAgainstStealingCookies.push(v)
                }
            }
        }


        if(pagesdeployCSPWithAllUserAgents === devices.length){
            pagesDeployAndNotDeploy = new Array();
            if(!pagesdeployCSPWithAllUserAgentsArr.includes(url)){
                pagesdeployCSPWithAllUserAgentsArr.push(url)
                numberpagesdeployCSPWithAllUserAgentsArr++;
                //console.log(numberpagesdeployCSPWithAllUserAgentsArr)
            }
        }else if(pagesDoesNotdeployCSPWithAllUserAgents === devices.length){
            pagesDeployAndNotDeploy = new Array()
            if(!pagesDoesNotdeployCSPWithAllUserAgentsArr.includes(url)){
                pagesDoesNotdeployCSPWithAllUserAgentsArr.push(url)
                numberpagesDoesNotdeployCSPWithAllUserAgentsArr++;
            }
        }else{
            if(pagesdeployAndNotDeployCSPWithAllUserAgents > 0){
                for(let v of pagesDeployAndNotDeploy){
                    pagesdeployAndNotDeployCSPWithAllUserAgentArr.push(v)
                }
                
                numberpagesdeployAndNotDeployCSPWithAllUserAgentArr++;
            }
        }

        if(pagesWithSafeCSPWithAllUserAgentsNr === devices.length){
            pagesDViewPSafeAndNotSafeCSPWithDevicesInfoLocalArray = new Array()
            if(!pagesWithSafeCSPWithAllUserAgent.includes(url)){
                pagesWithSafeCSPWithAllUserAgent.push(url)
                numberOfPagesWithSafeCSPWithAllUserAgent++;
            }
        }else if(pagesWithNotSafeCSPWithAllUserAgentsNr === devices.length){
            pagesDViewPSafeAndNotSafeCSPWithDevicesInfoLocalArray = new Array()
            if(!pagesWithNotSafeCSPWithAlluserAgent.includes(url)){
                pagesWithNotSafeCSPWithAlluserAgent.push(url)
                numberOfPagesWithNotSafeCSPWithAllUserAgent++;
            }
        }else{
            if(pagesWithSafeAndNotSafeCSPWithAllUserAgentsNr > 0){
                for(let v of pagesDViewPSafeAndNotSafeCSPWithDevicesInfoLocalArray){
                    pagesWithSafeAndNotCSPWithAllUserAgent.push(v)
                }
                
                numberOfPagesWithSafeAndNotSafeCSPWithAllUserAgent++;
            }
        }



        if(numberOfPagesProtectionAgainstCSRFLocal === devices.length){
            pagesProtectionAndNoProtectionAgainstCSRFLocal = new Array()
            if(!pagesProtectionAgainstCSRF.includes(url)){
                pagesProtectionAgainstCSRF.push(url)
                numberOfPagesProtectionAgainstCSRF++;
            }
        }else if(numberOfPagesNoProtectionAgainstCSRFLocal === devices.length){
            pagesProtectionAndNoProtectionAgainstCSRFLocal = new Array()
            if(!pagesNoProtectionAgainstCSRF.includes(url)){
                pagesNoProtectionAgainstCSRF.push(url)
                numberOfPagesNoProtectionAgainstCSRF++;
            }
        }else{
            if(numberOfPagesProtectionAndNoProtectionAgainstCSRFLocal > 0){
                for(let v of pagesProtectionAndNoProtectionAgainstCSRFLocal){
                    pagesProtectionAndNoProtectionAgainstCSRF.push(v)
                }
                
                numberOfPagesProtectionAndNoProtectionAgainstCSRF++;
            }
        }
         

  

        if(numberOfPagesProtectionAgainsthijackingLocal === devices.length){
            pagesProtectionAndNoProtectionAgainsthijackingLocal = new Array()
            if(!pagesProtectionAgainsthijacking.includes(url)){
                pagesProtectionAgainsthijacking.push(url)
                numberOfPagesProtectionAgainsthijacking++;
            }
        }else if(numberOfPagesNoProtectionAgainsthijackingLocal === devices.length){
            pagesProtectionAndNoProtectionAgainsthijackingLocal = new Array()
            if(!pagesNoProtectionAgainsthijacking.includes(url)){
                pagesNoProtectionAgainsthijacking.push(url)
                numberOfPagesNoProtectionAgainsthijacking++;
            }
        }else{
            if(numberOfPagesProtectionAndNoProtectionAgainsthijackingLocal > 0){
                for(let v of pagesProtectionAndNoProtectionAgainsthijackingLocal){
                    pagesProtectionAndNoProtectionAgainsthijacking.push(v)
                }
                
                numberOfPagesProtectionAndNoProtectionAgainsthijacking++;
            }
        }


        if(numberOfPagesProtectionAgainstclickjackingLocal === devices.length){
            pagesProtectionAndNoProtectionAgainstclickjackingLocal = new Array()
            if(!pagesProtectionAgainstclickjacking.includes(url)){
                pagesProtectionAgainstclickjacking.push(url)
                numberOfPagesProtectionAgainstclickjacking++;
            }
        }else if(numberOfPagesNoProtectionAgainstclickjackingLocal === devices.length){
            pagesProtectionAndNoProtectionAgainstclickjackingLocal = new Array()
            if(!pagesNoProtectionAgainstclickjacking.includes(url)){
                pagesNoProtectionAgainstclickjacking.push(url)
                numberOfPagesNoProtectionAgainstclickjacking++;
            }
        }else{
            if(numberOfPagesProtectionAndNoProtectionAgainstclickjackingLocal > 0){
                for(let v of pagesProtectionAndNoProtectionAgainstclickjackingLocal){
                    pagesProtectionAndNoProtectionAgainstclickjacking.push(v)
                }
                
                numberOfPagesProtectionAndNoProtectionAgainstclickjacking++;
            }
        }



        if(numberOfPagesProtectionAgainstSLLStrippingLocal === devices.length){
            pagesProtectionAndNoProtectionAgainstSLLStrippingLocal = new Array()
            if(!pagesProtectionAgainstSLLStripping.includes(url)){
                pagesProtectionAgainstSLLStripping.push(url)
                numberOfPagesProtectionAgainstSLLStripping++;
            }
        }else if(numberOfPagesNoProtectionAgainstclickjackingLocal === devices.length){
            pagesProtectionAndNoProtectionAgainstSLLStrippingLocal = new Array()
            if(!pagesNoProtectionAgainstSLLStripping.includes(url)){
                pagesNoProtectionAgainstSLLStripping.push(url)
                numberOfPagesNoProtectionAgainstSLLStripping++;
            }
        }else{
            if(numberOfPagesProtectionAndNoProtectionAgainstSLLStrippingLocal > 0){
                for(let v of pagesProtectionAndNoProtectionAgainstSLLStrippingLocal){
                    pagesProtectionAndNoProtectionAgainstSLLStripping.push(v)
                }
                
                numberOfPagesProtectionAndNoProtectionAgainstSLLStripping++;
            }
        }

    }
    //console.log("dfdfdfdfdfdf")
   // devArr.pushe(2)
}


function compareViewport(pageName, comparePath, resultPath){
    const  jsonsFiles =  fs.readdirSync(comparePath).filter((filename) => path.extname(filename) === '.json');
    let deviceWithDifferentViewPortSafeCSP = 0;
    let deviceWithDifferentViewPortNotSafeCSP = 0;
    let deviceWithDifferentViewPortSafeAndNotSafeCSP = 0;
    let pagesDViewPSafeAndNotSafeCSPWithDevicesInfoLocalArray = new Array();
    let uri = "";
    console.log(devArr)
    for(var d of devArr){
        let arr = new Array()
        for(var dev of devUA){
            
            if(dev.split("_")[0] === d){
                if(!arr.includes(dev)){
                    arr.push(dev)
                }
            }
        }
        //console.log(arr)
        
        let csp_policies = new Array();
        let dev1Details = arr[0].split("_")
        let dev2Details = arr[1].split("_")

        jsonsFiles.forEach(filename => {
            let csp = new Array()
            if(filename.includes(`${pageName}.json`) && ((filename.includes(`${dev1Details[0]}_`) &&  filename.includes(dev1Details[1]) && filename.includes(dev1Details[2])) || (filename.includes(`${dev2Details[0]}_`) &&  filename.includes(dev2Details[1]) && filename.includes(dev2Details[2])))) {
                //console.log("KKKKKKKKKKKKKKKKKKKKKKKKK")
                //console.log(filename)
                const fileData = fs.readFileSync(path.join(comparePath, filename));                    
                const json_arr = JSON.parse(fileData.toString());
                let json_str = JSON.stringify(json_arr);
                json_after_split = json_str.substring(1, json_str.length - 1);
                json_after_split = json_after_split.split(/,"/)
                let check = false;
                for(var cs of csp){
                    if(cs[0] === filename.split(".json")[0].substring(4)){
                        check = true;
                    }
                }
                https://www.youtube.com
                if(!check){
                    csp.push(filename.split(".json")[0].substring(4))
                    filename_debuger = filename
                    let arr_2 = new Array();
                    //console.log("OOOOOOOOOOOOOOOOOOOO")
                    //console.log(json_after_split)
                    for (var elem of json_after_split) {
                        let header;
                        let arr_;
                        let header_value;
                        //console.log("KKKKKKKKKKKKKKKKKKKKKKK")
                        //console.log(elem)
                        if((elem.includes(":") && !elem.includes("http") && !(/.+:\/\//.test(elem)) && !(/.+:"$/.test(elem)) && !elem.includes("data")&& !elem.includes("mediastream")&& !elem.includes("blob")&& !elem.includes("filesystem")&& !elem.includes("resource")&& !elem.includes(":*")) || elem.includes("visited_Webpage") || (elem.includes("origins"))){
                            arr_ = elem.split(/":/);
                            //console.log(arr_)
                            header = delete_StrSy(arr_[0], "\"");
                            //console.log("UUUUUUUUUUUUUUUUUUUUU")
                            //console.log(arr_)
                            //console.log(arr_[1])
                            //console.log(arr_)
                            header_value = delete_StrSy(arr_[1], "\"")
                            header_value = delete_StrSy(header_value, "\\")
                            if(header === "visited_Webpage"){
                                uri = header_value;
                            }
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
                    csp.push(arr_2)
                   
                    csp_policies.push(csp)
                  
               

                    //console.log(csp)
                }
               
            }
    
        });
        //console.log("IIIIIIIIIIIIIIIIIIIIIIII")
        //console.log(csp_policies)
        if(csp_policies.length === 2){
            let deviceWithTwoVP = arr;
            //console.log(csp_policies[0][1])
            let safeCSPdev1 = csp_policies[0][1][7][1];
            //console.log(safeCSPdev1)
            //console.log(csp_policies)

            let safeCSPdev2 = csp_policies[1][1][7][1];
            let bothDevicesOfferSafeCsp = false;
            let dev1WithCsp = csp_policies[0][1][8][1];
            let dev1 = `${ csp_policies[0][1][0][1]} hXw:${ csp_policies[0][1][4][1]}X${ csp_policies[0][1][5][1]}, safeCSP: ${safeCSPdev1} }`
            let dev2 = `${ csp_policies[1][1][0][1]} hXw:${ csp_policies[1][1][4][1]}X${ csp_policies[1][1][5][1]}, safeCSP: ${safeCSPdev2} }`
            let dev2WithCsp = csp_policies[1][1][8][1];
            let whichDeviceIsWithCsp;
            let dev1Withnonce = csp_policies[0][1][13][1];
            let dev2Withnonce = csp_policies[1][1][13][1];
            let whichDeviceIsWithNonce;
            let bothDevicesWithCspHeader = false;
            let bothDevicesWithNonceValue = false;
            if(safeCSPdev1 === 'true' && safeCSPdev2 === 'true'){
                bothDevicesOfferSafeCsp = true;
            }
            if(dev1WithCsp != 'csp dose not contain script-src or default-src' && dev2WithCsp != 'csp dose not contain script-src or default-src'){
                bothDevicesWithCspHeader = true;
            }else{
                if(dev1WithCsp != 'csp dose not contain script-src or default-src'){
                    whichDeviceIsWithCsp = csp_policies[0][1][8][1];
                }
                if(dev2WithCsp != 'csp dose not contain script-src or default-src'){
                    whichDeviceIsWithCsp = csp_policies[1][1][8][1];
                }
            }
            if(dev1Withnonce === 'true' && dev2Withnonce === 'true'){
                bothDevicesWithNonceValue = true;
            }else{
                if(dev1Withnonce === 'true'){
                    whichDeviceIsWithNonce = csp_policies[0][1][13][1];
                }
                if(dev2Withnonce === 'true'){
                    whichDeviceIsWithNonce = csp_policies[1][1][13][1];
                }
            }
            let json={}
            //console.log(csp_policies[1][1])
            json["visited links"] = csp_policies[1][1][30][1];
            json["devices"] = deviceWithTwoVP
            json["both devices received safe csp"] = bothDevicesOfferSafeCsp
            json["dev 1 received safe csp"] = safeCSPdev1
            json["dev 2 received safe csp"] = safeCSPdev2
            json["both devices received csp header"] = bothDevicesWithCspHeader
            json["dev 1 received csp header"] = dev1WithCsp
            json["dev 2 received csp header"] = dev2WithCsp
            json["both devices received nonces"] = bothDevicesWithNonceValue
            json["dev 1 received nonce value"] = dev1Withnonce
            json["dev 2 received nonce value"] = dev2Withnonce
            if(bothDevicesOfferSafeCsp){
                deviceWithDifferentViewPortSafeCSP++;
            }else{
                if(safeCSPdev1 === 'false' && safeCSPdev2 === 'false'){
                    deviceWithDifferentViewPortNotSafeCSP++;
                }else{
                    deviceWithDifferentViewPortSafeAndNotSafeCSP++;
                    pagesDViewPSafeAndNotSafeCSPWithDevicesInfoLocalArray.push([uri, dev1, dev2])
                }
            }
            if(uri === "https://www.google.com"){
               // console.log(safeCSPdev1)
                //console.log(safeCSPdev2)
            }
            
            fs.writeFileSync(`./${resultPath}/compViewPort_${pageName}_${csp_policies[1][1][0][1]}.json`, JSON.stringify(json))
        }
  
    }
   
    if(deviceWithDifferentViewPortSafeCSP === devArr.length){
        pagesDViewPSafeAndNotSafeCSPWithDevicesInfoLocalArray = new Array()
        if(!pagesDViewPSafeCSP.includes(uri)){
            pagesDViewPSafeCSP.push(uri)
            numberOfPagesDViewPSafeCSP++;
        }
    }else if(deviceWithDifferentViewPortNotSafeCSP === devArr.length){
        pagesDViewPSafeAndNotSafeCSPWithDevicesInfoLocalArray = new Array()
        if(!pagesDViewPNotSafeCSP.includes(uri)){
            pagesDViewPNotSafeCSP.push(uri)
            numberOfPagesDViewPNotSafeCSP++;
        }
    }else{
        if(deviceWithDifferentViewPortSafeAndNotSafeCSP > 0){
            for(let v of pagesDViewPSafeAndNotSafeCSPWithDevicesInfoLocalArray){
                pagesDViewPSafeAndNotSafeCSPWithDevicesInfo.push(v);
            }
            numberOfPagesDViewPSafeAndNotSafeCSP++;
        }
    }
}



function removeDuplikate(arr){
    let new_Array = new Array();
    for(let i = 0; i < arr.length; i++){
        if(!new_Array.includes(arr[i])){
            new_Array.push(arr[i])
        }
    }
    return new_Array;
}

function browsershortcut(arr) {
    let out = new String();
    for(var v of arr) {
        out +=v;
    }
    return out
}

function arraysEquals(arr_1, arr_2) {
   for(var v1 of arr_1) {
    if(!arr_2.includes(v1)) {
        return false;
    }
   }
    return true;
  }                      

function get_ProtectionLevel_AgainstSLLStripping(max_age_YearValue, max_age_sts, insub_sts, preload_sts) {

    let hsts_classe = 0;
    let level_of_protection_against_SSL_Stripping = 0;
                    
    if(max_age_YearValue === 0) {
        hsts_classe = 1
    }

    if(max_age_YearValue < 1) {
        hsts_classe = 2
    }

    if(max_age_YearValue >= 1) {
        hsts_classe = 3
    }

    if(max_age_sts && !insub_sts && !preload_sts) {
        level_of_protection_against_SSL_Stripping = 1;
    }

    if((max_age_sts && insub_sts && !preload_sts) || (!max_age_sts && insub_sts && !preload_sts)) {
        level_of_protection_against_SSL_Stripping = 2;
    }

    if((max_age_sts && !insub_sts && preload_sts) || (!max_age_sts && !insub_sts && preload_sts)) {
        level_of_protection_against_SSL_Stripping = 3;
    }

    if(max_age_sts && insub_sts && preload_sts) {
        level_of_protection_against_SSL_Stripping = 4;
    }
    return [hsts_classe, level_of_protection_against_SSL_Stripping]
}

function get_ProtectionLevel_AgainstClickjacking(xfo, arr) {
    // no protection level (default)
    let level = 0;
    // if csp contains the directive "frame-ancestors"
    if(xfo === "frame-ancestors") {
        if (arr.length === 1 && arr[0] === "'none'") {
            level = 3;
        }
        if (arr.length === 1 && arr[0] === "'self'") {
            level = 2;
        }
        if (arr.length > 1) {
            level = 1;
        }
    } 
        // if csp dose not contains the directive "frame-ancestors" and the header x-frame-option exisit
    else {
     // level in case xfo value is ALLOW-FROM uri
        level = 1;
        if(xfo.includes('DENY') || xfo.includes('deny')){
            level = 3; 
        }else if(xfo.includes('SAMEORIGIN') || xfo.includes('sameorigin')){
            level = 2; 
        }else{
            //console.log("xfo value is ALLOW-FROM or something that is not defined/Supported")
            //console.log(xfo)

        }
       
    }
   

    return level;
}


function getDirectives_content_secuirty_policy(arr, header) {
    let arr_= new Array()
    for (var elem of arr) {
        let arr = new Array();
        if (elem[0] === `${header}`){
            /*if(header === "set-cookie"){
                console.log("LLLLLLLOOOOOOOKKKKKKKKKK")
            }*/
            arr = elem[1].split(";")
            if(header === "strict-transport-security") {
                return arr;
            }
            //console.log("shooof")
            //console.log(arr)
            for(var v of arr) {
                if(v.indexOf(' ') === 0) {
                    v = v.substring(1,v.length)
                }
                arr_.push(v.split(" ")[0])
            }
        }
    }
    return arr_;
}

function getDirective_Sources(arr, directive) {
	let directive_arr = new Array();
	let output = new Array();
	for(var h of arr) {
		if(h[0].includes("content-security-policy")) {
            let arr_ = h[1].split(";");
            for(var v of arr_) {
                if(v.indexOf(' ') === 0) {
                    v = v.substring(1,v.length)
                }
                directive_arr = v.split(" ");
                if(directive_arr[0] === directive) {
                    for (let i = 1; i < directive_arr.length; i++) {
                        output.push(directive_arr[i])
                    }
                }
            }
		}
	}
    return output;
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

  function compareHomeWithSubpages(pageName, comparePath, resultPath, devicesList){
    //console.log(pageName)
    const  jsonsFiles =  fs.readdirSync(comparePath).filter((filename) => path.extname(filename) === '.json');

    //console.log(jsonsFiles)
    let csp_policies = new Array();
    jsonsFiles.forEach(filename => {
        let csp = new Array()
        if(filename.includes(`${pageName}.json`) || filename.includes(`${pageName}§`)) {
            //console.log(filename)
            const fileData = fs.readFileSync(path.join(comparePath, filename));                    
            const json_arr = JSON.parse(fileData.toString());
            let json_str = JSON.stringify(json_arr);
            json_after_split = json_str.substring(1, json_str.length - 1);
            json_after_split = json_after_split.split(/,"/)
            //let dev = `${json_after_split[0].split(":")[1].replaceAll("\"","")}_${json_after_split[4].split(":")[1].replaceAll("\"","")}_${json_after_split[5].split(":")[1].replaceAll("\"","")}`
            //if(devices.includes(dev))
            csp.push(filename.split(".json")[0].substring(4))
            filename_debuger = filename
            let arr_2 = new Array();
            //console.log(json_after_split)
            //console.log(json_after_split)
            for (var elem of json_after_split) {
                let header;
                let arr_;
                let header_value;
                //&& !elem.includes(devUA)
                //console.log(elem)
                if(elem.includes("total devices:")){
                    devArr.pushe(2)
                }
                if((elem.includes("\":") && !elem.includes("http")) || elem.includes("visited link") || (elem.includes("total devices:"))){
                    arr_ = elem.split(/":/);
                    //console.log(arr_)
                    header = arr_[0]
                    header_value = arr_[1]
                    header = delete_StrSy(arr_[0], "\"");
                    header_value = delete_StrSy(arr_[1], "\"")
                    //header_value = delete_StrSy(header_value, "\\")
                    arr_2.push([header, header_value])
                }else{
                    elem = elem.replaceAll("\"", "")
                    //console.log(elem)
                    //console.log(arr_2)
                    if(elem.endsWith(" ")){
                        arr_2[arr_2.length-1][1] = arr_2[arr_2.length-1][1] +","+ elem
                    }else{
                        arr_2[arr_2.length-1][1] = arr_2[arr_2.length-1][1] + ", " + elem
                    }
                    //console.log("Watchccccccccccccccccccccccccccccccccc")
                    //console.log( arr_2[arr_2.length-1][1])
                }
            }

            csp.push(arr_2)
           
            csp_policies.push(csp)
            //console.log(csp)
        }

    });
    //console.log(pageName)
    //console.log("PPPPPPPPPPPPPPPPPPPPPPPPPP")
    console.log(csp_policies)
    console.log(csp_policies.length)
    console.log("PPPPPPPPPPPPPPPPPPPPPPPPPP")
    let devices = new Array();
    let homePage_Security = false;
    let homePage_Security_arr = new Array()
    let homePage_Security_arr_NotSafe = new Array();
    let homePage_CSPHeaderisThere = false;
    let homePage_CSPHeaderisThere_arr = new Array()
    let homePage_CSPHeaderisThere_arr_NoCSPHeader = new Array()
    
    let subPages_Security = 0;
    let subPages_Security_arr = new Array();
    let subPages_Security_arr_NotSafe = new Array();
    let subPages_cspHeader = 0;
    let subPages_cspHeader_arr = new Array();
    let subPages_cspHeader_arr_NoCSPHeader = new Array();

    //console.log("JJJJJJJJJJJJJJJJJJJ")
    //console.log(pageName)
    //console.log(csp_policies[0])
    let urls = new Array()
    let numberOfSubPages = csp_policies.length-1
    for(let i = 0; i < csp_policies.length; i++){
        //console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ")
        //console.log(csp_policies[i])
        //console.log(csp_policies[i][1][1][1])

        let dev = csp_policies[i][1][1][1];
        let dev_ = dev.replace("[", "")
        dev_ = dev_.replace("]", "")
        let dev_arr = dev_.split(", ")
        //console.log(dev_arr)

        //console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ")
        //console.log(dev_arr)
        for(var d of dev_arr){
            let dArr = d.split(" operating")[0]
            let info = dArr.split(" height:")
            let devName = info[0]
            let vp =info[1]
            //console.log(vp)
            //console.log(d)
            let h = vp.split(" width:")[0]
            let w = vp.split(" width:")[1]
            let devDet = devName+"_"+h+"_"+w
            if(!devices.includes(devDet)){
                devices.push(devDet)
            }
        }
        //console.log(devices)

        if(i === 0){
            urls.push( csp_policies[i][1][csp_policies[i][1].length-1][1])
      
            let homePage_Check = parseInt(csp_policies[0][1][2][1]) 
            let homePage_cspHeader = parseInt(csp_policies[0][1][14][1])
            //console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
            //console.log(homePage_Check)
           
            //console.log(homePage_cspHeader)
            if(homePage_Check > 0){
                homePage_Security = true;
                let dev = csp_policies[i][1][3][1];
                let dev_ = dev.replace("[", "")
                dev_ = dev_.replace("]", "")
                let dev_arr = dev_.split(", ")
                for(var d of dev_arr){
                    let dArr = d.split(" operating")[0]
                    let info = dArr.split(" height:")
                    let devName = info[0]
                    let vp =info[1]
                    //console.log(vp)
                    let h = vp.split(" width:")[0]
                    let w = vp.split(" width:")[1]
                    let devDet = devName+"_"+h+"_"+w
                    if(!homePage_Security_arr.includes(devDet)){
                        homePage_Security_arr.push(devDet)
                    }
                }
                for(var d of devices){
                    if(!homePage_Security_arr.includes(d)){
                        if(!homePage_Security_arr_NotSafe.includes(d)){
                            homePage_Security_arr_NotSafe.push(d)
                        }
                    }
                }
                
            }else{
                
                homePage_Security_arr_NotSafe = devices;
            }
            if(homePage_cspHeader > 0){
                homePage_CSPHeaderisThere = true;
                let dev = csp_policies[i][1][15][1];
                let dev_ = dev.replace("[", "")
                dev_ = dev_.replace("]", "")
                let dev_arr = dev_.split(", ")
                for(var d of dev_arr){
                    let dArr = d.split(" operating")[0]
                    let info = dArr.split(" height:")
                    let devName = info[0]
                    let vp =info[1]
                    //console.log(vp)
                    let h = vp.split(" width:")[0]
                    let w = vp.split(" width:")[1]
                    let devDet = devName+"_"+h+"_"+w
                    if(!homePage_CSPHeaderisThere_arr.includes(devDet)){
                        homePage_CSPHeaderisThere_arr.push(devDet)
                    }
                }
                for(var d of devices){
                    if(!homePage_CSPHeaderisThere_arr.includes(d)){
                        if(!homePage_CSPHeaderisThere_arr_NoCSPHeader.includes(d)){
                            homePage_CSPHeaderisThere_arr_NoCSPHeader.push(d)
                        }
                    }
                }
            }else{
                homePage_CSPHeaderisThere_arr_NoCSPHeader = devices
            }
            console.log(csp_policies[0][1][2])
            console.log(homePage_Check)
            console.log(csp_policies[0][1][14])
            console.log(homePage_cspHeader)
            console.log(homePage_Security_arr)
            console.log(homePage_Security_arr_NotSafe)
            console.log(homePage_CSPHeaderisThere_arr)
            console.log(homePage_CSPHeaderisThere_arr_NoCSPHeader)
            csp_policies.pushe(2)

        }else{
            //console.log("KKKKKKKKKKKKKKKKKKKKKKKKKK")
            //console.log(i)
            //console.log(csp_policies[i])
            //console.log(devices)
            /*console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
            console.log(homePage_Security)
            console.log(homePage_Security_arr)        
            console.log(homePage_Security_arr_NotSafe)
            console.log(homePage_CSPHeaderisThere)
            console.log(homePage_CSPHeaderisThere_arr)
            console.log(homePage_CSPHeaderisThere_arr_NoCSPHeader)
            console.log(csp_policies[i])*/
            let url = csp_policies[i][1][csp_policies[i][1].length-1][1]
            urls.push(url)
            //devArr.pushe(2)
            //console.log(csp_policies[i][1][2][1])
            if(parseInt(csp_policies[i][1][2][1]) > 0 && (i > 0)){
                //console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP")
                subPages_Security++;
                let dev = csp_policies[i][1][3][1];
                let dev_ = dev.replace("[", "")
                dev_ = dev_.replace("]", "")
                let dev_arr = dev_.split(", ")
                for(var d of dev_arr){
                    let dArr = d.split(" operating")[0]
                    let info = dArr.split(" height:")
                    let devName = info[0]
                    let vp =info[1]
                    //console.log(vp)
                    let h = vp.split(" width:")[0]
                    let w = vp.split(" width:")[1]
                    let devDet = devName+"_"+h+"_"+w
                    if(!subPages_Security_arr.includes(`${devDet}, url:${url}`)){
                        subPages_Security_arr.push(`${devDet}, url:${url}`)
                    }
                }
                //console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
                //console.log(devices)
                //console.log(subPages_Security_arr)
                //console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP")
                //console.log(subPages_Security_arr_NotSafe)
                for(var d of devices){
                    if(!subPages_Security_arr.includes(`${d}, url:${url}`)){
                        if(!subPages_Security_arr_NotSafe.includes(`${d}, url:${url}`)){
                            subPages_Security_arr_NotSafe.push(`${d}, url:${url}`)
                        }
                    }
                }
                

            }else{
                for(var d of devices){
                    subPages_Security_arr_NotSafe.push(`${d}, url:${url}`)
                }
            }
            //console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU")
            //console.log(subPages_Security_arr_NotSafe)


            if(parseInt(csp_policies[i][1][14][1]) > 0 && (i > 0)){
                subPages_cspHeader++;
                
                let dev = csp_policies[i][1][15][1];
                let dev_ = dev.replace("[", "")
                dev_ = dev_.replace("]", "")
                let dev_arr = dev_.split(", ")
                for(var d of dev_arr){
                    let dArr = d.split(" operating")[0]
                    let info = dArr.split(" height:")
                    let devName = info[0]
                    let vp =info[1]
                    //console.log(vp)
                    let h = vp.split(" width:")[0]
                    let w = vp.split(" width:")[1]
                    let devDet = devName+"_"+h+"_"+w
                    if(!subPages_cspHeader_arr.includes(`${d}, url:${url}`)){
                        subPages_cspHeader_arr.push(`${d}, url:${url}`)
                    }
                }
                for(var d of devices){
                    if(!subPages_cspHeader_arr.includes(`${d}, url:${url}`)){
                        if(!subPages_cspHeader_arr_NoCSPHeader.includes(`${d}, url:${url}`)){
                            subPages_cspHeader_arr_NoCSPHeader.push(`${d}, url:${url}`)
                        }
                    }
                }
            }else{
                for(var d of devices){
                    subPages_cspHeader_arr_NoCSPHeader.push(`${d}, url:${url}`)
                }
            }
            //console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM")
            //console.log(subPages_cspHeader_arr_NoCSPHeader)
            //devArr.pushe(2)

            //console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
        }
       

    }
    let subPages_SecurityNotSafe = numberOfSubPages - subPages_Security;
    let subPages_withoutcspHeader = numberOfSubPages - subPages_cspHeader;
    let json_comp = {};
  
    json_comp["Total devices"] = devices
    json_comp["Homepage with safe csp"] = homePage_Security
    json_comp["Homepage with safe csp using following devices"] = homePage_Security_arr
    json_comp["Homepage with not safe csp using following devices"] = homePage_Security_arr_NotSafe
    json_comp["Subpages with safe csp"] = `${subPages_Security} are with safe csp`
    json_comp["Subpages with safe csp using following devices"] = subPages_Security_arr
    json_comp["Subpages with not safe csp"] = `${subPages_SecurityNotSafe} are with not safe csp`
    json_comp["Subpages with not safe csp using following devices"] = subPages_Security_arr_NotSafe
    json_comp["Homepage with csp header"] = homePage_CSPHeaderisThere
    json_comp["Homepage with csp header using following devices"] = homePage_CSPHeaderisThere_arr
    json_comp["Homepage without csp header using following devices"] = homePage_CSPHeaderisThere_arr_NoCSPHeader
    json_comp["Subpages with csp header"] = subPages_cspHeader
    json_comp["Subpages without csp header"] = subPages_withoutcspHeader
    json_comp["Subpages with csp header using following devices"] = subPages_cspHeader_arr
    json_comp["Subpages without csp header using following devices"] = subPages_cspHeader_arr_NoCSPHeader
    fs.writeFileSync(`./${resultPath}/compResult_${pageName}.json`, JSON.stringify(json_comp))

    

    if(homePage_Security && (subPages_SecurityNotSafe === 0) && (numberOfSubPages*devicesList.length === subPages_Security)){
        HomeSubpagesWithSafeAndNotSafeCSPForAllUserAgent = new Array();
        if(!HomeSubpagesWithSafeCSPForAllUserAgent.includes(uri)){
            numberOfHomeSubpagesWithSafeCSPForAllUserAgent++;
            HomeSubpagesWithSafeCSPForAllUserAgent.push(urls)
        }
    }else if ((!homePage_Security) && (subPages_Security === 0) && (subPages_SecurityNotSafe === numberOfSubPages*devicesList.length) ){
        HomeSubpagesWithSafeAndNotSafeCSPForAllUserAgent = new Array()
        if(!HomeSubpagesWithNotSafeCSPForAllUserAgent.includes(uri)){
            HomeSubpagesWithNotSafeCSPForAllUserAgent.push(urls)
            numberOfHomeSubpagesWithNotSafeCSPForAllUserAgent++;
        }
    }else{
        numberOfHomeSubpagesWithSafeAndNotSafeCSPForAllUserAgent++;
        HomeSubpagesWithSafeAndNotSafeCSPForAllUserAgent.push(["HomePage", `Safe CSP: ${homePage_Security_arr}`, `Safe CSP: ${homePage_Security_arr_NotSafe}`, "Subpages", `Safe CSP: ${subPages_Security_arr}`, `Safe CSP: ${subPages_Security_arr_NotSafe}`])
    }
    //console.log("Endddddddddddddddddddddddddddddddddddd")
    //devArr.pushe(2)



    //console.log(homePage_Security)
    //console.log(subPages_Security)
    

}

