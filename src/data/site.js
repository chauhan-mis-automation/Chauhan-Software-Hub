// Company details used across the website. Change them here only.
export const COMPANY = {
  brand: "Chauhan Software Hub", // website name
  name: "Chauhan MIS Automation Service", // company name
  short: "Chauhan MIS",
  tagline: "Business Software Solutions",
  phone: "+91 88601 45117",
  whatsapp: "918860145117", // country code + number, no "+" or spaces
  email: "Gaurav@chauhanmis.com",
  address: "Delhi NCR, India",
  website: "https://www.chauhanmis.com",
};

// Google Sheet that stores every enquiry / demo request.
// Paste the Apps Script "Web app URL" (ends with /exec) here — see google-apps-script/Code.gs.
// Sheet: https://docs.google.com/spreadsheets/d/1X7WEP1KT8ZdAiqIZNfYp4Q5t9mraeN8RvcC0_id957w/edit
export const SHEET_URL = "https://script.google.com/macros/s/AKfycbz5A25-oDfmuz3qp-_NsibDxMOSaFjC1cGnmTWnFwxVcDb4rICCXHXM44MQd7ahDUrC/exec";

// Saves form data to the Google Sheet and returns { ok, error }.
export async function saveToSheet(data) {
  if (!SHEET_URL) return { ok: false, error: "SHEET_URL is empty in src/data/site.js" };
  try {
    // text/plain avoids a CORS preflight; Apps Script returns a readable JSON reply.
    const res = await fetch(SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
    });
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return { ok: false, error: `Unexpected reply from Google (HTTP ${res.status}). Is "Who has access" set to Anyone?` };
    }
  } catch (err) {
    return {
      ok: false,
      error: `Could not reach Google Sheet (${err.message}). Check the deployment: Execute as Me, Who has access: Anyone.`,
    };
  }
}

// Opens WhatsApp chat with a pre-filled message.
export const whatsappLink = (text) =>
  `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`;

export const BUDGET_RANGES = [
  "Below ₹10,000",
  "₹10,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹2,00,000",
  "Above ₹2,00,000",
];

// Business model: there is no online payment. Plans are shown, prices are quoted on enquiry.
export const PRICING_MODELS = [
  {
    title: "Setup & Implementation",
    note: "One-time",
    desc: "Installation, configuration, data import and team training to get you live.",
  },
  {
    title: "Monthly Subscription",
    note: "Pay monthly",
    desc: "Start small and pay month by month. Upgrade or add users any time.",
  },
  {
    title: "Quarterly Subscription",
    note: "Every 3 months",
    desc: "Lower effective monthly cost with quarterly billing.",
  },
  {
    title: "Yearly Subscription",
    note: "Best value",
    desc: "Our most economical plan, with priority support through the year.",
    highlight: true,
  },
  {
    title: "Custom Pricing",
    note: "As per requirement",
    desc: "Custom modules, integrations or multi-branch rollouts priced to your scope.",
  },
];

export const STEPS = [
  { title: "Explore", desc: "Browse our software, screenshots and features." },
  { title: "Enquire", desc: "Send an enquiry or demo request — it reaches us on WhatsApp." },
  { title: "Live Demo", desc: "We show the software working on your own use case." },
  { title: "Go Live", desc: "Setup, training and support. Pay only after the deal is final." },
];

// Add REAL client reviews here (with their permission). The section stays hidden while this is empty.
// Example: { name: "Client name", business: "Business name, City", product: "Lead Management CRM", text: "What they said" }
export const REVIEWS = [];