import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";

export function SectionHead({ eyebrow, title, desc, link, linkText = "View all" }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-widest text-blue-500">{eyebrow}</p>}
        <h2 className="font-display mt-1.5 text-2xl sm:text-3xl font-bold">{title}</h2>
        {desc && <p className="mt-2 text-sm sm:text-base text-navy-900/60">{desc}</p>}
      </div>
      {link && (
        <Link to={link} className="flex items-center gap-1 text-sm font-semibold text-blue-500 hover:gap-2 transition-all">
          {linkText} <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}

export function ProductGrid({ products, className = "mt-8 lg:grid-cols-4" }) {
  return (
    <div className={`grid gap-5 sm:grid-cols-2 ${className}`}>
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
