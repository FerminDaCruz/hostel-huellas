export function Canales() {
  return (
    <section className="bg-paper py-20 md:py-24 relative overflow-hidden">
      <div className="texture-grain absolute inset-0" />
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-3 gap-5">
          <a
            href="https://wa.me/5492323334671?text=Hola%21%20Quiero%20consultar%20sobre%20disponibilidad%20y%20precios%20en%20Hostel%20Huellas%20Puelo%20%F0%9F%8C%BF"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-beige border border-ink/5 rounded-sm p-8 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col gap-5"
          >
            <div className="w-11 h-11 rounded-full bg-forest/10 flex items-center justify-center shrink-0">
              <span className="text-forest font-serif text-lg">W</span>
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-2xl text-forest mb-2">WhatsApp</h2>
              <p className="text-ink/60 leading-relaxed text-sm">
                La forma más rápida. Respondemos todos los días, generalmente en
                menos de una hora.
              </p>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-clay font-medium group-hover:text-forest transition-colors">
              Escribir ahora →
            </div>
          </a>

          <a
            href="https://instagram.com/hostelhuellaspuelo"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-beige border border-ink/5 rounded-sm p-8 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col gap-5"
          >
            <div className="w-11 h-11 rounded-full bg-forest/10 flex items-center justify-center shrink-0">
              <span className="text-forest font-serif text-sm font-medium">
                IG
              </span>
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-2xl text-forest mb-2">
                Instagram
              </h2>
              <p className="text-ink/60 leading-relaxed text-sm">
                Seguinos para ver la vida del hostel. También podés escribirnos
                por DM.
              </p>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-clay font-medium group-hover:text-forest transition-colors">
              @hostelhuellaspuelo →
            </div>
          </a>

          <a
            href="mailto:hostelhuellaslp@gmail.com"
            className="group bg-beige border border-ink/5 rounded-sm p-8 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col gap-5"
          >
            <div className="w-11 h-11 rounded-full bg-forest/10 flex items-center justify-center shrink-0">
              <span className="text-forest font-serif text-sm font-medium">
                @
              </span>
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-2xl text-forest mb-2">Email</h2>
              <p className="text-ink/60 leading-relaxed text-sm">
                Para consultas que requieren más detalle o adjuntar
                documentación.
              </p>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-clay font-medium group-hover:text-forest transition-colors break-all">
              hostelhuellaslp@gmail.com →
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
