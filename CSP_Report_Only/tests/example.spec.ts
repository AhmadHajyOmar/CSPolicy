import { test, expect } from "@playwright/test";
import * as fs from "fs";

test("homepage has Playwright in title and get started link linking to the intro page", async ({
	page,
}) => {
	await page.on("response", async (response) => {
	
		const allHeaders = await response.allHeaders();
		console.log(allHeaders)
		console.log("#########################################")
		const csp = JSON.stringify(allHeaders)
		if(csp.includes("report-uri")) {
			fs.writeFileSync('csp_report_uri.json', csp)
		}
    	
 
	});
	await page.goto("https://www.instagram.com");

});
