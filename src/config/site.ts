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
    "CMA Enterprise progetta e sviluppa siti web, web app, software su misura e automazioni, unendo strategia, design e tecnologia.",
  url: "https://cma-enterprise.it",
  locale: "it_IT",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

/**
 * Navigazione principale: tre pagine, nessun sottomenu, così chi arriva
 * capisce subito dove trovare cosa.
 */
export const navItems: NavItem[] = [
  { label: "Servizi", href: "/servizi/" },
  { label: "Studio", href: "/studio/" },
  { label: "Contatti", href: "/contatti/" },
];

export const contactConfig = {
  email: "info@cma-enterprise.it",
  /** Oggetto e testo proposti quando si apre una nuova email dal sito. */
  emailSubject: "Richiesta preventivo dal sito",
  emailBody: "Ciao, sarei interessato ai vostri servizi.\n\nProgetto:\nTempistiche:\nBudget indicativo:\n",
  /** Numero mostrato sul sito e usato per WhatsApp. */
  phone: "+39 366 9959041",
  whatsappMessage: "Ciao, sarei interessato ai vostri servizi",
  // TODO: aggiungere una città/area operativa se si desidera mostrarla.
  location: "",
} as const;

const encode = encodeURIComponent;

/**
 * Link di contatto già precompilati: destinatario, oggetto e testo sono
 * inseriti in automatico, così chi scrive deve solo premere invio.
 */
export const contactLinks = {
  /** App di posta predefinita del visitatore (Mail, Gmail, Outlook…). */
  mailto: `mailto:${contactConfig.email}?subject=${encode(contactConfig.emailSubject)}&body=${encode(contactConfig.emailBody)}`,
  /** Chat WhatsApp con il messaggio iniziale già scritto. */
  whatsapp: `https://wa.me/${contactConfig.phone.replace(/\D/g, "")}?text=${encode(contactConfig.whatsappMessage)}`,
  /** Chiamata diretta (da telefono). */
  tel: `tel:${contactConfig.phone.replace(/\s/g, "")}`,
};

/**
 * Profili social: lascia la stringa vuota (o rimuovi la voce) per non mostrare
 * l'icona corrispondente nel footer. Nessun link viene inventato di default.
 */
export const socialLinks = {
  instagram: "https://www.instagram.com/cma_enterprise_/",
  tiktok: "https://www.tiktok.com/@cma_enterprise.it",
  linkedin: "",
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
  title: string;
  description: string;
};

export const methodSteps: MethodStep[] = [
  {
    title: "Ascolto e analisi",
    description:
      "Partiamo dagli obiettivi reali del progetto: contesto, utenti, vincoli tecnici e di tempo.",
  },
  {
    title: "Strategia e progettazione",
    description:
      "Definiamo struttura, contenuti e interfaccia, con scelte motivate e coerenti con l'obiettivo.",
  },
  {
    title: "Sviluppo e verifica",
    description:
      "Costruiamo il prodotto con codice solido, testandolo su dispositivi e scenari d'uso reali.",
  },
  {
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

/**
 * Nota mostrata sotto la griglia dei servizi: chiarisce che il lavoro sui
 * bot di investimento è sviluppo software su specifica del cliente e non
 * un servizio di investimento, che in Italia richiede autorizzazione.
 */
export const servicesDisclaimer =
  "I bot e i software per investimenti sono sviluppati su specifica del cliente: CMA Enterprise realizza la tecnologia e non presta servizi di investimento, consulenza finanziaria o gestione di patrimoni, né garantisce risultati o rendimenti.";

