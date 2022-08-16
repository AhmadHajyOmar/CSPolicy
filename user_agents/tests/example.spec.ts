import { test, devices } from "@playwright/test";
import * as fs from "fs";

const playwright = require('@playwright/test')
const uaParser = require('ua-parser-js');



test('Test user agent', async ({}) => {

	var browser = await playwright['chromium'].launch({headless: true});
	const context = await browser.newContext({locale: 'de-Germany'}); // en-US
  	const page = await context.newPage();
	await page.goto('https:///www.netflix.com/browse');
	const ua = await page.evaluate(() => navigator.userAgent);
	const la = await page.evaluate(() => navigator.language);
	var acc_language = uaParser(la);
	const accepted_language = JSON.stringify(acc_language.ua);
	var user_agent = uaParser(ua);
  	const data = JSON.stringify(user_agent);
	const browser_name = user_agent.browser.name;
	const operating_system_name = user_agent.os.name;
	const operating_system_name_version = user_agent.os.version;

	fs.writeFile(`user_agent_widows_${operating_system_name}_${browser_name}_${operating_system_name_version}.json`, data,'utf8', () => {
		console.log(`JSON data is saved for ${operating_system_name}.`);
	});
	fs.writeFile(`user_agent_widows_${operating_system_name}_${browser_name}_language.json`, accepted_language,'utf8', () => {
		console.log(`JSON data is saved for ${operating_system_name}.`);
	});
	await browser.close();
});



/*

test('Test browser user agent ios system 1', async ({}) => {
	  	browser = await playwright['chromium'].launch({headless: true});
	  	
		const ios = devices['iPhone 11 Pro'];
		const context = await browser.newContext({
			...ios,
		});
		const page = await context.newPage();
	  	await page.goto('https://google.com/');
	  	const getUA = await page.evaluate(() => navigator.userAgent);
	  	userAgentInfo = uaParser(getUA);
		console.log(userAgentInfo)
		const data = JSON.stringify(userAgentInfo);

		fs.writeFile('user_agent_ios1.json', data, () => {
			console.log("JSON data is saved.");
		});
	  	const browserName = userAgentInfo.browser.name;
		console.log('browser name:', browserName);
		const osName = userAgentInfo.os.name;
		console.log('os name:', osName);
		await browser.close();
});

test('Test browser user agent ios system 2', async ({}) => {
	browser = await playwright['chromium'].launch({headless: true});
	
  const ios = devices['iPhone 13'];
  const context = await browser.newContext({
	  ...ios,
  });
  const page = await context.newPage();
	await page.goto('https://google.com/');
	const getUA = await page.evaluate(() => navigator.userAgent);
	userAgentInfo = uaParser(getUA);
  console.log(userAgentInfo)
  const data = JSON.stringify(userAgentInfo);

  fs.writeFile('user_agent_ios2.json', data, () => {
	  console.log("JSON data is saved.");
  });
	const browserName = userAgentInfo.browser.name;
  console.log('browser name:', browserName);
  const osName = userAgentInfo.os.name;
  console.log('os name:', osName);
  await browser.close();
});

test('Test browser user agent andriod system', async ({}) => {
	browser = await playwright['chromium'].launch({headless: true});
	
  const pix = devices['Pixel 2'];
  const context = await browser.newContext({
	  ...pix,
  });
  const page = await context.newPage();
	await page.goto('https://google.com/');
	const getUA = await page.evaluate(() => navigator.userAgent);
	userAgentInfo = uaParser(getUA);
  console.log(userAgentInfo)
  const data = JSON.stringify(userAgentInfo);

  fs.writeFile('user_agent_andriod.json', data, () => {
	  console.log("JSON data is saved.");
  });
	const browserName = userAgentInfo.browser.name;
  console.log('browser name:', browserName);
  const osName = userAgentInfo.os.name;
  console.log('os name:', osName);
  await browser.close();
});
*/

//var data : string[] = [];



