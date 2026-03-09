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
  const [step, setStep] = useState<"club" | "quiz">("club")
  const [clubName, setClubName] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("lang")
    if (stored === "tr" || stored === "en") setLang(stored as Language)
    const storedClub = localStorage.getItem("clubName")
    if (storedClub) setClubName(storedClub)
  }, [])

  const handleSetLang = (l: Language) => {
    setLang(l)
    localStorage.setItem("lang", l)
  }

  const question = questions[current]
  const progress = Math.round((current / questions.length) * 100)

  const handleClubSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const name = clubName.trim()
    if (!name) return
    localStorage.setItem("clubName", name)
    setStep("quiz")
  }

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

  if (step === "club") return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <TopBar lang={lang} setLang={handleSetLang} />
      <div style={{
        minHeight: `calc(100vh - ${BAR_HEIGHT}px)`,
        marginTop: BAR_HEIGHT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px"
      }}>
        <div style={{ maxWidth: 480, width: "100%" }}>
          <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#222", margin: "0 0 24px", lineHeight: 1.5 }}>
            {translations.clubPrompt[lang]}
          </p>
          <form onSubmit={handleClubSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input
              type="text"
              value={clubName}
              onChange={e => setClubName(e.target.value)}
              placeholder={translations.clubPlaceholder[lang]}
              maxLength={60}
              autoFocus
              style={{
                padding: "14px 18px",
                fontSize: "1.05rem",
                border: `2px solid #D9D7D3`,
                borderRadius: 8,
                outline: "none",
                fontFamily: "Arial, sans-serif",
                color: "#111"
              }}
            />
            <button
              type="submit"
              disabled={!clubName.trim()}
              style={{
                padding: "14px",
                fontSize: "1rem",
                fontWeight: 700,
                background: clubName.trim() ? "#5A0E27" : "#ccc",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: clubName.trim() ? "pointer" : "default",
                transition: "background 0.2s"
              }}
            >
              {translations.clubCta[lang]}
            </button>
          </form>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>

      <TopBar lang={lang} setLang={handleSetLang} />

      {/* Full remaining viewport — center the progress+question block together */}
      <div style={{
        minHeight: `calc(100vh - ${BAR_HEIGHT}px)`,
        marginTop: BAR_HEIGHT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px"
      }}>
        <div style={{ maxWidth: 680, width: "100%" }}>

          {/* Progress bar */}
          <div style={{ marginBottom: 32 }}>
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
