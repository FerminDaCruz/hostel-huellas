export type Resena = {
  name: string;
  origin: string;
  year: string;
  quote: string;
  color: "clay" | "moss" | "wood" | "forest";
  rotate: number;
  scale: number;
  mirror?: boolean;
};

export const resenas: Resena[] = [
  {
    name: "Lucas",
    origin: "Buenos Aires, AR",
    year: "2022",
    quote: "Casi un mes viviendo acá y terminé sintiéndome parte de una familia.",
    color: "clay",
    rotate: -12,
    scale: 1,
  },
  {
    name: "Marina",
    origin: "São Paulo, BR",
    year: "2023",
    quote: "Las risas nunca faltaron en los fogones nocturnos.",
    color: "moss",
    rotate: 8,
    scale: 0.9,
    mirror: true,
  },
  {
    name: "Hans",
    origin: "Berlin, DE",
    year: "2021",
    quote: "The most authentic hostel experience in South America.",
    color: "wood",
    rotate: -6,
    scale: 1.05,
  },
  {
    name: "Chloé",
    origin: "Lyon, FR",
    year: "2024",
    quote: "Vuelvo a Francia con el corazón lleno y muchas ganas de regresar.",
    color: "clay",
    rotate: 14,
    scale: 0.95,
  },
  {
    name: "Sofía",
    origin: "Madrid, ES",
    year: "2023",
    quote: "Me hicieron sentir en casa desde el primer día. Una familia.",
    color: "forest",
    rotate: -18,
    scale: 1,
    mirror: true,
  },
  {
    name: "Tomás & Vale",
    origin: "Rosario, AR",
    year: "2024",
    quote: "Volveríamos sin dudar. La mejor experiencia del viaje.",
    color: "moss",
    rotate: -20,
    scale: 0.92,
  },
  {
    name: "James",
    origin: "Bristol, UK",
    year: "2019",
    quote: "Maxi made us feel like we'd known each other for years.",
    color: "clay",
    rotate: -8,
    scale: 1.08,
    mirror: true,
  },
  {
    name: "Elena",
    origin: "Milano, IT",
    year: "2022",
    quote: "Una experiencia única para conocer Lago Puelo de verdad.",
    color: "wood",
    rotate: 16,
    scale: 0.94,
  },
  {
    name: "Diego",
    origin: "Santiago, CL",
    year: "2023",
    quote: "Salí con amigos para toda la vida. Eso vale más que el alojamiento.",
    color: "moss",
    rotate: -10,
    scale: 1,
  },
  {
    name: "Anna",
    origin: "Praga, CZ",
    year: "2024",
    quote: "Felt like coming home, even though it was the other side of the world.",
    color: "clay",
    rotate: 6,
    scale: 1.02,
    mirror: true,
  },
  {
    name: "Pedro",
    origin: "Lima, PE",
    year: "2022",
    quote: "El desayuno casero, los trekkings, los fogones. Todo.",
    color: "forest",
    rotate: -14,
    scale: 0.96,
  },
  {
    name: "Sarah",
    origin: "Melbourne, AU",
    year: "2024",
    quote: "I left part of my heart on that wall. Will be back.",
    color: "clay",
    rotate: 12,
    scale: 1.04,
    mirror: true,
  },
];
