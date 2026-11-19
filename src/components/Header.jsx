import { useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Mail, Menu, MonitorPlay, Phone, Search, X } from "lucide-react";
import logo from "../assets/logo.jpeg";
import { CATEGORIES } from "../data/products";
import { COMPANY } from "../data/site";
import { useEnquiry } from "./EnquiryContext";

export function SearchBar({ big = false, className = "" }) {
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    navigate(q.trim() ? `/software?q=${encodeURIComponent(q.trim())}` : "/software");
  };

  return (
    <form onSubmit={submit} role="search" className={`flex items-center rounded-full bg-white ring-1 ring-navy-900/10 focus-within:ring-2 focus-within:ring-blue-500 ${className}`}>
      <Search size={big ? 20 : 17} className={`${big ? "ml-5" : "ml-4"} shrink-0 text-navy-900/40`} />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search CRM, WhatsApp, ERP, MIS…"
        aria-label="Search software"
        className={`min-w-0 flex-1 bg-transparent px-3 outline-none placeholder:text-navy-900/40 ${big ? "py-4 text-base" : "py-2.5 text-sm"}`}
      />
      <button
        type="submit"
        className={`shrink-0 rounded-full bg-blue-500 font-semibold text-white hover:bg-blue-600 ${big ? "m-1.5 px-7 py-3 text-sm" : "m-1 px-4 py-1.5 text-xs"}`}
      >
        Search
      </button>
    </form>
  );
}

export default function Header() {
  const openEnquiry = useEnquiry();
  const [menu, setMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-navy-900/5">
      <div className="hidden md:block bg-navy-950 text-ice-200/80 text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <p>No online payment — enquire for pricing, setup & subscription plans</p>
          <div className="flex items-center gap-5">
            <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-white">
              <Phone size={13} /> {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-1.5 hover:text-white">
              <Mail size={13} /> {COMPANY.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 sm:px-6 py-3">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <img src={logo} alt={COMPANY.brand} className="h-11 w-11 rounded-lg object-contain bg-white ring-1 ring-navy-900/5" />
          <span className="leading-tight">
            <span className="font-display block text-[15px] font-bold">{COMPANY.brand}</span>
            <span className="block text-[11px] font-medium text-navy-900/50">by {COMPANY.name}</span>
          </span>
        </Link>

        <SearchBar className="hidden md:flex flex-1 max-w-xl mx-auto" />

        <nav className="ml-auto hidden lg:flex items-center gap-6 text-sm font-medium">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "text-blue-500" : "text-navy-900/70 hover:text-navy-900")}>
            Home
          </NavLink>
          <NavLink to="/software" end className={({ isActive }) => (isActive ? "text-blue-500" : "text-navy-900/70 hover:text-navy-900")}>
            All Software
          </NavLink>
        </nav>
        <button
          type="button"
          onClick={() => openEnquiry("", "demo")}
          className="ml-auto lg:ml-0 hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:brightness-110"
        >
          <MonitorPlay size={16} /> Request Demo
        </button>
        <button
          type="button"
          onClick={() => setMenu((m) => !m)}
          aria-label="Menu"
          className="ml-auto sm:ml-0 lg:hidden grid h-10 w-10 place-items-center rounded-full ring-1 ring-navy-900/10"
        >
          {menu ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div className="md:hidden px-4 pb-3">
        <SearchBar />
      </div>

      {/* category strip, Flipkart-style */}
      <div className="border-t border-navy-900/5">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 sm:px-6 py-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to={`/software?category=${c.id}`}
              className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-navy-900/70 hover:bg-ice-50 hover:text-navy-900"
            >
              <c.icon size={14} /> {c.name}
            </Link>
          ))}
        </div>
      </div>

      {menu && (
        <div className="lg:hidden border-t border-navy-900/5 bg-white px-4 py-3 space-y-1 text-sm font-medium" onClick={() => setMenu(false)}>
          <Link to="/" className="block rounded-lg px-3 py-2 hover:bg-ice-50">Home</Link>
          <Link to="/software" className="block rounded-lg px-3 py-2 hover:bg-ice-50">All Software</Link>
          <button type="button" onClick={() => openEnquiry("", "demo")} className="block w-full text-left rounded-lg px-3 py-2 text-blue-500 hover:bg-ice-50">
            Request a Demo
          </button>
          <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="block rounded-lg px-3 py-2 hover:bg-ice-50">Call {COMPANY.phone}</a>
        </div>
      )}
    </header>
  );
}
