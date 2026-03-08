"use client";

import { useState } from "react";
import Link from "next/link";
import { TS } from "@/lib/colors";
import { Language } from "@/types";

interface Props {
  lang: Language;
  setLang: (l: Language) => void;
}

/* ── Static data ── */

const hegemony1959: { club: { tr: string; en: string }; titles: number }[] = [
  { club: { tr: "Fenerbahçe",       en: "Fenerbahçe"       }, titles: 9 },
  { club: { tr: "Galatasaray",      en: "Galatasaray"      }, titles: 6 },
  { club: { tr: "Beşiktaş",        en: "Beşiktaş"         }, titles: 5 },
  { club: { tr: "Anadolu Kulüpleri", en: "Anatolian Clubs" }, titles: 0 },
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
  tr: {
    turkish:       ["1976–77", "1977–78", "1983–84"],
    presidential:  ["1976", "1977", "1978", "1979", "1980", "1983"],
  },
  en: {
    turkish:       ["1976–77", "1977–78", "1983–84"],
    presidential:  ["1976", "1977", "1978", "1979", "1980", "1983"],
  }
};

const euroWins: {
  opponent: string; competition: { tr: string; en: string };
  season: string; score: string; note: { tr: string; en: string };
}[] = [
  {
    opponent: "Liverpool FC",
    competition: { tr: "Avrupa Şampiyon Kulüpler Kupası", en: "European Champion Clubs' Cup" },
    season: "1976–77",
    score: "1–0",
    note: {
      tr: "O sezon Avrupa Kupası'nı kazanan Liverpool'u yenen ilk Türk takımı",
      en: "First Turkish club to defeat Liverpool, who won the European Cup that same season"
    }
  },
  {
    opponent: "FC Barcelona",
    competition: { tr: "Avrupa Şampiyon Kulüpler Kupası", en: "European Champion Clubs' Cup" },
    season: "1976–77",
    score: "1–0",
    note: {
      tr: "Barcelona'yı mağlup eden ilk Türk takımı",
      en: "First Turkish club to defeat Barcelona"
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
];

const dist1984: { club: string; titles: number; isTS: boolean }[] = [
  { club: "Fenerbahçe",  titles: 11, isTS: false },
  { club: "Trabzonspor", titles: 6,  isTS: true  },
  { club: "Galatasaray", titles: 6,  isTS: false },
  { club: "Beşiktaş",   titles: 6,  isTS: false },
];

/* ── Text strings ── */
const t = {
  modalTitle:   { tr: "Trabzonspor'u Tanıyalım",         en: "Meet Trabzonspor"                 },
  modalSub:     { tr: "Bir Anadolu Devrimi",              en: "An Anatolian Revolution"           },
  sec1Title:    { tr: "1959–1974: İstanbul Hegemonyası",  en: "1959–1974: Istanbul Hegemony"      },
  sec1Body:     {
    tr: "Türkiye 1. Ligi 1959'da kuruldu. 1974'e kadar geçen 16 sezonda şampiyonlukların tamamı İstanbul kulüplerine gitti. Bu dönemde Anadolu'dan hiçbir kulüp şampiyon olamadı.",
    en: "The Turkish First Division was founded in 1959. Over the 16 seasons until 1974, every single league title went to an Istanbul club. No Anatolian club was able to win the championship during this period."
  },
  sec1TableNote: {
    tr: "1959–1974 Şampiyonluk Dağılımı",
    en: "1959–1974 Title Distribution"
  },
  sec2Title:    { tr: "Trabzonspor'un Yükselişi",          en: "Trabzonspor's Rise"               },
  sec2Body:     {
    tr: "Trabzonspor 1974–75 sezonunda Türkiye 1. Ligi'ne yükseldi. Yalnızca bir sezon sonra, 1975–76'da şampiyon oldu ve Türk futbol tarihinde yeni bir dönemi başlattı.",
    en: "Trabzonspor was promoted to the Turkish First Division in the 1974–75 season. Just one season later, in 1975–76, they became champions — opening a new chapter in Turkish football history."
  },
  sec3Title:    { tr: "1976–1984: Hegemonyanın Kırılması", en: "1976–1984: Breaking the Hegemony" },
  sec3Body:     {
    tr: "Trabzonspor, ligdeki ilk 10 yılında 6 lig şampiyonluğu kazandı. İşte o dönemin sezon sezon tablosu:",
    en: "In their first 10 years in the top flight, Trabzonspor won 6 league titles. Here is the season-by-season breakdown:"
  },
  sec3TableNote: {
    tr: "1976–1984 Şampiyonluk Dağılımı",
    en: "1976–1984 Title Distribution"
  },
  sec4Title:    { tr: "1976–1984 Arasında Kazanılan Kupalar", en: "Cups Won 1976–1984" },
  cupTurkish:   { tr: "Türkiye Kupası",                       en: "Turkish Cup"        },
  cupPresid:    { tr: "Cumhurbaşkanlığı Kupası (Süper Kupa)", en: "Presidential Cup (Super Cup)" },
  sec5Title:    { tr: "1984 İtibarıyla Toplam Lig Şampiyonlukları", en: "All-Time League Titles as of 1984" },
  sec5Body:     {
    tr: "1984 sezonu sonunda Türkiye ligi tarihindeki toplam sıralama — Trabzonspor yalnızca 10 yılda köklü İstanbul kulüpleriyle aynı seviyeye ulaşmıştı:",
    en: "After the 1984 season, the all-time standings — Trabzonspor had reached the same level as Istanbul's most historic clubs in just 10 years:"
  },
  closing:      {
    tr: "Bu nedenle Trabzonspor'un yükselişi, Türk futbol tarihinde en güçlü sistem kırıcı örneklerden biri olarak kabul edilir — ve bu endeksin ilham kaynağıdır.",
    en: "For this reason, Trabzonspor's rise is considered one of the most powerful system-breaking examples in Turkish football history — and the inspiration behind this index."
  },
  after:        { tr: "Sonrası",                             en: "What Came After"     },
  afterItems: {
    tr: [
      "1987–88 · Yedinci lig şampiyonluğu",
      "2010–11 · UEFA Avrupa Ligi çeyrek finali",
      "2021–22 · 38 yıllık aradan sonra şampiyonluk — Büyük Üçlü monopolüne son"
    ],
    en: [
      "1987–88 · Seventh league championship",
      "2010–11 · UEFA Europa League quarter-finals",
      "2021–22 · Champions after 38 years — ending the Big Three's monopoly"
    ]
  },
  sec6Title: {
    tr: "Avrupa Devlerine Karşı Tarihi Galibiyetler",
    en: "Historic Wins Against European Giants"
  },
  sec6Body: {
    tr: "Bu dönemde İstanbul'un büyük kulüpleri Avrupa'da bu galibiyetleri elde edemezken, Trabzonspor sahaya çıktığı Avrupa kupalarında kıtanın en güçlü takımlarını yendi ve Türk futbolunda ilkler yaşandı:",
    en: "While Istanbul's major clubs could not achieve such results in Europe at the time, Trabzonspor went out and defeated the continent's strongest sides — setting multiple firsts for Turkish football:"
  },
  euroOpponent: { tr: "Rakip",      en: "Opponent"    },
  euroComp:     { tr: "Turnuva",    en: "Competition" },
  euroSeason:   { tr: "Sezon",      en: "Season"      },
  euroScore:    { tr: "Skor",       en: "Score"       },
  clubCol:   { tr: "Kulüp",         en: "Club"         },
  titlesCol: { tr: "Şampiyonluk",   en: "Titles"       },
  seasonCol: { tr: "Sezon",         en: "Season"       },
  champCol:  { tr: "Şampiyon",      en: "Champion"     },
};

/* ── Sub-components ── */

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
          <th style={{ textAlign: "left", padding: "6px 8px", color: "#999", fontWeight: 700, fontSize: "0.75rem" }}>{clubLabel}</th>
          <th style={{ textAlign: "right", padding: "6px 8px", color: "#999", fontWeight: 700, fontSize: "0.75rem" }}>{titlesLabel}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          const name = typeof row.club === "string" ? row.club : row.club[lang];
          return (
            <tr key={i} style={{ background: row.isTS ? `${TS.bordeaux}10` : i % 2 === 0 ? "#fafafa" : "#fff" }}>
              <td style={{ padding: "8px 8px", fontWeight: row.isTS ? 800 : 400, color: row.isTS ? TS.bordeaux : "#333" }}>
                {name}
              </td>
              <td style={{ padding: "8px 8px", textAlign: "right", fontWeight: row.isTS ? 800 : 600, color: row.isTS ? TS.bordeaux : "#666" }}>
                {row.titles}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/* ── Main component ── */

export default function TopBar({ lang, setLang }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
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
          <button
            onClick={() => setOpen(true)}
            style={{
              background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.45)",
              borderRadius: 99, color: "#fff", fontSize: "0.75rem", fontWeight: 700,
              letterSpacing: "0.05em", padding: "4px 13px", cursor: "pointer", whiteSpace: "nowrap"
            }}
          >
            {lang === "tr" ? "★ Trabzonspor'u Tanı" : "★ Meet Trabzonspor"}
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

              {/* 1 — 1959–1974 hegemony */}
              <div>
                <SectionTitle>{t.sec1Title[lang]}</SectionTitle>
                <p style={{ margin: "0 0 14px", color: "#444", lineHeight: 1.7, fontSize: "0.9rem" }}>
                  {t.sec1Body[lang]}
                </p>
                <p style={{ margin: "0 0 8px", fontSize: "0.75rem", fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  {t.sec1TableNote[lang]}
                </p>
                <TitleTable
                  rows={hegemony1959}
                  lang={lang}
                  clubLabel={t.clubCol[lang]}
                  titlesLabel={t.titlesCol[lang]}
                />
              </div>

              {/* 2 — Rise */}
              <div>
                <SectionTitle color={TS.blue}>{t.sec2Title[lang]}</SectionTitle>
                <p style={{ margin: 0, color: "#444", lineHeight: 1.7, fontSize: "0.9rem" }}>
                  {t.sec2Body[lang]}
                </p>
              </div>

              {/* 3 — 1976–1984 season table */}
              <div>
                <SectionTitle>{t.sec3Title[lang]}</SectionTitle>
                <p style={{ margin: "0 0 14px", color: "#444", lineHeight: 1.7, fontSize: "0.9rem" }}>
                  {t.sec3Body[lang]}
                </p>

                {/* Season-by-season table */}
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
                            <span style={{
                              marginLeft: 8, fontSize: "0.65rem", fontWeight: 800,
                              background: TS.bordeaux, color: "#fff",
                              padding: "1px 7px", borderRadius: 99, verticalAlign: "middle"
                            }}>★</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p style={{ margin: "0 0 8px", fontSize: "0.75rem", fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  {t.sec3TableNote[lang]}
                </p>
                <TitleTable
                  rows={dist1976}
                  lang={lang}
                  clubLabel={t.clubCol[lang]}
                  titlesLabel={t.titlesCol[lang]}
                />
              </div>

              {/* 4 — Cups */}
              <div>
                <SectionTitle color={TS.blue}>{t.sec4Title[lang]}</SectionTitle>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: t.cupTurkish[lang], items: cups1976[lang].turkish },
                    { label: t.cupPresid[lang],  items: cups1976[lang].presidential },
                  ].map(group => (
                    <div key={group.label}>
                      <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#555", marginBottom: 6 }}>{group.label}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {group.items.map(yr => (
                          <span key={yr} style={{
                            background: TS.blue + "18", border: `1px solid ${TS.blue}40`,
                            color: TS.blue, fontSize: "0.8rem", fontWeight: 700,
                            padding: "3px 10px", borderRadius: 99
                          }}>{yr}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5 — European victories */}
              <div>
                <SectionTitle>{t.sec6Title[lang]}</SectionTitle>
                <p style={{ margin: "0 0 14px", color: "#444", lineHeight: 1.7, fontSize: "0.9rem" }}>
                  {t.sec6Body[lang]}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {euroWins.map((w, i) => (
                    <div key={i} style={{
                      border: `1.5px solid ${TS.bordeaux}30`,
                      borderLeft: `4px solid ${TS.bordeaux}`,
                      borderRadius: 6,
                      padding: "12px 14px",
                      background: i % 2 === 0 ? "#fafafa" : "#fff"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                        <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "#111" }}>
                          {w.opponent}
                        </span>
                        <span style={{
                          fontWeight: 800, fontSize: "1rem", color: TS.bordeaux,
                          background: `${TS.bordeaux}15`, padding: "2px 10px", borderRadius: 99
                        }}>
                          {w.score}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#888", marginBottom: 6 }}>
                        {w.competition[lang]} · {w.season}
                      </div>
                      <div style={{ fontSize: "0.84rem", color: "#444", lineHeight: 1.55, fontStyle: "italic" }}>
                        {w.note[lang]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6 — All-time 1984 */}
              <div>
                <SectionTitle>{t.sec5Title[lang]}</SectionTitle>
                <p style={{ margin: "0 0 14px", color: "#444", lineHeight: 1.7, fontSize: "0.9rem" }}>
                  {t.sec5Body[lang]}
                </p>
                <TitleTable
                  rows={dist1984}
                  lang={lang}
                  clubLabel={t.clubCol[lang]}
                  titlesLabel={t.titlesCol[lang]}
                />
              </div>

              {/* Closing statement */}
              <div style={{
                background: `linear-gradient(135deg, ${TS.bordeaux}12 0%, ${TS.blue}12 100%)`,
                border: `2px solid ${TS.bordeaux}`,
                borderRadius: 8, padding: "14px 16px"
              }}>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "#222", lineHeight: 1.7, fontWeight: 600 }}>
                  {t.closing[lang]}
                </p>
              </div>

              {/* After 1984 */}
              <div>
                <SectionTitle color={TS.blue}>{t.after[lang]}</SectionTitle>
                <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 9 }}>
                  {t.afterItems[lang].map((item, i) => (
                    <li key={i} style={{ fontSize: "0.9rem", color: "#333", lineHeight: 1.6 }}>{item}</li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
