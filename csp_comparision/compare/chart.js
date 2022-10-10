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
    default: {
        console.log("unvalid command try again, please read the instructions first")
    }
    break;

}
console.log(json_Files_To_Display)
let resultDir= [ './viewport_comp','./compare']
const viewport_res = new Array();
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
                        viewport_res.push(vp_arr[vp_arr.length-2])
                        viewport_res.push(vp_arr[vp_arr.length-1])
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
                        var writeStream = fs.createWriteStream("./compare/compResult.js");
                        writeStream.write(`var co=[${comp[0]}, ${comp[1]}];\n`);
                        writeStream.write(`var safeDB=[${comp[2]}, ${comp[3]}, ${comp[4]}];\n`);
                        writeStream.write(`var unsafeDB=[${comp[5]}, ${comp[6]}, ${comp[7]}];\n`);
                        if(usedBrowser.length === 1) {
                            writeStream.write(`var used_browser=["${usedBrowser[0]}"]\n`);
                        }
                        if(usedBrowser.length === 2) {
                            writeStream.write(`var used_browser=["${usedBrowser[0]}", "${usedBrowser[1]}"]\n`);
                        }
                        if(usedBrowser.length === 3) {
                            writeStream.write(`var used_browser=["${usedBrowser[0]}", "${usedBrowser[1]}", "${usedBrowser[2]}"]\n`);
                        }
                        writeStream.write(`var os=["${osystems[0]}"]\n`);
                        writeStream.write(`var vp=[${viewport_res[0]}, ${viewport_res[1]}]\n`);
                        writeStream.end();
                        console.log(comp)
                    }
                });
            }
        }
    
    }else {
        console.log("\nInstructions to display result as a chart:\nplease write the following command to see a nice result :)")
        console.log("node ./compare/chart.js onetypofcomparing")
        console.log("List of valid typs: {'a', 'i', 'm', 'w'}")
        console.log("node ./compare/chart.js twotypofcomparing")
        console.log("List of valid typs: {'ai', 'am', 'aw', 'im', 'iw', 'wm}")
        console.table("a for android  i for ios  m for mac  w for windows")
    }


});




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
