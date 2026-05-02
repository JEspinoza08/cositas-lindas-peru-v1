import { useEffect, useMemo, useState } from "react";
import logo from "@/assets/logo.jpg";
import heroImg from "@/assets/hero-bouquet.webp";
import heroMothersDay from "@/assets/hero-mothers-day.webp";
import heroShop from "@/assets/hero-shop.webp";
import heroGifts from "@/assets/hero-gifts.webp";

// Catálogo Día de la Madre
import caja20TulRojos from "@/assets/catalog_optimizado/caja-20-tulipanes-rojos.webp";
import ramo20TulRojos from "@/assets/catalog_optimizado/ramo-20-tulipanes-rojos.webp";
import ramoGerberas from "@/assets/catalog_optimizado/ramo-gerberas.webp";
import boxMama from "@/assets/catalog_optimizado/box-mama.webp";
import caja20TulAmar from "@/assets/catalog_optimizado/caja-20-tulipanes-amarillos.webp";
import cajaRosasVar from "@/assets/catalog_optimizado/caja-rosas-variadas.webp";
import box10Tul from "@/assets/catalog_optimizado/box-10-tulipanes.webp";
import box20Tul from "@/assets/catalog_optimizado/box-20-tulipanes.webp";
import box30Tul from "@/assets/catalog_optimizado/box-30-tulipanes.webp";
import ramo4Gir from "@/assets/catalog_optimizado/ramo-4-girasoles.webp";
import cajaRosasRosadas from "@/assets/catalog_optimizado/caja-rosas-rosadas.webp";
import ramo12RosasRojas from "@/assets/catalog_optimizado/ramo-12-rosas-rojas.webp";
import boxRadiante from "@/assets/catalog_optimizado/box-radiante.webp";
import box15Gir from "@/assets/catalog_optimizado/box-15-girasoles.webp";
import box12Rosas from "@/assets/catalog_optimizado/box-12-rosas.webp";
import ramoLiliums from "@/assets/catalog_optimizado/ramo-liliums.webp";
import ramo10TulAmar from "@/assets/catalog_optimizado/ramo-10-tulipanes-amarillos.webp";
import caja24RosasRojas from "@/assets/catalog_optimizado/caja-24-rosas-rojas.webp";
import ramoCombinado from "@/assets/catalog_optimizado/ramo-combinado.webp";
import ramo12Gir from "@/assets/catalog_optimizado/ramo-12-girasoles.webp";
import ramo10Tul from "@/assets/catalog_optimizado/ramo-10-tulipanes-amarillos.webp";
import caja6RosasHK from "@/assets/catalog_optimizado/caja-6-rosas-hk.webp";
import ramo10TulRosados from "@/assets/catalog_optimizado/ramo-10-tulipanes-rosados.webp";
import caja3GirHK from "@/assets/catalog_optimizado/caja-3-girasoles-hk.webp";
import caja100RosasRojas from "@/assets/catalog_optimizado/caja-100-rosas-rojas.webp";
import ramo50Rosas from "@/assets/catalog_optimizado/ramo-50-rosas.webp";
import box24Rosas from "@/assets/catalog_optimizado/box-24-rosas.webp";
import ramo24Rosas from "@/assets/catalog_optimizado/ramo-24-rosas.webp";

import { Heart, Flower2, Gift, Sparkles, MessageCircle, Instagram, Facebook, Phone, MapPin, Search, ShoppingBag, Star, ChevronLeft, ChevronRight, Package, Flower, Cat } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroSlides = [
  {
    image: heroMothersDay,
    badge: "Día de la Madre · 2da semana de mayo",
    title: 'Sorpréndela este <em class="text-primary-glow not-italic">Día de la Madre</em>',
    desc: "Bouquets y detalles especiales para celebrar a mamá. Reserva con anticipación y haz que su día sea inolvidable.",
  },
  {
    image: heroImg,
    badge: "Tienda virtual · Lima, Perú",
    title: 'Flores y detalles para <em class="text-primary-glow not-italic">sorprender</em> a quien más quieres',
    desc: "Bouquets, arreglos florales y detalles personalizados para cumpleaños, aniversarios y momentos especiales.",
  },
  {
    image: heroShop,
    badge: "Hechos a mano con amor",
    title: 'Cada flor cuenta <em class="text-primary-glow not-italic">una historia</em>',
    desc: "Rosas, tulipanes, girasoles y arreglos premium hechos bajo pedido para regalar lo más lindo.",
  }
];

