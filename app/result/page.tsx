"use client";

import { useEffect, useState } from "react"
import { questions } from "@/lib/questions"
import { calculateScore, ScoreResult } from "@/lib/scoring"
import { getLevel } from "@/lib/levels"
import { translations } from "@/lib/translations"
import { generateShareImage } from "@/lib/generateShareImage"
import { TS } from "@/lib/colors"
import TopBar from "@/components/TopBar"
import Footer from "@/components/Footer"
import { CategoryScores, Language } from "@/types"

const CATEGORY_ORDER: (keyof CategoryScores)[] = ["hegemony", "rise", "sustain", "europe"]
const BAR_HEIGHT = 48

export default function Result() {

  const [result, setResult] = useState<ScoreResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lang, setLang] = useState<Language>("en")
  const [sharing, setSharing] = useState(false)
  const [clubName, setClubName] = useState<string>("")

  useEffect(() => {
    const storedLang = localStorage.getItem("lang")
    if (storedLang === "tr" || storedLang === "en") setLang(storedLang as Language)

    const storedClub = localStorage.getItem("clubName")
    if (storedClub) setClubName(storedClub)

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

  const handleShare = async () => {
    if (!result || sharing) return
    setSharing(true)
    try {
      const blob = await generateShareImage(result, lang, clubName)
      const file = new File([blob], "tri-result.png", { type: "image/png" })
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file] })
      } else {
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "tri-result.png"
        a.click()
        URL.revokeObjectURL(url)
      }
    } finally {
      setSharing(false)
    }
  }

  if (error) return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <TopBar lang={lang} setLang={handleSetLang} />
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px", paddingTop: BAR_HEIGHT + 40 }}>
        <p style={{ color: TS.bordeaux }}>{translations.errorAnswers[lang]}</p>
        <a href="/quiz">
          <button style={{ marginTop: 10, padding: "10px 24px", background: TS.bordeaux, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
            {translations.retake[lang]}
          </button>
        </a>
      </div>
    </div>
  )

  if (!result) return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <TopBar lang={lang} setLang={handleSetLang} />
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px", paddingTop: BAR_HEIGHT + 40 }}>
        <p style={{ color: "#666" }}>{translations.loading[lang]}</p>
      </div>
    </div>
  )

  const level = getLevel(result.total)

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>

      <TopBar lang={lang} setLang={handleSetLang} />

      {/* Score hero — starts right below fixed bar */}
      <div style={{
        marginTop: BAR_HEIGHT,
        background: `linear-gradient(135deg, ${TS.bordeaux} 0%, ${TS.blue} 100%)`,
        color: "#fff",
        padding: "40px 24px 48px"
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontSize: "4rem", fontWeight: 800, lineHeight: 1 }}>{result.total}</span>
            <span style={{ fontSize: "1.5rem", opacity: 0.6, fontWeight: 400 }}>/ 100</span>
          </div>
          <h2 style={{ margin: "10px 0 0", fontSize: "1.6rem", fontWeight: 700 }}>
            {clubName
              ? translations.resultHeadline[lang](clubName, level.name[lang])
              : level.name[lang]}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px" }}>

        {/* Description */}
        <p style={{
          margin: "0 0 36px",
          padding: "16px 20px",
          background: TS.light,
          borderLeft: `4px solid ${TS.bordeaux}`,
          borderRadius: 4,
          fontSize: "1rem",
          lineHeight: 1.65,
          color: "#333"
        }}>
          {level.description[lang]}
        </p>

        {/* Breakdown */}
        <h3 style={{
          fontSize: "0.8rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#999",
          margin: "0 0 20px"
        }}>
          {translations.breakdown[lang]}
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {CATEGORY_ORDER.map((key, i) => {
            const cat = result.breakdown[key]
            const barColor = i % 2 === 0 ? TS.bordeaux : TS.blue
            return (
              <div key={key}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                  <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#222" }}>
                    {translations.categories[key][lang]}
                  </span>
                  <span style={{ fontSize: "0.9rem", fontWeight: 700, color: barColor }}>
                    {cat.normalized}%
                  </span>
                </div>
                <div style={{ height: 8, background: TS.light, borderRadius: 99 }}>
                  <div style={{
                    height: "100%",
                    width: `${cat.normalized}%`,
                    background: barColor,
                    borderRadius: 99,
                    transition: "width 0.5s ease"
                  }} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="/quiz">
            <button style={{
              padding: "12px 28px",
              fontSize: "0.95rem",
              fontWeight: 700,
              background: TS.bordeaux,
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
              fontWeight: 700,
              background: TS.bg,
              color: TS.blue,
              border: `2px solid ${TS.blue}`,
              borderRadius: 6,
              cursor: "pointer"
            }}>
              {translations.home[lang]}
            </button>
          </a>
          <button
            onClick={handleShare}
            style={{
              padding: "12px 28px",
              fontSize: "0.95rem",
              fontWeight: 700,
              background: sharing ? "#555" : TS.blue,
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              transition: "background 0.2s"
            }}
          >
            {sharing ? translations.sharing[lang] : translations.share[lang]}
          </button>
        </div>

      </div>

      <Footer lang={lang} />
    </div>
  )
}
