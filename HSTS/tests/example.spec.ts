import { test, expect } from "@playwright/test";
import * as fs from "fs";

test("homepage has Playwright in title and get started link linking to the intro page", async ({
	page,
}) => {
	await page.on("response", async (response) => {
	
		const allHeaders = await response.headers();
		console.log(allHeaders)
		console.log("#########################################")
		const csp = JSON.stringify(allHeaders)
		if(csp.includes("content-security-policy")) {
			fs.writeFileSync('hsts.json', csp)
		}
    	
 
	});
	await page.goto("http://facebook.com");

});
