const fs = require('fs')
const subpages = fs.readFileSync("./subpages.txt", 'utf-8').split(/\r?\n/);
var subpagesFile = new String()
for(var sp of subpages){
    let arr = sp.split(/\s/g)
    //console.log(arr)
    if(sp != subpages[subpages.length-1]){
        subpagesFile += arr[0] + " " + arr[1]
        if(arr[2] != undefined){
            subpagesFile += " " + arr[2]
        }
        subpagesFile += "\n"
    }else{
        subpagesFile += arr[0] + " " + arr[1]
        if(arr[2] != undefined){
            subpagesFile += " " + arr[2]
        }
    }
}

fs.writeFileSync(./tests/subpages.txt, subpagesFile)