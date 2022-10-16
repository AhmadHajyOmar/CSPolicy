const fs = require('fs');
const { type } = require('os');
const path = require('path');
const { isContext, createContext } = require('vm');
var csp = new Array();
var comp = new Array();


const comp_option = process.argv.splice(2);
let compare_IsAble = false;
let json_Files_To_Display = new Array();
switch(comp_option[0]) {
    case "a": {
        console.log("comparing android")
        compare_IsAble = true;
        json_Files_To_Display.push("Android")
    }
    break;
    case "i": {
        console.log("comparing ios")
        compare_IsAble = true;
        json_Files_To_Display.push("iOS")

    }
    break;
    case "w": {
        console.log("comparing windows")
        compare_IsAble = true;
        json_Files_To_Display.push("Windows")

    }
    break;
    case "m": {
        console.log("comparing mac os")
        compare_IsAble = true;
        json_Files_To_Display.push("Mac OS")

    }
    break;
    case "ai": {
        console.log("comparing adroid result with ios result")
        compare_IsAble = true;
        json_Files_To_Display.push("Android")
        json_Files_To_Display.push("iOS")

    }
    break;
    case "aw": {
        console.log("comparing adroid result with Windows result")
        compare_IsAble = true;
        json_Files_To_Display.push("Android")
        json_Files_To_Display.push("Windows")


    }
    break;
    case "am": {
        console.log("comparing android result with mac result")
        compare_IsAble = true;
        json_Files_To_Display.push("Android")
        json_Files_To_Display.push("Mac OS")


    }
    break;
    case "iw": {
        console.log("comparing ios result with windows result")
        compare_IsAble = true;
        json_Files_To_Display.push("iOS")
        json_Files_To_Display.push("Windows")


    }
    break;
    case "im": {
        console.log("comparing ios result with Mac result")
        compare_IsAble = true;
        json_Files_To_Display.push("iOS")
        json_Files_To_Display.push("Mac OS")


    }
    break;
    case "wm": {
        console.log("comparing windows result with Mac result")
        compare_IsAble = true;
        json_Files_To_Display.push("Windows")
        json_Files_To_Display.push("Mac OS")

    }
    break;
    case "aim": {
        console.log("comparing all Android, iOS and Mac results")
        compare_IsAble = true;
        json_Files_To_Display.push("Android")
        json_Files_To_Display.push("iOS")
        json_Files_To_Display.push("Mac OS")

    }
    break;
    case "aiw": {
        console.log("comparing all Android, iOS and Windows results")
        compare_IsAble = true;
        json_Files_To_Display.push("Android")
        json_Files_To_Display.push("Windows")
        json_Files_To_Display.push("iOS")

    }
    break;
    case "all": {
        console.log("comparing all Android, iOS, Mac and Windows results")
        compare_IsAble = true;
        json_Files_To_Display.push("Android")
        json_Files_To_Display.push("iOS")
        json_Files_To_Display.push("Windows")
        json_Files_To_Display.push("Mac OS")

    }
    break;
    default: {
        console.log("unvalid command try again, please read the instructions first")
    }
    break;

}
console.log(json_Files_To_Display)
let resultDir= [ './viewport_comp','./compare']
const viewport_res = new Array();
const viewport_os = new Array();
const viewport_devicesNumber = new Array();
let usedBrowser = new Array();
let osystems = new Array();
resultDir.forEach(dir => {
    if(compare_IsAble) {
        //console.log(json_Files_To_Display.length)
        const jsonsInDir =  fs.readdirSync(`${dir}`).filter((filename) => path.extname(filename) === '.json');
        if(dir === './viewport_comp') {
            let vp_arr = new Array();
            for(var jsondir of json_Files_To_Display) {
                osystems.push(jsondir)
                jsonsInDir.forEach(filename => {
                    let json_file_name = jsondir
                    if(filename === `compResultViewport_${json_file_name}.json`) {
                        csp = new Array();
                        const fileData = fs.readFileSync(path.join(`${dir}`, filename));
                        const json_arr = JSON.parse(fileData.toString());
                        let json_str = JSON.stringify(json_arr);
                        json_after_split = json_str.substring(1, json_str.length - 1);
                        json_after_split = json_after_split.split(",")
                        //console.log(json_after_split)
                        for( var v of json_after_split) {
                            v = v.split(":")
                            vp_arr.push(v[1])
                        }
                        //console.log(vp_arr)
                        viewport_res.push(vp_arr[vp_arr.length-3])
                        viewport_res.push(vp_arr[vp_arr.length-2])
                        let vp_os = vp_arr[vp_arr.length-1]
                        viewport_os.push(vp_os.substring(1, vp_os.length-1))
                        viewport_devicesNumber.push(vp_arr[vp_arr.length-4])
                        console.log(viewport_res)
                        //console.log(comp)
                    }
                });  
            }  
            
        }else {
            for(var jsondir of json_Files_To_Display) {
                let json_file_name = jsondir
                jsonsInDir.forEach(filename => {
                    if(filename === `compResult_${json_file_name}.json`) {
                        csp = new Array();
                        const fileData = fs.readFileSync(path.join(`${dir}`, filename));
                        const json_arr = JSON.parse(fileData.toString());
                        let json_str = JSON.stringify(json_arr);
                        json_after_split = json_str.substring(1, json_str.length - 1);
                        json_after_split = json_after_split.split(",")
                        for( var v of json_after_split) {
                            v = v.split(":")
                            comp.push(v[1])
                        }
                        let arr_b = comp[comp.length-1];
                        for(let i = 0; i < arr_b.length; i++) {
                            if(arr_b[i] === "w" && !usedBrowser.includes("WebKit(Safari)")) {
                                usedBrowser.push("WebKit(Safari)")
                            }
                            if(arr_b[i] === "c" && !usedBrowser.includes("Chromium")) {
                                usedBrowser.push("Chromium")
                            }
                            if(arr_b[i] === "f" && !usedBrowser.includes("Firefox")) {
                                usedBrowser.push("Firefox")
                            }
                        }
                        //console.log(json_after_split)
                        // create new js file with the needed values to display them as a chart
                        console.log("GGGGGGGGGGGGGGGGGG")
                        console.log(osystems)
                        console.log(comp)
                        console.log(usedBrowser)
                        console.log(viewport_res)
                        console.log(comp)
                    }
                });
            }
        }
        console.log("zu")
        console.log(comp)
        console.log(usedBrowser)
        console.log(osystems)
        console.log(viewport_os)
        console.log(viewport_res)
        console.log(viewport_devicesNumber)
        var create_JsFile = fs.createWriteStream("./compare/compResult.js");
        create_JsFile.write(`var co=[${comp[0]}, ${comp[1]}];\n`);
        create_JsFile.write("\n");
        writeVarJS("safeDB", create_JsFile, comp)
        create_JsFile.write("\n");
        writeVarJS("unsafeDB", create_JsFile, comp)
        create_JsFile.write("\n");
        //create_JsFile.write(`var safeDB=[${comp[2]}, ${comp[3]}, ${comp[4]}];\n`);
        //create_JsFile.write(`var unsafeDB=[${comp[5]}, ${comp[6]}, ${comp[7]}];\n`);
        writeVarJS("used_browser", create_JsFile, usedBrowser)
        create_JsFile.write("\n");
        writeVarJS("os", create_JsFile, osystems)
        create_JsFile.write("\n");
        writeVarJS("vos", create_JsFile, viewport_os)
        create_JsFile.write("\n");
        writeVarJS("vp", create_JsFile, viewport_res)
        create_JsFile.write("\n");
        writeVarJS("vpDevicesNumber", create_JsFile, viewport_devicesNumber)
        //create_JsFile.write(`var os=["${osystems[0]}"]\n`);
        //create_JsFile.write(`var vp=[${viewport_res[0]}, ${viewport_res[1]}]\n`);
        create_JsFile.end();

    }else {
        console.log("\nInstructions to display result as a chart:\nplease write the following command to see a nice result :)")
        console.log("node ./compare/chart.js onetypofcomparing")
        console.log("List of valid typs: {'a', 'i', 'm', 'w'}")
        console.log("node ./compare/chart.js twotypofcomparing")
        console.log("List of valid typs: {'ai', 'am', 'aw', 'im', 'iw', 'wm}")
        console.table("a for android  i for ios  m for mac  w for windows")
    }


});


