export const profile = {
  name: "Charles Bertrand",
  role: "Conseiller en Gestion de Patrimoine",
  tagline:
    "Aspirant conseiller patrimonial, je cherche à approfondir mes compétences en gestion financière pour offrir des conseils stratégiques. Fort d'une expérience dans le domaine de la vente, je suis déterminé à contribuer activement à la réussite financière de mes futurs clients.",
  email: "Bertrand.charles.pro@gmail.com",
  phone: "07 76 69 33 68",
  location: "Rillieux-la-Pape, France",
  birthDate: "2003-05-09",
  drivingLicense: "Permis B",
};

export const about = `Après un parcours dans la négociation commerciale et immobilière (Century 21, Laforêt), j'ai choisi de me spécialiser dans le conseil patrimonial. Depuis 2024, j'exerce en tant que conseiller particulier au sein d'agences LCL, où je gère un portefeuille de clients patrimoniaux : rendez-vous patrimoniaux, allocation d'actifs, financement immobilier. Admis en 2025 au Mastère Conseiller Patrimonial du Dirigeant (ESBanque), je poursuis aujourd'hui ma formation pour devenir Conseiller en Gestion de Patrimoine.`;

export interface Experience {
  role: string;
  contract: string;
  company: string;
  period: string;
  current?: boolean;
  tasks: string[];
}

export const experiences: Experience[] = [
  {
    role: "Conseiller particulier",
    contract: "Contrat d'apprentissage",
    company: "LCL — Agence de Saint-Genis-Laval",
    period: "Septembre 2025 — Mai 2027",
    current: true,
    tasks: [
      "Gestion d'un portefeuille de clients patrimoniaux : rendez-vous patrimoniaux complets, conquête et fidélisation, développement des encours",
      "Analyse des besoins clients : prêts immobiliers, allocation d'actifs",
      "Suivi personnalisé pour fidéliser la clientèle",
    ],
  },
  {
    role: "Conseiller particulier",
    contract: "Contrat d'apprentissage",
    company: "LCL — Agence de Caluire-et-Cuire",
    period: "Septembre 2024 — Septembre 2025",
    tasks: [
      "Analyse des besoins clients et proposition de solutions adaptées",
      "Gestion des comptes courants et produits d'épargne (livrets, PEL...)",
      "Suivi personnalisé pour fidéliser la clientèle",
    ],
  },
  {
    role: "Négociateur immobilier",
    contract: "Contrat d'apprentissage",
    company: "Laforêt — Meyzieu",
    period: "Février 2023 — Août 2024",
    tasks: [
      "Négociation, veille concurrentielle et veille de marché",
      "Estimation patrimoniale et conseils clients",
      "Conseil juridique et financier, commercialisation des biens",
    ],
  },
  {
    role: "Conseiller immobilier",
    contract: "Contrat d'apprentissage",
    company: "Century 21 — Agence du Camp",
    period: "Septembre 2022 — Février 2023",
    tasks: [
      "Recherche et évaluation de biens immobiliers",
      "Organisation de visites et négociation des conditions",
      "Commercialisation des biens",
    ],
  },
];

export interface EducationItem {
  year: string;
  title: string;
  school?: string;
}

export const education: EducationItem[] = [
  {
    year: "2025",
    title: "Admission en Mastère Conseiller Patrimonial du Dirigeant",
    school: "ESBanque",
  },
  {
    year: "2024 — 2025",
    title: "Bac+3 CPAT Conseiller de Patrimoine",
  },
  {
    year: "2022 — 2024",
    title: "BTS NDRC — Négociation et Digitalisation de la Relation Client",
    school: "Institut Carrel",
  },
  {
    year: "2022",
    title: "Baccalauréat professionnel Métiers du Commerce et de la Vente — mention Très Bien",
    school: "Lycée Saint-Charles",
  },
];

export const interests = ["Sport", "Informatique", "Finance", "Musique"];

export interface Skill {
  name: string;
  level: number;
}

export const skills: Skill[] = [
  { name: "Canva", level: 86 },
  { name: "WordPress", level: 77 },
  { name: "Adobe Photoshop", level: 71 },
  { name: "Prestashop", level: 70 },
  { name: "Adobe Premiere Pro", level: 63 },
];

export interface Language {
  name: string;
  level: string;
}

export const languages: Language[] = [
  { name: "Anglais", level: "B1" },
  { name: "Italien", level: "A1" },
  { name: "Espagnol", level: "A1" },
];

export interface Project {
  title: string;
  description: string;
  link: string;
  linkLabel: string;
}

export const projects: Project[] = [
  {
    title: "PatriSim",
    description:
      "Simulateur patrimonial pour Conseillers en Gestion de Patrimoine : bilan patrimonial, simulateurs fiscaux (IR, IFI), comparateur RCM/PFU, projections retraite et succession.",
    link: "https://charlesbertrand.vercel.app",
    linkLabel: "Voir la démo",
  },
];

export const achievement = {
  title: "Concours « Journée de la Négociation »",
  description: "1ère place sur 60 participants",
};
