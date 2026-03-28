"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { TS } from "@/lib/colors";
import { Language } from "@/types";

const BAR_HEIGHT = 48;

const t = {
  pageTitle:    { tr: "Model Hakkında",                          en: "About the Model"                         },
  pageSubtitle: { tr: "TRI nasıl çalışır?",                     en: "How does TRI work?"                      },

  sec1Title:    { tr: "TRI Ne Ölçer?",                          en: "What Does TRI Measure?"                  },
  sec1Body:     {
    tr: "Trabzonspor Devrim Endeksi (TRI), bir futbol kulübünün kendi ülkesindeki yerleşik güç yapısını ne ölçüde sarstığını sayısal olarak gösterir. Kupa sayısı değil, düzeni kırma gücü esas alınır. Trabzonspor'un neden ilham kaynağı olduğunu öğrenmek için TopBar'daki \"Neden TRI?\" butonuna bakabilirsin.",
    en: "The Trabzonspor Revolution Index (TRI) quantifies how much a football club has disrupted the established power structure in its own country. It is not about trophies — it is about the power to break the system. To understand why Trabzonspor is the inspiration, see the \"Why TRI?\" button in the top bar."
  },

  sec2Title:    { tr: "Dört Boyut",                              en: "The Four Dimensions"                     },

  dimensions: [
    {
      key: "hegemony",
      name:   { tr: "Hegemonya Kırma",       en: "Breaking Domestic Dominance" },
      weight: 45,
      desc: {
        tr: "Kulübün, ligin köklü büyük güçlerinin uzun süreli hakimiyetini ne ölçüde kırdığını ölçer.",
        en: "Measures how much the club broke the long-standing dominance of the league's established powers."
      },
      rationale: {
        tr: "En yüksek ağırlık, çünkü bir devrim öncelikle mevcut hiyerarşiyi yıkmakla başlar. Kısa vadeli sürprizden çok sistematik kırılım aranır.",
        en: "Highest weight because a revolution begins with dismantling the existing hierarchy. Systematic disruption matters more than a one-off surprise."
      }
    },
    {
      key: "rise",
      name:   { tr: "Yükseliş Hızı",         en: "Speed of Rise"               },
      weight: 25,
      desc: {
        tr: "Kulübün şampiyonluğa ne kadar hızlı ve beklenmedik bir biçimde yükseldiğini ölçer.",
        en: "Measures how quickly and unexpectedly the club rose to championship contention."
      },
      rationale: {
        tr: "Hız, devrimi sıradan bir başarıdan ayıran temel unsurdur. Organik büyüme ve kısa sürede zirveye ulaşmak, devrimci niteliği güçlendirir.",
        en: "Speed is what separates revolution from ordinary success. Organic growth and a rapid rise to the top amplify the revolutionary character."
      }
    },
    {
      key: "sustain",
      name:   { tr: "Sürdürülebilirlik",      en: "Sustainability"              },
      weight: 20,
      desc: {
        tr: "Kulübün ilk başarı döneminin ardından rekabetçiliğini koruyup koruyamadığını ölçer.",
        en: "Measures whether the club maintained its competitiveness after its initial successful era."
      },
      rationale: {
        tr: "Tek sezonluk mucize bir devrim sayılmaz. Ancak sürdürülebilirlik, yükseliş hızından daha az kritiktir; zira kalıcı güç istikrarı devrimci niteliği azaltabilir.",
        en: "A single miraculous season is not a revolution. However, sustainability is weighted less than rise speed — because becoming permanently powerful can dilute the revolutionary nature."
      }
    },
    {
      key: "europe",
      name:   { tr: "Avrupa Etkisi",          en: "European Impact"             },
      weight: 10,
      desc: {
        tr: "Kulübün Avrupa kupalarında kendi ülkesinin yerleşik güçlerinin önüne beklenmedik biçimde geçip geçmediğini ölçer.",
        en: "Measures whether the club unexpectedly surpassed its country's established powers in European competition."
      },
      rationale: {
        tr: "Avrupa performansı değerli ama zorunlu değil. Birçok devrimci kulüp yerel başarıyla öne çıkmış, Avrupa'ya erişimi sınırlı kalmıştır.",
        en: "European performance is valuable but not mandatory. Many revolutionary clubs made their mark domestically with limited access to European competition."
      }
    }
  ],

  sec3Title:    { tr: "Skor Nasıl Hesaplanır?",                 en: "How Is the Score Calculated?"            },
  sec3Step1:    { tr: "Her boyuttaki ham puanın maksimuma oranı hesaplanır.", en: "The ratio of raw score to maximum is calculated for each dimension." },
  sec3Step2:    { tr: "Bu oran ilgili ağırlıkla çarpılır.",      en: "That ratio is multiplied by the dimension's weight."                          },
  sec3Step3:    { tr: "Dört boyutun ağırlıklı puanları toplanır.", en: "The weighted scores from all four dimensions are summed."                  },
  sec3MaxLabel: { tr: "Maks. ham puan",                          en: "Max raw score"                           },
  sec3Example:  {
    tr: "Örnek: Hegemonya boyutunda 16/20 puan → %80 × 45 = 36 puan katkı",
    en: "Example: 16/20 in Hegemony → 80% × 45 = 36 points contribution"
  },

  sec4Title:    { tr: "Puan Kategorileri",                       en: "Score Tiers"                             },
  tiers: [
    { range: "100",   name: { tr: "Kıstas (TRI)",         en: "The Benchmark (TRI)"      }, desc: { tr: "Futbol devriminin en saf hali.", en: "The purest form of football revolution." } },
    { range: "90–99", name: { tr: "Trabzon Çaplı Devrim", en: "Trabzon-Level Revolution" }, desc: { tr: "Olağanüstü düzeyde bir düzeni bozma.", en: "An extraordinary level of disruption." } },
    { range: "81–89", name: { tr: "Güçlü Devrim",         en: "Strong Revolution"        }, desc: { tr: "Güç yapısına ciddi meydan okuma.", en: "A serious challenge to the power structure." } },
    { range: "61–80", name: { tr: "Hegemonya Kırıcı",     en: "Hegemony Breaker"         }, desc: { tr: "Lig hakimiyetini sarstı, sürdürülemedi.", en: "Disrupted league dominance, but couldn't sustain it." } },
    { range: "41–60", name: { tr: "Lig Bozucu",           en: "League Disruptor"         }, desc: { tr: "Anlamlı etki, hiyerarşi kırılamadı.", en: "Meaningful impact, but hierarchy wasn't broken." } },
    { range: "21–40", name: { tr: "Köklü Güç",            en: "Established Power"        }, desc: { tr: "Saygın kulüp — ama bu endeks geleneğe değil, kırılıma bakar.", en: "Respected club — but this index measures disruption, not tradition." } },
    { range: "0–20",  name: { tr: "Statüko",              en: "The Status Quo"           }, desc: { tr: "Sistem karşısında değil, sistemin kendisisin.", en: "Not against the system — you are what others have to change against." } },
  ],

  sec5Title:    { tr: "Sınırlamalar",                            en: "Limitations"                             },
  limitations: [
    {
      title: { tr: "Kullanıcı Tarafından Raporlanır",   en: "Self-Reported"              },
      body:  { tr: "Cevaplar kulübü değerlendiren kişi tarafından girilir. Bu, öznel bir yorum içerir.", en: "Answers are entered by whoever is evaluating the club. This inherently involves subjective interpretation." }
    },
    {
      title: { tr: "Tarihsel Bağlam Değişkendir",        en: "Historical Context Varies"  },
      body:  { tr: "\"Hegemonya\" kavramı ligden lige farklı anlam taşır. Küçük bir ligde hegemonya kırmak ile büyük bir ligde kırmak doğrudan karşılaştırılamaz.", en: "\"Hegemony\" means different things in different leagues. Breaking dominance in a small league is not directly comparable to doing so in a major one." }
    },
    {
      title: { tr: "Anlık Kesit",                         en: "Snapshot in Time"           },
      body:  { tr: "Skor, bugün bakılan tarihsel dönemi yansıtır. Kulübün sonraki dönemlerdeki gelişimi skoru değiştirebilir.", en: "The score reflects the historical era being evaluated at a given moment. A club's later trajectory can change its score." }
    }
  ]
};

