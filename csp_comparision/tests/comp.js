//const { colorSets } = require('canvasjs/src/constants/themes');
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
// change
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
var folder = `./cspHeaders-${acceptLanguage}-${dir}`
var folder2 = `./compare-${acceptLanguage}-${dir}`
var folder3 = `./nonceValue-${acceptLanguage}-${dir}`
var resultFolder = `./comparePagesWithDevices-${acceptLanguage}-${dir}`
var resultFolder2 = `./compareHomeWithSubpages-${acceptLanguage}-${dir}`

const jsonsInDir =  fs.readdirSync(folder);
//console.log(`./cspHeaders-${acceptLanguage}-${dir}`)
//console.log(jsonsInDir)

var uri = fs.readFileSync("./tests/urls", 'utf-8').split(/\r?\n/);
uri.pop()
uri.pop()
var permission = true;
const compare_option = process.argv.splice(2);
// console.log(compare_option)
let filename_debuger;

let devices_offerd_safe_csp = new Array();
let devices_offerd_unsafe_csp = new Array();
if (compare_option.length === 0 || compare_option.length > 1 || (compare_option.length===0 && (compare_option[0] != "alluri" && (!uri.includes(compare_option[o]))))) {
    
    console.log("\nPlease read the following instructions:\n")
    console.log("If you want to compare results for one uri then plesae write the following command:\n")
    console.log("node ./tests/comp.js uri\n")
    console.log(`valid uris => ${uri}`)
    console.log("\n")
    console.log("If you want to compare all results of all given uris then please write the following command:\n")
    console.log("node ./tests/comp.js alluris\n")
    var permission = false;

} else if (compare_option.length === 1 && uri.includes(compare_option[0])) {
    
    console.log("dfdfddfdf")
    let page = compare_option[0]
    uri = new Array();
    uri.push(page)
    console.log(uri)
}
let web = new Array();
for(var u of uri){
    u = u.split(".")[0]
    web.push(u)
}
/*jsonsInDir.forEach(filename => {
    if(filename.includes("csp")){
        web.push(filename)
    }
});*/
let websites = new Array();
let check;
if(permission) {
    let allDeveices = new Array();
    let allBrowsers = new Array();
    let SB = new Array();
    let NSB = new Array();
    let links = new Array();
    for(var u of web) {
        if(1){
            let page_name;
            page_name = u.split(".json")[0].split("_")
            //console.log(page_name)
            page_name = page_name[page_name.length-1]
            var csp_policies = new Array();
            let viewport_res = new Array();
            jsonsInDir.forEach(filename => {
                if(filename === u || filename.includes(`${u}§`) ) {
                    const files =  fs.readdirSync(`./${folder}/${filename}`);
                    var csp = new Array();
                    files.forEach(fileN => {
                        //console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
                        //console.log(fileN)
                       
                        const fileData = fs.readFileSync(path.join(`./${folder}/${filename}/`, fileN));                   
                        const json_arr = JSON.parse(fileData.toString());
                        let json_str = JSON.stringify(json_arr);
                        json_after_split = json_str.substring(1, json_str.length - 1);
                        json_after_split = json_after_split.split(/,"/)
                        //csp.push()
                        check = fileN.split(".json")[0].substring(4)
                        filename_debuger = filename
                        let arr_2 = new Array();
                        for (var elem of json_after_split) {
                            let arr_ = elem.split(/:"/);
                            let header = delete_StrSy(arr_[0], "\"");
                            let header_value = delete_StrSy(arr_[1], "\"")
                            header_value = delete_StrSy(header_value, "\\")
                    
                            arr_2.push([header, header_value])
                            
                        }
                        
    
                        /*if(!links.includes(arr_2[arr_2.length-1][1])){
                            csp.push(arr_2)
                            csp_policies.push(csp)
                            links.push(arr_2[arr_2.length-1][1])
                        }*/
                        csp.push([fileN.split(".json")[0].substring(4),arr_2])
                        csp_policies.push(csp)
                        //console.log(csp)
                        
                    });
                    //console.log("PPPPPPPPPPPPPPPPPPPPP")
                    //console.log(csp)
                    /**/
                }
            });
            //console.log(csp_policies.length)
            //console.log("UUUUUUUUUUUUUUUUUUUUUUU")
            //console.log(csp_policies)
            //console.log(csp_policies.length)
            let uriPageName;
    
            if(csp_policies.length > 0) {
                let csp_safe = new Array();
                for(let i = 0; i < csp_policies.length; i++) {
                    let arr = csp_policies[i];
                    for(let i = 0; i < arr.length; i++){
                        page_name = arr[i][0].split("_")
                        page_name = page_name[page_name.length-1]
                        let details = arr[i][0].split("_");

                        uriPageName = arr[i][1][arr[i][1].length-1][1]
                        if(page_name === "google"){
                            //console.log(arr[i])
                            //console.log(uriPageName)
                        }
                        if(!web.includes(page_name)){
                            web.push(page_name)
                        }
                   
                       
                        //console.log("PAGE NAME")
                        //console.log(page_name)
                        //console.log("UUUUUUUUUUUUUUUUUUUUUUUU")
                        //console.log(arr)
                        for(let hdr of arr[i][1]){
                            
                            if(hdr[0] === "content-security-policy"){
                                //console.log("JJJJJJJJJJJJJJJ")
                                //console.log(arr[0])
                                //console.log(hdr[1])
                                hdr[1] = hdr[1].replace("nscript-src", ";script-src")
                                hdr[1] = hdr[1].replace("ndefault-src", ";default-src")
                                hdr[1] = hdr[1].replace("nscript-src-elem", ";script-src-elem")
    
                                //console.log(hdr[1])
    
                            }
                        }
                        let csp_dir = getDirectives_content_secuirty_policy(arr[i][1], "content-security-policy")
                        let sts = getDirectives_content_secuirty_policy(arr[i][1], "strict-transport-security")
                        let xfo = getDirectives_content_secuirty_policy(arr[i][1], "x-frame-options")
                        let set_cookie = getDirectives_content_secuirty_policy(arr[i][1], "set-cookie")
                       
                        
    
    
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
                        if (csp_dir.includes("frame-ancestors")) {
                            frame_ancestors_flage = true;
                            frame_ancestors = getDirective_Sources(arr[i][1], "frame-ancestors")
                            protectionClickJacking_value_Class.push("csp frame-ancestors")
                            protectionClickJacking_value_Class.push(get_ProtectionLevel_AgainstClickjacking("frame-ancestors", frame_ancestors));
                        } else {
                            if(xfo.length === 1) {
                                xfo_flage = true;
                                protectionClickJacking_value_Class.push(`x-farm-option ${xfo}`)
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
                        
                        let source = new Array();
                        let directive = "csp dose not contain script-srcc or default-src";
                        let flage = false;
                        let script_elem_falge = false;
                        let script_flage = false;
                        let default_flage = false;
                        if(csp_dir.length != 0){
                            
                        }
                        if (csp_dir.includes("script-src-elem")) {
                            directive = "script-src-elem"
                            source = getDirective_Sources(arr[i][1], "script-src-elem")
                            //console.log(source)
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
                            source = getDirective_Sources(arr[i][1], "script-src")
                            //console.log(source)
                            flage = true;
                            script_flage = true;
                            if(csp_dir.includes("default-src")) {
                                default_flage = true;
                            }
                        } else if (csp_dir.includes("default-src")) {
                            directive = "default-src"
                            source = getDirective_Sources(arr[i][1], "default-src")
                            flage = true;
                            default_flage = true;
                        }
                    
                        let nonce_flage = false;
                        let hash_flage = false;
                        let eval_flage = false;
                        let inline_flage = false;
                        let protocol_flage = false;
                        let wildcard_flage = false;
                        let strictD_flage = false;
                        let data_flage = false;
                
                        if(flage) {
                            for (var v of source) { 
                    
                                if(v.includes("nonce")) {
                                  
                                    nonce_flage = true;
                                    //console.log(source)
                                    //console.log(arr[0])
                                    //console.log(v)
                                    let options = arr[i][0].split("_")
                                    //console.log(options)
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
                                   
                                    //console.log("NNNNNNOOOOOOOONNNNNNNNNNNCCCCCCEEEEEEEEEEEE")
                                    //console.log(nonceValue)
                                    //console.log("ZZZZZZZZZZZZZZZZZZZ")
                                    //console.log(arr[0])
                                    //console.log(uriPageName)
                                    //console.log(nonceValue);
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
                                    if(!fs.existsSync(folder3)){
                                        fs.mkdirSync(path.join("./", folder3));
                                    }
                                    fs.writeFileSync(`${folder3}/${fileName}.json`, JSON.stringify(json_nonce))
    
                            
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
    
                    
                        let safe_flage = false;
                        if(script_flage === true || default_flage === true || script_elem_falge === true) {
                            if (  ((nonce_flage === true || hash_flage === true) && (wildcard_flage === false && protocol_flage === false)) || ((nonce_flage === false || hash_flage === false) && (inline_flage === false) && (protocol_flage === false) && (wildcard_flage === false) ) ||  ( strictD_flage === true && (nonce_flage === true || hash_flage === true)) ||  (nonce_flage === true || hash_flage === true))  {
                                safe_flage = true;
                            }
                        }
                        //console.log(safe_flage)
                    
                        
                        //console.log("DDDDDDDDDDEEEEEEETTTTTTTTAAAAAAILLLLLLLLLLSSSSS")
                        //console.log(details)
                        csp_safe.push([["device model", details[0]],["browser name", details[1]],["browser version", details[2]],["os", details[3]],["viewport-height", details[4]],["viewport-width", details[5]], ["origins", source], ["safe csp", safe_flage], ["directive to check", directive], ["script-src", script_flage], ["default-src", default_flage], ["'unsafe-inline'", inline_flage], ["'unsafe-eval'", eval_flage], ["nonce", nonce_flage], ["hash", hash_flage], ["strict-dynamic", strictD_flage], ["wildcard*", wildcard_flage], ["protocol", protocol_flage], ["data", data_flage], ["sts_max_age", max_age_sts], ["sts_max_age_year_protection", max_age_YearValue] , ["sts_includeSD", insub_sts], ["sts_preload", preload_sts], ["hsts classe", hsts_classe], ["protection level against sll stripping", level_of_protection_against_SSL_Stripping], ["protection against clickjacking provided by", protectionClickJacking_value_Class[0]], ["protection-level against clickjacking", protectionClickJacking_value_Class[1]], ["protection against hijacking", protection_against_hijacking], ["protection against csrf", protection_against_csrf_flage], ["protection level against csrf", protection_against_csrf], ["protection against steeling cookies", httponly_flage], ["visited_Webpage", uriPageName]])
                        let fileName = `csp_${details[0]}_${details[1]}_${details[2]}_${details[3]}_${details[4]}_${details[5]}_${page_name}.json`
                        
                        //console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
                        //console.log(details)
                        let json = {};
                        let arr_comp = [["device model", details[0]],["browser name", details[1]],["browser version", details[2]],["os", details[3]],["viewport-height", details[4]],["viewport-width", details[5]], ["origins", source], ["safe csp", safe_flage], ["directive to check", directive], ["script-src", script_flage], ["default-src", default_flage], ["'unsafe-inline'", inline_flage], ["'unsafe-eval'", eval_flage], ["nonce", nonce_flage], ["hash", hash_flage], ["strict-dynamic", strictD_flage], ["wildcard*", wildcard_flage], ["protocol", protocol_flage], ["data", data_flage], ["sts_max_age", max_age_sts], ["sts_max_age_year_protection", max_age_YearValue] , ["sts_includeSD", insub_sts], ["sts_preload", preload_sts], ["hsts classe", hsts_classe], ["protection level against sll stripping", level_of_protection_against_SSL_Stripping], ["protection against clickjacking provided by", protectionClickJacking_value_Class[0]], ["protection-level against clickjacking", protectionClickJacking_value_Class[1]], ["protection against hijacking", protection_against_hijacking], ["protection against csrf", protection_against_csrf_flage], ["protection level against csrf", protection_against_csrf], ["protection against steeling cookies", httponly_flage], ["visited_Webpage", uriPageName]]
                        for(let j = 0; j < arr_comp.length; j++) {
                            let key = arr_comp[j][0]
                            let value = arr_comp[j][1];
                            json[key] = value;
                        } 
                        if(!fs.existsSync(folder2)){
                            fs.mkdirSync(path.join("./", folder2));
                        }
                        fs.writeFileSync(`${folder2}/${fileName}`, JSON.stringify(json))
                    }
                    //console.log(csp_policies.length)
                    //console.log(arr)
                   
                }
                
                // *******************************************************************************************************************************************************
                // Viewport-similarity tests
                /*
                let viewport_arr = new Array();
                let num_dev_viewport = 0;
    
                console.log(csp_safe.length)
                for (let i = 0; i < csp_safe.length; i++) {
                    let arr_comp = csp_safe[i];
                    //console.log(arr_comp)
                    //let fileName = `csp_${arr_comp[0][1]}_${arr_comp[1][1]}_${arr_comp[2][1]}_${arr_comp[3][1]}_${arr_comp[4][1]}_${arr_comp[5][1]}_${page_name}.json`
                    if(!websites.includes(page_name)){
                        websites.push(page_name)
                    }
                    //console.log("---------------------------------------------------------------------")
                    //console.log(arr_comp)
                    
                    viewport_arr.push(`${arr_comp[0][1]}: {height${arr_comp[4][1]}, width:${arr_comp[5][1]}}`)
                    //[`${arr_comp[0][1]}`, `${arr_comp[4][1]}`, `${arr_comp[5][1]}`]
                    let dev = `${arr_comp[0][1]}: {height${arr_comp[4][1]}, width:${arr_comp[5][1]}}`
                    if(!allDeveices.includes(dev)) {
                        allDeveices.push(dev)
                    }
                }
    
                //console.log("PPPPPPPPPPPPPP")
                //console.log(viewport_arr)
                let viewport_arr_ND = new Array();
                let viewport_arr_VD = new Array();
                num_dev_viewport = viewport_arr.length;
                const user_agents_with_different_viewport = viewport_arr => viewport_arr.filter((item, index) => viewport_arr.indexOf(item) !== index)
                var os_ViewportArr = new Array();
                if(viewport_arr.length > 1) {
                    viewport_arr = user_agents_with_different_viewport(viewport_arr);
                    for(let vd of viewport_arr){
                        if(!viewport_arr_ND.includes(vd)){
                            viewport_arr_ND.push(vd)
                        }
                    }
                } else {
                    viewport_arr.pop();
                }
                //console.log("LLLLLLLLLLLLLLLLLLLLLLLL")
                //console.log(viewport_arr_ND)
                let browsers = new Array();
                for(let i = 0; i < csp_safe.length; i++) {
                    let browser_Name = csp_safe[i][1][1];
                    if(!browsers.includes(browser_Name)){
                        browsers.push(browser_Name)
                    }
                }
                
                for(let j = 0; j < viewport_arr_ND.length; j++) {
                    for(let i = 0; i < csp_safe.length; i++) {
                        if(csp_safe[i][0][1] === viewport_arr_ND[j]){
                            if(!viewport_arr_VD.includes(`${viewport_arr_ND[j]}_${csp_safe[i][1][1]}_${csp_safe[i][2][1]}_${csp_safe[i][3][1]}_${csp_safe[i][4][1]}_${csp_safe[i][5][1]}_${page_name}`)){
                                viewport_arr_VD.push(`${viewport_arr_ND[j]}_${csp_safe[i][1][1]}_${csp_safe[i][2][1]}_${csp_safe[i][3][1]}_${csp_safe[i][4][1]}_${csp_safe[i][5][1]}_${page_name}`)
                            }
                        }
                    }
                }
    
                //console.log(viewport_arr_VD)
    
                let viewport_arr_ = new Array();
                
                if(viewport_arr_VD.length > 1) {
                    
                    for (let i = 0; i < browsers.length; i++) {
                        let viewport_comp = new Array();
                        for(let j = 0; j < viewport_arr_VD.length; j++) {                           
                            if (viewport_arr_VD[j].includes(browsers[i])) {
                                viewport_comp.push(csp_safe[j])
                            }
                            //console.log(viewport_comp)
                        }
                        
                        //console.log("------------------------------------------------------------")
                        //console.log(viewport_comp)
                
                        let index_vc = 0;
                        while(index_vc < viewport_comp.length){
                            let same_attributes_values = 0;
                            let same_attributes_values_flage = false;
                            let safe = false;
                            let arr__1 = viewport_comp[index_vc];
                            let arr__2 = viewport_comp[index_vc + 1];
    
                            let dev_1_2_safe_csp = false;
                            //console.log("JJJJJJJJJJJJJJJJJJJ")
                            //console.log(arr__1)
                            //console.log(arr__2)
                            if(arr__1[7][1] === arr__2[7][1]){
                                dev_1_2_safe_csp = true
                            }
    
                            if(arr__1[7][1] === arr__2[7][1]) {
                                same_attributes_values_flage = true;
                            }
                            
                            for(let n = 7; n < arr__1.length; n++) {
                                if(arr__2[n][1] === arr__1[n][1] ) {                               
                                    //console.log(arr__2[n][1])
                                    same_attributes_values++;
                                }
                            }
                    
                            let v_comp = new Array();
                            let dev_mod = arr__1[0][1];
                            //console.log("t4all")
                            //console.log(same_attributes_values)
                            let browser_name;
                            let browser_version;
                            if (same_attributes_values === 25) {
                                
                                //let dev_mod = arr__1[0][1];
    
                                v_comp.push(['the model of the two devices is', dev_mod])
                                browser_name = arr__1[1][1];
                                v_comp.push(["the used browser an the two devices is", browser_name])
                                browser_version = arr__1[2][1];
                                v_comp.push(["the used browser-version an the tow devices is", browser_version])
                                let operating_system = arr__1[3][1];
                                v_comp.push(["the operating system of the two devices is", operating_system])
                                let arr_v = {"device_1": `height-${arr__1[4][1]} width-${arr__1[5][1]}`, "device_2": `height-${arr__2[4][1]} width-${arr__2[5][1]}`}
                                v_comp.push(["the heights and widths of the tow devices are", arr_v])
                                let safe_csp = arr__1[7][1]
                                v_comp.push(["both of the tow devices get a safe csp", safe_csp])
                                v_comp.push(["both of the tow devices get the same csp attributes", true])
    
                                //let sllstrpping = arr__1[7][1]
                                //v_comp.push(["both of the two devices get a safe csp", safe_csp])
    
                                if(!os_ViewportArr.includes(operating_system)) {
                                    os_ViewportArr.push(operating_system)
                                }
    
                                viewport_res.push(dev_mod, dev_mod)
                                
                                //console.log(viewport_res)
                    
                            } else {
                                v_comp.push(['the model of the two devices is', dev_mod])
                                browser_name = arr__1[1][1];
                                v_comp.push(["the used browser an the two devices is", browser_name])
                                browser_version = arr__1[2][1];
                                v_comp.push(["the used browser-version an the tow devices is", browser_version])
                                let operating_system = arr__1[3][1];
                                v_comp.push(["the operating system of the two devices is", operating_system])
                                let arr_v = {"device_1": `height-${arr__1[4][1]} width-${arr__1[5][1]}`, "device_2": `height-${arr__2[4][1]} width-${arr__2[5][1]}`}
                                v_comp.push(["the heights and widths of the tow devices are", arr_v])
                                if(dev_1_2_safe_csp){
                                    v_comp.push(["both of the tow devices get a safe csp", dev_1_2_safe_csp])
                                } else {
                                    v_comp.push(["both of the tow devices get a safe csp", dev_1_2_safe_csp])
                                    v_comp.push(["dev 1 get a safe csp", arr__1[7][1]])
                                    v_comp.push(["dev 1 get a safe csp", arr__2[7][1]])
                                }
                                v_comp.push(["both of the tow devices get the same csp attributes", false])
    
                            }
                    
                            let fileName_viewport = `${dev_mod}_${browser_name}_${browser_version}_${page_name}.json` 
                            //console.log(fileName_viewport)
                                let json_viewport = {};
                                for (let v = 0; v < v_comp.length; v++) {
                                    let key = v_comp[v][0];
                                    let value = v_comp[v][1];
                                    json_viewport[key] = value;
                                }
                            fs.writeFileSync(`./viewport_comp/${fileName_viewport}`, JSON.stringify(json_viewport))
                            index_vc = index_vc + 2
                        }    
                    }
    
                    if(num_dev_viewport === viewport_res.length) {
                        let json_viewport_result = {};
                        json_viewport_result["Devices with two differents viewport"] = viewport_arr_ND
                        json_viewport_result["each of the devices with two differents viewport provide the same csp-saftey level "] = true
                        json_viewport_result["number of total devices"] = viewport_arr.length + 1
                        json_viewport_result["number of devices that provide the same csp-safty level "] = viewport_res.length
                        json_viewport_result["number of devices that dose not provide the same csp-safty level "] = num_dev_viewport - viewport_res.length
                        json_viewport_result["operating system "] = os_ViewportArr
                        fs.writeFileSync(`./viewport_comp/compResultViewport_${osystem}_${page_name}.json`, JSON.stringify(json_viewport_result))    
                    } else {
                        let json_viewport_result = {};
                        json_viewport_result["Devices with two differents viewport"] = viewport_arr_ND
                        json_viewport_result["each of the following devices with two differents viewport provide the same csp-saftey level "] = false
                        json_viewport_result["number of devices that provide the same csp-safty level "] = viewport_res.length + 1
                        json_viewport_result["number of devices that dose not provide the same csp-safty level "] =  num_dev_viewport - viewport_res.length
                        json_viewport_result["operating system "] = os_ViewportArr
                        fs.writeFileSync(`./viewport_comp/compResultViewport_${osystem}_${page_name}.json`, JSON.stringify(json_viewport_result))
                    } 
                }
                */
            } 
        }
     
    }

    /*if(compare_option[0] === "alluri") {
        let json_comp_reuslt = {};
        uri = removeDuplikate(uri)
        allDeveices = removeDuplikate(allDeveices)
        allBrowsers = removeDuplikate(allBrowsers)
        NSB = removeDuplikate(NSB)
        SB = removeDuplikate(SB)
        devices_offerd_safe_csp = removeDuplikate(devices_offerd_safe_csp)
        devices_offerd_unsafe_csp = removeDuplikate(devices_offerd_unsafe_csp)

        json_comp_reuslt["number of uris"] = uri.length
        json_comp_reuslt["uris"] = uri
        json_comp_reuslt["Uris have been visited by the following devices"] = allDeveices
        json_comp_reuslt["Uris have been visited using the following browsers"] = allBrowsers
        json_comp_reuslt["Uris that sent unsafe csp"] = NSB
        json_comp_reuslt["Devices with unsafe csp"] = devices_offerd_unsafe_csp
        json_comp_reuslt["Uris that sent safe csp"] = SB
        json_comp_reuslt["Devices with safe csp"] = devices_offerd_safe_csp
        fs.writeFileSync(`./compare/compResult_${osystem}_AllUris.json`, JSON.stringify(json_comp_reuslt))
        
    }*/
    

    
    //console.log(files)
    console.log(uri)
    console.log(web)
    for(let u of web){
        //console.log("JJJJJJJJJJJJJJJJJJJJJJJ")
        //console.log(u)
        if(!fs.existsSync(resultFolder)){
            fs.mkdirSync(path.join("./", resultFolder));
        }
    
        //compareWebsite(u, folder2, resultFolder)
        
        //console.log("ÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜÜ")
    }
    for(let u of uri){
        u = u.split(".")[0]
        console.log(u) 
        console.log(!fs.existsSync(resultFolder2))
        console.log(fs.existsSync(resultFolder2))
        if(!fs.existsSync(resultFolder2)){
            fs.mkdirSync(path.join("./", resultFolder2));
        }
        compareHomeWithSunpages(u, resultFolder, resultFolder2)
    }
   
     
}

function compareHomeWithSunpages(pageName, comparePath, resultPath){
    //console.log(pageName)
    const  jsonsFiles =  fs.readdirSync(comparePath).filter((filename) => path.extname(filename) === '.json');

    console.log(jsonsFiles)
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
            csp.push(filename.split(".json")[0].substring(4))
            filename_debuger = filename
            let arr_2 = new Array();
            //console.log(json_after_split)
            for (var elem of json_after_split) {
                let header;
                let arr_;
                let header_value;
              
                if((elem.includes("\":") && !elem.includes("http")) || elem.includes("visited link")){
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
  
    for(let i = 0; i < csp_policies.length; i++){
        //console.log(csp_policies[i])
        let dev = csp_policies[i][1][1][1];
        let dev_ = dev.replace("[", "")
        dev_ = dev_.replace("]", "")
        let dev_arr = dev_.split(", ")
        for(var d of dev_arr){
            if(!devices.includes(d)){
                devices.push(d)
            }
        }
        if(i === 0){
            let homePage_Check = parseInt(csp_policies[0][1][2][1]) 
            let homePage_cspHeader = parseInt(csp_policies[0][1][14][1]) 
            if(homePage_Check > 0){
                homePage_Security = true;
                let dev = csp_policies[i][1][3][1];
                //console.log(dev)
                let dev_ = dev.replace("[", "")
                dev_ = dev_.replace("]", "")
                let dev_arr = dev_.split(", ")
                for(var d of dev_arr){
                    if(!homePage_Security_arr.includes(d)){
                        homePage_Security_arr.push(d)
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
                    if(!homePage_CSPHeaderisThere_arr.includes(d)){
                        homePage_CSPHeaderisThere_arr.push(d)
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
        }
        //console.log("KKKKKKKKKKKKKKKKKKKKKKKKKK")
        //console.log(i)
        //console.log(csp_policies[i])
       
        //console.log(csp_policies[i][1][2][1])
        if(parseInt(csp_policies[i][1][2][1]) > 0 && (i > 0)){
            //console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP")
            subPages_Security++;
            let dev = csp_policies[i][1][3][1];
            let dev_ = dev.replace("[", "")
            dev_ = dev_.replace("]", "")
            let dev_arr = dev_.split(", ")
            for(var d of dev_arr){
                if(!subPages_Security_arr.includes(d)){
                    subPages_Security_arr.push(d)
                }
            }
            //console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
            //console.log(devices)
            //console.log(subPages_Security_arr)
            for(var d of devices){
                if(!subPages_Security_arr.includes(d)){
                    if(!subPages_Security_arr_NotSafe.includes(d)){
                        subPages_Security_arr_NotSafe.push(d)
                    }
                }
            }
        }else{
            subPages_Security_arr_NotSafe = devices;
        }

        if(parseInt(csp_policies[i][1][14][1]) > 0 && (i > 0)){
            subPages_cspHeader++;
            
            let dev = csp_policies[i][1][15][1];
            let dev_ = dev.replace("[", "")
            dev_ = dev_.replace("]", "")
            let dev_arr = dev_.split(", ")
            for(var d of dev_arr){
                if(!subPages_cspHeader_arr.includes(d)){
                    subPages_cspHeader_arr.push(d)
                }
            }
            for(var d of devices){
                if(!subPages_cspHeader_arr.includes(d)){
                    if(!subPages_cspHeader_arr_NoCSPHeader.includes(d)){
                        subPages_cspHeader_arr_NoCSPHeader.push(d)
                    }
                }
            }
        }else{
            subPages_cspHeader_arr_NoCSPHeader = devices
        }


        //console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLL")

    }
    let subPages_SecurityNotSafe = 5 - subPages_Security;
    let subPages_withoutcspHeader = 5 - subPages_cspHeader;
    let json_comp = {};
    json_comp["Total devices"] = devices
    json_comp["Homepage with safe csp"] = homePage_Security
    json_comp["Homepage with safe csp using following devices"] = homePage_Security_arr
    json_comp["Homepage with not safe csp using following devices"] = homePage_Security_arr_NotSafe
    json_comp["Subpages with safe csp"] = `${subPages_Security} are with safe csp`
    json_comp["Subpages with not safe csp"] = `${subPages_SecurityNotSafe} are with not safe csp`
    json_comp["Subpages with safe csp using following devices"] = subPages_Security_arr
    json_comp["Subpages with not safe csp using following devices"] = subPages_Security_arr_NotSafe
    json_comp["Homepage with csp header"] = homePage_CSPHeaderisThere
    json_comp["Homepage with csp header using following devices"] = homePage_CSPHeaderisThere_arr
    json_comp["Homepage without csp header using following devices"] = homePage_CSPHeaderisThere_arr_NoCSPHeader
    json_comp["Subpages with csp header"] = subPages_cspHeader
    json_comp["Subpages without csp header"] = subPages_withoutcspHeader
    json_comp["Subpages with csp header using following devices"] = subPages_cspHeader_arr
    json_comp["Subpages without csp header using following devices"] = subPages_cspHeader_arr_NoCSPHeader
    fs.writeFileSync(`./${resultPath}/compResult_${pageName}.json`, JSON.stringify(json_comp))
    //console.log("Endddddddddddddddddddddddddddddddddddd")




    //console.log(homePage_Security)
    //console.log(subPages_Security)
    

}

function compareWebsite(pageName, comparePath, resultPath){

    //console.log(pageName)
    const  jsonsFiles =  fs.readdirSync(comparePath).filter((filename) => path.extname(filename) === '.json');
    //console.log(jsonsFiles)
    let csp_policies = new Array();
    jsonsFiles.forEach(filename => {
        let csp = new Array()
        if(filename.includes(`${pageName}.json`)) {
            //console.log("KKKKKKKKKKKKKKKKKKKKKKKKK")
            //console.log(filename)
            const fileData = fs.readFileSync(path.join(comparePath, filename));                    
            const json_arr = JSON.parse(fileData.toString());
            let json_str = JSON.stringify(json_arr);
            json_after_split = json_str.substring(1, json_str.length - 1);
            json_after_split = json_after_split.split(/,"/)
            csp.push(filename.split(".json")[0].substring(4))
            filename_debuger = filename
            let arr_2 = new Array();
            //console.log("OOOOOOOOOOOOOOOOOOOO")
            //console.log(json_after_split)
            for (var elem of json_after_split) {
                let header;
                let arr_;
                let header_value;
                
                if((elem.includes(":") && !elem.includes("http") && !elem.includes("data")&& !elem.includes("mediastream")&& !elem.includes("blob")&& !elem.includes("filesystem")&& !elem.includes("resource")&& !elem.includes(":*")) || elem.includes("visited_Webpage")){
                    arr_ = elem.split(/":/);
                    //console.log(arr_)
                    header = delete_StrSy(arr_[0], "\"");
                    //console.log("UUUUUUUUUUUUUUUUUUUUU")
                    //console.log(arr_)
                    //console.log(arr_[1])
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

    });
    //console.log("JJJJJJJJJJJJJJJJJJJJJ")
    //console.log(csp_policies)
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
    //console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
    //console.log(csp_policies)
    let filename;
    let device;
    for(let i = 0; i < csp_policies.length; i++){
        //console.log(csp_policies[i])
        filename = `${csp_policies[i][1][0][1]}_${csp_policies[i][1][4][1]}_${csp_policies[i][1][5][1]}_${csp_policies[i][1][3][1]}_${csp_policies[i][1][1][1]}_${csp_policies[i][1][2][1]}`
        device = `${csp_policies[i][1][0][1]} height:${csp_policies[i][1][4][1]} width:${csp_policies[i][1][5][1]} operatingSystem:${csp_policies[i][1][3][1]} browser:${csp_policies[i][1][1][1]} browser_version:${csp_policies[i][1][2][1]}`
        devices.push(device)
        if(csp_policies[i][1][7][1] === 'true'){
            devices_safe_csp.push(device)
            dev_with_cspHeader.push(device)
        }
        if(csp_policies[i][1][7][1] === 'false'){
            devices_notSafe_csp.push(device)
            if(csp_policies[i][1][8][1] === 'csp dose not contain script-src-elem, script-src or default-src') {
                dev_no_cspHeader.push(device)
            } else {
                dev_with_cspHeader.push(device)
            }
            
        }   
        
        switch(csp_policies[i][1][23][1]) {
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

            default : console.log('-_-')
            break;
        }

        switch(csp_policies[i][1][22][1]) {   
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
            default: {
                console.log("sts_max_age")
                console.log(csp_policies[i])
                console.log(check)
                console.log(i)
            }
            break;
    
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
            }
            break;

            case 'false': {
                dev_provide_no_protection_against_hijacking.push(device)
            }
            break;

            default: console.log('-hijacking-')
            break;

        }

        switch(csp_policies[i][1][29][1]) {
                        
            case 'true': {
                dev_provide_protection_against_steeling_cookies.push(device)
            }
            break;

            case 'false': {
                dev_provide_no_protection_against_steeling_cookies.push(device)
            }
            break;

            default: console.log('stealing cookes')
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
    }
    //console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
    //console.log(devices)
    //console.log(devices_safe_csp)
    //console.log(devices_notSafe_csp)

    json_comp["number of total devices"] = devices.length
    json_comp["total devices"] = devices
    json_comp["number of devices that offer safe csp"] = devices_safe_csp.length
    json_comp["devices that offer safe csp"] = devices_safe_csp
    json_comp["number of devices that offer unsafe csp"] = devices_notSafe_csp.length
    json_comp["devices that offer unsafe csp"] = devices_notSafe_csp
   
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
    //console.log("FFFFFFFFFFFFFFFFFFFFFF")
    //console.log(csp_policies)
    json_comp["visited link"] = csp_policies[1][1][csp_policies[1][1].length-1][1]
    //console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
    //console.log(pageName)
    //console.log(JSON.stringify(json_comp))
    //console.log(resultPath)
    //console.log(osystem)
    //console.log(websites)
    for(var e of websites){
        //console.log(e)
    }
    fs.writeFileSync(`./${resultPath}/compResult_${pageName}.json`, JSON.stringify(json_comp))
    //console.log("dfdfdfdfdfdf")

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
        switch(xfo) {
            case 'DENY' : { level = 3; }
                break;
            case 'SAMEORIGIN' : { level = 2; }
                break;
            default : console.log("xfo value is ALLOW-FROM or something that is not defined/Supported")
                break;
        }
    }
   

    return level;
}


function getDirectives_content_secuirty_policy(arr, header) {
    let arr_= new Array()
    for (var elem of arr) {
        let arr = new Array();
        if (elem[0] === `${header}`){
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
		if(h[0] === "content-security-policy") {
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