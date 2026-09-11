export const site = {
  name: "IDCARD",
  tagline: "India's Fastest ID Card Printing & B2B Printing Ecosystem",
  phone: "+91 00000 00000",
  phoneHref: "tel:+910000000000",
  email: "hello@example.com",
  address: ["123 Sample Street,", "Business District,", "New Delhi, India 110001"],
  location: "India (Multiple Locations)",
  url: "https://example.com",
};

export const nav = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#ecosystem" },
  { label: "IDCARD Products", href: "#products" },
  { label: "Software", href: "#software" },
  { label: "Cities", href: "#story" },
  { label: "Blogs", href: "#faq" },
];

export const hero = {
  lines: [
    { text: "INDIA'S FASTEST", accent: false },
    { text: "ID CARD PRINTING", accent: true },
    { text: "& B2B ECOSYSTEM", accent: false },
  ],
  body:
    "IDCARD is a technology-driven B2B printing platform that simplifies bulk printing across India. From quality-checked raw materials and smart software to high-volume ID card printing, we help you manage printing at scale—transparently and efficiently.",
  primaryCta: "Get Started",
  secondaryCta: "Explore Solutions",
  caption: "Quality Control & Fulfilment Network",
};

export const trustMetrics = [
  { value: 500, suffix: "+", label: "Partners" },
  { value: 50, suffix: "+", label: "Cities" },
  { value: 99, suffix: "%", label: "On-time" },
];

export const partnerLogos = Array.from({ length: 12 }, (_, i) => ({
  id: `partner-${String(i + 1).padStart(2, "0")}`,
  src: `/assets/logos/partner-${String(i + 1).padStart(2, "0")}.svg`,
  alt: `Partner institution ${i + 1}`,
}));

export const ecosystem = {
  label: "One Stop Solution",
  title: ["One Stop Solution for the", "Entire Printing Ecosystem"],
  sub: "Complete infrastructure covering every aspect of bulk printing operations",
  pillars: [
    {
      id: "materials",
      index: "01",
      eyebrow: "Material",
      title: "Raw Material Supply",
      body:
        "Access quality-checked printing raw materials at transparent prices, delivered directly from IDCARD warehouses across India. We eliminate dependency on local suppliers by offering consistent quality, predictable pricing, and reliable logistics.",
      points: [
        "Quality-checked PVC sheets & consumables",
        "Transparent, centralized pricing",
        "Multiple warehouse locations across India",
        "Fast & reliable delivery timelines",
      ],
      asset: "/assets/raw-materials.webp",
      assetAlt: "PVC sheets, clips and lanyard rolls stacked in an IDCARD warehouse",
      tone: "ivory",
    },
    {
      id: "software",
      index: "02",
      eyebrow: "Data",
      badge: "Core platform",
      title: "Software & Technology Platform",
      body:
        "Our in-house software and mobile tools power every stage of the printing workflow— from order intake and data validation to production tracking and dispatch. IDCARD technology reduces errors, saves time, and gives complete operational visibility.",
      points: [
        "Order & plant management system",
        "Mobile app for partners & vendors",
        "Real-time order tracking & status updates",
        "Automated workflows & reporting",
      ],
      asset: "/assets/software-platform.webp",
      assetAlt: "IDCARD order management dashboard and partner mobile app",
      tone: "charcoal",
    },
    {
      id: "fulfilment",
      index: "03",
      eyebrow: "Production · Quality · Delivery",
      title: "Finished Goods & Fulfilment",
      body:
        "Leverage IDCARD's nationwide production and fulfilment network to deliver high-volume printing orders with speed and consistency. Every order undergoes rigorous quality checks before being delivered to the customer.",
      points: [
        "Pan-India production partner network",
        "Standardized quality assurance process",
        "On-time delivery commitment",
        "Order-level tracking & accountability",
      ],
      asset: "/assets/printing-production.webp",
      assetAlt: "ID card printers and packed dispatch cartons on a production floor",
      tone: "purple",
    },
  ],
  flow: ["Material", "Data", "Production", "Quality", "Delivery"],
};

