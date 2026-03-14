"use client";

import { useState } from "react";
import Link from "next/link";
import { TS } from "@/lib/colors";
import { Language } from "@/types";

interface Props {
  lang: Language;
  setLang: (l: Language) => void;
}

/* ────────────────────────────────────────────────
   Static data
──────────────────────────────────────────────── */

const hegemony1959: { club: { tr: string; en: string }; titles: number }[] = [
  { club: { tr: "Fenerbahçe",        en: "Fenerbahçe"       }, titles: 9 },
  { club: { tr: "Galatasaray",       en: "Galatasaray"      }, titles: 6 },
  { club: { tr: "Beşiktaş",         en: "Beşiktaş"         }, titles: 5 },
  { club: { tr: "Anadolu Kulüpleri", en: "Anatolian Clubs"  }, titles: 0 },
];

const seasons1976: { season: string; champion: { tr: string; en: string }; isTS: boolean }[] = [
  { season: "1975–76", champion: { tr: "Trabzonspor", en: "Trabzonspor" }, isTS: true  },
  { season: "1976–77", champion: { tr: "Trabzonspor", en: "Trabzonspor" }, isTS: true  },
  { season: "1977–78", champion: { tr: "Fenerbahçe",  en: "Fenerbahçe"  }, isTS: false },
  { season: "1978–79", champion: { tr: "Trabzonspor", en: "Trabzonspor" }, isTS: true  },
  { season: "1979–80", champion: { tr: "Trabzonspor", en: "Trabzonspor" }, isTS: true  },
  { season: "1980–81", champion: { tr: "Trabzonspor", en: "Trabzonspor" }, isTS: true  },
  { season: "1981–82", champion: { tr: "Beşiktaş",   en: "Beşiktaş"    }, isTS: false },
  { season: "1982–83", champion: { tr: "Fenerbahçe",  en: "Fenerbahçe"  }, isTS: false },
  { season: "1983–84", champion: { tr: "Trabzonspor", en: "Trabzonspor" }, isTS: true  },
];

const dist1976: { club: string; titles: number; isTS: boolean }[] = [
  { club: "Trabzonspor", titles: 6, isTS: true  },
  { club: "Fenerbahçe",  titles: 2, isTS: false },
  { club: "Beşiktaş",   titles: 1, isTS: false },
  { club: "Galatasaray", titles: 0, isTS: false },
];

const cups1976 = {
  turkish:      ["1976–77", "1977–78", "1983–84"],
  presidential: ["1976", "1977", "1978", "1979", "1980", "1983"],
};

const dist1984: { club: string; titles: number; isTS: boolean }[] = [
  { club: "Fenerbahçe",  titles: 11, isTS: false },
  { club: "Trabzonspor", titles: 6,  isTS: true  },
  { club: "Galatasaray", titles: 6,  isTS: false },
  { club: "Beşiktaş",   titles: 6,  isTS: false },
];

/* European wins 1976–1984 */
const euroWins: {
  opponent: string;
  competition: { tr: string; en: string };
  season: string;
  score: string;
  venue?: string;
  scorer?: string;
  note: { tr: string; en: string };
}[] = [
  {
    opponent: "Liverpool FC",
    competition: { tr: "Avrupa Şampiyon Kulüpler Kupası", en: "European Champion Clubs' Cup" },
    season: "1976–77",
    score: "1–0",
    note: {
      tr: "O sezon Avrupa Kupası'nı kazanan Liverpool'u yenen ilk Türk takımı",
      en: "First Turkish club to defeat Liverpool, who won the European Cup that very same season"
    }
  },
  {
    opponent: "Inter Milan",
    competition: { tr: "UEFA Kupası", en: "UEFA Cup" },
    season: "1983–84",
    score: "1–0",
    note: {
      tr: "Inter'i yenen ilk Türk kulüplerinden biri",
      en: "One of the first Turkish clubs to defeat Inter Milan"
    }
  },
  {
    opponent: "FC Barcelona",
    competition: { tr: "Avrupa Şampiyon Kulüpler Kupası", en: "European Champion Clubs' Cup" },
    season: "1990–91",
    score: "1–0",
    note: {
      tr: "Barcelona'yı mağlup eden ilk Türk takımı",
      en: "First Turkish club to defeat FC Barcelona"
    }
  },  
];

