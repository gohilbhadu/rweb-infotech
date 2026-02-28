import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

interface SearchBarProps {
  className?: string;
  onClose?: () => void;
}

export default function SearchBar({ className = '', onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate({ to: '/products', search: { q: query.trim() } as Record<string, string> });
      if (onClose) onClose();
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <form onSubmit={handleSearch} className={`relative flex items-center ${className}`}>
      <div className="relative flex items-center w-full">
        <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search laptops, brands..."
          className="w-full pl-9 pr-8 py-2 text-sm bg-muted/60 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 placeholder:text-muted-foreground"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </form>
  );
}
