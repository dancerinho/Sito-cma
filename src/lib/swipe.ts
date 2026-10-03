/**
 * Binario a scorrimento orizzontale con aggancio e senza barra visibile,
 * usato dal componente Swipe su telefono. Sta in un modulo a parte perché
 * serve anche ai componenti server.
 */
export const swipeTrack =
  "-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto overscroll-x-contain px-4 pb-1 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden";
