export type Category = 'Zinger Burgers' | 'Chicken & Beef Burgers' | 'BBQ' | 'Karahi & Chinese' | 'Rolls & Wraps' | 'Pizza & Pasta' | 'Value Deals' | 'Sides';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  image: string;
  link?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  deliveryCharge: number;
  total: number;
}
