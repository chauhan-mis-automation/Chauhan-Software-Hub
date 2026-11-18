import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SearchX, X } from "lucide-react";
import { ProductGrid } from "../components/Section";
import { SearchBar } from "../components/Header";
import { useEnquiry } from "../components/EnquiryContext";
import { CATEGORIES, PRODUCTS, getCategory } from "../data/products";

const SORTS = {
  popular: (a, b) => Number(b.bestSeller) - Number(a.bestSeller) || Number(b.featured) - Number(a.featured),
  new: (a, b) => Number(b.newArrival) - Number(a.newArrival),
  name: (a, b) => a.name.localeCompare(b.name),
};

const matches = (p, q) => {
  const text = [p.name, p.tagline, p.overview, getCategory(p.category).name, ...p.features, ...p.modules, ...p.idealFor]
    .join(" ")
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((w) => text.includes(w));
};

export default function Products() {
  const [params, setParams] = useSearchParams();
  const openEnquiry = useEnquiry();
  const q = params.get("q") || "";
  const category = params.get("category") || "";
  const sort = params.get("sort") || "popular";

  const set = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const list = useMemo(
    () =>
      PRODUCTS.filter((p) => (!category || p.category === category) && (!q || matches(p, q))).sort(SORTS[sort] || SORTS.popular),
    [q, category, sort]
  );

  const cat = getCategory(category);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <nav className="text-xs text-navy-900/50">
        <Link to="/" className="hover:text-navy-900">Home</Link> / <span className="text-navy-900">All Software</span>
        {cat && <> / <span className="text-navy-900">{cat.name}</span></>}
      </nav>
      <h1 className="font-display mt-2 text-3xl font-bold">{cat ? cat.name : "All Software Products"}</h1>
      <p className="mt-1 text-sm text-navy-900/60">
        {list.length} product{list.length === 1 ? "" : "s"}
        {q && <> for "<b className="text-navy-900">{q}</b>"</>}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="space-y-6">
          <SearchBar key={q} className="lg:hidden" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-900/50">Categories</p>
            <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
              <button
                type="button"
                onClick={() => set("category", "")}
                className={`shrink-0 rounded-xl px-3 py-2 text-left text-sm font-medium ${!category ? "bg-navy-900 text-white" : "bg-white hover:bg-ice-200/50 ring-1 ring-navy-900/5"}`}
              >
                All ({PRODUCTS.length})
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => set("category", c.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium ${
                    category === c.id ? "bg-navy-900 text-white" : "bg-white hover:bg-ice-200/50 ring-1 ring-navy-900/5"
                  }`}
                >
                  <c.icon size={15} /> {c.name} ({PRODUCTS.filter((p) => p.category === c.id).length})
                </button>
              ))}
            </div>
          </div>
          <div className="hidden lg:block rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 p-5 text-white">
            <p className="font-display font-bold">Need something custom?</p>
            <p className="mt-1 text-sm text-white/80">We also build software to your exact requirement.</p>
            <button type="button" onClick={() => openEnquiry()} className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-semibold text-navy-900">
              Send Requirement
            </button>
          </div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {q && (
                <button type="button" onClick={() => set("q", "")} className="flex items-center gap-1 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-500">
                  "{q}" <X size={13} />
                </button>
              )}
              {cat && (
                <button type="button" onClick={() => set("category", "")} className="flex items-center gap-1 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-500">
                  {cat.name} <X size={13} />
                </button>
              )}
            </div>
            <label className="flex items-center gap-2 text-sm text-navy-900/60">
              Sort by
              <select value={sort} onChange={(e) => set("sort", e.target.value)} className="rounded-lg bg-white px-3 py-1.5 text-sm text-navy-900 ring-1 ring-navy-900/10 outline-none">
                <option value="popular">Popularity</option>
                <option value="new">Newest first</option>
                <option value="name">Name A–Z</option>
              </select>
            </label>
          </div>

          {list.length ? (
            <ProductGrid products={list} className="mt-5 lg:grid-cols-2 xl:grid-cols-3" />
          ) : (
            <div className="mt-8 rounded-2xl bg-white p-10 text-center ring-1 ring-navy-900/5">
              <SearchX className="mx-auto text-navy-900/30" size={40} />
              <p className="font-display mt-3 text-lg font-bold">No software found</p>
              <p className="mt-1 text-sm text-navy-900/60">Tell us what you need — we may already have it, or can build it for you.</p>
              <button type="button" onClick={() => openEnquiry()} className="mt-5 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white">
                Send an Enquiry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
