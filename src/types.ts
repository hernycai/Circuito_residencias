export interface TieredPrice {
  id: string;
  label: string;
  amount: string;
}

export interface ResidencePlace {
  id: number;
  name: string;
  badge: string;
  address: string;
  phone: string;
  priceType: 'single' | 'tiered';
  price: string;
  pricesTiered?: TieredPrice[];
  lat: number;
  lng: number;
  notes: string;
  visited?: boolean;
}

export interface RouteSettings {
  title: string;
  subtitle: string;
  footerText: string;
  estimatedDistance: string;
  estimatedTime: string;
  badgeText: string;
}
