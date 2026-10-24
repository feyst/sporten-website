// Maakt de deelafbeeldingen:
//   public/img/og/algemeen.png    uit design/og/og.html (homepage en terugval)
//   public/img/og/<slug>.png      per pagina uit design/og/og-pagina.html + paginas.json
//
//     node design/og/maak-og.cjs && python3 design/og/verklein.py
//
// Playwright staat globaal geïnstalleerd en is bewust geen dependency van deze repo:
// de site zelf heeft hem niet nodig en de deelafbeeldingen maak je een paar keer per jaar.
// Een nieuwe pagina krijgt een eigen afbeelding door hem aan paginas.json toe te voegen;
// zonder vermelding valt de pagina terug op algemeen.png (Basis.astro kiest dat bij het bouwen).
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_PAD ||
  '/home/mark/.nvm/versions/node/v20.9.0/lib/node_modules/playwright');

const wortel = path.resolve(__dirname, '..', '..');
const map = path.join(wortel, 'public', 'img', 'og');
const paginas = JSON.parse(fs.readFileSync(path.join(__dirname, 'paginas.json'), 'utf8'));

// '/functies/contributie/' -> 'functies-contributie' (same rule as Basis.astro)
const slug = (pad) => pad.replace(/^\/|\/$/g, '').replace(/\//g, '-');

(async () => {
  fs.mkdirSync(map, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

  await page.goto('file://' + path.join(__dirname, 'og.html'), { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(map, 'algemeen.png') });
  console.log('geschreven: public/img/og/algemeen.png');

  for (const p of paginas) {
    const q = new URLSearchParams({ label: p.label, kop: p.kop, sub: p.sub, adres: 'sporten.app/' + p.pad });
    await page.goto('file://' + path.join(__dirname, 'og-pagina.html') + '?' + q, { waitUntil: 'networkidle' });
    const doel = path.join(map, slug(p.pad) + '.png');
    await page.screenshot({ path: doel });
    console.log('geschreven: public/img/og/' + slug(p.pad) + '.png');
  }
  await browser.close();
})();
