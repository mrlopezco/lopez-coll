interface Project {
  title: string
  description: string
  tags?: string[]
  href?: string
  imgSrc?: string
  flags?: string[]
}

const projectsData: Project[] = [
  {
    title: 'Sport Dimension - Phase 2 - Solution Architect',
    description: `After successfully implementing Dynamics 365 Finance & Operations, my team
    and I continued enhancing Sport Dimension's business operations by introducing Advanced
    Warehouse in Distribution Centers and addressing several Supply Chain-related topics.
    This project is an ongoing engagement.`,
    tags: ['B2B - Retail'],
    imgSrc: '/static/images/projects/sportdimension.png',
    flags: ['america-stars-and-stripes-united-united-states-flag'],
    href: 'https://www.sportdimension.com',
  },
  {
    title: 'Delta Star Inc. - Solution Architect',
    description: `As the Solution Architect for Delta Star, a key player in the energy industry,
    the focus was on spearheading the integration of Dynamics 365 Sales and Dynamics 365 Field
    Service with Dynamics 365 Finance & Operations. This complex project involved creating a
    cutting-edge solution architecture in collaboration with a team of top-tier architects.
    The approach maximized the Dynamics 365 platform's capabilities, utilizing advanced features
    like dual write for immediate data coherency, virtual entities for efficient data 
    integration without replication, and custom APIs tailored to Delta Star's specific 
    transactional pathways. The result was a significant boost in operational efficiency and a
    reduction in data redundancy, marking a milestone in the company's pursuit of technological
    and process excellence.`,
    tags: ['Manufacturing'],
    imgSrc: '/static/images/projects/DS-Logo.png',
    flags: ['canada-flag', 'america-stars-and-stripes-united-united-states-flag'],
    href: 'https://www.deltastar.com',
  },
  {
    title: 'Sport Dimension - Solution Architect',
    description: `As the Solution Architect for Sport Dimension, a leading B2B and B2C retailer
    specializing in sports goods procurement in Asia, with distribution to major big-box
    retailers across the United States, the goal was to lead a transformative project. The
    objective was to upgrade their legacy AX2012 system to a modern Dynamics 365 environment.
    This comprehensive implementation encompassed finance and supply chain management modules,
    alongside crucial integrations with retailers and third-party software.`,
    tags: ['B2C - Retail'],
    imgSrc: '/static/images/projects/sportdimension.png',
    flags: ['america-stars-and-stripes-united-united-states-flag'],
    href: 'https://www.sportdimension.com',
  },
  {
    title: 'LaCrosse Footwear - Solution Architect',
    description: `As the Solution Architect overseeing a team of two consultants, the deployment
    of an online Point of Sale (POS) system was led for various brands within the LaCrosse
    organization across the United States. Leveraging the client's existing Dynamics 365 Supply
    Chain Management (SCM) and Finance environment, the retail module was efficiently configured,
    POS hardware integrated, and Dynamics 365 Retail implemented within a short timeframe.
    The phased rollout across multiple locations ensured smooth implementation and minimal
    disruption to operations.`,
    tags: ['B2C - Retail'],
    imgSrc: '/static/images/projects/lacrosse.png',
    flags: ['america-stars-and-stripes-united-united-states-flag'],
    href: 'https://www.lacrossefootwear.com',
  },
  {
    title: 'Parian Logistics - Solution Architect',
    description: `The rollout of new D365 FO legal entities for an industry-leading retail company
    in the clothing sector was led. The project involved implementing new processes, especially
    in an intercompany context and stock handling to stores, and improving technical processes
    with advanced PowerApp technology.`,
    tags: ['Manufacturing'],
    imgSrc: '/static/images/projects/Parian.png',
    flags: ['america-stars-and-stripes-united-united-states-flag'],
    href: 'http://www.parianlogistics.com',
  },
  {
    title: 'Resonac - Solution Architect',
    description: `Implementation of D365 in a manufacturing company within the automotive industry
    was managed as a Solution Architect. The project had heavy dependencies on third-party ISVs
    for integrations with OEM Manufacturers in North America.`,
    tags: ['Manufacturing'],
    imgSrc: '/static/images/projects/resonac.png',
    flags: ['america-stars-and-stripes-united-united-states-flag'],
    href: 'https://www.resonac.com',
  },
  {
    title: 'Liquids Infrastructure Company *confidential* - Consultant',
    description: `A D365 Finance upgrade project was undertaken for a midstream oilfield service
    company. The implementation included core financial modules such as Project Management &
    Accounting, innovative solutions in the Asset Leasing Area, and support of business processes
    with Workflow Management. Additionally, SKGlobal was integrated as an ISV.`,
    tags: ['B2B - Retail'],
    imgSrc: '/static/images/projects/confidential.png',
    flags: ['canada-flag', 'america-stars-and-stripes-united-united-states-flag'],
    href: 'https://www.google.com',
  },
  {
    title: 'Showa Denko Materials - Solution Architect',
    description: `SAP FiCo was replaced with AX 2012 for a global player in the automotive
    supplier industry in Mexico. The project involved implementing key accounting processes
    and Mexican tax processes and developing an interface to integrate the SCM Solution with
    AX 2012 financial modules.`,
    tags: ['Manufacturing'],
    imgSrc: '/static/images/projects/showa-denko.png',
    flags: ['mexico-flag'],
    href: 'https://www.mc.showadenko.com/english/index.html',
  },
  {
    title: 'Franks International - Consultant',
    description: `In an advisory role for the ERP Implementation team, support was provided
    for a D365 Finance project for a well-known Oil & Gas Company in the United States. Due
    to the business nature and the number of legal entities (+180), the role required supporting
    the financial lead in creating a global financial concept for reporting and tax.`,
    tags: ['B2B - Retail'],
    imgSrc: '/static/images/projects/FranksIntl2.jpg',
    flags: ['globe-with-meridians'],
    href: 'https://franksinternational.com',
  },
  {
    title: 'Canaccord - Consultant',
    description: `Responsibility for the functional area of Finance in a D365 Finance upgrade
    project was taken for a global player in the insurance and wealth management industry.
    The project involved over 130 legal entities across 4 continents. International alignment
    of business processes and system configuration were key to a successful go-live.`,
    tags: ['Financial Services'],
    imgSrc: '/static/images/projects/Canaccord-Genuity-logo.jpg',
    flags: ['canada-flag'],
    href: 'https://www.canaccordgenuity.com',
  },
  {
    title: 'Walton Global Investments Ltd. - Consultant',
    description: `In a D365 Finance upgrade project from AX2009 in the Private Equity Industry,
    the role was to execute a final review of all the modifications and integrations and advise
    on small business process improvements. Another key activity was to devise a strategy to
    roll out the product to over 200 legal entities across Asia and North America, ensuring
    successful project go-live.`,
    tags: ['Real Estate'],
    imgSrc: '/static/images/projects/walton.jpg',
    flags: ['globe-with-meridians'],
    href: 'https://walton.com',
  },
  {
    title: 'United Farmers of Alberta - Consultant',
    description: `D365 Finance was implemented, including industry-standard financial processes,
    and an extensive concept was developed to cover carbon and levy taxes in Alberta, Canada.
    Furthermore, D365 retail was integrated with D365 Finance for customer-facing processes such
    as POS-Payments, Payment Provider Interface, and financially correct Inventory Management in
    retail shops.`,
    tags: ['B2B - Retail'],
    imgSrc: '/static/images/projects/ufa.jpg',
    flags: ['canada-flag'],
    href: 'https://ufa.com',
  },
  {
    title: 'LUQEL - Consultant',
    description: `Conceptual analysis and customer support were provided for an internationally
    aligned business to fulfill international accounting standards. The role involved
    parameterization of a core environment, analysis of business processes, and support in
    Germany and Ireland.`,
    tags: ['B2B - Retail'],
    imgSrc: '/static/images/projects/luqel.jpg',
    flags: ['ireland-flag'],
    href: 'https://www.luqel-water.com/en',
  },
  {
    title: 'Comparex - Consultant',
    description: `The xReach Process Framework was introduced and business fit gaps analyzed.
    The role included parameterization of an internationally aligned core environment.`,
    tags: ['B2B - Retail'],
    imgSrc: '/static/images/projects/comparex.jpg',
    flags: ['germany-flag'],
    href: 'https://www.softwareone.com/en-ca',
  },
  {
    title: 'Alternate GmbH - Consultant',
    description: `D365 Finance Accounting & Controlling processes were implemented in Germany,
    the Netherlands, and Belgium. Technical engineers were supported in data migration, and
    responsibility was taken for parameterization throughout the entire project.`,
    tags: ['B2C - Retail'],
    imgSrc: '/static/images/projects/alternate-gmbh.jpg',
    flags: ['germany-flag'],
    href: 'https://www.alternate.de',
  },
  {
    title: 'KAISER+KRAFT GmbH - Consultant',
    description: `An interface concept was developed to attach an external accounting software to AX2012.`,
    tags: ['B2B - Retail'],
    imgSrc: '/static/images/projects/kaiser-kraft.jpg',
    flags: ['germany-flag'],
    href: 'https://www.export.kaiserkraft.com',
  },
  {
    title: 'igus - Consultant',
    description: `The customer's accounting system was replaced with AX2012 and AX4. Value flow
    analysis within those systems was conducted to derive controlling fundamentals.`,
    tags: ['Production'],
    imgSrc: '/static/images/projects/igus.jpg',
    flags: ['germany-flag'],
    href: 'https://www.igus.eu',
  },
  {
    title: 'windeln.de - Support',
    description: `Customer support was provided regarding difficulties during the year-end close,
    analyzing and fixing process gaps.`,
    tags: ['B2C - Retail'],
    imgSrc: '/static/images/projects/windeln.jpg',
    flags: ['germany-flag'],
    href: 'https://www.windeln.de',
  },
  {
    title: 'Amazone H. Dreyer GmbH & Co. KG - Consultant',
    description: `An old Accounts Payable and Accounts Receivable software was replaced, and Fixed
    Asset Accounting was modernized based on Dynamics AX 2012. Special reporting with Management
    Reporter was also included.`,
    tags: ['Engineering'],
    imgSrc: '/static/images/projects/amazone.jpg',
    flags: ['germany-flag'],
    href: 'https://amazone.net/en',
  },
  {
    title: 'Bavaria Film GmbH - Consultant',
    description: `A process overview was created during the design phase, and main processes were
    illustrated in a prototype based on D365 FO.`,
    tags: ['B2C - Retail'],
    imgSrc: '/static/images/projects/bavaria-film.jpg',
    flags: ['germany-flag'],
    href: 'https://www.bavaria-studios.de/en',
  },
  {
    title: 'Erwin Müller AG - Consultant',
    description: `The company's internal reporting was completely restructured, and business processes
    were changed to achieve new reporting targets. Technology support was provided based on AX 2012.
    Reporting was automated in Management Reporter, and new budgeting business and functional processes
    were implemented.`,
    tags: ['B2B - Retail'],
    imgSrc: '/static/images/projects/Erwin_Mueller_Group_OpenGraph.jpg',
    flags: ['switzerland-flag'],
    href: 'https://de.erwinmueller.com',
  },
  {
    title: 'Mageba SA - Consultant',
    description: `An upgrade project from Navision to AX 2012 was managed at a construction company in
    Switzerland. Responsibilities included analyzing financial business processes, recording requirements,
    and training key users in accounting modules.`,
    tags: ['Engineering'],
    imgSrc: '/static/images/projects/mageba.jpg',
    flags: ['switzerland-flag'],
    href: 'https://www.mageba-group.com/global/en',
  },
]

export default projectsData
