// Proveedor: Gmail SMTP (Nodemailer) — gratuito, sin dominio propio necesario
// Env vars necesarias: GMAIL_USER, GMAIL_APP_PASSWORD
//
// Cómo obtener GMAIL_APP_PASSWORD:
//   1. Activar verificación en 2 pasos en la cuenta Gmail del hostel
//      https://myaccount.google.com/security
//   2. Ir a: Cuenta de Google → Seguridad → Contraseñas de aplicaciones
//   3. Crear una para "Correo" / dispositivo "Otro" → copiar la clave de 16 chars
//
// Ejemplo en .env.local:
//   GMAIL_USER=hostelhuellaslp@gmail.com
//   GMAIL_APP_PASSWORD=abcd efgh ijkl mnop

import nodemailer from "nodemailer";
import {
  type EmailReservaData,
  TIPO_LABELS,
  fmt,
  guestHtml,
  hostelNotificationHtml,
} from "./email-templates";

export type { EmailReservaData };

function createTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER!,
      pass: process.env.GMAIL_APP_PASSWORD!,
    },
  });
}

export async function sendReservationEmails(r: EmailReservaData): Promise<void> {
  const transport = createTransport();
  const from = `Hostel Huellas <${process.env.GMAIL_USER}>`;
  const hostelEmail = process.env.HOSTEL_EMAIL ?? process.env.GMAIL_USER ?? "hostelhuellaslp@gmail.com";
  const tipo = TIPO_LABELS[r.tipoAlojamiento] ?? r.tipoAlojamiento;

  await Promise.all([
    transport.sendMail({
      from,
      to: r.email,
      subject: "Tu reserva en Hostel Huellas Puelo está confirmada",
      html: guestHtml(r),
    }),
    transport.sendMail({
      from,
      to: hostelEmail,
      subject: `Nueva reserva: ${r.nombre} ${r.apellido} — ${tipo} — ${fmt(r.checkIn)}`,
      html: hostelNotificationHtml(r),
    }),
  ]);
}