export const products = {
  label: "IDCARD Products",
  title: ["Unlimited Printing Options.", "One Trusted Platform."],
  sub: "From business essentials to custom marketing materials, access India's largest printing catalogue with guaranteed quality and fast turnaround.",
  items: [
    { id: "holders", name: "ID Card Holders", spec: "Clear · Rigid · Flexible", asset: "/assets/products/id-card-holders.webp" },
    { id: "sheets", name: "ID Card Sheets", spec: "PVC · Inkjet · Laser", asset: "/assets/products/id-card-sheets.webp" },
    { id: "lanyards", name: "Lanyards", spec: "Satin · Tube · Multicolour", asset: "/assets/products/lanyards.webp" },
    { id: "smart", name: "Smart Cards", spec: "Chip · Contactless", asset: "/assets/products/smart-cards.webp" },
    { id: "accessories", name: "ID Card Accessories", spec: "Hooks · Seals · Rings", asset: "/assets/products/id-card-accessories.webp" },
    { id: "metal", name: "Metal & Plastic", spec: "Keychains · Badges", asset: "/assets/products/metal-plastic.webp" },
    { id: "pvc", name: "PVC & NTR Sheets", spec: "0.76mm · A4 · A3", asset: "/assets/products/pvc-ntr-sheets.webp" },
    { id: "custom", name: "Custom Printed", spec: "Bulk · Branded", asset: "/assets/products/custom-printed.webp" },
    { id: "rfid", name: "RFID / NFC", spec: "125kHz · 13.56MHz", asset: "/assets/products/rfid-nfc.webp" },
    { id: "clips", name: "Clips & Reels", spec: "Yo-yo · Bulldog · Strap", asset: "/assets/products/clips-reels.webp" },
  ],
};

export const partnershipPaths = {
  label: "Partnership Paths",
  title: ["How Can We", "Help You?"],
  sub: "Choose the path that fits your role in the printing ecosystem and access India's most reliable infrastructure.",
  paths: [
    {
      id: "vendor",
      nav: "Vendor / Entrepreneur",
      title: "Are You a Vendor or Entrepreneur?",
      body:
        "Whether you're starting a new printing business or scaling an existing one, IDCARD provides the supply chain, technology, and operational support needed to grow confidently.",
      points: [
        "Nationwide backend printing & fulfilment",
        "Raw materials at factory-direct prices",
        "Software to manage orders & operations",
        "Marketing and onboarding support",
      ],
      cta: "Start Your Business",
      asset: "/assets/partner-workspace.webp",
      assetAlt: "Printing partner reviewing orders in a small print shop",
    },
    {
      id: "materials",
      nav: "Raw Material Supply",
      badge: "Most recommended",
      title: "Looking for Raw Material Supply?",
      body:
        "Source quality-checked printing raw materials from a centralized, transparent system. IDCARD eliminates dependency on unverified local suppliers with predictable pricing.",
      points: [
        "Quality-checked PVC sheets & consumables",
        "Transparent pricing, no hidden margins",
        "Multiple warehouse locations pan-India",
        "Fast dispatch and delivery assurance",
      ],
      cta: "Get Raw Materials",
      asset: "/assets/warehouse.webp",
      assetAlt: "Warehouse racks stacked with PVC sheets and consumables",
    },
    {
      id: "production",
      nav: "Production Partner",
      title: "Need a Production Partner?",
      body:
        "Join IDCARD's nationwide production network and receive consistent, high-volume orders with standardized workflows and clear quality benchmarks.",
      points: [
        "Steady inflow of bulk printing orders",
        "Standardized production & QC processes",
        "Centralized coordination & tracking",
        "Long-term partnership opportunities",
      ],
      cta: "Partner with Us",
      asset: "/assets/production-floor.webp",
      assetAlt: "Industrial card printing production floor",
    },
  ],
};

export const story = {
  label: "Manufacturing Story",
  steps: [
    { index: "01", title: "Source", body: "Quality-checked raw materials.", asset: "/assets/story-source.webp", alt: "Hands inspecting a stack of PVC sheets" },
    { index: "02", title: "Print", body: "High-volume production.", asset: "/assets/story-print.webp", alt: "ID cards moving through a card printer" },
    { index: "03", title: "Verify", body: "Standardized quality control.", asset: "/assets/story-verify.webp", alt: "Operator checking printed cards against a QC sheet" },
    { index: "04", title: "Deliver", body: "Nationwide fulfilment.", asset: "/assets/story-deliver.webp", alt: "Packed cartons of ID cards ready for dispatch" },
  ],
};

