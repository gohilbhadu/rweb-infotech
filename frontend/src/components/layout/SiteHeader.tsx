import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, Laptop, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';

const navLinks = [
  { to: '/', label: 'Home', icon: null as React.ElementType | null },
  { to: '/products', label: 'Products', icon: null as React.ElementType | null },
  { to: '/brands', label: 'Brands', icon: null as React.ElementType | null },
  { to: '/about', label: 'About Us', icon: null as React.ElementType | null },
  { to: '/contact', label: 'Contact', icon: null as React.ElementType | null },
  { to: '/chat', label: 'AI Chat', icon: MessageCircle as React.ElementType },
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (to: string) => {
    if (to === '/') return currentPath === '/';
    return currentPath.startsWith(to);
  };

  return (
    <header className="sticky top-0 z-50 shadow-lg" style={{ backgroundColor: 'var(--nav-bg)' }}>
      {/* Top bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <p className="text-xs" style={{ color: 'var(--nav-text)', opacity: 0.7 }}>
            🇮🇳 Trusted Laptop Dealer in India
          </p>
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:opacity-80"
            style={{ color: 'var(--primary)' }}
          >
            <Phone size={12} />
            +91 98765 43210
          </a>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
            >
              <Laptop size={22} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-lg leading-tight" style={{ color: 'var(--nav-text)' }}>
                Rweb Infotech
              </div>
              <div className="text-xs" style={{ color: 'var(--primary)' }}>
                Laptop Specialists
              </div>
            </div>
          </Link>

          {/* Search bar - desktop */}
          <div className="flex-1 max-w-xl hidden md:block">
            <SearchBar />
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    color: active ? 'var(--primary)' : 'var(--nav-text)',
                    backgroundColor: active ? 'oklch(0.65 0.19 45 / 0.15)' : undefined,
                    borderBottom: active ? '2px solid var(--primary)' : '2px solid transparent',
                  }}
                >
                  {IconComponent && <IconComponent size={15} />}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden ml-auto text-white hover:bg-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </Button>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-3">
          <SearchBar />
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10" style={{ backgroundColor: 'var(--nav-bg)' }}>
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    color: active ? 'var(--primary)' : 'var(--nav-text)',
                    backgroundColor: active ? 'oklch(0.65 0.19 45 / 0.15)' : 'transparent',
                  }}
                >
                  {IconComponent && <IconComponent size={16} />}
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
