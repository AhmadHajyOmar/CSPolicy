const playwright = require('@playwright/test')
/* import {cspParser, getHeader, cspParser_GetAllHeaders, getDirective_Sources, getDirectives, delete_StrSy, delete_character, getCSP_Policy
} from "./csp_parsing" */
const parser = require('./csp_parsing')
const uaParser = require('ua-parser-js');
const fs = require('fs')
var json_arr = new Array();


let dev = JSON.stringify(playwright.devices)
//console.log(dev)
//console.log("DDDDDDDDDDDDDDDDDDDDD")
dev = dev.substring(1, dev.length-1)
dev = dev.split(/"},/)
//console.log(dev)
let json_chromium = {}
let json_webkit = {}
let json_firefox = {}
let allDeveices = new Array();
for(let i = 0; i <dev.length; i++) {
	let d = dev[i];
	let dev_name= d.substring(0, d.indexOf(':'))
	//console.log(dev_name)
	let dev_ua = d.substring(d.indexOf('{'),d.length-1)
	let dev_ua_json = dev_ua+"}";
	if(d != dev[dev.length-1]) {
		if(dev_ua.endsWith("u")) {
			dev_ua += "m"
		} else if(dev_ua.endsWith("i")) {
			dev_ua += "t"
		} else {
			dev_ua += "x"
		}
		dev_ua = dev_ua.substring(1,dev_ua.length)
		dev_ua = dev_ua + "\""
	} else {
		dev_ua = dev_ua.substring(1, dev_ua.length-1)
	}
	let dev_ua_option = dev_ua.split(",\"viewport\":")
	if(d.includes("screen")) {
		dev_ua_option = [dev_ua_option[0], `"viewport":${dev_ua_option[1].split(",\"screen\":")[0]}`,  `${dev_ua_option[1].split(",\"screen\":")[1]}`, `${dev_ua_option[1].split(",\"screen\":")[1].split(/},/)[1]}`]
		dev_ua_option[2] = `"screen":${dev_ua_option[2].split(",\"screen\":")[0].split(/},/)[0]+"}"}`

	} else {
		dev_ua_option = [dev_ua_option[0], `"viewport":${dev_ua_option[1].split(/},/)[0]}`+"}", `${dev_ua_option[1].split(/},/)[1]}`]

	}
	let dev_arr = dev_ua_option[dev_ua_option.length-1].split(",")
	dev_ua_option.pop()
	for(let j = 0; j<dev_arr.length; j++) {
		dev_ua_option.push(dev_arr[j])
	}
	//dev_ua_option.push(`${dev_ua_option[2].split(",\"screen\":")[1]}`)
/* 	console.log(d)
	console.log(dev_ua_json)
	console.log(dev_ua)
	console.log(dev_ua_option) */
	allDeveices.push([dev_name, dev_ua_option])
	
	if(dev_ua_option[dev_ua_option.length-1].includes("chromium")) {
		json_chromium[dev_name]=dev_ua_json
	} else if(dev_ua_option[dev_ua_option.length-1].includes("webkit")) {
		json_webkit[dev_name]=dev_ua_json
	} else {
		json_firefox[dev_name]=dev_ua_json
	}
}
//console.log(allDeveices)
fs.writeFileSync(`./tests/chromium_dev.json`, JSON.stringify(json_chromium))
fs.writeFileSync(`./tests/webkit_dev.json`, JSON.stringify(json_webkit))
fs.writeFileSync(`./tests/firefox_dev.json`, JSON.stringify(json_firefox))

const input = fs.readFileSync("./tests/urls", 'utf-8')
const urls = input.split(/\r?\n/);

const op = fs.readFileSync("./tests/option", 'utf-8').split(/\r?\n/);
const usedBrowserToTest = fs.readFileSync("./tests/browserToTest", 'utf-8').split(/\r?\n/);


console.log(usedBrowserToTest)


for(var u of urls) {
	let page_name = u.split(".")[0]
	let url = `https://${u}`;
	console.log(url)
	playwright.test(`csp_${u}`, async ({
		page, browserName, viewport, isMobile
	}) => {
		let csp = new Array();
		const getUA = await page.evaluate(() => navigator.userAgent);
		const userAgentInfo= uaParser(getUA);
		let model_name = userAgentInfo.device.model;
		const browserversion = userAgentInfo.browser.version;

		await page.on("response", async (response) => {
			const os = userAgentInfo.os.name
			const os_version = userAgentInfo.os.version;
			if(op.includes(os) && (usedBrowserToTest.includes(userAgentInfo.browser.name) || (userAgentInfo.browser.name === "Android Browser" && usedBrowserToTest.includes(userAgentInfo.engine.name)))) {
				// get browser name
				console.log("§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§")
				console.log(userAgentInfo);
				console.log(userAgentInfo.ua)
				console.log(userAgentInfo.browser);
				console.log(userAgentInfo.browser.name);
			/* 	console.log(model_name)
				console.log(csp.length)
				console.log(viewport)
				console.log(browserName)
				console.log(usedBrowserToTest)
				console.log(usedBrowserToTest.includes(userAgentInfo.browser)) */
				//there is different between userAgentInfo.browser and browserName e.g. Chrome - chromium
				for(var d of allDeveices) {
					let dmn = d[0].substring(1,d[0].length-1)
					//console.log(d[1][1])
					let vp = d[1][1]
					//console.log(vp)
					vp = vp.substring(vp.indexOf(":"), vp.length-1)
					//console.log(vp)
					vp = vp.substring(2,vp.length)
					//console.log(vp)
					let vp_arr = vp.split(",")
					//console.log(vp_arr)
					let vpwidth = vp_arr[0].split(":")[1] * 1
					let vpheight = vp_arr[1].split(":")[1] * 1
					/* console.log(vpwidth)
					console.log(vpheight)
					console.log(viewport.width)
					console.log(viewport.height) */
					if(d[1][0].includes(userAgentInfo.ua.toString())) {
						if(viewport.width === vpwidth && viewport.height === vpheight) {
							/* console.log(vpwidth)
							console.log(vpheight)
							console.log(viewport.width)
							console.log(viewport.height) */
							model_name = dmn
						}
					}
				}
				let allHeaders = await response.headers();
				//console.log(userAgentInfo.browser.name+userAgentInfo.browser.version);
				let headers_arr = parser.cspParser(allHeaders);
				//console.log(headers_arr)
				let headers = parser.cspParser_GetAllHeaders(headers_arr)
				//console.log(headers)
				csp = parser.getCSP_Policy(csp, headers, headers_arr);
				//console.log(csp);
				//let script = parser.getDirective_Sources(headers_arr, "script-src")
				//console.log(script)
				/* if(model_name === "SM-G965U") {
					console.log(JSON.stringify(allHeaders))
					//console.log(csp)
				} */

				if(model_name.endsWith("landscape")) {
					model_name = model_name.substring(0,model_name.indexOf(" landscape"))
				}
				if(os === "Mac OS" || os === "Windows") {
					model_name = `Desktop${os[0]}`
				}
				let fileName = `csp_${model_name}_${browserName}_${browserversion}_${os}_${viewport.height}_${viewport.width}_${os_version}_${page_name}.json`
				let json = {};
				for(let i = 0; i < csp.length; i++) {
					let key = csp[i][0]
					let value = csp[i][1][0];
					json[key] = value;
				} 
				
				//console.log(json)
				fs.writeFileSync(`./tests/${fileName}`, JSON.stringify(json))
			}
		});
		
		await page.goto(url);
		console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEENNNNNNNNNNNNNNNNNNNNNNNNNNDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
	});
}







//fs.writeFileSync("devices.json", JSON.stringify(devices))
//console.log(devices)
//console.log(JSON.stringify(devices))
//arr = ['Galaxy Note 3', 'Galaxy Note 3 landscape', 'Galaxy Note II', 'Galaxy Note II landscape', 'Galaxy Tab S4', 'Galaxy Tab S4 landscape',
//'JioPhone 2', 'JioPhone 2 landscape', 'LG Optimus L70', 'Microsoft Lumia 950 landscape', 'Nexus 5 landscape', 'Nexus 6', 'Nexus 6P','Pixel 2', 'Pixel 2 XL landscape', 'Pixel 4', 'Pixel 4a (5G)', 'Pixel 4a (5G) landscape', 'Pixel 5', 'Moto G4', 'Moto G4 landscape']

//for (var a of arr) {
//	let device = a;
//	test.use({
//		...devices[`${device}`],
		//locale: 'en-US',
		//geolocation: { longitude: 12.492507, latitude: 41.889938 },
		//permissions: ['geolocation'],
//	  })
//}












