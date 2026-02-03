import {
  Project,
  Trade,
  Bid,
  TimeslotBids,
  HistoryItem,
  Strategy,
  GameplanRow,
  ContextFile,
  ProjectDetails,
  VerifiedCredentials,
} from './types';

// Projects
export const projects: Project[] = [
  { id: '1', name: 'Project 1' },
  { id: '2', name: 'Mio 26', badge: 1 },
  { id: '3', name: 'Project 3' },
  { id: '4', name: 'Project 4' },
];

// Today's Trades
export const todaysTrades: Trade[] = [
  { id: '1', timeslot: '06 - 07', status: 'completed', units: 6.47, buyerId: '**KEBWHT', rate: 4.25 },
  { id: '2', timeslot: '06 - 07', status: 'completed', units: 6.47, buyerId: '**KEBWHT', rate: 4.25 },
  { id: '3', timeslot: '06 - 07', status: 'completed', units: 6.47, buyerId: '**KEBWHT', rate: 4.25 },
  { id: '4', timeslot: '06 - 07', status: 'completed', units: 6.47, buyerId: '**KEBWHT', rate: 4.25 },
  { id: '5', timeslot: '07 - 08', status: 'completed', units: 2.74, buyerId: '**KMVCT', rate: 5.02 },
  { id: '6', timeslot: '08 - 09', status: 'delivered', units: 4.92, buyerId: '**PS57C', rate: 7.49 },
  { id: '7', timeslot: '09 - 10', status: 'delivered', units: 8.83, buyerId: 'SG Sell', rate: 9.28 },
  { id: '8', timeslot: '10 - 11', status: 'delivered', units: 8.83, buyerId: 'SG Sell', rate: 9.28 },
  { id: '9', timeslot: '11 - 12', status: 'ongoing', units: 9.94, buyerId: '**SOQL0N', rate: 0.53 },
  { id: '10', timeslot: '12 - 13', status: 'scheduled', units: 5.36, buyerId: '**VLA6A', rate: 5.64 },
  { id: '11', timeslot: '13 - 14', status: 'scheduled', units: 5.36, buyerId: '**VLA6A', rate: 5.64 },
  { id: '12', timeslot: '14 - 15', status: 'scheduled', units: 1.54, buyerId: '**S2XA0L', rate: 1.74 },
  { id: '13', timeslot: '15 - 16', status: 'scheduled', units: 1.30, buyerId: '**D35389', rate: 9.56 },
  { id: '14', timeslot: '16 - 17', status: 'scheduled', units: 1.96, buyerId: '**FX48YU', rate: 3.85 },
  { id: '15', timeslot: '17 - 18', status: 'scheduled', units: 5.56, buyerId: '**OI3MN', rate: 8.10 },
];

// Tomorrow's Trades
export const tomorrowsTrades: Trade[] = [
  { id: '1', timeslot: '06 - 07', status: 'delivered', units: 6.47, buyerId: '**KEBWHT', rate: 4.25 },
  { id: '2', timeslot: '07 - 08', status: 'delivered', units: 6.47, buyerId: '**KMVCT', rate: 5.02 },
  { id: '3', timeslot: '08 - 09', status: 'delivered', units: 4.92, buyerId: '**PS57C', rate: 7.49 },
  { id: '4', timeslot: '10 - 11', status: 'delivered', units: 8.83, buyerId: 'SG Sell', rate: 9.28 },
  { id: '5', timeslot: '11 - 12', status: 'searching', units: 6.47, buyerId: '-', rate: 0 },
  { id: '6', timeslot: '12 - 13', status: 'scheduled', units: 5.36, buyerId: '**VLA6A', rate: 5.64 },
  { id: '7', timeslot: '13 - 14', status: 'scheduled', units: 5.36, buyerId: '**VLA6A', rate: 5.64 },
  { id: '8', timeslot: '14 - 15', status: 'scheduled', units: 1.54, buyerId: '**S2XA0L', rate: 1.74 },
  { id: '9', timeslot: '15 - 16', status: 'scheduled', units: 1.30, buyerId: '**D35389', rate: 9.56 },
  { id: '10', timeslot: '16 - 17', status: 'scheduled', units: 1.96, buyerId: '**FX48YU', rate: 3.85 },
  { id: '11', timeslot: '17 - 18', status: 'scheduled', units: 5.56, buyerId: '**OI3MN', rate: 8.10 },
];

// Current Bids grouped by timeslot with max units configuration
// maxUnits can be updated via API to set the limit per timeslot
export const currentBidsData: TimeslotBids[] = [
  {
    timeslot: '06:00 - 07:00',
    maxUnits: 10, // API can provide this value
    bids: [
      { id: '1', timeslot: '06:00 - 07:00', buyerId: '***EF7W3', rate: 7.25, units: 2.56, credits: -17.58 },
      { id: '2', timeslot: '06:00 - 07:00', buyerId: '***VFB7W', rate: 6.42, units: 2.56, credits: -9.68 },
      { id: '3', timeslot: '06:00 - 07:00', buyerId: '***EHY9R', rate: 7.25, units: 2.56, credits: -14.71 },
    ],
  },
  {
    timeslot: '07:00 - 08:00',
    maxUnits: 10, // API can provide this value
    bids: [], // No bids available for this timeslot
  },
  {
    timeslot: '08:00 - 09:00',
    maxUnits: 10, // API can provide this value
    bids: [
      { id: '4', timeslot: '08:00 - 09:00', buyerId: '***EF7W3', rate: 7.25, units: 2.56, credits: -17.58 },
      { id: '5', timeslot: '08:00 - 09:00', buyerId: '***VFB7W', rate: 6.42, units: 2.56, credits: -11.68 },
      { id: '6', timeslot: '08:00 - 09:00', buyerId: '***EHY9R', rate: 7.25, units: 2.56, credits: -14.71 },
      { id: '7', timeslot: '08:00 - 09:00', buyerId: '***EHY9R', rate: 7.25, units: 2.56, credits: -14.71 },
      { id: '8', timeslot: '08:00 - 09:00', buyerId: '***EHY9R', rate: 7.25, units: 2.56, credits: -14.71 },
      { id: '9', timeslot: '08:00 - 09:00', buyerId: '***EHY9R', rate: 7.25, units: 2.56, credits: -14.71 },
      { id: '10', timeslot: '08:00 - 09:00', buyerId: '***EHY9R', rate: 7.25, units: 1.00, credits: -14.71 },
    ],
  },
];