const WHATSAPP_NUMBER = "51912911039";
const DEFAULT_MSG = "Hola, vengo desde la web de Cositas Lindas Perú. Quisiera consultar por un arreglo floral/detalle personalizado.";

const waLink = (msg: string = DEFAULT_MSG) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

type CategoryKey = "Cajas" | "Boxes" | "Ramos" | "Rosas" | "Temáticas";

type Product = {
  id: string;
  name: string;
  category: CategoryKey;
  description: string;
  price: number;
  image: string;
  tag?: string;
};

const products: Product[] = [
  // CAJAS
  { id: "box-mama", name: "Box Mamá", category: "Boxes", price: 200, description: "Box especial con rosas, chocolates y espumante, ideal para sorprender con amor.", image: boxMama, tag: "Día de la Madre" },
  { id: "caja-20-tul-rojos", name: "Caja de 20 Tulipanes Rojos", category: "Cajas", price: 250, description: "Caja elegante con 20 tulipanes rojos frescos, cuidadosamente presentados en una caja con lazo.", image: caja20TulRojos },
  { id: "caja-20-tul-amar", name: "Caja de 20 Tulipanes Amarillos", category: "Cajas", price: 250, description: "Box elegante con 20 tulipanes amarillos frescos, cuidadosamente presentados en una caja con lazo.", image: caja20TulAmar },
  { id: "caja-rosas-variadas", name: "Caja de Rosas Variadas", category: "Cajas", price: 175, description: "Caja de 24 rosas frescas en tonos suaves, ideal para un detalle delicado y especial.", image: cajaRosasVar },
  { id: "caja-rosas-rosadas", name: "Caja de Rosas Rosadas", category: "Cajas", price: 175, description: "24 rosas rosadas frescas acomodadas de forma uniforme sobre una base de follaje verde.", image: cajaRosasRosadas },
  { id: "caja-24-rosas-rojas", name: "Caja 24 Rosas Rojas", category: "Cajas", price: 160, description: "Caja elegante con 24 rosas rojas frescas.", image: caja24RosasRojas },
  { id: "caja-100-rosas-rojas", name: "Caja 100 Rosas Rojas", category: "Cajas", price: 400, description: "Espectacular caja con 100 rosas rojas frescas, para una sorpresa inolvidable.", image: caja100RosasRojas, tag: "Premium" },

  // BOXES
  { id: "box-10-tul", name: "Box 10 Tulipanes", category: "Boxes", price: 150, description: "Elegante detalle con 10 tulipanes frescos.", image: box10Tul },
  { id: "box-20-tul", name: "Box 20 Tulipanes", category: "Boxes", price: 250, description: "Arreglo armonioso con 20 tulipanes premium.", image: box20Tul },
  { id: "box-30-tul", name: "Box 30 Tulipanes", category: "Boxes", price: 350, description: "Impactante box con 30 tulipanes rojos llenos de vida.", image: box30Tul },
  { id: "box-radiante", name: "Box Radiante", category: "Boxes", price: 220, description: "Arreglo floral elegante con lirios frescos en tonos rosados, ideal para sorprender.", image: boxRadiante },
  { id: "box-15-gir", name: "Box 15 Girasoles", category: "Boxes", price: 120, description: "Box vibrante con girasoles frescos que transmiten alegría y energía.", image: box15Gir },
  { id: "box-12-rosas", name: "Box 12 Rosas", category: "Boxes", price: 150, description: "Clásico box de rosas rojas, perfecto para expresar amor y pasión.", image: box12Rosas },
  { id: "box-24-rosas", name: "Box 24 Rosas", category: "Boxes", price: 160, description: "Box de 24 rosas frescas y luminosas.", image: box24Rosas },

  // RAMOS
  { id: "ramo-4-gir", name: "Ramo de 4 Girasoles", category: "Ramos", price: 50, description: "Ramo de 4 girasoles frescos envueltos en papel negro mate con acabado elegante.", image: ramo4Gir },
  { id: "ramo-12-rosas-rojas", name: "Ramo de 12 Rosas Rojas", category: "Ramos", price: 150, description: "Ramo de 12 rosas rojas frescas, con detalles elegantes y lazo rojo sobre papel negro.", image: ramo12RosasRojas },
  { id: "ramo-liliums", name: "Ramo de Liliums", category: "Ramos", price: 150, description: "Ramo de lirios delicados y sofisticados, ideal para un regalo elegante y duradero.", image: ramoLiliums },
  { id: "ramo-20-tul-rojos", name: "Ramo de 20 Tulipanes Rojos", category: "Ramos", price: 250, description: "Ramo elegante con 20 tulipanes rojos frescos, cuidadosamente presentados con lazo.", image: ramo20TulRojos },
  { id: "ramo-10-tul-amar", name: "Ramo de 10 Tulipanes Amarillos", category: "Ramos", price: 150, description: "Ramo de 10 tulipanes frescos, elegante y perfecto para sorprender con un detalle especial.", image: ramo10TulAmar },
  { id: "ramo-gerberas", name: "Ramo de Gerberas", category: "Ramos", price: 120, description: "Ramo de gerberas coloridas, fresco y alegre, ideal para cualquier ocasión especial.", image: ramoGerberas },
  { id: "ramo-combinado", name: "Ramo Combinado", category: "Ramos", price: 100, description: "Ramo vibrante de girasoles con acabado delicado.", image: ramoCombinado },
  { id: "ramo-12-gir", name: "Ramo de 12 Girasoles", category: "Ramos", price: 90, description: "Arreglo de 12 girasoles frescos y luminosos.", image: ramo12Gir },
  { id: "ramo-10-tul", name: "Ramo de 10 Tulipanes", category: "Ramos", price: 130, description: "10 tulipanes frescos con envoltura elegante.", image: ramo10Tul },

  // ROSAS
  { id: "ramo-50-rosas", name: "Ramo 50 Rosas", category: "Rosas", price: 250, description: "Ramo vibrante de rosas con acabado delicado.", image: ramo50Rosas },
  { id: "ramo-24-rosas", name: "Ramo de 24 Rosas", category: "Rosas", price: 160, description: "24 rosas frescas con envoltura elegante.", image: ramo24Rosas },

  // TEMÁTICAS
  { id: "caja-6-rosas-hk", name: "Caja 6 Rosas - Hello Kitty", category: "Temáticas", price: 50, description: "Caja de 6 rosas temática Hello Kitty, encantador detalle.", image: caja6RosasHK },
  { id: "ramo-10-tul-rosados", name: "Ramo 10 Tulipanes Rosados", category: "Temáticas", price: 150, description: "Arreglo floral de tulipanes en tonos rosados con flores frescas, presentado en una envoltura delicada.", image: ramo10TulRosados },
  { id: "caja-3-gir-hk", name: "Caja 3 Girasoles - Hello Kitty", category: "Temáticas", price: 40, description: "Caja de 3 girasoles temática Hello Kitty.", image: caja3GirHK },
];

