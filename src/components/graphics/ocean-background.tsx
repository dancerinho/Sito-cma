/**
 * Sfondo globale del sito: blu oceano sfumato e animato.
 * È un livello fisso dietro a tutti i contenuti, realizzato in solo CSS
 * (nessun JavaScript) così da restare fluido anche su dispositivi lenti.
 */
export function OceanBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base: dal blu abissale in basso al blu oceano in alto. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#04121F_0%,#02080F_45%,#04121F_100%)]" />

      {/* Correnti: macchie di gradiente che si muovono lentamente. */}
      <div className="absolute -left-1/4 -top-1/3 h-[85vh] w-[85vw] animate-current-a rounded-full bg-[radial-gradient(circle_at_center,rgba(31,162,255,0.30)_0%,rgba(31,162,255,0)_62%)] blur-3xl" />
      <div className="absolute -right-1/4 top-1/4 h-[80vh] w-[80vw] animate-current-b rounded-full bg-[radial-gradient(circle_at_center,rgba(37,224,200,0.20)_0%,rgba(37,224,200,0)_60%)] blur-3xl" />
      <div className="absolute -bottom-1/3 left-1/5 h-[75vh] w-[75vw] animate-current-c rounded-full bg-[radial-gradient(circle_at_center,rgba(10,61,119,0.55)_0%,rgba(10,61,119,0)_65%)] blur-3xl" />

      {/* Caustiche: reticolo sottile che scorre come luce sott'acqua. */}
      <div className="absolute inset-0 animate-caustic-drift bg-[linear-gradient(115deg,rgba(111,224,255,0.05)_1px,transparent_1px),linear-gradient(65deg,rgba(37,224,200,0.04)_1px,transparent_1px)] bg-[size:120px_120px,180px_180px] opacity-70" />

      {/* Vignettatura: scurisce i bordi e tiene il testo leggibile. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,rgba(2,8,15,0)_35%,rgba(2,8,15,0.85)_100%)]" />
    </div>
  );
}
