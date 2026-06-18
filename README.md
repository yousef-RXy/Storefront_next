# Storefront Application (Next.js App Router)

A high-performance e-commerce product catalog built using Next.js (App Router), React 19, and Tailwind CSS v4. This codebase represents an architectural migration and premium upgrade from the previous pure React + Vite client-side Single Page Application (SPA), moving core computing logic directly to the server to optimize data rendering speeds.

---

## Architectural Upgrades: Next.js vs. Pure React + Vite

### 1. Server-Side Workload Execution vs. Client-Side Overhead
* **The React + Vite Baseline**: The previous client-side engine fetched data over the network inside client hooks (`useEffect`, `useFetch`) and managed arrays in-memory via local component states (`useState`). This configuration consumed processing power on user machines and caused loading flashes during runtime hydration loops.
* **The Next.js Upgrade**: Computing workloads are shifted completely onto the server inside a robust Server Component layer (`src/app/page.jsx`). Data values resolve directly from localized JSON database entries via filesystem operations (`fs.readFile`), executing keyword checks, product catalog mapping functions, and list sorting tasks before the HTML document is sent over the wire.

### 2. URL State Persistence vs. Volatile Memory States
* **The React + Vite Baseline**: Navigation changes and filter choices lived within temporary browser variables, resetting completely if a user refreshed their window view.
* **The Next.js Upgrade**: App states are anchored natively inside the URL query parameters using the page `searchParams` hook. Real-time keywords (`?search=`), targeted categories (`?category=`), and active sorting rules (`?sort=`) update URL structures directly. This design allows users to save bookmarks, navigate back and forth via browser history, and deep-link directly to specific search configurations.

### 3. Native Streaming Hydration vs. Manual State Spinners
* **The React + Vite Baseline**: Conditional evaluation paths manually checked loading flags to render interface indicators, which could block overall content readability.
* **The Next.js Upgrade**: Leverages native React 19 `<Suspense>` boundaries integrated directly with Next.js page layouts. The application streams layout code smoothly while server operations process data assets in the background, minimizing layout disruption.

---

## Features

### 1. Modular and Declarative Layout Architecture
* **Encapsulated Sub-Elements**: Layout presentation rules are broken down into decoupled elements like `SearchBar`, `FilterTabs`, `SortDropdown`, and `ProductCard`.
* **Fluid System Styling**: Leverages Tailwind CSS v4 to apply typography metrics and dark mode color profiles seamlessly (`bg-dark-bg`).

### 2. Server-Driven Search Framework
* **Payload Mappings**: Iterates through asynchronous parameters to apply precise string matching logic against product collections prior to layout rendering.
* **Dynamic Generation Engines**: Rather than hardcoding category options, an automated mapping sequence extracts active parameters directly from dataset payloads to render category selection states on the fly.

---

## Technical Optimizations (The "Pro" Challenge)

### Client Bundle Code Reduction
By shifting array processing logic to Next.js Server Components, heavy JavaScript filter processing engines are stripped out of client bundle assets. Browsers download pre-rendered structural HTML rather than bulky execution scripts, resulting in faster load times.

### Automated Compiler Memoization
Since data computations are completed before layout transmission, the application benefits from immutable data structures. Integrating `babel-plugin-react-compiler` enables automated code-driven component cache tracking, eliminating the need for manual `useMemo` hooks.

---

## Tech Stack and Libraries

* **Framework Engine**: Next.js 16 (App Router Architecture)
* **Core Layout Runtime**: React 19
* **Style Preprocessor**: Tailwind CSS v4 (Powered by native `@tailwindcss/postcss` compiler engines)
* **Icon Set Integration**: Lucide React
* **Typography Engine**: Geist Sans & Geist Mono (Optimized variable system font layouts)

---

## Installation and Setup

Make sure Node.js is configured on your machine. This workspace uses `pnpm` for local package management.

### 1. Clone and Enter Project
```bash
git clone <repository-url>
cd storefront_next
```

### 2. Install Project Dependencies
```bash
pnpm install
```

### 3. Fire Up the Next.js Local Server
```bash
pnpm dev
```

Open http://localhost:3000 inside your web browser to view the application layout.

### 4. Compile Production Builds and Initialize Live Servers
```bash
pnpm build
pnpm start
```

---

## Challenges and Solutions

### Challenge 1: Preserving Interactive Smoothness in an SSR Search Setup
* **Problem**: Converting a live text input search bar to a server-side rendering setup could cause typing lag if every single keystroke triggers a route revalidation.
* **Solution**: Separated structural values from input monitoring. Input elements track character entries locally, updating URL query path strings only upon explicit submission thresholds to minimize server processing demands.

### Challenge 2: Parsing Asynchronous Parameter Inputs Safely
* **Problem**: Next.js resolves `searchParams` inputs as asynchronous objects. Attempting to parse properties immediately can cause runtime errors during render cycles.
* **Solution**: Implemented an explicit validation pipeline inside `Page({ searchParams })` using `await searchParams` to properly extract search queries and establish safe execution fallbacks (`|| 'All'`) prior to running filter routines.
