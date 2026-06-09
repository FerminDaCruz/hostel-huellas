"use client";

import { useState, useEffect, useId } from "react";

type HuespedAdicional = { nombre: string; apellido: string };

type FormData = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  dni: string;
  checkin: string;
  checkout: string;
  cantPersonas: string;
  huespedes: HuespedAdicional[];
  _hp: string;
};

type Status = "idle" | "loading" | "success" | "error";

const EMPTY_FORM: FormData = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  dni: "",
  checkin: "",
  checkout: "",
  cantPersonas: "1",
  huespedes: [],
  _hp: "",
};

function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

function nextDayOf(iso: string): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function validate(data: FormData): string | null {
  if (!data.nombre.trim()) return "Ingresá tu nombre.";
  if (!data.apellido.trim()) return "Ingresá tu apellido.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return "El email no parece válido.";
  if (!data.telefono.trim()) return "Ingresá tu número de teléfono.";
  if (!data.dni.trim()) return "Ingresá tu DNI o pasaporte.";
  if (!data.checkin) return "Seleccioná la fecha de check-in.";
  if (!data.checkout) return "Seleccioná la fecha de check-out.";
  if (data.checkin >= data.checkout)
    return "El check-out debe ser posterior al check-in.";
  const n = parseInt(data.cantPersonas) || 1;
  for (let i = 0; i < n - 1; i++) {
    if (
      !data.huespedes[i]?.nombre.trim() ||
      !data.huespedes[i]?.apellido.trim()
    )
      return `Completá nombre y apellido de la persona ${i + 2}.`;
  }
  return null;
}

const inputClass =
  "w-full border border-ink/15 rounded-sm px-4 py-3 text-ink bg-paper focus:outline-none focus:ring-2 focus:ring-clay/30 focus:border-clay transition-all placeholder-ink/30 text-sm";

const labelClass =
  "block text-[10px] uppercase tracking-[0.25em] text-ink/50 font-semibold mb-2";

