export interface Profile {
  name: string;
  firstName: string;
  initials: string;
  role: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeSummary: string;
  extraLine: string;
  quote: string;
  github: string;
  linkedin: string;
  resumePath: string;
  idCard: {
    dept: string;
    validTill: string;
    idNo: string;
    cgpa: string;
    degree: string;
  };
  facts: {
    label: string;
    value: string;
  }[];
}

export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export interface SkillElement {
  number: number;
  symbol: string;
  name: string;
  family: 'Languages' | 'Analytics' | 'Databases & Tools' | 'Frontend' | 'Concepts';
  brandKey?: string;
  conceptKey?: string;
  projects: string[];
  description: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: [string, string];
  tech: string[];
  github?: string;
  uiType: 'ai-optimizer' | 'satyam-verify' | 'research-5g' | 'sales-bi';
}

export interface CertificationItem {
  index: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  place: string;
  type: 'education' | 'experience';
  badge?: string;
  details: string[];
}

export interface AchievementItem {
  index: string;
  label: string;
  caption: string;
  detail: string;
  metricNumber: number;
  metricSuffix: string;
  brandKey: string;
  brandColorGlow: string;
}

export const PROFILE: Profile = {
  name: 'Shakti Pad Mahato',
  firstName: 'SHAKTI',
  initials: 'SPM',
  role: 'Data Science and Analyst',
  email: 'shaktimahatokumar@gmail.com',
  phone: '+91-9572520736',
  phoneHref: 'tel:+919572520736',
  location: 'Bokaro, Jharkhand',
  resumeSummary:
    '2nd-year B.Tech student at ITER, SOA University specializing in Data Science. Proficient in the essential analyst stack: Python (Pandas, NumPy, Seaborn, Matplotlib), MySQL, and Power BI. Authored a research paper on 5G Infrastructure and actively exploring technical conferences and hackathons to drive AI innovation.',
  extraLine: 'Actively exploring technical conferences and hackathons to drive AI innovation.',
  quote:
    'Synthesizing raw telemetry into clear visual intelligence through statistical modeling, DAX dashboards, and exploratory data analysis.',
  github: 'https://github.com/shaktixgit',
  linkedin: 'https://www.linkedin.com/in/shaktixlin/',
  resumePath: '/resume.pdf',
  idCard: {
    dept: 'CSE (Data Science)',
    validTill: '2026',
    idNo: 'ITER-2024-DS',
    cgpa: '8.0 CGPA',
    degree: 'B.Tech in CSE (Data Science)',
  },
  facts: [
    { label: 'Location', value: 'Bokaro, Jharkhand, India' },
    { label: 'Education', value: 'ITER, SOA University (2024–2026)' },
    { label: 'Current Role', value: 'Data Science & Analyst' },
    { label: 'Email', value: 'shaktimahatokumar@gmail.com' },
  ],
};

export const NAV: NavItem[] = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Work', href: '#work', id: 'work' },
  { label: 'Certifications', href: '#certifications', id: 'certifications' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Achievements', href: '#achievements', id: 'achievements' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const SKILL_GROUPS = [
  'All',
  'Languages',
  'Analytics',
  'Databases & Tools',
  'Frontend',
  'Concepts',
] as const;

