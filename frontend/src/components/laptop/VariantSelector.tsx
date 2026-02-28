import type { LaptopVariant } from '../../backend';
import { Cpu, MemoryStick, HardDrive, Check } from 'lucide-react';

interface VariantSelectorProps {
  variants: LaptopVariant[];
  selectedVariant?: LaptopVariant | null;
  selectedIndex?: number;
  onSelect: (variant: LaptopVariant) => void;
}

export default function VariantSelector({ variants, selectedVariant, selectedIndex, onSelect }: VariantSelectorProps) {
  const isSelected = (variant: LaptopVariant, index: number): boolean => {
    if (selectedVariant !== undefined) {
      return selectedVariant?.variantName === variant.variantName;
    }
    return selectedIndex === index;
  };

  return (
    <div className="space-y-2">
      {variants.map((variant, index) => {
        const selected = isSelected(variant, index);
        return (
          <button
            key={variant.variantName}
            onClick={() => onSelect(variant)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
              selected
                ? 'border-primary bg-primary/5 shadow-primary'
                : 'border-border hover:border-primary/40 hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-display font-semibold text-sm text-foreground">
                {variant.variantName}
              </span>
              {selected && (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Cpu className="w-3.5 h-3.5 text-primary/70" />
                {variant.processor}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MemoryStick className="w-3.5 h-3.5 text-primary/70" />
                {variant.ram}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <HardDrive className="w-3.5 h-3.5 text-primary/70" />
                {variant.storage}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
