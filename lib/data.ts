export const site = {
  name: 'Umar Ali Butt',
  email: 'ub1894497@gmail.com',
  location: 'Islamabad, PK',
  links: {
    dribbble: 'https://dribbble.com/umar__ali__butt',
    linkedin: 'https://www.linkedin.com/in/umar-ali-butt-7213a7224/',
    upwork: 'https://www.upwork.com/freelancers/~01fbaab0f0eb29dd61',
    behance: 'https://www.behance.net/s325',
  },
  // "Download my CV" / "Grab my CV" buttons on Home and About.
  cv: '/umar-ali-butt-cv.pdf',
  // "Book a 20-min call" buttons (Two ways in). Empty falls back to /contact.
  cal: 'https://calendly.com/ub1894497/30min',
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID || '',
};
