import Link from "next/link";

export function Introduccion() {
  return (
    <section className="bg-forest text-beige py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-beige/90 max-w-[52ch]">
            Lago Puelo es uno de los secretos mejor guardados de la Patagonia
            argentina. Sus aguas turquesas dentro de un parque nacional forman
            uno de los paisajes más impresionantes del continente — sin las
            multitudes de Bariloche.
          </p>
          <p className="text-lg leading-relaxed text-beige/70 max-w-[52ch]">
            A 18 km de El Bolsón y 120 km de Bariloche, el pueblo combina
            accesibilidad con autenticidad. No hay resorts ni shoppings — hay
            bosque, lago, gente de montaña y el hostel de Maxi a 5 minutos del
            parque.
          </p>
          <Link
            href="/contacto"
            className="inline-block mt-4 bg-clay text-paper px-8 py-3.5 rounded-full text-sm font-medium uppercase tracking-[0.2em] hover:brightness-110 hover:-translate-y-0.5 transition-all shadow-lg"
          >
            Reservar en Huellas
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { n: "11.250 ha", l: "Superficie del parque nacional" },
            { n: "800 m", l: "Altitud sobre el nivel del mar" },
            { n: "120 km", l: "Desde Bariloche por ruta" },
            { n: "Todo el año", l: "Abierto para visitar" },
          ].map((f) => (
            <div key={f.l} className="border border-beige/15 rounded-sm p-6">
              <div className="font-serif text-3xl md:text-4xl text-wood">
                {f.n}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-beige/45 mt-2 leading-snug">
                {f.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
