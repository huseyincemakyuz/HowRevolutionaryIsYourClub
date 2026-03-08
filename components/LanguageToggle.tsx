"use client";

import { Language } from "@/types";
import { TS } from "@/lib/colors";

interface Props {
  lang: Language;
  setLang: (l: Language) => void;
}

const options: Language[] = ["tr", "en"];

export default function LanguageToggle({ lang, setLang }: Props) {
  return (
    <div style={{
      display: "inline-flex",
      border: `2px solid ${TS.bordeaux}`,
      borderRadius: 99,
      overflow: "hidden"
    }}>
      {options.map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            padding: "5px 16px",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            cursor: l === lang ? "default" : "pointer",
            background: l === lang ? TS.bordeaux : "transparent",
            color: l === lang ? "#fff" : TS.bordeaux,
            border: "none",
            transition: "background 0.2s, color 0.2s"
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
