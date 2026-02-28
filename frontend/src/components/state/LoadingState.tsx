import { Skeleton } from '@/components/ui/skeleton';

interface LoadingStateProps {
  variant?: 'grid' | 'list';
  count?: number;
  message?: string;
}

export default function LoadingState({ variant = 'grid', count = 8 }: LoadingStateProps) {
  if (variant === 'list') {
    return (
      <div className="space-y-4 py-4">
        {Array.from({ length: Math.min(count, 4) }).map((_, i) => (
          <div key={i} className="flex gap-4 p-4 bg-card border border-border rounded-2xl">
            <Skeleton className="w-24 h-24 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden shadow-card">
          <Skeleton className="h-44 w-full rounded-none" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
