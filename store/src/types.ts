export interface Item {
  id: number,
  name: string,
  description: string,
  price: number,
  tags: string[],
  image: string
}

export interface CartItem {
  item: Item,
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

export interface Discount {
  itemId: number,
  percentage: number
}