function writeVarJS(varName, fileName, arr) {
    if(varName === "safeDB" || varName === "unsafeDB") {
        let index = 5;
        if(varName === "safeDB") {
            index = 2;
        }
        switch(arr.length) {
            case 15: {
                fileName.write(`var ${varName}=["${arr[index]}", "${arr[index+1]}", "${arr[index+2]}"]\n`);
            }
            break;
            case 30: {
                fileName.write(`var ${varName}=["${arr[index]}", "${arr[index+1]}", "${arr[index+2]}", "${arr[index+15]}", "${arr[index+16]}", "${arr[index+17]}"]\n`);
            }
            break;
            case 45: {
                fileName.write(`var ${varName}=["${arr[index]}", "${arr[index+1]}", "${arr[index+2]}", "${arr[index+15]}", "${arr[index+16]}", "${arr[index+17]}", "${arr[index+30]}", "${arr[index+31]}", "${arr[index+32]}"]\n`);
            }
            break;
            default: {
                console.log("mistake in the function writeVarJS :(")
            }
            break;
            
        }
    } else if(varName === "vp") {
        switch(arr.length) {
            case 2: {  
                fileName.write(`var ${varName}=["${arr[0]}", "${arr[1]}"]\n`);
            }
            break;
            case 4: {
                fileName.write(`var ${varName}=["${arr[0]}", "${arr[1]}", "${arr[2]}", "${arr[3]}"]\n`);
            }
            break;
            case 6: {
                fileName.write(`var ${varName}=["${arr[0]}", "${arr[1]}", "${arr[2]}", "${arr[3]}", "${arr[4]}", "${arr[5]}"]\n`);
            }
            break;
            default: {
                console.log("mistake in the function writeVarJS :(")
            }
            break;
            
        }
    }
     else {
        switch(arr.length) {
            case 1: {  
                fileName.write(`var ${varName}=["${arr[0]}"]\n`);
            }
            break;
            case 2: {
                fileName.write(`var ${varName}=["${arr[0]}", "${arr[1]}"]\n`);
            }
            break;
            case 3: {
                fileName.write(`var ${varName}=["${arr[0]}", "${arr[1]}", "${arr[2]}"]\n`);
            }
            break;
            default: {
                console.log("mistake in the function writeVarJS :(")
            }
            break;
            
        }
    }
   
}


/* 

const jsonvp =  fs.readdirSync("./viewport_comp").filter((filename) => path.extname(filename) === '.json');
var vattr = new Array();
// compResultViewport_Android
if(jsonvp.length > 1) {
    jsonvp.forEach(filename => {
        if(filename.includes("compResultViewport_")) {
            console.log(filename)
            csp = new Array();
            const fileData = fs.readFileSync(path.join("./viewport_comp", filename));
            const json_arr = JSON.parse(fileData.toString());
            let json_str = JSON.stringify(json_arr);
                json_after_split = json_str.substring(1, json_str.length - 1);
                json_after_split = json_after_split.split(",")
                for( var v of json_after_split) {
                    v = v.split(":")
                    vattr.push(v[1])
                }
                console.log(vattr)
        } 
    });
}
 */
