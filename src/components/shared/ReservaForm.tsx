"use client";

import { useEffect, useId, useState } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { es } from "date-fns/locale";

// ─── Types ────────────────────────────────────────────────────────────────────
type Tipo = "dorm" | "privada" | "departamento";

const TIPO_OPTIONS: { value: Tipo; label: string; desc: string }[] = [
  { value: "dorm", label: "Dormitorio compartido", desc: "Hasta 10 personas" },
  { value: "privada", label: "Habitación privada", desc: "Hasta 2 personas" },
  { value: "departamento", label: "Departamento", desc: "Hasta 3 personas" },
];

const MAX_PERSONAS: Record<Tipo, number> = {
  dorm: 10,
  privada: 2,
  departamento: 3,
};

type Huesped = { nombre: string; apellido: string };

interface Props {
  isAdmin?: boolean;
  onSuccess?: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function toIso(date: Date | undefined): string {
  if (!date) return "";
  return date.toISOString().slice(0, 10);
}

function formatDate(date: Date | undefined): string {
  if (!date) return "—";
  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ReservaForm({ isAdmin = false, onSuccess }: Props) {
  const modalId = useId();

  const [tipo, setTipo] = useState<Tipo | null>(null);
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [loadingDates, setLoadingDates] = useState(false);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [dni, setDni] = useState("");
  const [cantPersonas, setCantPersonas] = useState(1);
  const [huespedes, setHuespedes] = useState<Huesped[]>([]);
  const [_hp, setHp] = useState(""); // honeypot

  const [validationError, setValidationError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [apiError, setApiError] = useState("");

  // Fetch blocked dates when tipo changes
  useEffect(() => {
    if (!tipo) return;
    setRange(undefined);
    setBlockedDates([]);
    setLoadingDates(true);
    fetch(`/api/disponibilidad?tipo=${tipo}`)
      .then((r) => r.json())
      .then((data: { blockedDates?: string[] }) => {
        setBlockedDates(
          (data.blockedDates ?? []).map((d) => new Date(d + "T00:00:00"))
        );
      })
      .catch(() => {})
      .finally(() => setLoadingDates(false));
  }, [tipo]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  function handleCantPersonas(n: number) {
    setCantPersonas(n);
    const extras = n - 1;
    setHuespedes((prev) => {
      if (prev.length === extras) return prev;
      if (prev.length < extras) {
        return [
          ...prev,
          ...Array.from({ length: extras - prev.length }, () => ({
            nombre: "",
            apellido: "",
          })),
        ];
      }
      return prev.slice(0, extras);
    });
  }

  function updateHuesped(idx: number, field: "nombre" | "apellido", val: string) {
    setHuespedes((prev) =>
      prev.map((h, i) => (i === idx ? { ...h, [field]: val } : h))
    );
  }

  function openModal(e: React.FormEvent) {
    e.preventDefault();
    setValidationError("");

    if (!tipo) {
      setValidationError("Seleccioná un tipo de alojamiento.");
      return;
    }
    if (!range?.from || !range?.to) {
      setValidationError("Seleccioná las fechas de check-in y check-out.");
      return;
    }
    if (range.from >= range.to) {
      setValidationError("El check-out debe ser posterior al check-in.");
      return;
    }
    if (!nombre.trim() || !apellido.trim()) {
      setValidationError("Ingresá tu nombre y apellido.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError("El email no es válido.");
      return;
    }
    if (!telefono.trim() || !dni.trim()) {
      setValidationError("Ingresá teléfono y DNI.");
      return;
    }
    for (const h of huespedes) {
      if (!h.nombre.trim() || !h.apellido.trim()) {
        setValidationError("Completá los datos de todos los huéspedes adicionales.");
        return;
      }
    }

    setShowModal(true);
  }

  async function handleConfirm() {
    setStatus("loading");
    setApiError("");

    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _hp,
          tipoAlojamiento: tipo,
          nombre,
          apellido,
          email,
          telefono,
          dni,
          checkin: toIso(range?.from),
          checkout: toIso(range?.to),
          cantPersonas,
          huespedes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setApiError(data.error ?? "Error al enviar la reserva.");
        setStatus("error");
        return;
      }

      setStatus("success");
      if (onSuccess) {
        setTimeout(() => {
          setShowModal(false);
          onSuccess();
        }, 1500);
      }
    } catch {
      setApiError("Error de conexión. Intentá de nuevo o escribinos por WhatsApp.");
      setStatus("error");
    }
  }

  function closeModal() {
    setShowModal(false);
    setStatus("idle");
    setApiError("");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 6);
  const maxPersonas = tipo ? MAX_PERSONAS[tipo] : 10;

  // ── Success state (standalone, not inside admin modal) ─────────────────────
  if (status === "success" && !onSuccess) {
    return (
      <section className="bg-beige py-20 md:py-28 border-t border-ink/6">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl text-forest">✓</span>
          </div>
          <h2 className="font-serif text-3xl text-forest mb-4">
            ¡Reserva recibida!
          </h2>
          <p className="text-ink/65 leading-relaxed">
            Te contactamos por email o WhatsApp para confirmar tu estadía en
            Huellas. Revisá tu bandeja de entrada.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div
      className={
        isAdmin
          ? "relative"
          : "bg-beige py-20 md:py-28 border-t border-ink/6 relative overflow-hidden"
      }
    >
      {!isAdmin && <div className="texture-grain absolute inset-0" />}
      <div className={isAdmin ? "" : "max-w-3xl mx-auto px-6 relative"}>
        {!isAdmin && (
          <div className="mb-12">
            <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
              Reservas
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-forest mt-6 leading-[1.05] text-balance">
              Reservá tu lugar en Huellas.
            </h2>
            <p className="mt-4 text-ink/60 leading-relaxed max-w-[52ch]">
              Completá el formulario y te confirmamos en menos de 24 horas.
            </p>
          </div>
        )}

        <form onSubmit={openModal} className="space-y-8" noValidate>
          {/* Honeypot — oculto con CSS, no con display:none */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              top: "-9999px",
              width: "1px",
              height: "1px",
              overflow: "hidden",
              opacity: 0,
            }}
          >
            <label htmlFor="sitio-web">Sitio web</label>
            <input
              id="sitio-web"
              type="text"
              name="sitio-web"
              value={_hp}
              onChange={(e) => setHp(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* ── Tipo ── */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60 font-semibold mb-4">
              Tipo de alojamiento
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {TIPO_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setTipo(opt.value);
                    handleCantPersonas(1);
                  }}
                  className={`border rounded-sm p-4 text-left transition-all ${
                    tipo === opt.value
                      ? "border-forest bg-forest/5 shadow-sm"
                      : "border-ink/15 bg-white hover:border-ink/30"
                  }`}
                >
                  <p className="font-medium text-sm text-ink">{opt.label}</p>
                  <p className="text-[11px] text-ink/50 mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* ── Fechas ── */}
          {tipo && (
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60 font-semibold mb-4">
                Fechas
                {loadingDates && (
                  <span className="ml-2 text-clay normal-case tracking-normal font-normal text-xs">
                    cargando disponibilidad…
                  </span>
                )}
              </p>
              <div className="bg-white border border-ink/10 rounded-sm p-4 flex justify-center overflow-x-auto">
                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  disabled={[{ before: today }, { after: maxDate }, ...blockedDates]}
                  locale={es}
                  numberOfMonths={2}
                  pagedNavigation
                />
              </div>
              {range?.from && range?.to && (
                <p className="mt-2 text-sm text-ink/60">
                  {formatDate(range.from)} → {formatDate(range.to)}
                </p>
              )}
            </div>
          )}

          {/* ── Datos personales ── */}
          {tipo && (
            <div className="space-y-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60 font-semibold">
                Titular de la reserva
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nombre" required>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className={inputCls}
                    placeholder="Tu nombre"
                  />
                </Field>
                <Field label="Apellido" required>
                  <input
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                    className={inputCls}
                    placeholder="Tu apellido"
                  />
                </Field>
              </div>

              <Field label="Email" required>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputCls}
                  placeholder="correo@ejemplo.com"
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Teléfono / WhatsApp" required>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                    className={inputCls}
                    placeholder="+54 9 294..."
                  />
                </Field>
                <Field label="DNI / Pasaporte" required>
                  <input
                    type="text"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    required
                    className={inputCls}
                    placeholder="Número de documento"
                  />
                </Field>
              </div>

              <Field label="Cantidad de personas" required>
                <select
                  value={cantPersonas}
                  onChange={(e) => handleCantPersonas(Number(e.target.value))}
                  className={inputCls}
                >
                  {Array.from({ length: maxPersonas }, (_, i) => i + 1).map(
                    (n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "persona" : "personas"}
                      </option>
                    )
                  )}
                </select>
              </Field>

              {huespedes.length > 0 && (
                <div className="space-y-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-ink/60 font-semibold">
                    Datos de acompañantes
                  </p>
                  {huespedes.map((h, idx) => (
                    <div key={idx} className="grid sm:grid-cols-2 gap-4">
                      <Field label={`Acompañante ${idx + 1} — Nombre`} required>
                        <input
                          type="text"
                          value={h.nombre}
                          onChange={(e) =>
                            updateHuesped(idx, "nombre", e.target.value)
                          }
                          required
                          className={inputCls}
                          placeholder="Nombre"
                        />
                      </Field>
                      <Field
                        label={`Acompañante ${idx + 1} — Apellido`}
                        required
                      >
                        <input
                          type="text"
                          value={h.apellido}
                          onChange={(e) =>
                            updateHuesped(idx, "apellido", e.target.value)
                          }
                          required
                          className={inputCls}
                          placeholder="Apellido"
                        />
                      </Field>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {validationError && (
            <p className="text-red-700 text-sm bg-red-50 border border-red-200 rounded-sm px-4 py-3">
              {validationError}
            </p>
          )}

          <button
            type="submit"
            disabled={!tipo}
            className="w-full bg-forest text-paper py-4 rounded-sm text-sm font-medium uppercase tracking-[0.2em] hover:bg-moss hover:scale-[1.01] transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
          >
            Confirmar reserva
          </button>
        </form>
      </div>

      {/* ── Modal de confirmación ── */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalId}
          className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget && status === "idle") closeModal();
          }}
        >
          <div className="bg-paper rounded-sm shadow-2xl w-full max-w-md">
            {status === "success" ? (
              <div className="p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-5">
                  <span className="text-2xl text-forest">✓</span>
                </div>
                <h3 className="font-serif text-2xl text-forest mb-3">
                  ¡Reserva enviada!
                </h3>
                <p className="text-ink/60 text-sm leading-relaxed">
                  Te contactamos para confirmar tu estadía.
                </p>
              </div>
            ) : (
              <>
                <div className="px-6 py-5 border-b border-ink/8 flex items-center justify-between">
                  <h3 id={modalId} className="font-serif text-xl text-forest">
                    Confirmar reserva
                  </h3>
                  {status === "idle" && (
                    <button
                      onClick={closeModal}
                      className="text-ink/40 hover:text-ink text-xl leading-none"
                      aria-label="Cerrar"
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="px-6 py-5 space-y-3 text-sm">
                  <Row label="Alojamiento">
                    {TIPO_OPTIONS.find((o) => o.value === tipo)?.label}
                  </Row>
                  <Row label="Check-in">{formatDate(range?.from)}</Row>
                  <Row label="Check-out">{formatDate(range?.to)}</Row>
                  <Row label="Huésped">
                    {nombre} {apellido}
                  </Row>
                  <Row label="Email">{email}</Row>
                  <Row label="Personas">{cantPersonas}</Row>
                </div>

                {apiError && (
                  <div className="mx-6 mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-4 py-3">
                    {apiError}
                  </div>
                )}

                <div className="px-6 pb-6 flex gap-3">
                  {status !== "loading" && (
                    <button
                      onClick={closeModal}
                      className="flex-1 border border-ink/15 text-ink/70 py-3 rounded-sm text-sm hover:bg-ink/5 transition-colors"
                    >
                      Volver
                    </button>
                  )}
                  <button
                    onClick={handleConfirm}
                    disabled={status === "loading"}
                    className="flex-1 bg-forest text-paper py-3 rounded-sm text-sm font-medium hover:bg-moss transition-colors disabled:opacity-60"
                  >
                    {status === "loading" ? "Enviando…" : "Confirmar"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Shared UI atoms ──────────────────────────────────────────────────────────
const inputCls =
  "w-full border border-ink/15 rounded-sm px-3 py-2.5 text-sm text-ink bg-white focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.15em] text-ink/60 font-semibold mb-2">
        {label}
        {required && <span className="text-clay ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-ink/50 shrink-0">{label}</span>
      <span className="text-ink font-medium text-right">{children}</span>
    </div>
  );
}
