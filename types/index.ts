export interface FidgetProduct {
  id: string;
  name: string;
  category: 'cliquer' | 'manipuler' | 'resoudre' | 'caresser';
  description: string;
  price: string;
  wooCommerceUrl: string;
  imageUrl: string;
}

export type SensoryCategory = 'cliquer' | 'manipuler' | 'resoudre' | 'caresser';
