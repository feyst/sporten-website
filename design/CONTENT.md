# Content en structuur — vernieuwde website sporten.app

Ticket: #88. Dit document is de bron voor de herbouw (#89): paginastructuur, definitieve
teksten, koppenhiërarchie, alt-teksten en zoektermen. De mockups in `design/mockups/`
visualiseren deze content in verschillende ontwerprichtingen.

Besluiten die hieronder verwerkt zijn (zie het ticket): clubs werven staat voorop, leden
vinden "Inloggen" rechtsboven; er is géén prijssectie — contact is de call-to-action;
beeldmateriaal is SVG-illustratie plus gestileerde app-frames tot er echte screenshots
zijn (#60).

## Paginastructuur

| Pagina | URL | Doel | Zoektermen |
|---|---|---|---|
| Home | `/` | Clubs overtuigen, leden doorsturen naar de app | ledenadministratie sportclub, sportvereniging app, sportclub administratie software, activiteiten inschrijving sportvereniging, clubadministratie app |
| Privacy | `/privacy` | Bestaande privacyverklaring (migreren, niet herschrijven) | geen — `noindex` is niet nodig, maar de pagina mikt op niets |

De home blijft een one-pager met secties; de navigatie verwijst met ankers. `/privacy`
moet blijven bestaan op exact die URL (staat in de app en mogelijk in de stores).
Juridische pagina's komen later (#92).

## Navigatie (beide pagina's)

Functies · Hoe het werkt · Vragen · Contact · Privacy · **Inloggen ▾**

"Inloggen" is één uitklapknop met twee duidelijk benoemde bestemmingen, zodat de bezoeker
op rol kiest in plaats van op systeemnaam ("Portaal" naast "Inloggen" bleek verwarrend —
beide zijn logins):

- **Voor leden — open de app** → `https://app.sporten.app`
- **Voor bestuur — beheerportaal** → `https://portal.sporten.app`

Op mobiel klapt de volledige navigatie uit achter een hamburgerknop (CSS-only, geen
JavaScript); er verdwijnen geen menu-opties meer.

## Dark mode

De site volgt automatisch de systeemvoorkeur via `prefers-color-scheme` (`color-scheme:
light dark`). Elke variant heeft een licht én donker palet; de huisstijlkleuren
`#f4511e`/`#40e0d0` blijven in beide gelijk.

## Koppenhiërarchie home

Eén `<h1>`, daarna alleen `<h2>` voor secties en `<h3>` voor kaarten/stappen — geen
niveaus overslaan:

```
h1  Ledenadministratie voor uw sportclub
├── h2  Alles voor uw club in één app
│   ├── h3  Activiteitenagenda
│   ├── h3  Inschrijvingen
│   ├── h3  Clubchat
│   ├── h3  Meldingen
│   ├── h3  Ledenbeheer
│   └── h3  Voor het hele gezin
├── h2  Hoe het werkt
│   ├── h3  1. Uw club aangemeld
│   ├── h3  2. Leden nodigen zichzelf uit
│   └── h3  3. Activiteiten lopen vanzelf
├── h2  Voor uw leden
└── h2  Neem contact op
```

## Teksten

### Hero

> **h1:** Ledenadministratie voor uw sportclub
>
> Sporten.app regelt activiteiten, inschrijvingen en communicatie voor sportverenigingen.
> Uw leden zien in één app wat er te doen is en melden zich met één tik aan — u houdt
> als bestuur moeiteloos overzicht.
>
> **CTA primair:** Neem contact op → `#contact`
> **CTA secundair:** Bekijk de functies → `#functies`

### Functies (h2: Alles voor uw club in één app)

Intro: Geen losse mailtjes, appgroepen en spreadsheets meer — alles wat uw vereniging
dagelijks nodig heeft zit in één app, voor bestuur, trainers en leden.

| h3 | Tekst |
|---|---|
| Activiteitenagenda | Trainingen, wedstrijden en clubactiviteiten in één overzicht, met locatie, tijd en beschikbare plekken. |
| Inschrijvingen | Leden melden zich met één tik aan of af. U ziet direct wie er komt en hoeveel plek er nog is. |
| Clubchat | Per activiteit of groep een eigen kanaal. Vragen, afmeldingen en updates blijven bij de activiteit — niet in tien appgroepen. |
| Meldingen | Training afgelast door het weer? Eén bericht van de trainer en iedereen weet het meteen. |
| Ledenbeheer | Het bestuur beheert leden, rollen en gegevens in een eigen beheerportaal — veilig en AVG-proof. |
| Voor het hele gezin | Ouders melden hun kinderen aan vanaf hun eigen account. Eén login voor het hele gezin. |

### Storeknoppen

In de sectie "Voor uw leden" staan twee badge-knoppen met de echte store-vermeldingen:

- **Google Play** — "Ontdek het op Google Play" → https://play.google.com/store/apps/details?id=app.sporten.app
- **App Store** — "Download in de App Store" → https://apps.apple.com/nl/app/sporten/id6472296878

### Hoe het werkt (h2)

| h3 | Tekst |
|---|---|
| 1. Uw club aangemeld | Wij richten de omgeving voor uw vereniging in en zetten het beheerportaal klaar voor het bestuur. |
| 2. Leden nodigen zichzelf uit | Leden maken een account met hun e-mailadres en staan direct in de ledenlijst van uw club. |
| 3. Activiteiten lopen vanzelf | Trainers zetten activiteiten klaar, leden schrijven zich in, en iedereen ziet hetzelfde overzicht. |

### Voor uw leden (h2)

> Al lid van een club die Sporten.app gebruikt? Log in en u staat direct in de agenda
> van uw vereniging. De app werkt in de browser op elk toestel en staat als app in
> Google Play en de App Store.
>
> **CTA:** Inloggen in de app → `https://app.sporten.app`

### Veelgestelde vragen (h2: Vragen, `<details>`-accordeon zonder JavaScript)

| Vraag (h3 in `<summary>`) | Antwoord |
|---|---|
| Wat kost Sporten.app? | Dat hangt af van de grootte van uw vereniging. Neem contact op, dan kijken we samen wat past. |
| Werkt de app op iPhone en Android? | Ja. De app werkt in de browser op elk toestel en staat als app in Google Play en de App Store. |
| Hoe komen onze leden in de app? | Leden maken zelf een account met hun e-mailadres en staan daarna direct in de ledenlijst van uw club. |
| Kunnen ouders hun kinderen aanmelden? | Ja. Ouders melden hun kinderen aan vanaf hun eigen account — één login voor het hele gezin. |
| Hoe zit het met privacy? | Uw ledengegevens zijn alleen zichtbaar binnen uw club en worden nooit gedeeld of verkocht. Zie de privacyverklaring. |

### Contact (h2: Neem contact op)

> Benieuwd wat Sporten.app voor uw vereniging kan betekenen, of heeft u een vraag over
> de app? Stuur een bericht of app — u krijgt altijd persoonlijk antwoord.
>
> - E-mail: info@sporten.app
> - WhatsApp / telefoon: +31 6 25 00 22 28

Het postadres staat niet op de site — irrelevant voor een app en onnodig persoonlijk.
Het contactformulier van de huidige site (mailto-constructie) vervalt; directe
contactlinks werken op elk toestel en er is geen backend nodig.

### Footer

> © {jaar} Sporten.app · Privacy · GitHub

## Beeldmateriaal en alt-teksten

Alle beelden zijn inline SVG (licht, scherp op elk scherm, geen externe requests).
Decoratieve vormen krijgen `aria-hidden="true"` en géén alt-tekst; betekenisdragende
beelden krijgen de alt-teksten hieronder.

| Beeld | Waar | Alt-tekst |
|---|---|---|
| Telefoon-frame met activiteitenlijst | Hero | "Schermweergave van de Sporten.app-agenda met drie activiteiten en aanmeldknoppen" |
| Triathlon-illustratie (zwemmen, fietsen, lopen) | Sectiescheiding | "Illustratie van een zwemmer, wielrenner en hardloper" |
| Telefoon-frame met chatgesprek | Voor uw leden | "Schermweergave van de clubchat in Sporten.app" |

Wanneer echte app-screenshots beschikbaar komen (#60, na de visuele overhaul #32),
vervangen die de gestileerde frames; de alt-teksten beschrijven dan het echte scherm.

## Wat bewust ontbreekt

- **Prijssectie** — besluit bij dit ticket: geen prijzen op de site; contact is de CTA.
- **Google Fonts, Maps-embed** — systeemfonts, geen kaart; geen externe requests die
  IP-adressen doorgeven (AVG, V6 van het epic; raakt #92).
- **Postadres** — irrelevant voor een app en onnodig persoonlijk; contact loopt via
  e-mail en WhatsApp/telefoon. Alleen de privacyverklaring noemt het vestigingsadres
  van de verwerkingsverantwoordelijke: Overtoom 19, 2141 MS Waddinxveen (sinds
  augustus 2026; voorheen Veenkade 28).
- **Referenties/klantlogo's** — er is nog geen klant die dat toestaat; toevoegen zodra
  dat kan.
