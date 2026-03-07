export type Category = "hegemony" | "rise" | "sustain" | "europe";
export type Language = "tr" | "en";

export interface Question {
  id: number;
  category: Category;
  text: {
    tr: string;
    en: string;
  };
  options: {
    label: {
      tr: string;
      en: string;
    };
    value: number;
  }[];
}

export interface CategoryScores {
  hegemony: number;
  rise: number;
  sustain: number;
  europe: number;
}