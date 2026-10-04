"use client";

import { CSSProperties, useEffect, useState } from "react";

/**
 * Intestazione delle pagine interne, nello stesso stile dei titoli della
 * home: due righe, la prima che sfuma verso destra ed entra da sinistra, la
 * seconda che si accende verso la fine ed entra da destra. Nel titolo, la
 * parte tra asterischi (`Chi *siamo*.`) va sulla seconda riga.
 */
export function PageHero({ title, description }: { title: string; description: string }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setActive(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const star = title.indexOf("*");
  const a = (star >= 0 ? title.slice(0, star) : title).trim();
  const b = star >= 0 ? title.slice(star).replace(/\*/g, "").trim() : "";

  return (
    <section
      data-active={active}
      className="mx-auto flex w-full max-w-content items-end pb-10 pt-28 container-px sm:min-h-[60svh] sm:pb-20 sm:pt-40 lg:min-h-[72svh] lg:pb-28 lg:pt-44"
    >
      <div>
        <h1 className="scene-title page-title">
          <span className="scene-line scene-line-a">
            <span>{a}</span>
          </span>{" "}
          {b ? (
            <span className="scene-line scene-line-b">
              <span>{b}</span>
            </span>
          ) : null}
        </h1>
        <p
          className="scene-fade mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink-300 sm:mt-7 sm:text-lg"
          style={{ "--d": "0.5s" } as CSSProperties}
        >
          {description}
        </p>
      </div>
    </section>
  );
}
