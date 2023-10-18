interface Listing {
  id: number,
  name: string,
  description: string,
  price: number,
  tags: string[],
  image: string
}

export type { Listing }