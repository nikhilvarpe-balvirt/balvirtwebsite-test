// Company-wide content beyond NetSuite: wider services and Balvirt's own products.
// NOTE: product copy below is draft wording based on the brief — please review for accuracy.

export const TAGLINE = 'AI, software and ERP solutions that grow your business'

/** Services beyond NetSuite. `visual` is the illustration shown when there is no image. */
export const TECH_SERVICES = [
  {
    id: 'ai-integration', icon: 'Bot', title: 'AI Integrations',
    image: '/images/services-new/ai-integration.svg',
    short: 'Add AI to the tools your team already uses.',
    desc: 'We connect practical AI to your existing systems, so your team saves time and decisions get faster, without replacing the software you rely on.',
    points: [
      ['AI assistants and chatbots', 'Answer customer and staff questions around the clock'],
      ['Document and data extraction', 'Turn emails, PDFs and forms into structured records'],
      ['Predictive insights', 'Forecast demand, risk and performance from your own data'],
      ['AI inside your ERP and apps', 'Connect AI to NetSuite and other business systems'],
    ],
  },
  {
    id: 'automation', icon: 'Workflow', title: 'Automated Workflows',
    short: 'Remove repetitive work with reliable automation.',
    desc: 'We map the manual steps that slow your business down and replace them with automated workflows that are fast, traceable and easy to change.',
    points: [
      ['Approvals and notifications', 'Route requests to the right people automatically'],
      ['System-to-system sync', 'Keep data consistent across your tools'],
      ['Scheduled reports', 'Deliver the numbers to the right inbox on time'],
      ['Process monitoring', 'See bottlenecks and errors before they grow'],
    ],
    image: '/images/services-new/automation.svg',
  },
  {
    id: 'apps', icon: 'Smartphone', title: 'App Development',
    short: 'Android, iOS and web apps your users will love.',
    desc: 'We design and build fast, polished mobile and web apps, from the first idea and UI design to store launch and long-term maintenance.',
    points: [
      ['Android, iOS and cross-platform apps', 'One idea, delivered on the devices your users have'],
      ['Web apps and portals', 'Responsive apps that work in any browser'],
      ['UI/UX design', 'Clean, intuitive interfaces tested with real users'],
      ['Backend and API development', 'Secure, scalable foundations behind every app'],
      ['Launch and ongoing support', 'App store release, updates and maintenance'],
    ],
    image: '/images/services-new/apps.svg',
  },
  {
    id: 'websites', icon: 'Globe', title: 'Custom Websites',
    short: 'Fast, SEO-friendly websites and portals built for results.',
    desc: 'From company websites to customer portals and online stores, we design and build responsive, high-performance sites that look sharp and rank well.',
    points: [
      ['Business websites and portals', 'Clear, modern design aligned to your brand'],
      ['E-commerce', 'Product catalogs, payments and order management'],
      ['SEO-ready build', 'Fast loading, clean structure and search-friendly content'],
      ['Integrations', 'Connect to your ERP, CRM and marketing tools'],
    ],
    image: '/images/web.png',
  },
  {
    id: 'software', icon: 'Code2', title: 'Custom Software & AI Models',
    short: 'Web, mobile and enterprise software built around your needs.',
    desc: 'When off-the-shelf tools do not fit, we design and build software and AI models tailored to your process, from first prototype to production.',
    points: [
      ['Custom business software', 'Internal tools, portals and enterprise systems'],
      ['Custom AI and ML models', 'Trained and tuned for your data and goals'],
      ['APIs and integrations', 'Connect new software to what you already run'],
      ['Modernization', 'Move legacy systems to modern cloud platforms'],
    ],
    image: '/images/services-new/software.svg',
  },
  {
    id: 'consulting', icon: 'Compass', title: 'Technology Consulting',
    image: '/images/services-new/consulting.svg',
    short: 'Clear technology decisions from people who build.',
    desc: 'Our consultants help you choose the right tools, plan your roadmap and avoid costly mistakes, with advice grounded in real delivery experience.',
    points: [
      ['Technology and ERP selection', 'Pick the platform that fits your business'],
      ['Digital roadmap', 'A practical, phased plan with clear priorities'],
      ['Architecture and process review', 'Find gaps, risks and quick wins'],
      ['Delivery oversight', 'Keep projects on time and on budget'],
    ],
  },
  {
    id: 'advisory', icon: 'Lightbulb', title: 'Business Advisory',
    image: '/images/services-new/advisory.svg',
    short: 'Practical advice to run and scale your business.',
    desc: 'Beyond technology, we work with owners and leadership teams on operations, reporting and growth, and stay on for ongoing advisory support.',
    points: [
      ['Operations and process improvement', 'Simplify how work gets done'],
      ['KPIs and reporting', 'Measure what matters, in one view'],
      ['Growth and scaling support', 'Prepare systems and teams for the next stage'],
      ['Ongoing advisory support', 'Regular guidance as your business changes'],
    ],
  },
]

