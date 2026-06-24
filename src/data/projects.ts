const IMAGEKIT_URL = import.meta.env.VITE_IMAGEKIT_URL || "https://ik.imagekit.io/15s95izzpx";

export const getImg = (path: string, transform?: string) => {
  const baseUrl = `${IMAGEKIT_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  const encodedUrl = encodeURI(baseUrl);
  return transform ? `${encodedUrl}?tr=${transform}` : encodedUrl;
};

export interface Project {
  id: number;
  slug: string;
  title: string;
  location: string;
  type: string;
  area: string;
  price: string;
  tag: string;
  category: "Plots" | "Residential" | "Premium";
  img: string;
  featured: boolean;
  wide: boolean;
  desc: string;
  detailedDesc?: string;
  whyChoose?: Array<{ title: string; desc: string }>;
  highlights?: string[];
  phases?: Array<{ name: string; total: number; available: number; detail?: string }>;
  pricing?: {
    rate?: string;
    centPrice?: string;
    startingSize?: string;
    advance?: string;
    details?: string[];
  };
  paymentPlan?: string;
  locationAdvantages?: string[];
  faqs?: Array<{ q: string; a: string }>;
  gallery?: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "fairland",
    title: "Fairland Township",
    location: "NH-44, Ayyankottai",
    type: "Plotted Township",
    area: "40 Acres",
    price: "DTCP Approved",
    tag: "Featured",
    category: "Plots",
    img: getImg("True waves/True waves Reality/fairland/1.jpeg"),
    featured: true,
    wide: true,
    desc: "A masterplanned gated community with full infrastructure, maze garden, and 40-ft grand entrance.",
    detailedDesc: "Fairland Township is a premium 40-acre integrated residential community strategically located on the Madurai–Dindigul National Highway (NH-44) at Ayyankottai. Developed by Desam Developers Pvt. Ltd., this thoughtfully planned township offers DTCP-approved residential plots, ready-to-move homes, and modern infrastructure in one of the fastest-growing investment corridors near Madurai.\n\nLocated just 300 metres from Ayyankottai Bus Stand and opposite Temple City Hotel, Fairland offers seamless connectivity to Madurai city, Dindigul, educational institutions, hospitals, and major business hubs.\n\nWhether you are planning to build your dream home or invest in a fast-appreciating location, Fairland offers the perfect combination of affordability, connectivity, and long-term value.",
    whyChoose: [
      {
        title: "DTCP Approved Residential Plots",
        desc: "Secure your investment with legally approved residential plots designed for safe and hassle-free ownership."
      },
      {
        title: "Prime Highway Location",
        desc: "Located directly on Madurai–Dindigul NH-44, ensuring easy accessibility and better appreciation potential."
      },
      {
        title: "Affordable Investment Opportunity",
        desc: "Starting at competitive pricing, Fairland offers affordable plots suitable for first-time buyers and investors."
      },
      {
        title: "Peaceful Community Living",
        desc: "Experience spacious layouts, wide roads, and a calm environment designed for comfortable family living."
      },
      {
        title: "Strong Future Growth Potential",
        desc: "Located in a rapidly developing corridor with increasing infrastructure and residential demand."
      }
    ],
    highlights: [
      "DTCP Approved Residential Plots",
      "Premium 40 Acre Township",
      "Located at Ayyankottai, NH-44",
      "Ready to Move-In Options Available",
      "20 Beautifully Built Villas",
      "1 BHK, 2 BHK, 3 BHK & 4 BHK Home Configurations",
      "Well-Planned Internal Roads",
      "Easy Bank Loan Support (up to 80% through HDFC & PNB)",
      "High Appreciation Investment Corridor"
    ],
    phases: [
      { name: "Phase 1", total: 202, available: 25, detail: "Guideline Value: Rs. 270 per sq ft" },
      { name: "Phase 2", total: 170, available: 100, detail: "Guideline Value: Rs. 500 per sq ft" },
      { name: "Phase 3", total: 185, available: 131, detail: "Guideline Value: Rs. 500 per sq ft" },
      { name: "Phase 4", total: 64, available: 64, detail: "Area: 2.7 Acres (1,02,680 sq ft)" }
    ],
    pricing: {
      rate: "Rs. 1380 per sq ft",
      centPrice: "Rs. 6 Lakhs per Cent (1 Cent = 435.6 sq ft)",
      startingSize: "15 × 30 (450 sq ft plot area, 180 sq ft road area, total dimensions 630 sq ft)",
      advance: "Rs. 1,00,000 for Booking Advance",
      details: [
        "Guideline Value phase 2 & 3 only online amount accepted (RTGS, NEFT, DD, Cheque).",
        "Balance amount and registration fee only accepted offline."
      ]
    },
    paymentPlan: "Partial offline bank loan options available with HDFC and PNB for up to 80% plot value. Guideline value must be paid online (RTGS/NEFT/DD/Cheque), registration charges and balance payment are accepted offline.",
    locationAdvantages: [
      "300 Metres from Ayyankottai Bus Stand",
      "Opposite Temple City Hotel",
      "Easy Access to Madurai City",
      "Direct NH-44 Connectivity",
      "Nearby Schools & Colleges",
      "Close to Hospitals & Daily Essentials",
      "Growing Residential Corridor"
    ],
    faqs: [
      {
        q: "Is Fairland DTCP Approved?",
        a: "Yes, Fairland Township offers DTCP-approved residential plots for secure investment."
      },
      {
        q: "Where is Fairland Located?",
        a: "Fairland is located at Ayyankottai on Madurai–Dindigul National Highway (NH-44)."
      },
      {
        q: "Are Bank Loans Available?",
        a: "Yes, plot loans up to 80% are available through leading banks like HDFC and PNB."
      },
      {
        q: "What is the Starting Plot Size?",
        a: "Starting plot dimensions begin from 15 × 30 (total area 630 sq ft including road share)."
      },
      {
        q: "Is This Suitable for Investment?",
        a: "Yes, the location offers strong appreciation potential due to highway connectivity and surrounding growth."
      },
      {
        q: "Are Ready-to-Move Homes Available?",
        a: "Yes, villas and multiple home configurations (1, 2, 3, and 4 BHK) are available."
      }
    ],
    gallery: [
      getImg("True waves/True waves Reality/fairland/1.jpeg"),
      getImg("True waves/True waves Reality/fairland/2.jpeg"),
      getImg("True waves/True waves Reality/fairland/3.jpeg"),
      getImg("True waves/True waves Reality/fairland/4.jpeg"),
      getImg("True waves/True waves Reality/fairland/5.jpeg"),
      getImg("True waves/True waves Reality/fairland/6.JPG"),
      getImg("True waves/True waves Reality/fairland/7.JPG"),
      getImg("True waves/True waves Reality/fairland/8.JPG"),
      getImg("True waves/True waves Reality/fairland/9.JPG"),
      getImg("True waves/True waves Reality/fairland/10.JPG"),
    ]
  },
  {
    id: 2,
    slug: "alagar-homes",
    title: "Alagar Homes",
    location: "Nethaji Main Road",
    type: "Residential Apartments",
    area: "1, 2 & 2.5 BHK",
    price: "Premium Living",
    tag: "BB Kulam",
    category: "Residential",
    img: "/assets/images/other images/Alagar Homes.png",
    featured: false,
    wide: false,
    desc: "RCC framed structure with full-body vitrified tile flooring and premium teak wood main door.",
    detailedDesc: "Alagar Homes by True Waves offers exceptionally crafted residential apartments located in Nethaji Main Road, BB Kulam. Combining structural excellence with premium finishing, this development is built for families looking for a combination of space, community, and centrality in Madurai.",
    whyChoose: [
      {
        title: "Premium Build Quality",
        desc: "RCC framed earthquake-resistant structure with premium vitrified tiling and teak wood details."
      },
      {
        title: "Central Location",
        desc: "Located on Nethaji Main Road, providing quick access to schools, offices, and supermarkets."
      },
      {
        title: "Excellent Ventilation",
        desc: "Designed with maximum window openings and cross-ventilation for natural light and breeze."
      }
    ],
    highlights: [
      "Vitrified tile flooring throughout the apartment",
      "Teak wood main entrance doors for enhanced security",
      "Premium CP fittings in bathrooms and kitchen",
      "24/7 security & power backup in common areas",
      "Dedicated covered car parking slots"
    ],
    locationAdvantages: [
      "Supermarkets and local markets within 500m",
      "Close proximity to key schools and colleges in Madurai",
      "Excellent bus and public transport connectivity"
    ],
    faqs: [
      {
        q: "What configurations are available?",
        a: "Alagar Homes offers 1, 2, and 2.5 BHK configurations designed for modern families."
      },
      {
        q: "Are bank loans approved?",
        a: "Yes, the project is approved by major banks for home loans."
      }
    ],
    gallery: [
      getImg("True waves/True waves Reality/alagar homes/1.mp4"),
    ]
  },
  {
    id: 3,
    slug: "vishal-virinchi",
    title: "Vishal's Virinchi",
    location: "Iyer Bungalow",
    type: "Luxury Apartments",
    area: "3 BHK",
    price: "Serene Living",
    tag: "Naganakulam",
    category: "Premium",
    img: "/assets/images/other images/vishal virinchi main.png",
    featured: true,
    wide: false,
    desc: "Signature curved contemporary facade design with rooftop access and premium finishes throughout.",
    detailedDesc: "Vishal's Virinchi represents luxury residential living at Naganakulam near Iyer Bungalow, Madurai. Featuring a signature curved contemporary facade, top-tier rooftop amenities, and high-end sanitary fittings, this project is designed for the modern homeowner seeking an elegant lifestyle.",
    whyChoose: [
      {
        title: "Signature Architecture",
        desc: "Contemporary curved facade that stands out as a landmark in Naganakulam."
      },
      {
        title: "Rooftop Amenities",
        desc: "Exquisite rooftop access designed for leisure, family gatherings, and panoramic views."
      },
      {
        title: "Luxury Interiors",
        desc: "Premium quality marbles, high-end electricals, and custom bathroom fixtures."
      }
    ],
    highlights: [
      "Curved Architectural Facade Design",
      "3 BHK Spacious Layouts",
      "Premium Sanitary and CP Fittings",
      "Rooftop recreation zone",
      "Advanced security and CCTV surveillance"
    ],
    locationAdvantages: [
      "Located in the highly sought-after Naganakulam / Iyer Bungalow area",
      "10 minutes drive to major hospitals",
      "Walkable distance to key parks and daily essentials"
    ],
    faqs: [
      {
        q: "What is the size of the 3 BHK apartments?",
        a: "Please get in touch with our representative for exact unit layouts and floor plans."
      },
      {
        q: "Is it ready for possession?",
        a: "Yes, this is an completed, premium residential project ready for handover."
      }
    ],
    gallery: [
      "/assets/images/other images/vishal virinchi main.png",
      getImg("True waves/True waves Reality/vishal virinchi/2.png"),
      getImg("True waves/True waves Reality/vishal virinchi/3.png"),
      getImg("True waves/True waves Reality/vishal virinchi/4.png"),
      getImg("True waves/True waves Reality/vishal virinchi/5.png"),
      getImg("True waves/True waves Reality/vishal virinchi/6.png"),
      getImg("True waves/True waves Reality/vishal virinchi/7.png"),
    ]
  },
  {
    id: 4,
    slug: "parivakkam",
    title: "Parivakkam",
    location: "Poonamallee, Chennai",
    type: "Approved Plot (Upcoming)",
    area: "Gated Villa Plots",
    price: "Upcoming",
    tag: "Pre-launch",
    category: "Plots",
    img: getImg("True waves/True waves Reality/fairland/2.jpeg"),
    featured: false,
    wide: true,
    desc: "A premier CMDA & RERA approved gated villa plot community in Poonamallee, Chennai with 5-year free maintenance.",
    detailedDesc: "Parivakkam is a premier gated villa plot community strategically located in Poonamallee, in the western part of Chennai, Tamil Nadu. Positioned near the high-growth corridors of Porur and Maduravoyal, this site falls within the Chennai Metropolitan Region and offers a mix of urban residential convenience and rapidly growing commercial developments.\n\nDesigned as a fully integrated gated community, Parivakkam benefits from outstanding transportation connectivity through major road networks, including the Chennai Bypass and arterial roads. It is situated adjacent to the ORR Poonamallee junction, just 5 minutes from the Poonamallee Bus Stand, a few meters from the upcoming Metro Station, and 10 minutes from the Avadi Railway Station.\n\nWith close proximity to major educational institutions, healthcare facilities, shopping, and industrial establishments, Parivakkam is the perfect location for building your dream villa or securing a high-appreciating asset in western Chennai.",
    whyChoose: [
      {
        title: "CMDA & RERA Approved Layout",
        desc: "Enjoy absolute legal peace of mind with 100% approved layouts ready for immediate villa construction and secure registration."
      },
      {
        title: "Unmatched Connectivity Hub",
        desc: "Located adjacent to ORR Poonamallee junction, just 5 minutes from Poonamallee Bus Stand and a few meters from the upcoming Metro Station."
      },
      {
        title: "Premium Integrated Infrastructure",
        desc: "Features underground drainage, electricity, wide B.T. (blacktop) roads, street lighting, and rainwater harvesting."
      },
      {
        title: "5 Years Free Maintenance",
        desc: "Benefit from zero maintenance headaches with five years of professional estate upkeep provided completely free for all buyers."
      },
      {
        title: "High Security Gated Living",
        desc: "Equipped with 24/7 professional security, CCTV surveillance, an all-round compound wall, and solar fencing."
      }
    ],
    highlights: [
      "CMDA & RERA Approved Layout of Villa Plots",
      "Integrated Gated Community",
      "Underground Drainage & Electricity",
      "Avenue Plantation with Paver Blocks",
      "Kids Play Area & Landscape View Benches",
      "All B.T. (Blacktop) Roads with Street Lighting",
      "Excellent Landscaping & Walking Footpath",
      "Rainwater Harvesting & 24-Hr Water Supply",
      "24-Hr Professional Security with CCTV Cameras",
      "100% Vastu Compliant Plots",
      "Free Maintenance for Five Years",
      "All-round Compound Wall with Solar Fencing"
    ],
    locationAdvantages: [
      "Few Meters from the Upcoming Metro Station",
      "Adjacent to the ORR Poonamallee Junction",
      "5 Minutes from Poonamallee Bus Stand",
      "10 Minutes from Avadi Railway Station",
      "Near Porur and Maduravoyal High-Growth Hubs",
      "Close Proximity to Schools, Colleges, and Social Infrastructure",
      "Easy Access to Western Chennai Commercial & Industrial Hubs"
    ],
    faqs: [
      {
        q: "Is Parivakkam approved?",
        a: "Yes, Parivakkam is a 100% CMDA & RERA approved villa plot layout."
      },
      {
        q: "Where is the project located?",
        a: "It is located in Poonamallee in the western part of Chennai, Tamil Nadu, near Porur and Maduravoyal."
      },
      {
        q: "What are the nearest transport hubs?",
        a: "The project is adjacent to the ORR Poonamallee junction, 5 minutes from Poonamallee Bus Stand, a few meters from the Metro Station, and 10 minutes from Avadi Railway Station."
      },
      {
        q: "What is the maintenance plan?",
        a: "Every buyer receives 5 years of completely free maintenance and estate upkeep managed by our professional team."
      },
      {
        q: "What community facilities are included?",
        a: "The gated community includes underground drainage, electricity, B.T. roads, street lighting, a compound wall with solar fencing, 24/7 security with CCTV, a kids' play area, walking footpaths, and vastu-compliant layout plans."
      }
    ],
    gallery: [
      getImg("True waves/True waves Reality/fairland/2.jpeg"),
      getImg("True waves/True waves Reality/fairland/3.jpeg"),
      getImg("True waves/True waves Reality/fairland/4.jpeg"),
    ]
  }
];
