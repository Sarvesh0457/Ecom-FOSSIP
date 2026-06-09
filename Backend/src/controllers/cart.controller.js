import { Cart } from "../models/Cart.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";

// 1. GET: Fetch the user's cart
const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  return res.status(200).json(new ApiResponse(200, cart, "Cart fetched successfully"));
});

// 2. POST: Add an item to the cart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) throw new ApiError(400, "Product ID is required");

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    // Create new cart if it doesn't exist
    cart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId, quantity }]
    });
  } else {
    // Check if product is already in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // If it exists, just increase the quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // If it's a new item, push it to the array
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
  }

  return res.status(200).json(new ApiResponse(200, {}, "Item added to cart"));
});

// 3. PUT: Update specific item quantity (+ or - buttons)
const updateCartQuantity = asyncHandler(async (req, res) => {
  const { productId, action } = req.body; // action will be "increase" or "decrease"

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) throw new ApiError(404, "Cart not found");

  const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

  if (itemIndex > -1) {
    if (action === "increase") {
      cart.items[itemIndex].quantity += 1;
    } else if (action === "decrease") {
      cart.items[itemIndex].quantity -= 1;
      // If quantity hits 0, remove the item entirely
      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }
    }
    await cart.save();
  }

  // Return the updated cart so the frontend can re-render the prices
  const updatedCart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  return res.status(200).json(new ApiResponse(200, updatedCart, "Cart updated"));
});

// 4. DELETE: Remove an item completely (Trash can button)
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { items: { product: productId } } },
    { new: true }
  ).populate("items.product");

  return res.status(200).json(new ApiResponse(200, cart, "Item removed from cart"));
});

export { getCart, addToCart, updateCartQuantity, removeFromCart };