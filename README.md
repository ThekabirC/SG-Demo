# SG Trading & Configuration Console

A professional trading console built with Next.js 14, designed for high-frequency scanning, comparison, and configuration of solar energy trading.

## Features

- **Trade Page**: Horizontal scrolling view with four fixed-width cards
  - Today's Trades
  - Tomorrow's Trades  
  - Current Bids
  - History

- **Config Page**: Three-column layout for configuration
  - Context Pool (Global/Local file management)
  - Tomorrow's Gameplan (editable table with strategy selection)
  - Strategies (accordion-style configuration cards)

- **Add Project Modal**: Multi-step verification flow for adding new projects

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with AppShell
│   ├── page.tsx            # Trade page (default)
│   ├── config/page.tsx     # Config page
│   └── globals.css         # Global styles
├── components/
│   ├── layout/             # AppShell, Sidebar, Header
│   ├── trade/              # Trade page components
│   ├── config/             # Config page components
│   └── modal/              # Add Project modal components
├── contexts/               # React Context providers
│   ├── ProjectContext.tsx
│   ├── StrategyContext.tsx
│   └── ModalContext.tsx
└── data/
    ├── types.ts            # TypeScript interfaces
    └── dummyData.ts        # Mock data (API-ready)
```

## API Integration

All data is currently mocked but structured for easy API replacement. To integrate with real APIs:

1. Replace data fetching in `data/dummyData.ts` with API calls
2. Update contexts to handle async data fetching
3. Add loading and error states as needed

The dummy data structure mirrors expected API response formats.

## Design System

### Colors
- Primary: `#14B8A6` (Teal)
- Success: `#22C55E` (Green)
- Warning: `#F59E0B` (Amber)
- Background: `#F3F4F6` (Light Gray)

### Layout
- Sidebar Width: 60px
- Header Height: 60px
- Card Width: 460px (Trade cards)
- Card Gap: 16px
