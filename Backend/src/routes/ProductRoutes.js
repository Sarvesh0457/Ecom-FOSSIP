import express from "express";
import products from "../data/products.json" with { type: "json" };

const router = express.Router();

router.get("/", (req, res) => {
  const { gender } = req.query;

  let filteredProducts = [...products];

  // category filter --------------
  if (gender) {
    filteredProducts = filteredProducts.filter(
      (product) => product.gender?.toLowerCase() === gender.toLowerCase(),
    );
  }

  const filters = {
    gender: [...new Set(products.map((p) => p.gender))],
    brands: [...new Set(products.map((p) => p.brand))],
    colors: [...new Set(products.map((p) => p.color))],

    topFilters: {
      fabric: {
        label: "Fabrics",
        options: [...new Set(products.map((p) => p.fabric).filter(Boolean))],
      },

      origin: {
        label: "Country of Origin",
        options: [...new Set(products.map((p) => p.origin).filter(Boolean))],
      },

      bundle: {
        label: "Bundles",
        options: [...new Set(products.map((p) => p.bundle).filter(Boolean))],
      },

      trend: {
        label: "Fashion Trends",
        options: [...new Set(products.map((p) => p.trend).filter(Boolean))],
      },
    },
  };

  res.json({
    success: true,
    products: filteredProducts,
    filters,
  });
});

export default router;