export const SKILLS: SkillElement[] = [
  {
    number: 1,
    symbol: 'Py',
    name: 'Python',
    family: 'Languages',
    brandKey: 'python',
    projects: ['AI SaaS Optimizer', 'Satyam Verify', '5G Infrastructure Analysis'],
    description: 'Core language for analytical pipelines, numerical computing, and machine learning models.',
  },
  {
    number: 2,
    symbol: 'Pb',
    name: 'Power BI',
    family: 'Analytics',
    brandKey: 'powerbi',
    projects: ['Sales Performance BI Dashboard'],
    description: 'Enterprise dashboard creation, DAX measures, relational modeling, and interactive reporting.',
  },
  {
    number: 3,
    symbol: 'Sq',
    name: 'MySQL',
    family: 'Databases & Tools',
    brandKey: 'mysql',
    projects: ['Satyam Verify', 'Sales Performance BI Dashboard'],
    description: 'Relational schema design, complex analytical queries, indexing, and data warehousing.',
  },
  {
    number: 4,
    symbol: 'Pd',
    name: 'Pandas',
    family: 'Analytics',
    brandKey: 'pandas',
    projects: ['AI SaaS Optimizer', '5G Infrastructure Analysis'],
    description: 'High-performance data manipulation, exploratory data analysis, and series filtering.',
  },
  {
    number: 5,
    symbol: 'Np',
    name: 'NumPy',
    family: 'Analytics',
    brandKey: 'numpy',
    projects: ['AI SaaS Optimizer', '5G Infrastructure Analysis'],
    description: 'N-dimensional matrix operations, vectorization, and mathematical modeling.',
  },
  {
    number: 6,
    symbol: 'Ex',
    name: 'MS Excel',
    family: 'Analytics',
    brandKey: 'excel',
    projects: ['Sales Performance BI Dashboard'],
    description: 'Pivot tables, VLOOKUP/XLOOKUP, financial modeling, and raw data audit workflows.',
  },
  {
    number: 7,
    symbol: 'Jv',
    name: 'Java',
    family: 'Languages',
    brandKey: 'java',
    projects: ['Satyam Verify'],
    description: 'Object-oriented programming, algorithm implementations, and backend services.',
  },
  {
    number: 8,
    symbol: 'Gh',
    name: 'GitHub',
    family: 'Databases & Tools',
    brandKey: 'github',
    projects: ['AI SaaS Optimizer', 'Satyam Verify', '5G Research'],
    description: 'Version control, Git actions, collaborative open-source workflows, and release tags.',
  },
  {
    number: 9,
    symbol: 'Sb',
    name: 'Seaborn',
    family: 'Analytics',
    conceptKey: 'visualization',
    projects: ['AI SaaS Optimizer', '5G Infrastructure Analysis'],
    description: 'Statistical graphics, multi-plot grids, correlation heatmaps, and distribution curves.',
  },
  {
    number: 10,
    symbol: 'Mp',
    name: 'Matplotlib',
    family: 'Analytics',
    conceptKey: 'chart',
    projects: ['AI SaaS Optimizer', '5G Infrastructure Analysis'],
    description: 'Publication-quality scientific visualization, customized axis plotting, and trend charts.',
  },
  {
    number: 11,
    symbol: 'Lx',
    name: 'LaTeX',
    family: 'Databases & Tools',
    brandKey: 'latex',
    projects: ['5G Infrastructure Analysis'],
    description: 'Academic paper typesetting, mathematical formula rendering, and formal documentation.',
  },
  {
    number: 12,
    symbol: 'Fe',
    name: 'Front End',
    family: 'Frontend',
    brandKey: 'html5',
    projects: ['Satyam Verify'],
    description: 'Semantic markup, responsive layout structures, and accessibility-first design.',
  },
  {
    number: 13,
    symbol: 'Cs',
    name: 'CSS3',
    family: 'Frontend',
    brandKey: 'css3',
    projects: ['Satyam Verify'],
    description: 'Responsive styling, CSS Grid, Flexbox, custom design systems, and animations.',
  },
  {
    number: 14,
    symbol: 'Js',
    name: 'JavaScript',
    family: 'Frontend',
    brandKey: 'javascript',
    projects: ['Satyam Verify'],
    description: 'DOM manipulation, async data requests, event listeners, and dynamic UI state.',
  },
  {
    number: 15,
    symbol: 'Pq',
    name: 'Power Query',
    family: 'Analytics',
    conceptKey: 'pipeline',
    projects: ['Sales Performance BI Dashboard'],
    description: 'ETL transformation pipelines, column profiling, merging, and automated data shaping.',
  },
  {
    number: 16,
    symbol: 'Dx',
    name: 'DAX',
    family: 'Analytics',
    conceptKey: 'formula',
    projects: ['Sales Performance BI Dashboard'],
    description: 'Data Analysis Expressions for calculated columns, dynamic measures, and time intelligence.',
  },
  {
    number: 17,
    symbol: 'Gt',
    name: 'Git',
    family: 'Databases & Tools',
    brandKey: 'git',
    projects: ['All Projects'],
    description: 'Distributed source control, branching strategies, rebase workflows, and commit history.',
  },
  {
    number: 18,
    symbol: 'Vs',
    name: 'VS Code',
    family: 'Databases & Tools',
    brandKey: 'vscode',
    projects: ['All Projects'],
    description: 'Primary IDE for Python scripting, LaTeX document authoring, and web debugging.',
  },
  {
    number: 19,
    symbol: '5G',
    name: '5G Infra',
    family: 'Concepts',
    conceptKey: 'telecom',
    projects: ['5G Infrastructure Analysis'],
    description: 'Spectrum propagation, millimeter wave cell coverage, and network infrastructure metrics.',
  },
  {
    number: 20,
    symbol: 'Ai',
    name: 'Artificial Intel',
    family: 'Concepts',
    conceptKey: 'ai',
    projects: ['AI SaaS Optimizer'],
    description: 'AI foundations, intelligent automation, pattern recognition, and predictive reasoning.',
  },
  {
    number: 21,
    symbol: 'Ml',
    name: 'Machine Learning',
    family: 'Concepts',
    conceptKey: 'ml',
    projects: ['AI SaaS Optimizer'],
    description: 'Supervised regression, classification models, feature engineering, and evaluation metrics.',
  },
  {
    number: 22,
    symbol: 'Da',
    name: 'Data Analytics',
    family: 'Concepts',
    conceptKey: 'analytics',
    projects: ['Sales Performance BI Dashboard', 'Cognifyz Technologies'],
    description: 'Hypothesis testing, exploratory data analysis, KPI synthesis, and executive summaries.',
  },
  {
    number: 23,
    symbol: 'Os',
    name: 'Operating Systems',
    family: 'Concepts',
    conceptKey: 'os',
    projects: ['Satyam Verify'],
    description: 'Process management, virtual memory, file systems, and system call architectures.',
  },
  {
    number: 24,
    symbol: 'Hk',
    name: 'Hackathons',
    family: 'Concepts',
    conceptKey: 'hackathon',
    projects: ['Smart India Hackathon 2026'],
    description: 'Rapid prototyping, problem deconstruction, teamwork, and innovation under constraints.',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'ai-saas-optimizer',
    index: '01',
    title: 'AI SaaS Optimizer',
    kicker: 'Cloud Economics & AI Telemetry',
    description:
      'Intelligent telemetry engine analyzing cloud compute usage, latency anomalies, and API consumption to automate infrastructure cost reduction and optimize SaaS response curves.',
    features: [
      'Automated outlier detection across distributed API throughput and server load',
      'Predictive cost forecast algorithms using statistical feature modeling in Python',
    ],
    tech: ['Python', 'Pandas', 'NumPy', 'Data Analysis', 'AI'],
    github: 'https://github.com/shaktixgit/ai-saas-optimizer',
    uiType: 'ai-optimizer',
  },
  {
    id: 'satyam-verify',
    index: '02',
    title: 'Satyam Verify',
    kicker: 'Authenticity & Audit Engine',
    description:
      'Robust dataset and credential verification platform with automated integrity audits, checksum validation, and secure verification interfaces for institutional records.',
    features: [
      'Cryptographic record validation preventing tampered certificates and discrepancies',
      'Accessible web interface with real-time verification logs and instant status check',
    ],
    tech: ['Python', 'MySQL', 'Front End Coding', 'REST APIs'],
    github: 'https://github.com/shaktixgit/Satyam-Verify',
    uiType: 'satyam-verify',
  },
  {
    id: '5g-infrastructure-research',
    index: '03',
    title: '5G Infrastructure Analysis',
    kicker: 'Research Paper & Spectrum Study',
    description:
      'Formal academic research exploring telecommunication rollout across India, evaluating millimeter-wave propagation, tower density, and bandwidth coverage models.',
    features: [
      'Rigorous mathematical modeling of cell coverage and attenuation documented in LaTeX',
      'Exploratory data analysis and charts visualizing spectrum distribution across regions',
    ],
    tech: ['LaTeX', 'Python', 'NumPy', 'Matplotlib', 'Seaborn'],
    github: 'https://github.com/shaktixgit/Research-paper-Codes',
    uiType: 'research-5g',
  },
  {
    id: 'sales-bi-dashboard',
    index: '04',
    title: 'Sales Performance BI Dashboard',
    kicker: 'Business Intelligence & Reporting',
    description:
      'Interactive Power BI executive dashboard built to track sales velocity, regional KPI performance, customer cohorts, and quarterly profit margins using DAX measures.',
    features: [
      'Engineered automated Power Query ETL pipelines to unify fragmented enterprise records',
      'Implemented custom DAX formulas for dynamic period-over-period growth tracking',
    ],
    tech: ['Power BI', 'DAX', 'Power Query', 'MS Excel', 'MySQL'],
    github: 'https://github.com/shaktixgit',
    uiType: 'sales-bi',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    index: '01',
    title: 'Data Science & Analytics',
    issuer: 'HP LIFE',
    date: 'Aug 2025',
    link: 'https://drive.google.com/drive/folders/1YC1RxXoiC1Su7OuskknkRYUTo7rJCnBf',
  },
  {
    index: '02',
    title: 'Deloitte Australia - Data Analytics Job Simulation',
    issuer: 'Deloitte',
    date: 'Jul 2025',
    credentialId: 'v3gvjQvaWF5J6DKkE',
    link: 'https://drive.google.com/drive/folders/1YC1RxXoiC1Su7OuskknkRYUTo7rJCnBf',
  },
  {
    index: '03',
    title: 'AI : Fundamentals Foundations for Understanding AI',
    issuer: 'IBM',
    date: 'Mar 2026',
    link: 'https://drive.google.com/drive/folders/1YC1RxXoiC1Su7OuskknkRYUTo7rJCnBf',
  },
  {
    index: '04',
    title: 'Getting Started with Artificial Intelligence',
    issuer: 'IBM',
    date: 'Mar 2026',
    link: 'https://drive.google.com/drive/folders/1YC1RxXoiC1Su7OuskknkRYUTo7rJCnBf',
  },
  {
    index: '05',
    title: 'Data Analysis with Python',
    issuer: 'IBM',
    date: 'Jun 2025',
    link: 'https://drive.google.com/drive/folders/1YC1RxXoiC1Su7OuskknkRYUTo7rJCnBf',
  },
  {
    index: '06',
    title: 'Basics of Data Analytics Program',
    issuer: 'Microsoft',
    date: 'Apr 2026',
    credentialId: '0ae48a67-2e3f-4851-bd03-9d119a035448',
    link: 'https://drive.google.com/drive/folders/1YC1RxXoiC1Su7OuskknkRYUTo7rJCnBf',
  },
  {
    index: '07',
    title: 'Data Analysis with Python',
    issuer: 'freeCodeCamp',
    date: 'Apr 2026',
    credentialId: 'fcc-0d83012e-bca3-402e-bb2c-d4e58db4d49d-dawp',
    link: 'https://drive.google.com/drive/folders/1YC1RxXoiC1Su7OuskknkRYUTo7rJCnBf',
  },
  {
    index: '08',
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: 'Apr 2026',
    credentialId: 'fcc-0d83012e-bca3-402e-bb2c-d4e58db4d49d-rwdv9',
    link: 'https://drive.google.com/drive/folders/1YC1RxXoiC1Su7OuskknkRYUTo7rJCnBf',
  },
  {
    index: '09',
    title: 'Operating System Basics',
    issuer: 'Cisco Networking Academy',
    date: 'Sep 2025',
    link: 'https://drive.google.com/drive/folders/1YC1RxXoiC1Su7OuskknkRYUTo7rJCnBf',
  },
  {
    index: '10',
    title: 'Power BI Workshop',
    issuer: 'United Latino Students Association',
    date: 'Aug 2025',
    credentialId: '42',
    link: 'https://drive.google.com/drive/folders/1YC1RxXoiC1Su7OuskknkRYUTo7rJCnBf',
  },
  {
    index: '11',
    title: 'DECODE THE TECH 2026',
    issuer: 'Google Developer Group on Campus ITER',
    date: 'May 2026',
    link: 'https://drive.google.com/drive/folders/1YC1RxXoiC1Su7OuskknkRYUTo7rJCnBf',
  },
  {
    index: '12',
    title: 'Certificate of Excellence in Caselet 53 (Weekly Case Challenge)',
    issuer: 'Unstop',
    date: 'Feb 2026',
    credentialId: '0cd1cd46-3073-454b-8975-292b4049d953',
    link: 'https://drive.google.com/drive/folders/1YC1RxXoiC1Su7OuskknkRYUTo7rJCnBf',
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    year: '2022 — 2024',
    title: 'Class 12th PCM',
    place: 'GM Public School',
    type: 'education',
    details: [
      'Completed Senior Secondary Education with foundational focus in Physics, Chemistry, and Mathematics.',
      'Developed strong algorithmic problem solving and quantitative reasoning abilities.',
    ],
  },
  {
    year: '2024 — 2026',
    title: 'B.Tech in CSE (Specialization in Data Science)',
    place: 'ITER, SOA University',
    type: 'education',
    badge: '8.0 CGPA',
    details: [
      '2nd-year undergraduate focused on Data Structures, Statistical Modeling, and Applied AI.',
      'Authored 5G infrastructure research paper and achieved SIH 2026 Top 100 Finalist status.',
    ],
  },
  {
    year: 'Jul 2025 — Aug 2025',
    title: 'Data Analyst (Power BI)',
    place: 'Cognifyz Technologies (Remote)',
    type: 'experience',
    badge: 'Internship',
    details: [
      'Cleaned and transformed data using Power Query for accurate, analysis-ready datasets.',
      'Built Power BI dashboards using DAX for insightful data visualization and reporting.',
      'Analyzed company datasets to identify trends and deliver actionable insights remotely.',
    ],
  },
  {
    year: 'Jul 2025 — Aug 2025',
    title: 'Data Analytics (Python)',
    place: 'SkillFied Mentor (Remote)',
    type: 'experience',
    badge: 'Internship',
    details: [
      'Performed data analysis using Python and NumPy on company-provided datasets remotely.',
      'Created visualizations using Matplotlib and Seaborn to communicate insights effectively.',
      'Processed and analyzed datasets to identify trends and support data-driven decisions.',
    ],
  },
  {
    year: '2025',
    title: 'Virtual Internship in Emerging Technologies',
    place: 'Vodafone Idea (VOIS) & Edunet Foundation',
    type: 'experience',
    badge: 'Virtual Internship',
    details: [
      'Completed comprehensive industry program on modern data workflows and enterprise analytics architectures.',
    ],
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    index: '01 / 06',
    label: 'Smart India Hackathon',
    caption: 'Top 100 Finalist',
    detail: 'Selected among top national innovator teams at SOA SIH 2026 for AI-driven solution design.',
    metricNumber: 100,
    metricSuffix: 'Top',
    brandKey: 'unstop',
    brandColorGlow: 'rgba(235, 77, 75, 0.15)',
  },
  {
    index: '02 / 06',
    label: 'Academic Performance',
    caption: 'B.Tech in CSE (Data Science)',
    detail: 'Consistent scholarly excellence across data structures, math, and analytics at ITER SOA.',
    metricNumber: 8,
    metricSuffix: '.0',
    brandKey: 'microsoft',
    brandColorGlow: 'rgba(0, 164, 239, 0.15)',
  },
  {
    index: '03 / 06',
    label: 'Professional Certifications',
    caption: 'Industry Credentials',
    detail: 'Accredited across HP LIFE, IBM, Deloitte Australia, Microsoft, Cisco, and freeCodeCamp.',
    metricNumber: 12,
    metricSuffix: '+',
    brandKey: 'ibm',
    brandColorGlow: 'rgba(15, 98, 254, 0.15)',
  },
  {
    index: '04 / 06',
    label: 'Research Publication',
    caption: '5G Infrastructure & LaTeX',
    detail: 'Authored empirical research analyzing spectrum modeling and telecommunication rollout in India.',
    metricNumber: 1,
    metricSuffix: 'st',
    brandKey: 'latex',
    brandColorGlow: 'rgba(0, 128, 128, 0.15)',
  },
  {
    index: '05 / 06',
    label: 'Industry Internships',
    caption: 'Enterprise Experience',
    detail: 'Delivered production Power BI dashboards and Python analytics across Cognifyz, SkillFied & VOIS.',
    metricNumber: 3,
    metricSuffix: 'x',
    brandKey: 'deloitte',
    brandColorGlow: 'rgba(134, 188, 37, 0.15)',
  },
  {
    index: '06 / 06',
    label: 'Case Challenge Excellence',
    caption: 'Unstop Caselet 53 Winner',
    detail: 'Awarded Certificate of Excellence in Unstop Weekly Case Challenge 53 for strategic data analysis.',
    metricNumber: 53,
    metricSuffix: '#',
    brandKey: 'freecodecamp',
    brandColorGlow: 'rgba(10, 10, 35, 0.15)',
  },
];
