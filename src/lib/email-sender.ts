// Dispatcher de emails — selecciona el proveedor según las env vars disponibles.
//
// Prioridad:
//   1. Resend     → si RESEND_API_KEY + RESEND_FROM_EMAIL están definidas
//   2. Gmail SMTP → si GMAIL_USER + GMAIL_APP_PASSWORD están definidas
//   3. Sin email  → si ninguna está configurada (la reserva igual se guarda)

import type { EmailReservaData } from "./email-templates";

export async function sendReservationEmails(r: EmailReservaData): Promise<void> {
  if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
    const { sendReservationEmails: send } = await import("./email-reserva");
    await send(r);
    return;
  }

  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    const { sendReservationEmails: send } = await import("./email-nodemailer");
    await send(r);
    return;
  }
}
