import { useState, useMemo } from 'react';
import { TabNav } from '../../components/layout/TabNav';
import { SearchFilters } from './components/SearchFilters';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { ComparisonView } from './components/ComparisonView';
import { useProductFilter, defaultFilters } from './hooks/useProductFilter';
import { useComparison } from './hooks/useComparison';
import { mockWashingMachines } from './data/mockWashingMachines';
import type { WashingMachine } from './types/washingMachine';
import type { Filters } from './hooks/useProductFilter';
import { GitCompareArrows, LayoutGrid, List } from 'lucide-react';

export function WashingMachinesPage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<WashingMachine | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const brands = useMemo(
    () => [...new Set(mockWashingMachines.map((p) => p.brand))].sort(),
    []
  );

  const filteredProducts = useProductFilter(mockWashingMachines, filters);
  const { selectedIds, toggleCompare, clearComparison, isSelected, isFull, count } = useComparison();

  const comparisonProducts = useMemo(
    () => mockWashingMachines.filter((p) => selectedIds.has(p.id)),
    [selectedIds]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <TabNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Washing Machines</h1>
          <p className="text-sm text-gray-500 mt-1">
            Compare {mockWashingMachines.length} washing machines by energy efficiency, running costs, and repairability.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <SearchFilters
            filters={filters}
            onFilterChange={setFilters}
            brands={brands}
            isOpen={filtersOpen}
            onToggle={() => setFiltersOpen(!filtersOpen)}
          />
        </div>

        {/* Results count + view toggle */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
          </p>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${
                viewMode === 'list'
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No products match your filters.</p>
            <button
              onClick={() => setFilters(defaultFilters)}
              className="mt-3 text-sm text-green-600 hover:text-green-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'flex flex-col gap-3'
          }>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                layout={viewMode}
                isCompareSelected={isSelected(product.id)}
                isCompareFull={isFull}
                onToggleCompare={toggleCompare}
                onViewDetails={setDetailProduct}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sticky comparison bar */}
      {count > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GitCompareArrows className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                {count} {count === 1 ? 'product' : 'products'} selected
              </span>
              <button
                onClick={clearComparison}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
            </div>
            <button
              onClick={() => setShowComparison(true)}
              disabled={count < 2}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                count >= 2
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Compare ({count})
            </button>
          </div>
        </div>
      )}

      {/* Product detail modal */}
      {detailProduct && (
        <ProductDetail product={detailProduct} onClose={() => setDetailProduct(null)} />
      )}

      {/* Comparison modal */}
      {showComparison && comparisonProducts.length >= 2 && (
        <ComparisonView
          products={comparisonProducts}
          onRemove={toggleCompare}
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  );
}
