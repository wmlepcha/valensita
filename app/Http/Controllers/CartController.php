<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    /**
     * Get the current cart
     */
    public function index()
    {
        $cart = Session::get('cart', []);
        $cartItems = [];
        $total = 0;

        foreach ($cart as $key => $item) {
            $product = Product::with('images')->find($item['product_id']);
            
            if (!$product) {
                // Remove invalid product from cart
                unset($cart[$key]);
                Session::put('cart', $cart);
                continue;
            }

            $image = $product->images->first()?->image_url ?? '/storage/images/placeholder.jpg';
            $itemTotal = $product->price * $item['quantity'];
            $total += $itemTotal;

            $cartItems[] = [
                'key' => $key,
                'product_id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'price' => (float) $product->price,
                'image' => $image,
                'quantity' => $item['quantity'],
                'size' => $item['size'] ?? null,
                'color' => $item['color'] ?? null,
                'subtotal' => $itemTotal,
            ];
        }

        return response()->json([
            'items' => $cartItems,
            'count' => count($cartItems),
            'total' => $total,
        ]);
    }

    /**
     * Add item to cart
     */
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'size' => 'nullable|string',
            'color' => 'nullable|string',
        ]);

        $product = Product::findOrFail($request->product_id);

        // Check if product is in stock
        if (!$product->in_stock || $product->quantity <= 0) {
            return response()->json([
                'success' => false,
                'message' => 'Product is out of stock',
            ], 400);
        }

        $cart = Session::get('cart', []);
        
        // Create a unique key for this cart item (product + size + color combination)
        $itemKey = $this->generateCartItemKey(
            $request->product_id,
            $request->size,
            $request->color
        );

        // Check if this exact item already exists in cart
        if (isset($cart[$itemKey])) {
            // Update quantity
            $newQuantity = $cart[$itemKey]['quantity'] + $request->quantity;
            
            // Check stock availability
            if ($newQuantity > $product->quantity) {
                return response()->json([
                    'success' => false,
                    'message' => 'Not enough stock available. Only ' . $product->quantity . ' items available.',
                ], 400);
            }

            $cart[$itemKey]['quantity'] = $newQuantity;
        } else {
            // Add new item
            $cart[$itemKey] = [
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'size' => $request->size,
                'color' => $request->color,
            ];
        }

        Session::put('cart', $cart);

        // Return updated cart
        return $this->index();
    }

    /**
     * Update cart item quantity
     */
    public function update(Request $request, $key)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = Session::get('cart', []);

        if (!isset($cart[$key])) {
            return response()->json([
                'success' => false,
                'message' => 'Cart item not found',
            ], 404);
        }

        $item = $cart[$key];
        $product = Product::findOrFail($item['product_id']);

        // Check stock availability
        if ($request->quantity > $product->quantity) {
            return response()->json([
                'success' => false,
                'message' => 'Not enough stock available. Only ' . $product->quantity . ' items available.',
            ], 400);
        }

        $cart[$key]['quantity'] = $request->quantity;
        Session::put('cart', $cart);

        return $this->index();
    }

    /**
     * Remove item from cart
     */
    public function remove($key)
    {
        $cart = Session::get('cart', []);

        if (!isset($cart[$key])) {
            return response()->json([
                'success' => false,
                'message' => 'Cart item not found',
            ], 404);
        }

        unset($cart[$key]);
        Session::put('cart', $cart);

        return $this->index();
    }

    /**
     * Clear entire cart
     */
    public function clear()
    {
        Session::forget('cart');

        return response()->json([
            'success' => true,
            'message' => 'Cart cleared',
            'items' => [],
            'count' => 0,
            'total' => 0,
        ]);
    }

    /**
     * Get cart count (for header badge)
     */
    public function count()
    {
        $cart = Session::get('cart', []);
        $totalItems = 0;

        foreach ($cart as $item) {
            $totalItems += $item['quantity'];
        }

        return response()->json([
            'count' => $totalItems,
        ]);
    }

    /**
     * Generate a unique key for cart item
     */
    private function generateCartItemKey($productId, $size = null, $color = null)
    {
        return md5($productId . '-' . ($size ?? '') . '-' . ($color ?? ''));
    }
}

