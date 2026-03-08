"use client";

import { useState } from "react";
import Link from "next/link";
import { TS } from "@/lib/colors";
import { Language } from "@/types";

interface Props {
  lang: Language;
  setLang: (l: Language) => void;
}

const achievements = {
  title: {
    tr: "Trabzonspor'un Başarıları",
    en: "Trabzonspor's Achievements"
  },
  intro: {
    tr: "Trabzonspor, Türk futbolunda İstanbul kulüplerinin mutlak hegemonyasını kıran tek Anadolu kulübüdür. 1975'ten bu yana yazdığı tarih, bu endeksin ilham kaynağıdır.",
    en: "Trabzonspor is the only Anatolian club to have repeatedly broken the absolute hegemony of Istanbul clubs in Turkish football. Its history since 1975 is the very inspiration behind this index."
  },
  sections: {
    tr: [
      {
        heading: "Süper Lig Şampiyonlukları — 7 Kez",
        items: [
          "1975–76 · 1976–77 · Üst üste iki şampiyonluk, İstanbul'a ilk meydan okuma",
          "1978–79 · 1979–80 · 1980–81 · Üç yılda üç kupa, Türk futbolunun dengeleri alt üst oldu",
          "1983–84 ve 1987–88 · Hakimiyetin pekiştirilmesi",
          "2021–22 · 38 yıllık suskunluğun ardından tarihi şampiyonluk; Galatasaray, Fenerbahçe ve Beşiktaş'ın monopolünü kıran son ve en büyük devrim"
        ]
      },
      {
        heading: "Türkiye Kupası — 9 Kez",
        items: [
          "1977, 1978, 1984, 1992, 1995, 2003, 2004, 2010, 2022",
          "Ligde şampiyonluğun yanında kupalarda da sürekli varlık"
        ]
      },
      {
        heading: "Avrupa'da İz",
        items: [
          "UEFA Kupası 2010–11: Çeyrek finale yükseldi, büyük Avrupa kulüpleriyle kapıştı",
          "1980'lerde Şampiyonlar Kupası ve UEFA Kupası'nda Türk futbolunu temsil etti",
          "Avrupa arenasında İstanbul dışından çıkan ilk kalıcı güç"
        ]
      },
      {
        heading: "Devrimci Kimlik",
        items: [
          "İstanbul dışından çıkmış, ligde en çok şampiyonluk kazanmış ilk ve tek Anadolu kulübü",
          "1970'lerde sıfırdan inşa edilen altyapı ile Türk futboluna model oldu",
          "Bu endeks, bir kulübün devrimci gücünü ölçerken Trabzonspor'u referans alır"
        ]
      }
    ],
    en: [
      {
        heading: "Süper Lig Championships — 7 Times",
        items: [
          "1975–76 · 1976–77 · Back-to-back titles, the first real challenge to Istanbul's monopoly",
          "1978–79 · 1979–80 · 1980–81 · Three titles in three years, reshaping Turkish football's power structure",
          "1983–84 and 1987–88 · Cementing long-term dominance",
          "2021–22 · A historic title after 38 years of silence — the greatest revolution, ending the monopoly of Galatasaray, Fenerbahçe, and Beşiktaş"
        ]
      },
      {
        heading: "Turkish Cup — 9 Times",
        items: [
          "1977, 1978, 1984, 1992, 1995, 2003, 2004, 2010, 2022",
          "Consistent domestic cup presence alongside league dominance"
        ]
      },
      {
        heading: "European Footprint",
        items: [
          "UEFA Cup 2010–11: Reached the quarter-finals, competing against Europe's elite",
          "Represented Turkish football in the European Cup and UEFA Cup throughout the 1980s",
          "The first lasting power outside Istanbul to make a mark on European stages"
        ]
      },
      {
        heading: "A Revolutionary Identity",
        items: [
          "The first and only Anatolian club to repeatedly break Istanbul's grip on the Süper Lig",
          "Built an academy from scratch in the 1970s that became a model for Turkish football",
          "This index uses Trabzonspor as its reference point for measuring revolutionary power"
        ]
      }
    ]
  }
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
            {lang === "tr" ? "★ Başarılar" : "★ Achievements"}
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

      {/* Achievements Modal */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 12,
              maxWidth: 620,
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              boxShadow: "0 24px 64px rgba(0,0,0,0.25)"
            }}
          >
            {/* Modal header */}
            <div style={{
              background: `linear-gradient(135deg, ${TS.bordeaux} 0%, ${TS.blue} 100%)`,
              padding: "20px 24px",
              borderRadius: "12px 12px 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <h2 style={{ margin: 0, color: "#fff", fontSize: "1.1rem", fontWeight: 800 }}>
                {achievements.title[lang]}
              </h2>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  color: "#fff",
                  fontSize: "1.1rem",
                  width: 32, height: 32,
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700
                }}
              >
                ×
              </button>
            </div>

            {/* Modal body */}
            <div style={{ padding: "24px 24px 28px" }}>
              <p style={{ margin: "0 0 24px", color: "#444", lineHeight: 1.7, fontSize: "0.95rem" }}>
                {achievements.intro[lang]}
              </p>

              {achievements.sections[lang].map((section, si) => (
                <div key={si} style={{ marginBottom: si < achievements.sections[lang].length - 1 ? 24 : 0 }}>
                  <h3 style={{
                    margin: "0 0 10px",
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    color: TS.bordeaux,
                    borderBottom: `2px solid ${TS.light}`,
                    paddingBottom: 6
                  }}>
                    {section.heading}
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 7 }}>
                    {section.items.map((item, ii) => (
                      <li key={ii} style={{ color: "#333", fontSize: "0.9rem", lineHeight: 1.6 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
