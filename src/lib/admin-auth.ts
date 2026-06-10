import { createHmac, timingSafeEqual } from "crypto";

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createSession(secret: string): string {
  const timestamp = Date.now().toString();
  const hmac = sign(timestamp, secret);
  return `${timestamp}.${hmac}`;
}

export function verifySession(token: string, secret: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [timestamp, hmac] = parts;

  const expected = sign(timestamp, secret);
  try {
    return timingSafeEqual(Buffer.from(hmac, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}
