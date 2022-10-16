//const { colorSets } = require('canvasjs/src/constants/themes');
const fs = require('fs');
const { type } = require('os');
const path = require('path');
const { isContext, createContext } = require('vm');

const op = fs.readFileSync("./tests/option", 'utf-8').split(/\r?\n/);
const jsonsInDir =  fs.readdirSync("./tests").filter((filename) => path.extname(filename) === '.json');
var uri = fs.readFileSync("./tests/urls", 'utf-8').split(/\r?\n/);
var permission = true;
const compare_option = process.argv.splice(2);
//console.log(compare_option)
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
if(permission) {
    for (var osystem of op) {
        let allDeveices = new Array();
        let allBrowsers = new Array();
        let SB = new Array();
        let NSB = new Array();
        for(var u of uri) {
            let page_name = u.split(".")[0]
            var csp = new Array();
            var csp_policies = new Array();
            let viewport_res = new Array();
            jsonsInDir.forEach(filename => {
                if(filename.includes(osystem) && filename.includes(page_name)) {
                    csp = new Array();
                    const fileData = fs.readFileSync(path.join("./tests", filename));
                    const json_arr = JSON.parse(fileData.toString());
                    console.log(filename)
                    //console.log(json_arr)
                    let json_str = JSON.stringify(json_arr);
                    //console.log(json_str)
                    json_after_split = json_str.substring(1, json_str.length - 1);
                    json_after_split = json_after_split.split(/,"/)
                    //console.log(json_after_split)
                    csp.push(filename.split(".json")[0].substring(4))
                    let arr_2 = new Array();
                    for (var elem of json_after_split) {
                        let arr_ = elem.split(/:"/);
                        let header = delete_StrSy(arr_[0], "\"");
                        let header_value = delete_StrSy(arr_[1], "\"")
                        header_value = delete_StrSy(header_value, "\\")
                
                        arr_2.push([header, header_value])
                        
                    }
                    csp.push(arr_2)
                    //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
                    csp_policies.push(csp)
                }
            });
            
            if(csp_policies.length > 0) {
                let csp_safe = new Array();
                for(let i = 0; i < csp_policies.length; i++) {
                    console.log("§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§")
                    //console.log(csp_policies[i])
                    let arr = csp_policies[i];
                    //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                    console.log(arr[0])
                    //console.log(arr[1])
                    let csp_dir = getDirectives_content_secuirty_policy(arr[1], "content-security-policy")
                    let sts = getDirectives_content_secuirty_policy(arr[1], "strict-transport-security")
                
                    //31,556,952
                
                /*  console.log("SSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTTLLLLLLLLLLLLLLLLLLLL")
                    console.log(sts)
                    console.log("SSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTTLLLLLLLLLLLLLLLLLLLL") */
                
                    let max_age_sts = false;
                    let insub_sts = false;
                    let preload_sts = false;
                    let max_age_YearValue = 0;
                    for(var v of sts) {
                        if (v.includes("max-age")) {
                            v = v.split("=")
                            console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM")
                            console.log(v[1])
                            console.log("SSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTTLLLLLLLLLLLLLLLLLLLL")
                            max_age_YearValue = v[1]/31536000;
                            console.log(max_age_YearValue)
                
                            max_age_sts = true;
                        }
                
                        if(v.includes("includeSubDomains")) {
                            insub_sts = true;
                        }
                
                        if(v.includes("preload")) {
                            preload_sts = true;
                        }
                    }
                    console.log(csp_dir)
                    let source = new Array();
                    let directive = "csp dose not contain script-srcc or default-src";
                    let flage = false;
                    let script_flage = false;
                    let default_flage = false;
                    if (csp_dir.includes("script-src")) {
                        directive = "script-src"
                        source = getDirective_Sources(arr[1], "script-src")
                        console.log(source)
                        flage = true;
                        script_flage = true;
                        if(csp_dir.includes("default-src")) {
                            default_flage = true;
                        }
                    } else if (csp_dir.includes("default-src")) {
                        directive = "default-src"
                        source = getDirective_Sources(arr[1], "default-src")
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
                        /*  if (v === "'unsafe-inline'" && (safe_flage != 2 || safe_flage != 3 || safe_flage != 4)) {
                                safe_flage = 1;
                            } */
                
                            if(v.includes("nonce")) {
                                nonce_flage = true;
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
                
                    let hsts_classe = 0;
                    
                    if(max_age_YearValue === 0) {
                        hsts_classe = 1
                    }
                
                    if(max_age_YearValue < 1) {
                        hsts_classe = 2
                    }
                
                    if(max_age_YearValue >= 1) {
                        hsts_classe = 3
                    }
                
                    let level_of_protection_against_SSL_Stripping = 0;
                
                    if(max_age_sts && !insub_sts && !preload_sts) {
                        level_of_protection_against_SSL_Stripping = 1;
                    }
                
                    if(max_age_sts && insub_sts && !preload_sts) {
                        level_of_protection_against_SSL_Stripping = 2;
                    }
                
                    if(max_age_sts && insub_sts && preload_sts) {
                        level_of_protection_against_SSL_Stripping = 3;
                    }
                
                    let safe_flage = false;
                    if(script_flage === true || default_flage === true) {
                        if ( (((nonce_flage === true || hash_flage === true)) || ((nonce_flage === false && hash_flage === false) && (inline_flage === false))) && ( (strictD_flage === true) || ( strictD_flage === false && wildcard_flage === false && data_flage === false && protocol_flage === false) ) ) {
                            safe_flage = true;
                        }
                    }
                
                    let details = arr[0].split("_");
                    csp_safe.push([["device model", details[0]],["browser name", details[1]],["browser version", details[2]],["os", details[3]],["viewport-height", details[4]],["viewport-width", details[5]], ["origins", source], ["safe csp", safe_flage], ["directive to check", directive], ["script-src", script_flage], ["default-src", default_flage], ["'unsafe-inline'", inline_flage], ["'unsafe-eval'", eval_flage], ["nonce", nonce_flage], ["hash", hash_flage], ["strict-dynamic", strictD_flage], ["wildcard*", wildcard_flage], ["protocol", protocol_flage], ["data", data_flage], ["sts_max_age", max_age_sts], ["sts_max_age_year_protection", max_age_YearValue] , ["sts_includeSD", insub_sts], ["sts_preload", preload_sts], ["hsts classe", hsts_classe]])
                
                }
                let viewport_arr = new Array();
                
                for (let i = 0; i < csp_safe.length; i++) {
                    let arr_comp = csp_safe[i];
                    let fileName = `csp_${arr_comp[0][1]}_${arr_comp[4][1]}_${arr_comp[5][1]}_${page_name}.json`
                    /* console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
                    console.log(arr_comp) */
                    let json = {};
                    for(let j = 0; j < arr_comp.length; j++) {
                        let key = arr_comp[j][0]
                        let value = arr_comp[j][1];
                        json[key] = value;
                    } 
                    fs.writeFileSync(`./compare/${fileName}`, JSON.stringify(json))
                    viewport_arr.push(`${arr_comp[0][1]}`)
                    let dev = `${arr_comp[0][1]}: {height${arr_comp[4][1]}, width:${arr_comp[5][1]}}`
                    if(!allDeveices.includes(dev)) {
                        allDeveices.push(dev)
                    }
                    //allDeveices.push(`${arr_comp[0][1]} ${arr_comp[4][1]}`)
                } 
                console.log("HHHHHHIIIIIIIIEEEEEEEEERRRRRRRRRR")
                console.log(viewport_arr)
                const user_agents_with_different_viewport = viewport_arr => viewport_arr.filter((item, index) => viewport_arr.indexOf(item) !== index)
                var os_ViewportArr = new Array();
                if(viewport_arr.length > 1) {
                    viewport_arr = user_agents_with_different_viewport(viewport_arr);
                } else {
                    viewport_arr.pop();
                }
                if(viewport_arr.length > 0) {
                    console.log("$$$$$$$$$$$!!!!!!!!!!!!!!!!!!!!!")
                    console.log(viewport_arr)
                    for (let i = 0; i < viewport_arr.length; i++) {
                        let viewport_comp = new Array();
                        for(let j = 0; j < csp_safe.length; j++) {
                            if (viewport_arr[i] === csp_safe[j][0][1]) {
                                viewport_comp.push(csp_safe[j])
                            }
                        }
                        //console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV")
                        //console.log(viewport_comp)
                        let same_attributes_values = 0;
                        let same_attributes_values_flage = false;
                        let safe = false;
                        let arr__1 = viewport_comp[0];
                        let arr__2 = viewport_comp[1];
                
                        if(arr__1[7][1] === arr__2[7][1]) {
                            same_attributes_values_flage = true;
                        }
                        
                        for(let n = 7; n < arr__1.length; n++) {
                            if(arr__2[n][1] === arr__1[n][1] ) {
                                
                
                                same_attributes_values++;
                            }
                        }
                
                        let v_comp = new Array();
                        let dev_mod = arr__1[0][1];
                        if (same_attributes_values === 17) {
                
                            //let dev_mod = arr__1[0][1];
                            v_comp.push(['the model of the two devices is', dev_mod])
                            let browser_name = arr__1[1][1];
                            v_comp.push(["the used browser an the two devices is", browser_name])
                            let browser_version = arr__1[2][1];
                            v_comp.push(["the used browser-version an the two devices is", browser_version])
                            let operating_system = arr__1[3][1];
                            v_comp.push(["the operating system of the two devices is", operating_system])
                            let arr_v = {"device_1": `height-${arr__1[4][1]} width-${arr__1[5][1]}`, "device_2": `height-${arr__2[4][1]} width-${arr__2[5][1]}`}
                            v_comp.push(["the heights and widths of the two devices are", arr_v])
                            let safe_csp = arr__1[7][1]
                            v_comp.push(["both of the two devices get a safe csp", safe_csp])
                            if(!os_ViewportArr.includes(operating_system)) {
                                os_ViewportArr.push(operating_system)
                            }
                            viewport_res.push(dev_mod)
                            console.log(viewport_res)
                
                        } else {
                            console.log("WWWWWWWWWWWWWWWWARRRRRRRRRRRRRRRRRRNNNINNNGGGGGGGG")
                            //ToDo Different csp-attributes :)
                
                        }
                
                        let fileName_viewport = `${dev_mod}_${page_name}.json` 
                            let json_viewport = {};
                            for (let v = 0; v < v_comp.length; v++) {
                                let key = v_comp[v][0];
                                let value = v_comp[v][1];
                                json_viewport[key] = value;
                            }
                        fs.writeFileSync(`./viewport_comp/${fileName_viewport}`, JSON.stringify(json_viewport))
                
                    }
                    if(arraysEquals(viewport_res, viewport_arr)) {
                        let json_viewport_result = {};
                        json_viewport_result["Devices with two differents viewport"] = viewport_arr
                        json_viewport_result["each of the devices with two differents viewport provide the same csp-saftey level "] = true
                        json_viewport_result["number of total devices"] = viewport_arr.length
                        json_viewport_result["number of devices that provide the same csp-safty level "] = viewport_res.length
                        json_viewport_result["number of devices that dose not provide the same csp-safty level "] = viewport_arr.length - viewport_res.length
                        json_viewport_result["operating system "] = os_ViewportArr[0]
                        fs.writeFileSync(`./viewport_comp/compResultViewport_${osystem}_${page_name}.json`, JSON.stringify(json_viewport_result))
                    
                    
                    } else {
                        let json_viewport_result = {};
                        json_viewport_result["Devices with two differents viewport"] = viewport_arr
                        json_viewport_result["each of the following devices with two differents viewport provide the same csp-saftey level "] = false
                        json_viewport_result["number of devices that provide the same csp-safty level "] = viewport_res.length
                        json_viewport_result["number of devices that dose not provide the same csp-safty level "] = viewport_arr.length - viewport_res.length
                        json_viewport_result["operating system "] = os_ViewportArr[0]
                        fs.writeFileSync(`./viewport_comp/compResultViewport_${osystem}_${page_name}.json`, JSON.stringify(json_viewport_result))
                    }
                }
                
                
                
                console.log(csp_safe)
                let arr_dev_safe_csp = new Array();
                let arr_dev_not_safe_csp = new Array();
                let arr_dev_sts_max_age_protection_classe1 = new Array();
                let arr_dev_sts_max_age_protection_classe2 = new Array();
                let arr_dev_sts_max_age_protection_classe3 = new Array();
                let num_dev_safe_csp = 0;
                let num_dev_not_safe_csp = 0;
                let num_dev_sts_max_age_protection_equal_zero = 0;
                let num_dev_sts_max_age_protection_less_than_one_year = 0;
                let num_dev_sts_max_age_protection_more_than_one_year = 0;
                let num_dev_safe_csp_chromium = 0;
                let num_dev_safe_csp_webkit = 0;
                let num_dev_safe_csp_firefox = 0;
                let num_dev_not_safe_csp_chrmoium = 0;
                let num_dev_not_safe_csp_webkit = 0;
                let num_dev_not_safe_csp_firefox = 0;
                let used_browser = new Array();
                var webkit_devices = 0;
                var chromium_devices = 0;
                var firefox_devices = 0;
                for(let i = 0; i<csp_safe.length; i++) {
                    let ub = csp_safe[i][1][1]
                    if(ub === "chromium") {
                        chromium_devices++;
                    }
                    if(ub === "firefox") {
                        firefox_devices++;
                    }
                    if(ub === "webkit") {
                        webkit_devices++;
                    }
                    if(!used_browser.includes(ub[0])) {
                        used_browser.push(ub[0])
                    }
                    if(!allBrowsers.includes(ub)) {
                        allBrowsers.push(ub)
                    }
                }
            
                used_browser = delete_StrSy(used_browser, "\"")
                for (let i = 0; i < csp_safe.length; i++) {
                
                    switch(csp_safe[i][23][1]) {
                        case 1: {
                            arr_dev_sts_max_age_protection_classe1.push([csp_safe[i][0][1], `height: ${csp_safe[i][4][1]}`, `width: ${csp_safe[i][5][1]}`])
                            num_dev_sts_max_age_protection_equal_zero++;
                        }
                        break;
                        case 2: {
                            arr_dev_sts_max_age_protection_classe2.push([csp_safe[i][0][1], `height: ${csp_safe[i][4][1]}`, `width: ${csp_safe[i][5][1]}`])
                            num_dev_sts_max_age_protection_less_than_one_year++;
                        }
                        break;
                        case 3: {
                            arr_dev_sts_max_age_protection_classe3.push([csp_safe[i][0][1], `height: ${csp_safe[i][4][1]}`, `width: ${csp_safe[i][5][1]}`])
                            num_dev_sts_max_age_protection_more_than_one_year++;
                        }
                        break;
                        default: {
                            console.log("-_-")
                        }
                        break;
                
                    }
                
                    if(csp_safe[i][7][1] === false) {
                        if(csp_safe[i][1][1] === "chromium") {
                            num_dev_not_safe_csp_chrmoium++;
                        }
                        if(csp_safe[i][1][1] === "webkit") {
                            num_dev_not_safe_csp_webkit++;
                        }
                        if(csp_safe[i][1][1] === "firefox") {
                            num_dev_not_safe_csp_firefox++;
                        }
                        num_dev_not_safe_csp++;
                        arr_dev_not_safe_csp.push([csp_safe[i][0][1], `height: ${csp_safe[i][4][1]}`, `width: ${csp_safe[i][5][1]}`])
                    }
                    if(csp_safe[i][7][1] === true) {
                        if(csp_safe[i][1][1] === "chromium") {
                            num_dev_safe_csp_chromium++;
                        }
                        if(csp_safe[i][1][1] === "webkit") {
                            num_dev_safe_csp_webkit++;
                        }
                        if(csp_safe[i][1][1] === "firefox") {
                            num_dev_not_safe_csp_firefox++;
                        }
                        num_dev_safe_csp++;
                        arr_dev_safe_csp.push([csp_safe[i][0][1], `height: ${csp_safe[i][4][1]}`, `width: ${csp_safe[i][5][1]}`])
                    }
                }        
                console.log(num_dev_not_safe_csp)
                console.log(num_dev_safe_csp)
                console.log(arr_dev_not_safe_csp)
                console.log(arr_dev_safe_csp)
                console.log(arr_dev_sts_max_age_protection_classe1)
                console.log(arr_dev_sts_max_age_protection_classe2)
                console.log(arr_dev_sts_max_age_protection_classe3)

                if(num_dev_safe_csp > 0) {
                    if(!SB.includes(page_name)) {
                        SB.push(page_name)
                    }
                }
                if(num_dev_not_safe_csp > 0) {
                    if(!NSB.includes(page_name)) {
                        NSB.push(page_name)
                    }
                }

                let json_comp = {};
                json_comp["number of devices that offer safe csp"] = num_dev_safe_csp
                json_comp["number of devices that offer unsafe csp"] = num_dev_not_safe_csp
                json_comp["number of devices that offer safe csp and used chromium"] = num_dev_safe_csp_chromium
                json_comp["number of devices that offer safe csp and used webkit"] = num_dev_safe_csp_webkit
                json_comp["number of devices that offer safe csp and used firefox"] = num_dev_safe_csp_firefox
                json_comp["number of devices that offer unsafe csp and used chromium"] = num_dev_not_safe_csp_chrmoium
                json_comp["number of devices that offer unsafe csp and used webkit"] = num_dev_not_safe_csp_webkit
                json_comp["number of devices that offer unsafe csp and used firefox"] = num_dev_not_safe_csp_firefox
                json_comp["number of devices that offer zero max age for hsts"] = num_dev_sts_max_age_protection_equal_zero
                json_comp["number of devices that offer max age < 1 for hsts"] = num_dev_sts_max_age_protection_less_than_one_year
                json_comp["number of devices that offer max age >= 1 for hsts"] = num_dev_sts_max_age_protection_more_than_one_year
                json_comp["number of devices that used chromium"] = chromium_devices
                json_comp["number of devices that used webkit"] = webkit_devices
                json_comp["number of devices that used firefox"] = firefox_devices
                json_comp["used browser"] = browsershortcut(used_browser)
        
                
                
                fs.writeFileSync(`./compare/compResult_${osystem}_${page_name}.json`, JSON.stringify(json_comp))
            }
    
            
        }
        if(compare_option[0] === "alluri") {
            let json_comp_reuslt = {};
            json_comp_reuslt["number of uris"] = uri.length
            json_comp_reuslt["Uris have been visited by the following devices"] = allDeveices
            json_comp_reuslt["Uris have been visited by the following browsers"] = allBrowsers
            //json_comp["Uris that sent different safty-level of csp"] = 
            //json_comp["Uris that sent same safty-level of csp"] = 
            json_comp_reuslt["Uris that sent unsafe csp"] = NSB
            json_comp_reuslt["Uris that sent safe csp"] = SB
            fs.writeFileSync(`./compare/compResult_${osystem}_AllUris.json`, JSON.stringify(json_comp_reuslt))
    
            
        
        
        }
    }
   
    
}





/* if(check) {


}else {
  
} */
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


function isSamePolicy(arr) {
    let same_flage = false;
    var csp_same = new Array();
    for (let i = 0; i < arr.length; i++) {
        let arr_ = arr[i][1];
        for(let j = 0; j < arr.length; j++) {
            let arr_2 = arr[j][1];
            for(let u = 0; u < arr_.length; u++) {
                same_flage = false;
                let header1 = arr_[u];
                let dir_arr_header1 = getDirectives(header1);
                for(let n = 0; n < arr_2.length; n++) {
                    let header2 = arr_2[n];
                    let dir_arr_header2 = getDirectives(header2);
                    if(header1[0] === header2[0]) {
                        /* console.log("§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§")
                        console.log(header1[0])
                        console.log(dir_arr_header1)
                        console.log(dir_arr_header2) */
                        if (dir_arr_header1.length === dir_arr_header2.length) {
                            return dir_arr_header1.every((element, index) => {
                              if (element === dir_arr_header2[index]) {
                                same_flage = true;
                              }
                            });
                          }
                    }
                }
            }
            if(same_flage) {
              csp_same.push(arr[i][0], arr[j][0])      
            }
        }
    }
    console.log(csp_same)
    return csp_same;
}

function getDirectives(csp) {
	var arr = new Array()
	let directives_arr = csp[1].split(";");
	//console.log(directives_arr)
	var flage = false;
	if(csp[0] != 'date' && csp[0] != 'expires' && csp[0] != 'last-modified' && csp[0] != 'priority') {
		for(var d of directives_arr) {
			if(d != '') {
				let directive = d.split(" ")
				let directive_arr = new Array();
				flage = true;
				for(var g of directive) {
					if(g != '') {
						if(csp[0] === 'content-security-policy-report-only' || csp[0] === 'content-security-policy' ) {
							if(flage) {
								g = delete_StrSy(g);
								directive_arr.push(g)
								flage = false;
							}
						} else if (csp[0] === 'report-to') {
							g = g.split(/\:/)[0];
							g = g.replace(/[^a-zA-Z]_/, '');
							
							directive_arr.push(g)
						}else {
							let dir = delete_StrSy(g);
							if(g.includes("=")) {
								let arr_ex = dir.split("=");
								dir = arr_ex[0]
							}
							directive_arr.push(dir)
						}
					}
				}
				let directive_name = delete_StrSy(directive_arr)
				for (var v of directive_name) {
                    arr.push(v);

                }
			}
		}
	} else {
		let g = delete_StrSy(csp[1])
		arr.push(g)
	}
	
	return arr;

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
            console.log("shooof")
            console.log(arr)
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

/* const data = require('./csp_Nexus 10_chromium_Android.json');
console.log(data) */

/* var arr = JSON.parse('./csp_Nexus 4_chromium_Android.json')
console.log(arr) */



