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
`src/layouts/Juridisch.astro`) én naar het Word-document dat een vereniging
ondertekent. Eén bron, dus de gepubliceerde en de getekende versie kunnen niet uit
elkaar lopen — pas de tekst dus in de Markdown aan en nergens anders.

```bash
pip install --user python-docx                       # eenmalig
python3 bin/maak-word.py src/pages/verwerkersovereenkomst.md
python3 bin/maak-word.py src/pages/subverwerkers.md  # schrijft naar uit/ (untracked)
```

De subverwerkerslijst staat bewust apart van de overeenkomst: die verandert vaker, en
artikel 6 verwijst ernaar zodat een nieuwe subverwerker geen nieuwe handtekening
vraagt. Wijzig je de lijst, hoog dan de versie in de frontmatter op en zet een regel in
de tabel "Overzicht van wijzigingen"; die versie staat ook in de voettekst van het
Word-document. De namen van subverwerkers staan alleen daar — de privacyverklaring
verwijst ernaar en herhaalt ze niet.
