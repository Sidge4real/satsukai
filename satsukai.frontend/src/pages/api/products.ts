import { ShopItem } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

type Shop = {
  products?: ShopItem[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Shop>
) {
  try {
    const response = await fetch('http://localhost:1337/api/shops?populate=image&showroom=true');
    if (response.ok) {
      const data = await response.json();
      res.status(200).json({ products: data.data });
    } else {
      console.error('Failed to fetch data');
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}
