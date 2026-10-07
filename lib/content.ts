/* Every word on the page, taken verbatim from abclondonproperty.co.uk (homepage, read on 7 October 2026).
   Components only lay this out. The one live page has no inner pages: its sitemap lists "/" and "/privacy-policy".
   House rule for these demos: no em or en dashes anywhere (the live hours "08:00 – 18:00" become "08:00 to 18:00").
   The live typos are kept as written ("service include", "knowledgable", "VC'S"): this is their copy, not ours. */

export const site = {
  name: "ABC London Property Group",
  home: "https://abclondonproperty.co.uk/",
  privacy: "https://abclondonproperty.co.uk/privacy-policy",
  copyright: "Copyright © 2026 ABC London Property Group - All Rights Reserved.",
};

export const contact = {
  person: "Patrick",
  phone: { label: "+44 (0)7981 872685", short: "07981872685", href: "tel:+447981872685" },
  emails: [
    { label: "patrick@abclondonproperty.co.uk", href: "mailto:patrick@abclondonproperty.co.uk" },
    { label: "butler.london@gmail.com", href: "mailto:butler.london@gmail.com" },
  ],
  address: "The Mille, Great West Road, Brentford, UK",
  // The live "Get directions" button opens Google Maps directions to the address above.
  directions: "https://www.google.com/maps/dir/?api=1&destination=The+Mille%2C+Great+West+Road%2C+Brentford%2C+UK",
  hours: { label: "Hours", value: "08:00 to 18:00", note: "Office is Closed on Bank holidays" },
  heading: "Contact Us",
  strap: "Better yet, see us in person!",
  body: "We love to see our customers, so feel free to call us anytime to arrange a meeting.",
  form: "Drop us a line!",
};

export const linkedin = {
  label: "Connect With Us on linkedin",
  name: "LinkedIn",
  href: "https://www.linkedin.com/in/patrick-butler-07515569/",
};

/* The hero block. The live banner repeats "ABC LONDON PROPERTY GROUP CREATE OPPORTUNITY" as its heading. */
export const hero = {
  kicker: "ABC London Property Group",
  title: ["Create", "Opportunity"],
  lines: ["We work hard for our clients, HNW Investors, VC'S & Developers.", "Your Vision Delivered By ABC London Property Group."],
  cta: "For Development Opportunities call Patrick on 07981872685.",
  places: ["London", "Ireland", "Europe"],
  image: { src: "/media/hero.webp", mobile: "/media/hero-m.webp", alt: "A construction worker on a rooftop lift above the city at sunrise" },
};

/* "About ABC London Property / Why Choose Us?" The live paragraph is one block of 22 sentences. It is shown in full,
   in order, split into the lead, three passages and the closing line. Figures are the paragraph's own facts. */
export const about = {
  label: "About ABC London Property",
  heading: "Why Choose Us?",
  lead: "We have over 30 years experience in delivering luxury bespoke projects in London, Ireland and Europe. We help our clients diversify their investments to safe property opportunities.",
  passages: [
    "We find and create incredible development opportunities that offer unique objectives. Our experience in construction and development is our Gold. We believe that Bricks and Mortar investments are the safest assets on the planet. Choosing ABC London Property Group means opting for quality, reliability and a broad range of expertise in property investment and delivery thereafter.",
    "We offer investment advice and construction management services to valued clients. We are here for you the investor. It’s our mission to deliver your success while creating longevity in the investment cycle. We work diligently for you our client. We are above all discreet and private. We are dedicated to delivering results that align with your vision and goals.",
    "Our family have been delivering expertise and excellence in the construction business since our grandfather started building bespoke homes in Ireland in 1951. Our family values are that of honesty and integrity. A family ethos that stretches four generations. This has stood the test of time for us.",
  ],
  close: "We are here to help you.",
  facts: [
    { value: "30", suffix: "+", label: "Years delivering luxury bespoke projects" },
    { value: "1951", suffix: "", label: "Our grandfather started building bespoke homes in Ireland" },
    { value: "4", suffix: "", label: "Generations of honesty and integrity" },
  ],
  images: [
    { src: "/media/about-tower.webp", alt: "A tower crane lifting steel over a glass office building", w: 1200, h: 1600 },
    { src: "/media/about-roof.webp", alt: "Tower cranes on the skyline at sunset, seen across an open field", w: 1600, h: 1200 },
  ],
};

