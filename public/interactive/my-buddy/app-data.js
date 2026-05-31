// My Buddy — sample data
// Parents, kids, parks, friend presence, community reports.

window.MB_PALETTES = {
  sage: {
    id: 'sage',
    name: 'Sage & sky',
    bg:        '#F4F2EC',
    surface:   '#FFFFFF',
    inkD:      '#1F2A24',
    ink:       '#2A3530',
    muted:     '#7E8780',
    border:    '#E2E2DA',
    soft:      '#EAE8E0',
    primary:   '#3F6B57',     // sage-green
    primaryD:  '#2E5040',
    primarySoft: '#DDE9E2',
    accent:    '#E8B23A',     // warm gold/sun
    accentSoft:'#F8E9C4',
    danger:    '#C25450',
    warn:      '#D89A37',
    sky:       '#BFD4D9',
    map:       '#EDE9DC',
    mapPath:   '#E1DCCB',
    mapPark:   '#CDDAB4',
    mapWater:  '#C8D9DC',
  },
  sunny: {
    id: 'sunny',
    name: 'Sunny park',
    bg:        '#FFF9EC',
    surface:   '#FFFFFF',
    inkD:      '#22210B',
    ink:       '#2D2C12',
    muted:     '#857F62',
    border:    '#EFE7CB',
    soft:      '#F5EAC2',
    primary:   '#5A8A2E',     // grass-green
    primaryD:  '#3F6720',
    primarySoft: '#DEE9C5',
    accent:    '#F2A33A',     // sun
    accentSoft:'#FCE2BB',
    danger:    '#D14C45',
    warn:      '#E08727',
    sky:       '#C8D9F0',
    map:       '#FBF1D2',
    mapPath:   '#EFDFAB',
    mapPark:   '#C8DD9C',
    mapWater:  '#B7CDE9',
  },
  fresh: {
    id: 'fresh',
    name: 'Bright · six colors',
    // Six-color brand palette — green primary, yellow + coral accents,
    // pink + two blues as supporting friends. Soft blush backdrop.
    bg:        '#FBF5F5',      // soft blush white (requested)
    surface:   '#FFFFFF',
    inkD:      '#16261D',
    ink:       '#1F3328',
    muted:     '#7E8A82',
    border:    '#ECE1E1',
    soft:      '#F4EAEA',
    primary:   '#399F73',      // green
    primaryD:  '#2A7D59',
    primarySoft:'#D4ECE0',
    accent:    '#FABF3E',      // yellow
    accentSoft:'#FDEBBE',
    danger:    '#F15E3C',      // coral
    warn:      '#F15E3C',
    sky:       '#9CC4E8',      // light blue
    map:       '#F3ECEC',      // blush-tinted map base
    mapPath:   '#E6DADA',
    mapPark:   '#CDE8D7',      // green-tinted park blob
    mapWater:  '#9CC4E8',      // light-blue water
    // Avatar accents — the six brand colors for buddy bubbles
    pop1:      '#F8AFA8',      // salmon pink
    pop2:      '#9CC4E8',      // light blue
    pop3:      '#FABF3E',      // yellow
    pop4:      '#F15E3C',      // coral
    pop5:      '#0766AB',      // deep blue
    // Role overrides (fall back to primary when absent in other palettes)
    cta:       '#399F73',      // green — primary action buttons (back to green)
    sel:       '#9CC4E8',      // light blue — selected chips / toggles
    selSoft:   '#DCEBF7',      // soft blue — selected-option card fills
    headline:  '#0566AB',      // deep blue — emphasis words in big display headings
  },
  cream: {
    id: 'cream',
    name: 'Warm cream',
    bg:        '#F5EFE7',
    surface:   '#FFFFFF',
    inkD:      '#28201A',
    ink:       '#3C2E25',
    muted:     '#8C7E72',
    border:    '#E5DACA',
    soft:      '#EFE4D2',
    primary:   '#9A5236',     // terracotta
    primaryD:  '#6D3922',
    primarySoft:'#EBD5C2',
    accent:    '#C8A96E',     // gold
    accentSoft:'#EBD9B2',
    danger:    '#B5443D',
    warn:      '#C77B30',
    sky:       '#D9C7B2',
    map:       '#EFE3D2',
    mapPath:   '#E2D2BA',
    mapPark:   '#D9CFA4',
    mapWater:  '#CFC4B4',
  },
};

