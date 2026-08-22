export type IndustryVisualId =
  | 'home-services'
  | 'dental'
  | 'law-firms'
  | 'real-estate'
  | 'property-management'
  | 'accounting'
  | 'medical-practices'
  | 'automotive'
  | 'ecommerce'

export type IndustryVisual = {
  id: IndustryVisualId
  src: `/images/industries/${string}.jpg`
  alt: string
  objectPosition: string
  photographer: string
  sourceUrl: string
  width: number
  height: number
}

export const industryVisuals: Record<IndustryVisualId, IndustryVisual> = {
  'home-services': {
    id: 'home-services',
    src: '/images/industries/home-services.jpg',
    alt: 'HVAC technician servicing an air-conditioning system',
    objectPosition: '50% 58%',
    photographer: 'José Andrés Pacheco Cortes',
    sourceUrl: 'https://www.pexels.com/photo/man-repairing-an-aircon-5463580/',
    width: 4000,
    height: 6000,
  },
  dental: {
    id: 'dental',
    src: '/images/industries/dental.jpg',
    alt: 'Patient speaking with a receptionist at a dental practice',
    objectPosition: '50% 43%',
    photographer: 'Pavel Danilyuk',
    sourceUrl: 'https://www.pexels.com/photo/dental-clinic-receptionist-with-patient-6812439/',
    width: 3654,
    height: 5473,
  },
  'law-firms': {
    id: 'law-firms',
    src: '/images/industries/law-firms.jpg',
    alt: 'Attorney meeting with clients in an office',
    objectPosition: '56% 50%',
    photographer: 'Pavel Danilyuk',
    sourceUrl: 'https://www.pexels.com/photo/clients-and-lawyer-in-an-office-8112166/',
    width: 5752,
    height: 3840,
  },
  'real-estate': {
    id: 'real-estate',
    src: '/images/industries/real-estate.jpg',
    alt: 'Real estate agent showing a home to prospective clients',
    objectPosition: '50% 45%',
    photographer: 'Ivan S',
    sourceUrl: 'https://www.pexels.com/photo/real-estate-agent-showing-an-apartment-to-people-8962571/',
    width: 5472,
    height: 3648,
  },
  'property-management': {
    id: 'property-management',
    src: '/images/industries/property-management.jpg',
    alt: 'Modern residential apartment complex',
    objectPosition: '50% 50%',
    photographer: 'Mahmoud Zakariya',
    sourceUrl: 'https://www.pexels.com/photo/modern-apartment-building-in-urban-setting-34365487/',
    width: 4096,
    height: 3072,
  },
  accounting: {
    id: 'accounting',
    src: '/images/industries/accounting.jpg',
    alt: 'Accountant reviewing financial documents at a desk',
    objectPosition: '45% 50%',
    photographer: 'Mikhail Nilov',
    sourceUrl: 'https://www.pexels.com/photo/woman-in-polo-long-sleeves-computing-using-a-calculator-8297044/',
    width: 6000,
    height: 4000,
  },
  'medical-practices': {
    id: 'medical-practices',
    src: '/images/industries/medical-practices.jpg',
    alt: 'Patient speaking with medical reception staff',
    objectPosition: '39% 55%',
    photographer: 'Cedric Fauntleroy',
    sourceUrl: 'https://www.pexels.com/photo/a-receptionist-smiling-at-a-person-4269203/',
    width: 8134,
    height: 5423,
  },
  automotive: {
    id: 'automotive',
    src: '/images/industries/automotive.jpg',
    alt: 'Mechanic inspecting a vehicle engine in a repair shop',
    objectPosition: '50% 55%',
    photographer: 'Artem Podrez',
    sourceUrl: 'https://www.pexels.com/photo/a-mechanic-fixing-a-car-engine-8985456/',
    width: 6018,
    height: 3385,
  },
  ecommerce: {
    id: 'ecommerce',
    src: '/images/industries/ecommerce.jpg',
    alt: 'Warehouse employee processing customer orders',
    objectPosition: '50% 55%',
    photographer: 'Tima Miroshnichenko',
    sourceUrl: 'https://www.pexels.com/photo/business-man-writing-on-a-paper-6169170/',
    width: 4000,
    height: 6000,
  },
}

const visualIdByIndustryName: Record<string, IndustryVisualId> = {
  'Home Services': 'home-services',
  'Dental Practices': 'dental',
  'Law Firms': 'law-firms',
  'Real Estate': 'real-estate',
  'Property Management': 'property-management',
  Accounting: 'accounting',
  'Medical Practices': 'medical-practices',
  Automotive: 'automotive',
  'E-commerce': 'ecommerce',
}

export function getIndustryVisual(industryName: string) {
  return industryVisuals[visualIdByIndustryName[industryName]]
}
