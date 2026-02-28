import { useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';
import { useGetAllBrands } from '../hooks/useQueries';
import LoadingState from '../components/state/LoadingState';
import ErrorState from '../components/state/ErrorState';
import LaptopCard from '../components/catalog/LaptopCard';
import CatalogFiltersBar from '../components/catalog/CatalogFiltersBar';
import type { Brand, LaptopModel } from '../backend';

interface FlatLaptop {
  brand: Brand;
  model: LaptopModel;
}

export default function CatalogPage() {
  const { data: brands = [], isLoading, isError, error, refetch } = useGetAllBrands();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedRam, setSelectedRam] = useState('');

  const allLaptops = useMemo<FlatLaptop[]>(() => {
    if (!brands || brands.length === 0) return [];
    return brands.flatMap((brand) =>
      (brand.models || []).map((model) => ({ brand, model }))
    );
  }, [brands]);

  const filteredLaptops = useMemo(() => {
    return allLaptops.filter(({ brand, model }) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        brand.brandName.toLowerCase().includes(q) ||
        model.modelName.toLowerCase().includes(q) ||
        (model.variants || []).some(
          (v) =>
            v.processor.toLowerCase().includes(q) ||
            v.ram.toLowerCase().includes(q) ||
            v.storage.toLowerCase().includes(q)
        );
      const matchesBrand = !selectedBrand || brand.brandName === selectedBrand;
      const matchesRam =
        !selectedRam ||
        (model.variants || []).some((v) => v.ram === selectedRam);
      return matchesSearch && matchesBrand && matchesRam;
    });
  }, [allLaptops, searchQuery, selectedBrand, selectedRam]);

  const allRamOptions = useMemo(() => {
    const ramSet = new Set<string>();
    allLaptops.forEach(({ model }) => {
      (model.variants || []).forEach((v) => ramSet.add(v.ram));
    });
    return Array.from(ramSet).sort();
  }, [allLaptops]);

  const brandNames = useMemo(() => brands.map((b) => b.brandName), [brands]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedBrand('');
    setSelectedRam('');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-foreground to-foreground/90 text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-background/60 text-sm mb-3">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Catalog</span>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">
            Laptop <span className="text-primary">Catalog</span>
          </h1>
          <p className="text-background/70">
            {isLoading ? 'Loading...' : `${filteredLaptops.length} laptop${filteredLaptops.length !== 1 ? 's' : ''} available`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <CatalogFiltersBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedBrand={selectedBrand}
            onBrandChange={setSelectedBrand}
            selectedRam={selectedRam}
            onRamChange={setSelectedRam}
            brandNames={brandNames}
            ramOptions={allRamOptions}
            onClearFilters={handleClearFilters}
          />
        </div>

        {isLoading && <LoadingState variant="grid" />}
        {isError && <ErrorState error={error} onRetry={refetch} />}

        {!isLoading && !isError && filteredLaptops.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No laptops match your filters.</p>
            <button
              onClick={handleClearFilters}
              className="mt-4 text-primary hover:text-accent font-medium transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {!isLoading && !isError && filteredLaptops.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLaptops.map(({ brand, model }) => (
              <LaptopCard
                key={`${brand.brandName}-${model.modelName}`}
                brand={brand}
                model={model}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
