import { calculateScore } from "@/lib/scoring";

export interface ExampleClub {
  name: string;
  era: string;
  league: { tr: string; en: string };
  country: string;
  note: { tr: string; en: string };
  scores: { hegemony: number; rise: number; sustain: number; europe: number };
  total: number;
  breakdown: ReturnType<typeof calculateScore>["breakdown"];
}

const raw: {
  name: string;
  era: string;
  league: { tr: string; en: string };
  country: string;
  note: { tr: string; en: string };
  scores: { hegemony: number; rise: number; sustain: number; europe: number };
}[] = [
  {
    name: "Trabzonspor",
    era: "1975–84",
    league: { tr: "Süper Lig", en: "Süper Lig" },
    country: "TR",
    note: {
      tr: "İstanbul hegemonyasını 6 şampiyonlukla kıran Anadolu kulübü.",
      en: "The Anatolian club that broke Istanbul's hegemony with 6 titles."
    },
    scores: { hegemony: 20, rise: 15, sustain: 15, europe: 10 }
  },
  {
    name: "Real Sociedad",
    era: "1981–82",
    league: { tr: "La Liga", en: "La Liga" },
    country: "ES",
    note: {
      tr: "Üst üste iki La Liga şampiyonluğuyla Real/Barça düzenini sarsan Bask kulübü.",
      en: "The Basque club that shook the Real/Barça order with back-to-back La Liga titles."
    },
    scores: { hegemony: 20, rise: 13, sustain: 11, europe: 5 }
  },
  {
    name: "Deportivo La Coruña",
    era: "1999–2004",
    league: { tr: "La Liga", en: "La Liga" },
    country: "ES",
    note: {
      tr: "La Liga şampiyonu, Milan'ı 4-0'la geçip ŞL yarı finaline ulaştı.",
      en: "La Liga champions who beat Milan 4-0 to reach the Champions League semi-finals."
    },
    scores: { hegemony: 17, rise: 11, sustain: 13, europe: 10 }
  },
  {
    name: "Nottingham Forest",
    era: "1977–80",
    league: { tr: "1. Lig (İngiltere)", en: "First Division" },
    country: "GB",
    note: {
      tr: "2. Lig'den yükselerek arka arkaya iki Avrupa Kupası kazandı.",
      en: "Promoted from Division 2, won back-to-back European Cups."
    },
    scores: { hegemony: 17, rise: 13, sustain: 8, europe: 10 }
  },
  {
    name: "Leicester City",
    era: "2015–16",
    league: { tr: "Premier Lig", en: "Premier League" },
    country: "GB",
    note: {
      tr: "5000'de 1 oranıyla Premier Lig şampiyonu olan mucize kulüp.",
      en: "The miracle club that won the Premier League at 5000-to-1 odds."
    },
    scores: { hegemony: 17, rise: 15, sustain: 8, europe: 5 }
  },
  {
    name: "Kaiserslautern",
    era: "1997–98",
    league: { tr: "Bundesliga", en: "Bundesliga" },
    country: "DE",
    note: {
      tr: "2. Lig'den yeni çıkmış bir takım olarak Bundesliga'yı kazandı.",
      en: "Won the Bundesliga as a freshly promoted side from the second division."
    },
    scores: { hegemony: 17, rise: 15, sustain: 5, europe: 3 }
  },
  {
    name: "Montpellier",
    era: "2011–12",
    league: { tr: "Ligue 1", en: "Ligue 1" },
    country: "FR",
    note: {
      tr: "PSG ve Marsilya'nın gölgesinde beklenmedik Ligue 1 şampiyonluğu.",
      en: "An unexpected Ligue 1 title in the shadow of PSG and Marseille."
    },
    scores: { hegemony: 15, rise: 15, sustain: 5, europe: 0 }
  }
];

export const exampleClubs: ExampleClub[] = raw.map(club => {
  const result = calculateScore(club.scores);
  return { ...club, total: result.total, breakdown: result.breakdown };
});
