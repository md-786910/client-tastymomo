const OfferCards = () => {
  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      <div className="card">
        <h3 className="text-lg font-semibold">Combo Deal</h3>
        <p className="text-sm text-gray-300">Get 20% off on momo + drink</p>
      </div>
      <div className="card">
        <h3 className="text-lg font-semibold">Special Offer</h3>
        <p className="text-sm text-gray-300">Buy 2 get 1 free on weekends</p>
      </div>
    </div>
  );
};

export default OfferCards;