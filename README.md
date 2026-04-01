# EPREL Smart Buy

A web app that helps EU consumers compare household appliances by energy efficiency, running costs, and repairability — using official EU data from the [EPREL registry](https://eprel.ec.europa.eu/).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/danielgrosssavoy/eprel_smart_buy.git
   cd eprel_smart_buy
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the URL shown in the terminal (usually http://localhost:5173).

### Other Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
  features/           # Feature-based modules
    home/             # Landing page
    washing-machines/ # Main functional feature
      components/     # ProductCard, ProductDetail, ComparisonView, SearchFilters
      data/           # Mock data (will be replaced by EPREL API)
      hooks/          # useProductFilter, useComparison
      types/          # TypeScript interfaces
    fridges/          # Coming soon
    dishwashers/      # Coming soon
  components/         # Shared components (Header, Footer, TabNav, UI)
  utils/              # Cost calculator, formatters
  types/              # Shared TypeScript types
```

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React (icons)

## License

MIT
