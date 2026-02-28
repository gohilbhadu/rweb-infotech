import { Search, X } from 'lucide-react';

interface CatalogFiltersBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedBrand: string;
  onBrandChange: (value: string) => void;
  selectedRam: string;
  onRamChange: (value: string) => void;
  brandNames: string[];
  ramOptions: string[];
  onClearFilters: () => void;
}

export default function CatalogFiltersBar({
  searchQuery,
  onSearchChange,
  selectedBrand,
  onBrandChange,
  selectedRam,
  onRamChange,
  brandNames,
  ramOptions,
  onClearFilters,
}: CatalogFiltersBarProps) {
  const hasFilters = !!searchQuery || !!selectedBrand || !!selectedRam;

  return (
    <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by brand, model, processor..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 placeholder:text-muted-foreground"
          />
        </div>

        {/* Brand Filter */}
        <select
          value={selectedBrand}
          onChange={(e) => onBrandChange(e.target.value)}
          className="px-3 py-2.5 text-sm bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 text-foreground min-w-[130px]"
        >
          <option value="">All Brands</option>
          {brandNames.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        {/* RAM Filter */}
        <select
          value={selectedRam}
          onChange={(e) => onRamChange(e.target.value)}
          className="px-3 py-2.5 text-sm bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 text-foreground min-w-[120px]"
        >
          <option value="">All RAM</option>
          {ramOptions.map((ram) => (
            <option key={ram} value={ram}>{ram}</option>
          ))}
        </select>

        {/* Clear Filters */}
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-destructive border border-border hover:border-destructive/30 rounded-xl transition-all duration-200 whitespace-nowrap"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