const filterOptions: { key: "Todos" | CategoryKey; label: string; icon: typeof Flower2 }[] = [
  { key: "Todos", label: "Todos", icon: Sparkles },
  { key: "Cajas", label: "Cajas", icon: Package },
  { key: "Boxes", label: "Boxes", icon: Gift },
  { key: "Ramos", label: "Ramos", icon: Flower2 },
  { key: "Rosas", label: "Rosas", icon: Flower },
  { key: "Temáticas", label: "Temáticas", icon: Cat },
];

const categories = [
  { icon: Flower2, title: "Bouquets y arreglos", desc: "Rosas, tulipanes, girasoles y arreglos florales en florero." },
  { icon: Gift, title: "Detalles personalizados", desc: "Cajas con peluches, chocolates, globos y tarjeta con tu mensaje." },
  { icon: Sparkles, title: "Ocasiones especiales", desc: "Cumpleaños, aniversarios, San Valentín, Día de la Madre y más." },
];

const ProductCard = ({ p }: { p: Product }) => {
  const msg = `Hola Cositas Lindas Perú 💜 Quiero este producto: ${p.name} (S/. ${p.price}).`;

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-gradient-card shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 flex flex-col">
      <div className="relative aspect-[4/4.5] overflow-hidden bg-muted">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {p.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 backdrop-blur px-2.5 py-1 text-[10px] font-semibold text-primary-deep shadow-soft">
            {p.tag}
          </span>
        )}

        <span className="absolute right-3 top-3 rounded-full bg-primary/90 backdrop-blur px-2.5 py-1 text-[10px] font-medium text-primary-foreground">
          {p.category}
        </span>

        <span className="absolute left-3 bottom-3 rounded-full bg-primary-deep px-3 py-1 text-xs font-bold text-primary-foreground shadow-elegant">
          S/. {p.price}
        </span>
      </div>

      <div className="p-4 space-y-2 flex-1 flex flex-col">
        <h3 className="text-base font-display font-semibold leading-tight">
          {p.name}
        </h3>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {p.description}
        </p>

        <a
          href={waLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-xs font-semibold text-whatsapp-foreground transition-all hover:opacity-90 hover:shadow-soft"
        >
          <MessageCircle className="h-4 w-4" />
          Cotizar por WhatsApp
        </a>
      </div>
    </article>
  );
};

