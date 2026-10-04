import type { Metadata } from "next";
import { Scenes } from "@/components/home/scenes";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Home: quattro scene che si susseguono scorrendo sopra lo sfondo a
 * particelle (chi siamo, servizi, come lavoriamo, contatti).
 */
export default function Home() {
  return <Scenes />;
}
