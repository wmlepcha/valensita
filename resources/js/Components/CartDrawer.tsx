import { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { Link, router } from '@inertiajs/react';

interface CartItem {
  key: string;
  product_id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  size: string | null;
  color: string | null;
  subtotal: number;
}

interface CartData {
  items: CartItem[];
  count: number;
  total: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [cart, setCart] = useState<CartData>({ items: [], count: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  // Fetch cart data when drawer opens
  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

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

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await window.axios.get(route('cart.index'));
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (key: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(key);
      return;
    }

    setUpdating(key);
    try {
      const response = await window.axios.put(route('cart.update', key), {
        quantity: newQuantity,
      });
      setCart(response.data);
      router.reload({ only: ['cart'] });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update quantity';
      alert(message);
    } finally {
      setUpdating(null);
    }
  };

  const handleRemoveItem = async (key: string) => {
    setUpdating(key);
    try {
      const response = await window.axios.delete(route('cart.remove', key));
      setCart(response.data);
      router.reload({ only: ['cart'] });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to remove item';
      alert(message);
    } finally {
      setUpdating(null);
    }
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

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
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-neutral-400 text-sm">Loading cart...</p>
              </div>
            ) : cart.items.length === 0 ? (
              /* Empty Cart State */
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
            ) : (
              /* Cart Items */
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.key} className="flex gap-4 pb-4 border-b border-neutral-100 last:border-b-0">
                    {/* Product Image */}
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={onClose}
                      className="flex-shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={onClose}
                        className="block"
                      >
                        <h3 className="font-display font-semibold text-sm md:text-base text-neutral-900 mb-1 hover:text-neutral-600 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      
                      {/* Size and Color */}
                      <div className="text-xs text-neutral-500 mb-2 space-y-0.5">
                        {item.size && <div>Size: {item.size}</div>}
                        {item.color && <div>Color: {item.color}</div>}
                      </div>

                      {/* Price and Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-neutral-200 rounded">
                            <button
                              onClick={() => handleUpdateQuantity(item.key, item.quantity - 1)}
                              disabled={updating === item.key}
                              className="w-8 h-8 flex items-center justify-center hover:bg-neutral-50 transition-colors text-neutral-500 hover:text-neutral-900 disabled:opacity-50"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.key, item.quantity + 1)}
                              disabled={updating === item.key}
                              className="w-8 h-8 flex items-center justify-center hover:bg-neutral-50 transition-colors text-neutral-500 hover:text-neutral-900 disabled:opacity-50"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right">
                          <p className="font-display font-bold text-sm md:text-base text-neutral-900">
                            {formatPrice(item.subtotal)}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {formatPrice(item.price)} each
                          </p>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.key)}
                        disabled={updating === item.key}
                        className="mt-2 text-xs text-neutral-500 hover:text-neutral-900 underline disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="border-t border-neutral-200 p-6 space-y-4 bg-neutral-50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-600 uppercase tracking-wider">Total:</span>
                <span className="font-display font-bold text-xl text-neutral-900">
                  {formatPrice(cart.total)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={onClose}
                className="block w-full bg-neutral-900 text-white py-3.5 rounded-lg font-display font-semibold hover:bg-neutral-800 transition-all duration-200 text-center"
              >
                Checkout
              </Link>
              <button
                onClick={onClose}
                className="w-full border-2 border-neutral-900 text-neutral-900 py-3.5 rounded-lg font-display font-semibold hover:bg-neutral-900 hover:text-white transition-all duration-200"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </Transition>
    </>
  );
}

