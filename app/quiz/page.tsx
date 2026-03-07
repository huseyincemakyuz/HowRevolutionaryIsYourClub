"use client";

import { useState } from "react";
import { questions } from "@/lib/questions";
import QuestionCard from "@/components/QuestionCard";
import { useRouter } from "next/navigation";
import { Language } from "@/types";

export default function Quiz() {

  const router = useRouter()

  const [answers,setAnswers] = useState<{[key:number]:number}>({})
  const [current,setCurrent] = useState(0)

  const lang:Language = "en"

  const question = questions[current]

  const handleAnswer = (value:number) => {

    const updated = { ...answers,[question.id]:value }

    setAnswers(updated)

    if(current+1 < questions.length){
      setCurrent(current+1)
    }else{
      localStorage.setItem("answers",JSON.stringify(updated))
      router.push("/result")
    }

  }

  return(

    <div style={{padding:40}}>

      <QuestionCard
        question={question}
        lang={lang}
        onAnswer={handleAnswer}
      />

    </div>

  )

}