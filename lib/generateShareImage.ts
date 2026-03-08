import { ScoreResult } from "./scoring"
import { getLevel } from "./levels"
import { translations } from "./translations"
import { Language } from "@/types"

const W = 600
const H = 380
const BORDEAUX = "#8B1527"
const BLUE = "#1B3F8F"
const CATEGORIES: (keyof ScoreResult["breakdown"])[] = ["hegemony", "rise", "sustain", "europe"]

export async function generateShareImage(result: ScoreResult, lang: Language): Promise<Blob> {
  const canvas = document.createElement("canvas")
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext("2d")!

  // --- Background gradient ---
  const grad = ctx.createLinearGradient(0, 0, W, H)
  grad.addColorStop(0, BORDEAUX)
  grad.addColorStop(1, BLUE)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  // --- Semi-transparent overlay panel (right 55%) for bars ---
  ctx.fillStyle = "rgba(255,255,255,0.08)"
  ctx.beginPath()
  roundRect(ctx, W * 0.42, 24, W * 0.54, H - 48, 10)
  ctx.fill()

  const level = getLevel(result.total)

  // --- Score number ---
  ctx.fillStyle = "#fff"
  ctx.font = `800 80px Arial, sans-serif`
  const scoreW = ctx.measureText(String(result.total)).width
  ctx.fillText(String(result.total), 36, 112)

  // --- /100 (same baseline, smaller, dimmed) ---
  ctx.fillStyle = "rgba(255,255,255,0.45)"
  ctx.font = `400 28px Arial, sans-serif`
  ctx.fillText("/ 100", 36 + scoreW + 8, 112)

  // --- Level name ---
  ctx.fillStyle = "#fff"
  ctx.font = `700 22px Arial, sans-serif`
  wrapText(ctx, level.name[lang], 36, 152, 240, 28)

  // --- TRI label ---
  ctx.fillStyle = "rgba(255,255,255,0.55)"
  ctx.font = `500 13px Arial, sans-serif`
  ctx.fillText("Trabzon Revolution Index", 36, H - 28)

  // --- Site ---
  ctx.textAlign = "right"
  ctx.fillStyle = "rgba(255,255,255,0.55)"
  ctx.font = `500 13px Arial, sans-serif`
  ctx.fillText("howrevolutionaryisyourclub.com", W - 28, H - 28)
  ctx.textAlign = "left"

  // --- Category bars ---
  const barX = W * 0.44
  const barW = W * 0.50
  const startY = 50
  const rowH = (H - startY - 48) / CATEGORIES.length

  CATEGORIES.forEach((key, i) => {
    const cat = result.breakdown[key]
    const y = startY + i * rowH
    const label = translations.categories[key][lang]
    const pct = cat.normalized

    // label
    ctx.fillStyle = "rgba(255,255,255,0.85)"
    ctx.font = `600 13px Arial, sans-serif`
    ctx.fillText(label, barX, y + 18)

    // pct
    ctx.textAlign = "right"
    ctx.fillStyle = "#fff"
    ctx.font = `700 13px Arial, sans-serif`
    ctx.fillText(`${pct}%`, barX + barW, y + 18)
    ctx.textAlign = "left"

    // track
    ctx.fillStyle = "rgba(255,255,255,0.15)"
    ctx.beginPath()
    roundRect(ctx, barX, y + 26, barW, 8, 4)
    ctx.fill()

    // fill
    ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.9)" : "rgba(255,220,220,0.85)"
    ctx.beginPath()
    roundRect(ctx, barX, y + 26, barW * (pct / 100), 8, 4)
    ctx.fill()
  })

  return new Promise(resolve => canvas.toBlob(b => resolve(b!), "image/png"))
}

// helpers
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lineH: number) {
  const words = text.split(" ")
  let line = ""
  for (const word of words) {
    const test = line ? line + " " + word : word
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, y)
      line = word
      y += lineH
    } else {
      line = test
    }
  }
  ctx.fillText(line, x, y)
}
