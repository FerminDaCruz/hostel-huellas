import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// ─── Rate limiting ────────────────────────────────────────────────────────────
// In-memory: IP → timestamps of requests within the last 10 minutes.
// Works within a single Node.js process (good enough for this traffic volume).
const rateLimitMap = new Map<string, number[]>();

const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 min
const RATE_MAX = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const prev = (rateLimitMap.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS
  );
  if (prev.length >= RATE_MAX) {
    rateLimitMap.set(ip, prev);
    return false;
  }
  prev.push(now);
  rateLimitMap.set(ip, prev);
  return true;
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isoToDisplay(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function nowDisplay(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// ─── Sheet constants ──────────────────────────────────────────────────────────
const HEADERS = [
  "Timestamp",
  "Nombre",
  "Apellido",
  "Email",
  "Teléfono",
  "DNI",
  "Check-in",
  "Check-out",
  "Cant. Personas",
  "Huéspedes adicionales",
];

const HEADER_BG = { red: 30 / 255, green: 58 / 255, blue: 47 / 255 }; // #1e3a2f
const ROW_ALT_BG = { red: 240 / 255, green: 247 / 255, blue: 244 / 255 }; // #f0f7f4
const WHITE = { red: 1, green: 1, blue: 1 };

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = getIp(req);

  // 1. Rate limiting
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        error:
          "Demasiados intentos. Esperá unos minutos y volvé a intentar.",
      },
      { status: 429 }
    );
  }

  // 2. Parse body
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  // 3. Honeypot — si tiene valor, fingir éxito sin escribir nada
  if (body._hp) {
    return NextResponse.json({ ok: true });
  }

  // 4. Validate required fields
  const required = [
    "nombre",
    "apellido",
    "email",
    "telefono",
    "dni",
    "checkin",
    "checkout",
    "cantPersonas",
  ];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json(
        { error: `El campo "${field}" es requerido.` },
        { status: 400 }
      );
    }
  }

  // 5. Google Sheets config
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY ?? "";

  // Normalize the private key regardless of how it was stored in .env:
  // - Some platforms escape newlines as literal \n → replace them
  // - Some wrap the whole value in extra quotes → strip them first
  const normalizedKey = rawKey
    .replace(/^["']|["']$/g, "")   // strip wrapping quotes if any
    .replace(/\\n/g, "\n");         // convert literal \n to real newlines

  if (!clientEmail || !normalizedKey || !spreadsheetId) {
    console.error("Missing Google Sheets environment variables");
    return NextResponse.json(
      { error: "Configuración del servidor incompleta. Contactanos por WhatsApp." },
      { status: 500 }
    );
  }

  try {
    // Use JWT directly — more reliable than GoogleAuth for service accounts
    // when the private key has been through env-var serialization.
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: normalizedKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // 6. Check if headers exist
    const headerCheck = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "A1",
    });

    if (!headerCheck.data.values?.[0]?.[0]) {
      // Write headers
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: "A1",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [HEADERS] },
      });

      // Format headers + freeze + auto-resize
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              repeatCell: {
                range: {
                  sheetId: 0,
                  startRowIndex: 0,
                  endRowIndex: 1,
                  startColumnIndex: 0,
                  endColumnIndex: HEADERS.length,
                },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: HEADER_BG,
                    textFormat: {
                      bold: true,
                      foregroundColor: WHITE,
                    },
                    horizontalAlignment: "CENTER",
                  },
                },
                fields:
                  "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)",
              },
            },
            {
              updateSheetProperties: {
                properties: {
                  sheetId: 0,
                  gridProperties: { frozenRowCount: 1 },
                },
                fields: "gridProperties.frozenRowCount",
              },
            },
            {
              autoResizeDimensions: {
                dimensions: {
                  sheetId: 0,
                  dimension: "COLUMNS",
                  startIndex: 0,
                  endIndex: HEADERS.length,
                },
              },
            },
          ],
        },
      });
    }

    // 7. Build data row
    const huespedes = (
      body.huespedes as { nombre: string; apellido: string }[] | undefined
    ) ?? [];

    const rowData = [
      nowDisplay(),
      String(body.nombre),
      String(body.apellido),
      String(body.email),
      String(body.telefono),
      String(body.dni),
      isoToDisplay(String(body.checkin)),
      isoToDisplay(String(body.checkout)),
      String(body.cantPersonas),
      huespedes.map((h) => `${h.nombre} ${h.apellido}`).join(", "),
    ];

    // 8. Append row
    const appendRes = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "A:J",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [rowData] },
    });

    // 9. Alternating row color
    const updatedRange = appendRes.data.updates?.updatedRange ?? "";
    const match = updatedRange.match(/!A(\d+):/);
    const rowNum = match ? parseInt(match[1]) : 2;
    const rowIndex = rowNum - 1; // 0-indexed; index 0 = headers
    // Even rowIndex (0-indexed) → data rows at index 2,4,6 get light green;
    // odd rowIndex (1,3,5) → white. Headers are at index 0 (dark green).
    const bgColor = rowIndex % 2 === 0 ? ROW_ALT_BG : WHITE;

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: rowIndex,
                endRowIndex: rowIndex + 1,
                startColumnIndex: 0,
                endColumnIndex: HEADERS.length,
              },
              cell: {
                userEnteredFormat: { backgroundColor: bgColor },
              },
              fields: "userEnteredFormat(backgroundColor)",
            },
          },
          {
            autoResizeDimensions: {
              dimensions: {
                sheetId: 0,
                dimension: "COLUMNS",
                startIndex: 0,
                endIndex: HEADERS.length,
              },
            },
          },
        ],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Google Sheets error:", err);
    return NextResponse.json(
      {
        error:
          "Error al guardar la reserva. Intentá de nuevo o escribinos por WhatsApp.",
      },
      { status: 500 }
    );
  }
}
