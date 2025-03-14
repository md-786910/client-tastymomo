import Buttonx from "./cards/Buttonx";

const MomoGrid = ({ momos, onOrderClick }) => {
  // Add image error handling function
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200?text=Momo+Image';
  };

  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {momos?.map(momo => (
        <div key={momo.id} className="momo-card">
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
            <Buttonx title="Add to cart" onClick={onOrderClick} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MomoGrid;