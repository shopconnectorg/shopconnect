import { Card } from "@/components";
import { items } from '../data/storeData';

export default function Home() {
  const itemsForDiscount = [{"id": 1, "discount": 0.1}]

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="card-title">Products</h1>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {items.map((item) => {
            const discountedItem = itemsForDiscount.find((discountItem) => discountItem.id === item.id);
            if (discountedItem) {
              return <Card key={item.id} item={item} discount={discountedItem.discount} />
            }
            return <Card key={item.id} item={item} discount={0}/>
          })}
        </div>
      </div>
    </div>
  );
}
