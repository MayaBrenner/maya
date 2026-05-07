// Home Again — sample data
// Sellers grouped, reviews, city-based search.

window.HA_SELLERS = {
  'maya': {
    id: 'maya',
    name: 'Lynne Itelson', initials: 'LI', bg: '#8FA6EC', role: 'seller', avatar: 'assets/lynne-avatar.png',
    from: 'Tel Aviv', to: 'Berlin', moveDate: 'Mar 28',
    area: 'Florentin, Tel Aviv', city: 'Tel Aviv',
    bio: 'Closing the chapter on a four-year stretch in Tel Aviv. Heading to Berlin at the end of March — clearing out the apartment by then.',
    memberSince: 2023, rating: 5, reviewCount: 12, soldCount: 43, avgReply: '~2h',
    bundlePrice: 4200, bundleSavings: 380,
    bundleNote: 'Whole-apartment bundle — sofa, lamp, dining table, two chairs, rug. One pickup, one price.',
  },
  'daniel': {
    id: 'daniel',
    name: 'Daniel Ofir', initials: 'DO', bg: '#8FA6EC', role: 'seller',
    from: 'Tel Aviv', to: 'NYC', moveDate: 'Apr 4',
    area: 'Neve Tzedek, Tel Aviv', city: 'Tel Aviv',
    bio: 'Wrapping up two years in Israel before heading back to Brooklyn. Selling everything I can\u2019t ship.',
    memberSince: 2024, rating: 4.8, reviewCount: 6, soldCount: 4, avgReply: '~3h',
  },
  'noa': {
    id: 'noa',
    name: 'Noa Harel', initials: 'NH', bg: '#8FA6EC', role: 'seller',
    from: 'Tel Aviv', to: 'Lisbon', moveDate: 'May 1',
    area: 'Old North, Tel Aviv', city: 'Tel Aviv',
    bio: 'Six-month sabbatical in Lisbon. Subletting the apartment furnished and selling a couple of things that won\u2019t fit when I\u2019m back.',
    memberSince: 2022,
  },
  'itai': {
    id: 'itai',
    name: 'Itai Bar', initials: 'IB', bg: '#8FA6EC', role: 'seller',
    from: 'Tel Aviv', to: 'Haifa', moveDate: 'Mar 1',
    area: 'Yad Eliyahu, Tel Aviv', city: 'Tel Aviv',
    bio: 'Lease ended, moving back to Haifa for family.',
    memberSince: 2021,
  },
  'ron': {
    id: 'ron',
    name: 'Ron Tal', initials: 'RT', bg: '#8FA6EC', role: 'seller',
    from: 'Ramat Gan', to: 'Amsterdam', moveDate: 'Mar 22',
    area: 'Ramat Gan', city: 'Ramat Gan',
    bio: 'New job in Amsterdam — clearing the studio.',
    memberSince: 2023,
  },
  'yael': {
    id: 'yael',
    name: 'Inbar Rutner', initials: 'IR', bg: '#8FA6EC', role: 'seller', avatar: 'assets/avatar-inbar.png',
    from: 'Jerusalem', to: 'London', moveDate: 'Apr 12',
    area: 'Rehavia, Jerusalem', city: 'Jerusalem',
    bio: 'PhD program in London. Most of the apartment is up for grabs — pickup window is the first two weeks of April.',
    memberSince: 2022, rating: 3.8, reviewCount: 16, soldCount: 16, avgReply: '~34m',
    bundlePrice: 4100, bundleSavings: 240,
    bundleNote: 'Books, desk, plates set, bedroom set. Pickup over a long weekend in Rehavia.',
  },
  'amir': {
    id: 'amir',
    name: 'Amir Halevi', initials: 'AH', bg: '#8FA6EC', role: 'seller',
    from: 'Jerusalem', to: 'Tel Aviv', moveDate: 'Mar 30',
    area: 'Nachlaot, Jerusalem', city: 'Jerusalem',
    bio: 'Moving for work. Selling the bigger pieces I won\u2019t need in a smaller place.',
    memberSince: 2024,
  },
};

