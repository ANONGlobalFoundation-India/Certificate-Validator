/* ANON Credential Hub settings.
   This is the only file you need to touch to change names, categories or wording. */
var AGF_CONFIG = {
  orgName: 'ANON Global Foundation',
  orgShort: 'AGF',
  hubName: 'ANON Credential Hub',

  // Shown at the bottom of the public page. Leave '' to hide.
  footerText: '',

  // Optional: your website, linked from the header logo. Leave '' for none.
  orgWebsite: '',

  // Certificate categories. `code` becomes the middle part of the ID, e.g. AGF-2026-INT-7K3Q9X.
  // To add a new vertical later, copy a line and give it a new 3-letter code.
  categories: [
    { code: 'INT', label: 'Internship' },
    { code: 'EDF', label: "Educators' Fellowship" },
    { code: 'SPK', label: 'Speaker / Guest' },
    { code: 'SCH', label: 'School / Institution' },
    { code: 'WRK', label: 'Workshop / Training' },
    { code: 'EVT', label: 'Event / Competition' },
    { code: 'VOL', label: 'Volunteering / Leadership' },
    { code: 'GEN', label: 'Other' }
  ],

  // Colour themes for the on-screen certificate card (styles live in assets/style.css).
  themes: [
    { code: 'classic', label: 'White with blue & red' },
    { code: 'midnight', label: 'Black & gold' },
    { code: 'gold', label: 'Cream & gold' }
  ],

  // Suggestions offered in the "Certificate title" box on the admin page.
  certificateTitles: [
    'Certificate of Recognition',
    'Certificate of Appreciation',
    'Certificate of Completion',
    'Certificate of Participation'
  ]
};
