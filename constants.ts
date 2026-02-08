
import { Product } from './types';

export const PRODUCTS: Product[] = [
  // WATCHES
  {
    id: 'w1',
    name: 'Classic Golden Chronograph',
    price: 1250,
    category: 'Watches',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop',
    description: 'A timeless masterpiece featuring 24k gold plating.',
    rating: 4.8
  },
  {
    id: 'w2',
    name: 'Rose Gold Petit',
    price: 890,
    category: 'Watches',
    gender: 'Women',
    image: 'https://images.unsplash.com/photo-1508685096489-7aac29621294?q=80&w=800&auto=format&fit=crop',
    description: 'Elegant rose gold finish with a delicate leather strap.',
    rating: 4.9
  },
  // SHOES
  {
    id: 's1',
    name: 'Pro Runner Elite',
    price: 195,
    category: 'Shoes',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    description: 'Engineered for maximum performance.',
    rating: 4.9
  },
  {
    id: 's2',
    name: 'Stiletto Gold Edition',
    price: 450,
    category: 'Shoes',
    gender: 'Women',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
    description: 'High-fashion heels for special evenings.',
    rating: 4.7
  },
  // TECH (PHONES & TABLETS)
  {
    id: 'p1',
    name: 'SR Phone 15 Pro Max',
    price: 1199,
    category: 'Phones',
    gender: 'Unisex',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
    description: 'The ultimate smartphone experience in Titanium Gold.',
    rating: 4.9
  },
  {
    id: 't1',
    name: 'Vision Tablet Air',
    price: 799,
    category: 'Tablets',
    gender: 'Unisex',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop',
    description: 'Ultra-thin, ultra-powerful tablet for creatives.',
    rating: 4.6
  },
  // JEWELRY (RINGS)
  {
    id: 'r1',
    name: 'Infinity Diamond Band',
    price: 2400,
    category: 'Rings',
    gender: 'Women',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3f8ad?q=80&w=800&auto=format&fit=crop',
    description: 'Handcrafted white gold with VVS diamonds.',
    rating: 5.0
  },
  {
    id: 'r2',
    name: 'Signet Gold Ring',
    price: 650,
    category: 'Rings',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?q=80&w=800&auto=format&fit=crop',
    description: 'Traditional signet ring in solid 18k yellow gold.',
    rating: 4.7
  },
  // CLOTHES & HOODIES
  {
    id: 'h1',
    name: 'Signature Gold Hoodie',
    price: 125,
    category: 'Hoodies',
    gender: 'Men',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
    description: 'Heavyweight organic cotton with SR embroidery.',
    rating: 4.8
  },
  {
    id: 'c1',
    name: 'Summer Silk Dress',
    price: 320,
    category: 'Clothes',
    gender: 'Women',
    image: 'https://images.unsplash.com/photo-1539008835158-30bb0efdec04?q=80&w=800&auto=format&fit=crop',
    description: 'Flowing silk dress in champagne gold.',
    rating: 4.9
  }
];
