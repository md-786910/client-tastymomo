const MomoCard = ({ momo, onOrderClick }) => {
  return (
    <div className="card">
      <img 
        src={momo.image} 
        alt={momo.name} 
        className="w-full h-24 object-cover rounded-md mb-2"
      />
      <div>
        <h3 className="font-semibold text-sm">{momo.name}</h3>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-primary font-bold text-sm">
            ₹{momo.price - (momo.price * momo.discount / 100)}
          </span>
          {momo.discount > 0 && (
            <span className="text-gray-400 line-through text-xs">₹{momo.price}</span>
          )}
        </div>
        <button 
          onClick={onOrderClick}
          className="btn btn-primary text-xs w-full"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default MomoCard;