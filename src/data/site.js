export const SITE = {
  name: 'Balvirt',
  tagline: 'AI, software and ERP solutions that grow your business',
  url: 'https://balvirt.com',
  email: 'contact@balvirt.com',
  phone: '+91 9665521708',
  phoneHref: 'tel:+919665521708',
  address: 'First Floor, Hirai Estate, Adarsh Nagar, Ghulewadi, Maharashtra 422605, India',
  social: {
    linkedin: 'https://www.linkedin.com/company/balvirt/posts/?feedView=all',
    youtube: 'https://www.youtube.com/@BalasahebITSolution',
    instagram: 'https://www.instagram.com/team_balvirt?igsh=Z3d0MWFvaG9nbzh3',
  },
}

export const NAV = [
  { label: 'Home', to: '/' },
  {
    label: 'Services', to: '/services',
    children: [
      { heading: 'Oracle NetSuite' },
      ['NetSuite Implementation', '/services#implementation'],
      ['NetSuite Customization', '/services#customization'],
      ['NetSuite Optimization', '/services#optimization'],
      ['NetSuite Integration', '/services#integration'],
      ['NetSuite Support', '/services#support'],
      ['NetSuite Data Migration', '/services#data-migration'],
      ['Application Development', '/services#app-development'],
      { heading: 'AI, software & consulting' },
      ['AI Integrations', '/services#ai-integration'],
      ['Automated Workflows', '/services#automation'],
      ['App Development', '/services#apps'],
      ['Custom Websites', '/services#websites'],
      ['Custom Software & AI Models', '/services#software'],
      ['Technology Consulting', '/services#consulting'],
      ['Business Advisory', '/services#advisory'],
    ],
  },
  {
    label: 'Products', to: '/products',
    children: [
      ['Balsuite', '/products#balsuite'],
      ['Balfrevo', '/products#balfrevo'],
      ['Layvora', '/products#layvora'],
    ],
  },
  {
    label: 'Industries', to: '/industries',
    children: [
      ['Manufacturing', '/industries#manufacturing'],
      ['Retail', '/industries#retail'],
      ['Wholesale Distribution', '/industries#wholesale'],
      ['Automotive DMS', '/industries#automotive'],
      ['E-Commerce', '/industries#ecommerce'],
    ],
  },
  {
    label: 'Technology', to: '/technology',
    children: [
      ['NetSuite', '/technology#netsuite'],
      ['Celigo', '/technology#celigo'],
      ['Integration', '/technology#integration'],
      ['Android App Development', '/technology#android'],
      ['Website Development', '/technology#website'],
    ],
  },
  {
    label: 'Why Us', to: '/why-us',
    children: [
      ['Experienced Team', '/why-us#team'],
      ['Tailored Solutions', '/why-us#solutions'],
      ['End-to-End Support', '/why-us#support'],
      ['Proven Track Record', '/why-us#track-record'],
    ],
  },
  {
    label: 'Careers', to: '/careers',
    children: [
      ['Opportunities for Freshers', '/careers#freshers'],
      ['Internship Programs', '/careers#internships'],
      ['Balvirttechhub Institute', '/careers#institute'],
    ],
  },
  {
    label: 'About Us', to: '/about',
    children: [
      ['Who We Are', '/about#who-we-are'],
      ['Our Leadership', '/about#leadership'],
      ['Our Journey', '/about#journey'],
      ['Mission & Vision', '/about#mission'],
      ['Core Values', '/about#values'],
    ],
  },
  {
    label: 'Insights', to: '/insights',
    children: [
      ['YouTube Videos', '/insights#youtube'],
      ['Achievements', '/insights#achievements'],
      ['Webinars & Culture', '/insights#webinars'],
      ['Photo Gallery', '/gallery'],
    ],
  },
  { label: 'Contact', to: '/contact' },
]

// Balvirt started on 1 January 2022. Years of experience updates itself every 1 January.
export const START_DATE = new Date(2022, 0, 1)
export const yearsOfExperience = (now = new Date()) => Math.max(0, now.getFullYear() - START_DATE.getFullYear())
export const YEARS = yearsOfExperience()

export const STATS = [
  { value: YEARS, suffix: '+', label: 'Years of experience' },
  { value: 10, suffix: '+', label: 'SME clients served' },
  { value: 98, suffix: '%', label: 'Client satisfaction' },
  { value: 7, suffix: '+', label: 'Countries served' },
  { value: 5, suffix: '', label: 'Industries covered' },
]

