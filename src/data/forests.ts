export interface ForestData {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  zoom: number;
  lastUpdate: string;
  riskScore: {
    fire: number;
    logging: number;
    encroachment: number;
  };
  healthIndex: number;
}

export const KENYAN_FORESTS: ForestData[] = [
  {
    id: "karura",
    name: "Karura Forest – Nairobi",
    coordinates: { lat: -1.2520, lng: 36.8531 },
    zoom: 13,
    lastUpdate: "2025-01-18",
    riskScore: { fire: 12, logging: 8, encroachment: 15 },
    healthIndex: 87,
  },
  {
    id: "ngong",
    name: "Ngong Road Forest",
    coordinates: { lat: -1.3528, lng: 36.6520 },
    zoom: 13,
    lastUpdate: "2025-01-17",
    riskScore: { fire: 18, logging: 22, encroachment: 25 },
    healthIndex: 72,
  },
  {
    id: "kakamega",
    name: "Kakamega Forest",
    coordinates: { lat: 0.2833, lng: 34.8500 },
    zoom: 12,
    lastUpdate: "2025-01-18",
    riskScore: { fire: 8, logging: 15, encroachment: 12 },
    healthIndex: 91,
  },
  {
    id: "aberdare",
    name: "Aberdare Forest",
    coordinates: { lat: -0.3667, lng: 36.7000 },
    zoom: 11,
    lastUpdate: "2025-01-18",
    riskScore: { fire: 10, logging: 5, encroachment: 8 },
    healthIndex: 94,
  },
  {
    id: "mau",
    name: "Mau Forest",
    coordinates: { lat: -0.5000, lng: 35.5833 },
    zoom: 11,
    lastUpdate: "2025-01-17",
    riskScore: { fire: 15, logging: 35, encroachment: 42 },
    healthIndex: 65,
  },
  {
    id: "arabuko",
    name: "Arabuko Sokoke Forest",
    coordinates: { lat: -3.3333, lng: 39.9167 },
    zoom: 12,
    lastUpdate: "2025-01-18",
    riskScore: { fire: 20, logging: 18, encroachment: 15 },
    healthIndex: 78,
  },
  {
    id: "mt_kenya",
    name: "Mt. Kenya Forest",
    coordinates: { lat: -0.1521, lng: 37.3084 },
    zoom: 11,
    lastUpdate: "2025-01-18",
    riskScore: { fire: 5, logging: 3, encroachment: 4 },
    healthIndex: 96,
  },
  {
    id: "mt_elgon",
    name: "Mt. Elgon Forest",
    coordinates: { lat: 1.1167, lng: 34.5594 },
    zoom: 11,
    lastUpdate: "2025-01-17",
    riskScore: { fire: 7, logging: 12, encroachment: 10 },
    healthIndex: 89,
  },
  {
    id: "shimba",
    name: "Shimba Hills Forest",
    coordinates: { lat: -4.2333, lng: 39.4000 },
    zoom: 12,
    lastUpdate: "2025-01-18",
    riskScore: { fire: 14, logging: 16, encroachment: 20 },
    healthIndex: 81,
  },
  {
    id: "nairobi_np",
    name: "Nairobi National Park Woodland Zone",
    coordinates: { lat: -1.3733, lng: 36.8578 },
    zoom: 13,
    lastUpdate: "2025-01-18",
    riskScore: { fire: 9, logging: 6, encroachment: 11 },
    healthIndex: 85,
  },
];
