"use client";

import { Language } from "@/types";

interface Props {
  lang: Language;
  setLang: (l: Language) => void;
}

export default function LanguageToggle({ lang, setLang }: Props) {
  return (
    <div style={{ textAlign: "right" }}>
      <button onClick={() => setLang("tr")} disabled={lang === "tr"}>
        TR
      </button>
      <button onClick={() => setLang("en")} disabled={lang === "en"}>
        EN
      </button>
    </div>
  );
}