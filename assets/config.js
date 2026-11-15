/* ANON Credential Hub settings.
   This is the only file you need to touch to change names, categories, colours or wording. */
var AGF_CONFIG = {
  orgName: 'ANON Global Foundation',
  orgShort: 'AGF',
  hubName: 'ANON Credential Hub',

  // Shown at the bottom of the public page. Leave '' to hide.
  footerText: '',

  // Optional: your website, linked from the header logo. Leave '' for none.
  orgWebsite: '',

  // Certificate categories. `code` becomes the middle part of the ID, e.g. AGF-2026-INT-7K3Q9X.
  // `theme` is the colour theme the admin page picks automatically for that category (you can still change it).
  // To add a new vertical later, copy a line and give it a new 3-letter code.
  categories: [
    { code: 'INT', label: 'Internship', theme: 'classic' },
    { code: 'EDF', label: "Educators' Fellowship", theme: 'midnight' },
    { code: 'SPK', label: 'Speaker / Guest', theme: 'classic' },
    { code: 'SCH', label: 'School / Institution', theme: 'gold' },
    { code: 'WRK', label: 'Workshop / Training', theme: 'navy' },
    { code: 'EVT', label: 'Event / Competition', theme: 'lavender' },
    { code: 'VOL', label: 'Volunteering / Leadership', theme: 'emerald' },
    { code: 'GEN', label: 'Other', theme: 'classic' }
  ],

  // Colour themes for the certificate card and the share sticker.
  //   dark:    true  = dark background, the white logo (assets/logo-white.png) is used
  //            false = light background, the colour logo (assets/logo.png) is used
  //   bg:      background colours, top to bottom        band: colours of the programme strip, left to right
  //   ink:     normal text     accent: name and highlights     title: the word CERTIFICATE     frame: outer border
  // To add a theme, copy a line, give it a new code and change the colours.
  themes: [
    { code: 'classic', label: 'White with blue & red', dark: false, bg: ['#ffffff', '#f3f6fc'], ink: '#1b2233', accent: '#e2302c', title: '#24407f', band: ['#e2302c', '#e2302c'], bandInk: '#ffffff', frame: '#24407f' },
    { code: 'midnight', label: 'Black & gold', dark: true, bg: ['#1c1c1c', '#050505'], ink: '#f4f1e8', accent: '#e3c06a', title: '#ffffff', band: ['#a67c1e', '#f1d684', '#a67c1e'], bandInk: '#171204', frame: '#c9a544' },
    { code: 'gold', label: 'Cream & gold', dark: false, bg: ['#f1d58f', '#fbeec3', '#edcf85'], ink: '#17140c', accent: '#6b4e0c', title: '#17140c', band: ['#111111', '#111111'], bandInk: '#f6dc8e', frame: '#8a6a1c' },
    { code: 'navy', label: 'Navy blue & red', dark: true, bg: ['#22408a', '#0e1d45'], ink: '#eef2fb', accent: '#ffd27a', title: '#ffffff', band: ['#c8221f', '#ef3b36', '#c8221f'], bandInk: '#ffffff', frame: '#e2302c' },
    { code: 'emerald', label: 'Green & gold', dark: true, bg: ['#11634a', '#052e1e'], ink: '#eef7f0', accent: '#f0cf73', title: '#ffffff', band: ['#b88a2a', '#f3da8c', '#b88a2a'], bandInk: '#10230f', frame: '#d2ae55' },
    { code: 'lavender', label: 'Lavender & purple', dark: false, bg: ['#faf6ff', '#e4d6fb'], ink: '#231a3a', accent: '#6a2fb5', title: '#3b1f78', band: ['#5b2aa0', '#8a4fd0'], bandInk: '#ffffff', frame: '#5b2aa0' }
  ],

  // Line printed on the share sticker, next to the QR code.
  verifiedLine: 'Validated by ANON Global Foundation',

  // Caption suggested when a recipient posts on LinkedIn (they can edit it before posting).
  // {certificate} {program} {org} {id} {link} {name} are filled in automatically.
  shareCaption:
    'Proud to share my {certificate} from {org} for {program}! 🎉\n\n' +
    'This is more than a certificate. It is a verified credential: {org} validates every certificate it issues, ' +
    'and anyone can confirm mine in seconds.\n\n' +
    '✅ Verify it here: {link}\n' +
    '🆔 Certificate ID: {id}\n\n' +
    '#ANONGlobalFoundation #VerifiedCredential #SpreadingHappiness',

  // Suggestions offered in the "Certificate title" box on the admin page.
  certificateTitles: [
    'Certificate of Recognition',
    'Certificate of Appreciation',
    'Certificate of Completion',
    'Certificate of Participation'
  ]
};
