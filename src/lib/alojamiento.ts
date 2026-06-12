export type Habitacion = {
  slug: string;
  title: string;
  subtitle: string;
  desc: string;
  descLong: string;
  capacity: string;
  price: string;
  tag: string;
  img: string;
  images: string[];
  includes: string[];
  ideal: string;
};

export const habitaciones: Habitacion[] = [
  {
    slug: "dorm1",
    title: "Habitación compartida 1",
    subtitle: "El lugar donde los viajeros se encuentran",
    desc: "El lugar donde los viajeros se encuentran.",
    descLong:
      "Habitación de 5 camas, gente de todo el mundo, historias compartidas. Compartir el cuarto no significa perder privacidad — significa ganar una experiencia. Los vínculos más fuertes que se forman en Huellas nacen acá.",
    capacity: "Hasta 5 personas por habitación",
    price: "$20.000",
    tag: "Por noche / persona",
    img: "/assets/habitaciones/dorm-1.jpg",
    images: [
      "/assets/habitaciones/dorm-1.jpg",
      "/assets/habitaciones/dorm-2.jpg",
      "/assets/habitaciones/dorm-3.jpg",
      "/assets/habitaciones/dorm-bano-1.jpg",
      "/assets/habitaciones/dorm-bano-2.jpg",
    ],
    includes: [
      "Cama con ropa de cama",
      "Baños compartidos con agua caliente",
      "Uso de cocina comunitaria equipada",
      "WiFi",
      "Espacios comunes",
    ],
    ideal:
      "Viajeros solos, mochileros, quienes quieren conocer gente y ser parte de la comunidad Huellas.",
  },
  {
    slug: "dorm2",
    title: "Habitación compartida 2",
    subtitle: "El lugar donde los viajeros se encuentran",
    desc: "El lugar donde los viajeros se encuentran.",
    descLong:
      "Habitación de 5 camas, gente de todo el mundo, historias compartidas. Compartir el cuarto no significa perder privacidad — significa ganar una experiencia. Los vínculos más fuertes que se forman en Huellas nacen acá.",
    capacity: "Hasta 5 personas por habitación",
    price: "$20.000",
    tag: "Por noche / persona",
    img: "/assets/habitaciones/dorm-2.jpg",
    images: [
      "/assets/habitaciones/dorm-2.jpg",
      "/assets/habitaciones/dorm-1.jpg",
      "/assets/habitaciones/dorm-3.jpg",
      "/assets/habitaciones/dorm-bano-1.jpg",
    ],
    includes: [
      "Cama con ropa de cama",
      "Baños compartidos con agua caliente",
      "Uso de cocina comunitaria equipada",
      "WiFi",
      "Espacios comunes",
    ],
    ideal:
      "Viajeros solos, mochileros, quienes quieren conocer gente y ser parte de la comunidad Huellas.",
  },
  {
    slug: "privada-picos",
    title: "Habitación 3 Picos",
    subtitle: "Privacidad con los tres picos en el horizonte",
    desc: "Habitación privada con vista a los tres picos. Tu espacio, tu ritmo.",
    descLong:
      "Nombrada en honor a las tres cumbres que se ven desde la ventana. La habitación más luminosa del hostel — para quienes quieren privacidad sin perder el espíritu de comunidad. Seguís tomando mate en el patio, pero la habitación es tuya.",
    capacity: "1, 2 o 3 personas",
    price: "$25.000",
    tag: "Por noche / persona",
    img: "/assets/habitaciones/privada-picos-1.jpg",
    images: [
      "/assets/habitaciones/privada-picos-1.jpg",
      "/assets/habitaciones/privada-picos-2.jpg",
      "/assets/habitaciones/privada-picos-3.jpg",
      "/assets/habitaciones/privada-picos-4.jpg",
      "/assets/habitaciones/privada-picos-5.jpg",
    ],
    includes: [
      "Cama matrimonial + cama de 1 plaza",
      "Ropa de cama incluida",
      "Baño privado con agua caliente",
      "Uso de cocina comunitaria equipada",
      "WiFi",
      "Acceso a espacios comunes",
    ],
    ideal:
      "Parejas, viajeros solos que buscan más privacidad sin aislarse del ambiente del hostel.",
  },
  {
    slug: "privada-cuevas",
    title: "Habitación Cuevas",
    subtitle: "Un rincón íntimo en el corazón del hostel",
    desc: "Habitación privada con carácter propio. Rústica, cálida y tranquila.",
    descLong:
      "La habitación más íntima de Huellas. Con una atmósfera cálida y rústica que invita a quedarse. Para quienes disfrutan de un espacio con personalidad — donde la decoración cuenta historias y la piedra hace el resto.",
    capacity: "1 o 2 personas",
    price: "$25.000",
    tag: "Por noche / persona",
    img: "/assets/habitaciones/privada-cuevas-1.jpg",
    images: [
      "/assets/habitaciones/privada-cuevas-1.jpg",
      "/assets/habitaciones/privada-cuevas-2.jpg",
      "/assets/habitaciones/privada-cuevas-3.jpg",
      "/assets/habitaciones/privada-cuevas-4.jpg",
      "/assets/habitaciones/privada-cuevas-5.jpg",
      "/assets/habitaciones/privada-cuevas-6.jpg",
    ],
    includes: [
      "Cama matrimonial",
      "Ropa de cama incluida",
      "Baño privado con agua caliente",
      "Uso de cocina comunitaria equipada",
      "WiFi",
      "Acceso a espacios comunes",
    ],
    ideal:
      "Parejas o viajeros solos que buscan un ambiente íntimo y con carácter dentro del hostel.",
  },
  {
    slug: "privada-huemul",
    title: "Habitación Huemul",
    subtitle: "El refugio del ciervo patagónico",
    desc: "Habitación privada espaciosa. Tranquila, luminosa y con ambiente de refugio.",
    descLong:
      "Nombrada en honor al huemul, el ciervo emblemático de la Patagonia. Amplia y luminosa, ideal para quien quiere descansar de verdad. La calma de un refugio de montaña con toda la calidez del hostel a metros.",
    capacity: "1, 2 o 3 personas",
    price: "$25.000",
    tag: "Por noche / persona",
    img: "/assets/habitaciones/privada-huemul-1.jpg",
    images: [
      "/assets/habitaciones/privada-huemul-1.jpg",
      "/assets/habitaciones/privada-huemul-2.jpg",
      "/assets/habitaciones/privada-huemul-3.jpg",
      "/assets/habitaciones/privada-huemul-4.jpg",
    ],
    includes: [
      "Cama matrimonial + cama de 1 plaza",
      "Ropa de cama incluida",
      "Baño privado con agua caliente",
      "Uso de cocina comunitaria equipada",
      "WiFi",
      "Acceso a espacios comunes",
    ],
    ideal:
      "Parejas, viajeros solos o pequeños grupos que priorizan descanso y espacio.",
  },
  {
    slug: "departamento",
    title: "Departamento Currumahuida",
    subtitle: "Tu casa en Lago Puelo",
    desc: "Con cocina y baño propios. Tu casa en Lago Puelo. Para 3 o 4 personas.",
    descLong:
      "Con cocina propia, baño y living. La opción más independiente de Huellas, ideal para estadías largas, parejas o grupos que quieren tener su propio espacio sin alejarse del hostel. Cocinás a tu hora, llegás cuando querés. Tu casa en Lago Puelo.",
    capacity: "3 o 4 personas",
    price: "Consultar",
    tag: "Por noche",
    img: "/assets/habitaciones/depto-1.jpg",
    images: [
      "/assets/habitaciones/depto-1.jpg",
      "/assets/habitaciones/depto-2.jpg",
      "/assets/habitaciones/depto-3.jpg",
      "/assets/habitaciones/depto-4.jpg",
    ],
    includes: [
      "Departamento completo con living",
      "Cocina totalmente equipada",
      "Baño privado con agua caliente",
      "Ropa de cama incluida",
      "WiFi",
      "Acceso opcional a espacios comunes del hostel",
    ],
    ideal:
      "Grupos, familias, estadías largas, quienes buscan independencia total sin perder el contexto de Huellas.",
  },
];
