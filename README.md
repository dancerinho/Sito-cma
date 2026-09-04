# CMA Enterprise

Sito ufficiale di CMA Enterprise — Next.js (App Router) + TypeScript + Tailwind CSS, esportato come sito statico e pubblicato su GitHub Pages sul dominio `cma-enterprise.it`.

## Sviluppo locale

```bash
npm install
npm run dev
```

Il sito è disponibile su `http://localhost:3000`.

## Comandi

- `npm run dev` — server di sviluppo
- `npm run build` — build statica di produzione (output in `out/`)
- `npm run lint` — controllo ESLint
- `npm run typecheck` — controllo TypeScript

## Struttura

- `src/app` — pagine (App Router)
- `src/components/layout` — header, footer
- `src/components/sections` — sezioni della homepage
- `src/components/ui` — componenti UI riutilizzabili
- `src/components/graphics` — grafica SVG originale
- `src/config/site.ts` — **configurazione centrale**: nome, navigazione, servizi, contatti, social
- `src/lib/contact.ts` — punto di integrazione per l'invio del modulo contatti (Resend/Formspree/API route)

## Deploy

Ogni push su `main` esegue automaticamente lint, type-check, build e pubblicazione su GitHub Pages tramite `.github/workflows/deploy.yml`.

## Da fare prima del lancio definitivo

- Collegare l'invio reale del modulo contatti (vedi commenti in `src/lib/contact.ts`)
- Attivare/verificare la casella email indicata in `src/config/site.ts`
- Completare Privacy Policy e Cookie Policy con i dati legali reali (P.IVA, titolare del trattamento) e farle verificare da un consulente
- Sostituire la sezione "Progetti" con case study reali quando disponibili
