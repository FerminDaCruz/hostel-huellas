import Image from "next/image";

const items = [
  {
    n: "01",
    t: "Te sentís en casa",
    d: "Una casa familiar transformada en refugio. Sin recepciones frías, sin protocolos.",
    i: "/maxi-portrait.jpg",
  },
  {
    n: "02",
    t: "Comunidad real",
    d: "No somos extraños compartiendo habitación. Somos viajeros compartiendo la vida.",
    i: "/maxi-portrait.jpg",
  },
  {
    n: "03",
    t: "Experiencias compartidas",
    d: "Fogones, asados, mate al sol, salidas espontáneas. La vida pasa en los espacios comunes.",
    i: "/maxi-portrait.jpg",
  },
  {
    n: "04",
    t: "Naturaleza a pocos pasos",
    d: "El bosque andino y el lago como patio delantero. Salís de la cama y ya estás adentro.",
    i: "/maxi-portrait.jpg",
  },
  {
    n: "05",
    t: "Trekking y actividades",
    d: "Maxi es guía profesional. Te llevamos a los rincones que solo los locales conocen.",
    i: "/maxi-portrait.jpg",
  },
  {
    n: "06",
    t: "Atención personalizada",
    d: "Te recibimos nosotros. Conocemos tu nombre. Sabemos cómo tomás el café.",
    i: "/maxi-portrait.jpg",
  },
];

export function Differentiators() {
  return (
    <section className="relative py-28 md:py-36 bg-forest overflow-hidden">
      <div className="texture-grain absolute inset-0" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="max-w-3xl mb-16 md:mb-24 reveal">
          <span className="text-[11px] uppercase tracking-[0.3em] text-wood/80 font-semibold">
            Qué hace diferente a Huellas
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-medium text-beige text-balance leading-[1.05] mt-6">
            Seis razones para dejar de buscar{" "}
            <em className="text-wood">"otro" hostel</em>.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-beige/10 border border-beige/10 rounded-2xl overflow-hidden">
          {items.map((i) => (
            <article key={i.n} className="relative group  aspect-square reveal">
              <Image
                src={i.i}
                alt="Maxi, fundador y guía de montaña de Hostel Huellas Puelo, sonriendo con un mate en la cocina del hostel"
                width={1024}
                height={1024}
                loading="lazy"
                className="w-full absolute inset-0 object-cover rounded-sm shadow-2xl shadow-black/15 ring-1 ring-black/5"
              />
              <div className="bg-black/40 absolute inset-0 z-10" />
              <div className="absolute z-20 h-full w-full flex flex-col justify-between p-10">
                <span className=" text-wood/50 font-serif text-3xl">{i.n}</span>

                <div>
                  <h3 className="  text-beige text-2xl md:text-3xl font-serif font-medium mb-4 leading-tight">
                    {i.t}
                  </h3>
                  <p className="  text-beige/65 text-sm leading-relaxed max-w-[36ch]">
                    {i.d}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
