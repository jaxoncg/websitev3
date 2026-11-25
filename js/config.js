/* =====================================================================
   JAXON G PHOTOGRAPHY - SITE CONFIGURATION
   This is the ONE file you edit for most changes. Anything marked
   "REPLACE" is a placeholder. Empty strings ('') hide that item.
   ===================================================================== */
window.SITE_CONFIG = {

  /* ---- 1. BUSINESS + CONTACT (REPLACE the email, phone optional) ---- */
  business: {
    name: 'Jaxon G Photography',
    domain: 'https://jaxongphotography.com',
    tagline: 'Photography that holds the moment.',
    email: 'REPLACE-ME@example.com',   // REPLACE with your real inquiry email
    phone: '',                          // optional, e.g. '(859) 555-0100'
    /* ---- 2. SERVICE AREA (used in footer + SEO text; edit freely) ---- */
    serviceArea: 'Monticello, KY and nearby'
  },

  /* ---- 3. SOCIAL LINKS (paste full profile URLs; '' hides the link) ---- */
  socials: {
    Instagram: '',
    Facebook: '',
    TikTok: '',
    YouTube: ''
  },

  /* ---- 4. LOGO (drop your file in assets/logo/ and set src) ---------
     A starter logo is set below (assets/logo/). If src is empty, a text placeholder is shown.   */
  logo: { src: 'assets/logo/logo-dark.svg', width: 170, height: 60 },   // swap for your own file any time

  /* ---- 5. INQUIRY FORM -----------------------------------------------
     Option A (recommended): create a free form at formspree.io and paste
     the form ID (the part after /f/). Option B: leave it '' and the form
     falls back to opening the visitor's email app (mailto).            */
  form: { formspreeId: '' },

  /* ---- 6. SERVICES (image = id from PORTFOLIO below) ---------------- */
  services: [
    { id: 'sports',     title: 'Sports',     image: 'p1', blurb: 'Peak action, team moments, and season-long coverage for athletes and families.' },
    { id: 'portrait',   title: 'Portrait',   image: 'p2', blurb: 'Natural, confident portraits for seniors, families, and individuals.' },
    { id: 'event',      title: 'Event',      image: 'p3', blurb: 'Parties, performances, and gatherings captured as they unfold.' },
    { id: 'commercial', title: 'Commercial', image: 'p4', blurb: 'Headshots, products, and brand imagery for local businesses.' },
    { id: 'wedding',    title: 'Wedding',    image: 'p5', blurb: 'Honest, unhurried coverage from getting ready to the last dance.' }
  ],

  /* ---- 7. PRICING --------------------------------------------------
     confirmed:true  = your real rate.  confirmed:false = SUGGESTED price
     that the site labels "Suggested pricing". Edit, then set to true.  */
  pricing: {
    portrait: [
      { name: 'Mini',      price: 40, from: false, time: '30 minutes',  confirmed: true, desc: 'A quick session for one look.',          inc: ['1 location', 'Edited digital gallery'] },
      { name: 'Standard',  price: 55, from: false, time: '1 hour',      confirmed: true, desc: 'Time for outfit changes and variety.',   inc: ['1 location', 'Edited digital gallery'] },
      { name: 'Extended',  price: 75, from: false, time: '2 hours',     confirmed: true, desc: 'Relaxed pacing and plenty of options.',  inc: ['1 location', 'Edited digital gallery'] },
      { name: 'Tour',      price: 90, from: false, time: '2 hours, 3 locations', confirmed: true, desc: 'Three settings, three different looks.', inc: ['3 locations', 'Edited digital gallery'] }
    ],
    sports: [
      { name: 'Game Day',   price: 85,  from: false, time: 'One game',        confirmed: false, desc: 'Action coverage of a single game.',        inc: ['Up to 2 hours on site', 'Edited action gallery', 'Online delivery'] },
      { name: 'Tournament', price: 175, from: false, time: 'Full day',        confirmed: false, desc: 'Every game and moment of a tournament.',   inc: ['Up to 8 hours on site', 'Team and individual shots', 'Online delivery'] },
      { name: 'Season',     price: 400, from: true,  time: 'Multiple games',  confirmed: false, desc: 'Coverage built around your season.',       inc: ['Several games', 'Team photo day', 'Online delivery'] }
    ],
    event: [
      { name: 'Quick Coverage', price: 120, from: false, time: '1 hour',    confirmed: false, desc: 'Key moments from a short event.',       inc: ['Edited gallery', 'Online delivery'] },
      { name: 'Full Event',     price: 200, from: false, time: '2 hours',   confirmed: false, desc: 'Complete coverage of most events.',     inc: ['Edited gallery', 'Online delivery'] },
      { name: 'Half Day',       price: 350, from: false, time: '4 hours',   confirmed: false, desc: 'Longer events and multi-part days.',    inc: ['Edited gallery', 'Online delivery'] }
    ],
    commercial: [
      { name: 'Headshot',  price: 90,  from: false, time: '30 minutes', confirmed: false, desc: 'Professional headshots for one person.',   inc: ['2 edited finals', 'Online delivery'] },
      { name: 'Business',  price: 250, from: true,  time: '2 hours',    confirmed: false, desc: 'Team, space, or product photography.',     inc: ['Edited gallery', 'Commercial usage'] },
      { name: 'Brand',     price: 450, from: true,  time: 'Half day',   confirmed: false, desc: 'A full set of imagery for your brand.',    inc: ['Planned shot list', 'Edited gallery', 'Commercial usage'] }
    ],
    wedding: [
      { name: 'Elopement', price: 600,  from: true, time: '2 hours', confirmed: false, desc: 'Intimate ceremonies and small gatherings.', inc: ['Edited gallery', 'Online delivery'] },
      { name: 'Half Day',  price: 1100, from: true, time: '5 hours', confirmed: false, desc: 'Ceremony, portraits, and the first hours.', inc: ['Edited gallery', 'Online delivery', 'Print release'] },
      { name: 'Full Day',  price: 1800, from: true, time: '8 hours', confirmed: false, desc: 'From getting ready to the last dance.',     inc: ['Edited gallery', 'Online delivery', 'Print release'] }
    ]
  },

  /* ---- 8. PORTFOLIO ---------------------------------------------------
     Add your photos to assets/images/ and fill in each src, e.g.
     src: 'assets/images/game-winner.jpg'. Keep w/h as the real pixel size
     (prevents layout shift). While src is '' a labeled frame shows.
     shape: 'tall' | 'wide' | 'square' controls the grid crop.          */
  portfolio: [
    { id: 'p1',  src: 'https://i.postimg.cc/DfQQsZMS/WNU6433.jpg', w: 1600, h: 1067, shape: 'wide',   category: 'Sports',     alt: 'Replace: athlete mid-action' },
    { id: 'p2',  src: '', w: 1067, h: 1600, shape: 'tall',   category: 'Portrait',   alt: 'Replace: portrait photo' },
    { id: 'p3',  src: '', w: 1600, h: 1067, shape: 'wide',   category: 'Event',      alt: 'Replace: event moment' },
    { id: 'p4',  src: '', w: 1200, h: 1200, shape: 'square', category: 'Commercial', alt: 'Replace: business or product photo' },
    { id: 'p5',  src: '', w: 1067, h: 1600, shape: 'tall',   category: 'Wedding',    alt: 'Replace: wedding photo' },
    { id: 'p6',  src: '', w: 1200, h: 1200, shape: 'square', category: 'Sports',     alt: 'Replace: sports photo' },
    { id: 'p7',  src: '', w: 1600, h: 1067, shape: 'wide',   category: 'Portrait',   alt: 'Replace: portrait photo' },
    { id: 'p8',  src: '', w: 1067, h: 1600, shape: 'tall',   category: 'Event',      alt: 'Replace: event photo' },
    { id: 'p9',  src: '', w: 1200, h: 1200, shape: 'square', category: 'Wedding',    alt: 'Replace: wedding photo' },
    { id: 'p10', src: '', w: 1600, h: 1067, shape: 'wide',   category: 'Commercial', alt: 'Replace: commercial photo' }
  ]
};
