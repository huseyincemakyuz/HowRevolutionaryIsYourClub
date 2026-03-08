"use client";

import { useState } from "react";
import Link from "next/link";
import { TS } from "@/lib/colors";
import { Language } from "@/types";

interface Props {
  lang: Language;
  setLang: (l: Language) => void;
}

/* ── Chronicle rows shown in the 1967-1984 table ── */
const chronicle: { year: string; tr: string; en: string; tags?: ("title" | "cup" | "milestone")[] }[] = [
  { year: "1967",    tr: "Trabzonspor kuruldu",                                               en: "Trabzonspor founded",                                               tags: ["milestone"] },
  { year: "1974–75", tr: "Süper Lig'e yükseldi (kuruluştan 8 yıl sonra)",                    en: "Promoted to Süper Lig (8 years after founding)",                    tags: ["milestone"] },
  { year: "1975–76", tr: "Süper Lig'e ilk tam sezon — ŞAMPİYON",                             en: "First full Süper Lig season — CHAMPIONS",                           tags: ["title"] },
  { year: "1976–77", tr: "Üst üste ikinci şampiyonluk · Türkiye Kupası",                     en: "Back-to-back title · Turkish Cup",                                  tags: ["title", "cup"] },
  { year: "1977–78", tr: "Türkiye Kupası",                                                    en: "Turkish Cup",                                                       tags: ["cup"] },
  { year: "1978–79", tr: "ŞAMPİYON — 3. lig kupası",                                         en: "CHAMPIONS — 3rd league title",                                      tags: ["title"] },
  { year: "1979–80", tr: "ŞAMPİYON — 4. lig kupası",                                         en: "CHAMPIONS — 4th league title",                                      tags: ["title"] },
  { year: "1980–81", tr: "ŞAMPİYON — 5. lig kupası",                                         en: "CHAMPIONS — 5th league title",                                      tags: ["title"] },
  { year: "1981–84", tr: "Ligde mücadele, final: 1983–84 ŞAMPİYON · Türkiye Kupası",        en: "Intense competition, culminating: 1983–84 CHAMPIONS · Turkish Cup", tags: ["title", "cup"] },
];

const tagStyle: Record<string, { bg: string; label: { tr: string; en: string } }> = {
  title:     { bg: TS.bordeaux, label: { tr: "ŞAMPİYON",  en: "TITLE"  } },
  cup:       { bg: TS.blue,     label: { tr: "KUPA",       en: "CUP"    } },
  milestone: { bg: "#555",      label: { tr: "DÖNÜM",      en: "MILESTONE" } },
};

const modal = {
  title: {
    tr: "Trabzonspor'u Tanıyalım",
    en: "Meet Trabzonspor"
  },
  subtitle: {
    tr: "1967'den 1984'e: Bir Anadolu Devrimi",
    en: "1967 to 1984: An Anatolian Revolution"
  },
  intro: {
    tr: "Trabzonspor 1967 yılında Trabzon'da kuruldu. Türkiye'nin doğusundan gelen, kaynakları kısıtlı, İstanbul'dan uzakta bir kulüp. Ancak Türk futbolunun güç haritasını tamamen değiştirdi.",
    en: "Trabzonspor was founded in 1967 in Trabzon — a city in eastern Turkey, far from Istanbul, with limited resources. Yet it went on to completely redraw the power map of Turkish football."
  },
  tableTitle: {
    tr: "1967–1984 Kronoloji",
    en: "1967–1984 Chronicle"
  },
  summary: {
    tr: "1984 itibarıyla tablo: Süper Lig'e çıktıktan yaklaşık 10 yıl içinde 6 lig şampiyonluğu ve 3 Türkiye Kupası. İstanbul'un 'Büyük Üçlü'sü bu dönemde kendi liğinde yabancı oldu.",
    en: "By 1984: in roughly 10 years in the Süper Lig, Trabzonspor had won 6 league titles and 3 Turkish Cups. Istanbul's 'Big Three' became strangers to their own league in this era."
  },
  after: {
    heading: { tr: "Sonrası", en: "What Came After" },
    items: {
      tr: [
        "1987–88 · Yedinci şampiyonluk",
        "2010–11 · UEFA Avrupa Ligi çeyrek finali — Avrupa sahnesinde Anadolu sesi",
        "2021–22 · 38 yıllık suskunluğun ardından tarihi dönüş: Galatasaray, Fenerbahçe ve Beşiktaş monopolüne son — Türk futbolunun en büyük devrimci anı"
      ],
      en: [
        "1987–88 · Seventh championship",
        "2010–11 · UEFA Europa League quarter-finals — an Anatolian voice on the European stage",
        "2021–22 · Historic return after 38 years of silence: ending the monopoly of Galatasaray, Fenerbahçe, and Beşiktaş — the greatest revolutionary moment in Turkish football history"
      ]
    }
  },
  close: { tr: "Kapat", en: "Close" }
};

