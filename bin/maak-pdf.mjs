// Drukt de juridische pagina's naar pdf in public/documenten/.
//
// De pdf's staan in git en volgen niet vanzelf: wijzig je een van de Markdown-
// bestanden, draai dit dan opnieuw. Zie de README.
//
//   npm run build
//   npx astro preview --port 4399     # in een tweede terminal
//   npm run pdf
//
// Waarom een script en niet `npx playwright pdf`: die CLI kent geen marges en geen
// paginanummers. Marges zouden nog met `@page` in de CSS kunnen, maar Chromium
// ondersteunt geen CSS-paginanummers (de margin-boxen uit Paged Media), en zonder
// paginanummer kun je in een overeenkomst niet naar een bladzijde verwijzen.

import { chromium } from 'playwright';

const BASIS = process.env.PDF_BASIS ?? 'http://localhost:4399';

const documenten = [
  { pad: 'verwerkersovereenkomst', naam: 'Verwerkersovereenkomst' },
  { pad: 'subverwerkers', naam: 'Subverwerkers' },
  { pad: 'voorwaarden', naam: 'Gebruiksvoorwaarden' },
  { pad: 'privacy', naam: 'Privacyverklaring' },
];

// Chromium rendert deze sjablonen los van de pagina: geen stylesheet, en zonder
// expliciete font-size krijg je 8px. De klassen pageNumber en totalPages vult
// Chromium zelf in.
const voettekst = (links) => `
  <div style="width:100%;margin:0 20mm;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;
              font-size:8pt;color:#777;display:flex;justify-content:space-between;">
    <span>${links}</span>
    <span>Pagina <span class="pageNumber"></span> van <span class="totalPages"></span></span>
  </div>`;

const browser = await chromium.launch();
const page = await browser.newPage();

for (const { pad, naam } of documenten) {
  const url = `${BASIS}/${pad}/`;
  const antwoord = await page.goto(url, { waitUntil: 'networkidle' });
  if (!antwoord?.ok()) {
    throw new Error(`${url} gaf ${antwoord?.status()} — draait de preview-server?`);
  }

  // "Versie 4 — 28 augustus 2026." → "versie 4"
  const versieregel = await page.$eval('.versie', (el) => el.textContent.trim());
  const versie = (versieregel.match(/Versie\s+(\S+)/i) ?? [, '?'])[1];

  await page.pdf({
    path: `public/documenten/${pad}.pdf`,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: voettekst(`Sporten.app — ${naam}, versie ${versie}`),
    margin: { top: '18mm', bottom: '20mm', left: '20mm', right: '20mm' },
  });
  console.log(`${pad}.pdf — versie ${versie}`);
}

await browser.close();
