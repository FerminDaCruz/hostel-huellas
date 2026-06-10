export function Historia() {
  return (
    <section className="bg-beige py-20 md:py-28 relative overflow-hidden">
      <div className="texture-grain absolute inset-0" />
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-clay font-semibold">
              La historia
            </span>
            <div className="mt-6 space-y-6">
              <div className="border-l-2 border-clay pl-6">
                <div className="font-serif text-2xl text-clay italic">
                  1990s
                </div>
                <p className="text-ink/60 text-sm mt-1">
                  Crece en la Comarca Andina
                </p>
              </div>
              <div className="border-l-2 border-clay/50 pl-6">
                <div className="font-serif text-2xl text-clay/70 italic">
                  2010s
                </div>
                <p className="text-ink/60 text-sm mt-1">
                  Se forma como guía de montaña
                </p>
              </div>
              <div className="border-l-2 border-clay pl-6">
                <div className="font-serif text-2xl text-clay italic">2017</div>
                <p className="text-ink/60 text-sm mt-1">Nace Huellas Puelo</p>
              </div>
              <div className="border-l-2 border-clay/40 pl-6">
                <div className="font-serif text-2xl text-clay/60 italic">
                  Hoy
                </div>
                <p className="text-ink/60 text-sm mt-1">
                  +2.000 huellas, 32 países, temporada a temporada
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-lg text-ink/80 leading-relaxed">
            <p>
              Maxi creció en la Comarca Andina. No como turista de verano — como
              habitante que conoce cada sendero, cada arroyo, cada nombre de
              cerro que no aparece en los mapas oficiales. La montaña no es su
              negocio: es su idioma.
            </p>
            <p>
              Estudió guía de turismo y guía de montaña. Pasó años llevando
              grupos por el Parque Nacional, aprendiendo a leer el tiempo, el
              bosque, el ritmo de cada persona. Después eligió hacer algo más
              permanente.
            </p>
            <p>
              En 2017, la casa familiar de Lago Puelo se convirtió en Huellas.
              Sin presupuesto de marketing, sin diseño pensado. Con ganas de
              compartir el lugar que más quería. Los primeros huéspedes
              empezaron a dejar sus huellas pintadas en una pared. El nombre
              llegó solo.
            </p>
            <blockquote className="border-l-2 border-clay pl-6 my-8">
              <p className="font-serif italic text-xl text-forest leading-snug">
                "Huellas no es un lugar. Es la suma de todas las personas que
                pasaron por acá."
              </p>
              <cite className="text-[10px] uppercase tracking-[0.25em] mt-4 block text-moss font-semibold not-italic">
                Maxi · Fundador & Guía
              </cite>
            </blockquote>
            <p>
              Hoy Maxi recibe a cada huésped en persona, sabe cómo tomás el
              café, recuerda tu nombre cuando volvés. Eso no se automatiza.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
