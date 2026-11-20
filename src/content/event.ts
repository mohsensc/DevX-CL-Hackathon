export const eventDetails = {
  name: 'UCLA Startup Hacks',
  tagline: 'DevX and Creative\u00a0Labs are putting 250 builders in one room for 36\u00a0hours. Every team builds a product and applies to YC’s Spring\u00a02027 batch.',
  dateLabel: 'February 5–7, 2027',
  startsAt: '2027-02-05T18:00:00-08:00',
  venues: ['Pauley Pavilion', 'Ackerman Grand Ballroom'],
  campus: 'UCLA, Westwood',
  sponsorEmail: 'ucladevx@gmail.com',
}

export type CharacterKind = 'sun' | 'star' | 'pill' | 'triangle' | 'bubble'

export const eventFacts = [
  { value: '250', label: 'builders in one room' },
  { value: '50+', label: 'YC applications sent' },
  { value: '36 hours', label: 'of building' },
]

export const builderProfile = [
  'Developers with apps already out in the world',
  'Designers who build what they draw',
  'Creatives with an idea they can’t put down',
  'PMs who talk to users before they write a spec',
]

export const shippedApps = [
  { name: 'Retune', icon: '/apps/retune.png', url: 'https://apps.apple.com/us/app/retune-app/id6741438431' },
  { name: 'bLink', icon: '/apps/blink.png', url: 'https://apps.apple.com/us/app/ucla-blink/id6742316697' },
  { name: 'BChat', icon: '/apps/bchat.png', url: 'https://apps.apple.com/us/app/bchat-ucla/id6818065865' },
  { name: 'AutoInvent', icon: '/apps/autoinvent.png', url: 'https://autoinvent.com/' },
]

export const moreProjectsUrl = 'https://ucladevx.com/projects.html'

export const clubSites = {
  devx: 'https://ucladevx.com',
  creativeLabs: 'https://www.creativelabsucla.com',
}

export const memberCompanies = [
  { name: 'Duolingo', logo: '/logos/duolingo.svg', height: 34 },
  { name: 'AMD', logo: '/logos/amd.svg', height: 28, monochrome: true },
  { name: 'Meta', logo: '/logos/meta.png', height: 34 },
  { name: 'Capital One', logo: '/logos/capitalone.svg', height: 38 },
  { name: 'MusicArena', logo: '/logos/musicarena.png', height: 34, tag: 'YC S26' },
  { name: 'Pinterest', logo: '/logos/pinterest.svg', height: 36 },
  { name: 'AWS', logo: '/logos/aws.svg', height: 40 },
  { name: 'Kearney', logo: '/logos/kearney.png', height: 24 },
  { name: 'Adobe', logo: '/logos/adobe.png', height: 30 },
  { name: 'Scale AI', logo: '/logos/scale.svg', height: 32, monochrome: true },
  { name: 'Comcast', logo: '/logos/comcast.svg', height: 40 },
  { name: 'Apple', logo: '/logos/apple.png', height: 40 },
  { name: 'Cvent', logo: '/logos/cvent.png', height: 30 },
  { name: 'IBM', logo: '/logos/ibm.svg', height: 34 },
  { name: 'Roblox', logo: '/logos/roblox.png', height: 30 },
  { name: 'Genesis', logo: '/logos/genesis.svg', height: 40, monochrome: true },
  { name: 'Clever', logo: '/logos/clever.png', height: 32 },
  { name: 'Microsoft', logo: '/logos/microsoft.png', height: 32 },
  { name: 'Bank of America', logo: '/logos/bankofamerica.svg', height: 22 },
  { name: 'Teradyne', logo: '/logos/teradyne.svg', height: 28, monochrome: true },
  { name: 'Coinbase', logo: '/logos/coinbase.png', height: 34 },
  { name: 'SAS', logo: '/logos/sas.png', height: 34 },
  { name: 'Calibre Systems', logo: '/logos/calibre.svg', height: 26 },
  { name: 'Amazon', logo: '/logos/amazon.png', height: 32 },
  { name: 'Digitas', logo: '/logos/digitas.png', height: 42 },
]

export const ycFounderAlum = {
  name: 'Kevin Yao',
  club: 'DevX',
  company: 'MusicArena',
  formerName: 'Catapult',
  batch: 'YC S26',
}

export const sponsorReasons = [
  {
    title: 'Meet founders before YC does',
    body: '50+ teams write and send their YC applications that weekend. You’re in the room while they do.',
  },
  {
    title: 'Hire people who ship',
    body: 'You get a résumé book of every builder, plus what they built.',
  },
  {
    title: 'Put your name on a track',
    body: 'Set the challenge, pick the winner, and hand over the prize.',
  },
  {
    title: 'Teach your tool',
    body: 'Run a workshop or demo on Saturday, before teams decide what to build with.',
  },
  {
    title: 'Your logo, all weekend',
    body: 'On the shirts, the stage, the signage, and this site.',
  },
  {
    title: 'Reach both clubs',
    body: 'DevX and Creative Labs post about you before, during, and after.',
  },
]

