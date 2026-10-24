// Shared structured data: the organisation and the product with its prices.
// Home and /prijzen/ both describe the same SoftwareApplication; one @id and one
// price list keep them from drifting apart. Prices are VAT-inclusive, per calendar year.

export const organisatie = {
  '@type': 'Organization',
  '@id': 'https://sporten.app/#organisatie',
  name: 'Sporten.app',
  legalName: 'LightMedia',
  url: 'https://sporten.app/',
  logo: 'https://sporten.app/img/icon.png',
  email: 'info@sporten.app',
  telephone: '+31625002228',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Overtoom 19',
    postalCode: '2141 MS',
    addressLocality: 'Waddinxveen',
    addressCountry: 'NL',
  },
  sameAs: [
    'https://play.google.com/store/apps/details?id=app.sporten.app',
    'https://apps.apple.com/nl/app/sporten/id6472296878',
  ],
};

const perJaar = (naam: string, prijs: string, omschrijving: string) => ({
  '@type': 'Offer',
  name: naam,
  description: omschrijving,
  url: 'https://sporten.app/prijzen/',
  priceSpecification: {
    '@type': 'UnitPriceSpecification',
    price: prijs,
    priceCurrency: 'EUR',
    valueAddedTaxIncluded: true,
    unitText: 'jaar',
  },
});

export const aanbiedingen = [
  perJaar('Klein', '149', 'Tot en met 100 leden'),
  perJaar('Vereniging', '299', '101 tot en met 300 leden'),
  perJaar('Groot', '549', '301 tot en met 750 leden'),
  {
    '@type': 'Offer',
    name: 'XL',
    description: 'Vanaf 751 leden, € 0,70 per lid per jaar met een minimum van € 549',
    url: 'https://sporten.app/prijzen/',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '0.70',
      minPrice: '549',
      priceCurrency: 'EUR',
      valueAddedTaxIncluded: true,
      unitText: 'lid per jaar',
    },
  },
];

export const software = {
  '@type': 'SoftwareApplication',
  '@id': 'https://sporten.app/#software',
  name: 'Sporten.app',
  description:
    'Ledenadministratie en boekhouding voor sportverenigingen: leden, contributie en incasso, boekhouding, declaraties en vrijwilligersvergoedingen voor trainers, met een app waarin leden zich inschrijven voor activiteiten.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Android, iOS',
  url: 'https://sporten.app/',
  inLanguage: 'nl',
  author: { '@id': 'https://sporten.app/#organisatie' },
  offers: aanbiedingen,
};
