import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="image-wrap">
        <img src={product.image} alt={product.name} />

        <span className="age-badge">{product.age}</span>
      </div>

      <div className="product-details">
        <h3>{product.brand}</h3>

        <p>{product.name}</p>

        <strong>Rs. {product.price}</strong>

        <span className="rating">
          {product.rating}
          <span className="rating-star">★</span>
        </span>
      </div>
    </article>
  );
}

export default ProductCard;
