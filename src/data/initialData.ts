import { ResidencePlace, RouteSettings } from '../types';

export const INITIAL_SETTINGS: RouteSettings = {
  title: "Hoja de Ruta: Parque Leloir / Villa Udaondo",
  subtitle: "Circuito de visitas a residencias para realizar en un solo viaje",
  footerText: "Circuito Villa Udaondo / Parque Leloir, Partido de Ituzaingó, Provincia de Buenos Aires.",
  estimatedDistance: "~2,5 km",
  estimatedTime: "8 min",
  badgeText: "3 Residencias en Rojo",
};

/**
 * Catálogo completo extraído directamente de la planilla del usuario
 */
export interface SheetEntry {
  nombre: string;
  link: string;
  precio: string;
  ubicacion: string;
  tel: string;
  lat: number;
  lng: number;
}

export const PLANILLA_DATA: SheetEntry[] = [
  {
    nombre: "VIRGEN DE LA GUARDA",
    link: "https://residenciavg.com.ar/",
    precio: "Triple $3.800.000 Doble $4.500.000 Individual $8.200.000",
    ubicacion: "Virgen de la Guardia 235 - Ituz",
    tel: "1131794159",
    lat: -34.6542,
    lng: -58.6721,
  },
  {
    nombre: "NAMASTE",
    link: "https://www.geriatricoramosmejia.com.ar/index.php#cont",
    precio: "$3.500.000",
    ubicacion: "gelly y obes 270 Villa Sarmiento",
    tel: "1132471745",
    lat: -34.6436,
    lng: -58.5724,
  },
  {
    nombre: "AYRES DE LELOIR 1",
    link: "https://www.instagram.com/residenciaayresdeleloir",
    precio: "$2.800.000",
    ubicacion: "Del Cielito 517, VU",
    tel: "1159694795",
    lat: -34.6141,
    lng: -58.7005,
  },
  {
    nombre: "AYRES DE LELOIR 2",
    link: "https://www.instagram.com/residenciaayresdeleloir2",
    precio: "$3.500.000",
    ubicacion: "De La Vidalita, VU",
    tel: "1159694795",
    lat: -34.6189,
    lng: -58.6912,
  },
  {
    nombre: "PARQUE HOGAR",
    link: "https://parquehogar.com.ar/hogar-geriatrico/",
    precio: "A consultar",
    ubicacion: "Chanas 951, PALOMAR",
    tel: "1146598464 / 1144433149",
    lat: -34.5982,
    lng: -58.5911,
  },
  {
    nombre: "MIRADORES DEL SOL",
    link: "https://geriatricos.portalgeriatrico.com.ar/residencia/haedo/residencia-geriatrica-miradores-del-sol/",
    precio: "A consultar",
    ubicacion: "Del Himno 174, Haedo",
    tel: "1144437495",
    lat: -34.6468,
    lng: -58.5879,
  },
  {
    nombre: "EL ATARDECER DE LELOIR",
    link: "https://geriatricos.portalgeriatrico.com.ar/residencia/parque-leloir/hogar-el-atardecer-de-leloir/",
    precio: "A consultar en visita",
    ubicacion: "De los Payadores 936, VU",
    tel: "1140907187",
    lat: -34.6062,
    lng: -58.6943,
  },
  {
    nombre: "SOL DE OTOÑO",
    link: "https://geriatricos.portalgeriatrico.com.ar/residencia/parque-leloir/sol-de-otono-iv/",
    precio: "Triple: $3.883.000 | Doble: $4.500.000 | Indiv: $5.152.000",
    ubicacion: "De los Reseros 780, VU",
    tel: "1136710841",
    lat: -34.6214,
    lng: -58.6975,
  },
  {
    nombre: "LOS ROBLES",
    link: "https://hogardelosrobles.com.ar/",
    precio: "A consultar",
    ubicacion: "Filipinas 945. VU",
    tel: "1160714940 o 1137228550",
    lat: -34.6087,
    lng: -58.6834,
  },
  {
    nombre: "ALAMEDA",
    link: "https://residenciaalameda.com.ar/",
    precio: "A consultar",
    ubicacion: "Portugal 1702 - ITUZ",
    tel: "1168662817",
    lat: -34.6391,
    lng: -58.6738,
  },
  {
    nombre: "ALTOS DEL OESTE",
    link: "https://geriatricos.portalgeriatrico.com.ar/residencia/san-justo/altos-del-oeste/",
    precio: "$2.800.000 cuad",
    ubicacion: "Av. Mariano santamaría 2736- San Justo",
    tel: "11 5706-7056",
    lat: -34.6781,
    lng: -58.5521,
  }
];

export const INITIAL_PLACES: ResidencePlace[] = [
  {
    id: 1,
    name: "AYRES DE LELOIR 1",
    badge: "En rojo",
    address: "Del Cielito 517, Villa Udaondo",
    phone: "1159694795",
    website: "https://www.instagram.com/residenciaayresdeleloir",
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
    website: "https://geriatricos.portalgeriatrico.com.ar/residencia/parque-leloir/hogar-el-atardecer-de-leloir/",
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
    website: "https://geriatricos.portalgeriatrico.com.ar/residencia/parque-leloir/sol-de-otono-iv/",
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
