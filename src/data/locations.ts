export interface CityLocation {
  id: string;
  x: number;
  y: number;
  type: 'headquarters' | 'market';
  nameKey: 'riyadh' | 'jeddah' | 'dammam' | 'khobar';
  subKey: 'riyadhSub' | 'jeddahSub' | 'dammamSub' | 'khobarSub';
  countryKey: 'riyadhCountry' | 'jeddahCountry' | 'dammamCountry' | 'khobarCountry';
  labelOffset: { x: number; y: number };
}

export const locations: CityLocation[] = [
  {
    id: 'riyadh',
    x: 360,
    y: 250,
    type: 'headquarters',
    nameKey: 'riyadh',
    subKey: 'riyadhSub',
    countryKey: 'riyadhCountry',
    labelOffset: { x: 0, y: -48 }
  },
  {
    id: 'jeddah',
    x: 180,
    y: 330,
    type: 'market',
    nameKey: 'jeddah',
    subKey: 'jeddahSub',
    countryKey: 'jeddahCountry',
    labelOffset: { x: -40, y: 45 }
  },
  {
    id: 'dammam',
    x: 520,
    y: 220,
    type: 'market',
    nameKey: 'dammam',
    subKey: 'dammamSub',
    countryKey: 'dammamCountry',
    labelOffset: { x: 55, y: -45 }
  },
  {
    id: 'khobar',
    x: 540,
    y: 245,
    type: 'market',
    nameKey: 'khobar',
    subKey: 'khobarSub',
    countryKey: 'khobarCountry',
    labelOffset: { x: 55, y: 45 }
  }
];
