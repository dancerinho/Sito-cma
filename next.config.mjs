/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  agentRules: false,
  images: {
    unoptimized: true,
  },
  // Solo in sviluppo: permette di aprire il sito dal telefono sulla rete di
  // casa (es. http://192.168.1.10:3123). Senza, Next blocca gli script e la
  // pagina resta senza animazioni né sfondo.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local"],
};

export default nextConfig;
