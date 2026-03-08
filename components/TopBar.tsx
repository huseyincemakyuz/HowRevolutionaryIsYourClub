"use client";

import Link from "next/link";
import { TS } from "@/lib/colors";
import { Language } from "@/types";

interface Props {
  lang: Language;
  setLang: (l: Language) => void;
}

export default function TopBar({ lang, setLang }: Props) {
  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 100,
      background: `linear-gradient(90deg, ${TS.bordeaux} 0%, ${TS.blue} 100%)`,
      padding: "13px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: 48
    }}>
      <Link href="/" style={{ color: "#fff", fontWeight: 800, fontSize: "0.95rem", letterSpacing: "0.06em", opacity: 0.95 }}>
        TRI
      </Link>

      <div style={{ border: "2px solid rgba(255,255,255,0.55)", borderRadius: 99, overflow: "hidden", display: "inline-flex" }}>
        {(["tr", "en"] as Language[]).map(l => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              padding: "4px 14px",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              cursor: l === lang ? "default" : "pointer",
              background: l === lang ? "rgba(255,255,255,0.25)" : "transparent",
              color: "#fff",
              border: "none",
              transition: "background 0.2s"
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
