import Buttonx from "./cards/Buttonx";

const FeaturedMomo = ({ momo, onOrderClick }) => {
  // Add image error handling function
  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=1000&auto=format&fit=crop';
  };

  return (
    <div className="p-4">
      <div className="momo-card">
        {momo.discount > 0 && (
          <div className="discount-badge">{momo.discount}% OFF</div>
        )}
        <img
          src={momo.image}
          alt={momo.name}
          className="momo-image"
          onError={handleImageError}
        />
        <div className="momo-content">
          <h3 className="momo-title">{momo.name}</h3>
          <div className="momo-price">
            <span className="discount-price">
              ₹{momo.price - (momo.price * momo.discount / 100)}
            </span>
            {momo.discount > 0 && (
              <span className="original-price">₹{momo.price}</span>
            )}
          </div>
          <p className="momo-description">{momo.description}</p>
          <Buttonx title="Add to cart" onClick={onOrderClick} />
        </div>
      </div>
    </div>
  );
};

export default FeaturedMomo;