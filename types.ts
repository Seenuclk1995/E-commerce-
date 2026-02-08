
export type Category = 'Clothes' | 'Watches' | 'Shoes' | 'Accessories' | 'Phones' | 'Tablets' | 'Rings' | 'Hoodies';
export type Gender = 'Men' | 'Women' | 'Unisex';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  gender: Gender;
  image: string;
  description: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  joinedDate?: string;
}

export type AppView = 'home' | 'cart' | 'checkout' | 'success' | 'auth' | 'profile';
