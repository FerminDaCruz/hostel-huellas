export type Huesped = { nombre: string; apellido: string };

export type Pago = { fecha: string; monto: number; nota?: string };

export type Reserva = {
  id: string;
  creadoEn: Date;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  dni: string;
  checkIn: Date;
  checkOut: Date;
  tipoAlojamiento: string;
  cantPersonas: number;
  huespedes: unknown;
  creadaPorAdmin: boolean;
  montoTotal: number | null;
  montoPagado: number;
  pagos: unknown;
};

export type MonthData = { label: string; count: number };

export type TipoData = { tipo: string; count: number; upcoming: number };

export const TIPO_LABELS: Record<string, string> = {
  dorm: "Dormitorio",
  "privada-picos": "3 Picos",
  "privada-cuevas": "Cuevas",
  "privada-huemul": "Huemul",
  privada: "Privada",           // fallback for legacy records
  departamento: "Departamento",
};

export const TIPO_COLORS: Record<string, string> = {
  dorm: "bg-moss/15 text-moss",
  "privada-picos": "bg-clay/15 text-clay",
  "privada-cuevas": "bg-clay/20 text-clay",
  "privada-huemul": "bg-clay/10 text-clay",
  privada: "bg-clay/15 text-clay",
  departamento: "bg-forest/15 text-forest",
};

export const TIPO_BAR_COLORS: Record<string, string> = {
  dorm: "bg-moss",
  "privada-picos": "bg-clay",
  "privada-cuevas": "bg-clay/80",
  "privada-huemul": "bg-clay/60",
  privada: "bg-clay",
  departamento: "bg-forest",
};
