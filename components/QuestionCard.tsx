"use client";

import { Question, Language } from "@/types";

interface Props {
  question: Question;
  lang: Language;
  onAnswer: (value: number) => void;
}

export default function QuestionCard({ question, lang, onAnswer }: Props) {
  return (
    <div style={{ marginTop: 30 }}>
      <h2>{question.text[lang]}</h2>

      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswer(option.value)}
          style={{
            display: "block",
            marginTop: 10,
            padding: 10,
            width: "100%",
            cursor: "pointer"
          }}
        >
          {option.label[lang]}
        </button>
      ))}
    </div>
  );
}