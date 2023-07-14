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
let subpages_PageNames = new Array();
const urls = fs.readFileSync("./website_1.txt", 'utf-8').split(/\r?\n/);
const subPagesAll_ = fs.readFileSync("./tests/subpages.txt", 'utf-8').split(/\r?\n/);
let subPagesAll = new Array();
const choice = process.argv.splice(2);
let qww1 = 1;
let qww2 = 2;
if(choice[0] == 's'){
    qww1 = 2;
    qww2 = 3;
}
let op = new String();
if (choice[qww1] === "headfull"){
    op = "hf";
}else{
    op = "hl";
}

let waitingTime = choice[qww2]

for(var g of subPagesAll_){
    let arr_ = g.split(/\s/g);
    let text = new String()
    let i = 0;
    let arr_2 = new Array();
    for(var n of arr_){
        if(i > 0){
            let n_i = `${n}§${i}`
            arr_2.push(n_i)
        }else{
            arr_2.push(n)
        }
        i++;
    }
    for(var n of arr_2){
        if(n != arr_2[arr_2.length-1]){
            text += n + " "
        }else{
            text += n
        }
    }
    subPagesAll.push(text)
}

let pagesUN = new Array();
let pages = new Array()
for(var t of urls){
  let page = "";
  let hp = t.split(".")
  for(let i = 0; i < hp.length; i++){
    if(i != hp.length-1){
      page += hp[i]+"-"
    }else{
      page += hp[i]

    }
  }
  pages.push(page)
}
for(let i = 0; i < subPagesAll.length; i++) {
    if(/\s/. test(subPagesAll[i])){
        let p = subPagesAll[i].split(/\s/)[0].split(".")
        let page = p[p.length-1].split("Ahmad")[1]
        if(pages.includes(page)){
            pagesUN.push(page)
        }
    }
}

if(choice[0] == 'h'){
    let array = new Array();
    for(var e of subPagesAll){
        let check = e.split(/\s/g)[0].split("Ahmad")[1]
        for(var t of pagesUN){
            if (t === check){
                array.push([e.split(/\s/g)[0].split("Ahmad")[0], t])

            }
        }

    }
    console.log(array)
    let commandsHomePage = new String();
    for(var g of array){
        commandsHomePage += `node ./commands.js h ${g[1]} ${g[0].replaceAll("&","")} ${op} ${waitingTime}\n`
    }
    fs.writeFileSync(`./tests/HomepagseCommands.txt`, commandsHomePage)

}else if (choice[0] == "s" ){
    
    let arr_ = new Array();
    for(var e of subPagesAll){
        let numberOfSubpages = parseInt(choice[1])
        let check = e.split(/\s/g)[0].split("Ahmad")[1]
        for(var t of pagesUN){
            if (t === check){
                let arr_2 = e.split(/\s/g)
                arr_2.shift()
                for(var n of arr_2){
                    if(numberOfSubpages > 0){
                        arr_.push(n)
                        numberOfSubpages--;
                    }
                }
                
              
            }
        }
       
    }
    let shufflearr = shuffleArray(arr_)
    console.log(shufflearr)
    let commandsSubPage = new String();
    for(var c of shufflearr){
        let g = c.split("Ahmad")
        subpages_PageNames.push(g[1])
        commandsSubPage += `node ./commands.js s ${g[1]} '${g[0]}' ${op} ${waitingTime}\n`
    }
    fs.writeFileSync(`./tests/SubpagseCommands.txt`, commandsSubPage)
    var subpagesNames = new String();
    for(var e of subpages_PageNames){
        if(e != subpages_PageNames[subpages_PageNames.length-1]){
            subpagesNames += e +"\n"
        }else{
            subpagesNames += e 
        }
    }
    fs.writeFileSync(`./tests/SubpagseNames.txt`, subpagesNames)

}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}