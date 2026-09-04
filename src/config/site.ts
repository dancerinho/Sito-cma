/**
 * Configurazione centrale del sito CMA ENTERPRISE.
 * Modifica qui nome, navigazione, servizi, contatti, dominio e social:
 * si riflette automaticamente su tutto il sito.
 */

export const siteConfig = {
  name: "CMA Enterprise",
  shortName: "CMA",
  tagline: "Progettiamo e sviluppiamo prodotti digitali su misura.",
  description:
    "CMA Enterprise progetta e sviluppa siti web, e-commerce, web app, software su misura e automazioni, unendo strategia, design e tecnologia.",
  // TODO: sostituire con il dominio definitivo se diverso da questo.
  url: "https://cma-enterprise.it",
  locale: "it_IT",
} as const;

export const navItems = [
  { label: "Servizi", href: "#servizi" },
  { label: "Metodo", href: "#metodo" },
  { label: "Competenze", href: "#competenze" },
  { label: "Contatti", href: "#contatti" },
] as const;

export const contactConfig = {
  // TODO: verificare/attivare questa casella email prima della pubblicazione.
  email: "info@cma-enterprise.it",
  // TODO: aggiungere un numero di telefono reale se disponibile, altrimenti lasciare vuoto.
  phone: "",
  // TODO: aggiungere una città/area operativa se si desidera mostrarla.
  location: "",
} as const;

/**
 * Profili social: lascia la stringa vuota (o rimuovi la voce) per non mostrare
 * l'icona corrispondente nel footer. Nessun link viene inventato di default.
 */
export const socialLinks = {
  linkedin: "",
  instagram: "",
  github: "",
} as const;

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
};

export const services: ServiceItem[] = [
  {
    id: "siti-web",
    title: "Siti web e landing page",
    description:
      "Progettiamo siti e landing page veloci, chiari e costruiti per convertire, dal primo contatto alla richiesta di preventivo.",
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    description:
      "Sviluppiamo negozi online solidi e scalabili, con un percorso d'acquisto semplice e un backend gestibile in autonomia.",
  },
  {
    id: "web-app",
    title: "Web app e prodotti digitali",
    description:
      "Costruiamo applicazioni web su misura per gestire processi, dati e servizi, pensate per crescere insieme al progetto.",
  },
  {
    id: "software",
    title: "Software su misura",
    description:
      "Realizziamo soluzioni software personalizzate quando gli strumenti standard non bastano a coprire le esigenze reali.",
  },
  {
    id: "automazioni",
    title: "Automazioni e integrazioni",
    description:
      "Colleghiamo strumenti e automatizziamo processi ripetitivi, per far risparmiare tempo a persone e team.",
  },
  {
    id: "manutenzione",
    title: "Manutenzione ed evoluzione",
    description:
      "Seguiamo i progetti nel tempo con aggiornamenti, correzioni e nuove funzionalità, mantenendoli sicuri e performanti.",
  },
];

export type MethodStep = {
  number: string;
  title: string;
  description: string;
};

export const methodSteps: MethodStep[] = [
  {
    number: "01",
    title: "Ascolto e analisi",
    description:
      "Partiamo dagli obiettivi reali del progetto: contesto, utenti, vincoli tecnici e di tempo.",
  },
  {
    number: "02",
    title: "Strategia e progettazione",
    description:
      "Definiamo struttura, contenuti e interfaccia, con scelte motivate e coerenti con l'obiettivo.",
  },
  {
    number: "03",
    title: "Sviluppo e verifica",
    description:
      "Costruiamo il prodotto con codice solido, testandolo su dispositivi e scenari d'uso reali.",
  },
  {
    number: "04",
    title: "Lancio ed evoluzione",
    description:
      "Pubblichiamo, misuriamo i risultati e continuiamo a migliorare il prodotto nel tempo.",
  },
];

export type SkillItem = {
  title: string;
  description: string;
};

export const skillItems: SkillItem[] = [
  {
    title: "Design su misura",
    description: "Ogni progetto parte da zero, senza template generici.",
  },
  {
    title: "Sviluppo responsive",
    description: "Esperienza curata su ogni dispositivo, dal mobile al desktop.",
  },
  {
    title: "Prestazioni",
    description: "Siti e app veloci, ottimizzati fin dalla struttura del codice.",
  },
  {
    title: "Codice scalabile",
    description: "Architetture pensate per crescere senza essere riscritte.",
  },
  {
    title: "Esperienza utente",
    description: "Percorsi semplici, chiari e orientati all'obiettivo.",
  },
  {
    title: "Comunicazione chiara",
    description: "Aggiornamenti costanti, senza tecnicismi inutili.",
  },
];

export type ProjectType = {
  title: string;
  description: string;
};

/**
 * Tipologie di progetto mostrate finché non sono disponibili case study reali.
 * Sostituire con progetti effettivi (titolo, descrizione, immagine/link) quando pronti.
 */
export const projectTypes: ProjectType[] = [
  {
    title: "Siti vetrina e landing page",
    description: "Presenza online chiara, orientata alla generazione di contatti.",
  },
  {
    title: "Piattaforme e-commerce",
    description: "Negozi online pensati per un'esperienza d'acquisto solida.",
  },
  {
    title: "Applicazioni web su misura",
    description: "Strumenti digitali costruiti attorno a processi specifici.",
  },
];

export const projectTypesNote =
  "Non abbiamo ancora case study pubblicabili: questa sezione verrà aggiornata con i progetti realizzati.";