window.HA_LISTINGS = [
  { id: 'l-sofa',   sellerId: 'maya',   title: 'Linen 3-seater sofa',     price: 1450, cat: 'Furniture', status: 'available',     posted: '3d ago',  dims: '210 \u00d7 92 \u00d7 78 cm', cond: 'Used \u00b7 Very good', imgTone: '#FBF5E7', imgAccent: '#000', image: 'assets/listing-sofa.png', notes: 'Bought from a small workshop in Jaffa two years ago. Held up beautifully \u2014 one small mark on the left arm. Cushion covers come off and wash.', inBundle: true },
  { id: 'l-lamp',   sellerId: 'maya',   title: 'White pendant lamp',     price: 320,  cat: 'Furniture', status: 'available',     posted: '3d ago',  dims: 'H 165 cm',                  cond: 'Used \u00b7 Very good', imgTone: '#FBF5E7', imgAccent: '#FF962C', image: 'assets/listing-lamp.png', notes: 'Warm, dimmable. Bulb included.', inBundle: true },
  { id: 'l-rug',    sellerId: 'maya',   title: 'Wool rug, 200 \u00d7 290 cm', price: 680, cat: 'Furniture', status: 'available', posted: '6d ago', dims: '200 \u00d7 290 cm', cond: 'Used \u00b7 Good', imgTone: '#FBF5E7', imgAccent: '#D3D742', image: 'assets/listing-rug.png', notes: 'Anchors a living room. Vacuumed, no stains.', inBundle: true },
  { id: 'l-chairs', sellerId: 'maya',   title: 'Pair of dining chairs',   price: 240,  cat: 'Furniture', status: 'available', posted: '6d ago', dims: '2 chairs', cond: 'Used \u00b7 Good', imgTone: '#F9F8F6', imgAccent: '#000', image: 'assets/listing-chairs.png', notes: 'Match the dining table. Selling together.', inBundle: true },
  { id: 'l-vespa',  sellerId: 'daniel', title: 'Vespa Primavera 50',      price: 21500, cat: 'Vehicle',   status: 'on-hold',       posted: '1d ago',  dims: '2013 \u00b7 cream',     cond: 'Used \u00b7 Very good',     imgTone: '#FBF5E7', imgAccent: '#FF962C', image: 'assets/listing-vespa.png', notes: 'Vespa 50, 2013.\n\nGlossy cream color. Luxurious leather seat.\nComfortable for the city and beyond.\n\nRecently went through major treatment.\nFirst come, first served.', waitlist: 2, holdUntil: '48h' },
  { id: 'l-apt',    sellerId: 'noa',    title: '2-room sublease \u00b7 Old North', price: 6300, priceSuffix: '/mo', cat: 'Apartment', status: 'available', posted: '5d ago', dims: '53 m\u00b2 \u00b7 boutique building', cond: 'Furnished', imgTone: '#FBF5E7', imgAccent: '#8FA6EC', image: 'assets/listing-apt-3.png', images: ['assets/listing-apt-3.png','assets/listing-apt-1.png','assets/listing-apt-2.png','assets/listing-apt-6.png','assets/listing-apt-4.png','assets/listing-apt-5.png'], notes: 'For rent in Tel Aviv in the old north, in a boutique project, designed down to the last detail, secluded and quiet.\n\nThe apartment size is 53 square meters, there is a large balcony + storage room. Central air conditioning, real hardwood floor throughout the apartment, big closet in the bedroom, a luxurious kitchen.\n\nThe building has a luxurious lobby, 2 elevators, patio with seating for residents, bicycle storage and a laundry room.\n\nQuiet street, balcony with morning sun. All furniture stays. May\u2013October.' },
  { id: 'l-table',  sellerId: 'itai',   title: 'Oak dining table, seats 6', price: 980, cat: 'Furniture', status: 'sold',          posted: '8d ago',  dims: '180 \u00d7 90 \u00d7 75 cm', cond: 'Used \u00b7 Good', imgTone: '#F9F8F6', imgAccent: '#000', image: 'img/oak-table-1.png', images: ['img/oak-table-1.png','img/oak-table-2.png','img/oak-table-3.png'], notes: 'Solid oak, 8 years old. Found a new home with the next family in the building.' },
  { id: 'l-bike',   sellerId: 'ron',    title: 'Cannondale road bike, 56 cm', price: 2100, cat: 'Vehicle', status: 'back-on-market', posted: '9d ago \u00b7 re-listed today', dims: '2021 \u00b7 alloy frame', cond: 'Used \u00b7 Good', imgTone: '#FBF5E7', imgAccent: '#8FA6EC', notes: 'Reserved last week \u2014 buyer changed plans. Available again. Tuned and ready.', backReason: 'Reservation expired \u00b7 4h ago' },
  { id: 'l-desk',   sellerId: 'yael',   title: 'Oak writing desk',        price: 540,  cat: 'Furniture', status: 'available', posted: '2d ago', dims: '120 \u00d7 42.5 \u00d7 75 cm', cond: 'Used \u00b7 Very good', imgTone: '#FBF5E7', imgAccent: '#D3D742', image: 'assets/listing-desk-1.png', images: ['assets/listing-desk-1.png','assets/listing-desk-2.png','assets/listing-desk-3.png'], notes: 'Big enough for two monitors. From a Jerusalem cabinetmaker.', inBundle: true },
  { id: 'l-books',  sellerId: 'yael',   title: 'Bookshelf + 80 books',    price: 380,  cat: 'Furniture', status: 'available', posted: '2d ago', dims: '180 \u00d7 90 cm', cond: 'Used \u00b7 Good',      imgTone: '#F9F8F6', imgAccent: '#FF962C', image: 'assets/listing-books-1.png', images: ['assets/listing-books-1.png','assets/listing-books-2.png','assets/listing-books-3.png'], notes: 'Wall-mounted shelf for kitchen or studio. Books mostly philosophy & fiction.', inBundle: true },
  { id: 'l-kitchen',sellerId: 'yael',   title: 'Plates set',         price: 220,  cat: 'Kitchen',   status: 'available', posted: '2d ago', dims: '3 stoneware plates + bowls', cond: 'Used \u00b7 Good', imgTone: '#FBF5E7', imgAccent: '#D3D742', image: 'assets/listing-plates-1.png', images: ['assets/listing-plates-1.png','assets/listing-plates-2.png'], notes: 'Hand-thrown stoneware. Speckled glaze, no chips.', inBundle: true },
  { id: 'l-bed',    sellerId: 'yael',   title: 'Queen bed frame + mattress', price: 3200, cat: 'Furniture', status: 'on-hold', posted: '4d ago', dims: 'Queen \u00b7 160 \u00d7 200 cm', cond: 'Used \u00b7 Very good', imgTone: '#FBF5E7', imgAccent: '#000', image: 'assets/listing-bed-1.png', images: ['assets/listing-bed-1.png','assets/listing-bed-2.png'], notes: 'Upholstered cream b\u00f6ucl\u00e9 frame, two-year-old mattress.', inBundle: true, holdUntil: '36h', waitlist: 1 },
  { id: 'l-couch',  sellerId: 'amir',   title: 'L-shape couch',           price: 1800, cat: 'Furniture', status: 'available', posted: '5d ago', dims: '270 \u00d7 180 cm', cond: 'Used \u00b7 Very good', imgTone: '#FBF5E7', imgAccent: '#FF962C', notes: 'Pet-free home. Slipcovers are washable.' },
  { id: 'l-fridge', sellerId: 'amir',   title: 'Fridge \u00b7 350L',      price: 700,  cat: 'Kitchen',   status: 'available', posted: '5d ago', dims: 'A++ \u00b7 4 yrs old', cond: 'Used \u00b7 Good', imgTone: '#F9F8F6', imgAccent: '#000', notes: 'Working perfectly. Need it gone before Mar 30.' },
];

