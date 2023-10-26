export interface Item {
  id: number,
  name: string,
  category: string,
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

export interface Promotion {
  id: number;
  title: string;
  requirements: ">$800 spent on \"premium brand\" coffee machines.";
  discount: number;
  discountType: string;
  expiration: number;
  appliesTo?: {
    category: string
  };
  image: string;
  query: object;
}

export interface ComputedItemPromotion {
  finalUnitPrice: number,
  promotion: Promotion | undefined,
  unitDiscount: number
}