export function ReservaForm() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const dialogTitleId = useId();

  // Disable body scroll when modal is open
  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  const setField = <K extends keyof Omit<FormData, "huespedes">>(
    key: K,
    value: FormData[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleCantPersonas = (val: string) => {
    const n = Math.min(20, Math.max(1, parseInt(val) || 1));
    const needed = Math.max(0, n - 1);
    setForm((prev) => ({
      ...prev,
      cantPersonas: String(n),
      huespedes: Array.from(
        { length: needed },
        (_, i) => prev.huespedes[i] ?? { nombre: "", apellido: "" }
      ),
    }));
  };

  const updateHuesped = (
    idx: number,
    field: "nombre" | "apellido",
    val: string
  ) =>
    setForm((prev) => ({
      ...prev,
      huespedes: prev.huespedes.map((h, i) =>
        i === idx ? { ...h, [field]: val } : h
      ),
    }));

  const openModal = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate(form);
    if (err) {
      setFieldError(err);
      return;
    }
    setFieldError(null);
    setApiError(null);
    setStatus("idle");
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setStatus("loading");
    setApiError(null);
    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          cantPersonas: parseInt(form.cantPersonas) || 1,
        }),
      });
      const data: { ok?: boolean; error?: string } = await res.json();
      if (!res.ok) {
        setApiError(data.error ?? "Error al enviar la reserva.");
        setStatus("error");
        return;
      }
      setShowModal(false);
      setStatus("success");
    } catch {
      setApiError("Error de conexión. Verificá tu internet y volvé a intentar.");
      setStatus("error");
    }
  };

  const closeModal = () => {
    if (status === "loading") return;
    setShowModal(false);
    setApiError(null);
    setStatus("idle");
  };

  // —— SUCCESS STATE ——
  if (status === "success") {
    return (
      <section className="bg-beige py-20 md:py-28 relative overflow-hidden">
        <div className="texture-grain absolute inset-0" />
        <div className="max-w-2xl mx-auto px-6 relative text-center">
          <div className="w-16 h-16 rounded-full bg-forest/12 flex items-center justify-center mx-auto mb-6 text-forest text-2xl font-serif">
            ✓
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
            ¡Reserva enviada!
          </h2>
          <p className="text-ink/65 leading-relaxed text-lg max-w-[44ch] mx-auto">
            Recibimos tu solicitud. Te confirmamos la disponibilidad por
            WhatsApp a la brevedad.
          </p>
          <a
            href="https://wa.me/5492944000000?text=Hola%20Huellas%2C%20acabo%20de%20completar%20el%20formulario%20de%20reserva"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block bg-forest text-beige px-8 py-3.5 rounded-full text-sm font-medium uppercase tracking-[0.2em] hover:bg-moss transition-all shadow-lg"
          >
            Confirmar por WhatsApp →
          </a>
        </div>
      </section>
    );
  }

  const today = todayISO();
  const minCheckout = form.checkin ? nextDayOf(form.checkin) : today;
  const cantNum = parseInt(form.cantPersonas) || 1;

  return (
    <>
      {/* —— FORM —— */}
      <section className="bg-beige py-20 md:py-28 relative overflow-hidden">
        <div className="texture-grain absolute inset-0" />
        <div className="max-w-3xl mx-auto px-6 relative">
          <div className="mb-12">
            <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
              Reservar online
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-forest mt-6 leading-[1.05] text-balance">
              Completá el formulario y te confirmamos a la brevedad.
            </h2>
            <p className="mt-4 text-ink/60 leading-relaxed max-w-[52ch]">
              Revisamos tu solicitud y te contactamos por WhatsApp para
              confirmar disponibilidad y coordinar el pago.
            </p>
          </div>

          <form onSubmit={openModal} noValidate className="space-y-10">
            {/* Honeypot — visible al DOM, invisible para humanos */}
            <div
              style={{
                position: "absolute",
                left: "-9999px",
                top: "-9999px",
                width: "1px",
                height: "1px",
                overflow: "hidden",
                opacity: 0,
              }}
              aria-hidden="true"
            >
              <label htmlFor="_hp_website">Website</label>
              <input
                type="text"
                id="_hp_website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form._hp}
                onChange={(e) => setField("_hp", e.target.value)}
              />
            </div>

            {/* Datos personales */}
            <fieldset className="space-y-5">
              <legend className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold mb-5">
                Datos personales
              </legend>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="rf_nombre" className={labelClass}>
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="rf_nombre"
                    value={form.nombre}
                    autoComplete="given-name"
                    placeholder="Tu nombre"
                    onChange={(e) => setField("nombre", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="rf_apellido" className={labelClass}>
                    Apellido *
                  </label>
                  <input
                    type="text"
                    id="rf_apellido"
                    value={form.apellido}
                    autoComplete="family-name"
                    placeholder="Tu apellido"
                    onChange={(e) => setField("apellido", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="rf_email" className={labelClass}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="rf_email"
                    value={form.email}
                    autoComplete="email"
                    placeholder="correo@ejemplo.com"
                    onChange={(e) => setField("email", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="rf_telefono" className={labelClass}>
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    id="rf_telefono"
                    value={form.telefono}
                    autoComplete="tel"
                    placeholder="+54 9 294 000 0000"
                    onChange={(e) => setField("telefono", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="rf_dni" className={labelClass}>
                    DNI / Pasaporte *
                  </label>
                  <input
                    type="text"
                    id="rf_dni"
                    value={form.dni}
                    placeholder="12.345.678"
                    onChange={(e) => setField("dni", e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </fieldset>

            {/* Fechas y personas */}
            <fieldset className="space-y-5">
              <legend className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold mb-5">
                Fechas y personas
              </legend>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="rf_checkin" className={labelClass}>
                    Check-in *
                  </label>
                  <input
                    type="date"
                    id="rf_checkin"
                    value={form.checkin}
                    min={today}
                    onChange={(e) => {
                      const val = e.target.value;
                      setForm((prev) => ({
                        ...prev,
                        checkin: val,
                        checkout:
                          prev.checkout > val ? prev.checkout : "",
                      }));
                    }}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="rf_checkout" className={labelClass}>
                    Check-out *
                  </label>
                  <input
                    type="date"
                    id="rf_checkout"
                    value={form.checkout}
                    min={minCheckout}
                    onChange={(e) => setField("checkout", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="rf_cant" className={labelClass}>
                    Cant. personas *
                  </label>
                  <input
                    type="number"
                    id="rf_cant"
                    value={form.cantPersonas}
                    min={1}
                    max={20}
                    onChange={(e) => handleCantPersonas(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </fieldset>

            {/* Huéspedes adicionales */}
            {cantNum > 1 && (
              <fieldset className="space-y-4">
                <legend className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold mb-5">
                  Datos de los demás huéspedes
                </legend>
                {form.huespedes.map((h, i) => (
                  <div
                    key={i}
                    className="grid sm:grid-cols-2 gap-4 p-5 bg-paper/70 rounded-sm border border-ink/8"
                  >
                    <div className="sm:col-span-2 text-[10px] uppercase tracking-[0.25em] text-moss font-semibold">
                      Persona {i + 2}
                    </div>
                    <div>
                      <label
                        htmlFor={`rf_h${i}_nombre`}
                        className={labelClass}
                      >
                        Nombre *
                      </label>
                      <input
                        type="text"
                        id={`rf_h${i}_nombre`}
                        value={h.nombre}
                        placeholder="Nombre"
                        onChange={(e) =>
                          updateHuesped(i, "nombre", e.target.value)
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`rf_h${i}_apellido`}
                        className={labelClass}
                      >
                        Apellido *
                      </label>
                      <input
                        type="text"
                        id={`rf_h${i}_apellido`}
                        value={h.apellido}
                        placeholder="Apellido"
                        onChange={(e) =>
                          updateHuesped(i, "apellido", e.target.value)
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>
                ))}
              </fieldset>
            )}

            {fieldError && (
              <div className="bg-red-50 border border-red-200 rounded-sm px-5 py-4 text-red-700 text-sm leading-relaxed">
                {fieldError}
              </div>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto bg-forest text-beige px-10 py-4 rounded-full text-sm font-medium uppercase tracking-[0.2em] hover:bg-moss hover:-translate-y-0.5 transition-all shadow-lg"
            >
              Revisar reserva →
            </button>
          </form>
        </div>
      </section>

      {/* —— CONFIRMATION MODAL —— */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Card */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            className="relative bg-paper rounded-sm shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8">
              <h2
                id={dialogTitleId}
                className="font-serif text-2xl md:text-3xl text-forest mb-1"
              >
                Revisá tu reserva
              </h2>
              <p className="text-ink/50 text-sm mb-8">
                Confirmá que todos los datos estén correctos antes de enviar.
              </p>

              <dl className="text-sm divide-y divide-ink/8">
                {(
                  [
                    ["Titular", `${form.nombre} ${form.apellido}`],
                    ["Email", form.email],
                    ["Teléfono", form.telefono],
                    ["DNI / Pasaporte", form.dni],
                    ["Check-in", formatDate(form.checkin)],
                    ["Check-out", formatDate(form.checkout)],
                    ["Cant. personas", form.cantPersonas],
                  ] as [string, string][]
                ).map(([label, val]) => (
                  <div key={label} className="grid grid-cols-[140px_1fr] gap-3 py-3">
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-clay font-semibold self-start pt-0.5 shrink-0">
                      {label}
                    </dt>
                    <dd className="text-ink/75 break-words">{val}</dd>
                  </div>
                ))}
                {form.huespedes.length > 0 && (
                  <div className="grid grid-cols-[140px_1fr] gap-3 py-3">
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-clay font-semibold self-start pt-0.5 shrink-0">
                      Otros huéspedes
                    </dt>
                    <dd className="text-ink/75 space-y-1">
                      {form.huespedes.map((h, i) => (
                        <div key={i}>
                          {h.nombre} {h.apellido}
                        </div>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>

              {apiError && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-sm px-5 py-4 text-red-700 text-sm leading-relaxed">
                  {apiError}
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={status === "loading"}
                  className="flex-1 bg-forest text-beige px-8 py-3.5 rounded-full text-sm font-medium uppercase tracking-[0.2em] hover:bg-moss transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Enviando…" : "Confirmar reserva"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={status === "loading"}
                  className="flex-1 border border-ink/20 text-ink/65 px-8 py-3.5 rounded-full text-sm font-medium uppercase tracking-[0.2em] hover:border-clay hover:text-clay transition-all disabled:opacity-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
