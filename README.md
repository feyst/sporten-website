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

#### Juridische pagina's

`verwerkersovereenkomst.md` en `subverwerkers.md` in `src/pages/` zijn Markdown in
plaats van Astro, omdat diezelfde tekst twee kanten op moet: naar de website (via
`src/layouts/Juridisch.astro`) én naar de pdf die een vereniging krijgt toegestuurd.
Eén bron, dus de gepubliceerde en de verstuurde versie kunnen niet uit elkaar lopen —
pas de tekst dus in de Markdown aan en nergens anders.

De pdf's in `public/documenten/` worden met chromium van de gebouwde pagina's gedrukt.
Wat er wel en niet op papier komt, staat in het `@media print`-blok in `global.css`;
de navigatie, de voettekst en de downloadknop vallen daar weg.

```bash
npm run build
npx astro preview --port 4399                        # in een tweede terminal
npx -y playwright@latest pdf http://localhost:4399/verwerkersovereenkomst/ public/documenten/verwerkersovereenkomst.pdf
npx -y playwright@latest pdf http://localhost:4399/subverwerkers/ public/documenten/subverwerkers.pdf
```

**Wijzig je de tekst, druk de pdf dan opnieuw** — hij staat in git en volgt niet
vanzelf. De versie staat in beide, dus een verschil is zichtbaar.

De subverwerkerslijst staat bewust apart van de overeenkomst: die verandert vaker, en
artikel 7 verwijst ernaar zodat een nieuwe subverwerker geen nieuw akkoord vraagt.
Wijzig je de lijst, hoog dan de versie in de frontmatter op en zet een regel in de
tabel "Overzicht van wijzigingen". Hele getallen, geen minor-versies: dit is een
document en geen bibliotheek. De namen van subverwerkers staan alleen op die pagina —
de privacyverklaring verwijst ernaar en herhaalt ze niet.

Een subverwerker die eraan komt maar nog niet in gebruik is, hoort onder het kopje
**Aangekondigd**: de meldingstermijn van 30 dagen uit artikel 7 gaat dan meteen lopen,
zodat er bij ingebruikname geen tweede ronde langs alle verenigingen nodig is.
