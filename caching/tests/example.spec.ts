import { test, expect } from "@playwright/test";
import * as fs from "fs";

let i = 0;
let j = 0;
test("homepage has Playwright in title and get started link linking to the intro page", async ({
	page,
}) => {
	await page.on("response", async (response) => {
	
		const allHeaders = await response.headers();
		//console.log(allHeaders)
		//console.log("#########################################")
		const csp = JSON.stringify(allHeaders);
		const allHeaders2  = await response.request().allHeaders();
		const ua = JSON.stringify(allHeaders2);

		
		if(csp.includes("cache-control")) {
			if(ua.includes("iPhone")) {
				fs.writeFileSync(`caching_Mobile Safari_cach.json`, csp)
			}
		
			if(ua.includes("Windows")) {
				fs.writeFileSync(`caching_Desktop Chrome_Windows_cach.json`, csp)
			}
		}
		
		
	
		
		
    	
 
	});
	await page.goto("https://www.instagram.com");

});


