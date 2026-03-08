"use client";

import { useEffect, useState } from "react"
import { questions } from "@/lib/questions"
import { calculateScore, ScoreResult } from "@/lib/scoring"
import { getLevel } from "@/lib/levels"
import { translations } from "@/lib/translations"
import LanguageToggle from "@/components/LanguageToggle"
import { CategoryScores, Language } from "@/types"

const CATEGORY_ORDER: (keyof CategoryScores)[] = ["hegemony", "rise", "sustain", "europe"]

export default function Result() {

  const [result, setResult] = useState<ScoreResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lang, setLang] = useState<Language>("en")

  useEffect(() => {
    const storedLang = localStorage.getItem("lang")
    if (storedLang === "tr" || storedLang === "en") {
      setLang(storedLang as Language)
    }

    const stored = localStorage.getItem("answers")
    if (!stored) return

    let answers: Record<number, number>
    try {
      answers = JSON.parse(stored)
    } catch {
      setError("error")
      return
    }

    const categoryScores: CategoryScores = { hegemony: 0, rise: 0, sustain: 0, europe: 0 }
    questions.forEach(q => { categoryScores[q.category] += answers[q.id] || 0 })
    setResult(calculateScore(categoryScores))
  }, [])

  const handleSetLang = (l: Language) => {
    setLang(l)
    localStorage.setItem("lang", l)
  }

  if (error) return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px", fontFamily: "sans-serif" }}>
      <LanguageToggle lang={lang} setLang={handleSetLang} />
      <p style={{ color: "red", marginTop: 20 }}>{translations.errorAnswers[lang]}</p>
      <a href="/quiz">
        <button style={{ marginTop: 10, padding: "10px 24px", cursor: "pointer" }}>
          {translations.retake[lang]}
        </button>
      </a>
    </div>
  )

  if (!result) return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px", fontFamily: "sans-serif" }}>
      <LanguageToggle lang={lang} setLang={handleSetLang} />
      <p style={{ marginTop: 20, color: "#666" }}>{translations.loading[lang]}</p>
    </div>
  )

  const level = getLevel(result.total)

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px", fontFamily: "sans-serif" }}>

      <LanguageToggle lang={lang} setLang={handleSetLang} />

      {/* Score + level name */}
      <div style={{ marginTop: 32 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{ fontSize: "3.5rem", fontWeight: 800, lineHeight: 1 }}>{result.total}</span>
          <span style={{ fontSize: "1.5rem", color: "#aaa", fontWeight: 400 }}>/ 100</span>
        </div>
        <h2 style={{ margin: "10px 0 0", fontSize: "1.5rem", fontWeight: 700 }}>
          {level.name[lang]}
        </h2>
      </div>

      {/* Score description */}
      <p style={{
        marginTop: 14,
        padding: "16px 20px",
        background: "#f5f5f5",
        borderLeft: "4px solid #111",
        borderRadius: 4,
        fontSize: "1rem",
        lineHeight: 1.6,
        color: "#333"
      }}>
        {level.description[lang]}
      </p>

      <hr style={{ border: "none", borderTop: "1px solid #e5e5e5", margin: "32px 0" }} />

      {/* Category breakdown */}
      <h3 style={{ fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#888", margin: "0 0 20px" }}>
        {translations.breakdown[lang]}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {CATEGORY_ORDER.map(key => {
          const cat = result.breakdown[key]
          return (
            <div key={key}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#222" }}>
                  {translations.categories[key][lang]}
                </span>
                <span style={{ fontSize: "0.9rem", color: "#555" }}>
                  {cat.normalized}%
                </span>
              </div>
              <div style={{ height: 8, background: "#e5e5e5", borderRadius: 99 }}>
                <div style={{
                  height: "100%",
                  width: `${cat.normalized}%`,
                  background: "#111",
                  borderRadius: 99
                }} />
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: 36, display: "flex", gap: 12 }}>
        <a href="/quiz">
          <button style={{
            padding: "12px 28px",
            fontSize: "0.95rem",
            fontWeight: 600,
            background: "#111",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}>
            {translations.retake[lang]}
          </button>
        </a>
        <a href="/">
          <button style={{
            padding: "12px 28px",
            fontSize: "0.95rem",
            fontWeight: 600,
            background: "#fff",
            color: "#111",
            border: "2px solid #111",
            borderRadius: 6,
            cursor: "pointer"
          }}>
            {translations.home[lang]}
          </button>
        </a>
      </div>

    </div>
  )
}