const dimColors: Record<string, string> = {
  hegemony: TS.bordeaux,
  rise:     TS.blue,
  sustain:  TS.gold,
  europe:   "#6B9E6B"
};

export default function About() {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "tr" || stored === "en") setLang(stored as Language);
  }, []);

  const handleSetLang = (l: Language) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  return (
    <main style={{ fontFamily: "Arial, sans-serif" }}>
      <TopBar lang={lang} setLang={handleSetLang} />

      {/* Hero */}
      <div style={{
        marginTop: BAR_HEIGHT,
        background: `linear-gradient(135deg, ${TS.bordeaux} 0%, ${TS.blue} 100%)`,
        color: "#fff",
        padding: "40px 24px 48px"
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ margin: "0 0 6px", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.7 }}>
            Trabzon Revolution Index
          </p>
          <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: 800, lineHeight: 1.2 }}>
            {t.pageTitle[lang]}
          </h1>
          <p style={{ margin: "10px 0 0", fontSize: "1rem", opacity: 0.85 }}>
            {t.pageSubtitle[lang]}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ background: TS.bg }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 64px", display: "flex", flexDirection: "column", gap: 52 }}>

          {/* Section 1 — What TRI Measures */}
          <section>
            <SectionHeading>{t.sec1Title[lang]}</SectionHeading>
            <p style={{ margin: 0, fontSize: "1rem", color: "#444", lineHeight: 1.8 }}>
              {t.sec1Body[lang]}
            </p>
          </section>

          <Divider />

          {/* Section 2 — Four Dimensions */}
          <section>
            <SectionHeading>{t.sec2Title[lang]}</SectionHeading>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {t.dimensions.map((dim) => {
                const color = dimColors[dim.key];
                return (
                  <div key={dim.key} style={{
                    border: `1.5px solid ${color}30`,
                    borderLeft: `4px solid ${color}`,
                    borderRadius: 8,
                    padding: "16px 18px",
                    background: "#fff"
                  }}>
                    {/* Header row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                      <span style={{ fontWeight: 800, fontSize: "0.97rem", color: "#111" }}>
                        {dim.name[lang]}
                      </span>
                      <span style={{
                        fontWeight: 800, fontSize: "1rem", color,
                        background: `${color}15`, padding: "2px 12px", borderRadius: 99
                      }}>
                        {dim.weight}%
                      </span>
                    </div>

                    {/* Weight bar */}
                    <div style={{ height: 5, background: "#eee", borderRadius: 99, marginBottom: 12 }}>
                      <div style={{
                        height: "100%",
                        width: `${dim.weight}%`,
                        background: color,
                        borderRadius: 99
                      }} />
                    </div>

                    {/* Description */}
                    <p style={{ margin: "0 0 8px", fontSize: "0.9rem", color: "#333", lineHeight: 1.65 }}>
                      {dim.desc[lang]}
                    </p>

                    {/* Rationale */}
                    <p style={{ margin: 0, fontSize: "0.82rem", color: "#777", lineHeight: 1.6, fontStyle: "italic" }}>
                      {dim.rationale[lang]}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <Divider />

          {/* Section 3 — How score is calculated */}
          <section>
            <SectionHeading>{t.sec3Title[lang]}</SectionHeading>

            {/* Steps */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {[t.sec3Step1[lang], t.sec3Step2[lang], t.sec3Step3[lang]].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{
                    minWidth: 24, height: 24, borderRadius: "50%",
                    background: TS.bordeaux, color: "#fff",
                    fontSize: "0.75rem", fontWeight: 800,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 1
                  }}>{i + 1}</span>
                  <span style={{ fontSize: "0.92rem", color: "#333", lineHeight: 1.65 }}>{step}</span>
                </div>
              ))}
            </div>

            {/* Dimension max table */}
            <div style={{ border: `1.5px solid ${TS.light}`, borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.87rem" }}>
                <thead>
                  <tr style={{ background: `${TS.bordeaux}10`, borderBottom: `1.5px solid ${TS.light}` }}>
                    <th style={{ textAlign: "left", padding: "8px 12px", color: "#555", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      {lang === "tr" ? "Boyut" : "Dimension"}
                    </th>
                    <th style={{ textAlign: "center", padding: "8px 12px", color: "#555", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      {t.sec3MaxLabel[lang]}
                    </th>
                    <th style={{ textAlign: "center", padding: "8px 12px", color: "#555", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      {lang === "tr" ? "Ağırlık" : "Weight"}
                    </th>
                    <th style={{ textAlign: "center", padding: "8px 12px", color: "#555", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                      {lang === "tr" ? "Maks. Katkı" : "Max Contribution"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { key: "hegemony", max: 20, weight: 45 },
                    { key: "rise",     max: 15, weight: 25 },
                    { key: "sustain",  max: 15, weight: 20 },
                    { key: "europe",   max: 10, weight: 10 },
                  ].map((row, i) => {
                    const dim = t.dimensions.find(d => d.key === row.key)!;
                    const color = dimColors[row.key];
                    return (
                      <tr key={row.key} style={{ background: i % 2 === 0 ? "#fafafa" : "#fff", borderBottom: `1px solid ${TS.light}` }}>
                        <td style={{ padding: "9px 12px", fontWeight: 700, color, fontSize: "0.87rem" }}>
                          {dim.name[lang]}
                        </td>
                        <td style={{ padding: "9px 12px", textAlign: "center", color: "#555" }}>{row.max} pts</td>
                        <td style={{ padding: "9px 12px", textAlign: "center", color: "#555" }}>{row.weight}%</td>
                        <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 700, color: "#333" }}>{row.weight} pts</td>
                      </tr>
                    );
                  })}
                  <tr style={{ background: `${TS.bordeaux}08`, borderTop: `2px solid ${TS.bordeaux}30` }}>
                    <td colSpan={3} style={{ padding: "9px 12px", fontWeight: 800, color: TS.bordeaux, fontSize: "0.87rem" }}>
                      {lang === "tr" ? "Toplam" : "Total"}
                    </td>
                    <td style={{ padding: "9px 12px", textAlign: "center", fontWeight: 800, color: TS.bordeaux }}>100 pts</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Example */}
            <div style={{
              background: `${TS.blue}10`,
              border: `1.5px solid ${TS.blue}35`,
              borderRadius: 7,
              padding: "10px 14px",
              fontSize: "0.85rem",
              color: "#444",
              lineHeight: 1.6
            }}>
              {t.sec3Example[lang]}
            </div>
          </section>

          <Divider />

          {/* Section 4 — Score Tiers */}
          <section>
            <SectionHeading>{t.sec4Title[lang]}</SectionHeading>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {t.tiers.map((tier, i) => (
                <div key={tier.range} style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  background: i === 0 ? `${TS.bordeaux}10` : "#fff",
                  border: i === 0 ? `1.5px solid ${TS.bordeaux}50` : `1.5px solid ${TS.light}`,
                  borderRadius: 7,
                  padding: "10px 14px"
                }}>
                  <span style={{
                    minWidth: 48, fontSize: "0.75rem", fontWeight: 800,
                    color: i === 0 ? TS.bordeaux : TS.blue,
                    letterSpacing: "0.03em", paddingTop: 2
                  }}>
                    {tier.range}
                  </span>
                  <div>
                    <div style={{ fontWeight: i === 0 ? 800 : 600, fontSize: "0.92rem", color: i === 0 ? TS.bordeaux : "#222", marginBottom: 2 }}>
                      {tier.name[lang]}
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "#666", lineHeight: 1.5 }}>
                      {tier.desc[lang]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* Section 5 — Limitations */}
          <section>
            <SectionHeading>{t.sec5Title[lang]}</SectionHeading>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {t.limitations.map((item, i) => (
                <div key={i} style={{
                  background: "#fff",
                  border: `1.5px solid ${TS.light}`,
                  borderRadius: 7,
                  padding: "12px 16px"
                }}>
                  <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#222", marginBottom: 4 }}>
                    {item.title[lang]}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.65 }}>
                    {item.body[lang]}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          {/* CTA */}
          <div style={{ textAlign: "center" }}>
            <Link href="/quiz">
              <button style={{
                padding: "14px 40px",
                fontSize: "1rem",
                fontWeight: 700,
                background: TS.bordeaux,
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                letterSpacing: "0.03em"
              }}>
                {lang === "tr" ? "Testi Başlat" : "Start the Test"}
              </button>
            </Link>
          </div>

        </div>
      </div>

      <Footer lang={lang} />
    </main>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      margin: "0 0 20px",
      fontSize: "1.1rem",
      fontWeight: 800,
      color: "#111",
      borderBottom: `2px solid ${TS.bordeaux}25`,
      paddingBottom: 10
    }}>
      {children}
    </h2>
  );
}

function Divider() {
  return <hr style={{ border: "none", borderTop: `1.5px solid ${TS.bordeaux}15`, margin: 0 }} />;
}
