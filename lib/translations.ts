export const translations = {
  // Hero
  heroTitle: {
    en: "How Revolutionary Is Your Football Club?",
    tr: "Futbol Kulübün Ne Kadar Devrimci?"
  },

  // Subtitle
  heroSubtitle: {
    en: "A new way to evaluate football clubs — not by trophies, but by how they change the balance of power in football.",
    tr: "Futbol kulüplerini kupalarla değil, futbolun güç dengelerini nasıl değiştirdikleriyle değerlendiren yeni bir model."
  },

  // Short story
  story: {
    en: [
      "In football history, some clubs dominate for decades.",
      "Others quietly challenge them.",
      "But only a few clubs truly disrupt the system and change the hierarchy of the game.",
      "This project measures how revolutionary a football club really is."
    ],
    tr: [
      "Futbol tarihinde bazı kulüpler onlarca yıl boyunca ligi domine eder.",
      "Bazıları ise bu düzene meydan okur.",
      "Ancak çok az futbol kulübü gerçekten sistemi sarsar ve oyunun hiyerarşisini değiştirir.",
      "Bu proje bir futbol kulübünün ne kadar devrimci olduğunu ölçer."
    ]
  },

  // Model name
  modelName: {
    en: "Powered by the Trabzon Revolution Index",
    tr: "Trabzon Devrim Endeksi ile ölçülür"
  },

  // What we measure
  dimensionsTitle: {
    en: "This index evaluates football clubs across four key dimensions:",
    tr: "Bu endeks futbol kulüplerini dört temel boyutta değerlendirir:"
  },

  dimensions: {
    en: [
      "Breaking domestic dominance",
      "Speed of rise to the top",
      "Sustainability of success",
      "Impact against major clubs in Europe"
    ],
    tr: [
      "Yerel hegemonya kırma",
      "Zirveye yükselme hızı",
      "Başarıyı sürdürebilme",
      "Avrupa'da büyük kulüplere karşı etki"
    ]
  },

  // Why TRI section
  whyTRITitle: {
    en: "Why Is Trabzonspor the Benchmark?",
    tr: "Neden Trabzonspor Kıstas?"
  },

  whyTRIStats: {
    en: [
      { period: "1956–1974", label: "All Turkish clubs combined", value: "≈ 14 wins", note: "18 years of European football" },
      { period: "1976–1984", label: "Trabzonspor alone", value: "≈ 7 wins", note: "Beat Liverpool 1–0, Inter Milan 1–0" },
      { period: "1976–1984", label: "All other Turkish clubs", value: "≈ 6 wins", note: "Combined total" }
    ],
    tr: [
      { period: "1956–1974", label: "Tüm Türk kulüpleri toplamı", value: "≈ 14 galibiyet", note: "18 yıllık Avrupa futbolu" },
      { period: "1976–1984", label: "Trabzonspor tek başına", value: "≈ 7 galibiyet", note: "Liverpool'u 1–0, Inter Milan'ı 1–0 yendi" },
      { period: "1976–1984", label: "Diğer tüm Türk kulüpleri", value: "≈ 6 galibiyet", note: "Toplam" }
    ]
  },

  whyTRINote: {
    en: "Trabzonspor — a club from outside Istanbul — single-handedly outperformed every other Turkish club in European competition during their era. That is what a benchmark looks like.",
    tr: "Trabzonspor — İstanbul dışından bir kulüp — kendi döneminde diğer tüm Türk kulüplerini tek başına geçti. İşte kıstas bu demek."
  },

  // Bold line
  boldLine: {
    en: "Not every champion changes football history.",
    tr: "Her şampiyon futbol tarihini değiştirmez."
  },

  // Question to user
  userQuestion: {
    en: "Does your football club belong to the rare group that reshaped the game?",
    tr: "Sizin futbol kulübünüz oyunun dengelerini değiştiren nadir kulüplerden biri mi?"
  },

  // CTA
  start: {
    en: "Start the Test",
    tr: "Testi Başlat"
  },

  // Used in quiz / result pages
  totalScore: {
    en: "Total Score",
    tr: "Toplam Skor"
  },

  breakdown: {
    en: "Category Breakdown",
    tr: "Kategori Kırılımı"
  },

  loading: {
    en: "Loading...",
    tr: "Yükleniyor..."
  },

  errorAnswers: {
    en: "Could not read saved answers. Please retake the quiz.",
    tr: "Cevaplar okunamadı. Lütfen testi tekrar yapın."
  },

  retake: {
    en: "Retake the Test",
    tr: "Testi Tekrar Yap"
  },

  home: {
    en: "Back to Home",
    tr: "Ana Sayfaya Dön"
  },

  question: {
    en: "Question",
    tr: "Soru"
  },

  categories: {
    hegemony: { en: "Breaking Domestic Dominance", tr: "Yerel Hegemonya Kırma" },
    rise:     { en: "Speed of Rise",               tr: "Yükseliş Hızı" },
    sustain:  { en: "Sustainability",               tr: "Sürdürülebilirlik" },
    europe:   { en: "European Impact",              tr: "Avrupa Etkisi" }
  },

  clubPrompt: {
    en: "Enter your football club's name to begin",
    tr: "Başlamak için futbol kulübünün adını gir"
  },

  clubPlaceholder: {
    en: "e.g. Trabzonspor",
    tr: "örn. Trabzonspor"
  },

  clubCta: {
    en: "Start the Test",
    tr: "Testi Başlat"
  },

  resultHeadline: {
    en: (club: string, level: string) => `${club} is a ${level}`,
    tr: (club: string, level: string) => `${club} — ${level}`
  },

  share: {
    en: "Share Result",
    tr: "Sonucu Paylaş"
  },

  sharing: {
    en: "Saving...",
    tr: "Kaydediliyor..."
  }
};
