import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, MessageCircle, MonitorPlay, Phone, PlayCircle, Quote } from "lucide-react";
import { SearchBar } from "../components/Header";
import { ProductGrid, SectionHead } from "../components/Section";
import EnquiryForm from "../components/EnquiryForm";
import { useEnquiry } from "../components/EnquiryContext";
import { CATEGORIES, PRODUCTS } from "../data/products";
import { COMPANY, PRICING_MODELS, REVIEWS, STEPS, whatsappLink } from "../data/site";
import heroA from "../assets/products/whatsapp-crm-dashboard.jpeg";
import heroB from "../assets/products/lead-management-crm.jpeg";

const QUICK = ["WhatsApp", "CRM", "ERP", "MIS", "Dispatch"];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5 },
};

function Hero() {
  const openEnquiry = useEnquiry();
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-violet-500/25 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 py-14 lg:py-20 lg:grid-cols-2">
        <motion.div className="min-w-0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-ice-200 ring-1 ring-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400" /> by {COMPANY.name}
          </span>
          <h1 className="font-display mt-5 text-4xl sm:text-5xl font-extrabold leading-[1.1]">
            Chauhan{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Software Hub</span>
          </h1>
          <p className="mt-4 max-w-lg text-base sm:text-lg text-ice-200/75">
            Ready-to-use WhatsApp automation, CRM, ERP, production and MIS software for growing businesses. Explore the
            screens, then ask us for a live demo.
          </p>

          <SearchBar big className="mt-8 max-w-xl text-navy-900" />
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-ice-200/60">Popular:</span>
            {QUICK.map((q) => (
              <Link key={q} to={`/software?q=${q}`} className="rounded-full bg-white/10 px-3 py-1 hover:bg-white/20">
                {q}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => openEnquiry("", "demo")}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3 text-sm font-semibold shadow-lg shadow-blue-500/30 hover:brightness-110"
            >
              <MonitorPlay size={17} /> Request a Free Demo
            </button>
            <Link to="/software" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/15">
              Browse All Software
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative hidden sm:block h-[340px] lg:h-[420px]"
        >
          <img src={heroB} alt="Lead Management CRM" className="absolute right-0 top-0 w-[82%] rounded-xl shadow-2xl ring-1 ring-white/10" />
          <img src={heroA} alt="WhatsApp Bulk Automation" className="absolute bottom-0 left-0 w-[78%] rounded-xl shadow-2xl ring-1 ring-white/10" />
          <div className="absolute bottom-8 right-2 rounded-2xl bg-white px-4 py-3 text-navy-900 shadow-xl">
            <p className="text-[11px] font-semibold text-navy-900/50">Software available</p>
            <p className="font-display text-2xl font-bold">{PRODUCTS.length}+ products</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
      <SectionHead eyebrow="Browse" title="Software Categories" link="/software" linkText="All software" />
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {CATEGORIES.map((c) => {
          const count = PRODUCTS.filter((p) => p.category === c.id).length;
          return (
            <Link
              key={c.id}
              to={`/software?category=${c.id}`}
              className="group rounded-2xl border border-navy-900/5 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${c.color} text-white shadow-md transition group-hover:scale-110`}>
                <c.icon size={24} />
              </span>
              <p className="font-display mt-3 text-sm font-semibold">{c.name}</p>
              <p className="mt-0.5 text-xs text-navy-900/50">
                {count} product{count === 1 ? "" : "s"}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function DemoVideos() {
  const withVideo = PRODUCTS.filter((p) => p.video);
  if (!withVideo.length) return null;
  return (
    <section className="bg-navy-950">
      <motion.div {...reveal} className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">Watch in action</p>
        <h2 className="font-display mt-1.5 text-2xl sm:text-3xl font-bold text-white">Software Demo Videos</h2>
        <p className="mt-2 text-sm sm:text-base text-ice-200/60">Real walkthroughs of systems we've built and delivered.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {withVideo.map((p) => (
            <Link key={p.slug} to={`/software/${p.slug}`} className="group overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition hover:-translate-y-1 hover:ring-white/25">
              <div className="relative aspect-video overflow-hidden bg-navy-900">
                {(p.videoPoster || p.images[0]) && (
                  <img src={p.videoPoster || p.images[0]} alt="" loading="lazy" className="h-full w-full object-cover object-left-top opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
                )}
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-blue-500 shadow-xl transition group-hover:scale-110">
                    <PlayCircle size={30} />
                  </span>
                </span>
              </div>
              <div className="p-4">
                <p className="font-display font-semibold text-white">{p.name}</p>
                <p className="mt-0.5 text-xs text-ice-200/60">Watch demo →</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Row({ eyebrow, title, desc, products, bg, cols = "mt-8 lg:grid-cols-3" }) {
  if (!products.length) return null;
  return (
    <section className={bg ? "bg-white" : ""}>
      <motion.div {...reveal} className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <SectionHead eyebrow={eyebrow} title={title} desc={desc} link="/software" />
        <ProductGrid products={products} className={cols} />
      </motion.div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="bg-white">
      <motion.div {...reveal} className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <SectionHead eyebrow="Simple process" title="How it works" desc="No cart, no online payment. Just tell us what you need." />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl bg-ice-50 p-6">
              <span className="font-display text-4xl font-extrabold text-blue-500/20">0{i + 1}</span>
              <p className="font-display mt-2 text-lg font-bold">{s.title}</p>
              <p className="mt-1 text-sm text-navy-900/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Pricing() {
  const openEnquiry = useEnquiry();
  return (
    <motion.section {...reveal} className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
      <SectionHead
        eyebrow="Flexible plans"
        title="Pay the way that suits you"
        desc="Every software is offered on these plans. Prices depend on users, branches and modules — we share an exact quote on enquiry."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {PRICING_MODELS.map((m) => (
          <div
            key={m.title}
            className={`flex flex-col rounded-2xl p-5 ${
              m.highlight ? "bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-xl shadow-blue-500/25" : "border border-navy-900/5 bg-white shadow-sm"
            }`}
          >
            <p className={`text-[11px] font-semibold uppercase tracking-wider ${m.highlight ? "text-white/80" : "text-blue-500"}`}>{m.note}</p>
            <p className="font-display mt-2 font-bold">{m.title}</p>
            <p className={`mt-2 text-sm ${m.highlight ? "text-white/85" : "text-navy-900/60"}`}>{m.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl bg-white p-5 shadow-sm border border-navy-900/5">
        <CheckCircle2 className="text-teal-500" size={20} />
        <p className="flex-1 text-sm text-navy-900/70">
          No payment is taken on this website. Once the deal is final, we send a proper invoice.
        </p>
        <button type="button" onClick={() => openEnquiry()} className="rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500">
          Get a Quote
        </button>
      </div>
    </motion.section>
  );
}

function Reviews() {
  if (!REVIEWS.length) return null;
  return (
    <section className="bg-white">
      <motion.div {...reveal} className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <SectionHead eyebrow="Customer reviews" title="What our clients say" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.name + r.business} className="rounded-2xl bg-ice-50 p-6">
              <Quote className="text-blue-500/30" size={28} />
              <blockquote className="mt-3 text-sm leading-relaxed text-navy-900/80">{r.text}</blockquote>
              <figcaption className="mt-4">
                <p className="font-semibold">{r.name}</p>
                <p className="text-xs text-navy-900/50">
                  {r.business}
                  {r.product ? ` · ${r.product}` : ""}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function DemoSection() {
  return (
    <section id="demo" className="scroll-mt-32 bg-navy-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 py-16 lg:grid-cols-2 lg:items-center">
        <div className="text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">Request a demo</p>
          <h2 className="font-display mt-2 text-3xl sm:text-4xl font-bold">See it working on your business</h2>
          <p className="mt-3 max-w-md text-ice-200/70">
            Tell us which software you're interested in. We'll set up a live demo with your use case — online or in person.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-ice-200/80">
            {["Free, no-obligation demo", "Setup, training & support included", "Monthly, quarterly or yearly plans"].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <CheckCircle2 size={17} className="text-teal-400" /> {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 hover:bg-white/15">
              <Phone size={15} /> {COMPANY.phone}
            </a>
            <a href={whatsappLink("Hi, I want a demo of your software.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 hover:bg-white/15">
              <MessageCircle size={15} /> WhatsApp
            </a>
            <a href={`mailto:${COMPANY.email}`} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 hover:bg-white/15">
              <Mail size={15} /> Email
            </a>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-2xl">
          <EnquiryForm type="demo" />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <DemoVideos />
      <Row
        eyebrow="Handpicked"
        title="Featured Products"
        desc="Our most complete solutions, used by businesses every day."
        products={PRODUCTS.filter((p) => p.featured)}
        bg
      />
      <Row eyebrow="Most enquired" title="Best Selling Software" products={PRODUCTS.filter((p) => p.bestSeller)} />
      <Row eyebrow="Just launched" title="New Arrivals" products={PRODUCTS.filter((p) => p.newArrival)} bg />
      <Row eyebrow="Complete range" title="All Software Products" products={PRODUCTS} cols="mt-8 lg:grid-cols-4" />
      <HowItWorks />
      <Pricing />
      <Reviews />
      <DemoSection />
    </>
  );
}