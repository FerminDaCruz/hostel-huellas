// Proveedor: Resend — requiere dominio propio verificado en resend.com
// Env vars necesarias: RESEND_API_KEY, RESEND_FROM_EMAIL
// Ejemplo: RESEND_FROM_EMAIL="Hostel Huellas <reservas@tu-dominio.com>"

import { resend } from "./resend";
import {
  type EmailReservaData,
  TIPO_LABELS,
  fmt,
  guestHtml,
  hostelNotificationHtml,
} from "./email-templates";

export type { EmailReservaData };

export async function sendReservationEmails(r: EmailReservaData): Promise<void> {
  const from = process.env.RESEND_FROM_EMAIL!;
  const hostelEmail = process.env.HOSTEL_EMAIL ?? "hostelhuellaslp@gmail.com";
  const tipo = TIPO_LABELS[r.tipoAlojamiento] ?? r.tipoAlojamiento;

  await Promise.all([
    resend.emails.send({
      from,
      to: [r.email],
      subject: "Tu reserva en Hostel Huellas Puelo está confirmada",
      html: guestHtml(r),
    }),
    resend.emails.send({
      from,
      to: [hostelEmail],
      subject: `Nueva reserva: ${r.nombre} ${r.apellido} — ${tipo} — ${fmt(r.checkIn)}`,
      html: hostelNotificationHtml(r),
    }),
  ]);
}
