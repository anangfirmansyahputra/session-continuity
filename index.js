const puppeteer = require("puppeteer");
const { cookies } = require("./cookies");
const { storage } = require("./localStorage");

const url = "https://app.smartlead.ai/app/email-campaign/all";
// const url = "https://www.coldsire.com/dashboard";
// const url = "https://app.instantly.ai/app/accounts";

(async () => {
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();
    await page.setCookie(...cookies);

    // If we want to use url smartlead, please active this block code
    await page.evaluateOnNewDocument((storage) => {
        storage.forEach((item) => {
          window.localStorage.setItem(item.key, item.value);
        });
    },storage);
    
    await page.goto(url, { waitUntil: "load" });
    const screenshotPath = "screenshot.png";
    await page.screenshot({ path: screenshotPath, fullPage: true });

    const pageTitle = await page.title();
    console.log("Page Title:", pageTitle);

    console.log("Login Success");
    await browser.close();
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    await browser.close();
  }
})();
