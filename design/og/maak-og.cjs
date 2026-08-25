// Maakt public/img/og.png uit design/og/og.html.
//
//     node design/og/maak-og.cjs
//
// Playwright staat globaal geïnstalleerd en is bewust geen dependency van deze repo:
// de site zelf heeft hem niet nodig en de deelafbeelding maak je een paar keer per jaar.
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_PAD ||
  '/home/mark/.nvm/versions/node/v20.9.0/lib/node_modules/playwright');

const wortel = path.resolve(__dirname, '..', '..');
const bron = 'file://' + path.join(__dirname, 'og.html');
const doel = path.join(wortel, 'public', 'img', 'og.png');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(bron, { waitUntil: 'networkidle' });
  await page.screenshot({ path: doel });
  await browser.close();
  console.log('geschreven: ' + doel);
})();
