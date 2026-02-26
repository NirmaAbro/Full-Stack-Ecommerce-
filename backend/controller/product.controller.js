import product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const newProduct = await product.create({
      name,
      description,
      price,
      stock,
      category,
    });

    res.status(200).json({
      success: true,
      message: "Product created successfully !",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error ",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const newProduct = await product.find();
    res.status(200).json({
      success: true,
      count: newProduct.length,
      newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error !",
    });
  }
};
