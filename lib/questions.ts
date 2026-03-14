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
      tr: "İlk şampiyonluğunuzu kazandığınızda takımınız bir outsider veya yeni güç müydü?",
      en: "Was your club considered an outsider or newcomer to power when you first won the league?"
    },
    options: [
      { label: { tr: "Evet, dışarıdan geldik", en: "Yes, we were outsiders" }, value: 5 },
      { label: { tr: "Kısmen", en: "Partially" }, value: 2 },
      { label: { tr: "Hayır, zaten güçlü bir kulüptük", en: "No, we were already a traditional power" }, value: 0 }
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
      tr: "Geleneksel güç yapısının dışından gelerek birden fazla şampiyonluk kazandı mı?",
      en: "Did your club win multiple titles despite coming from outside the traditional power structure?"
    },
    options: [
      { label: { tr: "Evet, güç yapısının dışındandık", en: "Yes, we came from outside the power structure" }, value: 5 },
      { label: { tr: "Bir kez, geleneksel olmayan şekilde", en: "Once, in an unconventional way" }, value: 2 },
      { label: { tr: "Hayır", en: "No" }, value: 0 }
    ]
  },

  // Rise Speed (25%) — max 15 pts (3 × 5)
  {
    id: 5,
    category: "rise",
    text: {
      tr: "Şampiyonluk yarışına girmeden önce takımınız uzun süre üst ligin dışında mıydı?",
      en: "Was your club absent from the top division for a significant period before its title-winning era?"
    },
    options: [
      { label: { tr: "Evet, uzun süre dışardaydık", en: "Yes, we were away for a long time" }, value: 5 },
      { label: { tr: "Kısa süre dışardaydık", en: "We were briefly away" }, value: 3 },
      { label: { tr: "Hayır, hep tepedeyidik", en: "No, we were always in the top division" }, value: 0 }
    ]
  },
  {
    id: 6,
    category: "rise",
    text: {
      tr: "Şampiyonluğunuzu kazandığınız sezon, önceki yıllarda alt sıralarda mıydınız?",
      en: "In the season your club won the championship, were they coming from a lower table position in previous years?"
    },
    options: [
      { label: { tr: "Evet, o sezon büyük bir sıçrama yaptık", en: "Yes, we made a huge leap that season" }, value: 5 },
      { label: { tr: "Orta sıralardandık", en: "We were in mid-table" }, value: 3 },
      { label: { tr: "Hayır, zaten üst sıralarda beklenen bir kulüptük", en: "No, we were already expected to be at the top" }, value: 0 }
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
      tr: "Beklenmediğiniz bir dönemde, favori olmayan takım olarak lider konuma geldiniz mi?",
      en: "Did your club rise to the top as an unexpected, non-favorite team during its dominant era?"
    },
    options: [
      { label: { tr: "Evet, kimse beklemiyordu", en: "Yes, no one expected it" }, value: 5 },
      { label: { tr: "Kısmen sürprizdi", en: "It was somewhat surprising" }, value: 3 },
      { label: { tr: "Hayır, zaten güçlü bir kulüptük", en: "No, we were already a strong club" }, value: 0 }
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
      tr: "Takımınız Avrupa kupalarına katıldığı ilk yıllarda, ülkenizin yerleşik büyük kulüplerinin önüne beklenmedik biçimde geçerek öncü bir rol oynadı mı?",
      en: "In the early years of your club's participation in European competitions, did they unexpectedly surpass the established major clubs in your country, playing a pioneering role?"
    },
    options: [
      { label: { tr: "Evet, beklenmedik biçimde öne çıktık", en: "Yes, we unexpectedly led the way" }, value: 5 },
      { label: { tr: "Kısmen, bazı önemli sonuçlar aldık", en: "Partially, we had some notable results" }, value: 3 },
      { label: { tr: "Hayır", en: "No" }, value: 0 }
    ]
  },
  {
    id: 12,
    category: "europe",
    text: {
      tr: "Takımınız Avrupa kupalarında büyük Avrupa kulüplerine karşı sembolik galibiyetler elde etti mi ve bu galibiyetleri ülkenizin diğer büyük kulüplerinden önce mi aldı?",
      en: "Did your club achieve symbolic victories against major European clubs, and did they do so before the other big clubs in your country?"
    },
    options: [
      { label: { tr: "Evet, sembolik galibiyetler aldık ve ilk bizdik", en: "Yes, symbolic wins — and we were first" }, value: 5 },
      { label: { tr: "Kısmen, bazı önemli galibiyetler aldık", en: "Partially, we had some significant wins" }, value: 2 },
      { label: { tr: "Hayır", en: "No" }, value: 0 }
    ]
  }
];
