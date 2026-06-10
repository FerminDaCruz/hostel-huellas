import { FaWhatsapp, FaInstagram, FaFacebook, FaEnvelope } from "react-icons/fa";

export function Canales() {
  return (
    <section className="bg-paper py-20 md:py-24 relative overflow-hidden">
      <div className="texture-grain absolute inset-0" />

      {/* Instagram gradient definition */}
      <svg width="0" height="0" className="absolute overflow-hidden">
        <defs>
          <linearGradient id="canales-ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FCAF45" />
            <stop offset="35%" stopColor="#E1306C" />
            <stop offset="70%" stopColor="#833AB4" />
            <stop offset="100%" stopColor="#405DE6" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* WhatsApp */}
          <a
            href="https://wa.me/5492323334671?text=Hola%21%20Quiero%20consultar%20sobre%20disponibilidad%20y%20precios%20en%20Hostel%20Huellas%20Puelo%20%F0%9F%8C%BF"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-beige border border-ink/5 rounded-sm p-8 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col gap-5"
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#25D36618" }}
            >
              <FaWhatsapp className="text-xl" style={{ color: "#25D366" }} />
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

          {/* Instagram */}
          <a
            href="https://instagram.com/hostelhuellaspuelo"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-beige border border-ink/5 rounded-sm p-8 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col gap-5"
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #FCAF4520 0%, #E1306C20 50%, #405DE620 100%)" }}
            >
              <FaInstagram className="text-xl" style={{ fill: "url(#canales-ig-gradient)" }} />
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-2xl text-forest mb-2">Instagram</h2>
              <p className="text-ink/60 leading-relaxed text-sm">
                Seguinos para ver la vida del hostel. También podés escribirnos
                por DM.
              </p>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-clay font-medium group-hover:text-forest transition-colors">
              @hostelhuellaspuelo →
            </div>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/people/Hostel-Huellas/61575148117864/"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-beige border border-ink/5 rounded-sm p-8 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col gap-5"
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#1877F218" }}
            >
              <FaFacebook className="text-xl" style={{ color: "#1877F2" }} />
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-2xl text-forest mb-2">Facebook</h2>
              <p className="text-ink/60 leading-relaxed text-sm">
                Encontranos en Facebook para novedades, fotos y reseñas de
                huéspedes.
              </p>
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-clay font-medium group-hover:text-forest transition-colors">
              Hostel Huellas →
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:hostelhuellaslp@gmail.com"
            className="group bg-beige border border-ink/5 rounded-sm p-8 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col gap-5"
          >
            <div className="w-11 h-11 rounded-full bg-forest/10 flex items-center justify-center shrink-0">
              <FaEnvelope className="text-forest text-xl" />
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
