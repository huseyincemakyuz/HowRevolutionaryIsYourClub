import { Question } from "@/types";

export const questions: Question[] = [
  {
    id: 1,
    category: "hegemony",
    text: {
      tr: "Liginizde uzun yıllar 2–3 takımın belirgin hakimiyeti var mıydı?",
      en: "Was your league historically dominated by 2–3 major clubs?"
    },
    options: [
      {
        label: { tr: "Evet, çok net", en: "Yes, clearly dominated" },
        value: 5
      },
      {
        label: { tr: "Kısmen", en: "Partially" },
        value: 3
      },
      {
        label: { tr: "Hayır", en: "No" },
        value: 0
      }
    ]
  },

  {
    id: 2,
    category: "hegemony",
    text: {
      tr: "Takımınız bu hakimiyet döneminde şampiyon oldu mu?",
      en: "Did your club win the league during that dominant era?"
    },
    options: [
      {
        label: { tr: "Evet", en: "Yes" },
        value: 5
      },
      {
        label: { tr: "Çok yaklaştı", en: "Came very close" },
        value: 2
      },
      {
        label: { tr: "Hayır", en: "No" },
        value: 0
      }
    ]
  }

  // burada 10 soru daha olacak
];