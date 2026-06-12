"use client";

import { useState } from "react";
import type { Reserva } from "./types";

function toDateInput(date: Date): string {
  return new Date(date).toISOString().slice(0, 10);
}

type Props = {
  reserva: Reserva;
  onClose: () => void;
  onSuccess: (updated: Reserva) => void;
};

export function EditarReservaModal({ reserva, onClose, onSuccess }: Props) {
  const [form, setForm] = useState({
    nombre: reserva.nombre,
    apellido: reserva.apellido,
    email: reserva.email,
    telefono: reserva.telefono,
    dni: reserva.dni,
    checkIn: toDateInput(reserva.checkIn),
    checkOut: toDateInput(reserva.checkOut),
    tipoAlojamiento: reserva.tipoAlojamiento,
    cantPersonas: String(reserva.cantPersonas),
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (new Date(form.checkIn) >= new Date(form.checkOut)) {
      setError("El check-out debe ser posterior al check-in.");
      return;
    }
    setError("");
    setSaving(true);
    const res = await fetch(`/api/admin/reservas/${reserva.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        cantPersonas: Number(form.cantPersonas),
      }),
    });
    if (res.ok) {
      const updated: Reserva = await res.json();
      onSuccess(updated);
    } else {
      const data = await res.json().catch(() => ({}));
      setError((data as { error?: string }).error ?? "Error al guardar.");
    }
    setSaving(false);
  }

  const labelCls = "block text-[10px] uppercase tracking-[0.15em] text-ink/50 mb-1 font-semibold";
  const inputCls = "w-full border border-ink/15 rounded-sm px-3 py-2 text-sm bg-white focus:outline-none focus:border-forest";

  return (
    <div
      className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-paper rounded-sm shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink/8 shrink-0">
          <h2 className="font-serif text-xl text-forest">Editar reserva</h2>
          <button onClick={onClose} className="text-ink/40 hover:text-ink text-xl leading-none" aria-label="Cerrar">×</button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-5">
          {/* Personal data */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Nombre</label>
              <input className={inputCls} value={form.nombre} onChange={(e) => set("nombre", e.target.value)} required />
            </div>
            <div>
              <label className={labelCls}>Apellido</label>
              <input className={inputCls} value={form.apellido} onChange={(e) => set("apellido", e.target.value)} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Email</label>
              <input type="email" className={inputCls} value={form.email} onChange={(e) => set("email", e.target.value)} required />
            </div>
            <div>
              <label className={labelCls}>Teléfono</label>
              <input className={inputCls} value={form.telefono} onChange={(e) => set("telefono", e.target.value)} required />
            </div>
          </div>

          <div>
            <label className={labelCls}>DNI / Pasaporte</label>
            <input className={inputCls} value={form.dni} onChange={(e) => set("dni", e.target.value)} required />
          </div>

          {/* Dates & type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Check-in</label>
              <input type="date" className={inputCls} value={form.checkIn} onChange={(e) => set("checkIn", e.target.value)} required />
            </div>
            <div>
              <label className={labelCls}>Check-out</label>
              <input type="date" className={inputCls} value={form.checkOut} onChange={(e) => set("checkOut", e.target.value)} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Tipo de alojamiento</label>
              <select
                className={inputCls}
                value={form.tipoAlojamiento}
                onChange={(e) => set("tipoAlojamiento", e.target.value)}
              >
                <option value="dorm">Dormitorio compartido</option>
                <option value="privada-picos">Hab. 3 Picos</option>
                <option value="privada-cuevas">Hab. Cuevas</option>
                <option value="privada-huemul">Hab. Huemul</option>
                <option value="departamento">Departamento</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Cantidad de personas</label>
              <input
                type="number"
                min="1"
                max="10"
                className={inputCls}
                value={form.cantPersonas}
                onChange={(e) => set("cantPersonas", e.target.value)}
                required
              />
            </div>
          </div>

          {error && <p className="text-sm text-clay">{error}</p>}

          <div className="flex justify-end gap-3 pt-2 border-t border-ink/8">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm text-ink/60 hover:text-ink transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-forest text-paper text-sm px-6 py-2 rounded-sm hover:bg-moss transition-colors disabled:opacity-50"
            >
              {saving ? "Guardando…" : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
