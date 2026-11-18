import { Link } from "react-router-dom";
import { Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import logo from "../assets/logo.jpeg";
import { CATEGORIES, PRODUCTS } from "../data/products";
import { COMPANY, whatsappLink } from "../data/site";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-ice-200/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-12 w-12 rounded-lg bg-white object-contain" />
            <div>
              <p className="font-display font-bold text-white">{COMPANY.brand}</p>
              <p className="text-xs">by {COMPANY.name}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            Ready-to-use business software with setup, training and support. No online payment — talk to us for a quote that fits your business.
          </p>
        </div>

        <div>
          <p className="font-display text-sm font-semibold text-white">Software</p>
          <ul className="mt-4 space-y-2 text-sm">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link to={`/software/${p.slug}`} className="hover:text-white">{p.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-semibold text-white">Categories</p>
          <ul className="mt-4 space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link to={`/software?category=${c.id}`} className="hover:text-white">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-semibold text-white">Contact</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 hover:text-white">
                <Phone size={15} /> {COMPANY.phone}
              </a>
            </li>
            <li>
              <a href={whatsappLink("Hi, I'd like to know more about your software.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-white">
                <MessageCircle size={15} /> WhatsApp us
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2.5 hover:text-white">
                <Mail size={15} /> {COMPANY.email}
              </a>
            </li>
            <li>
              <a href={COMPANY.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-white">
                <Globe size={15} /> {COMPANY.website.replace(/^https?:\/\//, "")}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin size={15} /> {COMPANY.address}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs">
        © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
      </div>
    </footer>
  );
}
