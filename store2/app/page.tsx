import Image from "next/image";
import { Navbar, Card } from "@/components";
import listing from "../data/mockListings.json"

export default function Home() {
  return (
    <div data-theme="coffee" className="flex justify-evenly bg-base-200 flex-wrap gap-4 p-6">
      {
        listing.map((listing, index) => (
          <Card id={listing.id} name={listing.name} shortDescription={listing.shortDescription} description={listing.description} price={listing.price} tags={listing.tags} image={listing.image} key={index}/>
        ))
      }
    </div>
  );
}
