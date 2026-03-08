"use client";

import { useState, useEffect } from "react";
import { questions } from "@/lib/questions";
import QuestionCard from "@/components/QuestionCard";
import LanguageToggle from "@/components/LanguageToggle";
import { translations } from "@/lib/translations";
import { useRouter } from "next/navigation";
import { Language } from "@/types";

export default function Quiz() {

  const router = useRouter()

  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [current, setCurrent] = useState(0)
  const [lang, setLang] = useState<Language>("en")

  useEffect(() => {
    const stored = localStorage.getItem("lang")
    if (stored === "tr" || stored === "en") {
      setLang(stored)
    }
  }, [])

  const handleSetLang = (l: Language) => {
    setLang(l)
    localStorage.setItem("lang", l)
  }

  const question = questions[current]
  const progress = Math.round(((current) / questions.length) * 100)

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
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px", fontFamily: "sans-serif" }}>

      <LanguageToggle lang={lang} setLang={handleSetLang} />

      {/* Progress bar */}
      <div style={{ marginTop: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: "0.85rem", color: "#666" }}>
            {translations.question[lang]} {current + 1} / {questions.length}
          </span>
          <span style={{ fontSize: "0.85rem", color: "#666" }}>
            {progress}%
          </span>
        </div>
        <div style={{ height: 6, background: "#e5e5e5", borderRadius: 99 }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "#111",
            borderRadius: 99,
            transition: "width 0.3s ease"
          }} />
        </div>
      </div>

      <QuestionCard
        question={question}
        lang={lang}
        onAnswer={handleAnswer}
      />

    </div>
  )
}