/** Balvirt-owned software products. `image` is the large preview, `imageSm` the card thumbnail. */
export const PRODUCTS = [
  {
    id: 'balsuite', name: 'Balsuite', icon: 'Users', category: 'Business management platform',
    tagline: 'One platform for every team, every task.',
    desc: 'Balsuite is a complete, customizable business management platform. It brings employees, tasks, timesheets, shifts, leave, projects, sprints, assets, IT support, expenses and a client support portal into one place, and connects with tools like Jira and Teamwork, so your whole company runs from a single workspace.',
    features: [
      ['Employee, task and project management', 'Plan work, assign tasks and track project progress'],
      ['Timesheets, shifts and leave', 'Track hours and schedules with clear approvals'],
      ['Sprints', 'Agile sprint planning with velocity tracking'],
      ['Asset management and IT support', 'Track company assets and handle IT support requests'],
      ['External client support portal', 'Give clients one place to raise and follow requests'],
      ['Integrations', 'Connects with tools such as Jira and Teamwork'],
      ['Expenses, announcements and checklists', 'Everyday operations handled in the same workspace'],
      ['Fully customizable', 'Adapt roles and workflows to your company'],
    ],
    audience: 'Companies of any size that want one customizable platform to run people, projects, support and operations instead of juggling many separate tools.',
    badges: ['Web platform', 'Customizable', 'Integrations'],
    gradient: 'from-violet to-fuchsia-500',
    image: '/images/products/balsuite.webp',
    imageSm: '/images/products/balsuite-sm.webp',
    imageAlt: 'Balsuite dashboard showing projects, sprint velocity, team utilization and tasks',
  },
  {
    id: 'freymora', name: 'Freymora', icon: 'Truck', category: 'Freight brokerage',
    tagline: 'Simpler transport operations. Higher efficiency.',
    desc: 'Freymora is a freight brokerage platform. Manage bookings, tracking, billing and vendor payments for all your branches in one platform.',
    features: [
      ['Bookings and trips', 'Create loads and follow each trip from booked to invoiced'],
      ['Live trip status', 'Booked, dispatched, in transit, delivered and invoiced'],
      ['Billing and invoicing', 'Raise and track customer invoices'],
      ['Vendor payments', 'Approve vendor bills and manage payouts'],
      ['Reports and insights', 'Operational and financial reporting'],
      ['Multi-branch', 'All your branches in one system'],
    ],
    audience: 'Freight brokers and logistics businesses that want their whole operation in one system.',
    badges: ['Web platform', 'Multi-branch'],
    gradient: 'from-blue-600 to-cyan',
    image: '/images/products/freymora.webp',
    imageSm: '/images/products/freymora-sm.webp',
    imageAlt: 'Freymora freight brokerage platform showing bookings, trip tracking, billing and vendor payments',
  },
  {
    id: 'layvora', name: 'Layvora', icon: 'Egg', category: 'Poultry management',
    tagline: 'Smart farming, healthy birds, better business.',
    desc: 'Layvora helps you manage your poultry farm from anywhere: track flock health, monitor egg production, manage sales and grow your business in one place. It is offered as a subscription, with web and mobile apps.',
    features: [
      ['Birds and health', 'Track flock health and feed efficiency'],
      ['Egg production', 'Monitor daily production and sales'],
      ['Works offline', 'Use the Android app anytime, even without signal'],
      ['English and Marathi', 'Easier and faster for your team'],
      ['Sales and business insights', 'See what is working and grow'],
    ],
    audience: 'Poultry farmers and farm managers who want records, production and health tracking in one simple system.',
    badges: ['Web app', 'Mobile app', 'Subscription'],
    gradient: 'from-amber to-fuchsia-500',
    image: '/images/products/layvora-v2.webp',
    imageSm: '/images/products/layvora-v2-sm.webp',
    imageAlt: 'Layvora poultry management app welcome screen with farm and egg production features',
  },
]

/** Balvirt's own training and career institute (not a product: shown on the Careers page). */
export const INSTITUTE = {
  name: 'Balvirttechhub',
  tagline: 'Practical tech training that builds job-ready skills.',
  desc: "Balvirttechhub is Balvirt's own training and career institute. Its mentor-led programs are built around hands-on practice, placement preparation and market readiness, not just theory.",
  tracks: ['Java Full Stack + AI', 'NetSuite (Functional & Technical)', 'Generative AI'],
  points: [
    ['Small batches', 'Real, hands-on mentorship'],
    ['Real projects', 'Build work you can show to employers'],
    ['Industry mentors', 'Learn from working practitioners'],
    ['Placement preparation', 'Support for interviews and market readiness'],
  ],
  image: '/images/institute/balvirttechhub-v2.webp',
  imageAlt: 'Balvirttechhub website showing a full stack development training session',
}
