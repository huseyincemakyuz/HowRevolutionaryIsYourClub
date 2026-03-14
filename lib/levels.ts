export interface Level {
  name: { en: string; tr: string };
  description: { en: string; tr: string };
}

export function getLevel(score: number): Level {
  if (score === 100) return {
    name: {
      en: "The Benchmark (TRI)",
      tr: "Kıstas (TRI)"
    },
    description: {
      en: "The purest form of football revolution. Your club didn't just win — it permanently reshaped the game.",
      tr: "Futbol devriminin en saf hali. Kulübünüz sadece kazanmadı — oyunu kalıcı olarak yeniden şekillendirdi."
    }
  };

  if (score >= 90) return {
    name: {
      en: "Trabzon-Level Revolution",
      tr: "Trabzon Çaplı Devrim"
    },
    description: {
      en: "An extraordinary level of disruption. Your club challenged the established order and left a permanent mark on football history.",
      tr: "Olağanüstü düzeyde bir düzeni bozma. Kulübünüz yerleşik düzene meydan okudu ve futbol tarihinde kalıcı bir iz bıraktı."
    }
  };

  if (score >= 81) return {
    name: {
      en: "Strong Revolution",
      tr: "Güçlü Devrim"
    },
    description: {
      en: "Your club was a serious challenger to football's power structure — and succeeded across multiple dimensions.",
      tr: "Kulübünüz futbolun güç yapısına ciddi bir meydan okudu ve birçok boyutta başarıya ulaştı."
    }
  };

  if (score >= 61) return {
    name: {
      en: "Hegemony Breaker",
      tr: "Hegemonya Kırıcı"
    },
    description: {
      en: "Your club disrupted league dominance but lacked long-term sustainability.",
      tr: "Kulübünüz lig hakimiyetini sarstı ancak uzun vadeli sürdürülebilirlikten yoksundu."
    }
  };

  if (score >= 41) return {
    name: {
      en: "League Disruptor",
      tr: "Lig Bozucu"
    },
    description: {
      en: "Your club made a meaningful impact, but couldn't fully break the established hierarchy.",
      tr: "Kulübünüz anlamlı bir etki yarattı ancak yerleşik hiyerarşiyi tam anlamıyla kıramadı."
    }
  };

  if (score >= 21) return {
    name: {
      en: "Established Power",
      tr: "Köklü Güç"
    },
    description: {
      en: "A respected and established club — but this index measures disruption, not tradition.",
      tr: "Köklü ve saygın bir kulüp — ama bu indeks köklere değil, kırılımlara bakar."
    }
  };

  return {
    name: {
      en: "The Status Quo",
      tr: "Statüko"
    },
    description: {
      en: "Your club isn't against the system — your club is what others have to change against.",
      tr: "Kulübünüz sisteme karşı değil — kulübünüz başkalarının değiştirmek zorunda olduğu sistemin ta kendisi."
    }
  };
}