export const industries = {
  label: "Solutions by Industry",
  title: ["Specialized Workflows for", "Every Sector"],
  sub: "From educational campuses to high-stakes corporate events, we provide industry-specific printing ecosystems designed for India at scale.",
  tabs: [
    {
      id: "education",
      name: "Educational",
      kicker: "Schools & Coachings",
      title: "ID Card Solutions for Educational Institutions",
      body:
        "IDCARD specializes in bulk ID card printing for schools, colleges, universities, and coaching institutes with technology-driven production, standardized quality, and fast delivery across India.",
      stats: [
        { value: "500+", label: "Schools & Colleges" },
        { value: "1M+", label: "ID Cards Printed" },
      ],
      services: [
        { name: "Student ID Cards", desc: "PVC, smart & RFID cards with secure data handling." },
        { name: "Staff ID Cards", desc: "Employee ID cards with access control features." },
        { name: "Visitor ID Cards", desc: "Temporary visitor passes for security management." },
        { name: "Custom Lanyards", desc: "Branded lanyards with school logo and colors." },
        { name: "ID Keychains", desc: "Durable school-branded metal/acrylic keychains." },
        { name: "Bulk Sets", desc: "Complete ID sets (Card + Lanyard + Keychain)." },
      ],
      provide: ["PVC & Smart ID Cards", "Branded Lanyards", "Metal & Acrylic Keychains", "Complete Bulk Sets"],
      advantages: [
        "Automated ID card printing from student database",
        "Bulk pricing for 100 to 10,000+ ID cards",
        "Fast turnaround: 5-7 days for bulk orders",
        "Multi-campus support with centralized ordering",
      ],
      cta: "Order for Your Institution",
      asset: "/assets/school-id-cards.webp",
      assetAlt: "Students wearing lanyard ID cards on a school campus",
    },
    {
      id: "events",
      name: "Event Management",
      kicker: "Conferences & Expos",
      title: "Badge & Pass Printing for Events",
      body:
        "High-volume event badges, delegate passes and branded lanyards produced through the same standardized IDCARD workflow—fast turnaround with order-level tracking.",
      stats: [
        { value: "24Hrs", label: "Dispatch" },
        { value: "50+", label: "Cities" },
      ],
      services: [
        { name: "Event ID Cards", desc: "Delegate, speaker and crew passes." },
        { name: "Visitor ID Cards", desc: "Temporary passes for expo access." },
        { name: "Custom Lanyards", desc: "Branded lanyards in event colours." },
        { name: "ID Card Holders", desc: "Clear and rigid holders for badges." },
        { name: "Clips & Reels", desc: "Retractable reels and clips." },
        { name: "Bulk Sets", desc: "Card + lanyard + holder kits." },
      ],
      provide: ["Event ID Cards", "Branded Lanyards", "Holders & Reels", "Complete Kits"],
      advantages: [
        "24 hour dispatch on ready artwork",
        "Centralized coordination & tracking",
        "Standardized quality assurance process",
        "Pan-India delivery",
      ],
      cta: "Plan Your Event Passes",
      asset: "/assets/event-badges.webp",
      assetAlt: "Conference delegates wearing printed badges on lanyards",
    },
    {
      id: "corporate",
      name: "Corporate Sector",
      kicker: "Enterprises & Org.",
      title: "Employee ID & Access Cards for Enterprises",
      body:
        "Employee ID cards, visitor passes and smart access cards for offices and organisations, backed by secure data handling and multi-location ordering.",
      stats: [
        { value: "100K+", label: "Happy Customers" },
        { value: "99%", label: "On-time" },
      ],
      services: [
        { name: "Employee ID Cards", desc: "PVC and smart cards with access control features." },
        { name: "Visitor ID Cards", desc: "Temporary visitor passes for security management." },
        { name: "Smart Cards", desc: "RFID / NFC cards for access systems." },
        { name: "Custom Lanyards", desc: "Branded lanyards with company logo." },
        { name: "ID Card Holders", desc: "Rigid and flexible holders." },
        { name: "Bulk Sets", desc: "Complete onboarding kits." },
      ],
      provide: ["PVC & Smart ID Cards", "RFID / NFC Cards", "Branded Lanyards", "Complete Bulk Sets"],
      advantages: [
        "Secure data handling",
        "Multi-location support with centralized ordering",
        "Order-level tracking & accountability",
        "On-time delivery commitment",
      ],
      cta: "Order for Your Organisation",
      asset: "/assets/corporate-id-cards.webp",
      assetAlt: "Corporate employees wearing ID cards in an office lobby",
    },
  ],
};

