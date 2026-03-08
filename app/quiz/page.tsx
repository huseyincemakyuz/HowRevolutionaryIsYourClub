"use client";

import { useState, useEffect } from "react";
import { questions } from "@/lib/questions";
import QuestionCard from "@/components/QuestionCard";
import LanguageToggle from "@/components/LanguageToggle";
import { translations } from "@/lib/translations";
import { TS } from "@/lib/colors";
import { useRouter } from "next/navigation";
import { Language } from "@/types";

export default function Quiz() {

  const router = useRouter()

  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [current, setCurrent] = useState(0)
  const [lang, setLang] = useState<Language>("en")

  useEffect(() => {
    const stored = localStorage.getItem("lang")
    if (stored === "tr" || stored === "en") setLang(stored)
  }, [])

  const handleSetLang = (l: Language) => {
    setLang(l)
    localStorage.setItem("lang", l)
  }

  const question = questions[current]
  const progress = Math.round((current / questions.length) * 100)

  const handleAnswer = (value: number) => {
    const updated = { ...answers, [question.id]: value }
    setAnswers(updated)

    if (current + 1 < questions.length) {
      setCurrent(current + 1)
    } else {
      localStorage.setItem("answers", JSON.stringify(updated))
      router.push("/result")
    }
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>

      {/* Top bar */}
      <div style={{
        background: `linear-gradient(90deg, ${TS.bordeaux} 0%, ${TS.blue} 100%)`,
        padding: "14px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.04em", opacity: 0.9 }}>
          TRI
        </span>
        <div style={{ border: "2px solid rgba(255,255,255,0.6)", borderRadius: 99, overflow: "hidden", display: "inline-flex" }}>
          {(["tr", "en"] as Language[]).map(l => (
            <button
              key={l}
              onClick={() => handleSetLang(l)}
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

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 24px" }}>

        {/* Progress bar */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: "0.85rem", color: "#666" }}>
              {translations.question[lang]} {current + 1} / {questions.length}
            </span>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: TS.bordeaux }}>
              {progress}%
            </span>
          </div>
          <div style={{ height: 7, background: TS.light, borderRadius: 99 }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${TS.bordeaux}, ${TS.blue})`,
              borderRadius: 99,
              transition: "width 0.35s ease"
            }} />
          </div>
        </div>

        <QuestionCard
          question={question}
          lang={lang}
          onAnswer={handleAnswer}
        />

      </div>
    </div>
  )
}
