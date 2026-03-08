"use client";

import { useState, useEffect } from "react";
import { questions } from "@/lib/questions";
import QuestionCard from "@/components/QuestionCard";
import TopBar from "@/components/TopBar";
import { translations } from "@/lib/translations";
import { TS } from "@/lib/colors";
import { useRouter } from "next/navigation";
import { Language } from "@/types";

const BAR_HEIGHT = 48;

export default function Quiz() {

  const router = useRouter()
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [current, setCurrent] = useState(0)
  const [lang, setLang] = useState<Language>("en")

  useEffect(() => {
    const stored = localStorage.getItem("lang")
    if (stored === "tr" || stored === "en") setLang(stored as Language)
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
    <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      <TopBar lang={lang} setLang={handleSetLang} />

      {/* Progress bar — fixed just below the top bar */}
      <div style={{
        position: "fixed",
        top: BAR_HEIGHT,
        left: 0, right: 0,
        zIndex: 99,
        background: TS.bg,
        borderBottom: `1px solid ${TS.border}`,
        padding: "12px 24px"
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
            <span style={{ fontSize: "0.8rem", color: "#777" }}>
              {translations.question[lang]} {current + 1} / {questions.length}
            </span>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: TS.bordeaux }}>
              {progress}%
            </span>
          </div>
          <div style={{ height: 6, background: TS.light, borderRadius: 99 }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${TS.bordeaux}, ${TS.blue})`,
              borderRadius: 99,
              transition: "width 0.35s ease"
            }} />
          </div>
        </div>
      </div>

      {/* Question — vertically centered in remaining viewport */}
      <div style={{
        flex: 1,
        paddingTop: BAR_HEIGHT + 64, // fixed bar + progress bar height
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ maxWidth: 680, width: "100%", padding: "0 24px" }}>
          <QuestionCard
            question={question}
            lang={lang}
            onAnswer={handleAnswer}
          />
        </div>
      </div>

    </div>
  )
}