/* "Building Your Vision": four services, each with its full live copy. Photographs from the live gallery. */
export const vision = {
  heading: "Building Your Vision",
  items: [
    {
      title: "Custom Design Build",
      body: "At ABC London Property Group, we offer custom made alternative property investments. We offer design-build services to bring your vision to life. Our team works closely with you to understand your unique needs and preferences, and we create a customised plan that fits your investment goals.",
      image: { src: "/media/g-portico.webp", alt: "A white country house with a columned portico, finished and landscaped" },
    },
    {
      title: "Residential Construction",
      body: "Our residential construction service include everything from finding that new investment site or property in capital cities like London, Dublin and Paris. We also find and appraise alternative bricks and mortar investments in affluent and holistic areas of London, the UK and Ireland. We also provide construction services to our valued clients at their request. We focus on quality craftsmanship and attention to detail to ensure that your property is built to the highest bespoke standards. We want your investment to grow with grace and authenticity. Attracting the best in its class.",
      image: { src: "/media/g-house.webp", alt: "A detached family home with a stone porch, lawn and driveway" },
    },
    {
      title: "Project Management",
      body: "Our project management services ensure that your project is completed on time. We offer the best advice for investors. We take care of all aspects of the project, from planning and design to construction and handover. We see a good investment way ahead of the curve. If you are not talking to us your competitors are on our books.",
      image: { src: "/media/g-scaffold.webp", alt: "A London terrace under scaffolding and protective wrap" },
    },
    {
      title: "Expert Consulting",
      body: "Our team of experts can provide you with consulting services to help you make informed decisions about your investments. We can provide guidance on everything before you set out on your construction or refurbishment journey. Our mantra is if you start right, make informed decisions and plan right you will achieve excellence.",
      image: { src: "/media/g-view.webp", alt: "The view across the city from a steel-framed rooftop" },
    },
  ],
};

/* The other four photographs of the live gallery (8 in all; four lead the services above), with the paragraph's
   own lines about where the work has been done. */
export const work = {
  heading: "We have delivered projects in Ireland, London & The South East of England.",
  body: "During the 2000's our sister company successfully delivered residential projects in Eastern Europe for American blue chip companies.",
  images: [
    { src: "/media/g-castle.webp", alt: "A restored castellated house beside an old oak", w: 1600, h: 1200 },
    { src: "/media/g-wrap.webp", alt: "A London facade wrapped for refurbishment under a blue sky", w: 1600, h: 1200 },
    { src: "/media/g-brick.webp", alt: "A red brick house with a white entrance stair and gravel forecourt", w: 1600, h: 1200 },
    { src: "/media/g-limerick.webp", alt: "A red brick villa in Limerick, County Limerick", w: 1170, h: 1130 },
  ],
};

export const management = {
  heading: "Expert Construction Management Services",
  items: [
    { title: "Construction Planning and Scheduling", body: "Our team of experts will work with you to plan and schedule every aspect of your construction project, ensuring that it is completed on time and on budget." },
    { title: "Cost Estimating and Budgeting", body: "We provide accurate cost estimates and budgeting for your construction project, helping you to stay within your budget and achieve your goals." },
    { title: "Project Management and Oversight", body: "Our team can provide comprehensive project management and oversight to our clients upon request, ensuring that your construction project is completed to your specifications and tailored to your requirements." },
    { title: "Quality Control and Safety Management", body: "We prioritize safety and quality control in every aspect of our work, ensuring that your construction project is completed to the highest standards." },
    { title: "Design-Build Services", body: "Our team provides comprehensive design-build services, ensuring that your construction project is designed and built to your exact specifications." },
    { title: "Green Building and Sustainable Design", body: "We prioritize green building and sustainable design in every aspect of our work, helping you to achieve your sustainability goals while reducing your environmental impact." },
  ],
};

/* "WHAT CUSTOMERS SAY": the five reviews in the live widget (it shows three, "Show More" opens the rest). Text from
   the widget's data, attribution lines as the reviewers signed them. Dates as month and year. */
export const reviews = {
  heading: "What Customers Say",
  items: [
    {
      title: "Main Contractor",
      quote: "I have had the pleasure of working with Patrick over many years on a number of our projects in London, Ireland and Eastern Europe. I commend Patrick for his leadership qualities, knowledge and work ethic.",
      after: "He is a man of absolute integrity.",
      name: "Brian McCarthy", role: "Director, BMCC Project Management", date: "October 2026",
    },
    {
      title: "Developer",
      quote: "We found Patrick and his company diligent, hard working, honest and knowledgeable.",
      after: "Patrick completed a number of projects over a number of years for us. He diligently completed tedious listed building refurbishments, home construction and civil engineering work.",
      name: "Frank Burke", role: "Chairman, Farmglade", date: "February 2025",
    },
    {
      title: "Facade Contractor London",
      quote: "We found Patrick and his team to be very competent and knowledgable, diligent in their work and passionate about delivering high standards.",
      after: "",
      name: "John O’Sullivan", role: "Managing Director, Rosewood Ltd.", date: "March 2023",
    },
    {
      title: "Architect",
      quote: "Patrick Butler and his team provided a very friendly, efficient and helpful service, giving very useful information and advice and working throughout the process to clients’ needs. The project was delivered diligently. What if: projects Ltd. look forward to working with Patrick Butler again in the future.",
      after: "",
      name: "Gareth Morris", role: "Director, What if: projects Ltd.", date: "May 2013",
    },
    {
      title: "Home Refurbishment London",
      quote: "Patrick and his team took on the brief with utter professionalism. Patrick is dedicated, committed and a perfectionist.",
      after: "",
      name: "Sarah & Luke Oubridge", role: "", date: "August 2015",
    },
  ],
};

/* Homepage sections for the menu (scroll targets) and the live site's own pages. */
export const sections = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Construction Management", href: "#management" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];
