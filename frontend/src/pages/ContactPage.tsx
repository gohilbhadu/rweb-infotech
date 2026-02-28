import { Link } from '@tanstack/react-router';
import { ChevronRight, MapPin, Phone, Mail, Clock, User, ExternalLink, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Hero */}
      <div className="bg-gradient-to-r from-foreground to-foreground/90 text-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-background/60 text-sm mb-3">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Contact</span>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-background/75 text-lg max-w-xl">
            We'd love to hear from you. Visit us, call us, or chat with our AI assistant.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <div className="lg:col-span-1 space-y-5">
            {/* CEO Card */}
            <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6 text-primary-foreground shadow-primary">
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-xl flex items-center justify-center mb-4">
                <User className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg mb-1">Rajesh Kumar</h3>
              <p className="text-primary-foreground/80 text-sm mb-4">Chief Executive Officer</p>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-xl text-sm font-medium transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </a>
            </div>

            {/* Location Card */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">Our Location</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                123 Tech Park, MG Road,<br />
                Bangalore, Karnataka 560001,<br />
                India
              </p>
              <a
                href="https://maps.google.com/?q=MG+Road+Bangalore+Karnataka"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors duration-200"
              >
                View on Google Maps <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Hours Card */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-3">Business Hours</h3>
              <div className="space-y-2 text-sm">
                {[
                  { day: 'Monday – Friday', hours: '9:00 AM – 7:00 PM' },
                  { day: 'Saturday', hours: '10:00 AM – 6:00 PM' },
                  { day: 'Sunday', hours: 'Closed' },
                ].map((item) => (
                  <div key={item.day} className="flex justify-between">
                    <span className="text-muted-foreground">{item.day}</span>
                    <span className={`font-medium ${item.hours === 'Closed' ? 'text-destructive' : 'text-foreground'}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map & Contact Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Embed */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card">
              <div className="p-5 border-b border-border">
                <h2 className="font-display font-semibold text-foreground">Find Us</h2>
              </div>
              <div className="relative h-64 bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9851!2d77.6101!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sMG%20Road%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Rweb Infotech Location"
                  className="absolute inset-0"
                />
              </div>
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="tel:+919876543210"
                className="group flex items-center gap-4 bg-card border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                  <p className="font-semibold text-foreground text-sm">+91 98765 43210</p>
                </div>
              </a>

              <a
                href="mailto:info@rwebinfotech.com"
                className="group flex items-center gap-4 bg-card border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                  <p className="font-semibold text-foreground text-sm">info@rwebinfotech.com</p>
                </div>
              </a>
            </div>

            {/* AI Chat CTA */}
            <div className="bg-gradient-to-r from-foreground to-foreground/90 rounded-2xl p-6 text-background">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-background mb-1">Prefer to Chat?</h3>
                  <p className="text-background/70 text-sm">Our AI assistant is available 24/7 to answer your questions.</p>
                </div>
                <Link
                  to="/chat"
                  className="shrink-0 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-accent transition-colors duration-200"
                >
                  Chat Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
