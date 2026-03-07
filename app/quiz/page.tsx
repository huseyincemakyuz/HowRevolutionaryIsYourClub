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

    <div style={{ padding: 40 }}>

      <LanguageToggle lang={lang} setLang={handleSetLang} />

      <p style={{ color: "#666", marginTop: 16 }}>
        {translations.question[lang]} {current + 1} / {questions.length}
      </p>

      <QuestionCard
        question={question}
        lang={lang}
        onAnswer={handleAnswer}
      />

    </div>

  )

}
