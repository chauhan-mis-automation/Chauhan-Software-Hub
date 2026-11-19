import {
  BarChart3,
  Boxes,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

import whatsappDashboard from "../assets/products/whatsapp-crm-dashboard.jpeg";
import whatsappFlow from "../assets/products/whatsapp-automation-flow.jpeg";
import leadCrm from "../assets/products/lead-management-crm.jpeg";
import salesMarketing from "../assets/products/sales-marketing-dashboard.jpeg";
import orderManagement from "../assets/products/order-management-dashboard.jpeg";
import empPerformance from "../assets/products/emp-performance-dashboard.jpeg";
import misProductionReport from "../assets/products/mis-production-report.jpeg";
import salesMarketingKpi from "../assets/products/sales-marketing-kpi.jpeg";
import foodErpDashboard from "../assets/products/food-erp-dashboard.jpeg";
import foodErpBatch from "../assets/products/food-erp-batch.jpeg";
import o2dDashboard from "../assets/products/production-dispatch-dashboard.jpeg";
import o2dNewOrder from "../assets/products/production-dispatch-new-order.jpeg";
import o2dPpc from "../assets/products/production-dispatch-ppc.jpeg";
import ppcDashboard from "../assets/products/o2d-ppc-dashboard.jpeg";
import ppcCtb from "../assets/products/o2d-ppc-ctb.jpeg";
import ppcProduction from "../assets/products/o2d-ppc-production.jpeg";

export const CATEGORIES = [
  { id: "marketing", name: "WhatsApp Business API", icon: MessageCircle, color: "from-emerald-500 to-teal-500" },
  { id: "crm", name: "CRM & Sales", icon: TrendingUp, color: "from-blue-500 to-indigo-500" },
  { id: "erp", name: "ERP & Operations", icon: Boxes, color: "from-amber-500 to-orange-500" },
  { id: "mis", name: "MIS & Analytics", icon: BarChart3, color: "from-violet-500 to-fuchsia-500" },
];

/*
  HOW TO ADD / EDIT A PRODUCT
  - images: import screenshots at the top of this file and list them here (first one is the cover).
  - video:  a YouTube link ("https://youtu.be/xxxx") or a file in /public/videos ("/videos/demo.mp4").
            Leave "" if there is no video yet.
  - videoPoster: (optional, mp4 only) thumbnail image in /public/videos shown before the video plays.
  - partnerBadge: (optional) small badge shown on the card and product page, e.g. "Meta Tech Provider".
  - featured / bestSeller / newArrival: true/false — decides which home-page rows show the product.
*/
export const PRODUCTS = [
  {
    slug: "whatsapp-bulk-automation",
    name: "WhatsApp Bulk Automation",
    category: "marketing",
    tagline: "Bulk messaging, campaigns and automation.",
    partnerBadge: "Meta Tech Provider",
    images: [whatsappDashboard, whatsappFlow],
    video: "",
    featured: true,
    bestSeller: true,
    newArrival: false,
    overview:
      "As a Meta Tech Provider, we set you up on the official WhatsApp Business API. Send bulk WhatsApp campaigns, reply to customers from one shared inbox, and automate conversations with no-code chatbot flows — all with delivery, read and reply tracking.",
    features: [
      "Official WhatsApp Business API via Meta Tech Provider",
      "Bulk campaigns with approved templates",
      "No-code chatbot & auto-reply flows",
      "Shared team inbox for all chats",
      "Contacts, audience lists & segments",
      "Delivery, read and reply reports",
      "Interactive buttons, lists & WhatsApp Flows",
      "Assign chats to team members",
      "Account health & messaging-limit tracking",
    ],
    modules: ["Dashboard", "Inbox", "Contacts", "Audience", "Campaigns", "Templates", "Automation", "Flows"],
    idealFor: ["Retail & D2C brands", "Coaching institutes", "Real estate", "Service businesses"],
  },
  {
    slug: "lead-management-crm",
    name: "Lead Management CRM",
    category: "crm",
    tagline: "Lead tracking, follow-ups and team management.",
    images: [leadCrm],
    video: "/videos/lead-management-crm.mp4",
    videoPoster: "/videos/lead-management-crm.jpg",
    featured: true,
    bestSeller: true,
    newArrival: true,
    overview:
      "Capture every lead in one place, track it through your sales funnel, and never miss a follow-up. From new lead to won order — with quotations, orders, call calendar and team-wise reports.",
    features: [
      "Visual sales funnel from lead to order",
      "Follow-up reminders & overdue alerts",
      "Call calendar & meeting scheduling",
      "Quotations and order conversion",
      "Bulk lead upload from Excel",
      "Lead assignment to sales team",
      "Customers and products & services master",
      "Reports, reports hub & login activity",
    ],
    modules: ["Dashboard", "Leads", "Call Calendar", "Quotations", "Orders", "Customers", "Users", "Reports"],
    idealFor: ["Manufacturers & traders", "B2B sales teams", "Service companies", "Distributors"],
  },
  {
    slug: "sales-marketing-crm",
    name: "Sales & Marketing CRM",
    category: "crm",
    tagline: "Sales pipeline, campaigns and performance reports.",
    images: [salesMarketingKpi, salesMarketing],
    video: "/videos/crm-lead-automation.mp4",
    videoPoster: "/videos/crm-lead-automation.jpg",
    featured: false,
    bestSeller: true,
    newArrival: false,
    overview:
      "See your complete sales pipeline from visitors to closed deals, measure campaign performance, and track revenue growth with clear, live dashboards for management.",
    features: [
      "Sales pipeline from visitor to closed deal",
      "Campaign performance tracking",
      "Revenue growth analytics",
      "Salesperson-wise targets & achievement",
      "Source-wise lead analysis",
      "Daily, weekly & monthly reports",
    ],
    modules: ["Pipeline", "Campaigns", "Targets", "Revenue", "Reports"],
    idealFor: ["Sales-driven businesses", "Marketing teams", "Business owners & management"],
  },
  {
    slug: "business-erp",
    name: "Business ERP Software",
    category: "erp",
    tagline: "Food processing ERP — raw material QC to production, packing, repacking and dispatch.",
    images: [foodErpDashboard, foodErpBatch],
    video: "/videos/custom-erp.mp4",
    videoPoster: "/videos/custom-erp.jpg",
    featured: true,
    bestSeller: false,
    newArrival: false,
    overview:
      "An ERP built for the food industry, running live at a frozen and processed vegetables company. It follows every kilo from incoming raw material and quality check, through pre-processing, production, FG packing, repacking and branding, to cold storage and dispatch. Stock is tracked by cold storage and rack, every batch has its yield and cost, and the owner sees it all on one dashboard.",
    features: [
      "Incoming QC with approval and rejection %",
      "Raw material stock by cold storage & rack",
      "Pre-process batches (cleaning, cutting, blanching)",
      "Production with yield % tracking",
      "FG packing with QC approval",
      "Repacking & branding — mix batches, brand, pouch & carton",
      "IMS: bulk vs branded stock in Kg",
      "Dispatch with pending-dispatch alerts",
      "Packing material stock alerts",
      "Batch-wise costing: material, packing & worker cost",
      "Production flow & 30-day daily trend dashboard",
      "Reports and user management with roles",
    ],
    modules: [
      "Dashboard",
      "Incoming QC",
      "Raw Material",
      "Pre Process",
      "Production",
      "FG Packing",
      "Repacking & Branding",
      "IMS (Inventory)",
      "Dispatch",
      "Costing",
      "Reports",
      "User Management",
    ],
    idealFor: [
      "Frozen & processed vegetable units",
      "Food processing companies",
      "Spices, pulses & dry-food packers",
      "Cold storage based businesses",
    ],
  },
  {
    slug: "business-mis-dashboard",
    name: "Business MIS Dashboard",
    category: "mis",
    tagline: "Business analytics, reports and performance tracking.",
    images: [misProductionReport, orderManagement, empPerformance],
    video: "",
    featured: true,
    bestSeller: false,
    newArrival: false,
    overview:
      "Turn your daily data into clear MIS dashboards. Orders, sales, tasks and employee performance — live KPIs for owners and managers, without chasing Excel sheets.",
    features: [
      "Live KPI dashboards",
      "Employee performance & task tracking",
      "Missed-deadline and overdue alerts",
      "Order & sales analytics",
      "Leaderboards and team summaries",
      "Automated daily / weekly MIS reports",
    ],
    modules: ["KPI Dashboard", "Sales MIS", "Employee MIS", "Task Tracker", "Reports"],
    idealFor: ["Business owners", "Operations heads", "HR & admin teams"],
  },
  {
    slug: "production-dispatch-management",
    name: "Production & Dispatch Management",
    category: "erp",
    tagline: "Order-to-dispatch tracking for factories — from booking to delivery.",
    images: [o2dDashboard, o2dPpc, o2dNewOrder],
    video: "/videos/production-dispatch.mp4",
    videoPoster: "/videos/production-dispatch.jpg",
    featured: true,
    bestSeller: false,
    newArrival: true,
    overview:
      "Track every factory order from booking to dispatch. Each order moves through verification, indent, production planning, QC, picking, packing and dispatch — with live stage-wise counts, daily plan vs actual and MIS reports.",
    features: [
      "Order pipeline from verification to dispatch",
      "Indent & raw-material availability check",
      "Production planning (PPC) with daily plan vs actual",
      "Bottleneck, capacity & manpower alerts",
      "QC with rejection % and rework tracking",
      "Picking, packing & dispatch control",
      "Inventory, BOM & stock management",
      "Party-wise and dispatch MIS reports",
    ],
    modules: ["Dashboard", "Verification", "Indent", "PPC (Planning)", "Production", "QC", "Picking", "Packing", "Dispatch", "Reports (MIS)"],
    idealFor: ["Manufacturing units", "Plywood, board & building materials", "Make-to-order factories"],
  },
  {
    slug: "o2d-ppc-crm",
    name: "O2D PPC CRM",
    category: "erp",
    tagline: "Order-to-Delivery ERP with planning, production, QC and dispatch in one web app.",
    images: [ppcDashboard, ppcCtb, ppcProduction],
    video: "/videos/o2d-ppc-crm.mp4",
    videoPoster: "/videos/o2d-ppc-crm.jpg",
    featured: true,
    bestSeller: false,
    newArrival: true,
    overview:
      "A complete web-based Order-to-Delivery system for manufacturers. From sales enquiry and order booking to material planning, production, quality control, picking, packing, dispatch and billing — with a live operations command center showing every order's position.",
    features: [
      "Operations command center with live KPIs",
      "Order pipeline: order → PPC → production → QC → dispatch → delivered",
      "Sales CRM with leads, enquiries & daily report",
      "BOM, Clear-to-Build (CTB) & material availability",
      "Inventory, purchase, RFQs & open PO tracking",
      "Production work orders with plan vs actual",
      "Quality control with pass rate & rejections",
      "Warehouse, picking, packing, shipments & delivery",
      "Customer performance & on-time delivery %",
      "MIS analytics, invoices & credit notes",
    ],
    modules: [
      "Dashboard",
      "Sales CRM",
      "Orders",
      "Masters",
      "BOM",
      "CTB",
      "Inventory",
      "Purchase",
      "PPC",
      "Production",
      "Quality Control",
      "Warehouse & Dispatch",
      "MIS / Analytics",
      "Billing",
    ],
    idealFor: ["Manufacturing companies", "Furniture, plywood & panel makers", "Make-to-order factories", "Multi-department teams"],
  },
];

export const getCategory = (id) => CATEGORIES.find((c) => c.id === id);
export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);