// Crowd levels: 0 = empty · 1 = quiet · 2 = balanced · 3 = busy · 4 = packed
window.MB_PARKS = [
  {
    id: 'gan-gitara',
    name: 'Guitar Playground',
    neighborhood: "Neve Zemer, Ra'anana",
    distance: '4 min walk',
    image: 'tree-canopy',
    cleanliness: 4.7,
    amenities: ['shade','toddler-zone','water','soft-floor','fenced','benches'],
    bestFor: '1–5y',
    coords: { x: 38, y: 44 },
    crowdByHour: [0,0,0,0,1,2,3,2,1,2,3,4,3,2,1,1,1,2,3,2,1,1,0,0],
    friendsHere: ['noa','tom','ari'],
    reports: [
      { id:'r1', kind:'note', who:'Yael (mom · Neve Zemer)', text:'Sand pit just refilled — clean and dry today.', time:'12 min ago' },
      { id:'r2', kind:'fix',  who:'Adi (dad · Neve Zemer)',  text:'Loose bolt on the small slide — taped off.',   time:'1 h ago' },
    ],
    blurb: 'The neighborhood favorite. Fenced, shaded, great soft floor.',
  },
  {
    id: 'ninja',
    name: 'Ninja Playground',
    neighborhood: "Neve Zemer, Ra'anana",
    distance: '7 min walk',
    image: 'tree-row',
    cleanliness: 4.3,
    amenities: ['shade','toddler-zone','water','benches'],
    bestFor: '2–6y',
    coords: { x: 60, y: 36 },
    crowdByHour: [0,0,0,0,1,2,1,1,2,2,3,3,3,2,2,2,2,3,3,2,1,0,0,0],
    friendsHere: ['lia'],
    reports: [
      { id:'r3', kind:'mess', who:'Tamar (mom · Neve Zemer)', text:'Trash overflowing near the south bench — reported.', time:'34 min ago' },
    ],
    blurb: 'Bigger equipment, great for active toddlers. No fence.',
  },
  {
    id: 'abc',
    name: 'ABC Playground',
    neighborhood: "Neve Zemer, Ra'anana",
    distance: '10 min walk',
    image: 'tree-row',
    cleanliness: 4.5,
    amenities: ['shade','toddler-zone','restrooms','water','soft-floor','fenced','picnic'],
    bestFor: '1–4y',
    coords: { x: 24, y: 22 },
    crowdByHour: [0,0,0,1,1,2,2,2,3,3,4,4,3,3,3,3,3,4,4,3,2,1,1,0],
    friendsHere: ['mira-cousin','noa'],
    reports: [
      { id:'r4', kind:'note', who:'Roni (dad · Neve Zemer)', text:'Quiet this morning, lots of shade near the swings.', time:'2 h ago' },
    ],
    blurb: 'Restrooms on site, fully fenced, great for the youngest ones.',
  },
  {
    id: 'neve-zemer-garden',
    name: 'Neve Zemer Garden',
    neighborhood: "Neve Zemer, Ra'anana",
    distance: '3 min walk',
    image: 'rose',
    cleanliness: 3.8,
    amenities: ['shade','benches'],
    bestFor: '3–8y',
    coords: { x: 70, y: 70 },
    crowdByHour: [0,0,0,0,0,1,1,1,1,2,2,2,2,1,1,2,3,3,3,4,3,2,1,0],
    friendsHere: [],
    reports: [
      { id:'r5', kind:'mess', who:'Daniel (dad · Neve Zemer)', text:'Puddle near the slide — slippery after rain.', time:'10 min ago' },
    ],
    blurb: 'Quiet community garden feel. Best in the evenings.',
  },
  {
    id: 'community-park',
    name: 'Community Park',
    neighborhood: "Neve Zemer, Ra'anana",
    distance: '8 min walk',
    image: 'fountain',
    cleanliness: 4.8,
    amenities: ['shade','toddler-zone','restrooms','water','soft-floor','fenced','cafe'],
    bestFor: '2–5y',
    coords: { x: 50, y: 60 },
    crowdByHour: [0,0,0,0,1,2,2,2,3,3,3,3,2,2,2,2,2,3,3,2,1,0,0,0],
    friendsHere: ['ari'],
    reports: [],
    blurb: 'Newest playground in the area. Brand-new equipment, cafe nearby.',
  },
];

