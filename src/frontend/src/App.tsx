import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Award,
  ChevronRight,
  Clock,
  Cpu,
  HardDrive,
  Headphones,
  Laptop,
  Mail,
  MapPin,
  MemoryStick,
  Menu,
  MessageCircle,
  Monitor,
  Package,
  Phone,
  Search,
  Shield,
  ShoppingCart,
  Star,
  Tag,
  Truck,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { Toaster, toast } from "sonner";
import type { Laptop as LaptopType } from "./backend.d.ts";
import { useActor } from "./hooks/useActor";
import {
  useGetAllLaptops,
  useSeedLaptops,
  useSubmitContactForm,
} from "./hooks/useQueries";

// ─── Laptop image map ───────────────────────────────────────────────────────
const laptopImageMap: Record<string, string> = {
  Apple: "/assets/generated/laptop-apple.dim_400x300.jpg",
  Dell: "/assets/generated/laptop-dell.dim_400x300.jpg",
  HP: "/assets/generated/laptop-hp.dim_400x300.jpg",
  Asus: "/assets/generated/laptop-asus.dim_400x300.jpg",
  Samsung: "/assets/generated/laptop-samsung.dim_400x300.jpg",
  Lenovo: "/assets/generated/laptop-lenovo.dim_400x300.jpg",
};

const brandColors: Record<string, string> = {
  Apple: "bg-zinc-900 text-white",
  Dell: "bg-blue-700 text-white",
  HP: "bg-indigo-700 text-white",
  Asus: "bg-red-700 text-white",
  Samsung: "bg-blue-500 text-white",
  Lenovo: "bg-red-900 text-white",
  MSI: "bg-red-600 text-white",
  Acer: "bg-green-700 text-white",
};