const Index = () => {
  const [slide, setSlide] = useState(0);
  const [showAllGallery, setShowAllGallery] = useState(false);
  const [filter, setFilter] = useState<"Todos" | CategoryKey>("Todos");
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 6000);
    return () => clearInterval(id);
  }, []);

  const goPrev = () => setSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length);
  const goNext = () => setSlide((s) => (s + 1) % heroSlides.length);

  const filteredProducts = useMemo(
    () => (filter === "Todos" ? products : products.filter((p) => p.category === filter)),
    [filter]
  );

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-deep/20 shadow-soft">
        <div className="container flex items-center justify-between py-4">
          <a href="#inicio" className="flex items-center gap-3">
            <img src={logo} alt="Cositas Lindas Perú logo" className="h-12 w-12 rounded-full object-cover shadow-soft ring-2 ring-primary-foreground/40" />
            <div className="leading-tight text-primary-foreground">
              <p className="font-display text-lg font-semibold">Cositas Lindas</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/80">Flores · Detalles · Perú</p>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-primary-foreground/90">
            <a href="#bouquets" className="hover:text-primary-foreground transition-colors">Catálogo</a>
            <a href="#categorias" className="hover:text-primary-foreground transition-colors">Detalles</a>
            <a href="#ocasiones" className="hover:text-primary-foreground transition-colors">Ocasiones</a>
            <a href="#galeria" className="hover:text-primary-foreground transition-colors">Galería</a>
            <a href="#como-comprar" className="hover:text-primary-foreground transition-colors">Cómo comprar</a>
          </nav>
          <Button asChild className="rounded-full bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground shadow-soft">
            <a href={waLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" /> Pedir
            </a>
          </Button>
        </div>
      </header>

      {/* HERO CARRUSEL */}
      <section id="inicio" className="relative overflow-hidden">
        <div className="relative h-[calc(100vh-76px)] min-h-[620px] md:h-[80vh] md:min-h-[560px] max-h-[800px] w-full">
          {heroSlides.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              aria-hidden={i !== slide}
            >
              <img
                src={s.image}
                alt=""
                className="h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
              {/* Overlay oscuro degradado */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 100%)" }}
              />
            </div>
          ))}

          {/* Contenido */}
          <div className="container relative h-full flex items-center">
            <div key={slide} className="max-w-2xl space-y-7 text-primary-foreground animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 backdrop-blur-md px-4 py-2 text-xs font-medium border border-primary-foreground/20">
                <Sparkles className="h-3.5 w-3.5" /> {heroSlides[slide].badge}
              </span>
              <h1
                className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] tracking-tight drop-shadow-lg"
                dangerouslySetInnerHTML={{ __html: heroSlides[slide].title }}
              />
              <p className="text-lg text-primary-foreground/90 max-w-xl leading-relaxed drop-shadow">
                {heroSlides[slide].desc}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-full h-14 px-8 bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground shadow-elegant text-base">
                  <a href={waLink()} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" /> Pedir por WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground text-base">
                  <a href="#bouquets"><Search className="h-4 w-4" /> Ver catálogo</a>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-primary-foreground/85">
                <span className="flex items-center gap-2"><Star className="h-4 w-4 fill-accent text-accent" /> +685 seguidores en IG</span>
                <span className="flex items-center gap-2"><Heart className="h-4 w-4 text-accent" /> Hechos con amor</span>
                <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Delivery en Lima</span>
              </div>
            </div>
          </div>

          {/* Controles */}
          <button
  onClick={goPrev}
  aria-label="Slide anterior"
  className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-md border border-white/30 text-white items-center justify-center transition"
>
  <ChevronLeft className="h-5 w-5" />
</button>

<button
  onClick={goNext}
  aria-label="Siguiente slide"
  className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-md border border-white/30 text-white items-center justify-center transition"
>
  <ChevronRight className="h-5 w-5" />
