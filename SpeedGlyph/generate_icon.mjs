import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 1024 });
  
  await page.setContent(`
    <html>
      <body style="margin: 0; padding: 0; background-color: #1A1A1A;">
        <div style="width: 1024px; height: 1024px; display: flex; align-items: center; justify-content: center; font-family: 'Segoe UI Symbol', 'Arial Unicode MS', sans-serif; font-size: 600px; font-weight: bold; color: #FF5A5F; line-height: 1;">
          &#x230C;
        </div>
      </body>
    </html>
  `);

  await page.screenshot({ path: 'src-tauri/icon_new.png' });
  await browser.close();
  console.log('Icon generated successfully at src-tauri/icon_new.png');
})();
