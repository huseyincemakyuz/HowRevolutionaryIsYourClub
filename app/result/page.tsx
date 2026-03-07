"use client";

import { useEffect,useState } from "react"
import { questions } from "@/lib/questions"
import { calculateScore } from "@/lib/scoring"
import { getLevel } from "@/lib/levels"

export default function Result(){

  const [result,setResult] = useState<any>(null)

  useEffect(()=>{

    const stored = localStorage.getItem("answers")

    if(!stored) return

    const answers = JSON.parse(stored)

    const categoryScores = {
      hegemony:0,
      rise:0,
      sustain:0,
      europe:0
    }

    questions.forEach(q=>{
      categoryScores[q.category]+=answers[q.id] || 0
    })

    const scoreData = calculateScore(categoryScores)

    setResult(scoreData)

  },[])

  if(!result) return <div>Loading...</div>

  return(

    <div style={{padding:40}}>

      <h1>Total Score: {result.total}</h1>

      <h2>{getLevel(result.total)}</h2>

      <pre>{JSON.stringify(result.breakdown,null,2)}</pre>

    </div>

  )

}