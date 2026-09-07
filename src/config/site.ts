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
  url: "https://cma-enterprise.it",
  locale: "it_IT",
} as const;

export type NavChild = {
  label: string;
  href: string;
  description: string;
};

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavChild[];
};

/**
 * Navigazione principale: ogni voce è una pagina dedicata, così la home
 * resta corta e le sezioni sono raggruppate nel menu in alto invece di
 * accumularsi tutte nello scroll.
 */
export const navItems: NavItem[] = [
  {
    label: "Servizi",
    href: "/servizi",
    description: "Tutto quello che costruiamo, dal sito al software su misura.",
    children: [
      {
        label: "Siti web e landing page",
        href: "/servizi#siti-web",
        description: "Presenza online veloce, chiara e costruita per convertire.",
      },
      {
        label: "E-commerce",
        href: "/servizi#ecommerce",
        description: "Negozi online scalabili, con backend gestibile in autonomia.",
      },
      {
        label: "Web app e prodotti digitali",
        href: "/servizi#web-app",
        description: "Applicazioni su misura per processi, dati e servizi.",
      },
      {
        label: "Software su misura",
        href: "/servizi#software",
        description: "Soluzioni dedicate quando gli strumenti standard non bastano.",
      },
      {
        label: "Automazioni e integrazioni",
        href: "/servizi#automazioni",
        description: "Colleghiamo strumenti e togliamo lavoro ripetitivo ai team.",
      },
      {
        label: "Bot e software per investimenti",
        href: "/servizi#trading-bot",
        description: "Automazione di strategie definite dal cliente, con backtest e controlli di rischio.",
      },
      {
        label: "Manutenzione ed evoluzione",
        href: "/servizi#manutenzione",
        description: "Aggiornamenti, correzioni e nuove funzionalità nel tempo.",
      },
    ],
  },
  {
    label: "Studio",
    href: "/studio",
    description: "Chi siamo e come lavoriamo.",
    children: [
      {
        label: "Il metodo",
        href: "/metodo",
        description: "Le quattro fasi con cui portiamo un progetto dal via al lancio.",
      },
      {
        label: "Competenze",
        href: "/competenze",
        description: "Design, sviluppo, prestazioni e comunicazione chiara.",
      },
      {
        label: "Progetti",
        href: "/progetti",
        description: "Le tipologie di lavoro che seguiamo oggi.",
      },
    ],
  },
  { label: "Contatti", href: "/contatti", description: "Parliamo del tuo progetto." },
];

/** Voci usate nel footer (elenco piatto, senza raggruppamenti). */
export const footerNavItems: NavChild[] = [
  { label: "Servizi", href: "/servizi", description: "" },
  { label: "Metodo", href: "/metodo", description: "" },
  { label: "Competenze", href: "/competenze", description: "" },
  { label: "Progetti", href: "/progetti", description: "" },
  { label: "Contatti", href: "/contatti", description: "" },
];

export const contactConfig = {
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
  /** Nome dell'icona lucide-react usata nel menu e nelle card. */
  icon:
    | "Globe"
    | "ShoppingBag"
    | "LayoutGrid"
    | "Code2"
    | "Workflow"
    | "LineChart"
    | "LifeBuoy";
  /** Punti concreti mostrati nella pagina Servizi. */
  highlights: string[];
};

export const services: ServiceItem[] = [
  {
    id: "siti-web",
    icon: "Globe",
    highlights: [
      "Struttura e contenuti orientati alla conversione",
      "Ottimizzazione SEO tecnica di base",
      "Caricamento rapido su mobile e desktop",
    ],
    title: "Siti web e landing page",
    description:
      "Progettiamo siti e landing page veloci, chiari e costruiti per convertire, dal primo contatto alla richiesta di preventivo.",
  },
  {
    id: "ecommerce",
    icon: "ShoppingBag",
    highlights: [
      "Catalogo e checkout semplici da usare",
      "Gestione ordini e prodotti in autonomia",
      "Integrazione con pagamenti e spedizioni",
    ],
    title: "E-commerce",
    description:
      "Sviluppiamo negozi online solidi e scalabili, con un percorso d'acquisto semplice e un backend gestibile in autonomia.",
  },
  {
    id: "web-app",
    icon: "LayoutGrid",
    highlights: [
      "Interfacce costruite sui processi reali",
      "Aree riservate e gestione utenti",
      "Architettura pronta a crescere",
    ],
    title: "Web app e prodotti digitali",
    description:
      "Costruiamo applicazioni web su misura per gestire processi, dati e servizi, pensate per crescere insieme al progetto.",
  },
  {
    id: "software",
    icon: "Code2",
    highlights: [
      "Analisi dei flussi di lavoro esistenti",
      "Sviluppo su misura, senza vincoli di template",
      "Documentazione e passaggio di consegne",
    ],
    title: "Software su misura",
    description:
      "Realizziamo soluzioni software personalizzate quando gli strumenti standard non bastano a coprire le esigenze reali.",
  },
  {
    id: "automazioni",
    icon: "Workflow",
    highlights: [
      "Collegamento tra strumenti già in uso",
      "Attività ripetitive eseguite in automatico",
      "Report e notifiche dove servono",
    ],
    title: "Automazioni e integrazioni",
    description:
      "Colleghiamo strumenti e automatizziamo processi ripetitivi, per far risparmiare tempo a persone e team.",
  },
  {
    id: "trading-bot",
    icon: "LineChart",
    highlights: [
      "Strategie tradotte in regole eseguibili e verificabili",
      "Backtest su dati storici e ambiente di test prima del live",
      "Limiti di rischio, log delle operazioni e arresto di emergenza",
    ],
    title: "Bot e software per investimenti",
    description:
      "Sviluppiamo software che automatizza strategie di investimento definite dal cliente: connessione ai broker, esecuzione, monitoraggio e report.",
  },
  {
    id: "manutenzione",
    icon: "LifeBuoy",
    highlights: [
      "Aggiornamenti di sicurezza e dipendenze",
      "Correzioni e miglioramenti continui",
      "Monitoraggio delle prestazioni",
    ],
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

/**
 * Nota mostrata sotto la griglia dei servizi: chiarisce che il lavoro sui
 * bot di investimento è sviluppo software su specifica del cliente e non
 * un servizio di investimento, che in Italia richiede autorizzazione.
 */
export const servicesDisclaimer =
  "I bot e i software per investimenti sono sviluppati su specifica del cliente: CMA Enterprise realizza la tecnologia e non presta servizi di investimento, consulenza finanziaria o gestione di patrimoni, né garantisce risultati o rendimenti.";

export const projectTypesNote =
  "Non abbiamo ancora case study pubblicabili: questa sezione verrà aggiornata con i progetti realizzati.";
