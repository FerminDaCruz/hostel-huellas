"use client";

import { useState } from "react";
import { FaPencilAlt, FaUndo, FaCheck, FaTimes } from "react-icons/fa";
import type { Pago, Reserva } from "./types";

function parsePagos(raw: unknown): Pago[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (p): p is Pago =>
      typeof p === "object" &&
      p !== null &&
      typeof (p as Pago).fecha === "string" &&
      typeof (p as Pago).monto === "number"
  );
}

function fmtPesos(n: number | null | undefined) {
  return (n ?? 0).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  });
}

function fmtFecha(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function calcEstado(total: number | null, pagado: number): "pendiente" | "parcial" | "pagado" {
  if (pagado === 0) return "pendiente";
  if (total !== null && pagado >= total) return "pagado";
  return "parcial";
}

const ESTADO_STYLE = {
  pendiente: "bg-ink/8 text-ink/50",
  parcial: "bg-wood/20 text-clay",
  pagado: "bg-moss/15 text-moss",
};

const ESTADO_LABEL = {
  pendiente: "Pendiente",
  parcial: "Pago parcial",
  pagado: "Pagado",
};

type Props = {
  reserva: Reserva;
  onUpdated: (updated: Reserva) => void;
};

export function PagoSection({ reserva, onUpdated }: Props) {
  const [pagos, setPagos] = useState<Pago[]>(parsePagos(reserva.pagos));
  const [montoPagado, setMontoPagado] = useState(reserva.montoPagado ?? 0);
  const [montoTotal, setMontoTotal] = useState<string>(
    reserva.montoTotal != null ? String(reserva.montoTotal) : ""
  );
  const [editingTotal, setEditingTotal] = useState(false);
  const [newMonto, setNewMonto] = useState("");
  const [newNota, setNewNota] = useState("");
  const [newFecha, setNewFecha] = useState(new Date().toISOString().slice(0, 10));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const totalNum = montoTotal !== "" ? Number(montoTotal) : null;
  const estado = calcEstado(totalNum, montoPagado);
  const pendiente = totalNum !== null ? Math.max(0, totalNum - montoPagado) : null;
  const pct = totalNum ? Math.min(100, (montoPagado / totalNum) * 100) : 0;

  async function handleSaveTotal() {
    setSaving(true);
    const res = await fetch(`/api/admin/reservas/${reserva.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ montoTotal: montoTotal === "" ? null : Number(montoTotal) }),
    });
    if (res.ok) {
      const updated: Reserva = await res.json();
      setEditingTotal(false);
      onUpdated(updated);
    }
    setSaving(false);
  }

  async function handleAddPago() {
    if (!newMonto || Number(newMonto) <= 0) { setError("Ingresá un monto válido."); return; }
    setError("");
    setSaving(true);
    const res = await fetch(`/api/admin/reservas/${reserva.id}/pagos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ monto: Number(newMonto), nota: newNota || undefined, fecha: newFecha }),
    });
    if (res.ok) {
      const updated: Reserva = await res.json();
      setPagos(parsePagos(updated.pagos));
      setMontoPagado(updated.montoPagado ?? 0);
      setNewMonto("");
      setNewNota("");
      setNewFecha(new Date().toISOString().slice(0, 10));
      onUpdated(updated);
    }
    setSaving(false);
  }

  async function handleRemoveLastPago() {
    if (!confirm("¿Eliminar el último pago registrado?")) return;
    setSaving(true);
    const res = await fetch(`/api/admin/reservas/${reserva.id}/pagos`, { method: "DELETE" });
    if (res.ok) {
      const updated: Reserva = await res.json();
      setPagos(parsePagos(updated.pagos));
      setMontoPagado(updated.montoPagado ?? 0);
      onUpdated(updated);
    }
    setSaving(false);
  }

  return (
    <div className="mt-5 border-t border-ink/8 pt-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 font-semibold">
          Estado de pago
        </p>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${ESTADO_STYLE[estado]}`}>
          {ESTADO_LABEL[estado]}
        </span>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {/* Monto total */}
        <div className="bg-ink/3 rounded-sm px-3 py-2.5">
          <p className="text-[9px] uppercase tracking-[0.15em] text-ink/40 mb-1">Total a pagar</p>
          {editingTotal ? (
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                value={montoTotal}
                onChange={(e) => setMontoTotal(e.target.value)}
                className="w-24 text-sm border border-ink/15 rounded px-1.5 py-0.5 bg-white focus:outline-none focus:border-forest"
                placeholder="0"
              />
              <button
                onClick={handleSaveTotal}
                disabled={saving}
                className="text-moss hover:text-forest disabled:opacity-40"
                aria-label="Confirmar"
              >
                <FaCheck size={11} />
              </button>
              <button
                onClick={() => {
                  setMontoTotal(reserva.montoTotal != null ? String(reserva.montoTotal) : "");
                  setEditingTotal(false);
                }}
                className="text-ink/40 hover:text-ink"
                aria-label="Cancelar"
              >
                <FaTimes size={11} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditingTotal(true)}
              className="text-sm font-semibold text-ink hover:text-forest transition-colors text-left group flex items-center gap-1.5"
            >
              {totalNum !== null ? fmtPesos(totalNum) : <span className="text-ink/30 text-xs">Sin definir</span>}
              <FaPencilAlt size={9} className="text-ink/25 group-hover:text-clay" />
            </button>
          )}
        </div>

        {/* Pagado */}
        <div className="bg-moss/8 rounded-sm px-3 py-2.5">
          <p className="text-[9px] uppercase tracking-[0.15em] text-ink/40 mb-1">Recibido</p>
          <p className="text-sm font-semibold text-moss">{fmtPesos(montoPagado)}</p>
        </div>

        {/* Pendiente */}
        <div className={`rounded-sm px-3 py-2.5 ${pendiente === 0 ? "bg-moss/8" : "bg-clay/8"}`}>
          <p className="text-[9px] uppercase tracking-[0.15em] text-ink/40 mb-1">Pendiente</p>
          <p className={`text-sm font-semibold ${pendiente === 0 ? "text-moss" : "text-clay"}`}>
            {pendiente !== null ? fmtPesos(pendiente) : "—"}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      {totalNum !== null && (
        <div className="h-1.5 bg-ink/8 rounded-full mb-5 overflow-hidden">
          <div
            className="h-full bg-moss rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      )}

      {/* Payment history */}
      {pagos.length > 0 && (
        <div className="mb-4">
          <p className="text-[9px] uppercase tracking-[0.15em] text-ink/40 font-semibold mb-2">
            Historial de pagos
          </p>
          <div className="space-y-1.5">
            {pagos.map((p, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-ink/5 last:border-0">
                <span className="text-ink/40 tabular-nums w-20 shrink-0">{fmtFecha(p.fecha)}</span>
                <span className="flex-1 text-ink/60 px-3 italic">{p.nota ?? "—"}</span>
                <span className="font-semibold text-forest tabular-nums">{fmtPesos(p.monto)}</span>
              </div>
            ))}
          </div>
          <button
            onClick={handleRemoveLastPago}
            disabled={saving}
            className="mt-2 text-[10px] text-ink/30 hover:text-clay transition-colors disabled:opacity-40 flex items-center gap-1.5"
          >
            <FaUndo size={9} />
            Deshacer último pago
          </button>
        </div>
      )}

      {/* Add payment form */}
      <div className="bg-ink/2 rounded-sm p-3">
        <p className="text-[9px] uppercase tracking-[0.15em] text-ink/40 font-semibold mb-3">
          Registrar pago
        </p>
        <div className="flex flex-wrap gap-2 items-end">
          <div>
            <label className="block text-[9px] uppercase tracking-[0.1em] text-ink/40 mb-1">Fecha</label>
            <input
              type="date"
              value={newFecha}
              onChange={(e) => setNewFecha(e.target.value)}
              className="text-xs border border-ink/15 rounded px-2 py-1.5 bg-white focus:outline-none focus:border-forest"
            />
          </div>
          <div>
            <label className="block text-[9px] uppercase tracking-[0.1em] text-ink/40 mb-1">Monto $</label>
            <input
              type="number"
              value={newMonto}
              onChange={(e) => setNewMonto(e.target.value)}
              placeholder="20000"
              className="w-28 text-xs border border-ink/15 rounded px-2 py-1.5 bg-white focus:outline-none focus:border-forest"
            />
          </div>
          <div className="flex-1 min-w-32">
            <label className="block text-[9px] uppercase tracking-[0.1em] text-ink/40 mb-1">Nota (opcional)</label>
            <input
              type="text"
              value={newNota}
              onChange={(e) => setNewNota(e.target.value)}
              placeholder="Ej: Noches 1 y 2"
              className="w-full text-xs border border-ink/15 rounded px-2 py-1.5 bg-white focus:outline-none focus:border-forest"
            />
          </div>
          <button
            onClick={handleAddPago}
            disabled={saving || !newMonto}
            className="bg-forest text-paper text-xs px-4 py-1.5 rounded hover:bg-moss transition-colors disabled:opacity-40 shrink-0"
          >
            {saving ? "…" : "Registrar"}
          </button>
        </div>
        {error && <p className="text-xs text-clay mt-2">{error}</p>}
      </div>
    </div>
  );
}
