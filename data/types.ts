// Project types
export interface Project {
  id: string;
  name: string;
  badge?: number;
}

// Trade types
export type TradeStatus = 'completed' | 'delivered' | 'ongoing' | 'scheduled' | 'searching';

export interface Trade {
  id: string;
  timeslot: string;
  status: TradeStatus;
  units: number;
  buyerId: string;
  rate: number;
}

// Bid types
export interface Bid {
  id: string;
  timeslot: string;
  buyerId: string;
  rate: number;
  units: number;
  credits: number;
  selected?: boolean;
}

// History types
export type HistoryStatus = 'settled' | 'disputed';

export interface HistoryItem {
  id: string;
  day: string;
  status: HistoryStatus;
  units: number;
  avgRate: number;
}

// Strategy types
export interface Strategy {
  id: string;
  name: string;
  subtitle: string;
  startingPrice: number;
  adjustmentTime: number;
  maxUnits: number;
  maxReduction: number;
  fallbackTime: string;
  isExpanded?: boolean;
}

// Gameplan types
export interface GameplanRow {
  id: string;
  timeslot: string;
  releaseTime: string;
  strategyId: string;
  units: number;
  rate: number;
}

// Context Pool types
export interface ContextFile {
  id: string;
  name: string;
  enabled: boolean;
}

// Add Project Modal types
export interface ProjectDetails {
  id: string;
  name: string;
  installedBy: string;
  images: string[];
  description: string;
}

export interface VerifiedCredentials {
  accountName: string;
  systemCapacity: string;
  consumerNumber: string;
  meterNumber: string;
  commissioningDate: string;
  generationType: string;
  issuerName: string;
  phone: string;
}

export type VerificationStep = 1 | 2 | 3 | 4;
