

# Product Requirements Document (PRD)

**Project:** SG Trading & Configuration Console
**Platform:** Next.js (App Router)
**Scope:** Frontend-only (dummy data, API-ready)

---

## 1. Product Overview (Frontend Focus)

This application is a **dense, professional trading console** designed for high-frequency scanning, comparison, and configuration. The UI prioritizes:

* Zero vertical page scroll
* Explicit horizontal navigation for complex datasets
* Visual encoding of state via rows, badges, and highlights
* Strong separation between **viewing (Trade)** and **configuration (Config)**

All data is currently **dummy data**, but **every interaction, state change, and dependency is structured as if backed by APIs**.

---

## 2. Global Layout & Navigation

### 2.1 App Shell (Persistent)

#### Sidebar (Left, Fixed)

* Logo at top
* Two navigation icons vertically centered:

  * Trade (default)
  * Config
* Active state visually indicated

#### Header (Top, Fixed)

* Horizontally scrollable project chips
* One chip always selected
* “+ Add Project” button on the right
* Header never scrolls vertically or horizontally

---

### 2.2 Global Scroll Rules (Very Important)

| Area             | Scroll Direction         | Scrollbar |
| ---------------- | ------------------------ | --------- |
| `body`           | ❌ none                   | ❌         |
| Trade Page root  | ✅ horizontal             | ✅ visible |
| Trade cards      | ✅ vertical (independent) | ❌ hidden  |
| Config Page root | ❌ none                   | ❌         |
| Config cards     | ✅ vertical (independent) | ❌ hidden  |

---

## 3. Trade Page (Default Page)

### 3.1 Page-Level Layout

* Page root is a **horizontal flex container**
* Width = sum of all four section widths
* If total width > viewport → **horizontal overflow**
* Browser-level horizontal scrollbar is visible at bottom of screen
* No snapping; free horizontal scroll

```text
| Today | Tomorrow | Current Bids | History |
←────────── horizontal scroll ──────────→
```

Each section:

* Fixed width (e.g. 420–480px)
* White card
* Vertically scrollable internally
* No visible vertical scrollbar

---

## 3.2 Trade Page Sections

### 3.2.1 Today’s Trades

**Table Columns**

* Timeslot (6–7 → 17–18)
* Status
* Units
* Buyer ID
* Rate (₹/kWh)

#### Behaviour & Logic

* Multiple rows per timeslot allowed
* Divider logic:

  * Light grey between same-slot rows
  * Dark grey after last row of slot
* Statuses:

  * `completed`
  * `scheduled`
  * `ongoing`
* If status = `ongoing`:

  * Entire row gets:

    * Rounded border
    * Stroke
    * Subtle background fill
* Units subtext:

  * `completed` → **Produced**
  * else → **Pledged**

---

### 3.2.2 Tomorrow’s Trades

Identical to Today’s Trades **with additions**:

* Extra status: `searching`
* If status = `searching`:

  * Row highlighted (same visual rules as `ongoing`)
  * Units subtext = **Reserved**

---

### 3.2.3 Current Bids

#### Structure

* Grouped by timeslot
* Each timeslot renders:

  * Its own mini-table OR
  * “No Bids Available” placeholder

**Table Columns**

* Buyer ID
* Rate (₹/kWh)
* Units
* Credits

#### Hover Behaviour

* On row hover:

  * Row gets stroke + fill
  * Credits column text transforms into icon button
  * Button is non-functional (placeholder only)

---

### 3.2.4 History

**Table Columns**

* Timeslot (days, starting day-before-yesterday)
* Status (`settled`, `disputed`)
* Units (Produced)
* Average Rate (₹/kWh)

---

## 4. Config Page

The Config page **does not horizontally scroll** and fits within viewport width.

It contains **three vertically stacked sections**, each independently vertically scrollable.

---

### 4.1 Context Pool

Two identical subsections:

* Global
* Local

Each subsection includes:

* Title
* “+ Add more” text button
* Divider
* File list

#### PDF Upload Behaviour

* Accepts PDFs only
* On upload:

  * Show PDF icon
  * Display filename
  * Checkbox (checked by default)
* Checkbox toggles inclusion state
* Upload UI uses system file picker

---

### 4.2 Tomorrow’s Gameplan

**Table (12 rows)**

| Column       | Behaviour             |
| ------------ | --------------------- |
| Timeslot     | Static (6–7 → 17–18)  |
| Release Time | Editable text         |
| Strategy     | Arrow-toggle selector |
| Units        | Editable text         |
| Rate (₹/kWh) | Editable text         |

#### Strategy Selector Logic

* NOT a dropdown
* Uses up/down arrows
* Cycles through **strategy names defined in section 4.3**
* Only one strategy visible at a time
* Strategy list auto-updates when strategies are renamed or added

---

### 4.3 Strategies Section

#### Accordion Cards

* Collapsed by default
* Chevron toggles expand/collapse
* Chevron points up when expanded

#### Expanded Card Contents

* Editable text fields with default values
* Footer banner:

  ```
  Sell to SG @ ₹ 5.5 / kwh on fallback
  ```

#### Defaults & Rules

* Two cards always exist:

  * Logic 1 – Snatch
  * Logic 2 – Value
* “Add strategy +”:

  * Creates new empty card
  * Name is editable
  * Name immediately becomes available in Gameplan strategy selector

#### API Key Subsection

* Editable text input at bottom of section

---

## 5. Add Project Flow

* Triggered from header
* Fullscreen modal
* Two-column layout
* Close button:

  * Triggers confirmation dialog
* On save:

  * New project chip created
  * Project becomes selected
  * Entire page data re-fetches (dummy API)

---

## 6. UI Specs as JSON (Updated)

```json
{
  "scrollModel": {
    "tradePage": {
      "horizontalOverflow": true,
      "horizontalScrollbarVisible": true
    },
    "tradeSections": {
      "verticalScroll": true,
      "scrollbarVisible": false
    }
  },
  "sectionDimensions": {
    "tradeSectionWidth": 460,
    "sectionGap": 16
  }
}
```

---

## 7. UI Component Graph as JSON

```json
{
  "TradePage": {
    "type": "horizontalScrollContainer",
    "children": [
      "TodaysTradesCard",
      "TomorrowsTradesCard",
      "CurrentBidsCard",
      "HistoryCard"
    ]
  }
}
```

---

## 8. Interaction & Behaviour Spec as JSON

```json
{
  "horizontalScroll": {
    "container": "TradePageRoot",
    "scrollbar": "nativeBrowser"
  },
  "sectionScrollIndependence": {
    "eachSection": "isolatedVerticalScroll"
  }
}
```

---

## 9. Updated Master Prompt for Cursor

```text
You are building a Next.js (App Router) frontend with dummy data only.

Critical Layout Rules:
- The Trade page itself must horizontally overflow.
- The browser horizontal scrollbar must be visible at the bottom of the screen.
- Each trade section is a fixed-width card placed in a horizontal flex row.
- Each section scrolls vertically internally with hidden scrollbars.
- The body must never scroll vertically.

Build Steps:
1. Create AppShell with fixed sidebar and header.
2. Implement ProjectContext and dummy API hooks.
3. Build TradePage as a horizontal overflow container with four fixed-width cards.
4. Implement table row status logic and divider grouping.
5. Add hover and highlight interactions.
6. Build ConfigPage with three vertically scrollable sections.
7. Implement strategy name syncing between accordion and gameplan table.
8. Build fullscreen Add Project modal with confirmation logic.
9. Document every component and state dependency clearly.

All data must be mocked but structured exactly like real APIs.
