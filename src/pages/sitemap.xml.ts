import type { APIRoute } from 'astro';
import { execFileSync } from 'node:child_process';

// De sitemap wordt afgeleid uit src/pages en niet met de hand bijgehouden: met
// vijftien pagina's loopt een handmatige lijst gegarandeerd uit de pas.
const bestanden = import.meta.glob('./**/*.astro', { eager: true });

// lastmod is de laatste git-wijziging van het bestand zelf, niet de builddatum.
// Een site die elke dag beweert dat álles is veranderd, wordt op dat signaal
// genegeerd. Zonder git-historie (ondiepe checkout) valt het terug op vandaag —
// vandaar fetch-depth: 0 in de workflows.
const vandaag = new Date().toISOString().slice(0, 10);
function gewijzigdOp(globsleutel: string): string {
  try {
    // De sleutels van import.meta.glob zijn relatief aan dit bestand ('./index.astro');
    // git draait vanuit de projectmap, dus het pad eromheen zetten we hier zelf.
    const pad = `src/pages/${globsleutel.replace(/^\.\//, '')}`;
    const datum = execFileSync('git', ['log', '-1', '--format=%cs', '--', pad], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(datum) ? datum : vandaag;
  } catch {
    return vandaag;
  }
}

// './index.astro' -> '/', './functies/boekhouding.astro' -> '/functies/boekhouding/'
function padVanBestand(bestand: string): string {
  const zonder = bestand.replace(/^\.\//, '').replace(/\.astro$/, '');
  return zonder === 'index' ? '/' : `/${zonder.replace(/\/index$/, '')}/`;
}

export const GET: APIRoute = ({ site }) => {
  const urls = Object.keys(bestanden)
    .map((bestand) => ({ pad: padVanBestand(bestand), gewijzigd: gewijzigdOp(bestand) }))
    .sort((a, b) => a.pad.localeCompare(b.pad))
    .map(
      ({ pad, gewijzigd }) =>
        `  <url>\n    <loc>${new URL(pad, site).href}</loc>\n    <lastmod>${gewijzigd}</lastmod>\n  </url>`,
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
