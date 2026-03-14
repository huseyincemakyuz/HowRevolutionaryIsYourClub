"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { translations } from "@/lib/translations";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { TS } from "@/lib/colors";
import { Language } from "@/types";

const BAR_HEIGHT = 48;

export default function Home() {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "tr" || stored === "en") setLang(stored as Language);
  }, []);

  const handleSetLang = (l: Language) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  const t = translations;

  return (
    <main style={{ fontFamily: "Arial, sans-serif" }}>

      <TopBar lang={lang} setLang={handleSetLang} />

      {/* Hero band — starts below fixed TopBar */}
      <div style={{
        marginTop: BAR_HEIGHT,
        background: `linear-gradient(135deg, ${TS.bordeaux} 0%, ${TS.blue} 100%)`,
        color: "#fff",
        padding: "48px 24px 56px"
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>

          {/* 1 — Hero title */}
          <h1 style={{ fontSize: "2.2rem", fontWeight: 800, margin: "0 0 8px", lineHeight: 1.2 }}>
            {t.heroTitle[lang]}
          </h1>

          {/* 4 — Model label */}
          <p style={{ fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 20px", opacity: 0.75 }}>
            {t.modelName[lang]}
          </p>

          {/* 2 — Subtitle */}
          <p style={{ fontSize: "1.05rem", lineHeight: 1.65, margin: 0, opacity: 0.92 }}>
            {t.heroSubtitle[lang]}
          </p>

        </div>
      </div>

      {/* Content */}
      <div style={{ background: TS.bg }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>

        {/* 3 — Short story */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
          {t.story[lang].map((line, i) => (
            <p key={i} style={{
              margin: 0,
              fontSize: "1rem",
              lineHeight: 1.75,
              color: i === t.story[lang].length - 1 ? "#111" : "#555",
              fontWeight: i === t.story[lang].length - 1 ? 700 : 400
            }}>
              {line}
            </p>
          ))}
        </div>

        <hr style={{ border: "none", borderTop: `2px solid ${TS.bordeaux}`, opacity: 0.15, marginBottom: 40 }} />

        {/* 5 — Dimensions */}
        <p style={{ margin: "0 0 14px", fontWeight: 700, color: "#222" }}>
          {t.dimensionsTitle[lang]}
        </p>
        <ul style={{ margin: "0 0 40px", paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          {t.dimensions[lang].map((dim, i) => (
            <li key={i} style={{ color: "#333", lineHeight: 1.5 }}>{dim}</li>
          ))}
        </ul>

        <hr style={{ border: "none", borderTop: `2px solid ${TS.blue}`, opacity: 0.15, marginBottom: 40 }} />

        {/* Why TRI — stats section */}
        <p style={{ margin: "0 0 20px", fontWeight: 700, fontSize: "1.05rem", color: "#222" }}>
          {t.whyTRITitle[lang]}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          {t.whyTRIStats[lang].map((row, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              background: i === 1 ? `${TS.bordeaux}10` : "#f5f5f5",
              border: i === 1 ? `1.5px solid ${TS.bordeaux}40` : "1.5px solid #e5e5e5",
              borderRadius: 8,
              padding: "12px 16px"
            }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: TS.blue, minWidth: 72, letterSpacing: "0.04em" }}>
                {row.period}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.88rem", fontWeight: i === 1 ? 700 : 400, color: i === 1 ? TS.bordeaux : "#444" }}>
                  {row.label}
                </div>
                <div style={{ fontSize: "0.78rem", color: "#888", marginTop: 2 }}>{row.note}</div>
              </div>
              <span style={{
                fontSize: "1.1rem",
                fontWeight: 800,
                color: i === 1 ? TS.bordeaux : "#555",
                whiteSpace: "nowrap"
              }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.65, margin: "0 0 40px", fontStyle: "italic" }}>
          {t.whyTRINote[lang]}
        </p>

        <hr style={{ border: "none", borderTop: `2px solid ${TS.bordeaux}`, opacity: 0.15, marginBottom: 40 }} />

        {/* 6 — Bold line */}
        <p style={{ fontSize: "1.2rem", fontWeight: 800, color: TS.bordeaux, margin: "0 0 14px" }}>
          {t.boldLine[lang]}
        </p>

        {/* 7 — Question */}
        <p style={{ fontSize: "1rem", color: "#444", lineHeight: 1.65, margin: "0 0 36px" }}>
          {t.userQuestion[lang]}
        </p>

        {/* 8 — CTA */}
        <Link href="/quiz">
          <button style={{
            padding: "14px 40px",
            fontSize: "1rem",
            fontWeight: 700,
            background: TS.bordeaux,
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
      </div>

      <Footer lang={lang} />
    </main>
  );
}
