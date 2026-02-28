import { Link } from '@tanstack/react-router';
import { ArrowRight, Laptop, Shield, Zap, Star, ChevronRight, Tag, MessageCircle, Headphones } from 'lucide-react';
import { useGetAllBrands } from '../hooks/useQueries';

const features = [
  {
    icon: Laptop,
    title: 'Premium Brands',
    description: 'Apple, Dell, HP, Asus and more top brands with genuine products and warranty.',
    colorClass: 'text-primary',
    bgClass: 'bg-primary/10',
  },
  {
    icon: Shield,
    title: 'Genuine Products',
    description: 'Every laptop is 100% authentic with manufacturer warranty and quality assurance.',
    colorClass: 'text-success',
    bgClass: 'bg-success/10',
  },
  {
    icon: Zap,
    title: 'Expert Guidance',
    description: 'Our AI assistant and expert team help you find the perfect laptop for your needs.',
    colorClass: 'text-warning',
    bgClass: 'bg-warning/10',
  },
  {
    icon: Headphones,
    title: 'After-Sales Support',
    description: 'Dedicated support team available for setup, repairs, and technical assistance.',
    colorClass: 'text-accent',
    bgClass: 'bg-accent/10',
  },
];

const stats = [
  { value: '500+', label: 'Laptops Sold' },
  { value: '4', label: 'Premium Brands' },
  { value: '10+', label: 'Models Available' },
  { value: '98%', label: 'Customer Satisfaction' },
];

export default function HomePage() {
  const { data: brands = [] } = useGetAllBrands();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 text-background">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/assets/generated/laptops-hero.dim_1600x600.png"
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/20 border border-primary/30 rounded-full text-primary text-xs font-semibold mb-6">
              <Star className="w-3.5 h-3.5 fill-primary" />
              Trusted Laptop Retailer in Bangalore
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              Find Your{' '}
              <span className="text-primary">Perfect Laptop</span>{' '}
              at Rweb Infotech
            </h1>
            <p className="text-background/75 text-lg md:text-xl leading-relaxed mb-8">
              Explore our curated collection of premium laptops from Apple, Dell, HP, Asus and more. Expert advice, genuine products, and unbeatable service.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-accent transition-all duration-200 shadow-primary hover:shadow-primary-lg hover:-translate-y-0.5"
              >
                Browse Laptops
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/chat"
                className="inline-flex items-center gap-2 px-6 py-3 bg-background/10 border border-background/30 text-background rounded-xl font-semibold text-sm hover:bg-background/20 transition-all duration-200 backdrop-blur-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Ask AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-2xl md:text-3xl">{stat.value}</div>
                <div className="text-primary-foreground/75 text-sm mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Why Choose <span className="text-primary">Rweb Infotech?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're committed to providing the best laptop buying experience with genuine products and expert support.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 ${feature.bgClass} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.colorClass}`} />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      {brands.length > 0 && (
        <section className="py-16 bg-muted/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-display font-bold text-3xl text-foreground mb-2">
                  Top <span className="text-primary">Brands</span>
                </h2>
                <p className="text-muted-foreground">Explore laptops from leading manufacturers</p>
              </div>
              <Link
                to="/brands"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {brands.map((brand) => (
                <Link
                  key={brand.brandName}
                  to="/products"
                  className="group p-6 bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-muted flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                    <img
                      src="/assets/generated/brand-placeholder.dim_256x256.png"
                      alt={brand.brandName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center">
                      <Tag className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                    {brand.brandName}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {brand.models.length} model{brand.models.length !== 1 ? 's' : ''}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center sm:hidden">
              <Link
                to="/brands"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors"
              >
                View All Brands <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Browse CTA */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary to-accent rounded-2xl p-8 text-primary-foreground">
              <div className="relative z-10">
                <Laptop className="w-10 h-10 mb-4 opacity-90" />
                <h3 className="font-display font-bold text-2xl mb-3">Browse All Laptops</h3>
                <p className="text-primary-foreground/80 mb-6 text-sm leading-relaxed">
                  Explore our complete catalog with detailed specs, multiple variants, and competitive pricing.
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-foreground text-primary rounded-xl font-semibold text-sm hover:bg-primary-foreground/90 transition-all duration-200"
                >
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-primary-foreground/10 rounded-full" />
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-foreground/5 rounded-full" />
            </div>

            {/* Chat CTA */}
            <div className="relative overflow-hidden bg-gradient-to-br from-foreground to-foreground/80 rounded-2xl p-8 text-background">
              <div className="relative z-10">
                <MessageCircle className="w-10 h-10 mb-4 text-primary" />
                <h3 className="font-display font-bold text-2xl mb-3">Need Help Choosing?</h3>
                <p className="text-background/70 mb-6 text-sm leading-relaxed">
                  Chat with our AI assistant to get personalized laptop recommendations based on your needs and budget.
                </p>
                <Link
                  to="/chat"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-accent transition-all duration-200"
                >
                  Start Chat <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-background/5 rounded-full" />
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-background/5 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