/* European win comparison stats */
const euroStats: { period: string; label: { tr: string; en: string }; value: string; note: { tr: string; en: string }; highlight: boolean }[] = [
  {
    period: "1956–1974",
    label: { tr: "Tüm Türk kulüpleri toplamı", en: "All Turkish clubs combined" },
    value: "≈ 14",
    note: { tr: "18 yıllık Avrupa futbolu", en: "18 years of European football" },
    highlight: false
  },
  {
    period: "1976–1984",
    label: { tr: "Trabzonspor tek başına", en: "Trabzonspor alone" },
    value: "≈ 7",
    note: { tr: "Liverpool 1–0, Inter Milan 1–0", en: "Liverpool 1–0, Inter Milan 1–0" },
    highlight: true
  },
  {
    period: "1976–1984",
    label: { tr: "Diğer tüm Türk kulüpleri toplamı", en: "All other Turkish clubs combined" },
    value: "≈ 6",
    note: { tr: "Aynı dönem toplam", en: "Same period total" },
    highlight: false
  },
];

/* Post-1984 cups */
const cupsAfter1984 = {
  turkish:   ["1991–92", "1994–95", "2002–03", "2003–04", "2009–10", "2019–20"],
  superCup:  ["1995", "2010", "2020", "2022"],
};

/* San Siro result */
const sanSiro = {
  competition: { tr: "UEFA Şampiyonlar Ligi", en: "UEFA Champions League" },
  season: "2011–12",
  venue: "San Siro, Milano",
  score: "0–1",
  scorer: "Halil Altıntop",
};

/* All 8 titles */
const allTitles: { season: string }[] = [
  { season: "1975–76" },
  { season: "1976–77" },
  { season: "1978–79" },
  { season: "1979–80" },
  { season: "1980–81" },
  { season: "1983–84" },
  { season: "2010–11" },
  { season: "2021–22" },
];

