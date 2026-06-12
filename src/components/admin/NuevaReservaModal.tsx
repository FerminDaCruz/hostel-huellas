import { ReservaForm } from "@/components/shared/ReservaForm";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export function NuevaReservaModal({ onClose, onSuccess }: Props) {
  return (
    <div
      className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-paper rounded-sm shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink/8 flex-shrink-0">
          <h2 className="font-serif text-xl text-forest">Nueva reserva manual</h2>
          <button
            onClick={onClose}
            className="text-ink/40 hover:text-ink text-xl leading-none"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-6">
          <ReservaForm isAdmin onSuccess={onSuccess} />
        </div>
      </div>
    </div>
  );
}
