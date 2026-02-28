import { Shield, Target, Eye, Users, Award, Cpu, Headphones, Wrench, TrendingUp, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const values = [
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We believe in transparent pricing, honest advice, and genuine products. No hidden charges, ever.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Every decision we make is centered around delivering the best experience to our customers.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in every product we sell and every service we provide.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'We stay ahead of technology trends to bring you the latest and most capable laptops.',
  },
];

const services = [
  { icon: Cpu, title: 'Laptop Sales', desc: 'New, refurbished, and certified pre-owned laptops from all major brands.' },
  { icon: Wrench, title: 'Repair & Maintenance', desc: 'Expert repair services for all laptop brands with genuine spare parts.' },
  { icon: Headphones, title: 'Technical Support', desc: '24/7 technical assistance from our team of certified engineers.' },
  { icon: Users, title: 'Corporate Solutions', desc: 'Bulk procurement and IT solutions for businesses of all sizes.' },
];

const team = [
  { name: 'Rajesh Kumar', role: 'CEO & Founder', experience: '15+ years in IT' },
  { name: 'Priya Sharma', role: 'Technical Head', experience: 'Certified Engineer' },
  { name: 'Amit Patel', role: 'Sales Manager', experience: '10+ years experience' },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Hero */}
      <section className="hero-gradient py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: 'oklch(0.65 0.19 45 / 0.20)', color: 'var(--primary)' }}
          >
            <Award size={14} />
            Est. 2010 · Bangalore, India
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-6">
            About Rweb Infotech
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'oklch(0.80 0.03 60)' }}>
            Your trusted partner for premium laptops and IT services since 2010.
            We've helped over 5,000 customers find their perfect computing solution.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading font-bold text-3xl text-foreground mb-4">
                Who We Are
              </h2>
              <div className="section-divider w-16 mb-6" />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Rweb Infotech is a premier laptop dealership and IT services company based in Bangalore, India.
                  Founded in 2010 by Rajesh Kumar, we have grown from a small shop to one of the most trusted
                  names in the laptop industry across Karnataka.
                </p>
                <p>
                  We are authorized dealers for Apple, Dell, HP, Asus, Lenovo, and many other leading brands.
                  Our team of certified technicians and sales experts are dedicated to helping you find the
                  perfect laptop for your needs and budget.
                </p>
                <p>
                  Whether you're a student, professional, gamer, or business owner, we have the right laptop
                  for you. We also offer comprehensive after-sales support including repairs, upgrades, and
                  annual maintenance contracts.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '15+', label: 'Years of Experience' },
                { value: '5000+', label: 'Happy Customers' },
                { value: '500+', label: 'Laptops in Stock' },
                { value: '10+', label: 'Brand Partnerships' },
              ].map((stat) => (
                <Card key={stat.label} className="text-center p-6 border-border hover:shadow-card-hover transition-all duration-300">
                  <CardContent className="p-0">
                    <div
                      className="font-heading font-bold text-3xl mb-2"
                      style={{ color: 'var(--primary)' }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border overflow-hidden">
              <div className="h-2 orange-gradient" />
              <CardContent className="p-8">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
                >
                  <Target size={22} className="text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-3">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To make premium technology accessible to everyone by offering genuine products at competitive
                  prices, backed by expert guidance and exceptional after-sales support. We aim to be the
                  most trusted laptop destination in India.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border overflow-hidden">
              <div className="h-2 orange-gradient" />
              <CardContent className="p-8">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
                >
                  <Eye size={22} className="text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-3">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become India's leading multi-brand laptop retailer and service provider, known for our
                  integrity, expertise, and customer-centric approach. We envision a future where every
                  Indian has access to the best computing technology.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-foreground mb-3">Our Core Values</h2>
            <div className="section-divider w-24 mx-auto mb-4" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="group border-border hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
                  >
                    <value.icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-foreground mb-3">What We Offer</h2>
            <div className="section-divider w-24 mx-auto mb-4" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card key={service.title} className="group border-border hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
                  >
                    <service.icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-foreground mb-3">Meet Our Team</h2>
            <div className="section-divider w-24 mx-auto mb-4" />
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {team.map((member) => (
              <Card key={member.name} className="group border-border hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center">
                <CardContent className="p-6">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white transition-transform group-hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
                  >
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="font-heading font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm font-medium mt-1" style={{ color: 'var(--primary)' }}>{member.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
