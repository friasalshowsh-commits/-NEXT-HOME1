export interface NavItem {
  id: string;
  href: string;
  translationKey: 'about' | 'strategy' | 'services' | 'footprint' | 'insights' | 'contact';
}

export const navItems: NavItem[] = [
  { id: 'about', href: '#about', translationKey: 'about' },
  { id: 'services', href: '#services', translationKey: 'services' },
  { id: 'strategy', href: '#strategy', translationKey: 'strategy' },
  { id: 'footprint', href: '#footprint', translationKey: 'footprint' },
  { id: 'insights', href: '#insights', translationKey: 'insights' },
];