</button>

          {/* Indicadores */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Ir al slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === slide ? "w-8 bg-primary-foreground" : "w-2 bg-primary-foreground/50 hover:bg-primary-foreground/80"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section id="categorias" className="py-20 lg:py-28">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-primary-deep font-semibold mb-3">Lo que creamos</p>
            <h2 className="text-4xl lg:text-5xl font-display font-semibold leading-tight">Detalles pensados para cada momento</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((c, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-gradient-card shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 border border-border/40">
                <div className="h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-soft mb-6 group-hover:scale-110 transition-transform">
                  <c.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">{c.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOGO */}
      <section id="bouquets" className="py-20 lg:py-28 bg-gradient-soft">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-primary-deep font-semibold mb-3">Catálogo</p>
              <h2 className="text-4xl lg:text-5xl font-display font-semibold leading-tight">Bouquets, arreglos y detalles</h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">Explora nuestras creaciones favoritas. Cada producto se hace bajo pedido y se puede personalizar a tu gusto.</p>
            </div>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary-deep hover:underline inline-flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" /> ¿No ves lo que buscas? Cotiza a medida
            </a>
          </div>
          {/* Filtros */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 justify-center">
            {filterOptions.map((opt) => {
              const Icon = opt.icon;
              const active = filter === opt.key;
              const count = opt.key === "Todos" ? products.length : products.filter((p) => p.category === opt.key).length;
              return (
                <button
                  key={opt.key}
                  onClick={() => {
  setFilter(opt.key);
  setVisibleCount(4);
}}
                  className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all border ${
                    active
                      ? "bg-gradient-primary text-primary-foreground border-transparent shadow-elegant scale-105"
                      : "bg-card text-foreground border-border hover:border-primary/50 hover:shadow-soft"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? "" : "text-primary-deep"}`} />
                  {opt.label}
                  <span className={`text-[11px] rounded-full px-2 py-0.5 ${active ? "bg-primary-foreground/20" : "bg-muted text-muted-foreground"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
  {visibleProducts.map((p) => (
    <ProductCard key={p.id} p={p} />
  ))}
</div>

{visibleCount < filteredProducts.length && (
  <div className="mt-10 flex justify-center">
    <Button
      onClick={() => setVisibleCount((prev) => prev + 4)}
      size="lg"
      className="rounded-full px-8 bg-primary text-primary-foreground shadow-soft hover:opacity-90"
    >
      Ver más productos
    </Button>
  </div>
)}
          {filteredProducts.length === 0 && (
            <p className="text-center text-muted-foreground mt-10">No hay productos en esta categoría.</p>
          )}
        </div>
      </section>

      {/* OCASIONES */}
      <section id="ocasiones" className="py-20 lg:py-28">
        <div className="container">
          <div className="rounded-[2.5rem] bg-gradient-primary p-10 lg:p-16 shadow-elegant relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-primary-foreground/10 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-primary-foreground/10 blur-2xl" />
            <div className="relative grid lg:grid-cols-2 gap-10 items-center">
              <div className="text-primary-foreground space-y-6">
                <p className="text-xs uppercase tracking-[0.25em] opacity-80 font-semibold">Ocasiones especiales</p>
                <h2 className="text-4xl lg:text-5xl font-display font-semibold leading-tight">Para cada fecha que merece ser recordada</h2>
                <p className="opacity-90 leading-relaxed text-lg">San Valentín, Día de la Mujer, Día de la Madre, cumpleaños, aniversarios, graduaciones… cualquier excusa es buena para regalar lindo.</p>
                <Button asChild size="lg" className="rounded-full h-14 px-8 bg-background text-foreground hover:bg-background/90 shadow-soft">
                  <a href={waLink()} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" /> Cuéntanos tu ocasión
                  </a>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["San Valentín", "Día de la Madre", "Cumpleaños", "Aniversarios", "Día de la Mujer", "Solo porque sí"].map((o) => (
                  <div key={o} className="rounded-2xl bg-primary-foreground/15 backdrop-blur border border-primary-foreground/20 px-5 py-4 text-primary-foreground text-sm font-medium flex items-center gap-2">
                    <Heart className="h-4 w-4 fill-current opacity-80" /> {o}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section id="galeria" className="py-20 lg:py-28 bg-gradient-soft">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-primary-deep font-semibold mb-3">Galería</p>
            <h2 className="text-4xl lg:text-5xl font-display font-semibold leading-tight">Inspírate con nuestras creaciones</h2>
          </div>
          {(() => {
            const allImages = [boxMama, caja20TulRojos, caja100RosasRojas, ramo50Rosas, box30Tul, ramoLiliums, ramoGerberas, ramo4Gir, box15Gir, cajaRosasRosadas, ramo20TulRojos, caja6RosasHK];
            const visible = showAllGallery ? allImages : allImages.slice(0, 4);
            return (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {visible.map((img, i) => (
                    <div key={i} className="overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-500 aspect-square">
                      <img src={img} alt={`Creación Cositas Lindas ${i + 1}`} loading="lazy" className="h-full w-full object-cover hover:scale-110 transition-transform duration-700" />
                    </div>
                  ))}
                </div>
                {allImages.length > 4 && (
                  <div className="flex justify-center mt-10">
                    <Button
                      onClick={() => setShowAllGallery((v) => !v)}
                      size="lg"
                      variant="outline"
                      className="rounded-full h-12 px-8 border-primary/40 text-primary-deep hover:bg-primary/10"
                    >
                      {showAllGallery ? "Ver menos" : `Ver más fotos (${allImages.length - 4})`}
                    </Button>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </section>

      {/* COMO COMPRAR */}
      <section id="como-comprar" className="py-20 lg:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-primary-deep font-semibold mb-3">Cómo comprar</p>
            <h2 className="text-4xl lg:text-5xl font-display font-semibold leading-tight">Tan fácil como mandar un mensaje</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "01", t: "Elige tu detalle", d: "Mira el catálogo o cuéntanos qué tienes en mente. Hacemos diseños a medida." },
              { n: "02", t: "Cotiza por WhatsApp", d: "Te enviamos opciones, fotos de referencia y precio. Personalizamos tu pedido." },
              { n: "03", t: "Recibe la sorpresa", d: "Coordinamos entrega en Lima en la fecha y hora que elijas. ¡A sorprender!" },
            ].map((s) => (
              <div key={s.n} className="relative p-8 rounded-3xl bg-gradient-card border border-border/40 shadow-soft">
                <span className="font-display text-6xl text-gradient font-semibold opacity-80">{s.n}</span>
                <h3 className="text-xl font-display font-semibold mt-4 mb-2">{s.t}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO CTA */}
      <section id="contacto" className="py-20 lg:py-28 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary-glow blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
        </div>
        <div className="container relative text-center max-w-3xl">
          <img src={logo} alt="Cositas Lindas Perú" className="h-24 w-24 rounded-full mx-auto mb-8 shadow-elegant" />
          <h2 className="text-4xl lg:text-6xl font-display font-semibold leading-tight mb-6">
            ¿Listo para <em className="text-gradient not-italic">sorprender</em>?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Escríbenos por WhatsApp y te ayudamos a crear el detalle perfecto. Atención rápida y personalizada.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-full h-14 px-8 bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground shadow-elegant text-base">
              <a href={waLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" /> Pedir por WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 border-primary/30 hover:bg-primary/10 text-base">
              <a href="https://instagram.com/cositaslindas.peru" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" /> @cositaslindas.peru
              </a>
            </Button>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-12 text-sm">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-card/60 backdrop-blur border border-border/40 hover:shadow-soft transition-shadow">
              <Phone className="h-4 w-4 text-primary-deep" /> 912 911 039
            </a>
            <a href="https://instagram.com/cositaslindas.peru" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-card/60 backdrop-blur border border-border/40 hover:shadow-soft transition-shadow">
              <Instagram className="h-4 w-4 text-primary-deep" /> Instagram
            </a>
            <a href="https://www.facebook.com/profile.php?id=100088064384748" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-card/60 backdrop-blur border border-border/40 hover:shadow-soft transition-shadow">
              <Facebook className="h-4 w-4 text-primary-deep" /> Facebook
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/50 py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Cositas Lindas" className="h-9 w-9 rounded-full" />
            <span>© {new Date().getFullYear()} Cositas Lindas Perú · Lima, Perú</span>
          </div>
          <p className="flex items-center gap-1">Hecho con <Heart className="h-3.5 w-3.5 fill-accent text-accent" /> para sorprender</p>
        </div>
      </footer>

      {/* WHATSAPP FLOTANTE */}
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pedir por WhatsApp"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-whatsapp text-whatsapp-foreground shadow-elegant flex items-center justify-center hover:scale-110 transition-transform animate-float"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
};

export default Index;