export const SERVICES = [
  {
    id: 'implementation', icon: 'Rocket', title: 'NetSuite Implementation',
    short: 'End-to-end NetSuite ERP implementation tailored to your business.',
    desc: 'Complete end-to-end implementation of Oracle NetSuite ERP configured around your industry, with a smooth transition from legacy systems and minimal disruption to daily operations.',
    points: [
      ['Tailored configurations', 'Setup based on your industry requirements'],
      ['Team training', 'Comprehensive programs for smooth adoption'],
      ['Post-implementation support', 'Ongoing maintenance and support services'],
    ],
    image: '/images/Netsuite_Implementation[1].png',
  },
  {
    id: 'customization', icon: 'Code2', title: 'NetSuite Customization',
    short: 'SuiteScript workflows, dashboards and roles built for your processes.',
    desc: "Extend NetSuite's capabilities with custom solutions that address your unique business processes and requirements.",
    points: [
      ['Custom workflows and scripts', 'Automated business processes with SuiteScript'],
      ['Personalized dashboards and reports', 'Role-based KPIs and analytics'],
      ['Role-based access control', 'Secure permission management'],
    ],
    image: '/images/Services/NetSuite_customization .png',
  },
  {
    id: 'optimization', icon: 'Gauge', title: 'NetSuite Optimization',
    short: 'Get more value from the NetSuite you already own.',
    desc: 'Maximize your NetSuite investment with performance optimization and system enhancements.',
    points: [
      ['Workflow refinement', 'Streamline existing business processes'],
      ['Customization enhancements', 'Improve existing custom solutions'],
      ['Data cleanup', 'Optimize database performance'],
      ['User experience improvements', 'Enhance system usability'],
    ],
    image: '/images/Services/NetSuite_Optimization.png',
  },
  {
    id: 'integration', icon: 'Workflow', title: 'NetSuite Integration',
    short: 'Connect NetSuite with your CRM, eCommerce and third-party apps.',
    desc: 'Seamlessly connect NetSuite with your existing systems and third-party applications.',
    points: [
      ['API integrations', 'REST and SOAP API implementations'],
      ['Third-party connections', 'CRM, eCommerce and other systems'],
      ['Real-time data synchronization', 'Automated data flow across systems'],
    ],
    image: '/images/Services/N_integration[1].png',
  },
  {
    id: 'support', icon: 'LifeBuoy', title: 'NetSuite Support',
    short: '24/7 monitoring, fast fixes and continuous tuning.',
    desc: 'Comprehensive support services to keep your NetSuite system running optimally.',
    points: [
      ['Proactive monitoring', '24/7 system monitoring and alerts'],
      ['Performance tuning', 'Regular optimization and updates'],
      ['Troubleshooting & issue resolution', 'Quick response and resolution'],
    ],
    image: '/images/1_fresher/Support-Specialists.jpg',
  },
  {
    id: 'data-migration', icon: 'DatabaseZap', title: 'NetSuite Data Migration',
    short: 'Secure, validated migration of your data into NetSuite.',
    desc: 'Secure and efficient migration of your data to the NetSuite platform.',
    points: [
      ['Data cleansing & preparation', 'Data quality assessment and cleanup'],
      ['Secure migration strategies', 'Risk-free data transfer'],
      ['Validation & testing', 'Comprehensive testing and validation'],
    ],
    image: '/images/Services/Data_migration[1].png',
  },
  {
    id: 'app-development', icon: 'Layers', title: 'Application Development & Modernization',
    short: 'Custom web, mobile and enterprise apps with modern UX.',
    desc: 'Custom application development and legacy system modernization services built for performance and scalability.',
    points: [
      ['Custom app development', 'Web, mobile, and enterprise solutions'],
      ['Legacy modernization', 'Transform outdated systems into cloud platforms'],
      ['API development & integration', 'Seamless system interoperability'],
      ['Agile & DevOps enablement', 'Faster delivery with automation'],
      ['User experience design', 'Modern and intuitive UI/UX'],
    ],
    image: '/images/Application_development[1].png',
  },
]

export const INDUSTRIES = [
  {
    id: 'manufacturing', icon: 'Factory', title: 'Manufacturing',
    desc: 'Complete NetSuite ERP for manufacturers to streamline operations and raise productivity.',
    points: [
      ['Streamline production processes', 'Apply lean principles and automate production workflows'],
      ['Manage inventory efficiently', 'Real-time inventory tracking and supply chain optimization'],
      ['Real-time analytics', 'Reduce downtime with actionable insights'],
    ],
    image: '/images/manufacturing.jpg',
  },
  {
    id: 'retail', icon: 'Store', title: 'Retail',
    desc: 'Unified commerce that bridges online and offline retail operations seamlessly.',
    points: [
      ['Inventory management & order fulfillment', 'Omni-channel inventory synchronization'],
      ['Seamless integration', 'Connect physical stores with online platforms'],
      ['Sales optimization tools', 'Increase sales while reducing operational costs'],
    ],
    image: '/images/Retail[1].png',
  },
  {
    id: 'wholesale', icon: 'Truck', title: 'Wholesale Distribution',
    desc: 'Optimize your distribution network with intelligent supply chain management.',
    points: [
      ['Optimize supply chain & logistics', 'Streamline logistics and distribution operations'],
      ['Manage large inventories', 'Efficient handling of extensive product catalogs'],
      ['Real-time delivery tracking', 'Complete visibility into shipment status'],
    ],
    image: '/images/Wholesale_Distributor[1].png',
  },
  {
    id: 'automotive', icon: 'Car', title: 'Automotive DMS',
    desc: 'An integrated dealership management system unifying every part of automotive retail.',
    points: [
      ['Unified management', 'Sales, service, parts and finance integration'],
      ['Enhance dealership efficiency', 'Improve operational performance'],
      ['Actionable insights', 'Data-driven decisions for business growth'],
    ],
    image: '/images/Automative.png',
  },
  {
    id: 'ecommerce', icon: 'ShoppingCart', title: 'E-Commerce',
    desc: 'Advanced e-commerce solutions for managing complex online business operations.',
    points: [
      ['Multi-channel sales', 'Manage complex product catalogs'],
      ['Payment & logistics integration', 'Seamless gateway integrations'],
      ['Personalized customer experiences', 'Tailored shopping journeys'],
    ],
    image: '/images/E.commerce.png',
  },
]