export default function TopBar({ lang, setLang }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: `linear-gradient(90deg, ${TS.bordeaux} 0%, ${TS.blue} 100%)`,
        padding: "13px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 48
      }}>
        <Link href="/" style={{ color: "#fff", fontWeight: 800, fontSize: "0.95rem", letterSpacing: "0.06em", opacity: 0.95 }}>
          TRI
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Achievements button */}
          <button
            onClick={() => setOpen(true)}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,255,255,0.45)",
              borderRadius: 99,
              color: "#fff",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              padding: "4px 13px",
              cursor: "pointer",
              whiteSpace: "nowrap"
            }}
          >
            {lang === "tr" ? "★ Trabzonspor'u Tanı" : "★ Meet Trabzonspor"}
          </button>

          {/* Language toggle */}
          <div style={{ border: "2px solid rgba(255,255,255,0.55)", borderRadius: 99, overflow: "hidden", display: "inline-flex" }}>
            {(["tr", "en"] as Language[]).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  padding: "4px 14px",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  cursor: l === lang ? "default" : "pointer",
                  background: l === lang ? "rgba(255,255,255,0.25)" : "transparent",
                  color: "#fff",
                  border: "none",
                  transition: "background 0.2s"
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 12,
              maxWidth: 640,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 28px 72px rgba(0,0,0,0.3)"
            }}
          >
            {/* Header */}
            <div style={{
              background: `linear-gradient(135deg, ${TS.bordeaux} 0%, ${TS.blue} 100%)`,
              padding: "22px 24px 18px",
              borderRadius: "12px 12px 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start"
            }}>
              <div>
                <h2 style={{ margin: "0 0 4px", color: "#fff", fontSize: "1.15rem", fontWeight: 800 }}>
                  {modal.title[lang]}
                </h2>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: "0.82rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {modal.subtitle[lang]}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.2)", border: "none", color: "#fff",
                  fontSize: "1.15rem", width: 32, height: 32, borderRadius: "50%",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, flexShrink: 0, marginLeft: 12
                }}
              >×</button>
            </div>

            {/* Body */}
            <div style={{ padding: "24px 24px 28px" }}>

              {/* Intro paragraph */}
              <p style={{ margin: "0 0 24px", color: "#444", lineHeight: 1.75, fontSize: "0.95rem" }}>
                {modal.intro[lang]}
              </p>

              {/* Chronicle table */}
              <div style={{ marginBottom: 24 }}>
                <div style={{
                  fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase",
                  letterSpacing: "0.1em", color: TS.bordeaux, marginBottom: 12,
                  borderBottom: `2px solid ${TS.light}`, paddingBottom: 6
                }}>
                  {modal.tableTitle[lang]}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {chronicle.map((row, i) => (
                    <div key={i} style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 12,
                      padding: "9px 10px",
                      background: i % 2 === 0 ? "#fafafa" : "#fff",
                      borderRadius: 4
                    }}>
                      {/* Year */}
                      <span style={{
                        fontSize: "0.78rem",
                        fontWeight: 800,
                        color: "#999",
                        minWidth: 62,
                        flexShrink: 0,
                        letterSpacing: "0.03em"
                      }}>
                        {row.year}
                      </span>

                      {/* Description */}
                      <span style={{ fontSize: "0.88rem", color: "#333", lineHeight: 1.5, flex: 1 }}>
                        {row[lang]}
                      </span>

                      {/* Tags */}
                      {row.tags && (
                        <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                          {row.tags.map(tag => (
                            <span key={tag} style={{
                              background: tagStyle[tag].bg,
                              color: "#fff",
                              fontSize: "0.65rem",
                              fontWeight: 800,
                              letterSpacing: "0.06em",
                              padding: "2px 7px",
                              borderRadius: 99
                            }}>
                              {tagStyle[tag].label[lang]}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary box */}
              <div style={{
                background: `linear-gradient(135deg, ${TS.bordeaux}12 0%, ${TS.blue}12 100%)`,
                border: `2px solid ${TS.bordeaux}`,
                borderRadius: 8,
                padding: "14px 16px",
                marginBottom: 24
              }}>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "#222", lineHeight: 1.65, fontWeight: 600 }}>
                  {modal.summary[lang]}
                </p>
              </div>

              {/* After 1984 */}
              <div>
                <div style={{
                  fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase",
                  letterSpacing: "0.1em", color: TS.blue, marginBottom: 12,
                  borderBottom: `2px solid ${TS.light}`, paddingBottom: 6
                }}>
                  {modal.after.heading[lang]}
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 9 }}>
                  {modal.after.items[lang].map((item, i) => (
                    <li key={i} style={{ fontSize: "0.9rem", color: "#333", lineHeight: 1.6 }}>
                      {item}
                    </li>
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
