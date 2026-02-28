import { Cpu, MemoryStick, HardDrive, Tag } from 'lucide-react';
import type { LaptopVariant } from '../../backend';

interface SpecsSectionsProps {
  variant: LaptopVariant;
  brandName?: string;
  modelName?: string;
}

export default function SpecsSections({ variant, brandName, modelName }: SpecsSectionsProps) {
  const sections = [
    {
      icon: Cpu,
      title: 'Performance',
      specs: [
        { label: 'Processor', value: variant.processor },
        { label: 'RAM', value: variant.ram },
      ],
    },
    {
      icon: HardDrive,
      title: 'Storage',
      specs: [
        { label: 'Storage', value: variant.storage },
      ],
    },
    {
      icon: Tag,
      title: 'General',
      specs: [
        ...(brandName ? [{ label: 'Brand', value: brandName }] : []),
        ...(modelName ? [{ label: 'Model', value: modelName }] : []),
        { label: 'Variant', value: variant.variantName },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {sections.map((section) => {
        if (section.specs.length === 0) return null;
        return (
          <div key={section.title}>
            <div className="flex items-center gap-2 mb-2">
              <section.icon className="w-4 h-4 text-primary" />
              <h3 className="font-display font-semibold text-sm text-foreground">{section.title}</h3>
            </div>
            <div className="bg-muted/40 rounded-xl overflow-hidden">
              {section.specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`flex items-center justify-between px-4 py-2.5 text-sm ${
                    i < section.specs.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <span className="text-muted-foreground font-medium">{spec.label}</span>
                  <span className="text-foreground font-semibold text-right max-w-[60%]">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
