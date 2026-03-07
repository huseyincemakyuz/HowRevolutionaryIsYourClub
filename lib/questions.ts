import { Question } from "@/types";

export const questions: Question[] = [
  // Hegemony Breaking (45%) — max 20 pts (4 × 5)
  {
    id: 1,
    category: "hegemony",
    text: {
      tr: "Liginizde uzun yıllar 2–3 kulübün belirgin bir hakimiyeti var mıydı?",
      en: "Was your league historically dominated by 2–3 major clubs for a long period?"
    },
    options: [
      { label: { tr: "Evet, çok net", en: "Yes, clearly" }, value: 5 },
      { label: { tr: "Kısmen", en: "Partially" }, value: 3 },
      { label: { tr: "Hayır", en: "No" }, value: 0 }
    ]
  },
  {
    id: 2,
    category: "hegemony",
    text: {
      tr: "Takımınız bu hakimiyet döneminde şampiyon olabildi mi?",
      en: "Did your club manage to win the league during that dominant era?"
    },
    options: [
      { label: { tr: "Evet", en: "Yes" }, value: 5 },
      { label: { tr: "Çok yaklaştı", en: "Came very close" }, value: 2 },
      { label: { tr: "Hayır", en: "No" }, value: 0 }
    ]
  },
  {
    id: 3,
    category: "hegemony",
    text: {
      tr: "İlk şampiyonluk ulusal ölçekte büyük bir sürpriz veya şok olarak mı görüldü?",
      en: "Was your club's first championship considered a major national surprise?"
    },
    options: [
      { label: { tr: "Evet, büyük şoktu", en: "Yes, it was a huge shock" }, value: 5 },
      { label: { tr: "Kısmen sürpriz oldu", en: "Somewhat surprising" }, value: 3 },
      { label: { tr: "Hayır, bekleniyordu", en: "No, it was expected" }, value: 0 }
    ]
  },
  {
    id: 4,
    category: "hegemony",
    text: {
      tr: "Takımınız bu hakimiyet döneminde birden fazla şampiyonluk kazanarak dengeleri değiştirdi mi?",
      en: "Did your club win multiple championships and disrupt the established balance?"
    },
    options: [
      { label: { tr: "Evet, birden fazla şampiyonluk", en: "Yes, multiple titles" }, value: 5 },
      { label: { tr: "Bir kez kazandı", en: "Won once" }, value: 2 },
      { label: { tr: "Hayır", en: "No" }, value: 0 }
    ]
  },

  // Rise Speed (25%) — max 15 pts (3 × 5)
  {
    id: 5,
    category: "rise",
    text: {
      tr: "Takımınız üst lige çıktıktan sonra kaç sezon içinde şampiyonluk yarışına girdi?",
      en: "How quickly did your club become a title contender after reaching the top division?"
    },
    options: [
      { label: { tr: "1–3 sezonda", en: "Within 1–3 seasons" }, value: 5 },
      { label: { tr: "4–7 sezonda", en: "Within 4–7 seasons" }, value: 3 },
      { label: { tr: "7 sezonu aştı", en: "More than 7 seasons" }, value: 0 }
    ]
  },
  {
    id: 6,
    category: "rise",
    text: {
      tr: "İlk büyük başarı takımınızın üst lige yükselmesinden kısa süre sonra mı geldi?",
      en: "Did your club achieve major success shortly after being promoted to the top division?"
    },
    options: [
      { label: { tr: "Evet, çok kısa sürede", en: "Yes, very quickly" }, value: 5 },
      { label: { tr: "Birkaç yıl içinde", en: "Within a few years" }, value: 3 },
      { label: { tr: "Hayır, uzun zaman aldı", en: "No, it took a long time" }, value: 0 }
    ]
  },
  {
    id: 7,
    category: "rise",
    text: {
      tr: "Takımınızın yükselişi büyük finansal güç olmadan mı gerçekleşti?",
      en: "Did your club rise without major financial power or external investment?"
    },
    options: [
      { label: { tr: "Evet, organik büyüme", en: "Yes, organic growth" }, value: 5 },
      { label: { tr: "Kısmen finansal destek vardı", en: "Some financial backing" }, value: 3 },
      { label: { tr: "Hayır, büyük yatırım vardı", en: "No, heavy investment" }, value: 0 }
    ]
  },

  // Sustainability (20%) — max 15 pts (3 × 5)
  {
    id: 8,
    category: "sustain",
    text: {
      tr: "Takımınız 10 yıllık bir dönemde birçok sezon şampiyonluk yarışının içinde kaldı mı?",
      en: "Did your club remain a title contender for multiple seasons over a decade?"
    },
    options: [
      { label: { tr: "Evet, sürekli yarışın içindeydi", en: "Yes, consistently competitive" }, value: 5 },
      { label: { tr: "Birkaç sezon", en: "A few seasons" }, value: 3 },
      { label: { tr: "Hayır", en: "No" }, value: 0 }
    ]
  },
  {
    id: 9,
    category: "sustain",
    text: {
      tr: "Takımınız bir dönemde ligin en güçlü takımlarından biri haline geldi mi?",
      en: "Did your club become one of the dominant teams of its era?"
    },
    options: [
      { label: { tr: "Evet, ligde lider konumdaydı", en: "Yes, a league leader" }, value: 5 },
      { label: { tr: "Üst sıralardaydı", en: "Near the top" }, value: 3 },
      { label: { tr: "Hayır", en: "No" }, value: 0 }
    ]
  },
  {
    id: 10,
    category: "sustain",
    text: {
      tr: "İlk başarı döneminden sonra da ligde rekabetçi kalabildi mi?",
      en: "Did your club remain competitive after its first successful era?"
    },
    options: [
      { label: { tr: "Evet, uzun vadeli rekabet", en: "Yes, long-term competitiveness" }, value: 5 },
      { label: { tr: "Kısmen", en: "Partially" }, value: 3 },
      { label: { tr: "Hayır, geriledi", en: "No, declined" }, value: 0 }
    ]
  },

  // European Impact (10%) — max 10 pts (2 × 5)
  {
    id: 11,
    category: "europe",
    text: {
      tr: "Takımınız Avrupa kupalarında büyük futbol devlerine karşı unutulmaz galibiyetler aldı mı?",
      en: "Has your club achieved memorable victories against major European giants?"
    },
    options: [
      { label: { tr: "Evet, birden fazla kez", en: "Yes, multiple times" }, value: 5 },
      { label: { tr: "Bir kez", en: "Once" }, value: 3 },
      { label: { tr: "Hayır", en: "No" }, value: 0 }
    ]
  },
  {
    id: 12,
    category: "europe",
    text: {
      tr: "Bu Avrupa başarıları, ülkenizdeki daha zengin veya daha büyük kulüplerden önce mi geldi?",
      en: "Did these European successes come before the traditionally richer or bigger clubs in your country?"
    },
    options: [
      { label: { tr: "Evet, öncü olduk", en: "Yes, we were pioneers" }, value: 5 },
      { label: { tr: "Eş zamanlıydı", en: "Around the same time" }, value: 2 },
      { label: { tr: "Hayır, sonra geldi", en: "No, they came after" }, value: 0 }
    ]
  }
];
