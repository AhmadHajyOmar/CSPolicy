import { test, expect, firefox } from "@playwright/test";
const parser = require('./csp_parsing');
const parse = require("content-security-policy-parser");
const Policy = require('csp-parse');
import * as fs from "fs";

let arr = [""]

test("parse", async ({
	page,
}) => {
	await page.on("response", async (response) => {
	
		const allHeaders = await response.headers();
		if(JSON.stringify(allHeaders).includes("content-security-policy") && JSON.stringify(allHeaders).includes("cache-control") && (!arr.includes("done"))) {
			//console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
			//console.log(JSON.stringify(allHeaders))
			arr.push("done")
			//console.log(obj);
			//console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
			let headers_arr = parser.cspParser(allHeaders);
			//console.log(headers_arr);
			let headers = parser.cspParser_GetAllHeaders(headers_arr)
			for( var h of headers) {
				let csp = parser.getHeader(headers_arr, `${h}`)
				console.log(csp)
				let directives = parser.getDirectives(csp)
				console.log(directives)
			}
			
			let script = parser.getDirective_Sources(headers_arr, "report-uri")
			console.log(script)
			//let directive = getDirective("script-src", headers_arr);
			//console.log(directive)

	fs.writeFileSync(`csp.json`, JSON.stringify(allHeaders))
		}
		
		
		const cspParsed = parse(JSON.stringify(allHeaders));
		//console.log(cspParsed)
		//console.log("#########################################")
		//console.log(typeof cspParsed)
		const csp = JSON.stringify(cspParsed)
		//console.log(typeof csp)
		//console.log(csp)
		//console.log(csp.charAt(11))
		//console.log(csp.length)
		//let arr = csp.split(',');
		if(csp.includes("content-security-policy")) {
			//console.log("***************************************************************")
			var policy = new Policy(JSON.stringify(allHeaders))
			//console.log(policy)
			//console.log(typeof policy)
			var s1 = policy.get('script-src')
			//console.log(s1)
		}
		if(csp.includes("content-security-policy")) {
			fs.writeFileSync('cspParsing.json', csp)
		}
		
 
	});
	await page.goto("http:/google.com");
	console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEENNNNNNNNNNNNNNNNNNNNNNNNNNDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
	/*
	console.log(arr.length)
	console.log(arr[0])
	console.log(arr[1])
	console.log(arr[0] === arr[1])
	*/
});








