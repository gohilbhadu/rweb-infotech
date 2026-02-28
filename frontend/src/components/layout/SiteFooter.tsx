import { Link } from '@tanstack/react-router';
import { Laptop, MapPin, Phone, Mail, Heart, ExternalLink } from 'lucide-react';
import { SiFacebook, SiX, SiInstagram, SiYoutube } from 'react-icons/si';

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'rweb-infotech';
  const utmLink = `https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="text-white" style={{ backgroundColor: 'var(--nav-bg)' }}>
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
              >
                <Laptop size={22} className="text-white" />
              </div>
              <div>
                <div className="font-display font-bold text-lg leading-tight">Rweb Infotech</div>
                <div className="text-xs" style={{ color: 'var(--primary)' }}>Laptop Specialists</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'oklch(0.75 0.03 60)' }}>
              Your trusted partner for premium laptops and IT services. We offer the best brands with expert guidance and after-sales support.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: 'oklch(0.65 0.19 45 / 0.20)' }}>
                <SiFacebook size={14} style={{ color: 'var(--primary)' }} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: 'oklch(0.65 0.19 45 / 0.20)' }}>
                <SiX size={14} style={{ color: 'var(--primary)' }} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: 'oklch(0.65 0.19 45 / 0.20)' }}>
                <SiInstagram size={14} style={{ color: 'var(--primary)' }} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110" style={{ backgroundColor: 'oklch(0.65 0.19 45 / 0.20)' }}>
                <SiYoutube size={14} style={{ color: 'var(--primary)' }} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-base mb-4" style={{ color: 'var(--primary)' }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'All Products' },
                { to: '/brands', label: 'Brands' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
                { to: '/chat', label: 'AI Assistant' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'oklch(0.75 0.03 60)' }}
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-base mb-4" style={{ color: 'var(--primary)' }}>
              Our Services
            </h3>
            <ul className="space-y-2">
              {[
                'Laptop Sales',
                'Laptop Repair',
                'Data Recovery',
                'OS Installation',
                'Hardware Upgrade',
                'Annual Maintenance',
                'Corporate Supply',
              ].map((service) => (
                <li key={service} className="text-sm" style={{ color: 'oklch(0.75 0.03 60)' }}>
                  ✓ {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-base mb-4" style={{ color: 'var(--primary)' }}>
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--primary)' }} />
                <div>
                  <p className="text-sm" style={{ color: 'oklch(0.75 0.03 60)' }}>
                    Shop No. 12, Tech Plaza,<br />
                    MG Road, Bangalore - 560001,<br />
                    Karnataka, India
                  </p>
                  <a
                    href="https://maps.google.com/?q=MG+Road+Bangalore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs mt-1 transition-colors hover:opacity-80"
                    style={{ color: 'var(--primary)' }}
                  >
                    View on Google Maps <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} className="shrink-0" style={{ color: 'var(--primary)' }} />
                <div>
                  <a href="tel:+919876543210" className="text-sm transition-colors hover:text-white" style={{ color: 'oklch(0.75 0.03 60)' }}>
                    +91 98765 43210
                  </a>
                  <p className="text-xs" style={{ color: 'oklch(0.60 0.03 60)' }}>CEO: Rajesh Kumar</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16} className="shrink-0" style={{ color: 'var(--primary)' }} />
                <a href="mailto:info@rwebinfotech.com" className="text-sm transition-colors hover:text-white" style={{ color: 'oklch(0.75 0.03 60)' }}>
                  info@rwebinfotech.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: 'oklch(0.60 0.03 60)' }}>
            © {year} Rweb Infotech. All rights reserved.
          </p>
          <p className="text-xs flex items-center gap-1" style={{ color: 'oklch(0.60 0.03 60)' }}>
            Built with <Heart size={12} fill="currentColor" style={{ color: 'var(--primary)' }} /> using{' '}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:opacity-80"
              style={{ color: 'var(--primary)' }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
