import { Link } from '@tanstack/react-router';
import { Cpu, HardDrive, MemoryStick, ChevronRight } from 'lucide-react';
import type { Brand, LaptopModel } from '../../backend';
import { getLaptopPlaceholder } from '../../lib/assets/placeholders';

interface LaptopCardProps {
  brand: Brand;
  model: LaptopModel;
}

export default function LaptopCard({ brand, model }: LaptopCardProps) {
  const firstVariant = model.variants && model.variants.length > 0 ? model.variants[0] : null;
  const imageUrl = getLaptopPlaceholder(0);

  return (
    <Link
      to="/laptop/$brandName/$modelName"
      params={{ brandName: brand.brandName, modelName: model.modelName }}
      className="group block bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1.5 hover:border-primary/30 transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-44 bg-muted overflow-hidden">
        <img
          src={imageUrl}
          alt={`${brand.brandName} ${model.modelName}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = getLaptopPlaceholder(1);
          }}
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-foreground/80 text-background text-xs font-semibold rounded-full backdrop-blur-sm">
            {brand.brandName}
          </span>
        </div>
        {model.variants && model.variants.length > 1 && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full backdrop-blur-sm">
              {model.variants.length} variants
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors duration-200 mb-3">
          {model.modelName}
        </h3>

        {firstVariant && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Cpu className="w-3.5 h-3.5 text-primary/70 shrink-0" />
              <span className="truncate">{firstVariant.processor}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MemoryStick className="w-3.5 h-3.5 text-primary/70 shrink-0" />
              <span>{firstVariant.ram} RAM</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <HardDrive className="w-3.5 h-3.5 text-primary/70 shrink-0" />
              <span>{firstVariant.storage}</span>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {model.variants?.length || 0} variant{(model.variants?.length || 0) !== 1 ? 's' : ''}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all duration-200">
            View Details <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
