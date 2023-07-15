const fs = require('fs');

const urls = fs.readFileSync("./website_1.txt", 'utf-8').split(/\r?\n/);
const commands = fs.readFileSync("./tests/HomepagseCommands.txt", 'utf-8').split(/\r?\n/);

let web = new Array();
for(var e of urls){
    web.push(e.replaceAll(".","-"))
}
console.log(web)

let commandStr = new String();
for(var e of web){
    for(var f of commands){
        let fsplit = f.split(/\s/g)
        if(fsplit[3] === e){
            commandStr += f+"\n";
        }
    }
}

fs.writeFileSync(`./tests/HomepagseCommands.txt`, commandStr)
