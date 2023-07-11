const fs = require('fs');
const playwright = require('@playwright/test')
const readline = require("readline");
const { Console } = require('console');
const path = require('path');

writeFiles("./tests/urls", [""])
let input_arr = new Array();
var usedBrowserToTest = new Array();;
var acceptLanguage = "";
const fileNames = process.argv.splice(2);
console.log(fileNames)
let option = new Array();
let geo = new Array();
for(var fileName of fileNames) {
    if(fileName.endsWith("json") || fileName.endsWith("txt")) {
            if (fileName.endsWith('.json')) {
                const input = JSON.parse(fs.readFileSync(fileName, 'utf-8').toString());
                let json_str = JSON.stringify(input);
                json_after_split = json_str.substring(9, json_str.length - 2);
                json_after_split = json_after_split.split(",")
                for(var v of json_after_split) {
                    v = v.substring(1, v.length-1)
                    v = v.split(":")[1]
                    v = v.substring(1, v.length-1)
                    input_arr.push(v)
    
                }
            } else if(fileName.endsWith(".txt")) {
                const input = fs.readFileSync(fileName, 'utf-8')
                const txt_arr = input.split(/\r?\n/);
                for(var t of txt_arr) {
                    input_arr.push(t)
                }
            }
    }

   if(!fileName.endsWith(".net") && (fileName.includes(".")) && (!fileName.endsWith(".txt"))) {
        input_arr.push(fileName)
    }

    if(fileName === 'a' || fileName === 'A') {
        option.push("Android")
    }
    if(fileName === 'i' || fileName === 'I') {
        option.push("iOS")
    }
    if(fileName === 'd' || fileName === 'D') {
        option.push("Windows")
        option.push("Mac OS")
    }
    if(fileName === 'ai' || fileName === 'aI' || fileName === 'Ai' || fileName === 'AI' || fileName === 'ia' || fileName === 'Ia' || fileName === 'iA' || fileName === 'IA') {
        option.push("Android")
        option.push("iOS")
    }
    if(fileName === 'ad' || fileName === 'aD' || fileName === 'Ad' || fileName === 'AD' || fileName === 'da' || fileName === 'Da' || fileName === 'dA' || fileName === 'DA') {
        option.push("Android")
        option.push("Windows")
        option.push("Mac OS")
    }
    if(fileName === 'id' || fileName === 'iD' || fileName === 'Id' || fileName === 'ID' || fileName === 'di' || fileName === 'Di' || fileName === 'dI' || fileName === 'DI') {
        option.push("iOS")
        option.push("Windows")
        option.push("Mac OS")
    }
    if(fileName === 'all' || fileName === 'All' || fileName === 'ALL') {
        option.push("Android")
        option.push("iOS")
        option.push("Windows")
        option.push("Mac OS")
    }
    if(fileName === 'c' || fileName === 'C') {
        usedBrowserToTest.push("Chrome")
    }
    if(fileName === 'w' || fileName === 'W') {
        usedBrowserToTest.push("WebKit")
        usedBrowserToTest.push("Mobile Safari")
        usedBrowserToTest.push("Safari")
    }
    if(fileName === 'f' || fileName === 'F') {
        usedBrowserToTest.push("Firefox")
    }
    if(fileName === 'cw' || fileName === 'Cw' || fileName === 'CW' || fileName === 'cW' || fileName === 'wc' || fileName === ' wC' || fileName === 'WC' || fileName === 'Wc') {
        usedBrowserToTest.push("Chrome")
        usedBrowserToTest.push("Edge")
        usedBrowserToTest.push("WebKit")
        usedBrowserToTest.push("Mobile Safari")
        usedBrowserToTest.push("Safari")
    }
    if(fileName === 'fw' || fileName === 'Fw' || fileName === 'FW' || fileName === 'fW' || fileName === 'wf' || fileName === 'wF' || fileName === 'WF' || fileName === 'Wf') {
        usedBrowserToTest.push("WebKit")
		usedBrowserToTest.push("Firefox")
        usedBrowserToTest.push("Mobile Safari")
        usedBrowserToTest.push("Safari")
    }
    if(fileName === 'cf' || fileName === 'Cf' || fileName === 'CF' || fileName === 'cF' || fileName === 'fc' || fileName === 'fC' || fileName === 'FC' || fileName === 'Fc') {
        usedBrowserToTest.push("Chrome")
        usedBrowserToTest.push("Edge")
        usedBrowserToTest.push("Firefox")

    }
    if(fileName === 'b' || fileName === 'B') {
        usedBrowserToTest.push("Chrome")
        usedBrowserToTest.push("Edge")
        usedBrowserToTest.push("WebKit")
        usedBrowserToTest.push("Mobile Safari")
        usedBrowserToTest.push("Safari")
        usedBrowserToTest.push("Firefox")
    } 
    if(fileName === 'hi-IN' || fileName === 'nl-BE' || fileName === 'ar-SA' || fileName === 'ar-IQ' || fileName === 'ar-EG' || fileName === 'fr-CH' || fileName === 'en-US' || fileName === 'de-DE' || fileName === 'ru-RU' || fileName === 'en-GB' || fileName === 'fr-FR' 
    || fileName === 'ab-YZ' || fileName === 'AR;q=10'){
        acceptLanguage = fileName
        if (acceptLanguage.length === 0){
            option.push("de-DE")
        }else {
            option.push(acceptLanguage)
        }
        
    }
    if(hasNumber(fileName) && fileName.includes("lat")){
        geo.push(fileName.substring(3))
    } 

    if(hasNumber(fileName) && fileName.includes("lon")){
        geo.push(fileName.substring(3))
    } 
    
    if(fileName.includes("uaOption")){
        let choice = fileName.split("uaOption")[1]
        geo.push(choice)
        if(choice != "1"){
            usedBrowserToTest = new Array();
            usedBrowserToTest.push("Chrome")
            usedBrowserToTest.push("Firefox")
            usedBrowserToTest.push("WebKit")
        }
     

    }
   

    //ToDo the rest
}


var index = 0
var index_ = 0
var urlIsThere = false
var index_url = 0
var paths = new Array();
console.log("IIIIIIIIIIIII")
console.log(input_arr)
var urls = new Array();
console.log(input_arr.length)

writeFiles("./tests/urls", input_arr)
writeFiles("./tests/browserToTest", usedBrowserToTest)
writeFiles("./tests/option", option)
writeFiles("./tests/geo", geo)

function writeFiles(path, array) {
    let content = new String()
    for(var inp of array) {
        console.log(inp)
        if (array.length > 1) {
            if(inp === array[array.length-1]) {
                content += inp;
            } else {
                content += inp + "\n";
            }
        } else {
            content = inp;
        }
     
    
    }
    
    fs.writeFile(path, content, function (err){
        if (err) {
            console.log(err);
        } else {
            console.log("File saved");
        }
    });
}

function hasNumber(str) {
    return /[0-9]/.test(str);
  }
  
