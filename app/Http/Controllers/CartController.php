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

        $product = Product::with('variants')->findOrFail($request->product_id);

        // Check stock based on size if provided
        if ($request->size) {
            $sizeVariant = $product->variants()
                ->where('type', 'size')
                ->where('name', $request->size)
                ->where('is_active', true)
                ->first();

            if (!$sizeVariant) {
                return response()->json([
                    'success' => false,
                    'message' => 'Selected size is not available',
                ], 400);
            }

            $availableStock = $sizeVariant->quantity ?? 0;
            
            if ($availableStock <= 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Size ' . $request->size . ' is out of stock',
                ], 400);
            }

            // Check if this exact item already exists in cart
            $cart = Session::get('cart', []);
            $itemKey = $this->generateCartItemKey(
                $request->product_id,
                $request->size,
                $request->color
            );

            $currentCartQuantity = isset($cart[$itemKey]) ? $cart[$itemKey]['quantity'] : 0;
            $newQuantity = $currentCartQuantity + $request->quantity;

            if ($newQuantity > $availableStock) {
                return response()->json([
                    'success' => false,
                    'message' => 'Not enough stock available. Only ' . $availableStock . ' items available in size ' . $request->size . '.',
                ], 400);
            }
        } else {
            // No size selected - check general product stock
            if (!$product->in_stock) {
                return response()->json([
                    'success' => false,
                    'message' => 'Product is out of stock',
                ], 400);
            }

            // If product has sizes, require size selection
            $hasSizes = $product->sizes()->count() > 0;
            if ($hasSizes) {
                return response()->json([
                    'success' => false,
                    'message' => 'Please select a size',
                ], 400);
            }

            // For products without sizes, check general quantity
            $cart = Session::get('cart', []);
            $itemKey = $this->generateCartItemKey(
                $request->product_id,
                null,
                $request->color
            );

            $currentCartQuantity = isset($cart[$itemKey]) ? $cart[$itemKey]['quantity'] : 0;
            $newQuantity = $currentCartQuantity + $request->quantity;

            if ($product->quantity > 0 && $newQuantity > $product->quantity) {
                return response()->json([
                    'success' => false,
                    'message' => 'Not enough stock available. Only ' . $product->quantity . ' items available.',
                ], 400);
            }
        }

        $cart = Session::get('cart', []);
        $itemKey = $this->generateCartItemKey(
            $request->product_id,
            $request->size,
            $request->color
        );

        // Add or update cart item
        if (isset($cart[$itemKey])) {
            $cart[$itemKey]['quantity'] += $request->quantity;
        } else {
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
        $product = Product::with('variants')->findOrFail($item['product_id']);

        // Check stock based on size if provided
        if (!empty($item['size'])) {
            $sizeVariant = $product->variants()
                ->where('type', 'size')
                ->where('name', $item['size'])
                ->where('is_active', true)
                ->first();

            if (!$sizeVariant || ($sizeVariant->quantity ?? 0) <= 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Size ' . $item['size'] . ' is out of stock',
                ], 400);
            }

            $availableStock = $sizeVariant->quantity ?? 0;
            if ($request->quantity > $availableStock) {
                return response()->json([
                    'success' => false,
                    'message' => 'Not enough stock available. Only ' . $availableStock . ' items available in size ' . $item['size'] . '.',
                ], 400);
            }
        } else {
            // No size - check general product stock
            if ($product->quantity > 0 && $request->quantity > $product->quantity) {
                return response()->json([
                    'success' => false,
                    'message' => 'Not enough stock available. Only ' . $product->quantity . ' items available.',
                ], 400);
            }
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

