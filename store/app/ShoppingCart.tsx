import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { computeItemPromotion } from '@/src/utils';
import { useStore } from '@/src/store';
import { useCart } from '@/src/hooks';
import { storeId } from '@/data/storeData';

type ShoppingCartProps = {
  cartDisplayed: boolean;
  setCartDisplayed: (value: boolean) => void;
};

export default function ShoppingCart({ cartDisplayed, setCartDisplayed }) {
  const cart = useCart();
  const promotions = useStore((state) => state.promotions);

  const removeFromCart = (event, id) => {
    event.stopPropagation();
  };

  const itemPrice = (item) => {
    const { finalUnitPrice, unitDiscount } = computeItemPromotion(promotions, item);

    return (
      <Fragment>
        <p className={`ml-4 text-lg font-medium${unitDiscount > 0 && ' line-through'}`}>${item.price}</p>
        {unitDiscount > 0 && (
          <p className="ml-1 text-lg font-medium text-red-500">
            ${finalUnitPrice}
          </p>
        )}
      </Fragment>
    )
  }

  const checkoutClick = () => {
    setCartDisplayed(false);
  }

  return (
    <Transition.Root show={cartDisplayed} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setCartDisplayed(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setCartDisplayed(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200"> 
                            {cart.items.map((cartItem) => (
                              <li key={cartItem.item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={cartItem.item.image}
                                    alt={cartItem.item.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={cartItem.item.name}>{cartItem.item.name}</a>
                                      </h3>
                                      {itemPrice(cartItem.item)}
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{cartItem.item.description.substr(0, 80)}...</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm mt-4">
                                    <p className="text-gray-500">Quantity: {cartItem.quantity}</p>
                                    <div className="flex">
                                      <button
                                        type="button"
                                        className={`font-medium ${storeId === 'store1' ? 'text-blue-600 hover:text-blue-700' : 'text-amber-500 hover:text-amber-600'}`}
                                        onClick={(event) => { removeFromCart(event, cartItem.item.id) }}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${cart.total}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <Link
                          href="/checkout"
                          className={`flex items-center btn shadow-sm px-6 py-3 text-base font-medium text-white ${storeId === 'store1' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-500 hover:bg-amber-600'}`}
                          onClick={checkoutClick}
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or&nbsp;
                          <button
                            type="button"
                            className={`font-medium ${storeId === 'store1' ? 'text-blue-600 hover:text-blue-700' : 'text-amber-500 hover:text-amber-600'}`}
                            onClick={() => setCartDisplayed(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
