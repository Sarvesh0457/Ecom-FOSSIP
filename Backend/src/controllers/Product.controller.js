import { Product } from "../models/Product.js";
import { asyncHandler } from "../utils/async-handler.js";

const getAllProducts = asyncHandler(async (req, res) => {
  const { gender } = req.query;

  // 1. Filter by gender if requested (e.g., from the /explore/men route)
  let query = {};
  if (gender) {
    query.gender = gender.toLowerCase();
  }

  // 2. Fetch the filtered products from MongoDB
  const products = await Product.find(query);

  // 3. Fetch ALL products just to generate the dynamic sidebar filters
  const allProducts = await Product.find(); 

  const filters = {
    categories: [...new Set(allProducts.map((p) => p.category).filter(Boolean))],
    gender: [...new Set(allProducts.map((p) => p.gender))],
    brands: [...new Set(allProducts.map((p) => p.brand))],
    colors: [...new Set(allProducts.map((p) => p.color))],

    topFilters: {
      fabric: {
        label: "Fabrics",
        options: [...new Set(allProducts.map((p) => p.fabric).filter(Boolean))],
      },
      origin: {
        label: "Country of Origin",
        options: [...new Set(allProducts.map((p) => p.origin).filter(Boolean))],
      },
      bundle: {
        label: "Bundles",
        options: [...new Set(allProducts.map((p) => p.bundle).filter(Boolean))],
      },
      trend: {
        label: "Fashion Trends",
        options: [...new Set(allProducts.map((p) => p.trend).filter(Boolean))],
      },
    },
  };

  // Send the exact format the React frontend is expecting!
  return res.status(200).json({
    success: true,
    products,
    filters,
  });
});

export { getAllProducts };