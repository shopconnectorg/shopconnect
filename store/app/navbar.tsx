'use client';
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCart } from '../src/hooks';
import Link from 'next/link';
import ShoppingCart from './ShoppingCart';
import { useStore } from '@/src/store';
import { config, storeId } from '@/data/storeData';

export default function Navbar() {
  const cartDisplayed = useStore((state) => state.cartDisplayed);
  const setCartDisplayed = useStore((state) => state.setCartDisplayed);
  const cart = useCart();

  const navbarStyle = () => {
    if (storeId === 'store2') return { borderBottomColor: '#202033' };

    return {};
  };

  const cartStyle = () => {
    if (storeId === 'store2') return { color: '#202033' };

    return {};
  };

  return (
    <div className="mb-12">
      <header className="relative">
        <p className={`flex h-10 items-center justify-center px-4 text-sm font-medium text-white sm:px-6 lg:px-8 ${ storeId === 'store1' ? 'bg-blue-600' : 'bg-amber-600'}`}>
          Get special discounts with&nbsp;<span style={{ color: '#202033', fontWeight: 600 }}>ShopConnect</span>&nbsp;⚡
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200" style={navbarStyle()}>
            <div className="flex h-24 items-center">
              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <div className="flex">
                    <img
                      className="h-14 w-auto"
                      src={config.logo}
                      alt=""
                    />
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="#" className="group -m-2 flex items-center p-2" onClick={() => { setCartDisplayed(true) }}>
                    <ShoppingBagIcon
                      className="h-8 w-8 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                      style={cartStyle()}
                    />
                    <span className="ml-2 text-md font-medium text-gray-700 group-hover:text-gray-800" style={cartStyle()}>{cart.totalQuantity}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <ShoppingCart cartDisplayed={cartDisplayed} setCartDisplayed={setCartDisplayed} />
    </div>
  )
}
