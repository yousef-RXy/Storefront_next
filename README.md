# Storefront Application (Next.js Architecture Upgrade)

A high-performance e-commerce catalog application built using Next.js (App Router), React 19, and Tailwind CSS v4. This repository represents an architectural migration and premium upgrade from the previous pure React + Vite client-side Single Page Application (SPA). By transitioning processing workloads to the server, this version maximizes runtime efficiency, eliminates layout shifts, and introduces bulletproof state persistence.

---

## Architectural Upgrades: Next.js vs. Pure React + Vite

### 1. Server-Side Data Processing vs. Client-Side Overhead
* **The React + Vite Baseline**: The previous architecture fetched the entire product catalog over the network on mount, relying on client-side hooks (`useEffect`, `useFetch`) and component local state (`useState`) to compute filter and sorting changes in the browser.
* **The Next.js Upgrade**: Computing logic is moved entirely to the server inside a Server Component (`src/app/page.jsx`). Data is resolved locally via filesystem integration (`fs.readFile`) from a structured JSON data cache, executing array mappings, category isolation, and sorting logic before rendering the HTML. This dramatically cuts Time to Interactive (TTI) and eliminates client CPU overhead.

### 2. URL query-Driven State vs. Volatile In-Memory State
* **The React + Vite Baseline**: Filter tabs, sort selections, and search terms were kept inside memory-bound React states. Refreshing the browser or navigating away completely reset user browsing contexts.
* **The Next.js Upgrade**: Application states are anchored natively inside the URL query string using `searchParams`. Search modifications, category filters, and product ordering criteria are handled via active route parameters (`?search=`, `?category=`, `?sort=`). This architecture allows users to deep-link, bookmark, and share exact filtered search views with full back-and-forth browser history retention.

### 3. Native Streaming Architecture vs. Manual Loading States
* **The React + Vite Baseline**: Managed loading indicators by checking boolean variables manually within conditional rendering flags, which occasionally resulted in component flashing during initial hydration.
* **The Next.js Upgrade**: Leverages native React 19 `<Suspense>` boundaries integrated directly with Next.js page layouts. UI hydration is handled smoothly via declarative stream fallbacks while server threads resolve background dataset operations.

---

## Core Features

### 1. Modular and Declarative Layout Structure
* **Encapsulated Interfaces**: Built around decoupled custom interface layers including `SearchBar`, `FilterTabs`, `SortDropdown`, and `ProductCard`.
* **Zero Layout Shift Responsiveness**: Implements rigid responsive layout frameworks utilizing custom design system tokens (`bg-dark-bg`, `text-brand-gold`). Elements scale securely using automated column allocations across desktop, tablet, and mobile displays.

### 2. Live Dynamic Server Filtering
* **Dynamic Content Query Matching**: Handles user search queries directly via request extraction pipelines, compiling filtered arrays securely prior to document emission.
* **Payground Generation Framework**: Rather than hardcoding static filter tabs, an analytical sequence automatically aggregates categorical payloads directly from active catalog arrays to generate available filters on the fly.

---

## Tech Stack and Libraries

* **Framework Engine**: Next.js 16 (App Router Architecture)
* **Core Runtime Library**: React 19
* **Style Preprocessor**: Tailwind CSS v4 (Utilizing the native `@tailwindcss/postcss` compiler)
* **Iconography Integration**: Lucide React
* **Typography**: Geist Sans & Geist Mono (Optimized system variable font injection)

---

## Technical Optimizations (The "Pro" Challenge)

### Compilation Offloading and Code Stripping
By transitioning the catalog to a Next.js App Router layout, heavy computational array filters, category indexing loops, and sorting algorithms are stripped out of the client bundle. The client browser only downloads lightweight presentation structures, reducing overall bundle sizes.

### Automated Server Memoization
Since data mutations occur prior to execution delivery, the system relies on immutable route state processing. The installation of `babel-plugin-react-compiler` ensures strict compiler-led hook cache handling across subordinate presentation components without requiring tedious manual memo setups.

---

## Installation and Setup

Ensure you have Node.js installed in your environment. This codebase uses `pnpm` for local build and package management.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd storefront_next
