import Product from "../models/Product.js";
import Cart from "../models/cart.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // 1️⃣ Validate input
    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required",
      });
    }

    const qty = Number(quantity);

    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a number greater than 0",
      });
    }

    // 2️⃣ Find product
    const foundProduct = await Product.findById(productId);

    if (!foundProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 3️⃣ Check stock
    if (qty > foundProduct.stock) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available",
      });
    }

    // 4️⃣ Find user's cart
    let cart = await Cart.findOne({ user: req.user.id });

    // 5️⃣ If cart does not exist, create new
    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [],
        totalPrice: 0,
      });
    }

    // 6️⃣ Check if item already exists
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      // Check stock before increasing
      if (existingItem.quantity + qty > foundProduct.stock) {
        return res.status(400).json({
          success: false,
          message: "Exceeds available stock",
        });
      }

      existingItem.quantity += qty;
    } else {
      // Add new item
      cart.items.push({
        product: foundProduct._id,
        quantity: qty,
        price: foundProduct.price, // snapshot price
      });
    }

    // 7️⃣ Recalculate total price
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // 8️⃣ Save cart
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item added to cart",
      items: cart.items,
      totalPrice: cart.totalPrice,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product",
      "name price image stock"
    );

    if (!cart) {
      return res.status(200).json({
        success: true,
        items: [],
        totalPrice: 0,
      });
    }

    // Remove items where product was deleted
    const validItems = cart.items.filter((item) => item.product !== null);

    return res.status(200).json({
      success: true,
      items: validItems,
      totalPrice: cart.totalPrice,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
