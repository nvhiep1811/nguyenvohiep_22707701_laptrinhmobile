export interface Product {
  product_id: string;
  name: string;
  price: number;
  stock: number;
}

export interface CartItem {
  id: number;
  product_id: string;
  qty: number;
}

export interface Order {
  order_id: number;
  order_date: string;
  total_amount: number;
}

export interface OrderItem {
  order_id: number;
  product_id: string
  qty: number;
  price: number;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}