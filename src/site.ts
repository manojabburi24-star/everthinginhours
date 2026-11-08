// Single place for contact details and social links.
// TODO: replace the placeholders with the real accounts before launch.
export const site = {
  // Enquiries from the contact form are delivered here via WhatsApp.
  phone: '+91 90635 02404',
  phoneHref: 'tel:+919063502404',
  whatsapp: '919063502404', // international format, no + or spaces (used in wa.me links)
  email: 'hello@everythinginhours.com',
  instagram: 'https://www.instagram.com/',
  linkedin: 'https://www.linkedin.com/',
}

export const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#why-us', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
]

export const serviceNames = [
  'Branding & Visual Identity',
  'Website Design & Development',
  'Social Media Management',
  'Creative Content & Reels',
  'Digital Marketing & Growth',
]

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
