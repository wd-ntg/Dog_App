const Product = require("../models/Product");
const Order = require("../models/Order");
const productController = {
  getProducts: async (req, res) => {
    try {
      const { category, petType, breed, minPrice, maxPrice, rating, best_seller } = req.query;
      const CurrentPage = parseInt(req.query.page) || 1;
      const PageSize = parseInt(req.query.limit) || 10;
      const skip = (CurrentPage - 1) * PageSize;

      let query = {};

      if (category) query.category = category;
      if (petType) query.petType = petType;
      if (breed) query.breedSpecific = breed;
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = parseFloat(minPrice);
        if (maxPrice) query.price.$lte = parseFloat(maxPrice);
      }
      if (rating) query.rating = { $gte: parseFloat(rating) };
      if (best_seller) query.best_seller = best_seller === 'true';

      const products = await Product.find(query)
        .skip(skip)
        .limit(PageSize)
        .sort({ createdAt: -1 });

      const TotalCount = await Product.countDocuments(query);

      res.json({ success: true, data: { products, TotalCount, PageSize, CurrentPage } });
    } catch (error) {
      console.error("Error in getProducts:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },


  createOrder: async (req, res) => {
    try {
      const { items, totalAmount, shippingAddress } = req.body;
      const userId = req.user.id;

      const order = new Order({
        userId,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          priceAtTime: item.price,
        })),
        totalAmount,
        shippingAddress,
      });

      await order.save();

      // Update product stock counts
      await Promise.all(
        items.map((item) =>
          Product.findByIdAndUpdate(item.productId, {
            $inc: { stockCount: -item.quantity },
          })
        )
      );

      res.status(201).json({ success: true, order });
    } catch (error) {
      console.error("Error in createOrder:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  getBestSeller: async (req, res) => {
    try {
      const { category, petType, breed, minPrice, maxPrice, rating } =
        req.query;
      const CurrentPage = parseInt(req.query.page) || 1;
      const PageSize = parseInt(req.query.limit) || 10;
      const skip = (CurrentPage - 1) * PageSize;

      let query = { best_seller: true };

      if (category) query.category = category;
      if (petType) query.petType = petType;
      if (breed) query.breedSpecific = breed;
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = minPrice;
        if (maxPrice) query.price.$lte = maxPrice;
      }
      if (rating) query.rating = { $gte: rating };

      const products = await Product.find(query)
        .skip(skip)
        .limit(PageSize)
        .sort({ createdAt: -1 });

      const TotalCount = await Product.countDocuments(query);

      res.json({ success: true, data: { products, TotalCount, PageSize, CurrentPage } });
    } catch (error) {
      console.error("Error in getProducts:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  getDetailProduct: async (req, res) => {
    try {
      const { id } = req.query;

      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      res.json({ success: true, data: product });
    } catch (error) {
      console.error("Error in getDetailProduct:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  getProductsByCategory: async (req, res) => {
    try {
      // Sử dụng MongoDB Aggregation để nhóm sản phẩm theo category
      const productsByCategory = await Product.aggregate([
        {
          $group: {
            _id: "$category", // Nhóm theo trường 'category'
            products: { $push: "$$ROOT" }, // Đẩy toàn bộ sản phẩm vào mảng
          },
        },
        {
          $project: {
            _id: 0, // Không hiển thị _id mặc định của MongoDB
            category: "$_id", // Đổi tên _id thành category
            products: 1, // Bao gồm danh sách sản phẩm
          },
        },
        {
          $sort: { category: 1 } // Sắp xếp theo thứ tự chữ cái tăng dần
        }
      ]);

      // Trả về kết quả
      res.json({ success: true, data: productsByCategory });
    } catch (error) {
      console.error("Error in getProductsByCategory:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

};

module.exports = productController;
