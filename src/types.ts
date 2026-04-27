export type Category = 'Zinger Burgers' | 'Chicken & Beef Burgers' | 'BBQ' | 'Karahi & Chinese' | 'Rolls & Gyros' | 'Pizza & Pasta' | 'Value Deals' | 'Sides';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  image: string;
  link?: string;
  selectedSize?: string;
  variations?: {
    size: 'Small' | 'Medium' | 'Large';
    price: number;
  }[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedSize?: string;
}

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  deliveryCharge: number;
  total: number;
}
