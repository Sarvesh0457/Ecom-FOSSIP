import "./ProductGrid.css";
import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  console.log("product card", products[0]);
  return (
    <div className="product-grid">
      {products.length === 0 ? (
        <p className="no-products">No products found.</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
}

export default ProductGrid;
