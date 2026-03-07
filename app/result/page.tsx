"use client";

import { useEffect, useState } from "react"
import { questions } from "@/lib/questions"
import { calculateScore, ScoreResult } from "@/lib/scoring"
import { getLevel } from "@/lib/levels"
import { CategoryScores } from "@/types"

export default function Result() {

  const [result, setResult] = useState<ScoreResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {

    const stored = localStorage.getItem("answers")

    if (!stored) return

    let answers: Record<number, number>

    try {
      answers = JSON.parse(stored)
    } catch {
      setError("Could not read saved answers. Please retake the quiz.")
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

    const scoreData = calculateScore(categoryScores)

    setResult(scoreData)

  }, [])

  if (error) return <div style={{ padding: 40, color: "red" }}>{error}</div>

  if (!result) return <div>Loading...</div>

  return (

    <div style={{ padding: 40 }}>

      <h1>Total Score: {result.total}</h1>

      <h2>{getLevel(result.total)}</h2>

      <pre>{JSON.stringify(result.breakdown, null, 2)}</pre>

    </div>

  )

}
