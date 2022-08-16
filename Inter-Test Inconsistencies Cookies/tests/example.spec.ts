import { test, devices } from "@playwright/test";
import * as fs from "fs";
const puppeteer = require('puppeteer');

test('Test browser cookies ios ', async ({}) => {
	const browser = await puppeteer.launch({headless: false})
	
	const ios = puppeteer.devices['iPhone X'];
	const context = await browser.createIncognitoBrowserContext({
		...ios,
	});
	const page = await context.newPage();
	await page.emulate(ios);
	await page.goto('https://tiktok.com');
	const cookies = await page.cookies();
  	const data = JSON.stringify(cookies);
	fs.writeFileSync(`cookies_firefox_ios.json`, data)
	console.log(await browser.userAgent());
	//await browser.close();
});

test('Test browser cookies windows ', async ({}) => {
	const browser = await puppeteer.launch({headless: true})
	const page = await browser.newPage();
	await page.goto('https://tiktok.com');
	const cookies = await page.cookies();
  	const data = JSON.stringify(cookies);
	fs.writeFileSync(`cookies_firefox_windows.json`, data)
	//const userAgent = await page.evaluate(() => navigator.userAgent );
    //console.log(userAgent);

	await browser.close();
});