export const sponsorshipCovers = ['Every meal for 36 hours', 'Prizes', 'AI credits for every team', 'Venue and A/V', 'Shirts and swag']

export const inquiryInterests = ['Title', 'Gold', 'Silver', 'Bronze', 'AI credits', 'Not sure yet']

export const sponsorTiers = [
  {
    name: 'Title',
    price: '$10k',
    character: 'sun' as CharacterKind,
    tint: 'var(--cl-sun)',
    perks: [
      '“Presented by” on everything',
      'Opening keynote',
      'Named main track and prize',
      'Judging seat',
      'Mentors on the floor',
      'Premium booth',
      'Full résumé book',
    ],
  },
  {
    name: 'Gold',
    price: '$5k',
    character: 'star' as CharacterKind,
    tint: 'var(--cl-sky)',
    perks: [
      'Named track and prize',
      'Judging seat',
      'Mentors on the floor',
      'Booth',
      'Full résumé book',
      'Logo on shirts and site',
    ],
  },
  {
    name: 'Silver',
    price: '$2k',
    character: 'pill' as CharacterKind,
    tint: 'var(--cl-mint)',
    perks: ['Workshop or tech talk', 'Mentors on the floor', 'Table at the expo', 'Résumé book', 'Logo on site'],
  },
  {
    name: 'Bronze',
    price: '$1k',
    character: 'bubble' as CharacterKind,
    tint: 'var(--cl-lilac)',
    perks: ['Mentors on the floor', 'Logo on site', 'Swag at check-in'],
  },
]

export const creditOptions = [
  { title: 'Model API credits', body: 'Promo codes or capped keys for your models.' },
  { title: 'Coding tool seats', body: 'Weekend access to your AI coding tool.' },
  { title: 'GPU and compute credits', body: 'Cloud credits for training and hosting.' },
]

export const ycRfsUrl = 'https://www.ycombinator.com/rfs'

export const trackTeasers = [
  { character: 'sun' as CharacterKind, tint: 'var(--cl-sky)' },
  { character: 'star' as CharacterKind, tint: 'var(--cl-mint)' },
  { character: 'pill' as CharacterKind, tint: 'var(--cl-peach)' },
  { character: 'bubble' as CharacterKind, tint: 'var(--cl-lilac)' },
  { character: 'triangle' as CharacterKind, tint: 'var(--cl-sun)' },
]

export const weekendSchedule = [
  {
    day: 'Friday',
    date: 'Feb 5',
    tint: 'var(--cl-sky)',
    items: [
      { time: '6:00 PM', label: 'Check-in' },
      { time: '7:00 PM', label: 'Opening keynote' },
      { time: '8:00 PM', label: 'Team mixer and dinner' },
      { time: '9:00 PM', label: 'Hacking starts' },
    ],
  },
  {
    day: 'Saturday',
    date: 'Feb 6',
    tint: 'var(--cl-mint)',
    items: [
      { time: '8:00 AM', label: 'Breakfast' },
      { time: '10:30 AM', label: 'Finding a problem worth solving' },
      { time: '1:00 PM', label: 'Mentor office hours' },
      { time: '3:00 PM', label: 'Writing the YC application' },
      { time: '6:30 PM', label: 'Dinner and fireside chat' },
      { time: '12:00 AM', label: 'Midnight snack' },
    ],
  },
  {
    day: 'Sunday',
    date: 'Feb 7',
    tint: 'var(--cl-peach)',
    items: [
      { time: '7:30 AM', label: 'Breakfast' },
      { time: '8:00 AM', label: 'YC application clinic' },
      { time: '2:00 PM', label: 'Code freeze, apps submitted' },
      { time: '2:30 PM', label: 'Expo judging' },
      { time: '4:00 PM', label: 'Top 8 pitch on stage' },
      { time: '5:00 PM', label: 'Awards' },
    ],
  },
]

export const frequentQuestions = [
  {
    question: 'How do AI credits work?',
    answer:
      'Send us promo codes or an API key with a spending cap. Teams get them at check-in on Friday. You pick the amount per team and when they expire.',
  },
  {
    question: 'Can we send mentors or judges?',
    answer: 'Yes. Every package includes mentors on the floor. Gold and Title include a judging seat.',
  },
  {
    question: 'How do we pay?',
    answer: 'Email ucladevx@gmail.com with the package you want and we’ll send an invoice.',
  },
  {
    question: 'Is this affiliated with Y\u00a0Combinator?',
    answer: 'No. DevX and Creative Labs run the event. Teams apply through YC’s public application.',
  },
]
