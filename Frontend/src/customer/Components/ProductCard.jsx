import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import heart from "../Assets/heart.png";
import redHeart from "../Assets/red-heart.png";
import { useShop } from "../context/useShop";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { wishlistItems, addToWishlist, removeFromWishlist } = useShop();

  const handleClick = () => {
    navigate(`/product/${product._id || product.id}`);
  };

  const isWishlisted = wishlistItems.some(
    (item) => item.product._id === product._id,
  );

  const handleHeartClick = (e) => {
    e.stopPropagation();

    if (isWishlisted) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  return (
    <article className="product-card" onClick={handleClick}>
      <div className="image-wrap">
        <img
          src={isWishlisted ? redHeart : heart}
          alt="wishlist"
          className="heart"
          onClick={handleHeartClick}
        />

        <img
          src={product.images?.[0]?.url || product.image}
          alt={product.name}
          className="image"
        />

        {product.age && <span className="age-badge">{product.age}</span>}
      </div>

      <div className="product-details">
        <h3>{product.brand}</h3>

        <p>{product.name}</p>

        <strong>Rs. {product.price}</strong>

        <span className="rating">
          {product.averageRating || product.rating || 0}
          <span className="rating-star">★</span>
        </span>
      </div>
    </article>
  );
}

export default ProductCard;
