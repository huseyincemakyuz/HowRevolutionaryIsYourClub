"use client";

import { useState } from "react";
import Link from "next/link";
import { translations } from "@/lib/translations";
import LanguageToggle from "@/components/LanguageToggle";
import { Language } from "@/types";

export default function Home() {
  const [lang, setLang] = useState<Language>("en");

  const handleSetLang = (l: Language) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  const t = translations;

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px", fontFamily: "sans-serif" }}>

      {/* Language toggle */}
      <LanguageToggle lang={lang} setLang={handleSetLang} />

      {/* 1 — Hero */}
      <h1 style={{ fontSize: "2rem", fontWeight: 800, marginTop: 32, lineHeight: 1.2 }}>
        {t.heroTitle[lang]}
      </h1>

      {/* 4 — Model name */}
      <p style={{ fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#888", marginTop: 8 }}>
        {t.modelName[lang]}
      </p>

      {/* 2 — Subtitle */}
      <p style={{ fontSize: "1.1rem", color: "#444", marginTop: 20, lineHeight: 1.6 }}>
        {t.heroSubtitle[lang]}
      </p>

      <hr style={{ border: "none", borderTop: "1px solid #e0e0e0", margin: "36px 0" }} />

      {/* 3 — Short story */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {t.story[lang].map((line, i) => (
          <p key={i} style={{ margin: 0, fontSize: "1rem", lineHeight: 1.7, color: i === t.story[lang].length - 1 ? "#111" : "#555", fontWeight: i === t.story[lang].length - 1 ? 600 : 400 }}>
            {line}
          </p>
        ))}
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #e0e0e0", margin: "36px 0" }} />

      {/* 5 — What we measure */}
      <p style={{ margin: "0 0 14px", fontWeight: 600, color: "#222" }}>
        {t.dimensionsTitle[lang]}
      </p>
      <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
        {t.dimensions[lang].map((dim, i) => (
          <li key={i} style={{ color: "#333", lineHeight: 1.5 }}>{dim}</li>
        ))}
      </ul>

      <hr style={{ border: "none", borderTop: "1px solid #e0e0e0", margin: "36px 0" }} />

      {/* 6 — Bold line */}
      <p style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111", margin: 0 }}>
        {t.boldLine[lang]}
      </p>

      {/* 7 — Question to user */}
      <p style={{ fontSize: "1rem", color: "#444", marginTop: 16, lineHeight: 1.6 }}>
        {t.userQuestion[lang]}
      </p>

      {/* 8 — CTA */}
      <div style={{ marginTop: 36 }}>
        <Link href="/quiz">
          <button style={{
            padding: "14px 36px",
            fontSize: "1rem",
            fontWeight: 700,
            backgroundColor: "#111",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            letterSpacing: "0.03em"
          }}>
            {t.start[lang]}
          </button>
        </Link>
      </div>

    </main>
  );
}
