import { Link } from '@tanstack/react-router';
import { Tag, ChevronRight } from 'lucide-react';
import { useGetAllBrands } from '../hooks/useQueries';
import LoadingState from '../components/state/LoadingState';
import ErrorState from '../components/state/ErrorState';
import BrandTile from '../components/brands/BrandTile';

export default function BrandsPage() {
  const { data: brands = [], isLoading, isError, error, refetch } = useGetAllBrands();

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-foreground to-foreground/90 text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-background/60 text-sm mb-3">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Brands</span>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-2">
            Our <span className="text-primary">Brands</span>
          </h1>
          <p className="text-background/70">
            Explore laptops from the world's leading manufacturers
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {isLoading && <LoadingState variant="grid" />}
        {isError && <ErrorState error={error} onRetry={refetch} />}
        {!isLoading && !isError && brands.length === 0 && (
          <div className="text-center py-20">
            <Tag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">No Brands Found</h3>
            <p className="text-muted-foreground">Check back soon for our brand catalog.</p>
          </div>
        )}
        {!isLoading && !isError && brands.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <BrandTile key={brand.brandName} brand={brand} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
