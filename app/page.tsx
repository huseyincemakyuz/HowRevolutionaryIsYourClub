"use client";

import { useState } from "react";
import Link from "next/link";
import { translations } from "@/lib/translations";
import LanguageToggle from "@/components/LanguageToggle";
import { Language } from "@/types";

export default function Home() {
  const [lang, setLang] = useState<Language>("en");

  const handleSetLang = (l: Language) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  return (
    <main style={{ padding: 40 }}>
      <LanguageToggle lang={lang} setLang={handleSetLang} />

      <h1>{translations.title[lang]}</h1>
      <h2>{translations.subtitle[lang]}</h2>
      <p>{translations.description[lang]}</p>

      <Link href="/quiz">
        <button>{translations.start[lang]}</button>
      </Link>
    </main>
  );
}
