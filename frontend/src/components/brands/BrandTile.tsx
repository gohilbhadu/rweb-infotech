import { Link } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import type { Brand } from '../../backend';
import { getBrandImage } from '../../lib/assets/placeholders';

interface BrandTileProps {
  brand: Brand;
}

export default function BrandTile({ brand }: BrandTileProps) {
  const brandImage = getBrandImage(brand.imageUrls || []);
  const modelCount = brand.models?.length || 0;

  return (
    <Link
      to="/catalog"
      search={{ brand: brand.brandName }}
    >
      <Card className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg bg-muted">
            <img
              src={brandImage}
              alt={brand.brandName}
              className="h-full w-full object-contain transition-transform duration-300 hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = '/assets/generated/brand-placeholder.dim_256x256.png';
              }}
            />
          </div>
          <h3 className="mb-2 text-xl font-semibold">{brand.brandName}</h3>
          <p className="text-sm text-muted-foreground">
            {modelCount} {modelCount === 1 ? 'model' : 'models'}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