// Friend graph
window.MB_FRIENDS = [
  { id:'noa',  parent:'Noa B.',     kid:'Ella',  kidAge:2.5, avatar:'N', color:'#E8B23A', here:'gan-gitara',    since:'4 min',    tags:['toddler-zone'] },
  { id:'tom',  parent:'Tom S.',     kid:'Ido',   kidAge:3,   avatar:'T', color:'#3F6B57', here:'gan-gitara',    since:'17 min',   tags:['active'] },
  { id:'ari',  parent:'Ariella K.', kid:'Maya',  kidAge:2,   avatar:'A', color:'#9A5236', here:'community-park', since:'just now', tags:['quiet'] },
  { id:'lia',  parent:'Lia R.',     kid:'Yotam', kidAge:1.5, avatar:'L', color:'#5A8A2E', here:'ninja',         since:'22 min',   tags:['stroller'] },
  { id:'mira-cousin', parent:'Tal (cousin)', kid:'Rom', kidAge:3, avatar:'T', color:'#C25450', here:'abc', since:'8 min', tags:['family'] },
  { id:'shir', parent:'Shir M.',    kid:'Adam',  kidAge:2,   avatar:'S', color:'#3B7CC7', here:null,            since:null,       tags:[] },
  { id:'dana', parent:'Dana O.',    kid:'Romi',  kidAge:2.5, avatar:'D', color:'#7E5BB0', here:null,            since:null,       tags:[] },
];

// Buddy-match
window.MB_BUDDIES = [
  { id:'b1', parent:'Hila',  kid:'Noam', kidAge:2,   neighborhood:"Neve Zemer, Ra'anana", plan:'Guitar Playground, 4–5 PM',  mutual:2, color:'#E8B23A' },
  { id:'b2', parent:'Yotam', kid:'Yuval',kidAge:2.5, neighborhood:"Neve Zemer, Ra'anana", plan:'ABC Playground, tomorrow 10', mutual:1, color:'#3F6B57' },
  { id:'b3', parent:'Mor',   kid:'Aviv', kidAge:1.5, neighborhood:"Neve Zemer, Ra'anana", plan:'Community Park, 5 PM',        mutual:0, color:'#9A5236' },
];

// Inbox threads
window.MB_THREADS = [
  {
    id:'t1', with:'Noa B.', last:'See you at Guitar Playground at 4!', time:'12 min', unread:true, group:false,
    messages: [
      { from:'Noa B.', text:'Hi! Are you heading to the park today?',      time:'3:38 PM' },
      { from:'me',     text:'Yes! Thinking around 4 at Guitar Playground', time:'3:40 PM' },
      { from:'Noa B.', text:'Perfect, Ella loves it there',                time:'3:42 PM' },
      { from:'me',     text:'Talia is so excited to see her',              time:'3:49 PM' },
      { from:'Noa B.', text:'See you at Guitar Playground at 4!',         time:'3:51 PM' },
    ],
  },
  {
    id:'t2', with:'Park crew · Tue', last:'Tom: I can bring snacks', time:'1 h', unread:false, group:true, count:4,
    messages: [
      { from:'Noa B.', text:'Anyone going to Guitar Playground this afternoon?', time:'2:28 PM' },
      { from:'Tom S.', text:'Yes! Bringing Ido around 4',                        time:'2:33 PM' },
      { from:'me',     text:'We will be there! See you all soon',                time:'2:38 PM' },
      { from:'Tom S.', text:'I can bring snacks',                               time:'3:02 PM' },
    ],
  },
  {
    id:'t3', with:'Lia R.', last:'Maybe Friday morning at Ninja?', time:'Yesterday', unread:false, group:false,
    messages: [
      { from:'me',    text:'Hey! Are you free this week for a playdate?', time:'Yesterday 10:20' },
      { from:'Lia R.', text:'Yes! Yotam has been asking about Talia',    time:'Yesterday 10:45' },
      { from:'me',    text:'So cute. What days work for you?',           time:'Yesterday 11:00' },
      { from:'Lia R.', text:'Maybe Friday morning at Ninja?',           time:'Yesterday 11:15' },
    ],
  },
];

// Active user
window.MB_ME = {
  parent: 'Mira',
  neighborhood: "Neve Zemer, Ra'anana",
  avatar: 'M',
  kid: { name: 'Talia', age: 2, ageLabel: '2y · 4mo', loves: ['sand','climbing','dogs'] },
  circle: 12,
  visitsThisMonth: 18,
};
