type Props = {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  tab: "proximas" | "pasadas";
  onTabChange: (tab: "proximas" | "pasadas") => void;
  filterTipo: string;
  onFilterTipoChange: (tipo: string) => void;
  isSearching: boolean;
  resultCount: number;
  upcomingCount: number;
  pastCount: number;
  onNewReserva: () => void;
};

export function ReservasToolbar({
  searchQuery,
  onSearchChange,
  tab,
  onTabChange,
  filterTipo,
  onFilterTipoChange,
  isSearching,
  resultCount,
  upcomingCount,
  pastCount,
  onNewReserva,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar por nombre…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="text-sm border border-ink/15 rounded-sm pl-8 pr-8 py-1.5 bg-white text-ink w-52 focus:outline-none focus:border-forest"
        />
        <svg
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink/35 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        {isSearching && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink text-base leading-none"
            aria-label="Limpiar búsqueda"
          >
            ×
          </button>
        )}
      </div>

      {/* Tabs — dimmed while searching */}
      <div
        className={`flex rounded-sm border border-ink/10 overflow-hidden transition-opacity ${
          isSearching ? "opacity-40 pointer-events-none" : ""
        }`}
      >
        {(
          [
            { key: "proximas", label: `Próximas (${upcomingCount})` },
            { key: "pasadas", label: `Pasadas (${pastCount})` },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            onClick={() => onTabChange(t.key)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.key
                ? "bg-forest text-paper"
                : "bg-white text-ink/60 hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tipo filter — dimmed while searching */}
      <select
        value={filterTipo}
        onChange={(e) => onFilterTipoChange(e.target.value)}
        disabled={isSearching}
        className={`text-sm border border-ink/15 rounded-sm px-3 py-1.5 bg-white text-ink transition-opacity ${
          isSearching ? "opacity-40" : ""
        }`}
      >
        <option value="todas">Todos los tipos</option>
        <option value="dorm">Dormitorio compartido</option>
        <option value="privada-picos">Hab. 3 Picos</option>
        <option value="privada-cuevas">Hab. Cuevas</option>
        <option value="privada-huemul">Hab. Huemul</option>
        <option value="departamento">Departamento</option>
      </select>

      {/* Search result count */}
      {isSearching && (
        <span className="text-xs text-ink/50">
          {resultCount === 0
            ? "Sin resultados"
            : `${resultCount} resultado${resultCount !== 1 ? "s" : ""} en todas las reservas`}
        </span>
      )}

      <button
        onClick={onNewReserva}
        className="ml-auto bg-forest text-paper text-sm px-5 py-2 rounded-sm hover:bg-moss transition-colors"
      >
        + Nueva reserva manual
      </button>
    </div>
  );
}
