const fs = require("fs");
const path = require("path");
const info = process.argv.splice(2);
let path_to_json_files = info[0]
let pattern = info[1]
if (info.length === 1 && info[0] === "all") {
    var allfiles = new Array();
    const paths = ['./tests', './viewport_comp', './compare', './nonceValue', './nonceDuplicate', './comparePagesWithDevices', './compareHomeWithSubpages', './csp-headers', './user-agents']
    for(var p of paths) {
        const files_From_All_Paths =  fs.readdirSync(p).map(file => path.join(p, file));
        for(var f of files_From_All_Paths) {
            if (f.endsWith(".json")) { 
                fs.unlinkSync(f);
            }
        }
    }
    for(var af of allfiles) {
        fs.unlinkSync(af);
    }
} else if(info.length === 2 && info[0].charAt(0) === "." && info[0].charAt(1) === "/") {
    const files =  fs.readdirSync(path_to_json_files).map(file => path.join(path_to_json_files, file));
    for(var f of files) {
        console.log(f)
        if (f.includes(pattern) && f.includes(".json")) { 
            fs.unlinkSync(f);
        }
    }
} else {
    console.log("\nplease read the following instructions: \n\n To delete all the json files from the following folders (test, compare, viewport_comp) write the command \n")
    console.log("node deleteJSON.js all\n")
    console.log("To delete all the json files from a specific folderwrite the command \n")
    console.log("node deleteJSON.js path typeOfFiles/substringFromTheFilesName\n \nfor example:\n node deleteJSON.js ./test json\n node deleteJSON.js ./test Android")


}