/* ────────────────────────────────────────────────
   Text strings
──────────────────────────────────────────────── */
const t = {
  modalTitle:    { tr: "Trabzonspor'u Tanıyalım",          en: "Meet Trabzonspor"                  },
  modalSub:      { tr: "BİR ANADOLU DEVRİMİ",               en: "An Anatolian Revolution"            },

  introTitle:    { tr: "Bu Endeks Neden Var?",               en: "Why Does This Index Exist?"         },
  introBody:     {
    tr: "TRI (Trabzonspor Devrimcilik Endeksi), bir kulübün kendi ülkesindeki köklü büyük-şehir hegemonyasını ne ölçüde kırdığını sayısal olarak göstermek için tasarlandı. İlham kaynağı Trabzonspor'dur; çünkü Trabzonspor bu tür bir dönüşümün dünya genelinde de eşi nadir görülen gerçek bir yaşam örneğidir. Tarihini anlamadan endeksi anlamak güç.",
    en: "TRI (Trabzonspor Revolutionary Index) was designed to quantify how much a club has disrupted the entrenched big-city hegemony in its own country. Its inspiration is Trabzonspor — because Trabzonspor is one of the rarest real-world examples of this kind of transformation anywhere in the world. Understanding the index is hard without understanding the history."
  },

  sec1Title:     { tr: "1959–1974: İstanbul Hegemonyası",   en: "1959–1974: Istanbul Hegemony"       },
  sec1Body:      {
    tr: "Türkiye 1. Ligi 1959'da kuruldu. 1974'e kadar geçen 16 sezonda şampiyonlukların tamamı İstanbul kulüplerine gitti. Bu dönemde Anadolu'dan hiçbir kulüp şampiyon olamadı.",
    en: "The Turkish First Division was founded in 1959. Over the 16 seasons until 1974, every single league title went to an Istanbul club. No Anatolian club was able to win the championship during this period."
  },
  sec1TableNote: { tr: "1959–1974 Şampiyonluk Dağılımı",   en: "1959–1974 Title Distribution"       },

  sec2Title:     { tr: "Trabzonspor'un Yükselişi",          en: "Trabzonspor's Rise"                 },
  sec2Body:      {
    tr: "Trabzonspor 1974–75 sezonunda Türkiye 1. Ligi'ne yükseldi. Yalnızca bir sezon sonra, 1975–76'da şampiyon oldu ve Türk futbol tarihinde yeni bir dönemi başlattı.",
    en: "Trabzonspor was promoted to the Turkish First Division in the 1974–75 season. Just one season later, in 1975–76, they became champions — opening a new chapter in Turkish football history."
  },

  sec3Title:     { tr: "1976–1984: Hegemonyanın Kırılması", en: "1976–1984: Breaking the Hegemony"  },
  sec3Body:      {
    tr: "Trabzonspor, ligdeki ilk 10 yılında 6 lig şampiyonluğu kazandı. İşte o dönemin sezon sezon tablosu:",
    en: "In their first 10 years in the top flight, Trabzonspor won 6 league titles. Here is the season-by-season breakdown:"
  },
  sec3TableNote: { tr: "1976–1984 Şampiyonluk Dağılımı",   en: "1976–1984 Title Distribution"       },

  sec4Title:     { tr: "1976–1984 Arasında Kazanılan Kupalar", en: "Cups Won 1976–1984"              },
  cupTurkish:    { tr: "Türkiye Kupası",                     en: "Turkish Cup"                        },
  cupPresid:     { tr: "Cumhurbaşkanlığı Kupası (Süper Kupa)", en: "Presidential Cup (Super Cup)"    },

  sec5Title:     { tr: "1984 İTİBARIYLA TOPLAM LİG ŞAMPİYONLUKLARI", en: "All-Time League Titles as of 1984" },
  sec5Body:      {
    tr: "1984 sezonu sonunda Türkiye ligi tarihindeki toplam sıralama — Trabzonspor yalnızca 10 yılda köklü İstanbul kulüpleriyle aynı seviyeye ulaşmıştı:",
    en: "After the 1984 season, the all-time standings — Trabzonspor had reached the same level as Istanbul's most historic clubs in just 10 years:"
  },

  closing:       {
    tr: "Trabzonspor'un yaptığı türden bir hegemonya kırılması — yani büyük şehir dışından gelen bir kulübün onlarca yıllık mutlak bir tekeli bu denli sistematik biçimde parçalaması — Türk futbolunda olduğu kadar dünya futbolunda da eşine ender rastlanan bir örnektir. Bu endeksin ilham kaynağı budur.",
    en: "The kind of hegemony-breaking Trabzonspor achieved — a club from outside the major city dismantling a decades-long monopoly this systematically — is not only unique in Turkish football but one of the rarest examples in world football history. This is the inspiration behind this index."
  },

  secEuroTitle:  {
    tr: "AVRUPA DEVLERİNE KARŞI TARİHİ GALİBİYETLER (1976–1984)",
    en: "Historic Wins Against European Giants (1976–1984)"
  },
  secEuroBody:   {
    tr: "Bu dönemde İstanbul'un büyük kulüpleri Avrupa'da bu galibiyetleri elde edemezken, Trabzonspor kıtanın en güçlü takımlarını yendi ve Türk futbolunda ilkler yaşandı:",
    en: "While Istanbul's major clubs could not achieve such results in Europe at the time, Trabzonspor defeated the continent's strongest sides — setting multiple firsts for Turkish football:"
  },
  secEuroStatsTitle: {
    tr: "AVRUPA GALİBİYETLERİ KARŞILAŞTIRMASI",
    en: "European Wins Comparison"
  },
  secEuroStatsNote: {
    tr: "Trabzonspor, üst lige ilk çıktığı dönemde diğer tüm Türk kulüplerini tek başına geçti.",
    en: "Trabzonspor single-handedly surpassed all other Turkish clubs during their initial promotion to the top league."
  },

  secAfterTitle: { tr: "1984 Sonrası: Rekabetin Devamı",   en: "After 1984: Continued Competition"  },
  secAfterBody:  {
    tr: "Trabzonspor 1984 sonrasında da Türk futbolunun en güçlü kulüplerinden biri olarak rekabetçi kalmaya devam etti. Lig şampiyonluğu dışında birçok ulusal kupa kazandı ve Avrupa kupalarında düzenli olarak yer aldı.",
    en: "After 1984, Trabzonspor continued to be one of the strongest clubs in Turkish football — winning multiple national cups and regularly competing in European competitions."
  },
  cupsAfterLabel: { tr: "1984 Sonrası Kazanılan Kupalar",  en: "Cups Won After 1984"                 },
  superCupLabel:  { tr: "Süper Kupa / Cumhurbaşkanlığı Kupası", en: "Super Cup / Presidential Cup"  },

  sec2011Title:  { tr: "2010–11 Sezonu",                   en: "The 2010–11 Season"                  },
  sec2011Body:   {
    tr: "Trabzonspor sezonu 82 puanla tamamladı ve aynı puanı alan Fenerbahçe ile zirveyi paylaştı. Sezon sonrası yaşanan şike soruşturmaları nedeniyle bu dönem Türk futbol tarihinin en tartışmalı sezonlarından biri olarak anılmaktadır. Soruşturma sonucunda Fenerbahçe UEFA Şampiyonlar Ligi'nden men edildi ve Türkiye'yi 2011–12 Şampiyonlar Ligi'nde Trabzonspor temsil etti.",
    en: "Trabzonspor finished the season with 82 points, level with Fenerbahçe at the top. The post-season match-fixing investigations made this one of the most controversial seasons in Turkish football history. As a result, Fenerbahçe was banned from the UEFA Champions League and Trabzonspor represented Turkey in the 2011–12 edition."
  },

  sanSiroTitle:  {
    tr: "San Siro Deplasmanı: Inter Milan 0–1 Trabzonspor",
    en: "Away at San Siro: Inter Milan 0–1 Trabzonspor"
  },
  sanSiroNote:   {
    tr: "Trabzonspor'un Şampiyonlar Ligi'nde kazandığı en önemli deplasman galibiyetlerinden biri. Gol: Halil Altıntop. Türk kulüplerinin Avrupa devlerine karşı aldığı önemli sonuçlardan biri olarak kabul edilir.",
    en: "One of Trabzonspor's most significant away victories in the Champions League. Scorer: Halil Altıntop. Recognised as one of the standout results by a Turkish club against a European giant."
  },

  sec2022Title:  { tr: "2021–22 Şampiyonluğu",              en: "The 2021–22 Title"                },
  sec2022Body:   {
    tr: "Trabzonspor 2021–22 sezonunu açık ara lider tamamladı, lig boyunca istikrarlı performans gösterdi ve şampiyonluğu haftalar önce garantiledi.",
    en: "Trabzonspor finished the 2021–22 season as dominant leaders, showing consistent form throughout and clinching the title weeks early."
  },

  allTitlesTitle: { tr: "TRABZONSPOR SÜPER LİG ŞAMPİYONLUKLARI — Toplam 8", en: "Trabzonspor Süper Lig Championships — 8 in Total" },
  allTitlesSeason:{ tr: "Sezon",       en: "Season"      },
  allTitlesOrder: { tr: "Sıra",        en: "#"           },

  clubCol:   { tr: "Kulüp",       en: "Club"    },
  titlesCol: { tr: "Şampiyonluk", en: "Titles"  },
  seasonCol: { tr: "Sezon",       en: "Season"  },
  champCol:  { tr: "Şampiyon",    en: "Champion"},
};

