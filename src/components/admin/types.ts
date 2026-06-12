export type Huesped = { nombre: string; apellido: string };

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
};

export type MonthData = { label: string; count: number };

export type TipoData = { tipo: string; count: number; upcoming: number };

export const TIPO_LABELS: Record<string, string> = {
  dorm: "Dormitorio",
  privada: "Privada",
  departamento: "Departamento",
};

export const TIPO_COLORS: Record<string, string> = {
  dorm: "bg-moss/15 text-moss",
  privada: "bg-clay/15 text-clay",
  departamento: "bg-forest/15 text-forest",
};

export const TIPO_BAR_COLORS: Record<string, string> = {
  dorm: "bg-moss",
  privada: "bg-clay",
  departamento: "bg-forest",
};
