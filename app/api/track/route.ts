import { NextRequest, NextResponse } from "next/server";

interface TrackBody {
  club: string;
  score: number;
  lang: string;
}

export async function POST(req: NextRequest) {
  let body: TrackBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const { club, score, lang } = body;
  if (!club || typeof score !== "number") {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  try {
    const { getCloudflareContext } = await import(/* webpackIgnore: true */ "@opennextjs/cloudflare");
    const { env } = await getCloudflareContext({ async: true });
    const ae = (env as Record<string, { writeDataPoint: (data: { blobs?: string[]; doubles?: number[]; indexes?: string[] }) => void } | undefined>)["AE"];
    if (ae) {
      ae.writeDataPoint({
        blobs: [club.slice(0, 100), lang ?? "en"],
        doubles: [score],
        indexes: [club.slice(0, 32)],
      });
    }
  } catch {
    // Analytics Engine yoksa sessizce geç
  }

  return NextResponse.json({ ok: true });
}