window.HA_REVIEWS = {
  'maya': [
    { from: 'Asher P.', item: 'Mid-century armchair', text: 'Showed up exactly when she said she would, helped me load it into the elevator. The story about why she was selling stuck with me \u2014 felt human.', stars: 5, when: 'Feb 2026' },
    { from: 'Tomer S.', item: 'Vintage radio', text: 'Fair price, easy handoff. The escrow took the awkwardness out.', stars: 5, when: 'Jan 2026' },
    { from: 'Lior M.',  item: 'Bookcase',     text: 'Pickup was straightforward. Item was as described.', stars: 4, when: 'Dec 2025' },
  ],
  'yael': [
    { from: 'Family in Rehavia', item: 'Two armchairs', text: 'Really kind \u2014 she walked us through everything in the apartment, not just the chairs.', stars: 5, when: 'Mar 2026' },
    { from: 'Avi B.', item: 'Lamp', text: 'Friendly, clear, on time.', stars: 5, when: 'Feb 2026' },
  ],
  'daniel': [
    { from: 'Inbar R.', item: 'Camera lens', text: 'Solid. Bought another item from him a week later.', stars: 5, when: 'Mar 2026' },
  ],
  'itai': [
    { from: 'Family up the block', item: 'Oak dining table', text: 'Picked up \u2014 thank you!', stars: 5, when: 'Mar 2026' },
  ],
  'amir': [],
  'ron': [
    { from: 'Eitan G.', item: 'Helmet', text: 'Quick reply, fair price.', stars: 4, when: 'Feb 2026' },
  ],
  'noa': [],
};