// ─── Animated Counter ──────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
}: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#products", label: "Products" },
    { href: "#brands", label: "Brands" },
    { href: "#about", label: "About Us" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-navbar" : ""
      }`}
      style={{ backgroundColor: "oklch(var(--navbar))" }}
    >
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#home"
            data-ocid="nav.link"
            className="flex items-center gap-2 shrink-0"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "oklch(var(--orange-600))" }}
            >
              <Laptop className="w-4 h-4 text-white" />
            </div>
            <span
              className="text-xl font-bold font-display"
              style={{ color: "oklch(var(--navbar-foreground))" }}
            >
              <span style={{ color: "oklch(var(--orange-600))" }}>Rweb</span>{" "}
              Infotech
            </span>
          </a>

          {/* Search bar - desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "oklch(0.6 0 0)" }}
            />
            <input
              type="text"
              placeholder="Search laptops, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-ocid="nav.search_input"
              className="w-full pl-10 pr-4 py-2 rounded-full text-sm outline-none transition-all duration-200 border"
              style={{
                backgroundColor: "oklch(0.25 0.01 250)",
                color: "oklch(var(--navbar-foreground))",
                borderColor: "oklch(0.35 0.01 250)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "oklch(var(--orange-600))";
                e.currentTarget.style.boxShadow =
                  "0 0 0 2px oklch(0.65 0.22 45 / 20%)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.35 0.01 250)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid="nav.link"
                className="text-sm font-medium transition-colors duration-200 hover:opacity-100 opacity-80"
                style={{ color: "oklch(var(--navbar-foreground))" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "oklch(var(--orange-600))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    "oklch(var(--navbar-foreground))";
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+919876543210"
              data-ocid="nav.link"
              className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full transition-all duration-200"
              style={{
                color: "oklch(var(--orange-600))",
                border: "1px solid oklch(var(--orange-600) / 40%)",
              }}
            >
              <Phone className="w-3.5 h-3.5" />
              Ravi Baraiya
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            data-ocid="nav.toggle"
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ color: "oklch(var(--navbar-foreground))" }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div
            className="lg:hidden py-4 border-t"
            style={{ borderColor: "oklch(0.30 0.01 250)" }}
          >
            {/* Mobile search */}
            <div className="relative mb-4">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "oklch(0.6 0 0)" }}
              />
              <input
                type="text"
                placeholder="Search laptops..."
                data-ocid="nav.search_input"
                className="w-full pl-10 pr-4 py-2 rounded-full text-sm outline-none border"
                style={{
                  backgroundColor: "oklch(0.25 0.01 250)",
                  color: "oklch(var(--navbar-foreground))",
                  borderColor: "oklch(0.35 0.01 250)",
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid="nav.link"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  style={{ color: "oklch(var(--navbar-foreground))" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "oklch(0.25 0.01 250)";
                    e.currentTarget.style.color = "oklch(var(--orange-600))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color =
                      "oklch(var(--navbar-foreground))";
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+919876543210"
                className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold"
                style={{
                  color: "oklch(var(--orange-600))",
                  border: "1px solid oklch(var(--orange-600))",
                }}
              >
                <Phone className="w-4 h-4" /> Ravi Baraiya
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Hero Section ──────────────────────────────────────────────────────────
function HeroSection() {
  const stats = [
    { icon: Package, label: "Laptops", value: "500+" },
    { icon: Award, label: "Brands", value: "50+" },
    { icon: Users, label: "Customers", value: "10,000+" },
    { icon: Star, label: "Rating", value: "5 Star" },
  ];

  return (
    <section
      id="home"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.99 0 0) 0%, oklch(0.96 0.015 220) 60%, oklch(0.94 0.02 210) 100%)",
      }}
    >
      {/* Background decorative elements */}
      <div
        className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.22 45) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.18 0.01 250) 0%, transparent 70%)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.18 0.01 250) 1px, transparent 1px), linear-gradient(90deg, oklch(0.18 0.01 250) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container max-w-7xl mx-auto px-4 lg:px-8 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <div className="animate-fade-in-up">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{
                backgroundColor: "oklch(var(--orange-600) / 10%)",
                color: "oklch(var(--orange-700))",
                border: "1px solid oklch(var(--orange-600) / 20%)",
              }}
            >
              <Star className="w-4 h-4 fill-current" />
              Trusted Laptop Retailer in Mahuva
            </div>

            {/* Heading */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Find Your{" "}
              <span
                className="relative inline-block"
                style={{ color: "oklch(var(--orange-600))" }}
              >
                Perfect
                <span
                  className="absolute -bottom-1 left-0 right-0 h-1 rounded-full"
                  style={{ backgroundColor: "oklch(var(--orange-600))" }}
                />
              </span>{" "}
              <span style={{ color: "oklch(var(--orange-600))" }}>Laptop</span>{" "}
              at <br className="hidden md:block" />
              Rweb Infotech
            </h1>

            {/* Subtext */}
            <p
              className="text-lg leading-relaxed mb-8 max-w-xl"
              style={{ color: "oklch(0.45 0.01 250)" }}
            >
              Explore our curated collection of premium laptops from Apple,
              Dell, HP, Asus, Samsung and more. Expert advice, genuine products,
              and unbeatable service.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#products"
                data-ocid="hero.primary_button"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-orange"
                style={{ backgroundColor: "oklch(var(--orange-600))" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "oklch(var(--orange-700))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "oklch(var(--orange-600))";
                }}
              >
                Browse Laptops
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                data-ocid="hero.secondary_button"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  color: "oklch(var(--orange-600))",
                  border: "2px solid oklch(var(--orange-600))",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "oklch(var(--orange-600) / 8%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <MessageCircle className="w-4 h-4" />
                Ask AI Assistant
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="animate-fade-in-up p-4 rounded-2xl text-center"
                  style={{
                    animationDelay: `${i * 0.1 + 0.3}s`,
                    backgroundColor: "oklch(0.99 0 0)",
                    boxShadow: "0 4px 20px -2px oklch(0.15 0.01 250 / 8%)",
                    border: "1px solid oklch(0.92 0 0)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                    style={{
                      backgroundColor: "oklch(var(--orange-600) / 10%)",
                    }}
                  >
                    <stat.icon
                      className="w-5 h-5"
                      style={{ color: "oklch(var(--orange-600))" }}
                    />
                  </div>
                  <div
                    className="text-xl font-bold font-display"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "oklch(0.55 0.01 250)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Hero image */}
          <div className="relative flex items-center justify-center animate-fade-in-up delay-300">
            <div
              className="absolute inset-0 rounded-3xl opacity-20"
              style={{
                background:
                  "radial-gradient(circle at center, oklch(0.65 0.22 45) 0%, transparent 70%)",
              }}
            />
            <div className="relative animate-float">
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  boxShadow:
                    "0 30px 80px -10px oklch(0.15 0.01 250 / 25%), 0 0 0 1px oklch(0.90 0 0)",
                }}
              >
                <img
                  src="/assets/generated/hero-laptop.dim_1200x700.jpg"
                  alt="Premium Laptops at Rweb Infotech"
                  className="w-full max-w-2xl h-[340px] md:h-[420px] object-cover"
                />
              </div>
              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -left-4 px-4 py-3 rounded-2xl shadow-card flex items-center gap-3"
                style={{
                  backgroundColor: "oklch(0.99 0 0)",
                  border: "1px solid oklch(0.92 0 0)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "oklch(var(--orange-600))" }}
                >
                  <Star className="w-5 h-5 text-white fill-white" />
                </div>
                <div>
                  <div
                    className="text-sm font-bold"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    5.0 Rating
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "oklch(0.55 0.01 250)" }}
                  >
                    10,000+ Reviews
                  </div>
                </div>
              </div>
              {/* Floating badge 2 */}
              <div
                className="absolute -top-4 -right-4 px-4 py-3 rounded-2xl shadow-card flex items-center gap-3"
                style={{
                  backgroundColor: "oklch(var(--orange-600))",
                  color: "white",
                }}
              >
                <Shield className="w-5 h-5" />
                <div>
                  <div className="text-sm font-bold">Genuine</div>
                  <div className="text-xs opacity-90">Warranty</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Laptop detail extra info ─────────────────────────────────────────────
interface LaptopDetail {
  processor: string;
  ram: string;
  storage: string;
  display: string;
  battery: string;
  weight: string;
  os: string;
  ports: string;
  images: string[];
}

const laptopDetails: Record<string, LaptopDetail> = {
  Apple: {
    processor: "Apple M3 Pro / M3 Max",
    ram: "16GB / 32GB Unified Memory",
    storage: "512GB / 1TB / 2TB SSD",
    display: "14-inch / 16-inch Liquid Retina XDR",
    battery: "Up to 22 hours",
    weight: "1.6 kg",
    os: "macOS Sonoma",
    ports: "3x Thunderbolt 4, HDMI, SD card, MagSafe 3",
    images: [
      "/assets/generated/laptop-apple.dim_400x300.jpg",
      "/assets/generated/laptop-dell.dim_400x300.jpg",
      "/assets/generated/laptop-hp.dim_400x300.jpg",
      "/assets/generated/laptop-asus.dim_400x300.jpg",
    ],
  },
  Dell: {
    processor: "Intel Core i7 / i9 13th Gen",
    ram: "16GB / 32GB DDR5",
    storage: "512GB / 1TB NVMe SSD",
    display: "15.6-inch OLED 3.5K Touch",
    battery: "Up to 13 hours",
    weight: "1.86 kg",
    os: "Windows 11 Home/Pro",
    ports: "2x Thunderbolt 4, USB-A, SD card, HDMI",
    images: [
      "/assets/generated/laptop-dell.dim_400x300.jpg",
      "/assets/generated/laptop-apple.dim_400x300.jpg",
      "/assets/generated/laptop-lenovo.dim_400x300.jpg",
      "/assets/generated/laptop-hp.dim_400x300.jpg",
    ],
  },
  HP: {
    processor: "Intel Core i7 / i9 13th Gen",
    ram: "16GB / 32GB DDR5",
    storage: "512GB / 1TB SSD",
    display: "14-inch / 15.6-inch OLED 2-in-1",
    battery: "Up to 17 hours",
    weight: "1.4 kg",
    os: "Windows 11 Home",
    ports: "2x Thunderbolt 4, USB-A, microSD, HDMI",
    images: [
      "/assets/generated/laptop-hp.dim_400x300.jpg",
      "/assets/generated/laptop-dell.dim_400x300.jpg",
      "/assets/generated/laptop-samsung.dim_400x300.jpg",
      "/assets/generated/laptop-asus.dim_400x300.jpg",
    ],
  },
  Asus: {
    processor: "AMD Ryzen 9 7945HX / Intel i9",
    ram: "16GB / 32GB DDR5",
    storage: "1TB / 2TB NVMe SSD",
    display: "16-inch QHD+ 165Hz / 240Hz",
    battery: "Up to 10 hours",
    weight: "2.5 kg",
    os: "Windows 11 Home",
    ports: "USB-C, 2x USB-A, HDMI 2.1, RJ45, SD card",
    images: [
      "/assets/generated/laptop-asus.dim_400x300.jpg",
      "/assets/generated/laptop-dell.dim_400x300.jpg",
      "/assets/generated/laptop-hp.dim_400x300.jpg",
      "/assets/generated/laptop-lenovo.dim_400x300.jpg",
    ],
  },
  Samsung: {
    processor: "Intel Core i7 / i9 13th Gen",
    ram: "16GB / 32GB LPDDR5",
    storage: "512GB / 1TB NVMe SSD",
    display: "15.6-inch Dynamic AMOLED 2X",
    battery: "Up to 21 hours",
    weight: "1.17 kg",
    os: "Windows 11 Home",
    ports: "2x Thunderbolt 4, USB-A, microSD, HDMI",
    images: [
      "/assets/generated/laptop-samsung.dim_400x300.jpg",
      "/assets/generated/laptop-apple.dim_400x300.jpg",
      "/assets/generated/laptop-hp.dim_400x300.jpg",
      "/assets/generated/laptop-dell.dim_400x300.jpg",
    ],
  },
  Lenovo: {
    processor: "Intel Core i7 / i9 13th Gen vPro",
    ram: "16GB / 32GB LPDDR5",
    storage: "512GB / 1TB / 2TB SSD",
    display: "14-inch IPS / OLED 2.8K",
    battery: "Up to 15 hours",
    weight: "1.12 kg",
    os: "Windows 11 Pro",
    ports: "2x Thunderbolt 4, 2x USB-A, HDMI, 4G LTE",
    images: [
      "/assets/generated/laptop-lenovo.dim_400x300.jpg",
      "/assets/generated/laptop-dell.dim_400x300.jpg",
      "/assets/generated/laptop-samsung.dim_400x300.jpg",
      "/assets/generated/laptop-apple.dim_400x300.jpg",
    ],
  },
};

// ─── View Details Modal ───────────────────────────────────────────────────
function LaptopDetailsModal({
  laptop,
  onClose,
}: {
  laptop: LaptopType;
  onClose: () => void;
}) {
  const detail = laptopDetails[laptop.brand] || laptopDetails.Dell;
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "oklch(0 0 0 / 60%)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      data-ocid="products.modal"
      role="presentation"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{
          backgroundColor: "oklch(0.99 0 0)",
          boxShadow: "0 30px 80px -10px oklch(0 0 0 / 30%)",
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          data-ocid="products.close_button"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{
            backgroundColor: "oklch(0.93 0 0)",
            color: "oklch(0.30 0 0)",
          }}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 md:p-8">
          {/* Image gallery */}
          <div className="mb-6">
            <div className="rounded-2xl overflow-hidden mb-3 h-56 md:h-72">
              <img
                src={detail.images[activeImg]}
                alt={laptop.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>
            <div className="flex gap-2 justify-center">
              {detail.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  data-ocid={`products.item.${(i + 1) as 1 | 2 | 3 | 4}`}
                  className="w-16 h-12 rounded-xl overflow-hidden border-2 transition-all hover:scale-105"
                  style={{
                    borderColor:
                      activeImg === i
                        ? "oklch(var(--orange-600))"
                        : "oklch(0.88 0 0)",
                  }}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="mb-4 flex flex-wrap gap-2 items-center">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${brandColors[laptop.brand] || "bg-gray-800 text-white"}`}
            >
              {laptop.brand}
            </span>
            <span
              className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: "oklch(var(--orange-600) / 10%)",
                color: "oklch(var(--orange-700))",
              }}
            >
              {laptop.category}
            </span>
          </div>
          <h2
            className="text-2xl font-bold font-display mb-2"
            style={{ color: "oklch(var(--foreground))" }}
          >
            {laptop.name}
          </h2>
          <p
            className="text-3xl font-bold mb-6"
            style={{ color: "oklch(var(--orange-600))" }}
          >
            ₹{Number(laptop.price).toLocaleString("en-IN")}
            <span
              className="text-sm font-normal ml-2"
              style={{ color: "oklch(0.60 0 0)" }}
            >
              Incl. all taxes
            </span>
          </p>

          {/* Specs grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {[
              { icon: Cpu, label: "Processor", value: detail.processor },
              { icon: MemoryStick, label: "RAM", value: detail.ram },
              { icon: HardDrive, label: "Storage", value: detail.storage },
              { icon: Monitor, label: "Display", value: detail.display },
              { icon: Shield, label: "Battery", value: detail.battery },
              { icon: Package, label: "Weight", value: detail.weight },
              { icon: Laptop, label: "OS", value: detail.os },
              { icon: ArrowRight, label: "Ports", value: detail.ports },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex gap-3 items-start p-3 rounded-xl"
                style={{
                  backgroundColor: "oklch(0.97 0 0)",
                  border: "1px solid oklch(0.92 0 0)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "oklch(var(--orange-600) / 12%)" }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: "oklch(var(--orange-600))" }}
                  />
                </div>
                <div>
                  <div
                    className="text-xs font-semibold"
                    style={{ color: "oklch(0.60 0 0)" }}
                  >
                    {label}
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    {value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              data-ocid="products.primary_button"
              className="flex-1 py-3 rounded-full text-white font-semibold transition-all hover:scale-105"
              style={{ backgroundColor: "oklch(var(--orange-600))" }}
              onClick={() => {
                toast.success(`${laptop.name} added to cart!`, {
                  description: "Our team will contact you shortly.",
                });
                onClose();
              }}
            >
              <ShoppingCart className="w-4 h-4 inline mr-2" />
              Add to Cart
            </button>
            <button
              type="button"
              data-ocid="products.secondary_button"
              className="flex-1 py-3 rounded-full font-semibold text-center transition-all hover:scale-105"
              style={{
                color: "oklch(var(--orange-600))",
                border: "2px solid oklch(var(--orange-600))",
                backgroundColor: "transparent",
              }}
              onClick={() => {
                onClose();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Products Section ─────────────────────────────────────────────────────
function ProductsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedLaptop, setSelectedLaptop] = useState<LaptopType | null>(null);
  const { data: allLaptops, isLoading } = useGetAllLaptops();
  const { actor } = useActor();

  const brands = ["All", "Apple", "Dell", "HP", "Asus", "Samsung", "Lenovo"];

  // Filter locally to avoid extra queries
  const filteredLaptops = (allLaptops || []).filter(
    (l) => activeFilter === "All" || l.brand === activeFilter,
  );

  // Static fallback data if backend is loading - 50 laptops
  const staticLaptops: LaptopType[] = [
    {
      id: BigInt(1),
      name: 'Apple MacBook Pro M3 14"',
      brand: "Apple",
      price: BigInt(129999),
      specs: "M3 Pro chip, 16GB RAM, 512GB SSD, 14-inch Liquid Retina XDR",
      category: "Professional",
    },
    {
      id: BigInt(2),
      name: 'Apple MacBook Pro M3 16"',
      brand: "Apple",
      price: BigInt(189999),
      specs: "M3 Max chip, 32GB RAM, 1TB SSD, 16-inch Liquid Retina XDR",
      category: "Professional",
    },
    {
      id: BigInt(3),
      name: "Apple MacBook Air M2",
      brand: "Apple",
      price: BigInt(89999),
      specs: "M2 chip, 8GB RAM, 256GB SSD, 13.6-inch Liquid Retina",
      category: "Ultrabook",
    },
    {
      id: BigInt(4),
      name: "Apple MacBook Air M3",
      brand: "Apple",
      price: BigInt(114999),
      specs: "M3 chip, 16GB RAM, 512GB SSD, 15.3-inch Liquid Retina",
      category: "Ultrabook",
    },
    {
      id: BigInt(5),
      name: "Apple MacBook Pro M2",
      brand: "Apple",
      price: BigInt(99999),
      specs: "M2 Pro chip, 16GB RAM, 512GB SSD, 14-inch",
      category: "Professional",
    },
    {
      id: BigInt(6),
      name: "Dell XPS 15",
      brand: "Dell",
      price: BigInt(115999),
      specs: "Intel Core i9, 32GB RAM, 1TB SSD, 15.6-inch OLED touch",
      category: "Professional",
    },
    {
      id: BigInt(7),
      name: "Dell XPS 13 Plus",
      brand: "Dell",
      price: BigInt(98999),
      specs: "Intel Core i7-1360P, 16GB RAM, 512GB SSD, 13.4-inch OLED",
      category: "Ultrabook",
    },
    {
      id: BigInt(8),
      name: "Dell Inspiron 15 3000",
      brand: "Dell",
      price: BigInt(45999),
      specs: "Intel Core i5, 8GB RAM, 512GB SSD, 15.6-inch FHD",
      category: "Student",
    },
    {
      id: BigInt(9),
      name: "Dell Vostro 15 3530",
      brand: "Dell",
      price: BigInt(55999),
      specs: "Intel Core i5-1335U, 16GB RAM, 512GB SSD, 15.6-inch FHD",
      category: "Business",
    },
    {
      id: BigInt(10),
      name: "Dell Latitude 5540",
      brand: "Dell",
      price: BigInt(78999),
      specs: "Intel Core i7-1365U, 16GB RAM, 512GB SSD, 15.6-inch FHD",
      category: "Business",
    },
    {
      id: BigInt(11),
      name: "Dell G15 Gaming",
      brand: "Dell",
      price: BigInt(85999),
      specs: "AMD Ryzen 7, 16GB RAM, 512GB SSD, RTX 3060, 15.6-inch 165Hz",
      category: "Gaming",
    },
    {
      id: BigInt(12),
      name: "HP Spectre x360 14",
      brand: "HP",
      price: BigInt(108999),
      specs: "Intel Core i7, 16GB RAM, 512GB SSD, 14-inch OLED 2-in-1",
      category: "Ultrabook",
    },
    {
      id: BigInt(13),
      name: "HP Envy x360 15",
      brand: "HP",
      price: BigInt(79999),
      specs: "AMD Ryzen 7 7730U, 16GB RAM, 512GB SSD, 15.6-inch OLED",
      category: "Ultrabook",
    },
    {
      id: BigInt(14),
      name: "HP Pavilion 15",
      brand: "HP",
      price: BigInt(49999),
      specs: "Intel Core i5-1235U, 8GB RAM, 512GB SSD, 15.6-inch FHD IPS",
      category: "Student",
    },
    {
      id: BigInt(15),
      name: "HP Victus 16 Gaming",
      brand: "HP",
      price: BigInt(69999),
      specs: "AMD Ryzen 5, 8GB RAM, 512GB SSD, RTX 3050, 16.1-inch 144Hz",
      category: "Gaming",
    },
    {
      id: BigInt(16),
      name: "HP EliteBook 840 G10",
      brand: "HP",
      price: BigInt(112999),
      specs: "Intel Core i7 vPro, 16GB RAM, 512GB SSD, 14-inch WUXGA IPS",
      category: "Business",
    },
    {
      id: BigInt(17),
      name: "HP Omen 16",
      brand: "HP",
      price: BigInt(99999),
      specs: "AMD Ryzen 7, 16GB RAM, 1TB SSD, RTX 3070, 16.1-inch 165Hz",
      category: "Gaming",
    },
    {
      id: BigInt(18),
      name: "Asus ROG Strix G16",
      brand: "Asus",
      price: BigInt(119999),
      specs: "AMD Ryzen 9, 32GB RAM, 1TB SSD, RTX 4070, 16-inch 165Hz",
      category: "Gaming",
    },
    {
      id: BigInt(19),
      name: "Asus ZenBook 14 OLED",
      brand: "Asus",
      price: BigInt(79999),
      specs: "Intel Core i7-1360P, 16GB RAM, 512GB SSD, 14-inch 2.8K OLED",
      category: "Ultrabook",
    },
    {
      id: BigInt(20),
      name: "Asus VivoBook 15",
      brand: "Asus",
      price: BigInt(44999),
      specs: "Intel Core i5-1235U, 8GB RAM, 512GB SSD, 15.6-inch FHD",
      category: "Student",
    },
    {
      id: BigInt(21),
      name: "Asus TUF Gaming F15",
      brand: "Asus",
      price: BigInt(74999),
      specs: "Intel Core i7-12700H, 16GB RAM, 512GB SSD, RTX 3060, 144Hz",
      category: "Gaming",
    },
    {
      id: BigInt(22),
      name: "Asus ROG Zephyrus G14",
      brand: "Asus",
      price: BigInt(134999),
      specs: "AMD Ryzen 9, 16GB RAM, 1TB SSD, RTX 4060, 14-inch 165Hz",
      category: "Gaming",
    },
    {
      id: BigInt(23),
      name: "Asus ExpertBook B9",
      brand: "Asus",
      price: BigInt(104999),
      specs: "Intel Core i7 EVO, 16GB RAM, 1TB SSD, 14-inch FHD, 0.88kg",
      category: "Business",
    },
    {
      id: BigInt(24),
      name: "Samsung Galaxy Book3 Pro",
      brand: "Samsung",
      price: BigInt(104999),
      specs: "Intel Core i7-1360P, 16GB RAM, 512GB SSD, 14-inch AMOLED",
      category: "Professional",
    },
    {
      id: BigInt(25),
      name: "Samsung Galaxy Book3 Ultra",
      brand: "Samsung",
      price: BigInt(149999),
      specs: "Intel Core i9, 32GB RAM, 1TB SSD, RTX 4050, 16-inch AMOLED",
      category: "Professional",
    },
    {
      id: BigInt(26),
      name: "Samsung Galaxy Book3 360",
      brand: "Samsung",
      price: BigInt(89999),
      specs: "Intel Core i7, 16GB RAM, 512GB SSD, 13.3-inch AMOLED 2-in-1",
      category: "Ultrabook",
    },
    {
      id: BigInt(27),
      name: "Samsung Galaxy Book2",
      brand: "Samsung",
      price: BigInt(67999),
      specs: "Intel Core i5-1235U, 8GB RAM, 256GB SSD, 15.6-inch FHD",
      category: "Ultrabook",
    },
    {
      id: BigInt(28),
      name: "Samsung Galaxy Book Go",
      brand: "Samsung",
      price: BigInt(35999),
      specs: "Snapdragon 7c, 8GB RAM, 128GB eMMC, 14-inch FHD",
      category: "Student",
    },
    {
      id: BigInt(29),
      name: "Lenovo ThinkPad X1 Carbon",
      brand: "Lenovo",
      price: BigInt(95999),
      specs: "Intel Core i7, 16GB RAM, 512GB SSD, 14-inch IPS, LTE ready",
      category: "Business",
    },
    {
      id: BigInt(30),
      name: "Lenovo IdeaPad Slim 5",
      brand: "Lenovo",
      price: BigInt(49999),
      specs: "AMD Ryzen 5 7530U, 16GB RAM, 512GB SSD, 14-inch FHD IPS",
      category: "Student",
    },
    {
      id: BigInt(31),
      name: "Lenovo Legion 5 Pro",
      brand: "Lenovo",
      price: BigInt(109999),
      specs: "AMD Ryzen 7, 16GB RAM, 512GB SSD, RTX 3070, 16-inch 165Hz",
      category: "Gaming",
    },
    {
      id: BigInt(32),
      name: "Lenovo ThinkBook 14s",
      brand: "Lenovo",
      price: BigInt(68999),
      specs: "Intel Core i5-1335U, 16GB RAM, 512GB SSD, 14-inch FHD IPS",
      category: "Business",
    },
    {
      id: BigInt(33),
      name: "Lenovo Yoga 9i",
      brand: "Lenovo",
      price: BigInt(119999),
      specs: "Intel Core i7 EVO, 16GB RAM, 1TB SSD, 14-inch OLED 2-in-1",
      category: "Ultrabook",
    },
    {
      id: BigInt(34),
      name: "Lenovo IdeaPad Gaming 3",
      brand: "Lenovo",
      price: BigInt(59999),
      specs: "AMD Ryzen 5 7535HS, 8GB RAM, 512GB SSD, RTX 3050, 15.6-inch",
      category: "Gaming",
    },
    {
      id: BigInt(35),
      name: "Lenovo ThinkPad E14 Gen 5",
      brand: "Lenovo",
      price: BigInt(72999),
      specs: "AMD Ryzen 7 7730U, 16GB RAM, 512GB SSD, 14-inch WUXGA IPS",
      category: "Business",
    },
    {
      id: BigInt(36),
      name: "Dell Inspiron 14 5430",
      brand: "Dell",
      price: BigInt(62999),
      specs: "Intel Core i5-1340P, 16GB RAM, 512GB SSD, 14-inch FHD+ IPS",
      category: "Student",
    },
    {
      id: BigInt(37),
      name: "HP ProBook 455 G10",
      brand: "HP",
      price: BigInt(58999),
      specs: "AMD Ryzen 5 7530U, 8GB RAM, 256GB SSD, 15.6-inch FHD",
      category: "Business",
    },
    {
      id: BigInt(38),
      name: "Asus VivoBook Pro 15",
      brand: "Asus",
      price: BigInt(84999),
      specs: "AMD Ryzen 5 5600H, 16GB RAM, 512GB SSD, RTX 3050, 15.6-inch",
      category: "Professional",
    },
    {
      id: BigInt(39),
      name: "Samsung Galaxy Book2 Pro",
      brand: "Samsung",
      price: BigInt(109999),
      specs: "Intel Core i7-1260P, 16GB RAM, 512GB SSD, 13.3-inch AMOLED",
      category: "Professional",
    },
    {
      id: BigInt(40),
      name: "Lenovo Yoga Slim 7i",
      brand: "Lenovo",
      price: BigInt(78999),
      specs: "Intel Core i5-1340P, 16GB RAM, 512GB SSD, 14-inch 2.8K OLED",
      category: "Ultrabook",
    },
    {
      id: BigInt(41),
      name: "Apple MacBook Pro M1",
      brand: "Apple",
      price: BigInt(79999),
      specs: "M1 Pro chip, 16GB RAM, 512GB SSD, 14-inch Retina",
      category: "Professional",
    },
    {
      id: BigInt(42),
      name: "Dell Alienware m18",
      brand: "Dell",
      price: BigInt(249999),
      specs: "Intel Core i9-13980HX, 32GB DDR5, 2TB SSD, RTX 4090, 18-inch",
      category: "Gaming",
    },
    {
      id: BigInt(43),
      name: "HP Dragonfly G4",
      brand: "HP",
      price: BigInt(139999),
      specs: "Intel Core i7 EVO, 32GB RAM, 1TB SSD, 13.5-inch WUXGA+ IPS",
      category: "Business",
    },
    {
      id: BigInt(44),
      name: "Asus ROG Flow X13",
      brand: "Asus",
      price: BigInt(144999),
      specs: "AMD Ryzen 9 7940HS, 16GB RAM, 512GB SSD, RTX 4050, 13.4-inch",
      category: "Gaming",
    },
    {
      id: BigInt(45),
      name: "Samsung Galaxy Book3 15",
      brand: "Samsung",
      price: BigInt(75999),
      specs: "Intel Core i5-1335U, 8GB RAM, 256GB SSD, 15.6-inch FHD IPS",
      category: "Ultrabook",
    },
    {
      id: BigInt(46),
      name: "Lenovo IdeaPad Slim 3",
      brand: "Lenovo",
      price: BigInt(36999),
      specs: "Intel Core i3-1215U, 8GB RAM, 256GB SSD, 15.6-inch FHD",
      category: "Student",
    },
    {
      id: BigInt(47),
      name: "Dell XPS 17",
      brand: "Dell",
      price: BigInt(189999),
      specs: "Intel Core i9, 32GB RAM, 1TB SSD, RTX 4060, 17-inch 4K Touch",
      category: "Professional",
    },
    {
      id: BigInt(48),
      name: "HP Laptop 14s",
      brand: "HP",
      price: BigInt(38999),
      specs: "AMD Ryzen 3 5300U, 8GB RAM, 256GB SSD, 14-inch FHD IPS",
      category: "Student",
    },
    {
      id: BigInt(49),
      name: "Asus Chromebook Flip",
      brand: "Asus",
      price: BigInt(32999),
      specs: "Intel Core i3, 8GB RAM, 128GB eMMC, 14-inch FHD Touch",
      category: "Student",
    },
    {
      id: BigInt(50),
      name: "Lenovo ThinkPad T14s Gen 4",
      brand: "Lenovo",
      price: BigInt(88999),
      specs: "AMD Ryzen 7 PRO 7840U, 16GB RAM, 512GB SSD, 14-inch WUXGA",
      category: "Business",
    },
  ];

  const displayLaptops =
    filteredLaptops.length > 0
      ? filteredLaptops
      : isLoading || !actor
        ? staticLaptops.filter(
            (l) => activeFilter === "All" || l.brand === activeFilter,
          )
        : staticLaptops.filter(
            (l) => activeFilter === "All" || l.brand === activeFilter,
          );

  const handleAddToCart = (name: string) => {
    toast.success(`${name} added to cart!`, {
      description: "Our team will contact you shortly.",
      duration: 3000,
    });
  };

  return (
    <section
      id="products"
      data-ocid="products.section"
      className="section-padding bg-white"
    >
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{
              backgroundColor: "oklch(var(--orange-600) / 10%)",
              color: "oklch(var(--orange-700))",
            }}
          >
            <Package className="w-4 h-4" /> Our Collection
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4"
            style={{ color: "oklch(var(--foreground))" }}
          >
            Featured{" "}
            <span style={{ color: "oklch(var(--orange-600))" }}>Laptops</span>
          </h2>
          <div
            className="w-20 h-1 rounded-full mx-auto mb-4"
            style={{ backgroundColor: "oklch(var(--orange-600))" }}
          />
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "oklch(0.50 0.01 250)" }}
          >
            Handpicked premium laptops from the world's leading brands. All
            products come with official warranty.
          </p>
        </div>

        {/* Brand filters */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-10"
          data-ocid="products.tab"
        >
          {brands.map((brand) => (
            <button
              type="button"
              key={brand}
              onClick={() => setActiveFilter(brand)}
              data-ocid="products.tab"
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={
                activeFilter === brand
                  ? {
                      backgroundColor: "oklch(var(--orange-600))",
                      color: "white",
                      boxShadow: "0 4px 15px -2px oklch(0.65 0.22 45 / 40%)",
                    }
                  : {
                      backgroundColor: "oklch(0.95 0 0)",
                      color: "oklch(0.40 0.01 250)",
                      border: "1px solid oklch(0.88 0 0)",
                    }
              }
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Product grid */}
        {isLoading && filteredLaptops.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                data-ocid="products.loading_state"
                className="rounded-3xl overflow-hidden"
                style={{
                  backgroundColor: "oklch(0.96 0 0)",
                  border: "1px solid oklch(0.92 0 0)",
                }}
              >
                <div
                  className="h-56 animate-pulse"
                  style={{ backgroundColor: "oklch(0.92 0 0)" }}
                />
                <div className="p-5 space-y-3">
                  <div
                    className="h-4 w-20 rounded animate-pulse"
                    style={{ backgroundColor: "oklch(0.88 0 0)" }}
                  />
                  <div
                    className="h-5 w-full rounded animate-pulse"
                    style={{ backgroundColor: "oklch(0.88 0 0)" }}
                  />
                  <div
                    className="h-4 w-3/4 rounded animate-pulse"
                    style={{ backgroundColor: "oklch(0.88 0 0)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : displayLaptops.length === 0 ? (
          <div data-ocid="products.empty_state" className="text-center py-20">
            <Package
              className="w-16 h-16 mx-auto mb-4"
              style={{ color: "oklch(0.75 0 0)" }}
            />
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "oklch(0.45 0 0)" }}
            >
              No laptops found
            </h3>
            <p style={{ color: "oklch(0.60 0 0)" }}>
              Try a different brand filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayLaptops.map((laptop, index) => (
              <div
                key={laptop.id.toString()}
                data-ocid={`products.item.${index + 1}`}
                className="hover-lift rounded-3xl overflow-hidden group cursor-pointer"
                style={{
                  backgroundColor: "oklch(0.99 0 0)",
                  border: "1px solid oklch(0.91 0 0)",
                  boxShadow: "0 4px 20px -4px oklch(0.15 0.01 250 / 8%)",
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-56 bg-gray-50">
                  <img
                    src={
                      laptopImageMap[laptop.brand] ||
                      "/assets/generated/laptop-dell.dim_400x300.jpg"
                    }
                    alt={laptop.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Brand badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${brandColors[laptop.brand] || "bg-gray-800 text-white"}`}
                    >
                      {laptop.brand}
                    </span>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: "oklch(0.99 0 0 / 90%)",
                        color: "oklch(0.40 0.01 250)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {laptop.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3
                    className="font-bold text-lg font-display mb-1 line-clamp-1"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    {laptop.name}
                  </h3>
                  <p
                    className="text-xs mb-3 line-clamp-2"
                    style={{ color: "oklch(0.55 0.01 250)" }}
                  >
                    {laptop.specs}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div
                        className="text-2xl font-bold font-display"
                        style={{ color: "oklch(var(--orange-600))" }}
                      >
                        ₹{Number(laptop.price).toLocaleString("en-IN")}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "oklch(0.60 0 0)" }}
                      >
                        Incl. all taxes
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(laptop.name)}
                      data-ocid={`products.item.${index + 1}`}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-orange-sm"
                      style={{ backgroundColor: "oklch(var(--orange-600))" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "oklch(var(--orange-700))";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "oklch(var(--orange-600))";
                      }}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add
                    </button>
                  </div>
                  <button
                    type="button"
                    data-ocid={`products.item.${index + 1}`}
                    className="mt-3 w-full text-sm font-medium py-2 rounded-xl transition-all duration-200 hover:opacity-80"
                    style={{
                      color: "oklch(var(--orange-600))",
                      backgroundColor: "oklch(var(--orange-600) / 8%)",
                    }}
                    onClick={() => setSelectedLaptop(laptop)}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedLaptop && (
        <LaptopDetailsModal
          laptop={selectedLaptop}
          onClose={() => setSelectedLaptop(null)}
        />
      )}
    </section>
  );
}

// ─── Why Choose Us Section ────────────────────────────────────────────────
function WhyChooseUsSection() {
  const features = [
    {
      icon: Headphones,
      title: "Expert Advice",
      description:
        "Our certified professionals guide you to the perfect laptop based on your needs, usage, and budget.",
    },
    {
      icon: Shield,
      title: "Genuine Products",
      description:
        "Every laptop sold is 100% authentic with manufacturer warranty. Zero counterfeit products guaranteed.",
    },
    {
      icon: Tag,
      title: "Best Prices",
      description:
        "We offer the most competitive prices in Mahuva with exclusive deals and seasonal discounts.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Same-day delivery within Mahuva & Bhavnagar. Pan-India delivery within 3-5 business days.",
    },
  ];

  return (
    <section
      id="why-us"
      data-ocid="whyus.section"
      className="section-padding"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.18 0.01 250) 0%, oklch(0.22 0.02 250) 100%)",
      }}
    >
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{
              backgroundColor: "oklch(var(--orange-600) / 20%)",
              color: "oklch(var(--orange-500))",
            }}
          >
            <Award className="w-4 h-4" /> Why Rweb Infotech
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-white mb-4">
            Why Choose{" "}
            <span style={{ color: "oklch(var(--orange-500))" }}>Us?</span>
          </h2>
          <div
            className="w-20 h-1 rounded-full mx-auto mb-4"
            style={{ backgroundColor: "oklch(var(--orange-600))" }}
          />
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "oklch(0.70 0 0)" }}
          >
            We are Mahuva's most trusted laptop retailer, providing exceptional
            service since 2018.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              data-ocid={`whyus.card.${(i + 1) as 1 | 2 | 3 | 4}`}
              className="hover-lift p-6 rounded-3xl text-center group"
              style={{
                backgroundColor: "oklch(0.25 0.01 250)",
                border: "1px solid oklch(0.30 0.01 250)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  "oklch(var(--orange-600) / 40%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.30 0.01 250)";
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: "oklch(var(--orange-600) / 15%)" }}
              >
                <feature.icon
                  className="w-8 h-8"
                  style={{ color: "oklch(var(--orange-500))" }}
                />
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-3">
                {feature.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.65 0 0)" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Brands Section ───────────────────────────────────────────────────────
function BrandsSection() {
  const brands = [
    { name: "Apple", icon: "🍎" },
    { name: "Dell", icon: "💻" },
    { name: "HP", icon: "🖥️" },
    { name: "Asus", icon: "⚡" },
    { name: "Samsung", icon: "📱" },
    { name: "Lenovo", icon: "🎯" },
    { name: "MSI", icon: "🎮" },
    { name: "Acer", icon: "🚀" },
  ];

  return (
    <section
      id="brands"
      data-ocid="brands.section"
      className="section-padding bg-white"
    >
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{
              backgroundColor: "oklch(var(--orange-600) / 10%)",
              color: "oklch(var(--orange-700))",
            }}
          >
            <Award className="w-4 h-4" /> Our Partners
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4"
            style={{ color: "oklch(var(--foreground))" }}
          >
            Top Brands We{" "}
            <span style={{ color: "oklch(var(--orange-600))" }}>Carry</span>
          </h2>
          <div
            className="w-20 h-1 rounded-full mx-auto mb-4"
            style={{ backgroundColor: "oklch(var(--orange-600))" }}
          />
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: "oklch(0.50 0.01 250)" }}
          >
            Official authorized dealer for all major laptop brands.
          </p>
        </div>

        {/* Brand grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {brands.map((brand, i) => (
            <div
              key={brand.name}
              data-ocid={`brands.item.${(i + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`}
              className="hover-lift flex flex-col items-center gap-2 p-4 rounded-2xl cursor-pointer transition-all duration-200 group"
              style={{
                border: "1px solid oklch(0.91 0 0)",
                backgroundColor: "oklch(0.99 0 0)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "oklch(var(--orange-600))";
                e.currentTarget.style.backgroundColor =
                  "oklch(var(--orange-600) / 4%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.91 0 0)";
                e.currentTarget.style.backgroundColor = "oklch(0.99 0 0)";
              }}
            >
              <span className="text-3xl">{brand.icon}</span>
              <span
                className="text-xs font-bold"
                style={{ color: "oklch(0.40 0.01 250)" }}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        {/* Scrolling brand strip */}
        <div
          className="mt-12 overflow-hidden rounded-2xl py-4"
          style={{
            backgroundColor: "oklch(0.97 0 0)",
            border: "1px solid oklch(0.91 0 0)",
          }}
        >
          <div className="flex animate-marquee gap-8 items-center whitespace-nowrap">
            {[
              ...brands.map((b) => ({ name: b.name, uid: `first-${b.name}` })),
              ...brands.map((b) => ({ name: b.name, uid: `second-${b.name}` })),
            ].map((item) => (
              <span
                key={item.uid}
                className="text-sm font-semibold px-4 py-1 rounded-full"
                style={{ color: "oklch(0.55 0.01 250)" }}
              >
                ✦ {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────
function AboutSection() {
  const stats = [
    { value: 500, suffix: "+", label: "Products" },
    { value: 10000, suffix: "+", label: "Happy Customers" },
    { value: 6, suffix: "+", label: "Years Experience" },
    { value: 50, suffix: "+", label: "Brands" },
  ];

  return (
    <section
      id="about"
      data-ocid="about.section"
      className="section-padding"
      style={{ backgroundColor: "oklch(0.97 0.005 220)" }}
    >
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
              style={{
                backgroundColor: "oklch(var(--orange-600) / 10%)",
                color: "oklch(var(--orange-700))",
              }}
            >
              <Award className="w-4 h-4" /> About Us
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Mahuva's Premier{" "}
              <span style={{ color: "oklch(var(--orange-600))" }}>Laptop</span>{" "}
              Store
            </h2>
            <div
              className="space-y-4 text-base leading-relaxed"
              style={{ color: "oklch(0.45 0.01 250)" }}
            >
              <p>
                Founded in 2018, Rweb Infotech has grown to become Mahuva's most
                trusted laptop retailer. We started with a simple mission: make
                premium technology accessible to everyone.
              </p>
              <p>
                With a team of certified technology experts, we help students,
                professionals, and businesses find the perfect laptop that
                matches their needs and budget. Every product we sell is 100%
                genuine with manufacturer warranty.
              </p>
              <p>
                From our store at Vasi Talav, Mahuva (Bhavnagar), we've served
                over 10,000 satisfied customers across Gujarat and beyond.
              </p>
            </div>

            {/* Highlights */}
            <div className="mt-8 space-y-3">
              {[
                "Official authorized dealer for Apple, Dell, HP & more",
                "Free technical support for 1 year post-purchase",
                "Easy EMI options with 0% interest schemes",
                "Trade-in your old laptop for attractive discounts",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: "oklch(var(--orange-600) / 15%)",
                    }}
                  >
                    <ChevronRight
                      className="w-3 h-3"
                      style={{ color: "oklch(var(--orange-600))" }}
                    />
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: "oklch(0.40 0.01 250)" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="#contact"
                data-ocid="about.primary_button"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-orange"
                style={{ backgroundColor: "oklch(var(--orange-600))" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "oklch(var(--orange-700))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "oklch(var(--orange-600))";
                }}
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Store image + stats */}
          <div className="space-y-6">
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                boxShadow: "0 20px 60px -10px oklch(0.15 0.01 250 / 15%)",
              }}
            >
              <img
                src="/assets/generated/about-store.dim_600x400.jpg"
                alt="Rweb Infotech Store"
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  data-ocid={`about.card.${(i + 1) as 1 | 2 | 3 | 4}`}
                  className="p-5 rounded-2xl text-center"
                  style={{
                    backgroundColor: "oklch(0.99 0 0)",
                    border: "1px solid oklch(0.91 0 0)",
                    boxShadow: "0 4px 16px -4px oklch(0.15 0.01 250 / 8%)",
                  }}
                >
                  <div
                    className="text-3xl font-bold font-display mb-1"
                    style={{ color: "oklch(var(--orange-600))" }}
                  >
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "oklch(0.50 0.01 250)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const submitMutation = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      await submitMutation.mutateAsync(formData);
      toast.success("Message sent! We'll contact you soon.", {
        duration: 4000,
      });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: "Address",
      value: "Vasi Talav, Mahuva, Bhavnagar - 364290, Gujarat, India",
    },
    {
      icon: Phone,
      label: "Owner",
      value: "Ravi Baraiya",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 98765 43210",
      href: "tel:+919876543210",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@rwebinfotech.com",
      href: "mailto:info@rwebinfotech.com",
    },
    {
      icon: Clock,
      label: "Hours",
      value: "Mon–Sat: 10AM–8PM | Sun: 11AM–6PM",
    },
  ];

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="section-padding bg-white"
    >
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{
              backgroundColor: "oklch(var(--orange-600) / 10%)",
              color: "oklch(var(--orange-700))",
            }}
          >
            <Phone className="w-4 h-4" /> Contact Us
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4"
            style={{ color: "oklch(var(--foreground))" }}
          >
            Get in{" "}
            <span style={{ color: "oklch(var(--orange-600))" }}>Touch</span>
          </h2>
          <div
            className="w-20 h-1 rounded-full mx-auto mb-4"
            style={{ backgroundColor: "oklch(var(--orange-600))" }}
          />
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: "oklch(0.50 0.01 250)" }}
          >
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond asap.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: Contact info */}
          <div className="lg:col-span-2 space-y-4">
            <div
              className="p-6 rounded-3xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.18 0.01 250) 0%, oklch(0.22 0.02 250) 100%)",
              }}
            >
              <h3 className="text-xl font-bold font-display text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-5">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: "oklch(var(--orange-600) / 20%)",
                      }}
                    >
                      <item.icon
                        className="w-5 h-5"
                        style={{ color: "oklch(var(--orange-500))" }}
                      />
                    </div>
                    <div>
                      <div
                        className="text-xs font-semibold mb-0.5"
                        style={{ color: "oklch(0.65 0 0)" }}
                      >
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          data-ocid="contact.link"
                          className="text-sm text-white hover:opacity-80 transition-opacity"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-sm text-white">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div
              className="rounded-3xl overflow-hidden h-48 flex items-center justify-center"
              style={{
                backgroundColor: "oklch(0.95 0 0)",
                border: "1px solid oklch(0.88 0 0)",
              }}
            >
              <div className="text-center">
                <MapPin
                  className="w-10 h-10 mx-auto mb-2"
                  style={{ color: "oklch(var(--orange-600))" }}
                />
                <p
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.40 0.01 250)" }}
                >
                  Vasi Talav, Mahuva
                </p>
                <p className="text-xs" style={{ color: "oklch(0.60 0 0)" }}>
                  Bhavnagar - 364290, Gujarat
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className="lg:col-span-3 p-8 rounded-3xl"
            style={{
              backgroundColor: "oklch(0.99 0 0)",
              border: "1px solid oklch(0.91 0 0)",
              boxShadow: "0 8px 40px -8px oklch(0.15 0.01 250 / 10%)",
            }}
          >
            <h3
              className="text-xl font-bold font-display mb-6"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.40 0.01 250)" }}
                >
                  Full Name *
                </label>
                <Input
                  id="contact-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  data-ocid="contact.input"
                  className="h-12 rounded-xl border-border"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.40 0.01 250)" }}
                >
                  Email Address *
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  data-ocid="contact.input"
                  className="h-12 rounded-xl border-border"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.40 0.01 250)" }}
                >
                  Your Message *
                </label>
                <Textarea
                  id="contact-message"
                  placeholder="Tell us about your laptop requirements..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, message: e.target.value }))
                  }
                  data-ocid="contact.textarea"
                  className="min-h-32 rounded-xl border-border resize-none"
                  required
                />
              </div>
              <Button
                type="submit"
                data-ocid="contact.submit_button"
                disabled={submitMutation.isPending}
                className="w-full h-12 rounded-full text-base font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-orange"
                style={{ backgroundColor: "oklch(var(--orange-600))" }}
              >
                {submitMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
              {submitMutation.isSuccess && (
                <div
                  data-ocid="contact.success_state"
                  className="text-center text-sm font-medium py-2 rounded-xl"
                  style={{
                    backgroundColor: "oklch(0.85 0.12 145 / 20%)",
                    color: "oklch(0.45 0.15 145)",
                  }}
                >
                  ✓ Message sent successfully!
                </div>
              )}
              {submitMutation.isError && (
                <div
                  data-ocid="contact.error_state"
                  className="text-center text-sm font-medium py-2 rounded-xl"
                  style={{
                    backgroundColor: "oklch(0.85 0.12 25 / 20%)",
                    color: "oklch(0.50 0.18 27)",
                  }}
                >
                  ✗ Failed to send. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  const currentYear = new Date().getFullYear();
  const quickLinks = [
    { href: "#home", label: "Home" },
    { href: "#products", label: "Products" },
    { href: "#brands", label: "Brands" },
    { href: "#about", label: "About Us" },
    { href: "#contact", label: "Contact" },
  ];
  const popularBrands = [
    "Apple MacBook",
    "Dell XPS",
    "HP Spectre",
    "Asus ROG",
    "Samsung Galaxy Book",
    "Lenovo ThinkPad",
  ];

  return (
    <footer
      data-ocid="footer.section"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.14 0.01 250) 0%, oklch(0.18 0.02 250) 100%)",
      }}
    >
      <div className="container max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Logo + tagline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "oklch(var(--orange-600))" }}
              >
                <Laptop className="w-5 h-5 text-white" />
              </div>
              <span
                className="text-xl font-bold font-display"
                style={{ color: "oklch(0.95 0 0)" }}
              >
                <span style={{ color: "oklch(var(--orange-500))" }}>Rweb</span>{" "}
                Infotech
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "oklch(0.60 0 0)" }}
            >
              Mahuva's most trusted laptop retailer since 2018. Expert advice,
              genuine products, unbeatable prices.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { icon: SiFacebook, href: "#", label: "Facebook" },
                { icon: SiInstagram, href: "#", label: "Instagram" },
                { icon: SiX, href: "#", label: "Twitter/X" },
                { icon: SiYoutube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  data-ocid="footer.link"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: "oklch(0.25 0.01 250)",
                    color: "oklch(0.65 0 0)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "oklch(var(--orange-600))";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "oklch(0.25 0.01 250)";
                    e.currentTarget.style.color = "oklch(0.65 0 0)";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: "oklch(0.70 0 0)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid="footer.link"
                    className="text-sm flex items-center gap-2 transition-colors group"
                    style={{ color: "oklch(0.55 0 0)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "oklch(var(--orange-500))";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "oklch(0.55 0 0)";
                    }}
                  >
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Brands */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: "oklch(0.70 0 0)" }}
            >
              Popular Brands
            </h4>
            <ul className="space-y-3">
              {popularBrands.map((brand) => (
                <li key={brand}>
                  <a
                    href="#products"
                    data-ocid="footer.link"
                    className="text-sm flex items-center gap-2 transition-colors group"
                    style={{ color: "oklch(0.55 0 0)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "oklch(var(--orange-500))";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "oklch(0.55 0 0)";
                    }}
                  >
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    {brand}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: "oklch(0.70 0 0)" }}
            >
              Contact Info
            </h4>
            <ul className="space-y-4">
              {[
                {
                  icon: MapPin,
                  text: "Vasi Talav, Mahuva, Bhavnagar - 364290, Gujarat",
                },
                {
                  icon: Phone,
                  text: "Ravi Baraiya | +91 98765 43210",
                  href: "tel:+919876543210",
                },
                {
                  icon: Mail,
                  text: "info@rwebinfotech.com",
                  href: "mailto:info@rwebinfotech.com",
                },
                { icon: Clock, text: "Mon–Sat: 10AM–8PM" },
              ].map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex gap-3 items-start">
                  <Icon
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: "oklch(var(--orange-500))" }}
                  />
                  {href ? (
                    <a
                      href={href}
                      data-ocid="footer.link"
                      className="text-sm transition-colors"
                      style={{ color: "oklch(0.55 0 0)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color =
                          "oklch(var(--orange-500))";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "oklch(0.55 0 0)";
                      }}
                    >
                      {text}
                    </a>
                  ) : (
                    <span
                      className="text-sm"
                      style={{ color: "oklch(0.55 0 0)" }}
                    >
                      {text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid oklch(0.25 0.01 250)" }}
        >
          <p className="text-sm" style={{ color: "oklch(0.45 0 0)" }}>
            © {currentYear} Rweb Infotech. All rights reserved.
          </p>
          <p className="text-sm" style={{ color: "oklch(0.40 0 0)" }}>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              className="hover:underline transition-colors"
              style={{ color: "oklch(var(--orange-500))" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────
export default function App() {
  useSeedLaptops();

  return (
    <div className="min-h-screen">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            fontFamily: '"General Sans", system-ui, sans-serif',
          },
        }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <ProductsSection />
        <WhyChooseUsSection />
        <BrandsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
