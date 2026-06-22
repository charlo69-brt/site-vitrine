export const profile = {
  name: "Charles Bertrand",
  role: "Conseiller en Gestion de Patrimoine",
  tagline:
    "Aspirant conseiller patrimonial, je cherche à approfondir mes compétences en gestion financière pour offrir des conseils stratégiques. Fort d'une expérience dans le domaine de la vente, je suis déterminé à contribuer activement à la réussite financière de mes futurs clients.",
  email: "Bertrand.charles.pro@gmail.com",
  phone: "07 76 69 33 68",
  location: "Rillieux-la-Pape, France",
  // Année seule (et non la date exacte) : suffit à calculer l'âge sans exposer
  // la date de naissance complète, une donnée sensible (usurpation d'identité).
  birthYear: 2003,
  drivingLicense: "Permis B",
};

export const about = `Après un parcours dans la négociation commerciale et immobilière (Century 21, Laforêt), j'ai choisi de me spécialiser dans le conseil patrimonial. Depuis 2024, j'exerce en tant que conseiller particulier au sein d'agences LCL, où je gère un portefeuille de clients patrimoniaux : rendez-vous patrimoniaux, allocation d'actifs, financement immobilier. Admis en 2025 au Mastère Conseiller Patrimonial du Dirigeant (ESBanque), je poursuis aujourd'hui ma formation pour devenir Conseiller en Gestion de Patrimoine.`;

export type TimelineKind = "experience" | "education";

export interface TimelineEntry {
  kind: TimelineKind;
  /** ISO yyyy-mm, used to position the entry chronologically on the chart */
  date: string;
  label: string;
  org?: string;
  period: string;
  current?: boolean;
  /**
   * Illustrative career-progression index (not a real financial metric) used to
   * draw the "stock chart" — hand-tuned to climb faster once the path turns
   * toward gestion de patrimoine (BTS NDRC → LCL → Mastère).
   */
  score: number;
  details: string[];
}

export const timeline: TimelineEntry[] = [
  {
    kind: "education",
    date: "2022-06",
    label: "Baccalauréat professionnel Métiers du Commerce et de la Vente",
    org: "Lycée Saint-Charles — mention Très Bien",
    period: "2022",
    score: 30,
    details: [
      "Relation client, vente-conseil et fidélisation",
      "Animation et gestion de l'espace commercial",
      "Obtenu avec mention Très Bien",
    ],
  },
  {
    kind: "experience",
    date: "2022-09",
    label: "Conseiller immobilier",
    org: "Century 21 — Agence du Camp",
    period: "Septembre 2022 — Février 2023",
    score: 38,
    details: [
      "Recherche et évaluation de biens immobiliers",
      "Organisation de visites et négociation des conditions",
      "Commercialisation des biens",
    ],
  },
  {
    kind: "experience",
    date: "2023-02",
    label: "Négociateur immobilier",
    org: "Laforêt — Meyzieu",
    period: "Février 2023 — Août 2024",
    score: 47,
    details: [
      "Négociation, veille concurrentielle et veille de marché",
      "Estimation patrimoniale et conseils clients",
      "Conseil juridique et financier, commercialisation des biens",
    ],
  },
  {
    kind: "education",
    date: "2024-06",
    label: "BTS NDRC — Négociation et Digitalisation de la Relation Client",
    org: "Institut Carrel",
    period: "2022 — 2024",
    score: 58,
    details: [
      "Relation client omnicanale et digitalisation",
      "Négociation, vente et accompagnement de l'achat",
      "Développement et animation de la relation client",
    ],
  },
  {
    kind: "experience",
    date: "2024-09",
    label: "Conseiller particulier",
    org: "LCL — Agence de Caluire-et-Cuire",
    period: "Septembre 2024 — Septembre 2025",
    score: 70,
    details: [
      "Analyse des besoins clients et proposition de solutions adaptées",
      "Gestion des comptes courants et produits d'épargne (livrets, PEL...)",
      "Suivi personnalisé pour fidéliser la clientèle",
    ],
  },
  {
    kind: "education",
    date: "2025-06",
    label: "Bac+3 CPAT Conseiller de Patrimoine",
    period: "2024 — 2025",
    score: 82,
    details: [
      "Bilan patrimonial et analyse des besoins clients",
      "Fiscalité, placements financiers et immobiliers",
      "Stratégies d'épargne, de transmission et de protection",
    ],
  },
  {
    kind: "education",
    date: "2025-07",
    label: "Admission Mastère Conseiller Patrimonial du Dirigeant",
    org: "ESBanque",
    period: "2025",
    score: 91,
    details: [
      "Ingénierie patrimoniale du dirigeant et de l'entreprise",
      "Fiscalité, transmission et optimisation du patrimoine",
      "Formation en cours, en alternance avec LCL",
    ],
  },
  {
    kind: "experience",
    date: "2025-09",
    label: "Conseiller particulier",
    org: "LCL — Agence de Saint-Genis-Laval",
    period: "Septembre 2025 — Mai 2027",
    current: true,
    score: 100,
    details: [
      "Gestion d'un portefeuille de clients patrimoniaux : rendez-vous patrimoniaux complets, conquête et fidélisation, développement des encours",
      "Analyse des besoins clients : prêts immobiliers, allocation d'actifs",
      "Suivi personnalisé pour fidéliser la clientèle",
    ],
  },
];

export const interests = ["Sport", "Informatique", "Finance", "Musique"];

export interface Skill {
  name: string;
  level: number;
}

export const skills: Skill[] = [
  { name: "AI Engineering", level: 80 },
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
  details?: string[];
}

export const projects: Project[] = [
  {
    title: "PatriSim",
    description:
      "Simulateur patrimonial pour Conseillers en Gestion de Patrimoine : bilan patrimonial, simulateurs fiscaux (IR, IFI), comparateur RCM/PFU, projections retraite et succession.",
    link: "https://charlesbertrand.vercel.app",
    linkLabel: "Voir la démo",
    details: [
      "Bilan patrimonial complet (actif / passif, objectifs)",
      "Simulateurs fiscaux : impôt sur le revenu (IR) et IFI",
      "Comparateur RCM / PFU (flat tax vs barème)",
      "Projections retraite et transmission / succession",
    ],
  },
];

export const achievement = {
  title: "Concours « Journée de la Négociation »",
  description: "1ère place sur 60 participants",
};
