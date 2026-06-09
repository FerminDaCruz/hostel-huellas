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
    img: "/habitaciones/habitacion-compartida-1.jpg",
    images: ["/habitaciones/habitacion-compartida-1.jpg"],
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
    img: "/habitaciones/habitacion-compartida-2.jpg",
    images: ["/habitaciones/habitacion-compartida-2.jpg"],
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
    slug: "privada",
    title: "Habitación privada",
    subtitle: "Tu espacio, tu ritmo",
    desc: "Tu espacio, tu ritmo. Privacidad sin perder el espíritu de comunidad.",
    descLong:
      "Para quienes quieren privacidad sin perder el espíritu de Huellas. Seguís siendo parte de la comunidad, seguís tomando mate en el patio, pero la habitación es tuya. Una puerta que se cierra — y todo lo que eso significa cuando viajás.",
    capacity: "1, 2 o 3 personas",
    price: "$25.000",
    tag: "Por noche / persona",
    img: "/habitaciones/habitacion-privada.png",
    images: ["/habitaciones/habitacion-privada.png"],
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
    slug: "departamento",
    title: "Departamento",
    subtitle: "Tu casa en Lago Puelo",
    desc: "Con cocina y baño propio. Tu casa en Lago Puelo. Para 3 o 4 personas.",
    descLong:
      "Con cocina propia, baño y living. La opción más independiente de Huellas, ideal para estadías largas, parejas o grupos que quieren tener su propio espacio sin alejarse del hostel. Cocinás a tu hora, llegás cuando querés. Tu casa en Lago Puelo.",
    capacity: "3 o 4 personas",
    price: "Consultar",
    tag: "Por noche",
    img: "/explore-puelo.jpg",
    images: ["/explore-puelo.jpg", "/hero-lake.jpg", "/exp-trek.jpg"],
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
