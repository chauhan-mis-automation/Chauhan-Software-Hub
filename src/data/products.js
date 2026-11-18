import {
  BarChart3,
  Boxes,
  CalendarCheck,
  GraduationCap,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

import whatsappDashboard from "../assets/products/whatsapp-crm-dashboard.jpeg";
import whatsappFlow from "../assets/products/whatsapp-automation-flow.jpeg";
import leadCrm from "../assets/products/lead-management-crm.jpeg";
import salesMarketing from "../assets/products/sales-marketing-dashboard.jpeg";
import orderManagement from "../assets/products/order-management-dashboard.jpeg";
import paymentProcess from "../assets/products/payment-process.jpeg";
import empPerformance from "../assets/products/emp-performance-dashboard.jpeg";
import transport from "../assets/products/transport-management-dashboard.jpeg";
import booking from "../assets/products/booking-process.jpeg";
import o2dDashboard from "../assets/products/production-dispatch-dashboard.jpeg";
import o2dNewOrder from "../assets/products/production-dispatch-new-order.jpeg";
import o2dPpc from "../assets/products/production-dispatch-ppc.jpeg";

export const CATEGORIES = [
  { id: "marketing", name: "Marketing Automation", icon: MessageCircle, color: "from-emerald-500 to-teal-500" },
  { id: "crm", name: "CRM & Sales", icon: TrendingUp, color: "from-blue-500 to-indigo-500" },
  { id: "erp", name: "ERP & Operations", icon: Boxes, color: "from-amber-500 to-orange-500" },
  { id: "mis", name: "MIS & Analytics", icon: BarChart3, color: "from-violet-500 to-fuchsia-500" },
  { id: "education", name: "Education", icon: GraduationCap, color: "from-sky-500 to-cyan-500" },
  { id: "booking", name: "Booking Systems", icon: CalendarCheck, color: "from-rose-500 to-pink-500" },
];

/*
  HOW TO ADD / EDIT A PRODUCT
  - images: import screenshots at the top of this file and list them here (first one is the cover).
  - video:  a YouTube link ("https://youtu.be/xxxx") or a file in /public/videos ("/videos/demo.mp4").
            Leave "" if there is no video yet.
  - videoPoster: (optional, mp4 only) thumbnail image in /public/videos shown before the video plays.
  - featured / bestSeller / newArrival: true/false — decides which home-page rows show the product.
*/
export const PRODUCTS = [
  {
    slug: "whatsapp-bulk-automation",
    name: "WhatsApp Bulk Automation",
    category: "marketing",
    tagline: "Bulk messaging, campaigns and automation.",
    images: [whatsappDashboard, whatsappFlow],
    video: "",
    featured: true,
    bestSeller: true,
    newArrival: false,
    overview:
      "Send bulk WhatsApp campaigns on the official WhatsApp Business API, reply to customers from one shared inbox, and automate conversations with no-code chatbot flows — all with delivery, read and reply tracking.",
    features: [
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
    images: [salesMarketing],
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
    tagline: "Inventory, billing, accounts and operations.",
    images: [paymentProcess, orderManagement],
    video: "/videos/custom-erp.mp4",
    videoPoster: "/videos/custom-erp.jpg",
    featured: true,
    bestSeller: false,
    newArrival: false,
    overview:
      "Run day-to-day operations from one system — orders, inventory, billing and accounts — with real-time stock levels and an order-to-payment flow your whole team can follow.",
    features: [
      "Order entry to delivery tracking",
      "Inventory & stock alerts",
      "Billing & invoices",
      "Accounts & payment tracking",
      "Purchase and dispatch management",
      "Top-selling products & sales analytics",
    ],
    modules: ["Orders", "Inventory", "Billing", "Accounts", "Purchase", "Dispatch", "Reports"],
    idealFor: ["Manufacturing units", "Wholesalers & retailers", "Trading companies"],
  },
  {
    slug: "business-mis-dashboard",
    name: "Business MIS Dashboard",
    category: "mis",
    tagline: "Business analytics, reports and performance tracking.",
    images: [orderManagement, empPerformance],
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
    slug: "school-erp",
    name: "School ERP",
    category: "education",
    tagline: "Student, fee, attendance and school management.",
    images: [],
    video: "",
    featured: false,
    bestSeller: false,
    newArrival: true,
    overview:
      "Manage your school from one place — admissions, student records, fee collection, attendance and parent communication — with clear reports for the management.",
    features: [
      "Admissions & student records",
      "Fee collection, dues & receipts",
      "Student and staff attendance",
      "Classes, sections & timetable",
      "Exams and report cards",
      "Parent communication on WhatsApp",
    ],
    modules: ["Admissions", "Students", "Fees", "Attendance", "Exams", "Staff", "Reports"],
    idealFor: ["Schools", "Coaching institutes", "Academies"],
  },
  {
    slug: "logistics-transport-management",
    name: "Logistics & Transport Management",
    category: "erp",
    tagline: "Enquiry, quote, booking and live shipment tracking.",
    images: [transport],
    video: "",
    featured: false,
    bestSeller: false,
    newArrival: true,
    overview:
      "Handle the full shipment journey in one flow — enquiry, quotation, booking and live delivery status — with carrier-wise and mode-wise analysis.",
    features: [
      "Enquiry → quote → booking flow",
      "Live shipment status tracking",
      "Road, air and sea freight modes",
      "Carrier-wise performance",
      "Activity feed & logistics overview",
      "Payments & reports",
    ],
    modules: ["Enquiries", "Quotes", "Shipments", "Tracking", "Payments", "Reports"],
    idealFor: ["Transporters", "Freight forwarders", "Logistics companies"],
  },
  {
    slug: "event-booking-system",
    name: "Event Booking System",
    category: "booking",
    tagline: "Ticket selection, details, review and confirmation.",
    images: [booking],
    video: "",
    featured: false,
    bestSeller: false,
    newArrival: true,
    overview:
      "A guided 4-step booking flow — select tickets, enter details, review and confirm — with instant confirmation for your customers and a clean admin view of all bookings.",
    features: [
      "4-step guided booking flow",
      "Multiple ticket types & quantities",
      "Customer details capture",
      "Booking review & instant confirmation",
      "Events, bookings & user management",
      "Booking reports",
    ],
    modules: ["Events", "Bookings", "Users", "Reports"],
    idealFor: ["Event organisers", "Workshops & seminars", "Venues"],
  },
];

export const getCategory = (id) => CATEGORIES.find((c) => c.id === id);
export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);
