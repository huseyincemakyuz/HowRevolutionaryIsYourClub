"use client";

import { useEffect, useState } from "react"
import { questions } from "@/lib/questions"
import { calculateScore, ScoreResult } from "@/lib/scoring"
import { getLevel } from "@/lib/levels"
import { translations } from "@/lib/translations"
import LanguageToggle from "@/components/LanguageToggle"
import { CategoryScores, Language } from "@/types"

export default function Result() {

  const [result, setResult] = useState<ScoreResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lang, setLang] = useState<Language>("en")

  useEffect(() => {
    const storedLang = localStorage.getItem("lang")
    if (storedLang === "tr" || storedLang === "en") {
      setLang(storedLang)
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

    const categoryScores: CategoryScores = {
      hegemony: 0,
      rise: 0,
      sustain: 0,
      europe: 0
    }

    questions.forEach(q => {
      categoryScores[q.category] += answers[q.id] || 0
    })

    setResult(calculateScore(categoryScores))

  }, [])

  const handleSetLang = (l: Language) => {
    setLang(l)
    localStorage.setItem("lang", l)
  }

  if (error) return (
    <div style={{ padding: 40 }}>
      <LanguageToggle lang={lang} setLang={handleSetLang} />
      <p style={{ color: "red", marginTop: 20 }}>{translations.errorAnswers[lang]}</p>
      <a href="/quiz"><button style={{ marginTop: 10 }}>{translations.retake[lang]}</button></a>
    </div>
  )

  if (!result) return (
    <div style={{ padding: 40 }}>
      <LanguageToggle lang={lang} setLang={handleSetLang} />
      <p style={{ marginTop: 20 }}>{translations.loading[lang]}</p>
    </div>
  )

  return (

    <div style={{ padding: 40 }}>

      <LanguageToggle lang={lang} setLang={handleSetLang} />

      <h1 style={{ marginTop: 20 }}>{translations.totalScore[lang]}: {result.total}</h1>

      <h2>{getLevel(result.total)}</h2>

      <h3>{translations.breakdown[lang]}</h3>

      <pre>{JSON.stringify(result.breakdown, null, 2)}</pre>

    </div>

  )

}
