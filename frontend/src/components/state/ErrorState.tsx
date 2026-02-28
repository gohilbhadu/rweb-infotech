import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error?: unknown;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ error, message, onRetry }: ErrorStateProps) {
  const displayMessage =
    message ||
    (error instanceof Error ? error.message : 'An unexpected error occurred');

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 bg-destructive/10 rounded-2xl flex items-center justify-center mb-4">
        <AlertCircle className="w-7 h-7 text-destructive" />
      </div>
      <h3 className="font-display font-semibold text-lg text-foreground mb-2">Something went wrong</h3>
      <p className="text-muted-foreground text-sm max-w-sm mb-6">{displayMessage}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-accent transition-all duration-200 shadow-primary"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
}
