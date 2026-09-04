"use client";

import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { id: "a", x: 60, y: 190 },
  { id: "b", x: 170, y: 90 },
  { id: "c", x: 170, y: 290 },
  { id: "d", x: 300, y: 190 },
  { id: "e", x: 300, y: 60 },
  { id: "f", x: 300, y: 320 },
  { id: "g", x: 430, y: 130 },
  { id: "h", x: 430, y: 250 },
  { id: "i", x: 540, y: 190 },
];

const links: [string, string][] = [
  ["a", "b"],
  ["a", "c"],
  ["b", "d"],
  ["c", "d"],
  ["d", "e"],
  ["d", "f"],
  ["e", "g"],
  ["f", "h"],
  ["g", "i"],
  ["h", "i"],
  ["g", "h"],
];

function findNode(id: string) {
  const node = nodes.find((n) => n.id === id);
  if (!node) throw new Error(`Unknown node ${id}`);
  return node;
}

export function HeroGraphic() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 600 380"
      fill="none"
      className="h-auto w-full max-w-xl"
      role="img"
      aria-label="Rappresentazione astratta di un sistema digitale connesso"
    >
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6C8CFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3358FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {links.map(([from, to], i) => {
        const a = findNode(from);
        const b = findNode(to);
        return (
          <motion.line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="#2A2F38"
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.1,
              delay: shouldReduceMotion ? 0 : 0.15 + i * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        );
      })}

      {nodes.map((node, i) => (
        <g key={node.id}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={26}
            fill="url(#nodeGlow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.15, 0.35, 0.15] }}
            transition={{
              duration: shouldReduceMotion ? 0 : 3.5,
              delay: i * 0.2,
              repeat: shouldReduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={4.5}
            fill="#E6E8EB"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: shouldReduceMotion ? 0 : 0.3 + i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </g>
      ))}
    </svg>
  );
}
