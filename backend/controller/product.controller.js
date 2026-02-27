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
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;

    if (page < 1) page = 1;
    if (limit > 50) limit = 50;

    const skip = (page - 1) * limit;
    const totalProduct = await product.countDocuments();

    const newProduct = await product
      .find()
      .sort({ createdAt: -1 })
      .skip()
      .limit();

    const totalPages = Math.ceil(totalProduct / limit);

    res.status(200).json({
      success: true,
      message: "All products",
      totalPages,
      totalProduct,
      count : newProduct.length,
      data: newProduct,
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error !",
    });
  }
};
