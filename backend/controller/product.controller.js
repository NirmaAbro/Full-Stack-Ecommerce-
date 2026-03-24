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

    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: newProduct
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
    let limit = Number(req.query.limit) || 5;

    const search = req.query.search || "";
    const category = req.query.category;
    const minPrice = Number(req.query.minPrice);
    const maxPrice = Number(req.query.maxPrice);

    if (page < 1) page = 1;
    if (limit > 50) limit = 50;

    let filter = {};

    // 🔍 Search
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // 📂 Category
    if (category) {
      filter.category = category;
    }

    // 💰 Price Range
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = minPrice;
      }

      if (maxPrice) {
        filter.price.$lte = maxPrice;
      }
    }

    const skip = (page - 1) * limit;

    const totalProducts = await product.countDocuments(filter);

    const products = await product
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      success: true,
      page,
      totalPages,
      totalProducts,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const findProduct = await product.findById(id);

    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    findProduct.name = req.body.name ?? findProduct.name;
    findProduct.description = req.body.description ?? findProduct.description;
    findProduct.price = req.body.price ?? findProduct.price;
    findProduct.category = req.body.category ?? findProduct.category;
    findProduct.stock = req.body.stock ?? findProduct.stock;

    const updatedProduct = await findProduct.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const findProduct = await product.findById(id);

    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await findProduct.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