/* ────────────────────────────────────────────────
   Sub-components
──────────────────────────────────────────────── */

function SectionTitle({ children, color = TS.bordeaux }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase",
      letterSpacing: "0.1em", color,
      borderBottom: `2px solid ${TS.light}`, paddingBottom: 6, marginBottom: 12
    }}>
      {children}
    </div>
  );
}

function TitleTable({ rows, lang, clubLabel, titlesLabel }: {
  rows: { club: string | { tr: string; en: string }; titles: number; isTS: boolean }[];
  lang: Language; clubLabel: string; titlesLabel: string;
}) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.87rem" }}>
      <thead>
        <tr style={{ borderBottom: `2px solid ${TS.light}` }}>
          <th style={{ textAlign: "left",  padding: "6px 8px", color: "#999", fontWeight: 700, fontSize: "0.75rem" }}>{clubLabel}</th>
          <th style={{ textAlign: "right", padding: "6px 8px", color: "#999", fontWeight: 700, fontSize: "0.75rem" }}>{titlesLabel}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          const name = typeof row.club === "string" ? row.club : row.club[lang];
          return (
            <tr key={i} style={{ background: row.isTS ? `${TS.bordeaux}10` : i % 2 === 0 ? "#fafafa" : "#fff" }}>
              <td style={{ padding: "8px 8px", fontWeight: row.isTS ? 800 : 400, color: row.isTS ? TS.bordeaux : "#333" }}>{name}</td>
              <td style={{ padding: "8px 8px", textAlign: "right", fontWeight: row.isTS ? 800 : 600, color: row.isTS ? TS.bordeaux : "#666" }}>{row.titles}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function Pill({ label, blue }: { label: string; blue?: boolean }) {
  return (
    <span style={{
      background: blue ? TS.blue + "18" : TS.bordeaux + "15",
      border: `1px solid ${blue ? TS.blue : TS.bordeaux}40`,
      color: blue ? TS.blue : TS.bordeaux,
      fontSize: "0.8rem", fontWeight: 700,
      padding: "3px 10px", borderRadius: 99
    }}>{label}</span>
  );
}

function EuroCard({ win, lang, i }: { win: typeof euroWins[0]; lang: Language; i: number }) {
  return (
    <div style={{
      border: `1.5px solid ${TS.bordeaux}30`,
      borderLeft: `4px solid ${TS.bordeaux}`,
      borderRadius: 6, padding: "12px 14px",
      background: i % 2 === 0 ? "#fafafa" : "#fff"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
        <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "#111" }}>{win.opponent}</span>
        <span style={{
          fontWeight: 800, fontSize: "1rem", color: TS.bordeaux,
          background: `${TS.bordeaux}15`, padding: "2px 10px", borderRadius: 99
        }}>{win.score}</span>
      </div>
      <div style={{ fontSize: "0.78rem", color: "#888", marginBottom: 6 }}>
        {win.competition[lang]} · {win.season}
        {win.venue && ` · ${win.venue}`}
      </div>
      {win.scorer && (
        <div style={{ fontSize: "0.78rem", color: "#666", marginBottom: 4 }}>
          ⚽ {win.scorer}
        </div>
      )}
      <div style={{ fontSize: "0.84rem", color: "#444", lineHeight: 1.55, fontStyle: "italic" }}>
        {win.note[lang]}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   Main component
──────────────────────────────────────────────── */

export default function TopBar({ lang, setLang }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── TopBar ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: `linear-gradient(90deg, ${TS.bordeaux} 0%, ${TS.blue} 100%)`,
        padding: "13px 24px", display: "flex", justifyContent: "space-between",
        alignItems: "center", height: 48
      }}>
        <Link href="/" style={{ color: "#fff", fontWeight: 800, fontSize: "0.95rem", letterSpacing: "0.06em", opacity: 0.95 }}>
          TRI
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setOpen(true)} style={{
            background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.45)",
            borderRadius: 99, color: "#fff", fontSize: "0.75rem", fontWeight: 700,
            letterSpacing: "0.05em", padding: "4px 13px", cursor: "pointer", whiteSpace: "nowrap"
          }}>
            {lang === "tr" ? "★ Neden TRI?" : "★ Why TRI?"}
          </button>

          <div style={{ border: "2px solid rgba(255,255,255,0.55)", borderRadius: 99, overflow: "hidden", display: "inline-flex" }}>
            {(["tr", "en"] as Language[]).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                padding: "4px 14px", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.06em",
                cursor: l === lang ? "default" : "pointer",
                background: l === lang ? "rgba(255,255,255,0.25)" : "transparent",
                color: "#fff", border: "none", transition: "background 0.2s"
              }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      {open && (
        <div onClick={() => setOpen(false)} style={{
          position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#fff", borderRadius: 12, maxWidth: 640, width: "100%",
            maxHeight: "92vh", overflowY: "auto", boxShadow: "0 28px 72px rgba(0,0,0,0.3)"
          }}>

            {/* Header */}
            <div style={{
              background: `linear-gradient(135deg, ${TS.bordeaux} 0%, ${TS.blue} 100%)`,
              padding: "22px 24px 18px", borderRadius: "12px 12px 0 0",
              display: "flex", justifyContent: "space-between", alignItems: "flex-start"
            }}>
              <div>
                <h2 style={{ margin: "0 0 4px", color: "#fff", fontSize: "1.15rem", fontWeight: 800 }}>
                  {t.modalTitle[lang]}
                </h2>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: "0.8rem", letterSpacing: "0.07em", textTransform: "uppercase" }}>
                  {t.modalSub[lang]}
                </p>
              </div>
              <button onClick={() => setOpen(false)} style={{
                background: "rgba(255,255,255,0.2)", border: "none", color: "#fff",
                fontSize: "1.15rem", width: 32, height: 32, borderRadius: "50%",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, flexShrink: 0, marginLeft: 16
              }}>×</button>
            </div>

            {/* Body */}
            <div style={{ padding: "24px 24px 28px", display: "flex", flexDirection: "column", gap: 28 }}>

              {/* 0 — Why this index */}
              <div style={{
                background: `linear-gradient(135deg, ${TS.blue}10 0%, ${TS.bordeaux}08 100%)`,
                border: `1.5px solid ${TS.blue}40`, borderRadius: 8, padding: "14px 16px"
              }}>
                <div style={{ fontWeight: 800, fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.1em", color: TS.blue, marginBottom: 8 }}>
                  {t.introTitle[lang]}
                </div>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#333", lineHeight: 1.75 }}>
                  {t.introBody[lang]}
                </p>
              </div>

              {/* 1 — 1959–1974 hegemony */}
              <div>
                <SectionTitle>{t.sec1Title[lang]}</SectionTitle>
                <p style={{ margin: "0 0 14px", color: "#444", lineHeight: 1.7, fontSize: "0.9rem" }}>
                  {t.sec1Body[lang]}
                </p>
                <p style={{ margin: "0 0 8px", fontSize: "0.75rem", fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  {t.sec1TableNote[lang]}
                </p>
                <TitleTable rows={hegemony1959} lang={lang} clubLabel={t.clubCol[lang]} titlesLabel={t.titlesCol[lang]} />
              </div>

              {/* 2 — Rise */}
              <div>
                <SectionTitle color={TS.blue}>{t.sec2Title[lang]}</SectionTitle>
                <p style={{ margin: 0, color: "#444", lineHeight: 1.7, fontSize: "0.9rem" }}>
                  {t.sec2Body[lang]}
                </p>
              </div>

              {/* 3 — 1976–1984 season table + distribution */}
              <div>
                <SectionTitle>{t.sec3Title[lang]}</SectionTitle>
                <p style={{ margin: "0 0 14px", color: "#444", lineHeight: 1.7, fontSize: "0.9rem" }}>
                  {t.sec3Body[lang]}
                </p>

                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.87rem", marginBottom: 16 }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${TS.light}` }}>
                      <th style={{ textAlign: "left", padding: "6px 8px", color: "#999", fontWeight: 700, fontSize: "0.75rem" }}>{t.seasonCol[lang]}</th>
                      <th style={{ textAlign: "left", padding: "6px 8px", color: "#999", fontWeight: 700, fontSize: "0.75rem" }}>{t.champCol[lang]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seasons1976.map((row, i) => (
                      <tr key={i} style={{ background: row.isTS ? `${TS.bordeaux}10` : i % 2 === 0 ? "#fafafa" : "#fff" }}>
                        <td style={{ padding: "8px 8px", color: "#777", fontSize: "0.83rem" }}>{row.season}</td>
                        <td style={{ padding: "8px 8px", fontWeight: row.isTS ? 800 : 400, color: row.isTS ? TS.bordeaux : "#333" }}>
                          {row.champion[lang]}
                          {row.isTS && (
                            <span style={{ marginLeft: 8, fontSize: "0.65rem", fontWeight: 800, background: TS.bordeaux, color: "#fff", padding: "1px 7px", borderRadius: 99, verticalAlign: "middle" }}>★</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p style={{ margin: "0 0 8px", fontSize: "0.75rem", fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  {t.sec3TableNote[lang]}
                </p>
                <TitleTable rows={dist1976} lang={lang} clubLabel={t.clubCol[lang]} titlesLabel={t.titlesCol[lang]} />
              </div>

              {/* 4 — Cups 1976–1984 */}
              <div>
                <SectionTitle color={TS.blue}>{t.sec4Title[lang]}</SectionTitle>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: t.cupTurkish[lang], items: cups1976.turkish },
                    { label: t.cupPresid[lang],  items: cups1976.presidential },
                  ].map(group => (
                    <div key={group.label}>
                      <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#555", marginBottom: 6 }}>{group.label}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {group.items.map(yr => <Pill key={yr} label={yr} blue />)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5 — All-time standings as of 1984  ← NOW BEFORE European wins */}
              <div>
                <SectionTitle>{t.sec5Title[lang]}</SectionTitle>
                <p style={{ margin: "0 0 14px", color: "#444", lineHeight: 1.7, fontSize: "0.9rem" }}>
                  {t.sec5Body[lang]}
                </p>
                <TitleTable rows={dist1984} lang={lang} clubLabel={t.clubCol[lang]} titlesLabel={t.titlesCol[lang]} />
              </div>

              {/* Closing box */}
              <div style={{
                background: `linear-gradient(135deg, ${TS.bordeaux}12 0%, ${TS.blue}12 100%)`,
                border: `2px solid ${TS.bordeaux}`, borderRadius: 8, padding: "14px 16px"
              }}>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "#222", lineHeight: 1.7, fontWeight: 600 }}>
                  {t.closing[lang]}
                </p>
              </div>

              {/* 6 — European victories 1976–1984  ← AFTER standings */}
              <div>
                <SectionTitle>{t.secEuroTitle[lang]}</SectionTitle>
                <p style={{ margin: "0 0 14px", color: "#444", lineHeight: 1.7, fontSize: "0.9rem" }}>
                  {t.secEuroBody[lang]}
                </p>

                {/* Comparison stats */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", marginBottom: 8 }}>
                    {t.secEuroStatsTitle[lang]}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {euroStats.map((row, i) => (
                      <div key={i} style={{
                        display: "flex", alignItems: "center", gap: 12,
                        background: row.highlight ? `${TS.bordeaux}10` : "#f5f5f5",
                        border: row.highlight ? `1.5px solid ${TS.bordeaux}40` : "1.5px solid #e8e8e8",
                        borderRadius: 7, padding: "10px 12px"
                      }}>
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: TS.blue, minWidth: 68, letterSpacing: "0.04em" }}>
                          {row.period}
                        </span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.85rem", fontWeight: row.highlight ? 700 : 400, color: row.highlight ? TS.bordeaux : "#444" }}>
                            {row.label[lang]}
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "#999", marginTop: 1 }}>{row.note[lang]}</div>
                        </div>
                        <span style={{ fontSize: "1.05rem", fontWeight: 800, color: row.highlight ? TS.bordeaux : "#777", whiteSpace: "nowrap" }}>
                          {row.value} {lang === "tr" ? "galibiyet" : "wins"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p style={{ margin: "8px 0 0", fontSize: "0.8rem", color: "#666", fontStyle: "italic", lineHeight: 1.55 }}>
                    {t.secEuroStatsNote[lang]}
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {euroWins.map((w, i) => <EuroCard key={i} win={w} lang={lang} i={i} />)}
                </div>
              </div>

              {/* 7 — After 1984 */}
              <div>
                <SectionTitle color={TS.blue}>{t.secAfterTitle[lang]}</SectionTitle>
                <p style={{ margin: "0 0 18px", color: "#444", lineHeight: 1.7, fontSize: "0.9rem" }}>
                  {t.secAfterBody[lang]}
                </p>

                {/* Cups after 1984 */}
                <p style={{ margin: "0 0 6px", fontSize: "0.78rem", fontWeight: 700, color: "#555" }}>{t.cupsAfterLabel[lang]}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                  {[
                    { label: t.cupTurkish[lang], items: cupsAfter1984.turkish },
                    { label: t.superCupLabel[lang], items: cupsAfter1984.superCup },
                  ].map(group => (
                    <div key={group.label}>
                      <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#555", marginBottom: 6 }}>{group.label}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {group.items.map(yr => <Pill key={yr} label={yr} blue />)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 2010-11 */}
                <div style={{ background: "#fafafa", border: `1.5px solid ${TS.light}`, borderRadius: 8, padding: "14px 16px", marginBottom: 12 }}>
                  <div style={{ fontWeight: 800, fontSize: "0.88rem", color: "#111", marginBottom: 6 }}>{t.sec2011Title[lang]}</div>
                  <p style={{ margin: 0, fontSize: "0.87rem", color: "#444", lineHeight: 1.7 }}>{t.sec2011Body[lang]}</p>
                </div>

                {/* 2021-22 */}
                <div style={{ background: "#fafafa", border: `1.5px solid ${TS.light}`, borderRadius: 8, padding: "14px 16px", marginTop: 12 }}>
                  <div style={{ fontWeight: 800, fontSize: "0.88rem", color: "#111", marginBottom: 6 }}>{t.sec2022Title[lang]}</div>
                  <p style={{ margin: 0, fontSize: "0.87rem", color: "#444", lineHeight: 1.7 }}>{t.sec2022Body[lang]}</p>
                </div>
              </div>

              {/* 8 — All 8 titles */}
              <div>
                <SectionTitle>{t.allTitlesTitle[lang]}</SectionTitle>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.87rem" }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${TS.light}` }}>
                      <th style={{ textAlign: "left", padding: "6px 8px", color: "#999", fontWeight: 700, fontSize: "0.75rem" }}>{t.allTitlesOrder[lang]}</th>
                      <th style={{ textAlign: "left", padding: "6px 8px", color: "#999", fontWeight: 700, fontSize: "0.75rem" }}>{t.allTitlesSeason[lang]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTitles.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? `${TS.bordeaux}08` : "#fff" }}>
                        <td style={{ padding: "8px 8px", color: TS.bordeaux, fontWeight: 800, fontSize: "0.85rem" }}>{i + 1}</td>
                        <td style={{ padding: "8px 8px", fontWeight: 700, color: "#111" }}>{row.season}</td>
                      </tr>
                    ))}
                    <tr style={{ borderTop: `2px solid ${TS.bordeaux}`, background: `${TS.bordeaux}15` }}>
                      <td colSpan={2} style={{ padding: "9px 8px", fontWeight: 800, color: TS.bordeaux, fontSize: "0.88rem" }}>
                        {lang === "tr" ? "Toplam: 8 Süper Lig Şampiyonluğu" : "Total: 8 Süper Lig Championships"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
