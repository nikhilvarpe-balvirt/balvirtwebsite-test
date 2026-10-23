// ============================================================================
//  LEADERS: names, bios and quotes are the founder's text; the photos are the
//  sample images in /images/team (replace with final approved photos when ready).
//  JOURNEY (further down): draft story text with draft illustrations.
// ============================================================================

export const LEADERS = [
  {
    role: 'Founder & CEO | Balvirt',
    name: 'Ramdas Darade',
    tagline: 'An entrepreneur driven by innovation, people, and purpose.',
    bio: 'With a strong foundation in Oracle NetSuite, enterprise technology, and business leadership, Ramdas founded Balvirt with a vision to build a globally trusted technology company. His leadership philosophy centers on delivering meaningful business outcomes, fostering innovation, and creating opportunities for talented professionals. He believes sustainable success comes from combining technology excellence with strong relationships, accountability, and continuous growth.',
    quote: 'Success is not just about building a company. It is about creating opportunities, empowering people, and making a lasting impact.',
    featured: true,
    photo: '/images/team/founder-v2.webp',
    linkedin: '',
  },
  {
    role: 'Chief Operating Officer (COO) | Balvirt',
    name: 'Somnath Darade',
    bio: 'At the heart of Balvirt people and operations, Somnath combines his expertise in Oracle NetSuite development with a passion for building strong teams. He focuses on nurturing talent, fostering a positive work culture, and creating an environment where employees thrive and contribute to the company long-term success.',
    quote: 'Our people are our greatest strength. When we invest in their growth, we invest in the future of Balvirt.',
    photo: '/images/team/coo-v2.webp',
    linkedin: '',
  },
]

// Journey text: the founder's draft story, lightly edited for flow (facts unchanged).
// The pictures are DRAFT ILLUSTRATIONS (/images/journey/<year>.svg). To use a real photo, add it to
// public/images/journey/ and change the 'image' path below (landscape 3:2, at least 1200px wide).
// 'extra' = small photos shown under the main picture. 'images' (two portrait photos shown side by side) can be used instead of a single 'image'.
export const JOURNEY = [
  {
    year: '2022',
    title: 'Where the Vision Began',
    summary: "Balvirt's journey began in 2022 on a humble farm in a small village. With limited resources and no established roadmap, we relied on our technical skills, self-confidence and determination to create something meaningful.",
    more: ['What started as a vision became the foundation of our entrepreneurial journey.'],
    chips: ['A small farm', 'A small village', 'Founded 2022'],
    image: '/images/journey/2022.webp',
    alt: 'Ramdas Darade, founder of Balvirt, working at his desk',
  },
  {
    year: '2023',
    title: 'The Beginning of Change',
    summary: 'In 2023, that vision began taking shape. With growing experience, new learnings and a clearer direction, we started turning our early efforts into a more structured business journey.',
    more: ['Every challenge became a lesson, every opportunity a step forward, and every small achievement strengthened our belief in what we could build.'],
    quote: 'Our journey was never about where we started, but how far we were willing to go.',
    motto: 'Built on Skills. Driven by Willpower. Inspired by Vision.',
    chips: ['More experience', 'A clearer direction'],
    images: [
      { src: '/images/journey/2023-a.webp', alt: 'Ramdas Darade with the team and their families at the small workplace entrance, decorated with flowers for a celebration' },
      { src: '/images/journey/2023-b.webp', alt: 'The newly set up office, decorated with marigold garlands, with new chairs and glass cabins' },
    ],
  },
  {
    year: '2024',
    title: 'Turning Challenges into Opportunities',
    summary: 'By 2024, the journey that began on a small farm was gaining stronger direction and purpose. With every project, every challenge and every new learning, we kept building our technical expertise and strengthening our foundation.',
    more: [
      'What once started as a dream was gradually becoming a growing business vision.',
      'We learned that progress is not always about taking giant leaps. Sometimes it is about staying consistent, believing in our abilities, and moving forward when the path is uncertain.',
    ],
    quote: '2024 was a year of learning, strengthening our foundation and preparing for bigger possibilities.',
    motto: 'Growing with Experience. Advancing with Purpose.',
    chips: ['Learning', 'A stronger foundation'],
    image: '/images/journey/2024.webp',
    alt: 'Ramdas Darade outside a client site in Sweden, standing by the Kontor / Office sign',
  },
  {
    year: '2025',
    title: 'From a Small Village to a Growing IT Company',
    summary: 'In 2025, we took a significant step forward by moving from our village beginnings to a small city, creating a better environment for innovation, collaboration and growth.',
    more: [
      'This transition opened new opportunities, improved access to essential facilities, and gave our team a more professional workplace.',
      'What began with just one employee and a powerful belief in our skills has grown into a team of 20+ talented professionals, supported by good infrastructure and a shared vision for the future.',
      'From a humble farm to a professional IT workplace, every step reflects our commitment to growth, teamwork and innovation.',
    ],
    quote: 'Success is not determined by where you begin, but by the courage to dream, the discipline to work, and the determination to keep moving forward.',
    motto: 'From One to Many. From a Dream to a Growing Reality.',
    chips: ['Village to city', 'One employee to 20+'],
    image: '/images/journey/2025.webp',
    alt: 'The new three-storey Balvirt office building at sunset, with its illuminated entrance',
    extra: [
      { src: '/images/journey/2025-b.webp', alt: 'The Balvirt reception with the logo wall, a sofa and celebration balloons' },
      { src: '/images/journey/2025-c.webp', alt: 'The open workspace with long desks, new chairs and colourful meeting nooks' },
      { src: '/images/journey/2025-d.webp', alt: 'A meeting room with the wall message “We don’t do average, we do awesome”' },
    ],
  },
  {
    year: '2026',
    title: 'Building the Future, Together',
    summary: 'In 2026, Balvirt entered a new chapter of growth, strengthening its foundation as a technology-driven company with a clear vision for the future. With a team of 20+ talented professionals, improved infrastructure and a growing portfolio of IT services, we continue to turn our original vision into meaningful solutions for businesses.',
    more: [
      'From our humble beginnings on a small farm to a professional workplace in Sangamner, our journey reflects the power of skills, teamwork and perseverance. We are expanding our capabilities, nurturing young talent through training and internships, and embracing new technologies to create greater opportunities.',
      'For us, growth is not just about building a company. It is about building people, creating possibilities, and delivering value through technology.',
    ],
    motto: 'Innovate. Collaborate. Elevate.',
    chips: ['20+ professionals', '4th Foundation Day'],
    image: '/images/journey/2026.webp',
    alt: 'The Balvirt team and honoured guests together in the new office, in front of the Mission and Core Values wall',
    extra: [
      { src: '/images/journey/2026-b.webp', alt: 'The Balvirt team in white outfits standing in front of the Mission and Core Values wall' },
      { src: '/images/journey/2026-c.webp', alt: 'The Balvirt team holding the new 2026 company diaries at the foundation day celebration' },
    ],
  },
]

export const JOURNEY_CLOSING = 'The journey that began with one employee and a dream continues with a team, a stronger foundation, and ambitions beyond boundaries.'
