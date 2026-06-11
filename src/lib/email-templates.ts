export const TIPO_LABELS: Record<string, string> = {
  dorm: "Cama en dormitorio compartido",
  privada: "Habitación privada",
  departamento: "Departamento",
};

export interface EmailReservaData {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  tipoAlojamiento: string;
  cantPersonas: number;
}

export function fmt(date: Date): string {
  return new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(date);
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;font-size:14px;color:#6B7B5E;font-family:Arial,sans-serif;border-bottom:1px solid #D9D2C5;">${label}</td>
    <td style="padding:8px 0;font-size:14px;color:#2C4A2E;text-align:right;font-family:Arial,sans-serif;font-weight:bold;border-bottom:1px solid #D9D2C5;">${esc(value)}</td>
  </tr>`;
}

export function guestHtml(r: EmailReservaData): string {
  const tipo = TIPO_LABELS[r.tipoAlojamiento] ?? r.tipoAlojamiento;
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F0EBE0;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0EBE0;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#FAF7F2;border-radius:6px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#2C4A2E;padding:36px 40px;text-align:center;">
            <p style="margin:0;color:#E8DCC8;font-size:22px;letter-spacing:4px;font-weight:normal;font-family:Georgia,serif;">HOSTEL HUELLAS</p>
            <p style="margin:8px 0 0;color:#E8DCC8;font-size:10px;letter-spacing:5px;text-transform:uppercase;opacity:0.6;font-family:Arial,sans-serif;">Lago Puelo · Patagonia</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:48px 40px 36px;">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#9C8866;font-family:Arial,sans-serif;">Confirmación de reserva</p>
            <h1 style="margin:0 0 16px;font-size:30px;color:#2C4A2E;font-weight:normal;line-height:1.2;">¡Tu estadía está <em>confirmada</em>!</h1>
            <p style="margin:0 0 36px;font-size:15px;color:#6B7B5E;line-height:1.7;font-family:Arial,sans-serif;">
              Hola <strong>${esc(r.nombre)}</strong>, recibimos tu reserva con éxito. En breve nos pondremos en contacto para coordinar los detalles del check-in.
            </p>

            <!-- Details box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#EDE8DF;border-radius:4px;margin-bottom:36px;">
              <tr><td style="padding:24px 28px;">
                <p style="margin:0 0 16px;font-size:10px;text-transform:uppercase;letter-spacing:4px;color:#9C8866;font-family:Arial,sans-serif;">Detalle de tu reserva</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${row("N° de reserva", r.id.slice(0, 8).toUpperCase())}
                  ${row("Alojamiento", tipo)}
                  ${row("Check-in", fmt(r.checkIn))}
                  ${row("Check-out", fmt(r.checkOut))}
                  ${row("Personas", String(r.cantPersonas))}
                </table>
              </td></tr>
            </table>

            <p style="margin:0 0 6px;font-size:15px;color:#6B7B5E;line-height:1.7;font-family:Arial,sans-serif;">¿Tenés alguna consulta? Escribinos por WhatsApp.</p>
            <p style="margin:0 0 28px;font-size:15px;color:#6B7B5E;line-height:1.7;font-family:Arial,sans-serif;">¡Ya estamos esperándote en la Patagonia!</p>

            <a href="https://wa.me/5492323334671?text=Hola%21%20Tengo%20una%20consulta%20sobre%20mi%20reserva"
               style="display:inline-block;background:#25D366;color:#ffffff;padding:14px 32px;border-radius:999px;font-size:12px;text-decoration:none;text-transform:uppercase;letter-spacing:2px;font-family:Arial,sans-serif;">
              Escribir por WhatsApp
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #DDD5C5;text-align:center;background:#F5F0E8;">
            <p style="margin:0;color:#B0A088;font-size:11px;font-family:Arial,sans-serif;">Hostel Huellas Puelo · hostelhuellaslp@gmail.com</p>
            <p style="margin:4px 0 0;color:#B0A088;font-size:11px;font-family:Arial,sans-serif;">Lago Puelo, Chubut, Argentina</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function hostelNotificationHtml(r: EmailReservaData): string {
  const tipo = TIPO_LABELS[r.tipoAlojamiento] ?? r.tipoAlojamiento;
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F0EBE0;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0EBE0;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border-radius:6px;overflow:hidden;">
        <tr><td style="background:#2C4A2E;padding:20px 32px;">
          <p style="margin:0;color:#E8DCC8;font-size:13px;letter-spacing:3px;text-transform:uppercase;">Hostel Huellas — Nueva reserva</p>
        </td></tr>
        <tr><td style="padding:32px;">
          <h2 style="margin:0 0 4px;font-size:22px;color:#2C4A2E;">${esc(r.nombre)} ${esc(r.apellido)}</h2>
          <p style="margin:0 0 24px;font-size:14px;color:#9C8866;">${esc(r.email)}</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${row("Alojamiento", tipo)}
            ${row("Check-in", fmt(r.checkIn))}
            ${row("Check-out", fmt(r.checkOut))}
            ${row("Personas", String(r.cantPersonas))}
            ${row("ID reserva", r.id)}
          </table>
          <p style="margin:28px 0 0;font-size:13px;color:#B0A088;">Esta notificación fue generada automáticamente por el sistema de reservas.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