window.HA_CITIES = [
  { id: 'tel-aviv',  label: 'Tel Aviv',  count: 4 },
  { id: 'jerusalem', label: 'Jerusalem', count: 6 },
  { id: 'ramat-gan', label: 'Ramat Gan', count: 1 },
  { id: 'haifa',     label: 'Haifa',     count: 0 },
];

window.HA_CATS = [
  { id: 'all',  label: 'All' },
  { id: 'fur',  label: 'Furniture' },
  { id: 'veh',  label: 'Vehicles' },
  { id: 'apt',  label: 'Apartments' },
  { id: 'kit',  label: 'Kitchen' },
  { id: 'els',  label: 'Electronics' },
];

window.HA_INBOX = [
  { id: 'i1', listingId: 'l-sofa',  who: 'Asher P.',  last: 'Could I come by Wednesday evening?', time: '14:02', unread: true,  status: 'available' },
  { id: 'i2', listingId: 'l-vespa', who: 'Inbar R.',  last: 'You\u2019re #2 on the waitlist.',     time: '11:40', unread: false, status: 'on-hold' },
  { id: 'i3', listingId: 'l-apt',   who: 'Tomer S.',  last: 'Thanks \u2014 sending the deposit.',  time: 'Yesterday', unread: false, status: 'available' },
  { id: 'i4', listingId: 'l-bike',  who: 'Lior M.',   last: 'It\u2019s back \u2014 still interested?', time: '2d', unread: true, status: 'back-on-market' },
  { id: 'i5', listingId: 'l-table', who: 'Family up the block', last: 'Picked up \u2014 thank you!', time: '3d', unread: false, status: 'sold' },
];

window.HA_CHAT_MESSAGES = [
  { from: 'them', text: 'Hi! Is the sofa still around? I\u2019m moving in next week.', time: '13:42' },
  { from: 'me',   text: 'Yes \u2014 still available. Happy to answer anything.', time: '13:48' },
  { from: 'them', text: 'Could I come by Wednesday evening to see it?', time: '14:02' },
];

window.HA_QUICK_REPLIES = [
  'Is this still available?',
  'Can I come see it?',
  'Will you hold it for me?',
];

// New brand palette — yellow / orange / blue / black on warm cream backgrounds.
window.HA_STATUS = {
  'available':       { label: 'Available',      bg: '#E8EAB6', fg: '#3D4500', dot: '#D3D742' },
  'on-hold':         { label: 'On hold \u00b7 48h', bg: '#FFE3C4', fg: '#7A3D00', dot: '#FF962C' },
  'sold':            { label: 'Sold',           bg: '#F0EEE8', fg: '#000000', dot: '#000000' },
  'back-on-market':  { label: 'Back on market', bg: '#DCE3F7', fg: '#1F356E', dot: '#8FA6EC' },
};

// Helpers
window.HA_GET_SELLER = (id) => window.HA_SELLERS[id];
window.HA_GET_LISTING_SELLER = (l) => window.HA_SELLERS[l.sellerId];
