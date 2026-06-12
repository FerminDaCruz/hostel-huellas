type HeaderProps = {
  handleLogout: () => Promise<void>;
};

export function Header({ handleLogout }: HeaderProps) {
  return (
    <header className="bg-forest text-paper px-6 py-4 flex items-center justify-between">
      <h1 className="font-serif text-2xl">Panel — Huellas Puelo</h1>
      <button
        onClick={handleLogout}
        className="text-sm text-paper/70 hover:text-paper border border-paper/30 px-4 py-2 rounded-sm transition-colors"
      >
        Cerrar sesión
      </button>
    </header>
  );
}
