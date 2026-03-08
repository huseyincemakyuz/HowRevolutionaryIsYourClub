"use client";

import { Question, Language } from "@/types";
import { TS } from "@/lib/colors";

interface Props {
  question: Question;
  lang: Language;
  onAnswer: (value: number) => void;
}

export default function QuestionCard({ question, lang, onAnswer }: Props) {
  return (
    <div style={{ marginTop: 8 }}>
      <h2 style={{ fontSize: "1.15rem", fontWeight: 700, lineHeight: 1.5, color: "#111", marginBottom: 20 }}>
        {question.text[lang]}
      </h2>

      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswer(option.value)}
          style={{
            display: "block",
            width: "100%",
            marginTop: 10,
            padding: "12px 16px",
            textAlign: "left",
            fontSize: "0.95rem",
            cursor: "pointer",
            background: "#fff",
            color: "#222",
            border: `1.5px solid #ddd`,
            borderRadius: 8,
            transition: "border-color 0.15s, background 0.15s"
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = TS.bordeaux;
            (e.currentTarget as HTMLButtonElement).style.background = "#faf5f6";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#ddd";
            (e.currentTarget as HTMLButtonElement).style.background = "#fff";
          }}
        >
          {option.label[lang]}
        </button>
      ))}
    </div>
  );
}
