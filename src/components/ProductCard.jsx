import { Link } from "react-router-dom";
import { ArrowRight, Images, PlayCircle } from "lucide-react";
import { getCategory } from "../data/products";
import { useEnquiry } from "./EnquiryContext";

// Cover used when a product has no screenshots yet.
export function ProductCover({ product, className = "" }) {
  const cat = getCategory(product.category);
  const Icon = cat.icon;
  return (
    <div className={`relative grid place-items-center overflow-hidden bg-gradient-to-br ${cat.color} ${className}`}>
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15" />
      <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-white/10" />
      <div className="relative text-center text-white px-6">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/20 backdrop-blur">
          <Icon size={30} />
        </span>
        <p className="font-display mt-3 text-lg font-bold">{product.name}</p>
        <p className="mt-1 text-xs text-white/80">Screenshots shown in the live demo</p>
      </div>
    </div>
  );
}

export function Badge({ children, tone = "blue" }) {
  const tones = {
    blue: "bg-blue-500 text-white",
    amber: "bg-amber-400 text-navy-950",
    teal: "bg-teal-500 text-white",
  };
  return <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${tones[tone]}`}>{children}</span>;
}

export default function ProductCard({ product }) {
  const openEnquiry = useEnquiry();
  const cat = getCategory(product.category);
  const to = `/software/${product.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-navy-900/5 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={to} className="relative block aspect-[16/10] overflow-hidden bg-ice-50">
        {product.images.length ? (
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover object-left-top transition duration-500 group-hover:scale-105"
          />
        ) : (
          <ProductCover product={product} className="h-full w-full" />
        )}
        <div className="absolute left-3 top-3 flex gap-1.5">
          {product.bestSeller && <Badge tone="amber">Best Seller</Badge>}
          {product.newArrival && <Badge tone="teal">New</Badge>}
        </div>
        {(product.images.length > 1 || product.video) && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-navy-950/75 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
            {product.video ? <PlayCircle size={12} /> : <Images size={12} />}
            {product.video ? "Video" : `${product.images.length} screens`}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-blue-500">
          <cat.icon size={13} /> {cat.name}
        </p>
        <Link to={to}>
          <h3 className="font-display mt-2 text-lg font-bold leading-snug group-hover:text-blue-500">{product.name}</h3>
        </Link>
        <p className="mt-1.5 text-sm text-navy-900/60">{product.tagline}</p>

        <div className="mt-auto pt-5">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-teal-600">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" /> Enquiry & Demo available
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              to={to}
              className="flex items-center justify-center gap-1 rounded-full border border-navy-900/10 px-3 py-2.5 text-xs font-semibold hover:bg-ice-50"
            >
              View Details
            </Link>
            <button
              type="button"
              onClick={() => openEnquiry(product.slug)}
              className="flex items-center justify-center gap-1 rounded-full bg-navy-900 px-3 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
            >
              Enquire Now <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
