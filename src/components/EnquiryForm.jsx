import { useState } from "react";
import { CheckCircle2, Loader2, MessageCircle, MonitorPlay, Send } from "lucide-react";
import { PRODUCTS, getProduct } from "../data/products";
import { BUDGET_RANGES, saveToSheet, whatsappLink } from "../data/site";

const field =
  "mt-1.5 w-full rounded-xl border border-navy-900/10 bg-ice-50 px-3.5 py-2.5 text-sm text-navy-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";
const label = "text-xs font-semibold text-navy-900/70";

/*
  On submit: the details are saved to the Google Sheet (see SHEET_URL in data/site.js).
  After that the client can also send the same details on WhatsApp (optional button).
*/
export default function EnquiryForm({ type = "enquiry", product = "", onDone, compact = false }) {
  const isDemo = type === "demo";
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    business: "",
    software: getProduct(product)?.name || "",
    budget: "",
    time: "",
    requirements: "",
    trap: "", // honeypot: hidden from people, bots fill it
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [sent, setSent] = useState(null); // { waText }

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (saving) return;
    const mobile = form.mobile.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    const lines = [
      isDemo ? "*New Demo Request* — Chauhan Software Hub" : "*New Enquiry* — Chauhan Software Hub",
      "",
      `Name: ${form.name}`,
      `Mobile: ${mobile}`,
      `Business: ${form.business}`,
      `Interested Software: ${form.software || "Not sure yet"}`,
      `Budget: ${form.budget || "-"}`,
      isDemo && form.time ? `Preferred demo time: ${form.time}` : null,
      `Requirements: ${form.requirements || "-"}`,
    ].filter((l) => l !== null);
    const waText = lines.join("\n");

    setSaving(true);
    const result = await saveToSheet({
      type: isDemo ? "Demo Request" : "Enquiry",
      name: form.name.trim(),
      mobile,
      business: form.business.trim(),
      software: form.software || "Not sure yet",
      budget: form.budget,
      time: isDemo ? form.time.trim() : "",
      requirements: form.requirements.trim(),
      page: window.location.href,
      website: form.trap,
    });
    setSaving(false);

    if (result && result.ok) {
      setSent({ waText });
    } else {
      console.error("[Enquiry] Google Sheet save failed:", result && result.error);
      setError(
        <>
          Sorry, we couldn't submit your request right now. Please{" "}
          <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" className="underline font-semibold">
            send it on WhatsApp
          </a>{" "}
          instead.
          <span className="mt-1 block text-[11px] font-normal text-rose-500/80">{result && result.error}</span>
        </>
      );
    }
  };

  if (sent) {
    return (
      <div className="py-6 text-center">
        <CheckCircle2 className="mx-auto text-teal-500" size={48} />
        <h3 className="font-display mt-4 text-xl font-bold">Thank you, {form.name.split(" ")[0]}!</h3>
        <p className="mt-2 text-sm text-navy-900/60">
          Your {isDemo ? "demo request" : "enquiry"} has been received. Our team will contact you shortly on{" "}
          <b>{form.mobile}</b>.
        </p>
        <a
          href={whatsappLink(sent.waText)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-wa px-5 py-2.5 text-sm font-semibold text-white hover:brightness-95"
        >
          <MessageCircle size={16} /> Want a faster reply? Message us on WhatsApp
        </a>
        <div className="mt-3 flex justify-center gap-3">
          {onDone && (
            <button type="button" onClick={onDone} className="rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white">
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      {!compact && (
        <div className="pr-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-semibold text-blue-500">
            {isDemo ? <MonitorPlay size={13} /> : <Send size={13} />}
            {isDemo ? "Free live demo" : "Get pricing & details"}
          </span>
          <h3 className="font-display mt-3 text-2xl font-bold">{isDemo ? "Request a Demo" : "Send an Enquiry"}</h3>
          <p className="mt-1 text-sm text-navy-900/60">
            No payment online. Share your requirement and we'll send a quote{isDemo ? " and schedule your demo" : ""}.
          </p>
        </div>
      )}

      <div className={`${compact ? "" : "mt-6"} grid gap-4 sm:grid-cols-2`}>
        <label className="block">
          <span className={label}>Your Name *</span>
          <input required className={field} value={form.name} onChange={update("name")} placeholder="Full name" autoComplete="name" />
        </label>
        <label className="block">
          <span className={label}>Mobile Number *</span>
          <input
            required
            type="tel"
            inputMode="numeric"
            className={field}
            value={form.mobile}
            onChange={update("mobile")}
            placeholder="10-digit mobile"
            autoComplete="tel"
          />
        </label>
        <label className="block">
          <span className={label}>Business Name *</span>
          <input required className={field} value={form.business} onChange={update("business")} placeholder="Company / shop / school" autoComplete="organization" />
        </label>
        <label className="block">
          <span className={label}>Interested Software *</span>
          <select required className={field} value={form.software} onChange={update("software")}>
            <option value="">Select software</option>
            {PRODUCTS.map((p) => (
              <option key={p.slug}>{p.name}</option>
            ))}
            <option>Custom Software</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label className={`block ${isDemo ? "" : "sm:col-span-2"}`}>
          <span className={label}>Your Budget</span>
          <select className={field} value={form.budget} onChange={update("budget")}>
            <option value="">Select</option>
            {BUDGET_RANGES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
        {isDemo && (
          <label className="block">
            <span className={label}>Preferred Demo Time</span>
            <input className={field} value={form.time} onChange={update("time")} placeholder="e.g. Tomorrow 4 pm" />
          </label>
        )}
        <label className="block sm:col-span-2">
          <span className={label}>Requirements</span>
          <textarea
            rows={3}
            className={`${field} resize-none`}
            value={form.requirements}
            onChange={update("requirements")}
            placeholder="Tell us briefly what you need"
          />
        </label>
      </div>

      <input
        type="text"
        name="hp_check"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={form.trap}
        onChange={update("trap")}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {error && <p className="mt-3 text-sm font-medium text-rose-600">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:brightness-110 disabled:opacity-70"
      >
        {saving ? <Loader2 size={18} className="animate-spin" /> : isDemo ? <MonitorPlay size={18} /> : <Send size={18} />}
        {saving ? "Submitting…" : isDemo ? "Request Demo" : "Send Enquiry"}
      </button>
      <p className="mt-2 text-center text-[11px] text-navy-900/50">No payment required. We'll call you back with details.</p>
    </form>
  );
}