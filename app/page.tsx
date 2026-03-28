"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { translations } from "@/lib/translations";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { TS } from "@/lib/colors";
import { Language } from "@/types";
import { exampleClubs } from "@/lib/exampleClubs";

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

        {/* Levels reference */}
        <p style={{ margin: "0 0 14px", fontWeight: 700, color: "#222" }}>
          {t.levelsTitle[lang]}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 40 }}>
          {([
            { range: "100",   name: { tr: "Kıstas (TRI)",         en: "The Benchmark (TRI)"      }, top: true  },
            { range: "90–99", name: { tr: "Trabzon Çaplı Devrim", en: "Trabzon-Level Revolution" }, top: false },
            { range: "81–89", name: { tr: "Güçlü Devrim",         en: "Strong Revolution"        }, top: false },
            { range: "61–80", name: { tr: "Hegemonya Kırıcı",     en: "Hegemony Breaker"         }, top: false },
            { range: "41–60", name: { tr: "Lig Bozucu",           en: "League Disruptor"         }, top: false },
            { range: "21–40", name: { tr: "Köklü Güç",            en: "Established Power"        }, top: false },
            { range: "0–20",  name: { tr: "Statüko",              en: "The Status Quo"           }, top: false },
          ] as { range: string; name: { tr: string; en: string }; top: boolean }[]).map((tier) => (
            <div key={tier.range} style={{
              display: "flex", alignItems: "center", gap: 12,
              background: tier.top ? `${TS.bordeaux}10` : "#f5f5f5",
              border: tier.top ? `1.5px solid ${TS.bordeaux}50` : "1.5px solid #e8e8e8",
              borderRadius: 7, padding: "10px 14px"
            }}>
              <span style={{
                fontSize: "0.75rem", fontWeight: 800, color: tier.top ? TS.bordeaux : TS.blue,
                minWidth: 44, letterSpacing: "0.03em"
              }}>
                {tier.range}
              </span>
              <span style={{
                fontSize: "0.92rem", fontWeight: tier.top ? 800 : 500,
                color: tier.top ? TS.bordeaux : "#333"
              }}>
                {tier.name[lang]}
              </span>
            </div>
          ))}
        </div>

        <hr style={{ border: "none", borderTop: `2px solid ${TS.bordeaux}`, opacity: 0.15, marginBottom: 40 }} />

        {/* Example clubs */}
        <p style={{ margin: "0 0 6px", fontWeight: 700, color: "#222" }}>
          {lang === "tr" ? "Referans Kulüpler" : "Reference Clubs"}
        </p>
        <p style={{ margin: "0 0 20px", fontSize: "0.88rem", color: "#666", lineHeight: 1.6 }}>
          {lang === "tr"
            ? "TRI modeliyle hesaplanmış tarihsel devrimci kulüpler. Kulübünüzü kıyaslamak için bir referans noktası."
            : "Historically revolutionary clubs scored with the TRI model — a reference point to compare your club against."}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12, marginBottom: 40 }}>
          {exampleClubs.map(club => {
            const score = club.total;
            const color = score === 100 ? TS.bordeaux
              : score >= 81 ? "#B5451B"
              : score >= 61 ? TS.blue
              : TS.gold;
            const tierName = score === 100
              ? (lang === "tr" ? "Kıstas (TRI)" : "The Benchmark (TRI)")
              : score >= 90
              ? (lang === "tr" ? "Trabzon Çaplı Devrim" : "Trabzon-Level Revolution")
              : score >= 81
              ? (lang === "tr" ? "Güçlü Devrim" : "Strong Revolution")
              : score >= 61
              ? (lang === "tr" ? "Hegemonya Kırıcı" : "Hegemony Breaker")
              : score >= 41
              ? (lang === "tr" ? "Lig Bozucu" : "League Disruptor")
              : (lang === "tr" ? "Köklü Güç" : "Established Power");

            const catLabels: Record<string, { tr: string; en: string }> = {
              hegemony: { tr: "Hegemonya", en: "Hegemony" },
              rise:     { tr: "Yükseliş",  en: "Rise"     },
              sustain:  { tr: "Süreklilik",en: "Sustain"  },
              europe:   { tr: "Avrupa",    en: "Europe"   },
            };
            const catColors: Record<string, string> = {
              hegemony: TS.bordeaux,
              rise:     TS.blue,
              sustain:  TS.gold,
              europe:   "#6B9E6B",
            };

            return (
              <div key={club.name} style={{
                background: "#fff",
                border: `1.5px solid ${color}30`,
                borderLeft: `4px solid ${color}`,
                borderRadius: 8,
                padding: "14px 16px",
              }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "0.97rem", color: "#111" }}>{club.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "#888", marginTop: 2 }}>
                      {club.league[lang]} · {club.era} · {club.country}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color, lineHeight: 1 }}>{score}</div>
                    <div style={{ fontSize: "0.68rem", fontWeight: 700, color, marginTop: 2 }}>{tierName}</div>
                  </div>
                </div>

                {/* Note */}
                <p style={{ margin: "0 0 12px", fontSize: "0.8rem", color: "#555", lineHeight: 1.55 }}>
                  {club.note[lang]}
                </p>

                {/* Category bars */}
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {(["hegemony", "rise", "sustain", "europe"] as const).map(cat => (
                    <div key={cat} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: "0.68rem", color: "#999", minWidth: 58 }}>
                        {catLabels[cat][lang]}
                      </span>
                      <div style={{ flex: 1, height: 4, background: "#eee", borderRadius: 99 }}>
                        <div style={{
                          height: "100%",
                          width: `${club.breakdown[cat].normalized}%`,
                          background: catColors[cat],
                          borderRadius: 99
                        }} />
                      </div>
                      <span style={{ fontSize: "0.68rem", color: "#aaa", minWidth: 28, textAlign: "right" }}>
                        {club.breakdown[cat].normalized}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

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
