import { test, expect } from "@playwright/test";
import * as urls from "../urls.json";
import * as headers from "../headers.json";
import * as fs from "fs";

test("homepage has Playwright in title and get started link linking to the intro page", async ({
	page,
}) => {
	await page.on("response", async (response) => {
		const allHeaders = await response.allHeaders();
    const { data } = headers;
    console.log('success');
	//console.log(headers)
    await fs.writeFileSync(
      "headers.json",
      JSON.stringify({
        data: [...data, allHeaders]
      })
    );
	});

	await page.on("requestfailed", async (response) => {
		console.log("requestfailed");
	});

	for await (const data of urls.data) {
		try {
			console.log(data.url)
			await page.goto("https://" + data.url);
		} catch (e) {
			console.log(e);
		}
	}

});
