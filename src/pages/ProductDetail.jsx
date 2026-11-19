import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Expand,
  MessageCircle,
  MonitorPlay,
  PlayCircle,
  Send,
  Users,
  X,
} from "lucide-react";
import { useEnquiry } from "../components/EnquiryContext";
import EnquiryForm from "../components/EnquiryForm";
import { Badge, PartnerBadge, ProductCover } from "../components/ProductCard";
import { ProductGrid, SectionHead } from "../components/Section";
import { PRODUCTS, getCategory, getProduct } from "../data/products";
import { PRICING_MODELS, whatsappLink } from "../data/site";
import NotFound from "./NotFound";

const youtubeId = (url) => url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)?.[1];

function Media({ item, product, onZoom }) {
  if (item.type === "video") {
    const id = youtubeId(item.src);
    return id ? (
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${id}?rel=0`}
        title={`${product.name} video`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    ) : (
      <video className="h-full w-full bg-black" src={item.src} poster={item.poster} preload="metadata" controls playsInline />
    );
  }
  return (
    <button type="button" onClick={onZoom} className="group relative h-full w-full cursor-zoom-in" aria-label="View full screen">
      <img src={item.src} alt={product.name} className="h-full w-full object-contain" />
      <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-navy-950/75 px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">
        <Expand size={13} /> Full screen
      </span>
    </button>
  );
}

function Gallery({ product }) {
  const media = [
    ...(product.video ? [{ type: "video", src: product.video, poster: product.videoPoster }] : []),
    ...product.images.map((src) => ({ type: "image", src })),
  ];
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(null);
  const images = product.images;

  useEffect(() => {
    if (zoom === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setZoom(null);
      if (e.key === "ArrowRight") setZoom((z) => (z + 1) % images.length);
      if (e.key === "ArrowLeft") setZoom((z) => (z - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoom, images.length]);

  if (!media.length) return <ProductCover product={product} className="aspect-[16/10] rounded-2xl" />;

  const current = media[active];
  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white ring-1 ring-navy-900/5 shadow-sm">
        <Media item={current} product={product} onZoom={() => setZoom(images.indexOf(current.src))} />
      </div>
      {media.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto">
          {media.map((m, i) => (
            <button
              key={m.src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={m.type === "video" ? "Play video" : `Screenshot ${i + 1}`}
              className={`relative h-16 w-24 sm:h-20 sm:w-32 shrink-0 overflow-hidden rounded-xl bg-white ring-2 transition ${
                i === active ? "ring-blue-500" : "ring-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {m.type === "video" ? (
                <span className="relative grid h-full w-full place-items-center bg-navy-950 text-white">
                  {m.poster && <img src={m.poster} alt="" className="absolute inset-0 h-full w-full object-cover object-left-top opacity-60" />}
                  <PlayCircle size={26} className="relative" />
                </span>
              ) : (
                <img src={m.src} alt="" className="h-full w-full object-cover object-left-top" />
              )}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {zoom !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-navy-950/95 p-4"
            onClick={() => setZoom(null)}
          >
            <img src={images[zoom]} alt={product.name} className="max-h-full max-w-full rounded-lg" onClick={(e) => e.stopPropagation()} />
            <button type="button" aria-label="Close" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white" onClick={() => setZoom(null)}>
              <X size={20} />
            </button>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous"
                  className="absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoom((z) => (z - 1 + images.length) % images.length);
                  }}
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  className="absolute right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoom((z) => (z + 1) % images.length);
                  }}
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ShareButton() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <button type="button" onClick={copy} className="flex items-center gap-1.5 text-xs font-semibold text-navy-900/60 hover:text-navy-900">
      {copied ? <Check size={14} className="text-teal-500" /> : <Copy size={14} />}
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const openEnquiry = useEnquiry();

  useEffect(() => {
    if (product) document.title = `${product.name} | Chauhan Software Hub`;
  }, [product]);

  if (!product) return <NotFound />;

  const cat = getCategory(product.category);
  const related = [
    ...PRODUCTS.filter((p) => p.slug !== slug && p.category === product.category),
    ...PRODUCTS.filter((p) => p.slug !== slug && p.category !== product.category && p.featured),
  ].slice(0, 4);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <nav className="text-xs text-navy-900/50">
          <Link to="/" className="hover:text-navy-900">Home</Link> /{" "}
          <Link to={`/software?category=${cat.id}`} className="hover:text-navy-900">{cat.name}</Link> /{" "}
          <span className="text-navy-900">{product.name}</span>
        </nav>

        <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <Gallery key={slug} product={product} />

          <div className="lg:sticky lg:top-40 self-start">
            <div className="flex items-center justify-between">
              <Link to={`/software?category=${cat.id}`} className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-500">
                <cat.icon size={14} /> {cat.name}
              </Link>
              <ShareButton />
            </div>
            <h1 className="font-display mt-2 text-3xl sm:text-4xl font-bold leading-tight">{product.name}</h1>
            <p className="mt-2 text-navy-900/60">{product.tagline}</p>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {product.partnerBadge && <PartnerBadge big>{product.partnerBadge}</PartnerBadge>}
              {product.bestSeller && <Badge tone="amber">Best Seller</Badge>}
              {product.newArrival && <Badge tone="teal">New</Badge>}
              {product.featured && <Badge>Featured</Badge>}
            </div>

            <div className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-navy-900/5">
              <p className="text-xs font-semibold text-navy-900/50">Pricing</p>
              <p className="font-display mt-1 text-xl font-bold">Price on request</p>
              <p className="mt-1 text-sm text-navy-900/60">Setup fee + monthly, quarterly or yearly subscription. Custom pricing available.</p>
              <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-teal-600">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" /> Enquiry & live demo available
              </p>

              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => openEnquiry(product.slug)}
                  className="flex items-center justify-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500"
                >
                  <Send size={16} /> Enquire Now
                </button>
                <button
                  type="button"
                  onClick={() => openEnquiry(product.slug, "demo")}
                  className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white hover:brightness-110"
                >
                  <MonitorPlay size={16} /> Request Demo
                </button>
              </div>
              <a
                href={whatsappLink(`Hi, I'm interested in ${product.name}. Please share details.\n${window.location.href}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 flex items-center justify-center gap-2 rounded-full border border-wa/40 px-5 py-3 text-sm font-semibold text-[#128C7E] hover:bg-wa/5"
              >
                <MessageCircle size={16} /> Ask on WhatsApp
              </a>
            </div>

            <div className="mt-5">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-navy-900/50">
                <Users size={14} /> Ideal for
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.idealFor.map((t) => (
                  <span key={t} className="rounded-full bg-white px-3 py-1 text-xs font-medium ring-1 ring-navy-900/10">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div className="space-y-8">
            <section>
              <h2 className="font-display text-xl font-bold">Overview</h2>
              <p className="mt-3 leading-relaxed text-navy-900/70">{product.overview}</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold">Key Features</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 rounded-xl bg-white p-3.5 text-sm ring-1 ring-navy-900/5">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-500/15 text-teal-600">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold">Modules Included</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.modules.map((m) => (
                  <span key={m} className="rounded-lg bg-blue-500/10 px-3 py-1.5 text-sm font-medium text-blue-600">{m}</span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold">Plans Available</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {PRICING_MODELS.map((m) => (
                  <div key={m.title} className="rounded-xl bg-white p-4 ring-1 ring-navy-900/5">
                    <p className="text-sm font-semibold">{m.title}</p>
                    <p className="text-xs text-navy-900/50">{m.note}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside id="enquire" className="self-start rounded-3xl bg-white p-6 shadow-sm ring-1 ring-navy-900/5">
            <EnquiryForm key={slug} product={slug} />
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
            <SectionHead eyebrow="You may also like" title="Related Software" link="/software" />
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </>
  );
}
