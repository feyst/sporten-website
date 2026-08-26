import type { APIRoute } from 'astro';

// Door de build gegenereerde sitemap. Elke publieke pagina hoort in dit lijstje.
const paginas = ['/', '/privacy/', '/voorwaarden/', '/verwerkersovereenkomst/', '/subverwerkers/'];

export const GET: APIRoute = ({ site }) => {
  const vandaag = new Date().toISOString().slice(0, 10);
  const urls = paginas
    .map(
      (pad) =>
        `  <url>\n    <loc>${new URL(pad, site).href}</loc>\n    <lastmod>${vandaag}</lastmod>\n  </url>`,
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
