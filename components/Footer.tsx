import { TS } from "@/lib/colors";
import { Language } from "@/types";

interface Props {
  lang: Language;
}

const text = {
  tagline: {
    tr: "Trabzon Devrim Endeksi — futbol tarihini yeniden yazan kulüpleri ölçer.",
    en: "Trabzon Revolution Index — measuring the clubs that rewrote football history."
  },
  note: {
    tr: "Bu endeks, bir kulübün devrimci gücünü dört boyutta değerlendirir: hegemonya kırma, yükseliş hızı, sürdürülebilirlik ve Avrupa etkisi.",
    en: "This index evaluates a club's revolutionary power across four dimensions: breaking hegemony, speed of rise, sustainability, and European impact."
  },
  credit: {
    tr: "İlham kaynağı: Trabzonspor",
    en: "Inspired by Trabzonspor"
  }
};

export default function Footer({ lang }: Props) {
  return (
    <footer style={{
      borderTop: `3px solid ${TS.bordeaux}`,
      background: "#111",
      color: "#aaa",
      padding: "36px 24px",
      marginTop: 48
    }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 24, marginBottom: 28 }}>

          {/* Left: brand */}
          <div style={{ flex: "1 1 240px" }}>
            <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "#fff", letterSpacing: "0.08em", marginBottom: 10 }}>
              TRI
            </div>
            <p style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.7, color: "#888" }}>
              {text.tagline[lang]}
            </p>
          </div>

          {/* Right: about */}
          <div style={{ flex: "1 1 260px" }}>
            <div style={{ fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.1em", color: TS.bordeaux, marginBottom: 10 }}>
              {lang === "tr" ? "Model Hakkında" : "About the Model"}
            </div>
            <p style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.7, color: "#888" }}>
              {text.note[lang]}
            </p>
          </div>

        </div>

        <div style={{ borderTop: "1px solid #222", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: "0.78rem", color: "#555" }}>
            {text.credit[lang]} · 2025
          </span>
          <span style={{ fontSize: "0.78rem", color: "#555" }}>
            Trabzon Revolution Index
          </span>
        </div>

      </div>
    </footer>
  );
}
