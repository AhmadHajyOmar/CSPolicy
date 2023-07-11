const fs = require('fs')
const subpages = fs.readFileSync("./subpages.txt", 'utf-8').split(/\r?\n/);
const urls = fs.readFileSync("./tests/urls", 'utf-8').split(/\r?\n/);

var subpagesFile = new String()
for(var u of urls){
    let darr = u.split(".")
    let domainName = new String()
    for(var d of darr){
        if(d != darr[darr.length-1]){
            domainName += d+"-"
        }else{
            domainName += d
        }
    }
    for(var sp of subpages){
        let arr = sp.split(/\s/g)
        let url = arr[0]
        console.log(domainName)
        if(url.split("Ahmad")[1] === domainName){
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
            break;
        }

    }
}


fs.writeFileSync(./tests/subpages.txt, subpagesFile)