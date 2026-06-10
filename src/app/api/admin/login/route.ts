import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const adminPassword = process.env.ADMIN_PASSWORD ?? "";
  const adminSecret = process.env.ADMIN_SECRET ?? "";

  if (!adminPassword || !adminSecret) {
    return NextResponse.json({ error: "Servidor mal configurado." }, { status: 500 });
  }

  if (body.password !== adminPassword) {
    // Small delay to slow brute force
    await new Promise((r) => setTimeout(r, 500));
    return NextResponse.json({ error: "Contraseña incorrecta." }, { status: 401 });
  }

  const token = createSession(adminSecret);
  const res = NextResponse.json({ ok: true });

  res.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}