export const idCardFeatures = [
  { id: "rfid", label: "RFID", title: "RFID layer", body: "125kHz / 13.56MHz antenna and chip laminated inside the card body for access control and attendance.", pos: { x: -1, y: -0.6 } },
  { id: "security", label: "Security", title: "Secure data handling", body: "Data validated in the IDCARD platform before print; each card tracked at order level.", pos: { x: 1, y: -0.7 } },
  { id: "design", label: "Custom Design", title: "Card artwork", body: "Choose from 250+ design templates or supply institution branding. Edge-to-edge print.", pos: { x: -1.15, y: 0.15 } },
  { id: "pvc", label: "PVC", title: "0.76mm PVC", body: "Quality-checked PVC sheets, laminated to a standard 0.76mm card thickness.", pos: { x: 1.15, y: 0.1 } },
  { id: "nfc", label: "NFC", title: "NFC option", body: "Tap-enabled smart cards for contactless identification and access.", pos: { x: -0.85, y: 0.85 } },
  { id: "lanyard", label: "Lanyard", title: "Lanyard & hook", body: "Concentric, satin, tube or border lanyards with dog, fish, England or wire hooks.", pos: { x: 0.9, y: 0.9 } },
];

export const proofStats = [
  { value: "24Hrs", label: "Dispatch", kicker: "24 hour dispatch" },
  { value: "100K+", label: "Happy customers", kicker: "Across India" },
  { value: "250+", label: "Design templates", kicker: "Ready to print" },
];

export const faqs = [
  {
    q: "What makes IDCARD different from other printing companies?",
    a: "IDCARD is not a single print shop. It is a B2B ecosystem connecting quality-checked raw materials, in-house order and plant software, a pan-India production partner network and a standardized quality-control and fulfilment process—so bulk printing can be managed transparently at scale.",
  },
  {
    q: "Are there any eco-friendly printing options available?",
    a: "Yes. Ask our team about eco-friendly card and lanyard options when you submit your inquiry; we will recommend suitable materials for your order volume.",
  },
  {
    q: "Can I order samples before placing a larger order?",
    a: "Yes. Samples can be arranged before a bulk order so you can verify material, print quality and finish. Share your requirement through the contact form and our team will coordinate.",
  },
  {
    q: "What payment methods does IDCARD accept?",
    a: "We support standard business payment methods including bank transfer and UPI. Payment terms for partners and bulk orders are confirmed at onboarding.",
  },
  {
    q: "What if I have specific design requirements or need assistance with my order?",
    a: "Our team assists with artwork, data formatting and product selection. Describe your requirement in the inquiry form or call +91 00000 00000 and we will help you set up the order.",
  },
];

export const cta = {
  title: ["Ready to Transform", "Your Printing Business?"],
  body: "Join India's fastest-growing B2B printing network. Access high-quality raw materials, smart software tools, and a reliable fulfilment ecosystem.",
  primary: "Become a Partner",
  secondary: "Schedule a Demo",
  chips: ["Flexible onboarding", "No upfront costs", "Pan-India Support"],
};

export const contact = {
  label: "Contact Us",
  title: ["Let's Discuss", "Your Printing", "Requirements"],
  body: "Whether you're a school, a corporate office, or a printing vendor, our team is ready to help you optimize your bulk printing operations.",
  productOptions: [
    "ID Cards",
    "ID Card Holders",
    "ID Card Sheets",
    "Lanyards",
    "Smart Cards",
    "RFID / NFC Cards",
    "ID Card Accessories",
    "ID Card Machines",
    "Printing Software",
  ],
};

export const footer = {
  blurb: "We offer swift 3-day delivery and shipping across India, ensuring customer satisfaction",
  columns: [
    {
      title: "Services",
      links: ["ID Cards", "ID Card Holders", "ID Card Accessories", "ID Card Machines", "ID Card Sheets", "Lanyards", "Smart Cards"],
    },
    {
      title: "ID-Card",
      links: [
        "Student ID Cards",
        "School ID Cards",
        "College ID Cards",
        "University ID Cards",
        "Teacher ID Cards",
        "Employee ID Cards",
        "Visitor ID Cards",
        "Event ID Cards",
        "PVC ID Cards",
        "Plastic ID Cards",
      ],
    },
    {
      title: "Accessories",
      links: ["Dog Hook", "Fish Hook", "England Hook", "Wire Hook", "Seals", "Split Ring", "Clips", "Metal Cap"],
    },
    {
      title: "Lanyard",
      links: ["Concentric Lanyard", "Multicolor Lanyard", "White Satin Roll", "Colour Satin Roll", "Tube Roll Lanyard", "Border Lanyard"],
    },
  ],
  legal: [
    { label: "Sitemap", href: "/sitemap.xml" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms and Conditions", href: "#" },
  ],
  copyright: "© 2026 IDCARD - ID Card & Lanyard Printing Services. All rights reserved.",
};
