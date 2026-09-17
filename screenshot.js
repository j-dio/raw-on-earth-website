const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2500));
  await page.screenshot({
    path: 'C:/Users/ADMIN/.gemini/antigravity/brain/67db99b6-0585-4595-b5e6-6fbb9f101189/homepage_screenshot.png',
    fullPage: true
  });
  console.log('Screenshot saved!');
  await browser.close();
})();
