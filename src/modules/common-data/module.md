# Common Data Module (`src/modules/common-data`)

## Overview
The `common-data` module is the single source of truth for shared master-data UI primitives, widgets, dialogs, types, constants, hooks, and date-formatting utilities used across master-data domains (`country`, `department`, `category`, `sub-category`, `industries`, etc.).

## Directory Structure
```
src/modules/common-data/
├── components/
│   ├── dialog/
│   │   └── DeleteConfirmDialog.tsx     # Generic confirmation dialog for record deletion
│   ├── feedback/
│   │   ├── Feedback.tsx                # Empty / Error / No Results state banner
│   │   ├── StatusBadge.tsx             # CVA-styled status pill badge (active/inactive/draft/delete)
│   │   ├── TableSkeleton.tsx           # Table loading skeleton
│   │   └── CardSkeleton.tsx            # Card grid loading skeleton
│   ├── forms/
│   │   ├── FormFooter.tsx              # Save / Clear / Duplicate / Print action footer
│   │   ├── ImageChip.tsx               # Thumbnail selection chip for galleries
│   │   ├── ImageUploadArea.tsx         # Drag-and-drop & browse file upload container
│   │   ├── PillInput.tsx               # Rounded pill input with optional right icon
│   │   ├── PillSelect.tsx              # Rounded pill select dropdown
│   │   └── SectionHeader.tsx           # Section title with trailing divider line
│   ├── listing/
│   │   ├── ListingFooter.tsx           # Standard listing footer with branding & chat
│   │   ├── ListingHeader.tsx           # Standard listing search header with view switcher & add CTA
│   │   ├── Pagination.tsx              # Complete client/server pagination controller
│   │   └── ViewToggle.tsx              # Grid <-> List view switch button
│   └── overview/
│       ├── OverviewCard.tsx            # Status overview summary card
│       ├── OverviewRing.tsx            # Circular percentage progress widget
│       ├── OverviewRingIcon.tsx        # Base SVG circular progress geometry
│       ├── RangeSwitch.tsx             # Time range filter selector (Live, 6h, 24h, 7d, 30d)
│       └── StatDonut.tsx               # SVG arc gauge donut metric chart
├── constants/
│   ├── overview.data.ts                # TIME_RANGES, STAT_TILES, default time range
│   ├── pagination.data.ts              # PAGE_SIZES ([10, 25, 50, 75]), default page size
│   └── status.data.ts                  # STATUS_OPTIONS, FORM_STATUS_OPTIONS, default status
├── hooks/
│   └── useImageUpload.ts               # Object URL lifecycle management & gallery item resolution
├── i18n/
│   └── en.json                         # Common translation strings (status, pagination, ranges, etc.)
├── types/
│   └── common-data.types.ts            # Common data types, props interfaces, and AsyncState<T>
├── utils/
│   └── format-updated-at.ts            # Relative and compact date formatters using Intl
├── index.ts                            # Public barrel export — ONLY allowed import target
└── module.md                           # Documentation for AI agents and developers
```

## Public API & Usage
Other modules must **only** import from `@/modules/common-data` via its barrel `index.ts`:

```typescript
import {
  PillInput,
  PillSelect,
  SectionHeader,
  FormFooter,
  Pagination,
  ViewToggle,
  ListingHeader,
  ListingFooter,
  Feedback,
  StatusBadge,
  TableSkeleton,
  CardSkeleton,
  StatDonut,
  OverviewCard,
  RangeSwitch,
  OverviewRing,
  DeleteConfirmDialog,
  useImageUpload,
  formatUpdatedAt,
  formatUpdatedAtCompact,
  formatUpdatedAtFull,
  PAGE_SIZES,
  DEFAULT_PAGE_SIZE,
  TIME_RANGES,
  DEFAULT_TIME_RANGE,
  type AsyncState,
  type CommonStatus,
  type TimeRange,
  type PageSize,
} from '@/modules/common-data'
```

## Extension Rules for AI Agents
1. **Zero Dummy Data**: Do not hardcode static arrays or mock datasets in `.tsx` components.
2. **KISS & DRY**: If 2 or more modules need the same generic UI element, promote it here rather than duplicating.
3. **Domain Independence**: Components in this module must never import from domain modules (`country`, `department`, `category`, etc.).
4. **Barrel Imports**: Always expose new components/utils through `src/modules/common-data/index.ts`.
