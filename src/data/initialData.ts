import { ResidencePlace, RouteSettings } from '../types';

export const INITIAL_SETTINGS: RouteSettings = {
  title: "Hoja de Ruta: Parque Leloir / Villa Udaondo",
  subtitle: "Circuito de visitas a residencias para realizar en un solo viaje",
  footerText: "Circuito Villa Udaondo / Parque Leloir, Partido de Ituzaingó, Provincia de Buenos Aires.",
  estimatedDistance: "~2,5 km",
  estimatedTime: "8 min",
  badgeText: "3 Residencias en Rojo",
};

export const INITIAL_PLACES: ResidencePlace[] = [
  {
    id: 1,
    name: "AYRES DE LELOIR 1",
    badge: "En rojo",
    address: "Del Cielito 517, Villa Udaondo",
    phone: "1159694795",
    priceType: "single",
    price: "$2.800.000",
    lat: -34.6141,
    lng: -58.7005,
    notes: "Contacto agendado. Consultar disponibilidad y servicios médicos incluidos.",
    visited: false,
  },
  {
    id: 2,
    name: "EL ATARDECER DE LELOIR",
    badge: "En rojo",
    address: "De los Payadores 936, Villa Udaondo",
    phone: "1140907187",
    priceType: "single",
    price: "A consultar en visita",
    lat: -34.6062,
    lng: -58.6943,
    notes: "Pedir cotización de habitaciones dobles y triples durante el recorrido.",
    visited: false,
  },
  {
    id: 3,
    name: "SOL DE OTOÑO",
    badge: "En rojo",
    address: "De los Reseros 780, Villa Udaondo",
    phone: "1136710841",
    priceType: "tiered",
    price: "Triple: $3.883.000 | Doble: $4.500.000 | Indiv: $5.152.000",
    pricesTiered: [
      { id: "p1", label: "Triple", amount: "$3.883.000" },
      { id: "p2", label: "Doble", amount: "$4.500.000" },
      { id: "p3", label: "Indiv.", amount: "$5.152.000" }
    ],
    lat: -34.6214,
    lng: -58.6975,
    notes: "Consultar diferencias de equipamiento entre habitaciones dobles y triples.",
    visited: false,
  }
];
