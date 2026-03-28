"use client";

import { Question, Language } from "@/types";
import { TS } from "@/lib/colors";
import { translations } from "@/lib/translations";

interface Props {
  question: Question;
  lang: Language;
  onAnswer: (value: number) => void;
}

const catColors: Record<string, string> = {
  hegemony: TS.bordeaux,
  rise:     TS.blue,
  sustain:  TS.gold,
  europe:   "#6B9E6B",
};

const catWeights: Record<string, number> = {
  hegemony: 45,
  rise:     25,
  sustain:  20,
  europe:   10,
};

export default function QuestionCard({ question, lang, onAnswer }: Props) {
  const color  = catColors[question.category];
  const weight = catWeights[question.category];
  const label  = translations.categories[question.category][lang];

  return (
    <div style={{ marginTop: 8 }}>
      {/* Category badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{
          fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase",
          letterSpacing: "0.08em", color,
          background: `${color}12`, border: `1px solid ${color}35`,
          borderRadius: 99, padding: "3px 10px"
        }}>
          {label}
        </span>
        <span style={{
          fontSize: "0.72rem", fontWeight: 700, color: "#aaa"
        }}>
          {weight}%
        </span>
      </div>

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
            background: TS.bg,
            color: "#222",
            border: `1.5px solid ${TS.border}`,
            borderRadius: 8,
            transition: "border-color 0.15s, background 0.15s"
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = TS.bordeaux;
            (e.currentTarget as HTMLButtonElement).style.background = "#faf5f6";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = TS.border;
            (e.currentTarget as HTMLButtonElement).style.background = TS.bg;
          }}
        >
          {option.label[lang]}
        </button>
      ))}
    </div>
  );
}
