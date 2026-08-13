### Sporten website repo
[<img alt="Deployed with FTP Deploy Action" src="https://img.shields.io/badge/Deployed With-FTP DEPLOY ACTION-%3CCOLOR%3E?style=for-the-badge&color=0077b6">](https://github.com/SamKirkland/FTP-Deploy-Action)

Marketingsite van [sporten.app](https://sporten.app), gebouwd met [Astro](https://astro.build).

```bash
npm install     # eenmalig
npm run dev     # ontwikkelserver op http://localhost:4321
npm run build   # statische output naar dist/
npm run preview # de gebouwde site lokaal bekijken
```

- Pagina's staan in `src/pages/`, de gedeelde schil (head, nav, footer) in
  `src/layouts/Basis.astro`, herbruikbare blokken in `src/components/`.
- Geen client-side JavaScript: menu, login-keuze en FAQ werken met CSS en
  `<details>`. Dark mode volgt de systeemvoorkeur.
- Ontwerp en definitieve teksten: `design/CONTENT.md` (variant "01 Baan" uit
  `design/mockups/`).
- Deploy: elke push op `main` bouwt de site en synct `dist/` via FTPS naar
  productie (`.github/workflows/main.yml`). Feature-branches deployen niet.
