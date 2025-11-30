import { Fragment, useEffect } from 'react';
import { Transition } from '@headlessui/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <Transition
        show={isOpen}
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      </Transition>

      {/* Drawer */}
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transform transition ease-out duration-300"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in duration-200"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h2 className="font-display font-bold text-xl md:text-2xl text-neutral-900 tracking-tight">
              Shopping Cart
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-full transition-colors duration-200"
              aria-label="Close cart"
            >
              <svg
                className="w-5 h-5 text-neutral-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Empty Cart State */}
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg
                className="w-24 h-24 text-neutral-300 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-neutral-600 text-lg font-medium mb-2">
                Your cart is empty
              </p>
              <p className="text-neutral-400 text-sm">
                Start adding items to your cart
              </p>
            </div>

            {/* Cart Items - Will be populated later */}
            {/* <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-neutral-600">${item.price}</p>
                  </div>
                </div>
              ))}
            </div> */}
          </div>

          {/* Footer */}
          <div className="border-t border-neutral-200 p-6 space-y-4 bg-neutral-50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-600 uppercase tracking-wider">Total:</span>
              <span className="font-display font-bold text-xl text-neutral-900">₹0.00</span>
            </div>
            <button
              className="w-full bg-neutral-900 text-white py-3.5 rounded-lg font-display font-semibold hover:bg-neutral-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-900"
              disabled
            >
              Checkout
            </button>
            <button
              onClick={onClose}
              className="w-full border-2 border-neutral-900 text-neutral-900 py-3.5 rounded-lg font-display font-semibold hover:bg-neutral-900 hover:text-white transition-all duration-200"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </Transition>
    </>
  );
}