// History
export const historyData: HistoryItem[] = [
  { id: '1', date: '04/02/26', timeslot: '07 - 08', committed: 5, tariff: 6, transferred: 5, received: 30, status: 'fully_fulfilled', buyerId: 'XX67889' },
  { id: '2', date: '04/02/26', timeslot: '08 - 09', committed: 10, tariff: 7, transferred: 7, received: 49, status: 'partially_fulfilled', buyerId: 'XX67889' },
  { id: '3', date: '04/02/26', timeslot: '09 - 10', committed: 15, tariff: 4, transferred: 15, received: 60, status: 'fully_fulfilled', buyerId: 'XX67889' },
  { id: '4', date: '04/02/26', timeslot: '09 - 10', committed: 20, tariff: 4, transferred: 0, received: 0, status: 'failed', buyerId: 'XX67889' },
  { id: '5', date: '05/02/26', timeslot: '09 - 10', committed: 20, tariff: 4, transferred: 0, received: 0, status: 'failed', buyerId: 'XX67889' },
];

// Strategies
export const strategies: Strategy[] = [
  {
    id: '1',
    name: 'Logic 1',
    subtitle: 'Snatch',
    startingPrice: 6.5,
    adjustmentTime: 120,
    maxUnits: 10,
    maxReduction: 30,
    fallbackTime: '07:00 PM',
    isExpanded: false,
  },
  {
    id: '2',
    name: 'Logic 2',
    subtitle: 'Value',
    startingPrice: 6.5,
    adjustmentTime: 120,
    maxUnits: 10,
    maxReduction: 30,
    fallbackTime: '07:00 PM',
    isExpanded: true,
  },

];

// Gameplan
export const gameplanData: GameplanRow[] = [
  { id: '1', timeslot: '06 - 07', releaseTime: '12:30', strategyId: '1', units: 10, rate: 6.5 },
  { id: '2', timeslot: '07 - 08', releaseTime: '13:00', strategyId: '2', units: 12, rate: 7.0 },
  { id: '3', timeslot: '08 - 09', releaseTime: '14:00', strategyId: '2', units: 15, rate: 8.5 },
  { id: '4', timeslot: '09 - 10', releaseTime: '15:30', strategyId: '2', units: 14, rate: 9.0 },
  { id: '5', timeslot: '10 - 11', releaseTime: '16:00', strategyId: '2', units: 11, rate: 7.5 },
  { id: '6', timeslot: '11 - 12', releaseTime: '17:00', strategyId: '1', units: 13, rate: 8.0 },
  { id: '7', timeslot: '12 - 13', releaseTime: '18:00', strategyId: '1', units: 10, rate: 6.0 },
  { id: '8', timeslot: '13 - 14', releaseTime: '19:30', strategyId: '1', units: 12, rate: 7.2 },
  { id: '9', timeslot: '14 - 15', releaseTime: '20:00', strategyId: '2', units: 14, rate: 9.5 },
  { id: '10', timeslot: '15 - 16', releaseTime: '21:00', strategyId: '3', units: 11, rate: 8.3 },
];

// Context Pool Files
export const globalContextFiles: ContextFile[] = [
  { id: '1', name: 'Auto bidder meta data', enabled: true },
  { id: '2', name: 'Auto bidder meta data', enabled: true },
];

export const localContextFiles: ContextFile[] = [
  { id: '1', name: 'Auto bidder meta data', enabled: true },
  { id: '2', name: 'Auto bidder meta data', enabled: true },
  { id: '3', name: 'Auto bidder meta data', enabled: true },
  { id: '4', name: 'Auto bidder meta data', enabled: true },
];

// Add Project Modal Data
export const newProjectDetails: ProjectDetails = {
  id: 'new',
  name: 'Aries 26',
  installedBy: 'Tata Power Solar',
  images: [
    '/images/solar-1.jpg',
    '/images/solar-2.jpg',
    '/images/solar-3.jpg',
    '/images/solar-4.jpg',
  ],
  description: 'Morgana CHS is part of Casa Rio Gold in Palawa City, a residential cluster by the Lodha in Dombvli, Bombay. The rooftops here get ample sunlight with no other structure blocking path for sunlight, making it an ideal spot.',
};

export const verifiedCredentials: VerifiedCredentials = {
  accountName: 'test-prosumer-pvvnl-6',
  systemCapacity: '30.45 kW',
  consumerNumber: '7130815',
  meterNumber: 'SC10656086',
  commissioningDate: '2026-01-01',
  generationType: 'Solar',
  issuerName: 'PVVNL',
  phone: '97909121202',
};

// API Key
export const apiKey = 'CBSIDAVCILAEWVFIA';

// Helper function to get units subtext based on status
export function getUnitsSubtext(status: string): string {
  switch (status) {
    case 'completed':
    case 'delivered':
      return 'Produced';
    case 'searching':
      return 'Reserved';
    default:
      return 'Pledged';
  }
}
