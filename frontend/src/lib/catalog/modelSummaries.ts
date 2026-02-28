import type { LaptopVariant } from '../../backend';

export interface ModelSummary {
  processor: string;
  ram: string;
  storage: string;
}

export function getModelSummarySpecs(variant: LaptopVariant): ModelSummary {
  return {
    processor: variant.processor || 'N/A',
    ram: variant.ram || 'N/A',
    storage: variant.storage || 'N/A',
  };
}
