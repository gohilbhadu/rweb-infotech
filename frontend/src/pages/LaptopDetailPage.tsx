import { useState } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { ChevronRight, ArrowLeft, Phone, MessageCircle, ShoppingCart } from 'lucide-react';
import { useGetModelByName } from '../hooks/useQueries';
import LoadingState from '../components/state/LoadingState';
import ErrorState from '../components/state/ErrorState';
import ImageGallery from '../components/laptop/ImageGallery';
import VariantSelector from '../components/laptop/VariantSelector';
import SpecsSections from '../components/laptop/SpecsSections';
import type { LaptopVariant } from '../backend';

export default function LaptopDetailPage() {
  const { brandName, modelName } = useParams({ from: '/laptop/$brandName/$modelName' });
  const { data: model, isLoading, isError, error, refetch } = useGetModelByName(brandName, modelName);
  const [selectedVariant, setSelectedVariant] = useState<LaptopVariant | null>(null);

  const activeVariant = selectedVariant ?? (model?.variants?.[0] ?? null);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-foreground to-foreground/90 text-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-background/60 text-sm mb-3">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/products" className="hover:text-primary transition-colors">Laptops</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>{brandName}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-background/90">{modelName}</span>
          </div>
          <h1 className="font-display font-bold text-2xl md:text-3xl">
            {brandName} <span className="text-primary">{modelName}</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Laptops
        </Link>

        {isLoading && <LoadingState variant="list" />}
        {isError && <ErrorState error={error} onRetry={refetch} />}

        {!isLoading && !isError && !model && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Laptop not found.</p>
            <Link to="/products" className="mt-4 inline-block text-primary hover:text-accent font-medium transition-colors">
              Browse all laptops
            </Link>
          </div>
        )}

        {!isLoading && !isError && model && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
            {/* Left: Image Gallery */}
            <div>
              <ImageGallery
                images={activeVariant?.imageUrls ?? model.imageUrls ?? []}
                modelName={`${brandName} ${modelName}`}
              />
            </div>

            {/* Right: Details */}
            <div className="space-y-6">
              {/* Variant Selector */}
              {model.variants && model.variants.length > 0 && (
                <div className="bg-card rounded-2xl border border-border p-5 shadow-card">
                  <h2 className="font-display font-semibold text-foreground mb-4">Choose Variant</h2>
                  <VariantSelector
                    variants={model.variants}
                    selectedVariant={activeVariant}
                    onSelect={setSelectedVariant}
                  />
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-accent transition-all duration-200 shadow-primary hover:shadow-primary-lg hover:-translate-y-0.5"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Enquire Now
                </button>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-card border border-border text-foreground rounded-xl font-semibold text-sm hover:border-primary/40 hover:bg-muted/50 transition-all duration-200"
                >
                  <Phone className="w-4 h-4" />
                  Call Us
                </a>
                <Link
                  to="/chat"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-card border border-border text-foreground rounded-xl font-semibold text-sm hover:border-primary/40 hover:bg-muted/50 transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  Ask AI
                </Link>
              </div>

              {/* Specs */}
              {activeVariant && (
                <div className="bg-card rounded-2xl border border-border p-5 shadow-card">
                  <h2 className="font-display font-semibold text-foreground mb-4">Specifications</h2>
                  <SpecsSections
                    variant={activeVariant}
                    brandName={brandName}
                    modelName={modelName}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
